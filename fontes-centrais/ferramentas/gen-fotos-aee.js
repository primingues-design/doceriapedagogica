// Gera as fotos realistas da Central de AEE com Flux (fal.ai). Lê a FAL_KEY do .env.local sem imprimi-la.
// Uso: node gen-fotos-aee.js <.env.local> <pasta-de-saída> [arquivos específicos...]
const fs=require('fs');const path=require('path');const[ENV,OUT,...only]=process.argv.slice(2);
const KEY=(fs.readFileSync(ENV,'utf8').match(/^FAL_KEY=(.+)$/m)||[])[1].trim().replace(/^["']|["']$/g,'');
const LISTA=require(path.join(__dirname,'..','aee','fotos.js'));
async function uma([arq,,prompt]){
  for(let t=0;t<3;t++){try{
    const r=await fetch('https://fal.run/fal-ai/flux/schnell',{method:'POST',headers:{Authorization:'Key '+KEY,'Content-Type':'application/json'},body:JSON.stringify({prompt,image_size:'square_hd',num_images:1,seed:Math.random()*1e6|0})});
    if(!r.ok)throw new Error('http '+r.status);const j=await r.json();const b=Buffer.from(await (await fetch(j.images[0].url)).arrayBuffer());
    fs.writeFileSync(path.join(OUT,arq+'.jpg'),b);return arq}catch(e){if(t===2)return arq+' (FALHOU: '+e.message+')'}}}
(async()=>{const fila=LISTA.filter(x=>!only.length||only.includes(x[0]));const res=[];
  for(let i=0;i<fila.length;i+=4)res.push(...await Promise.all(fila.slice(i,i+4).map(uma)));
  console.log(res.filter(x=>x.includes('FALHOU')).join('\n')||'todas geradas: '+res.length)})();

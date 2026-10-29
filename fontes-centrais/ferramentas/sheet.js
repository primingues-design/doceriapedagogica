const sharp=require('sharp'),D=process.argv[2],out=process.argv[3];const fs=require('fs');
(async()=>{const fsn=fs.readdirSync(D).filter(f=>/\.jpe?g$/i.test(f));const W=420,H=360,cols=4;const comp=[];
for(let i=0;i<fsn.length;i++){const b=await sharp(D+'/'+fsn[i]).resize(W-10,H-40,{fit:'contain',background:'#fff'}).toBuffer();comp.push({input:b,left:(i%cols)*W+5,top:Math.floor(i/cols)*H+5});
comp.push({input:Buffer.from(`<svg width="${W}" height="30"><text x="${W/2}" y="20" font-size="18" text-anchor="middle" font-family="Arial">${fsn[i]}</text></svg>`),left:(i%cols)*W,top:Math.floor(i/cols)*H+H-34})}
await sharp({create:{width:W*cols,height:H*Math.ceil(fsn.length/cols),channels:3,background:'#eee'}}).composite(comp).jpeg().toFile(out);console.log('ok')})();

// ═══ Painel "Imagens": pictograma ou foto realista + "usar a minha foto" ═══
// Entra DEPOIS do motor comum: embrulha o gerar() para desenhar o painel com os cartões da folha atual.
const _gerarComum=gerar;
gerar=function(){USADOS.clear();_gerarComum();painelFotos()};
let fotoAlvo=null;
function salvarMinhas(){try{localStorage.setItem(CHAVE_MINHAS,JSON.stringify(MINHAS));return true}catch(e){alert('Não coube mais nenhuma foto neste navegador. Apague algumas fotos e tente de novo.');return false}}
function trocarFoto(k){fotoAlvo=k;document.getElementById('fotoInput').click()}
function voltarFoto(k){delete MINHAS[k];salvarMinhas();render()}
function apagarMinhas(){if(!confirm('Apagar todas as suas fotos deste navegador? Os cartões voltam para a figura padrão.'))return;MINHAS={};try{localStorage.removeItem(CHAVE_MINHAS)}catch(e){}render()}
// reduz a foto para 400×400 (recorte central) no próprio navegador antes de guardar
async function lerFoto(arquivo){
  const bmp=await createImageBitmap(arquivo);const lado=Math.min(bmp.width,bmp.height);
  const c=document.createElement('canvas');c.width=c.height=400;
  c.getContext('2d').drawImage(bmp,(bmp.width-lado)/2,(bmp.height-lado)/2,lado,lado,0,0,400,400);
  return c.toDataURL('image/jpeg',0.82)}
document.addEventListener('change',async e=>{
  if(e.target.id!=='fotoInput'||!fotoAlvo||!e.target.files[0])return;
  try{const url=await lerFoto(e.target.files[0]);const antes=MINHAS[fotoAlvo];MINHAS[fotoAlvo]=url;if(!salvarMinhas()){if(antes)MINHAS[fotoAlvo]=antes;else delete MINHAS[fotoAlvo]}}
  catch(err){alert('Não consegui abrir essa imagem. Tente uma foto em JPG ou PNG.')}
  e.target.value='';fotoAlvo=null;render()});
function painelFotos(){
  const box=document.getElementById('fotosPanel');if(!box)return;
  const ks=[...USADOS].filter(k=>PIC[k]&&k!=='estrela');const minhas=Object.keys(MINHAS).length;
  box.innerHTML=`<div class="field"><label>Imagens</label><div class="seg">${[['picto','🔣 Pictograma'],['foto','📷 Foto realista']].map(([k,n])=>`<button class="${st.estilo===k?'sel':''}" onclick="st.estilo='${k}';render()">${n}</button>`).join('')}</div>
    ${st.estilo==='foto'?'<div class="nota-p">Alguns conceitos (como "acabou" e "agora não") continuam como pictograma: a figura explica melhor.</div>':''}</div>
    <div class="field"><label>📷 Usar a minha foto</label><div class="nota-p">Troque um cartão por uma foto sua: o banheiro da escola, a mochila do aluno… <b>A foto fica só neste navegador</b> e não é enviada para a Doceria.</div>
    <div class="minhas">${ks.map(k=>`<div class="mi">${`<img class="mini${MINHAS[k]||(st.estilo==='foto'&&FOTOS[k])?' foto':''}" src="${fonteImg(k)}" alt="">`}<span>${PIC[k][0]}</span>${MINHAS[k]?`<button onclick="voltarFoto('${k}')" title="Voltar à figura padrão">↩</button>`:''}<button onclick="trocarFoto('${k}')">${MINHAS[k]?'Trocar':'📷'}</button></div>`).join('')}</div>
    ${minhas?`<button class="mini-btn" onclick="apagarMinhas()">Apagar minhas fotos (${minhas})</button>`:''}</div>`;
}

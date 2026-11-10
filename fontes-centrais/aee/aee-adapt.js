// ═══ CENTRAL DE AEE — FASE 2: ADAPTADOR DE ATIVIDADES COM IA ═══
// A professora cola o texto (ou manda uma foto) de uma atividade. A IA devolve UMA versão em leitura fácil,
// com pictogramas nas palavras-chave e 3 opções em cada item. O resto é feito aqui, sem gastar crédito de novo:
// forma de responder (circular, marcar X, apontar, recortar e colar, escrever), 2 ou 3 opções, itens por página,
// só os essenciais, pictogramas sim/não e letra grande.
// Entra DEPOIS do motor comum e do aee-pos.js (usa gerar, imprimir, painelFotos, PIC, foot, emb).
// Pictogramas: OpenMoji. Os que já existem em /assets/pictos saem de lá (mesmo desenho da prancha);
// os outros vêm da CDN do OpenMoji 15.1.0 (mesma licença CC BY-SA 4.0).
const PIC_LOCAL=new Set(Object.values(PIC).map(v=>v[1]));
const hexEmoji=e=>[...String(e||'')].map(c=>c.codePointAt(0)).filter(c=>c!==0xFE0F).map(c=>c.toString(16).toUpperCase()).join('-');
const srcEmoji=e=>{const h=hexEmoji(e);if(!h)return'';return PIC_LOCAL.has(h)?`/assets/pictos/${h}.svg`:`https://cdn.jsdelivr.net/npm/openmoji@15.1.0/color/svg/${h}.svg`};
const escH=s=>String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const imgE=(e,cls)=>{const s=srcEmoji(e);return s?`<img class="${cls||'ad-ic'}" src="${s}" alt="" onerror="this.remove()">`:''};

// exemplo pronto (aparece antes de a professora usar a IA; imprimir o exemplo usa 1 crédito, como as outras folhas)
const AD_EXEMPLO={titulo:'Onde vivem os animais',
 texto:[{f:'Os animais vivem em lugares diferentes.',e:'🌍'},{f:'O peixe vive na água.',e:'🐟'},{f:'O cachorro vive na terra.',e:'🐶'},{f:'O pássaro voa no ar.',e:'🐦'},{f:'O sapo vive na água e na terra.',e:'🐸'}],
 itens:[
  {q:'Onde vive o peixe?',k:[['peixe','🐟']],o:[['Na água','💧'],['Na terra','🌳'],['No ar','☁️']],c:0,p:1},
  {q:'Qual animal voa no ar?',k:[['ar','☁️']],o:[['Pássaro','🐦'],['Cachorro','🐶'],['Peixe','🐟']],c:0,p:1},
  {q:'Onde vive o cachorro?',k:[['cachorro','🐶']],o:[['Na terra','🌳'],['Na água','💧'],['No ar','☁️']],c:0,p:1},
  {q:'Qual animal vive na água e na terra?',k:[['água','💧'],['terra','🌳']],o:[['Sapo','🐸'],['Gato','🐱'],['Pássaro','🐦']],c:0,p:2},
  {q:'De qual animal você mais gosta?',k:[['gostar','❤️']],o:[['Peixe','🐟'],['Cachorro','🐶'],['Pássaro','🐦']],c:-1,p:2}]};
const AD_ORIGINAL_EX='1) Leia o texto: Os animais podem ser classificados de acordo com o ambiente em que vivem. Os peixes são animais aquáticos; o cachorro é terrestre; as aves, em sua maioria, são capazes de voar. Alguns animais, como os anfíbios, vivem parte da vida na água e parte na terra.\n2) Cite um exemplo de animal aquático.\n3) Qual grupo de animais é capaz de voar?\n4) Onde vive o cachorro?\n5) Dê um exemplo de anfíbio.\n6) Qual é o seu animal preferido? Justifique.';

const AD={ver:0,txt:'',foto:null,dados:AD_EXEMPLO,ex:true,pg:0,modo:'circular',nop:3,ipp:2,pic:true,ess:false,letra:'g',msg:'',ordem:{}};
const AD_MODOS={circular:['⭕ Circular','<b>Circule</b> a resposta.'],marcar:['☑️ Marcar X','<b>Marque um X</b> na resposta.'],apontar:['👆 Apontar','<b>Aponte</b> a resposta.'],colar:['✂️ Recortar e colar','<b>Recorte</b> a resposta lá embaixo e <b>cole</b> no quadro.'],escrever:['✏️ Escrever','<b>Escreva</b> a resposta.']};

// ordem das opções sorteada uma vez por adaptação (a certa não fica sempre em primeiro)
function adOpcoes(it,i){const n=Math.min(AD.nop,it.o.length);let idx=[...Array(it.o.length).keys()];
  if(it.c>=0){idx=[it.c,...idx.filter(x=>x!==it.c)]}idx=idx.slice(0,n);
  const chave=i+'-'+n;if(!AD.ordem[chave])AD.ordem[chave]=emb(idx);return AD.ordem[chave].map(j=>({t:it.o[j][0],e:it.o[j][1],certa:j===it.c}))}
const adItens=()=>AD.dados.itens.map((it,i)=>({...it,n:i})).filter(it=>!AD.ess||it.p===1);
// Divide em páginas MEDINDO o que cabe numa folha de verdade (760 px, fora da tela): "perguntas por página"
// é o máximo; se a pergunta ou o texto forem longos, vão menos por página e nada passa do rodapé.
let adMed=null,adCache={k:'',pg:null};
function adCabe(p){if(!adMed){adMed=document.createElement('div');adMed.style.cssText='position:absolute;left:-10000px;top:0;visibility:hidden;zoom:1';document.body.appendChild(adMed)}
  adMed.className='paper'+(st.caixa==='MAI'?' caixa-alta':'');adMed.innerHTML=`<div class="ad-folha l-${AD.letra}">${adFolha(p,1,2,true)}</div>`+foot;
  return adMed.querySelector('.pfoot').getBoundingClientRect().bottom<=adMed.getBoundingClientRect().bottom+0.5}
function adPaginas(){const k=[AD.ver,AD.modo,AD.nop,AD.ipp,AD.ess,AD.pic,AD.letra,st.caixa].join('|');if(adCache.k===k)return adCache.pg;
  const pg=[];const tx=AD.dados.texto||[];
  for(let i=0;i<tx.length;){let n=1;while(i+n<tx.length&&adCabe({texto:tx.slice(i,i+n+1),primeira:i===0}))n++;pg.push({texto:tx.slice(i,i+n),primeira:i===0});i+=n}
  const its=adItens();
  for(let i=0;i<its.length;){let n=1;while(n<AD.ipp&&i+n<its.length&&adCabe({itens:its.slice(i,i+n+1),num0:i,titulo:i===0&&!tx.length}))n++;pg.push({itens:its.slice(i,i+n),num0:i,titulo:i===0&&!tx.length});i+=n}
  adCache={k,pg};return pg}
const adKw=it=>AD.pic&&it.k&&it.k.length?`<div class="ad-kw">${it.k.map(([p,e])=>`<span>${imgE(e)}<i>${escH(p)}</i></span>`).join('')}</div>`:'';
function adItem(it,num){const op=adOpcoes(it,it.n);const md=AD.modo;const des=it.t==='desenho';
  let resp='';
  if(des)resp='<div class="ad-desenho"></div>';
  else if(md==='circular'||md==='apontar')resp=`<div class="ad-ops ${md}">${op.map(o=>`<div class="ad-op">${AD.pic?imgE(o.e,'ad-oi'):''}<span>${escH(o.t)}</span></div>`).join('')}</div>`;
  else if(md==='marcar')resp=`<div class="ad-ops marcar">${op.map(o=>`<div class="ad-op"><b class="ad-x"></b>${AD.pic?imgE(o.e,'ad-oi'):''}<span>${escH(o.t)}</span></div>`).join('')}</div>`;
  else if(md==='colar')resp='<div class="ad-cola"></div>';
  else resp=`<div class="ad-banco">${op.map(o=>`<span>${escH(o.t)}</span>`).join('')}</div><div class="ad-lin"></div>`;
  const cmd=des?'<b>Desenhe</b> no quadro.':AD_MODOS[md][1];
  return `<div class="ad-it"><div class="ad-q"><b class="ad-n">${num}</b><div><div class="ad-cmd">${cmd}</div><div class="ad-pq">${escH(it.q)}</div></div></div>${adKw(it)}${resp}</div>`}
function adFolha(p,i,total){const D=AD.dados;const pag=total>1?`<div class="ad-pag">Página ${i+1} de ${total}</div>`:'';
  const nome='<div class="ph" style="margin-bottom:8px"><div>Nome:</div><div>Data:</div></div>';
  if(p.texto)return nome+pag+(p.primeira?`<h3 class="pt">${escH(D.titulo)}</h3><p class="pi">Leia com calma. Se precisar, peça ajuda para ler.</p>`:'')+`<div class="ad-txt">${p.texto.map(s=>`<div class="ad-fr">${AD.pic?imgE(s.e,'ad-fi'):''}<span>${escH(s.f)}</span></div>`).join('')}</div>`+credito();
  let h=nome+pag+(p.titulo?`<h3 class="pt">${escH(D.titulo)}</h3>`:'')+`<div class="ad-its">${p.itens.map((it,j)=>adItem(it,p.num0+j+1)).join('')}</div>`;
  if(AD.modo==='colar'){const cs=emb(p.itens.filter(it=>it.t!=='desenho').map(it=>{const o=adOpcoes(it,it.n);return o.find(x=>x.certa)||o[0]}));
    if(cs.length)h+=`<div class="ad-recorte">${cs.map(o=>`<div class="ad-op corte">${AD.pic?imgE(o.e,'ad-oi'):''}<span>${escH(o.t)}</span></div>`).join('')}</div>`}
  return h+credito()}
function adGab(){const its=adItens();return'<b>'+escH(AD.dados.titulo)+'</b><br>'+its.map((it,i)=>{const op=adOpcoes(it,it.n);const c=op.find(o=>o.certa);
  return `${i+1}. ${it.t==='desenho'||it.c<0||!c?'Resposta pessoal.':escH(c.t)}`}).join('<br>')}
const adTodas=()=>{const pg=adPaginas();return pg.map((p,i)=>adFolha(p,i,pg.length))};

// ── chamada da IA ──
const AD_SISTEMA=`Você adapta atividades escolares brasileiras para estudantes atendidos no AEE (Atendimento Educacional Especializado) que precisam de apoio na leitura e na compreensão.
Regras de LEITURA FÁCIL: frases curtas (até 12 palavras), ordem direta (sujeito, verbo, complemento), uma ideia por frase, palavras do dia a dia, sem metáforas, sem ironia, sem dupla negação, números em algarismos. Explique uma palavra difícil só se ela for o conteúdo da aula.
Mantenha o OBJETIVO e o CONTEÚDO da atividade original, com informações corretas. Não invente fatos. Escreva "pessoas escravizadas", nunca "escravos". Nada partidário, nada religioso confessional.
Não escreva nomes de alunos, diagnósticos nem dados pessoais, mesmo que apareçam no original.
Responda SOMENTE com JSON válido, sem texto antes ou depois, neste formato:
{"titulo":"até 6 palavras","texto":[{"f":"frase","e":"emoji"}],"itens":[{"q":"pergunta","k":[["palavra-chave","emoji"]],"o":[["opção","emoji"],["opção","emoji"],["opção","emoji"]],"c":0,"p":1,"t":"escolha"}]}
- "texto": se a atividade tem um texto para ler, reescreva em leitura fácil com 3 a 10 frases, cada uma com 1 emoji que ilustre a frase. Se não tem texto, use [].
- "itens": um item para cada pergunta ou tarefa (no máximo 10). Divida perguntas com duas partes em dois itens.
- "q": a pergunta em leitura fácil (até 14 palavras), SEM verbo de comando como "circule" ou "escreva" (a forma de responder é escolhida depois). Pode ser frase para completar com "___".
- "k": 1 a 3 palavras-chave da pergunta (substantivos ou verbos concretos do conteúdo; nunca palavras como "quem", "quando", "data" ou "local"), cada uma com 1 emoji que a represente bem. Não use como palavra-chave a resposta certa.
- "o": EXATAMENTE 3 opções curtas (1 a 4 palavras), cada uma com 1 emoji. A opção certa deve estar correta segundo o original; as erradas devem ser claramente diferentes da certa. Nunca use "não sei", "nenhuma" ou "todas" como opção.
- "c": índice (0, 1 ou 2) da opção certa. Se a pergunta é de opinião ou resposta pessoal, use -1 e dê 3 opções possíveis.
- "p": 1 se o item é essencial para o objetivo da atividade; 2 se é complementar. Pelo menos metade dos itens com 1.
- "t": "escolha" normalmente; "desenho" só se a tarefa original for desenhar. Nesse caso "q" diz O QUE desenhar (ex.: "O que você aprendeu sobre a independência.") e "o" é [].
- Emojis: use emojis comuns e concretos (objetos, animais, pessoas, lugares, símbolos simples). Um emoji por campo, sem texto junto.`;

async function adFotoLer(arq){const bmp=await createImageBitmap(arq);const k=Math.min(1,1600/Math.max(bmp.width,bmp.height));
  const c=document.createElement('canvas');c.width=Math.round(bmp.width*k);c.height=Math.round(bmp.height*k);c.getContext('2d').drawImage(bmp,0,0,c.width,c.height);
  return c.toDataURL('image/jpeg',0.85).split(',')[1]}
document.addEventListener('change',async e=>{if(e.target.id!=='adFotoInput'||!e.target.files[0])return;
  try{AD.foto=await adFotoLer(e.target.files[0]);AD.msg='📷 Foto pronta. Agora clique em "Adaptar com IA".'}catch(err){AD.foto=null;AD.msg='Não consegui abrir essa imagem. Tente uma foto em JPG ou PNG.'}
  e.target.value='';render()});
function adValidar(j){const s=v=>String(v==null?'':v).trim().slice(0,160);
  const par=a=>Array.isArray(a)?[s(a[0]),s(a[1]).slice(0,16)]:null;
  const texto=(Array.isArray(j.texto)?j.texto:[]).map(x=>({f:s(x&&x.f),e:s(x&&x.e).slice(0,16)})).filter(x=>x.f).slice(0,10);
  const itens=(Array.isArray(j.itens)?j.itens:[]).map(x=>{const t=x&&x.t==='desenho'?'desenho':'escolha';const o=(Array.isArray(x&&x.o)?x.o:[]).map(par).filter(a=>a&&a[0]).slice(0,3);
    const c=Number.isInteger(x&&x.c)&&x.c>=-1&&x.c<o.length?x.c:0;
    return{q:s(x&&x.q),k:(Array.isArray(x&&x.k)?x.k:[]).map(par).filter(a=>a&&a[0]).slice(0,3),o,c,p:x&&x.p===2?2:1,t}})
    .filter(x=>x.q&&(x.t==='desenho'||x.o.length>=2)).slice(0,10);
  if(!itens.length)throw new Error('formato');if(!itens.some(x=>x.p===1))itens.forEach(x=>x.p=1);
  return{titulo:s(j.titulo).slice(0,60)||'Atividade adaptada',texto,itens}}
async function adaptarIA(){
  const msg=t=>{AD.msg=t;const el=document.getElementById('adMsg');if(el)el.textContent=t};
  const txt=(AD.txt||'').trim();
  if(txt.length<15&&!AD.foto){msg('Cole o texto da atividade (ou envie uma foto) antes de adaptar.');return}
  msg('✨ A IA está adaptando a atividade… (uns 30 segundos)');
  const pedido=(AD.foto?'A atividade original está na foto.'+(txt?' Observação da professora: '+txt:''):'Atividade original:\n"""\n'+txt.slice(0,4000)+'\n"""')+'\nAdapte seguindo as regras.';
  const content=AD.foto?[{type:'image',source:{type:'base64',media_type:'image/jpeg',data:AD.foto}},{type:'text',text:pedido}]:pedido;
  try{
    const r=await fetch('/api/claude',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({max_tokens:3000,system:AD_SISTEMA,messages:[{role:'user',content}]})});
    if(!r.ok){msg(r.status===402?'Seus créditos acabaram.':'Não deu certo agora. Tente de novo.');return}
    const d=await r.json();const t=d?.content?.[0]?.text||'';
    AD.dados=adValidar(JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1)));AD.ex=false;AD.ver++;AD.pg=0;AD.ordem={};AD.foto=null;
    AD.msg='✅ Pronto! Revise antes de imprimir: a IA pode errar. Mude a forma de responder à vontade: não gasta outro crédito.';render();
  }catch(e){msg('A IA respondeu num formato inesperado. Tente de novo.')}
}

const seg2=(campo,lista)=>`<div class="seg">${lista.map(([k,n])=>`<button class="${AD[campo]===k?'sel':''}" onclick="AD.${campo}=${typeof k==='string'?`'${k}'`:k};AD.pg=0;render()">${n}</button>`).join('')}</div>`;
GER.adaptar={i:'✨',n:'Adaptar atividade',d:'a IA adapta qualquer atividade',c:'#C2410C',qtd:false,
  opts:()=>`<div class="field"><label>1. Cole a atividade original</label>
    <textarea id="adTxt" oninput="AD.txt=this.value" placeholder="Cole aqui o enunciado, o texto e as perguntas…\n\nExemplo:\n${escH(AD_ORIGINAL_EX.slice(0,160))}…" class="ad-ta">${escH(AD.txt)}</textarea>
    <input type="file" id="adFotoInput" accept="image/*" hidden><button class="mini-btn" onclick="document.getElementById('adFotoInput').click()">📷 ${AD.foto?'Trocar a foto':'Ou envie uma foto da atividade'}</button>${AD.foto?' <button class="mini-btn" onclick="AD.foto=null;AD.msg=\'\';render()">✕ Tirar a foto</button>':''}
    <div class="nota-p">🔒 Não coloque nome nem diagnóstico do aluno. Se a folha tiver nome escrito, cubra antes de fotografar.</div>
    <button class="btn3d btn-print" style="margin-top:6px;padding:11px" onclick="adaptarIA()">✨ Adaptar com IA<small>usa 1 crédito · a impressão fica incluída</small></button>
    <div id="adMsg" class="ad-msg">${AD.msg||(AD.ex?'👀 Ao lado: um exemplo de atividade adaptada.':'')}</div></div>
    <div class="field"><label>2. Como o aluno responde</label>${seg2('modo',Object.entries(AD_MODOS).map(([k,v])=>[k,v[0]]))}</div>
    <div class="field"><label>Opções em cada pergunta</label>${seg2('nop',[[2,'2 opções'],[3,'3 opções']])}</div>
    <div class="field"><label>Perguntas por página</label>${seg2('ipp',[[1,'1'],[2,'2'],[3,'3']])}</div>
    <div class="field"><label>Quais perguntas</label>${seg2('ess',[[false,'Todas'],[true,'Só as essenciais']])}</div>
    <div class="field"><label>Pictogramas</label>${seg2('pic',[[true,'Com pictogramas'],[false,'Sem pictogramas']])}</div>
    <div class="field"><label>Tamanho da letra</label>${seg2('letra',[['m','Grande'],['g','Bem grande']])}</div>
    ${(()=>{const n=adPaginas().length;return n>1?`<div class="field"><label>Página</label><div class="seg">${Array.from({length:n},(_,i)=>`<button class="${AD.pg===i?'sel':''}" onclick="AD.pg=${i};render()">${i+1}</button>`).join('')}</div><div class="nota-p">Ao imprimir, saem <b>todas as ${n} páginas</b> e o gabarito.</div></div>`:''})()}`,
  prox(){const n=adPaginas().length;AD.pg=(AD.pg+1)%n},
  gerar(){const pg=adTodas();if(AD.pg>=pg.length)AD.pg=0;
    return{pago:!AD.ex,folha:`<div class="ad-folha l-${AD.letra}">${pg[AD.pg]}</div>`,gab:adGab()}}};
ORDEM.push('adaptar');

// no adaptador, o painel de fotos não se aplica (as imagens vêm da IA) e a impressão leva TODAS as páginas
const _gerarAee=gerar;
gerar=function(){_gerarAee();if(st.g==='adaptar'){const b=document.getElementById('fotosPanel');if(b)b.innerHTML=''}};
const _imprimirAee=imprimir;
imprimir=async function(){
  if(st.g!=='adaptar')return _imprimirAee();
  if(!atual.pago){if(!(window.dpCobrar&&await window.dpCobrar('aee-adaptar')))return;atual.pago=true}
  const pa=document.getElementById('printArea');pa.classList.toggle('caixa-alta',st.caixa==='MAI');
  pa.innerHTML=adTodas().map(h=>`<div class="paper"><div class="ad-folha l-${AD.letra}">${h}</div>${foot}</div>`).join('')+`<div class="paper gaba" style="flex-direction:column">${gabHead('Atividade adaptada')}<div style="font-size:16px;line-height:1.9">${adGab()}</div></div>`;
  // espera os pictogramas (alguns vêm da internet) antes de abrir a impressão
  await Promise.race([Promise.all([...pa.querySelectorAll('img')].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r}))),new Promise(r=>setTimeout(r,4000))]);
  window.print()};

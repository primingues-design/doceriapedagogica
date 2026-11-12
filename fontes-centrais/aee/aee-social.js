// ═══ CENTRAL DE AEE — FASE 3: HISTÓRIAS SOCIAIS ═══
// Histórias curtas, na 1ª pessoa, calmas e positivas, para preparar o aluno para uma situação
// (regras de Carol Gray: a maioria das frases DESCREVE o que acontece e o que as pessoas sentem;
// poucas frases orientam, sempre como possibilidade positiva — "Eu posso…" —, nunca como ordem).
// Linguagem neutra em gênero ("fico com calma", não "fico calmo"), para servir a qualquer aluno.
// 8 histórias prontas (grátis para ver) + "Outra situação" com IA (1 crédito, impressão incluída).
// Entra DEPOIS de aee-adapt.js: usa escH, imgE (emoji → OpenMoji), credito, foot, gerar e imprimir.
const SC_HIST={
 espera:{titulo:'Esperar a minha vez',e:'⏳',frases:[
  ['Na escola, muitas pessoas querem brincar com as mesmas coisas.','👫'],
  ['Às vezes, outra pessoa está usando o brinquedo que eu quero.','🧸'],
  ['Então é hora de esperar a minha vez.','⏳'],
  ['Esperar pode ser difícil. Tudo bem sentir isso.','😕'],
  ['Enquanto espero, eu posso respirar fundo ou contar até 10.','🌬️'],
  ['Eu também posso perguntar: "Posso brincar depois de você?"','💬'],
  ['Depois de um tempo, chega a minha vez.','👍'],
  ['Quando cada um espera a sua vez, todos conseguem brincar.','😀']]},
 dentista:{titulo:'Ir ao dentista',e:'🦷',frases:[
  ['Os dentes me ajudam a comer, a falar e a sorrir.','🦷'],
  ['O dentista é a pessoa que cuida dos dentes.','🧑‍⚕️'],
  ['No consultório, eu sento numa cadeira grande que sobe e desce.','💺'],
  ['Uma luz forte ajuda o dentista a enxergar dentro da minha boca.','💡'],
  ['O dentista pede para eu abrir bem a boca.','😮'],
  ['O dentista usa um espelhinho e escovas pequenas. Alguns aparelhos fazem barulho.','🪥'],
  ['Se eu precisar de uma pausa, eu posso levantar a mão.','✋'],
  ['Quando acaba, os meus dentes ficam limpos e fortes.','✨']]},
 rotina:{titulo:'Quando a rotina muda',e:'📅',frases:[
  ['Todo dia, a minha turma tem uma rotina.','📅'],
  ['Às vezes, a rotina muda.','🔄'],
  ['Pode ter um passeio, uma festa ou uma professora diferente.','🎉'],
  ['Mudanças acontecem com todas as pessoas.','👥'],
  ['A professora pode me mostrar como vai ser o dia diferente.','🧑‍🏫'],
  ['Eu posso olhar a rotina para saber o que vem depois.','👀'],
  ['Se eu sentir preocupação, eu posso pedir ajuda.','🙋'],
  ['Depois do dia diferente, a rotina de sempre volta.','🏫']]},
 barulho:{titulo:'Os barulhos da escola',e:'🔔',frases:[
  ['Na escola, às vezes, tem barulhos altos.','🔔'],
  ['O sinal toca para avisar a hora do recreio e da saída.','⏰'],
  ['No recreio, muitas pessoas falam e riem ao mesmo tempo.','🗣️'],
  ['Alguns barulhos incomodam os meus ouvidos.','👂'],
  ['Eu posso tapar os ouvidos com as mãos ou usar um abafador.','🎧'],
  ['Eu também posso pedir para ir a um lugar mais calmo.','🛋️'],
  ['O barulho alto passa depois de um tempo.','⏳'],
  ['Quando fica mais calmo, eu volto para a minha atividade.','✏️']]},
 perder:{titulo:'Perder um jogo',e:'🎲',frases:[
  ['Eu gosto de jogar com os meus amigos.','🎲'],
  ['Em um jogo, às vezes uma pessoa ganha e outra perde.','⚖️'],
  ['Todo mundo perde de vez em quando, até os adultos.','👥'],
  ['Perder pode deixar a gente triste ou com raiva. Tudo bem sentir isso.','😢'],
  ['Eu posso respirar fundo e dizer: "Foi um bom jogo!"','🤝'],
  ['Depois, podemos jogar de novo.','🔄'],
  ['Jogar junto é divertido, ganhando ou perdendo.','😀']]},
 ajuda:{titulo:'Pedir ajuda',e:'🙋',frases:[
  ['Às vezes, uma tarefa fica difícil.','📝'],
  ['Todo mundo precisa de ajuda de vez em quando.','👥'],
  ['Quando eu preciso de ajuda, eu posso levantar a mão.','🙋'],
  ['Eu também posso mostrar o cartão de ajuda.','🆘'],
  ['Eu posso dizer: "Você me ajuda, por favor?"','💬'],
  ['A professora ou um colega pode me explicar de novo.','🧑‍🏫'],
  ['Pedir ajuda é uma coisa boa. Assim eu aprendo mais.','⭐']]},
 vacina:{titulo:'Tomar vacina',e:'💉',frases:[
  ['A vacina protege o corpo contra algumas doenças.','💉'],
  ['Eu vou ao posto de saúde com um adulto da minha família.','🏥'],
  ['Às vezes, é preciso esperar um pouco a minha vez.','⏳'],
  ['A pessoa que dá a vacina limpa o meu braço com algodão.','💪'],
  ['A picada é rápida. Pode doer um pouquinho.','🤏'],
  ['Eu posso olhar para o outro lado, segurar a mão de alguém ou contar até 5.','🤝'],
  ['Depois, a pessoa coloca um curativo no meu braço.','🩹'],
  ['Pronto! A vacina ajuda o meu corpo a ficar protegido.','🛡️']]},
 cabelo:{titulo:'Cortar o cabelo',e:'💇',frases:[
  ['O meu cabelo cresce o tempo todo.','💇'],
  ['De vez em quando, é preciso cortar o cabelo.','✂️'],
  ['No salão ou na barbearia, eu sento numa cadeira alta.','💺'],
  ['A pessoa coloca uma capa em mim para o cabelo não cair na roupa.','🧥'],
  ['Ela usa tesoura e, às vezes, uma máquina que faz barulho e vibra.','✂️'],
  ['Se eu precisar de uma pausa, eu posso pedir.','✋'],
  ['Eu posso me olhar no espelho para ver como está ficando.','🪞'],
  ['Quando acaba, o meu cabelo fica arrumado.','😀']]},
};
const SC={k:'espera',fmt:'livro',img:'ilus',ia:null,txt:'',msg:'',pg:0,ver:0};
const scHist=()=>{if(SC.k==='ia'&&SC.ia)return SC.ia;const h=SC_HIST[SC.k]||SC_HIST.espera;return{titulo:h.titulo,e:h.e,frases:h.frases.map(([f,e],i)=>({f,e,i:i+1}))}};
// imagens: ilustração (só nas 8 histórias prontas: /assets/historias/<história>-<nº>.jpg, 00 = capa), pictograma ou nenhuma
const scIlus=()=>SC.img==='ilus'&&SC.k!=='ia';
const scImg=(e,n,cls,clsIl)=>SC.img==='nada'?'':scIlus()?`<img class="${clsIl}" src="/assets/historias/${SC.k}-${String(n).padStart(2,'0')}.jpg" alt="">`:imgE(e,cls);
const SC_FMT={livro:['📖 Livrinho (4 por folha)',4],grande:['🖼️ Cenas grandes (2 por folha)',2],lista:['📄 Folha única',0]};

// cenas: a capa (título + nome) e uma cena por frase
function scCenas(){const h=scHist();return[{capa:true,t:h.titulo,e:h.e},...h.frases.map((x,i)=>({n:i+1,f:x.f,e:x.e}))]}
const scCena=c=>c.capa?`<div class="sc-cena capa">${scImg(c.e,0,'sc-ic','sc-il')}<h4>${escH(c.t)}</h4><div class="sc-nome">Nome:</div></div>`
  :`<div class="sc-cena"><b class="sc-n">${c.n}</b>${scImg(c.e,c.n,'sc-ic','sc-il')}<p>${escH(c.f)}</p></div>`;
// folha única: mede o que cabe (mesma técnica do adaptador) e continua na página seguinte se precisar
let scMed=null,scCache={k:'',pg:null};
function scCabe(html){if(!scMed){scMed=document.createElement('div');scMed.style.cssText='position:absolute;left:-10000px;top:0;visibility:hidden;zoom:1';document.body.appendChild(scMed)}
  scMed.className='paper'+(st.caixa==='MAI'?' caixa-alta':'');scMed.innerHTML=html+foot;
  return scMed.querySelector('.pfoot').getBoundingClientRect().bottom<=scMed.getBoundingClientRect().bottom+0.5}
const scLista=(h,fr,primeira,i,total)=>(primeira?'<div class="ph" style="margin-bottom:8px"><div>Nome:</div><div>Data:</div></div>':'')+(total>1?`<div class="ad-pag">Página ${i+1} de ${total}</div>`:'')+
  (primeira?`<h3 class="pt">${SC.img!=='nada'&&!scIlus()?imgE(h.e,'sc-tic'):''}${escH(h.titulo)}</h3>`:'')+`<div class="sc-lista">${fr.map(x=>`<div class="sc-li">${scImg(x.e,x.i,'sc-lic','sc-lil')}<span>${escH(x.f)}</span></div>`).join('')}</div>`+credito();
function scPaginas(){const k=[SC.ver,SC.k,SC.fmt,SC.img,st.caixa].join('|');if(scCache.k===k)return scCache.pg;const pg=[];
  if(SC.fmt==='lista'){const h=scHist(),fr=h.frases;for(let i=0;i<fr.length;){let n=1;while(i+n<fr.length&&scCabe(scLista(h,fr.slice(i,i+n+1),i===0,0,2)))n++;pg.push({lista:fr.slice(i,i+n),primeira:i===0});i+=n}}
  else{const per=SC_FMT[SC.fmt][1],cs=scCenas();for(let i=0;i<cs.length;i+=per)pg.push({cenas:cs.slice(i,i+per)})}
  scCache={k,pg};return pg}
function scFolha(p,i,total){const per=SC_FMT[SC.fmt][1];
  if(p.lista)return scLista(scHist(),p.lista,p.primeira,i,total);
  const vazias=per-p.cenas.length;// completa a grade para as cenas não esticarem na última folha
  return `<div class="sc-grid g${per}">${p.cenas.map(scCena).join('')}${'<div></div>'.repeat(vazias)}</div>`+credito()}
const scTodas=()=>{const pg=scPaginas();return pg.map((p,i)=>scFolha(p,i,pg.length))};

// ── IA: outra situação ──
const SC_SISTEMA=`Você escreve HISTÓRIAS SOCIAIS (no estilo de Carol Gray) em português do Brasil para estudantes que se beneficiam de apoio visual, atendidos no AEE.
Regras:
- Escrita na 1ª pessoa ("eu"), com tom calmo, acolhedor e positivo.
- A maioria das frases DESCREVE a situação (onde, quem, o que acontece, por quê) ou conta o que as pessoas SENTEM e PENSAM.
- Poucas frases orientam o que fazer, e sempre como possibilidade positiva ("Eu posso...", "Eu vou tentar..."). Nunca ordens, ameaças, castigos ou "não pode". Para cada frase que orienta, pelo menos 2 que descrevem.
- Reconheça sentimentos difíceis sem julgar ("Tudo bem sentir isso").
- Frases curtas (até 14 palavras), concretas, sem metáforas nem ironia. Use "às vezes" e "geralmente" em vez de prometer o que pode não acontecer.
- Linguagem NEUTRA EM GÊNERO para o "eu": nada de adjetivos como "calmo/calma", "nervoso/nervosa"; prefira "fico com calma", "sinto medo", "sinto raiva".
- Sem nomes de pessoas, sem diagnósticos, sem detalhes de higiene íntima.
- Termine com uma frase positiva sobre o resultado.
Responda SOMENTE com JSON válido, sem texto antes ou depois:
{"titulo":"até 5 palavras","e":"emoji","frases":[{"f":"frase","e":"emoji"}]}
- "frases": de 6 a 10 frases, cada uma com 1 emoji comum e concreto que ilustre a frase (um emoji só, sem texto).`;
function scValidar(j){const s=v=>String(v==null?'':v).trim();
  const frases=(Array.isArray(j.frases)?j.frases:[]).map(x=>({f:s(x&&x.f).slice(0,180),e:s(x&&x.e).slice(0,16)})).filter(x=>x.f).slice(0,12);
  if(frases.length<4)throw new Error('formato');frases.forEach((x,i)=>x.i=i+1);return{titulo:s(j.titulo).slice(0,60)||'Minha história',e:s(j.e).slice(0,16)||'📘',frases}}
async function scIA(){
  const msg=t=>{SC.msg=t;const el=document.getElementById('scMsg');if(el)el.textContent=t};
  const tx=(SC.txt||'').trim();if(tx.length<5){msg('Escreva a situação (ex.: ir ao cinema, trocar de sala, dia de chuva sem recreio).');return}
  msg('✨ A IA está escrevendo a história… (uns 15 segundos)');
  try{
    const r=await fetch('/api/claude',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({max_tokens:1500,system:SC_SISTEMA,messages:[{role:'user',content:'Situação: '+tx.slice(0,400)+'\nEscreva a história social seguindo as regras.'}]})});
    if(!r.ok){msg(r.status===402?'Seus créditos acabaram.':'Não deu certo agora. Tente de novo.');return}
    const d=await r.json();const t=d?.content?.[0]?.text||'';
    SC.ia=scValidar(JSON.parse(t.slice(t.indexOf('{'),t.lastIndexOf('}')+1)));SC.k='ia';SC.ver++;SC.pg=0;
    SC.msg='✅ Pronto! Leia com atenção antes de imprimir: a IA pode errar. Você pode trocar o formato sem gastar outro crédito.';render();
  }catch(e){msg('A IA respondeu num formato inesperado. Tente de novo.')}
}

const scBtn=(campo,k,n)=>`<button class="${SC[campo]===k?'sel':''}" onclick="SC.${campo}=${typeof k==='string'?`'${k}'`:k};SC.pg=0;render()">${n}</button>`;
GER.social={i:'📘',n:'História social',d:'prepara para situações novas',c:'#0E7490',qtd:false,
  opts:()=>`<div class="field"><label>Situação</label><div class="seg">${Object.entries(SC_HIST).map(([k,h])=>scBtn('k',k,h.e+' '+h.titulo)).join('')}${scBtn('k','ia','✨ Outra situação (IA)')}</div></div>
    ${SC.k==='ia'?`<div class="field"><input id="scTxt" oninput="SC.txt=this.value" placeholder="Ex.: ir ao cinema, trocar de sala, dia de chuva sem recreio" value="${escH(SC.txt)}" class="sc-in">
      <div class="nota-p">🔒 Descreva só a situação, sem nome nem diagnóstico do aluno.</div>
      <button class="btn3d btn-print" style="margin-top:6px;padding:11px" onclick="scIA()">✨ Escrever com IA<small>usa 1 crédito · a impressão fica incluída</small></button>
      <div id="scMsg" class="ad-msg">${SC.msg||(SC.ia?'':'Escreva a situação e clique no botão.')}</div></div>`:''}
    <div class="field"><label>Formato</label><div class="seg">${Object.entries(SC_FMT).map(([k,v])=>scBtn('fmt',k,v[0])).join('')}</div></div>
    <div class="field"><label>Imagens</label><div class="seg">${scBtn('img','ilus','🎨 Ilustração')}${scBtn('img','picto','🔣 Pictograma')}${scBtn('img','nada','Sem imagem')}</div>${SC.k==='ia'&&SC.img==='ilus'?'<div class="nota-p">Nas histórias criadas com a IA, as imagens saem como pictograma.</div>':''}</div>
    ${(()=>{const n=scPaginas().length;return n>1?`<div class="field"><label>Página</label><div class="seg">${Array.from({length:n},(_,i)=>`<button class="${SC.pg===i?'sel':''}" onclick="SC.pg=${i};render()">${i+1}</button>`).join('')}</div><div class="nota-p">Ao imprimir, saem <b>todas as ${n} páginas</b>.${SC.fmt==='livro'?' Recorte as cenas, coloque em ordem e grampeie: vira um livrinho.':''}</div></div>`:''})()}
    <div class="nota-p">💡 <b>Como usar:</b> leia a história com o aluno alguns dias <b>antes</b> da situação, num momento tranquilo, e de novo pouco antes. Deixe o livrinho com ele.</div>`,
  prox(){const ks=Object.keys(SC_HIST);if(SC.k!=='ia'){SC.k=ks[(ks.indexOf(SC.k)+1)%ks.length];SC.pg=0}else{SC.pg=(SC.pg+1)%scPaginas().length}},
  gerar(){if(SC.k==='ia'&&!SC.ia)return{vazio:true,folha:'<div class="sc-vazio">✨ Escreva a situação no painel e clique em <b>"Escrever com IA"</b>.<br><br>Enquanto isso, veja as 8 histórias prontas.</div>',gab:''};
    const pg=scTodas();if(SC.pg>=pg.length)SC.pg=0;
    return{pago:SC.k==='ia',folha:pg[SC.pg],gab:''}}};
ORDEM.splice(ORDEM.indexOf('adaptar'),0,'social');

// histórias: o painel de fotos não se aplica e a impressão leva TODAS as páginas
const _gerarAee2=gerar;
gerar=function(){_gerarAee2();if(st.g==='social'){const b=document.getElementById('fotosPanel');if(b)b.innerHTML=''}};
const _imprimirAee2=imprimir;
imprimir=async function(){
  if(st.g!=='social')return _imprimirAee2();
  if(atual.vazio)return;
  if(!atual.pago){if(!(window.dpCobrar&&await window.dpCobrar('aee-social-'+SC.k)))return;atual.pago=true}
  const pa=document.getElementById('printArea');pa.classList.toggle('caixa-alta',st.caixa==='MAI');
  pa.innerHTML=scTodas().map(h=>`<div class="paper">${h}${foot}</div>`).join('');
  await Promise.race([Promise.all([...pa.querySelectorAll('img')].map(im=>im.complete?0:new Promise(r=>{im.onload=im.onerror=r}))),new Promise(r=>setTimeout(r,4000))]);
  window.print()};

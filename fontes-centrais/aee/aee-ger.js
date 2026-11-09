// ═══ CENTRAL DE AEE — FASE 1 (sem IA): rotina, comunicação, apoio visual e materiais ═══
// PIC = { chave: [rótulo, arquivo do pictograma, grupo] } — injetado pelo montador (build-aee.js)
// FOTOS = { chave: arquivo da foto realista } (também injetado; conceitos sem foto ficam como pictograma)
const pic=k=>PIC[k]||['?','2753','apo'];
// fotos da professora: ficam SÓ neste navegador (localStorage), nunca vão para a Doceria
const CHAVE_MINHAS='dp_aee_minhas_fotos';
let MINHAS={};try{MINHAS=JSON.parse(localStorage.getItem(CHAVE_MINHAS)||'{}')||{}}catch(e){MINHAS={}}
const USADOS=new Set();
const fonteImg=k=>MINHAS[k]?MINHAS[k]:(st.estilo==='foto'&&FOTOS[k])?`/assets/fotos-aee/${FOTOS[k]}.jpg`:`/assets/pictos/${pic(k)[1]}.svg`;
const img=(k,cls)=>{USADOS.add(k);const foto=MINHAS[k]||(st.estilo==='foto'&&FOTOS[k]);return `<img class="${cls||'pimg'}${foto?' foto':''}" src="${fonteImg(k)}" alt="${pic(k)[0]}">`};
// cores de fundo: prancha segue as cores de Fitzgerald adaptadas; o resto fica branco
const COR={pes:'#FFE45C',aca:'#8FDB6A',coi:'#FFB55C',sen:'#7CC6FF',soc:'#FF9ECF',apo:'#EDEDED',rot:'#FFFFFF',seq:'#FFFFFF',par:'#FFFFFF',ref:'#FFF4C2'};
const GRUPO_NOME={pes:'Pessoas',aca:'Ações',coi:'Coisas',sen:'Sentimentos e descrição',soc:'Social'};
const cartao=(k,tam)=>`<div class="pc ${tam||''}" style="background:${COR[pic(k)[2]]}">${img(k)}<span>${pic(k)[0]}</span></div>`;
const doGrupo=g=>Object.keys(PIC).filter(k=>PIC[k][2]===g);
const credito=()=>'<div class="cred-p">'+(st.estilo==='foto'?'Fotos ilustrativas: Doceria Pedagógica · ':'')+'Pictogramas: OpenMoji (openmoji.org) · licença CC BY-SA 4.0</div>';
const linhaNome='<div class="ph" style="margin-bottom:10px"><div>Nome:</div><div>Data:</div></div>';
const titulo=(t,i)=>`<h3 class="pt">${t}</h3>`+(i?`<p class="pi">${i}</p>`:'');
const dica=t=>`<p class="dica">💡 ${t}</p>`;

const SEQS={
 maos:['Lavar as mãos',['torneira','molhar','sabao','esfregar','enxaguar','secar']],
 dentes:['Escovar os dentes',['escova','pasta','escovardentes','cuspir','bochechar']],
 banheiro:['Ir ao banheiro',['porta','abaixar','vaso','papel','descarga','levantar','lavarmaos']],
 material:['Guardar o material',['estojo','caderno','guardarmochila','cadeira']],
 chegada:['Chegar na escola',['bomdia','pendurar','casaco','sentar']]};
// prancha de comunicação: vocabulário essencial por tamanho
const PRANCHA={12:['eu','quero','comer','beber','aguac','banheiroc','ajuda','dor','mais','sim','nao','feliz'],
 20:['eu','voce','quero','ir','comer','beber','brincarv','parar','aguac','banheiroc','comida','feliz','triste','dor','mais','sim','nao','ajuda','porfavor','obrigado'],
 30:['eu','voce','professora','mae','pai','amigo','quero','ir','comer','beber','brincarv','dormir','parar','aguac','banheiroc','comida','bola','livro','feliz','triste','bravo','medo','cansado','dor','mais','sim','nao','ajuda','porfavor','obrigado']};
const ORDEM_GR=['pes','aca','coi','sen','soc'];
const APOIO=['espera','acabou','agoranao','silencio','pausa','respira','ajuda','banheiroc'];
const RECOMP=['brincar','parque','computador','musica','quebracabeca','biblioteca','arte','premio'];

const st={g:'rotina',estilo:'picto',qtd:8,rot:['chegada','roda','atividade','lanche','parque','banheiro','casa'],layout:'vertical',pd:['atividade','brincar',''],
 seq:'maos',smodo:'tira',pr:20,apo:4,apoIni:0,nf:5,rec:'brincar',par:'igual',npar:4};
const segBtns=(campo,lista)=>`<div class="seg">${lista.map(([k,n])=>`<button class="${st[campo]===k?'sel':''}" onclick="st.${campo}=${JSON.stringify(k).replace(/"/g,"'")};render()">${n}</button>`).join('')}</div>`;
const selPd=(i,grupos,vazio)=>`<select onchange="setPd(${i},this.value)" class="sel-p">${vazio?'<option value="">— nenhum —</option>':''}${grupos.flatMap(g=>doGrupo(g)).map(k=>`<option value="${k}" ${k===st.pd[i]?'selected':''}>${PIC[k][0]}</option>`).join('')}</select>`;
function togRot(k){const i=st.rot.indexOf(k);if(i>=0)st.rot.splice(i,1);else if(st.rot.length<10)st.rot.push(k);render()}
function setPd(i,v){st.pd[i]=v;render()}

const GER={
  rotina:{i:'🗓️',n:'Rotina visual',d:'agenda do dia com figuras',c:'#6A4FD8',qtd:false,
    opts:()=>`<div class="field"><label>Toque nas atividades, na ordem do dia (até 10)</label><div class="pick">${doGrupo('rot').map(k=>{const n=st.rot.indexOf(k);return `<button class="${n>=0?'sel':''}" onclick="togRot('${k}')">${n>=0?'<b>'+(n+1)+'</b>':''}${img(k,'mini')}<span>${PIC[k][0]}</span></button>`}).join('')}</div>
      <button class="mini-btn" onclick="st.rot=[];render()">Limpar a rotina</button></div>
      <div class="field"><label>Formato</label>${segBtns('layout',[['vertical','Lista com "feito"'],['horizontal','Tira na horizontal']])}</div>`,
    gerar(){const ks=st.rot.length?st.rot:['chegada'];
      if(st.layout==='horizontal')return{folha:linhaNome+titulo('Minha rotina')+`<div class="tira">${ks.map((k,i)=>`<div class="tira-i"><b>${i+1}</b>${cartao(k)}</div>`).join('')}</div>`+dica('Plastifique e cole na altura dos olhos do aluno. Vire ou retire cada cartão quando a atividade acabar.')+credito(),gab:''};
      return{folha:linhaNome+titulo('Minha rotina','Quando terminar cada atividade, marque o quadradinho.')+`<div class="lista">${ks.map((k,i)=>`<div class="lista-i"><b>${i+1}</b>${cartao(k,ks.length<=6?'h big':'h')}<span class="feito"></span></div>`).join('')}</div>`+credito(),gab:''}}},
  primeiro:{i:'➡️',n:'Primeiro → Depois',d:'ajuda nas transições',c:'#2C9C7E',qtd:false,
    opts:()=>`<div class="field"><label>Primeiro</label>${selPd(0,['rot','seq'])}</div><div class="field"><label>Depois</label>${selPd(1,['rot','ref'])}</div><div class="field"><label>Por último (opcional)</label>${selPd(2,['rot'],true)}</div>`,
    gerar(){const ks=st.pd.filter(Boolean);const nomes=['Primeiro','Depois','Por último'];
      return{folha:titulo(ks.length>2?'Primeiro, depois e por último':'Primeiro → Depois')+`<div class="pd">${ks.map((k,i)=>`<div class="pd-col"><div class="pd-t">${nomes[i]}</div>${cartao(k,ks.length>2?'g':'gg')}</div>${i<ks.length-1?'<div class="pd-seta">➜</div>':''}`).join('')}</div>`+
        dica('Mostre o quadro antes da atividade e diga: "Primeiro ___, depois ___". Cumpra sempre o "depois": é isso que dá segurança.')+credito(),gab:''}}},
  sequencia:{i:'🧼',n:'Passo a passo',d:'higiene e rotina da sala',c:'#3B82C4',qtd:false,
    opts:()=>`<div class="field"><label>Sequência</label>${segBtns('seq',Object.entries(SEQS).map(([k,v])=>[k,v[0]]))}</div><div class="field"><label>Formato</label>${segBtns('smodo',[['tira','Tira para a parede'],['ordenar','Recortar e ordenar']])}</div>`,
    prox(){const ks=Object.keys(SEQS);st.seq=ks[(ks.indexOf(st.seq)+1)%ks.length]},
    gerar(){const[t,ks]=SEQS[st.seq];
      if(st.smodo==='tira')return{folha:titulo(t,'Siga os passos na ordem.')+`<div class="passos">${ks.map((k,i)=>`<div class="passo"><b>${i+1}</b>${cartao(k,'h')}</div>`).join('')}</div>`+credito(),gab:''};
      return{folha:linhaNome+titulo(t,'<b>Recorte</b> as figuras de baixo e <b>cole</b> na ordem certa.')+`<div class="base">${ks.map((_,i)=>`<div class="base-i"><b>${i+1}</b><div class="vazio"></div></div>`).join('')}</div><div class="recorte">${emb(ks).map(k=>cartao(k,'p corte')).join('')}</div>`+credito(),
        gab:ks.map((k,i)=>`${i+1}. ${PIC[k][0]}`).join(' · ')}}},
  prancha:{i:'💬',n:'Prancha de comunicação',d:'CAA com vocabulário essencial',c:'#E85A7D',qtd:false,
    opts:()=>`<div class="field"><label>Tamanho</label>${segBtns('pr',[[12,'12 figuras'],[20,'20 figuras'],[30,'30 figuras']])}</div>`,
    gerar(){const ks=PRANCHA[st.pr].slice().sort((a,b)=>ORDEM_GR.indexOf(PIC[a][2])-ORDEM_GR.indexOf(PIC[b][2]));const col=st.pr===12?4:st.pr===20?5:6;
      return{folha:titulo('Minha prancha de comunicação','Aponte as figuras para dizer o que você quer, sente ou precisa.')+`<div class="prancha" style="grid-template-columns:repeat(${col},1fr)">${ks.map(k=>cartao(k,st.pr===30?'p':'')).join('')}</div>`+
        `<div class="leg-f">${ORDEM_GR.map(g=>`<span><i style="background:${COR[g]}"></i>${GRUPO_NOME[g]}</span>`).join('')}</div>`+credito(),gab:''}}},
  apoio:{i:'✋',n:'Cartões de apoio',d:'espera, acabou, pausa…',c:'#B8860B',qtd:false,
    opts:()=>`<div class="field"><label>Cartões por folha</label>${segBtns('apo',[[2,'2 (bem grandes)'],[4,'4'],[6,'6']])}</div>`,
    prox(){st.apoIni=(st.apoIni+st.apo)%APOIO.length},
    gerar(){const n=st.apo;const pg=Array.from({length:n},(_,i)=>APOIO[(st.apoIni+i)%APOIO.length]);
      return{folha:titulo('Cartões de apoio','Recorte, plastifique e mostre o cartão, em vez de só falar.')+`<div class="apoio a${n}">${pg.map(k=>cartao(k,(n===2?'gg':'g')+' corte')).join('')}</div>`+dica('Clique em "Gerar outra folha" para ver os outros cartões: são 8 no total.')+credito(),gab:''}}},
  fichas:{i:'⭐',n:'Quadro de fichas',d:'reforço positivo',c:'#F2A900',qtd:false,
    opts:()=>`<div class="field"><label>Quantas fichas</label>${segBtns('nf',[[3,'3'],[5,'5'],[10,'10']])}</div><div class="field"><label>Prêmio</label>${segBtns('rec',RECOMP.map(k=>[k,PIC[k][0]]))}</div>`,
    gerar(){const n=st.nf;
      return{folha:titulo('Quadro de fichas')+`<div class="fichas-q"><div class="fq-top"><span>Estou trabalhando para:</span>${cartao(st.rec,'g')}</div><div class="fq-slots n${n}">${Array.from({length:n},()=>'<div class="slot"></div>').join('')}</div></div>`+
        `<p class="pi" style="margin-top:12px">Fichas para recortar:</p><div class="tokens">${Array.from({length:n+2},()=>`<div class="token corte">${img('estrela')}</div>`).join('')}</div>`+
        dica('Combine com o aluno o que vale uma ficha (por exemplo, terminar uma tarefa). Entregue a ficha logo depois e elogie. Quadro completo = prêmio!')+credito(),gab:''}}},
  pareamento:{i:'🧩',n:'Pareamento',d:'igual com igual, figura e palavra',c:'#7C5CE0',qtd:false,
    opts:()=>`<div class="field"><label>Tipo</label>${segBtns('par',[['igual','Figura com figura igual'],['palavra','Figura com palavra'],['colar','Recortar e colar no igual']])}</div><div class="field"><label>Quantos pares</label>${segBtns('npar',[[3,'3'],[4,'4'],[6,'6']])}</div>`,
    gerar(){const ks=emb(doGrupo('par')).slice(0,st.npar);const dir=emb(ks);const tam=st.npar<=3?'g':st.npar===4?'':'p';
      if(st.par==='colar')return{folha:linhaNome+titulo('Encontre o igual','<b>Recorte</b> as figuras de baixo e <b>cole</b> ao lado da figura igual.')+`<div class="base base-par">${ks.map(k=>`<div class="base-i">${cartao(k,'p')}<div class="vazio"></div></div>`).join('')}</div><div class="recorte">${dir.map(k=>cartao(k,'p corte')).join('')}</div>`+credito(),gab:''};
      const d=k=>st.par==='palavra'?`<div class="pal-p">${PIC[k][0]}</div>`:cartao(k,tam);
      return{folha:linhaNome+titulo(st.par==='palavra'?'Ligue a figura à palavra':'Ligue as figuras iguais','<b>Ligue</b> com um traço.')+`<div class="lig-par">${ks.map((k,i)=>`<div class="lp-l">${cartao(k,tam)}<span class="dot"></span></div><div></div><div class="lp-r"><span class="dot"></span>${d(dir[i])}</div>`).join('')}</div>`+credito(),gab:''}}},
};
const ORDEM=['rotina','primeiro','sequencia','prancha','apoio','fichas','pareamento'];

const KITS={
  sala:{t:'Rotina da sala',paginas(){const sv={...st,rot:[...st.rot],pd:[...st.pd]};st.layout='vertical';const a=GER.rotina.gerar();st.layout='horizontal';const b=GER.rotina.gerar();st.pd=['atividade','brincar',''];const c=GER.primeiro.gerar();st.nf=5;const d=GER.fichas.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha,d.folha],gab:null}}},
  higiene:{t:'Higiene passo a passo',paginas(){const sv={...st};st.smodo='tira';const r=[];for(const k of ['maos','dentes','banheiro']){st.seq=k;r.push(GER.sequencia.gerar().folha)}Object.assign(st,sv);return{pg:r,gab:null}}},
  comunica:{t:'Comunicação',paginas(){const sv={...st};st.pr=20;const a=GER.prancha.gerar();st.apo=4;st.apoIni=0;const b=GER.apoio.gerar();st.apoIni=4;const c=GER.apoio.gerar();Object.assign(st,sv);return{pg:[a.folha,b.folha,c.folha],gab:null}}},
};

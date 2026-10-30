// Partes próprias da Central de Ensino Religioso (BNCC: não confessional e plural).
// O montador (build-religioso.js) junta com o código comum da Central de História.
module.exports = {
css: `:root{--rosa:#6A4FD8;--rosa-bg:#EEE9FF}
.eyebrow{border-color:rgba(106,79,216,.3);color:#6A4FD8}
.seg button.sel{color:#45309E}
.btn-print{box-shadow:0 5px 0 #45309E}
.frase{font-size:18.5px;line-height:1.35;flex:1}
.texto-box{border:2px solid #DCD3F7;border-radius:14px;padding:14px 18px;background:#FBFAFF;margin-bottom:12px}
.texto-box h4{font-family:'Baloo 2';font-size:22px;margin:0 0 6px}
.texto-box p{font-size:17px;line-height:1.55;margin:0 0 7px;text-align:justify}
.nv{display:inline-block;font-size:11px;font-weight:800;color:#fff;border-radius:99px;padding:1px 8px;margin-right:6px;vertical-align:2px;font-family:'Nunito'}
.nv.loc{background:#0D9488}.nv.inf{background:#C99A16}.nv.ref{background:#7C3AED}
.aviso-er{border-left:4px solid #6A4FD8;background:#F5F2FF;border-radius:8px;padding:8px 12px;font-size:14px;line-height:1.4;margin-bottom:12px}
.ficha-eu{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.ficha-eu div{border:2px dashed #C9BFF0;border-radius:14px;padding:10px 12px;min-height:150px;font-size:16px;font-weight:700}
.caixa-alta .texto-box p{font-size:15.5px}
.caixa-alta .frase{font-size:16px}
.caixa-alta .lig.txt .r{font-size:15px}
.caixa-alta .lig{row-gap:10px}`,

hero: `<div class="hero">
  <div class="blob" style="width:480px;height:480px;background:#E5DEFF;top:-180px;left:-160px"></div>
  <div class="blob" style="width:380px;height:380px;background:#FFE9A8;top:40px;right:-120px"></div>
  <div class="blob" style="width:300px;height:300px;background:#DDF7EE;bottom:-160px;left:40%"></div>
  <div class="hero-in">
    <div>
      <div class="eyebrow">🕊️ Central de Ensino Religioso</div>
      <h1>Atividades de Ensino Religioso <em>para imprimir</em></h1>
      <p><b>Não confessional e plural</b>, como pede a BNCC: identidade e respeito às diferenças, símbolos, espaços sagrados, festas e textos de várias tradições — e também quem não tem religião. Tudo com <b>gabarito do professor</b>.</p>
      <div class="chips"><span>🎁 Comece grátis, sem cadastro</span><span>🤝 Respeito à diversidade</span><span>📘 Alinhado à BNCC</span><span>🔠 Opção caixa alta (EJA)</span></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="letra" style="--r:-8deg;background:#6A4FD8;left:2%;top:8%">🕊️</div>
      <div class="letra" style="--r:6deg;background:#F2A900;right:4%;top:0;animation-delay:-2s">🤝</div>
      <div class="letra" style="--r:-4deg;background:#2C9C7E;left:14%;top:46%;animation-delay:-4s">🌍</div>
      <div class="letra" style="--r:8deg;background:#E85A7D;right:8%;top:42%;animation-delay:-3s">💬</div>
      <div class="lia"><div data-char="lia"></div></div>
    </div>
  </div>
</div>`,

secoes: `<section id="geradores" style="padding-top:20px"><div class="wrap">
  <div class="kicker">Geradores de folhas</div>
  <h2 class="sec-title">Escolha a atividade e gere quantas quiser</h2>
  <p class="sec-sub">Escolha a atividade e as opções. A folha aparece aqui ao lado. Imprimir ou salvar em PDF usa 1 crédito — e você começa com 3 grátis.</p>
  <div class="tabs" id="tabs"></div>
  <div class="gen">
    <div class="panel">
      <div id="opts"></div>
      <div class="field" id="fQtd"><label>Quantidade</label><div class="seg" id="segQtd"></div></div>
      <button class="btn3d btn-new" onclick="outraFolha()">🔄 Gerar outra folha</button>
      <button class="btn3d btn-print" onclick="imprimir()">🖨️ Imprimir folha + gabarito<small>usa 1 crédito</small></button>
      <div class="cred">✨ Você tem <b>3 materiais grátis</b> — sem cadastro. Com o e-mail, ganha mais 2.</div>
    </div>
    <div>
      <div class="paper-wrap"><div class="paper" id="paper"></div></div>
      <div class="gaba-tag">📄 O gabarito do professor sai na página seguinte, ao imprimir.</div>
    </div>
  </div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
  <div class="kicker">Atividades prontas</div>
  <h2 class="sec-title">Kits completos para imprimir</h2>
  <p class="sec-sub">Materiais montados, prontos para a semana. Imprimir o kit inteiro usa só 1 crédito.</p>
  <div class="cards">
    <button class="card" onclick="abrirKit('eu')" style="--sh:#EEE9FF;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#EEE9FF">🙋</div><h3>Eu, o outro e nós</h3><p>Ficha "quem sou eu", perguntas para a roda de conversa e atitudes de respeito + gabarito.</p><span class="tag" style="background:#EEE9FF;color:#45309E">👀 Ver o kit · 4 páginas</span></button>
    <button class="card" onclick="abrirKit('diversidade')" style="--sh:#DDF7EE;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#DDF7EE">🌍</div><h3>Diversidade religiosa</h3><p>Símbolos, espaços sagrados e festas de várias tradições + gabarito.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">👀 Ver o kit · 4 páginas</span></button>
    <button class="card" onclick="abrirKit('liberdade')" style="--sh:#FFF1D6;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#FFF1D6">⚖️</div><h3>Liberdade de crença</h3><p>Texto sobre o direito de crer ou não crer, a lei e o 21 de janeiro + perguntas e gabarito.</p><span class="tag" style="background:#FFF1D6;color:#9A5418">👀 Ver o kit · 3 páginas</span></button>
  </div>
  <div id="kitView"></div>
</div></section>

<section id="jogos" style="padding-top:10px"><div class="wrap">
  <div class="kicker">Jogos e aula</div>
  <h2 class="sec-title">Para jogar e apresentar na TV</h2>
  <p class="sec-sub">Monte um jogo ou uma aula de Ensino Religioso sobre o tema que você está trabalhando.</p>
  <div class="cards">
    <a class="card" href="/jogos.html" style="--sh:#EEE9FF"><div class="ic" style="background:#EEE9FF">❓</div><h3>Quiz</h3><p>Perguntas sobre diversidade e convivência, na TV, com modo equipes.</p><span class="tag" style="background:#EEE9FF;color:#6A4FD8">▶ Criar quiz</span></a>
    <a class="card" href="/slides.html" style="--sh:#FFF0DE"><div class="ic" style="background:#FFF0DE">🖼️</div><h3>Slides</h3><p>Aula pronta para projetar, com linguagem plural e respeitosa.</p><span class="tag" style="background:#FFF0DE;color:#9A5418">▶ Criar slides</span></a>
    <a class="card" href="/mapa.html" style="--sh:#DDF7EE"><div class="ic" style="background:#DDF7EE">🧠</div><h3>Mapa mental</h3><p>Organize um tema com a turma, do centro para os galhos.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">▶ Criar mapa</span></a>
  </div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
  <div class="ia">
    <div class="robo"><span class="balao">Me diga o tema! 😊</span><img src="/img/robo-doceria.webp" alt="Robozinho da IA da Doceria"></div>
    <div>
      <div class="kicker" style="color:#FFD9A8">Quer outro tema?</div>
      <h2>A IA da Doceria cria a atividade do seu jeito</h2>
      <p>Ritos de passagem, alimentos e tradições, cuidado com a natureza, cultura de paz… A IA segue as regras da BNCC: não confessional, plural e respeitosa com todas as crianças.</p>
      <a class="btn3d" href="/prova.html?componente=ensino-religioso" style="background:#FFC93C;color:#3D1F0D;padding:14px 22px;box-shadow:0 6px 0 #C99A16;font-size:17px">✨ Criar com IA</a>
    </div>
    <div class="ia-list">
      <a href="/prova.html?componente=ensino-religioso">📝 Atividade</a><a href="/prova.html?componente=ensino-religioso">✅ Avaliação</a><a href="/apostila.html">📖 Texto & compreensão</a><a href="/mapa.html">🧠 Mapa mental</a><a href="/slides.html">🖼️ Slides</a><a href="/jogos.html">❓ Quiz</a>
    </div>
  </div>
</div></section>

<section class="faq" style="padding-top:10px"><div class="wrap" style="max-width:820px">
  <h2 class="sec-title" style="text-align:center;margin-bottom:18px">Perguntas frequentes</h2>
  <details><summary>As atividades ensinam uma religião?</summary><p>Não. Seguindo a BNCC, o Ensino Religioso aqui é <b>não confessional</b>: apresenta símbolos, espaços, festas e textos de várias tradições como conhecimento cultural, sem dizer que uma é a certa — e inclui também quem não tem religião.</p></details>
  <details><summary>Quais tradições aparecem?</summary><p>Cristianismo, judaísmo, islamismo, budismo, hinduísmo, espiritismo, religiões de matriz africana (como o candomblé e a umbanda), tradições indígenas e visões não religiosas.</p></details>
  <details><summary>Para qual turma servem?</summary><p>Para o Ensino Fundamental e a EJA. As folhas não trazem ano escrito, e há opção de letra em caixa alta.</p></details>
  <details><summary>Como funcionam os créditos?</summary><p>Você pode ver e gerar quantas folhas quiser. Para imprimir ou salvar em PDF, cada folha usa 1 crédito — e você começa com 3 grátis, sem cadastro. Com o e-mail ganha mais 2 e, depois, 1 grátis por semana. Cada kit inteiro usa só 1 crédito.</p></details>
</div></section>`,

dados: `
// ── BANCO CONFERIDO — não confessional e plural (BNCC) ──
// Identidades e alteridades
const PERGUNTAS=['O que torna você uma pessoa única?','Qual é a história do seu nome? Quem escolheu?','O que você aprendeu com alguém muito diferente de você?','O que a sua família gosta de fazer junta?','Como você se sente quando alguém não respeita o seu jeito de ser?','O que você pode fazer quando um colega é excluído?','Que festa ou tradição é importante na sua família? Por quê?','O que significa respeitar quem pensa diferente?','Como podemos resolver uma briga conversando?','Que gesto de gentileza você fez ou recebeu esta semana?','Por que é bom conviver com pessoas diferentes?','O que você gostaria que todos soubessem sobre você?','Que regra de convivência deixaria a escola melhor?','Como você cuida das pessoas e da natureza à sua volta?','Quem é uma pessoa que você admira? O que ela ensina?','O que é ser um bom amigo ou uma boa amiga?'];
const ATITUDES=[['Perguntar com curiosidade sobre a festa religiosa de um colega','R'],['Escutar com atenção o colega que pensa diferente','R'],['Respeitar o colega que não come certos alimentos por causa da sua crença','R'],['Respeitar quem não tem religião','R'],['Aprender o significado de um símbolo de outra tradição','R'],['Convidar para brincar um colega que acabou de chegar à escola','R'],['Pedir licença antes de entrar em um espaço sagrado','R'],
 ['Rir da roupa ou do adereço religioso de alguém','D'],['Dizer que a crença do colega é errada ou feia','D'],['Xingar alguém por causa da sua religião','D'],['Excluir um colega da brincadeira por ele ser diferente','D'],['Mexer sem permissão nos objetos sagrados de outra pessoa','D'],['Fazer piada com as tradições de outro povo','D'],['Obrigar alguém a participar de uma oração que não é da sua crença','D']];
const ATIT={R:'Atitude de respeito',D:'Atitude de desrespeito'};
// Manifestações religiosas: [item, tradição/explicação]
const SIMBOLOS=[['✝️ Cruz','Cristianismo'],['✡️ Estrela de Davi','Judaísmo'],['☪️ Lua crescente e estrela','Islamismo (símbolo muito associado a ele)'],['☸️ Roda do Dharma','Budismo'],['🕉️ Om','Hinduísmo'],['☯️ Yin-yang','Taoísmo'],['🥁 Atabaque','Religiões de matriz africana, como o candomblé e a umbanda'],['Maracá','Rituais de muitos povos indígenas']];
const ESPACOS=[['⛪ Igreja','Cristianismo'],['🕍 Sinagoga','Judaísmo'],['🕌 Mesquita','Islamismo'],['🛕 Templo budista','Budismo'],['🛕 Mandir (templo hindu)','Hinduísmo'],['🥁 Terreiro','Candomblé e umbanda'],['🏠 Centro espírita','Espiritismo'],['🌿 Opy (casa de reza)','Povo Guarani']];
const FESTAS=[['Natal','Cristãos lembram o nascimento de Jesus'],['Páscoa','Cristãos celebram a ressurreição de Jesus'],['Pessach','Judeus lembram a libertação do povo hebreu da escravidão no Egito'],['Hanucá','Judeus acendem as velas da menorá durante oito noites'],['Yom Kipur','Judeus vivem o Dia do Perdão, com jejum e reflexão'],['Ramadã','Muçulmanos fazem jejum durante o dia por um mês inteiro'],['Diwali','Hindus acendem lamparinas para celebrar a vitória do bem'],['Vesak','Budistas lembram o nascimento, a iluminação e a morte de Buda'],['Festa de Iemanjá','No 2 de fevereiro, fiéis do candomblé e da umbanda levam oferendas ao mar'],['Kuarup','Povos do Xingu fazem um ritual para homenagear seus mortos']];
const TEXTOS_SAG=[['Bíblia','Cristianismo'],['Torá','Judaísmo'],['Alcorão','Islamismo'],['Vedas','Hinduísmo'],['Tripitaka','Budismo'],['O Livro dos Espíritos','Espiritismo'],['Tradição oral','Religiões de matriz africana e povos indígenas: os ensinamentos passam pela fala, de geração em geração']];
const cw=s=>s.split('|').map(x=>{const[p,pista]=x.split('=');return{p,pista}});
const CACA={
 convivencia:['🤝 Respeito e convivência',cw("RESPEITO=Tratar bem o outro, mesmo quando ele pensa diferente|AMIZADE=Laço de carinho e confiança entre amigos|EMPATIA=Se colocar no lugar do outro|DIALOGO=Conversa em que todos falam e escutam|DIVERSIDADE=Existência de jeitos, culturas e crenças diferentes|PAZ=Quando há harmonia e ninguém briga|GENTILEZA=Atitude educada e carinhosa|ESCUTA=Prestar atenção no que o outro diz|PERDAO=Desculpar quem errou com a gente|JUSTICA=Tratar todos com igualdade de direitos|UNIAO=Quando um grupo age junto|PARTILHA=Dividir o que temos com os outros")],
 espacos:['🕍 Símbolos e espaços',cw("IGREJA=Espaço sagrado do cristianismo|SINAGOGA=Espaço sagrado do judaísmo|MESQUITA=Espaço sagrado do islamismo|TERREIRO=Espaço sagrado do candomblé e da umbanda|TEMPLO=Nome geral de muitos espaços sagrados|OPY=Casa de reza do povo Guarani|CRUZ=Símbolo do cristianismo|ESTRELA=A ____ de Davi é símbolo do judaísmo|RODA=A ____ do Dharma é símbolo do budismo|ATABAQUE=Tambor das religiões de matriz africana|MARACA=Chocalho usado em rituais de povos indígenas|OM=Som e símbolo sagrado do hinduísmo")],
 festas:['🎉 Festas e celebrações',cw("NATAL=Festa cristã do nascimento de Jesus|PASCOA=Festa cristã da ressurreição de Jesus|PESSACH=Festa judaica da libertação do Egito|HANUCA=Festa judaica das velas da menorá|RAMADA=Mês de jejum dos muçulmanos|DIWALI=Festa hindu das lamparinas|VESAK=Festa budista que lembra a vida de Buda|IEMANJA=Festa com oferendas ao mar, no 2 de fevereiro|KUARUP=Ritual dos povos do Xingu em homenagem aos mortos|RITUAL=Conjunto de gestos e palavras feitos de um jeito especial|CELEBRACAO=Festa para lembrar algo importante|JEJUM=Ficar um tempo sem comer, em algumas tradições")]};
const TEXTOS=[
 {k:'liberdade',t:'Liberdade de crença',g:'Texto informativo',html:'<p>No Brasil, cada pessoa tem o direito de escolher em que acreditar. Algumas pessoas seguem uma religião, outras seguem outra, e há quem não tenha religião nenhuma. Todas merecem o mesmo respeito.</p><p>Esse direito está na Constituição Federal, a lei mais importante do país. Ela diz que a liberdade de consciência e de crença é inviolável, ou seja, ninguém pode tirá-la de ninguém.</p><p>Em 2007, uma lei criou o <b>Dia Nacional de Combate à Intolerância Religiosa</b>, comemorado em 21 de janeiro. Nesse dia, escolas e comunidades conversam sobre como conviver em paz com quem pensa diferente.</p>',
  q:[['loc','Segundo o texto, que direito toda pessoa tem no Brasil?','O direito de escolher em que acreditar: seguir uma religião ou não ter religião.',2],['loc','Em que dia é o Dia Nacional de Combate à Intolerância Religiosa?','Em 21 de janeiro.',1],['inf','O que quer dizer "inviolável", de acordo com o texto?','Que ninguém pode tirar esse direito de ninguém.',1],['ref','O que você pode fazer para que todos se sintam respeitados na sua escola?','Resposta pessoal.',2]]},
 {k:'diversidade',t:'Um país de muitas crenças',g:'Texto informativo',html:'<p>O Brasil é formado por povos de muitas origens. Por isso, aqui existem muitas formas de crer e de celebrar.</p><p>Os povos indígenas já tinham suas tradições muito antes da chegada dos portugueses, com rituais, cantos e histórias sobre a natureza. Os portugueses trouxeram o cristianismo. Os africanos escravizados trouxeram suas crenças, que deram origem a religiões como o candomblé. Depois, imigrantes trouxeram o judaísmo, o islamismo, o budismo e outras tradições.</p><p>Hoje, em uma mesma rua, pode haver uma igreja, um terreiro e um templo. Conhecer essas tradições ajuda a entender e a respeitar os vizinhos.</p>',
  q:[['loc','Quem já tinha suas tradições antes da chegada dos portugueses?','Os povos indígenas.',1],['loc','Que religião os portugueses trouxeram?','O cristianismo.',1],['inf','Por que no Brasil existem tantas formas de crer?','Porque o país foi formado por povos de muitas origens (indígenas, portugueses, africanos e imigrantes).',2],['ref','Por que conhecer a tradição do outro ajuda na convivência?','Resposta pessoal (ex.: porque entendemos o que é importante para ele e evitamos preconceitos).',2]]}];
const NIVEL={loc:'Localizar',inf:'Inferir',ref:'Refletir'};
const AVISO='<div class="aviso-er">🤝 Aqui conhecemos <b>várias tradições</b> e também quem <b>não tem religião</b>. Ninguém precisa concordar com tudo: o importante é <b>conhecer e respeitar</b>.</div>';
`,

ger: `
const st={g:'roda',qtd:8,tema:'simbolos',atq:8,texto:'liberdade',caca:'convivencia',cacaModo:'banco',cacaN:8};
const segBtns=(campo,lista)=>\`<div class="seg">\${lista.map(([k,n])=>\`<button class="\${st[campo]===k?'sel':''}" onclick="st.\${campo}=\${JSON.stringify(k).replace(/"/g,"'")};render()">\${n}</button>\`).join('')}</div>\`;
const pq=(t,n)=>\`<div class="pq">\${t}</div>\${linhas(n)}\`;
function equilibrado(lista,grupo,n){const por={};emb(lista).forEach(x=>(por[grupo(x)]=por[grupo(x)]||[]).push(x));const ks=Object.keys(por);let r=[];for(let i=0;r.length<n&&i<30;i++)for(const k of emb(ks))if(por[k][i]&&r.length<n)r.push(por[k][i]);return emb(r)}
const ligar=pares=>{const d=emb(pares);return '<div class="lig txt">'+pares.map((p,i)=>\`<div class="l">\${p[0]}<span class="dot"></span></div><div></div><div class="r"><span class="dot"></span>\${d[i][1]}</div>\`).join('')+'</div>'};
const MANIF={simbolos:['Símbolos e tradições','<b>Ligue</b> cada símbolo à tradição em que ele é usado.',SIMBOLOS],espacos:['Espaços sagrados','<b>Ligue</b> cada espaço sagrado à tradição que o usa.',ESPACOS],festas:['Festas e celebrações','<b>Ligue</b> cada festa ao que ela celebra.',FESTAS],textos:['Textos e ensinamentos','<b>Ligue</b> cada texto ou forma de ensinar à sua tradição.',TEXTOS_SAG]};

const GER={
  roda:{i:'💬',n:'Roda de conversa',d:'eu, o outro e nós',c:'#6A4FD8',
    gerar(){const n=Math.min(st.qtd,8);const ps=emb(PERGUNTAS).slice(0,n);
      return{folha:head('Eu, o outro e nós','Pense e responda. Depois, converse com a turma: cada pessoa tem o seu jeito, e todos merecem respeito.')+ps.map((p,i)=>pq((i+1)+'. '+p,n>6?1:2)).join(''),
        gab:'Respostas pessoais. Sugestão: use as perguntas numa roda de conversa, valorizando a escuta e o respeito a todas as falas, sem julgar crenças ou ausência delas.'}}},
  atitudes:{i:'🤝',n:'Atitudes de respeito',d:'respeito ou desrespeito?',c:'#2C9C7E',
    gerar(){const as=equilibrado(ATITUDES,a=>a[1],st.qtd);
      return{folha:head('Atitudes de respeito','Escreva <b>R</b> se a atitude é de <b>respeito</b> ou <b>D</b> se é de <b>desrespeito</b>. Depois, escolha uma atitude de desrespeito e escreva como ela poderia mudar.')+
        '<div class="leg" style="grid-template-columns:1fr 1fr">'+Object.entries(ATIT).map(([k,v])=>\`<div><b>\${k}</b>\${v}</div>\`).join('')+'</div><div class="ord">'+
        as.map((a,i)=>\`<div class="item"><span class="frase"><b>\${i+1}.</b> \${a[0]}</span><span class="box vazia"></span></div>\`).join('')+'</div>'+linhas(2),
        gab:as.map((a,i)=>\`<b>\${i+1}.</b> \${a[0]} → <b>\${a[1]}</b>\`).join('<br>')+'<br>Última pergunta: resposta pessoal.'}}},
  manifestacoes:{i:'🕍',n:'Manifestações religiosas',d:'símbolos, espaços, festas',c:'#E07A45',qtd:false,opts:()=>\`<div class="field"><label>Ligar</label>\${segBtns('tema',[['simbolos','Símbolos'],['espacos','Espaços sagrados'],['festas','Festas'],['textos','Textos e ensinamentos']])}</div>\`,
    gerar(){const[t,ins,lista]=MANIF[st.tema];const ps=emb(lista).slice(0,Math.min(7,lista.length));
      return{folha:head(t,ins)+AVISO+ligar(ps)+pq('Escolha um item e escreva o que você aprendeu sobre ele.',2),
        gab:ps.map(p=>\`\${p[0]} → \${p[1]}\`).join('<br>')+'<br>Última pergunta: resposta pessoal.'}}},
  leitura:{i:'📖',n:'Leitura e reflexão',d:'textos em 3 níveis',c:'#0D9488',qtd:false,prox(){const i=TEXTOS.findIndex(t=>t.k===st.texto);st.texto=TEXTOS[(i+1)%TEXTOS.length].k},opts:()=>\`<div class="field"><label>Texto</label>\${segBtns('texto',TEXTOS.map(t=>[t.k,t.t]))}</div>\`,
    gerar(){const T=TEXTOS.find(x=>x.k===st.texto)||TEXTOS[0];
      return{folha:head('Leitura e reflexão','Leia o texto com atenção e responda.')+\`<div class="texto-box"><h4>\${T.t}</h4>\${T.html}</div>\`+
        T.q.map((q,i)=>\`<div class="pq"><span class="nv \${q[0]}">\${NIVEL[q[0]]}</span>\${i+1}. \${q[1]}</div>\${linhas(q[3])}\`).join(''),
        gab:\`<b>\${T.t}</b><br>\`+T.q.map((q,i)=>\`<b>\${i+1}.</b> [\${NIVEL[q[0]]}] \${q[2]}\`).join('<br>')}}},
  ficha:{i:'🙋',n:'Quem sou eu',d:'ficha de identidade',c:'#E85A7D',qtd:false,
    gerar(){return{folha:head('Quem sou eu','Preencha com palavras ou desenhos. Não existe resposta certa: cada pessoa é única!')+
      '<div class="ficha-eu"><div>Meu nome e o que ele significa:</div><div>Pessoas importantes para mim:</div><div>Do que eu mais gosto:</div><div>Uma tradição ou festa da minha família:</div><div>Algo que aprendi com alguém diferente de mim:</div><div>Um desejo para o mundo:</div></div>',
      gab:'Respostas pessoais. Sugestão: exponha as fichas e converse sobre o que a turma tem de parecido e de diferente, valorizando cada história.'}}},
  caca:null};
`,

kits: `
const KITS={
  eu:{t:'Eu, o outro e nós',paginas(){const sv={...st};const a=GER.ficha.gerar();st.qtd=6;const b=GER.roda.gerar();st.qtd=8;const c=GER.atitudes.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha],gab:'<b>Quem sou eu</b><br>'+a.gab+'<br><br><b>Roda de conversa</b><br>'+b.gab+'<br><br><b>Atitudes de respeito</b><br>'+c.gab}}},
  diversidade:{t:'Diversidade religiosa',paginas(){const sv={...st};const r=[];for(const k of ['simbolos','espacos','festas']){st.tema=k;r.push(GER.manifestacoes.gerar())}Object.assign(st,sv);
    return{pg:r.map(x=>x.folha),gab:['Símbolos','Espaços sagrados','Festas'].map((t,i)=>'<b>'+t+'</b><br>'+r[i].gab).join('<br><br>')}}},
  liberdade:{t:'Liberdade de crença',paginas(){const sv={...st};st.texto='liberdade';const a=GER.leitura.gerar();st.texto='diversidade';const b=GER.leitura.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha],gab:a.gab+'<br><br>'+b.gab}}},
};
`
};

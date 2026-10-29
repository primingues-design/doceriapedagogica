// Partes próprias da Central de Geografia. O montador (build-geografia.js) junta com o
// código comum da Central de História (topo, rodapé, caça-palavras, impressão e kits).
module.exports = {
css: `:root{--rosa:#2E7D4F;--rosa-bg:#E2F3E7}
.eyebrow{border-color:rgba(46,125,79,.3);color:#2E7D4F}
.seg button.sel{color:#1D5A37}
.btn-print{box-shadow:0 5px 0 #1D5A37}
.mapa-br{display:block;width:100%;max-height:560px;margin:0 auto 10px}
.leg-c{display:grid;grid-template-columns:1fr 1fr;gap:8px 18px;margin-bottom:6px}
.leg-c div{display:flex;align-items:center;gap:10px;font-size:18px;font-weight:700}
.leg-c i{flex:none;width:34px;height:34px;border-radius:8px;border:2px solid #333;display:grid;place-items:center;font-style:normal;color:#fff;font-size:18px}
.leg-c .linha-ad{margin-left:0}
.grade{border-collapse:collapse;margin:0 auto 14px}
.grade td,.grade th{width:64px;height:64px;border:1.5px solid #888;text-align:center;font-size:36px;font-family:'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif}
.grade th{background:#F4EFE6;font-family:'Andika',sans-serif;font-size:22px;border-color:#888}
.bairro{border-collapse:separate;border-spacing:8px;margin:0 auto}
.bairro td{width:150px;height:96px;border:2px solid #333;border-radius:14px;text-align:center;vertical-align:middle;font-size:16px;font-weight:700;line-height:1.2}
.bairro td b{display:block;font-size:40px;font-family:'Segoe UI Emoji','Apple Color Emoji','Noto Color Emoji',sans-serif;font-weight:400}
.bairro td.centro{background:#FFF1A8}
.norte{text-align:center;font-weight:700;font-size:18px;margin:0 0 2px}
.prob{font-size:18px;line-height:1.45;margin:0 0 6px}
.item.foto{padding:6px 10px 6px 6px}
.item.foto img{width:170px;height:128px;object-fit:cover;border-radius:10px;flex:none}
.prob .linha-ad{display:inline-block;width:120px;height:26px;margin:0 6px;vertical-align:bottom}`,

hero: `<div class="hero">
  <div class="blob" style="width:480px;height:480px;background:#D7EEDD;top:-180px;left:-160px"></div>
  <div class="blob" style="width:380px;height:380px;background:#FFE9A8;top:40px;right:-120px"></div>
  <div class="blob" style="width:300px;height:300px;background:#DCEBF7;bottom:-160px;left:40%"></div>
  <div class="hero-in">
    <div>
      <div class="eyebrow">🌎 Central de Geografia</div>
      <h1>Atividades de Geografia <em>para imprimir</em></h1>
      <p>Estados e capitais, mapa do Brasil para colorir, rosa dos ventos, coordenadas, escala, setores da economia e <b>leitura de mapas de verdade</b> — tudo com <b>gabarito do professor</b>.</p>
      <div class="chips"><span>🎁 Comece grátis, sem cadastro</span><span>🗺️ Mapas oficiais do IBGE</span><span>🧭 Orientação e escala</span><span>✅ Com gabarito</span></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="letra" style="--r:-8deg;background:#2E7D4F;left:2%;top:8%">N</div>
      <div class="letra" style="--r:6deg;background:#F2A900;right:4%;top:0;animation-delay:-2s;width:110px;font-size:40px">SP</div>
      <div class="letra" style="--r:-4deg;background:#3B82C4;left:14%;top:46%;animation-delay:-4s">🧭</div>
      <div class="letra" style="--r:8deg;background:#C8742A;right:8%;top:42%;animation-delay:-3s;width:96px;font-size:40px">B3</div>
      <div class="lia"><div data-char="teo"></div></div>
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
      <button class="btn3d btn-new" onclick="gerar()">🔄 Gerar outra folha</button>
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
    <button class="card" onclick="abrirKit('brasil')" style="--sh:#E2F3E7;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#E2F3E7">🇧🇷</div><h3>Meu Brasil</h3><p>Mapa das regiões, estados e capitais, descubra os estados no mapa e o estado onde eu moro.</p><span class="tag" style="background:#E2F3E7;color:#1D5A37">👀 Ver o kit · 5 páginas</span></button>
    <button class="card" onclick="abrirKit('orientacao')" style="--sh:#E3ECFA;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#E3ECFA">🧭</div><h3>Orientação no espaço</h3><p>Rosa dos ventos, pontos cardeais no bairro, coordenadas e escala do mapa + gabarito.</p><span class="tag" style="background:#E3ECFA;color:#163a73">👀 Ver o kit · 5 páginas</span></button>
    <button class="card" onclick="abrirKit('mundo')" style="--sh:#FFF0DE;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#FFF0DE">🌍</div><h3>O planeta Terra</h3><p>Continentes e oceanos, linhas imaginárias e biomas do Brasil, com mapas do IBGE + gabarito.</p><span class="tag" style="background:#FFF0DE;color:#9A5418">👀 Ver o kit · 4 páginas</span></button>
  </div>
  <div id="kitView"></div>
</div></section>

<section id="jogos" style="padding-top:10px"><div class="wrap">
  <div class="kicker">Jogos e aula</div>
  <h2 class="sec-title">Para jogar e apresentar na TV</h2>
  <p class="sec-sub">Monte um jogo ou uma aula de Geografia sobre o tema que você está trabalhando.</p>
  <div class="cards">
    <a class="card" href="/jogos.html" style="--sh:#EEE9FF"><div class="ic" style="background:#EEE9FF">❓</div><h3>Quiz</h3><p>Perguntas sobre o tema da aula, na TV, com modo equipes.</p><span class="tag" style="background:#EEE9FF;color:#6A4FD8">▶ Criar quiz</span></a>
    <a class="card" href="/slides.html" style="--sh:#FFF0DE"><div class="ic" style="background:#FFF0DE">🗺️</div><h3>Slides com mapas</h3><p>Aula pronta com mapas e esquemas da biblioteca, sem erro de geografia.</p><span class="tag" style="background:#FFF0DE;color:#9A5418">▶ Criar slides</span></a>
    <a class="card" href="/trilha.html" style="--sh:#DDF7EE"><div class="ic" style="background:#DDF7EE">🎲</div><h3>Trilha</h3><p>Tabuleiro com perguntas de Geografia.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">▶ Criar jogo</span></a>
  </div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
  <div class="ia">
    <div class="robo"><span class="balao">Me diga o tema! 😊</span><img src="/img/robo-doceria.webp" alt="Robozinho da IA da Doceria"></div>
    <div>
      <div class="kicker" style="color:#FFD9A8">Quer outro tema?</div>
      <h2>A IA da Doceria cria a atividade do seu jeito</h2>
      <p>Urbanização, clima do Brasil, agricultura, migração, sustentabilidade… Diga o tema e a IA monta a atividade de Geografia com gabarito e os mapas certos da biblioteca.</p>
      <a class="btn3d" href="/prova.html?componente=geografia" style="background:#FFC93C;color:#3D1F0D;padding:14px 22px;box-shadow:0 6px 0 #C99A16;font-size:17px">✨ Criar com IA</a>
    </div>
    <div class="ia-list">
      <a href="/prova.html?componente=geografia">📝 Atividade</a><a href="/prova.html?componente=geografia">✅ Avaliação</a><a href="/apostila.html">📖 Texto & compreensão</a><a href="/mapa.html">🧠 Mapa mental</a><a href="/slides.html">🖼️ Slides</a><a href="/jogos.html">❓ Quiz</a>
    </div>
  </div>
</div></section>

<section class="faq" style="padding-top:10px"><div class="wrap" style="max-width:820px">
  <h2 class="sec-title" style="text-align:center;margin-bottom:18px">Perguntas frequentes</h2>
  <details><summary>Para qual turma servem?</summary><p>Para o Ensino Fundamental. As folhas não trazem ano escrito — você escolhe a atividade, as opções e a quantidade de itens.</p></details>
  <details><summary>Os mapas são confiáveis?</summary><p>Sim. Os mapas-múndi são do Atlas do IBGE e os mapas do Brasil e os esquemas foram desenhados e conferidos para a biblioteca da Doceria. As folhas não são geradas por IA: elas sorteiam itens de um banco conferido.</p></details>
  <details><summary>Posso escolher só uma região do Brasil?</summary><p>Pode. Em "Estados e capitais", "Descubra no mapa" e "Estado e região" você escolhe o Brasil todo ou uma das cinco regiões.</p></details>
  <details><summary>Como funcionam os créditos?</summary><p>Você pode ver e gerar quantas folhas quiser. Para imprimir ou salvar em PDF, cada folha usa 1 crédito — e você começa com 3 grátis, sem cadastro. Com o e-mail ganha mais 2 e, depois, 1 grátis por semana. Cada kit inteiro usa só 1 crédito.</p></details>
</div></section>`,

dados: `
// ── BANCO CONFERIDO ──
// unidades da federação: [sigla, nome (= id no mapa SVG), capital, região]
const UF=[['AC','Acre','Rio Branco','N'],['AP','Amapá','Macapá','N'],['AM','Amazonas','Manaus','N'],['PA','Pará','Belém','N'],['RO','Rondônia','Porto Velho','N'],['RR','Roraima','Boa Vista','N'],['TO','Tocantins','Palmas','N'],
 ['AL','Alagoas','Maceió','NE'],['BA','Bahia','Salvador','NE'],['CE','Ceará','Fortaleza','NE'],['MA','Maranhão','São Luís','NE'],['PB','Paraíba','João Pessoa','NE'],['PE','Pernambuco','Recife','NE'],['PI','Piauí','Teresina','NE'],['RN','Rio Grande do Norte','Natal','NE'],['SE','Sergipe','Aracaju','NE'],
 ['DF','Distrito Federal','Brasília','CO'],['GO','Goiás','Goiânia','CO'],['MT','Mato Grosso','Cuiabá','CO'],['MS','Mato Grosso do Sul','Campo Grande','CO'],
 ['ES','Espírito Santo','Vitória','SE'],['MG','Minas Gerais','Belo Horizonte','SE'],['RJ','Rio de Janeiro','Rio de Janeiro','SE'],['SP','São Paulo','São Paulo','SE'],
 ['PR','Paraná','Curitiba','S'],['RS','Rio Grande do Sul','Porto Alegre','S'],['SC','Santa Catarina','Florianópolis','S']];
const REG={N:'Norte',NE:'Nordeste',CO:'Centro-Oeste',SE:'Sudeste',S:'Sul'};
const CORES_MAPA=['#E85A7D','#F2A900','#2C9C7E','#3B82C4','#7C5CE0','#E07A45','#1F4E9A','#B8860B','#C8102E','#5E9E3A'];
const SETORES=[['Agricultura','🌽','P'],['Criação de gado','🐄','P'],['Pesca','🎣','P'],['Mineração','⛏️','P'],['Extração de madeira','🪵','P'],['Plantação de café','☕','P'],
 ['Fábrica de carros','🚗','S'],['Indústria de alimentos','🥫','S'],['Construção de prédios','🏗️','S'],['Fábrica de roupas','🧵','S'],['Fábrica de móveis','🪑','S'],['Usina que produz energia','⚡','S'],
 ['Loja e mercado','🛒','T'],['Escola','🏫','T'],['Hospital','🏥','T'],['Transporte de ônibus','🚌','T'],['Banco','🏦','T'],['Hotel e turismo','🏨','T'],['Restaurante','🍽️','T']];
const SETOR={P:'Primário',S:'Secundário',T:'Terciário'};
// fotos realistas (Flux, curadas) em /assets/paisagem/<arquivo>.jpg
const PAISAGENS=[['Montanha','montanha','N'],['Vulcão','vulcao','N'],['Ilha deserta','ilha','N'],['Mar','mar','N'],['Deserto','deserto','N'],['Floresta','floresta','N'],['Cachoeira','cachoeira','N'],['Rio na floresta','rio','N'],
 ['Cidade','cidade','M'],['Ponte','ponte','M'],['Rodovia','estrada','M'],['Fábrica','fabrica','M'],['Plantação','plantacao','M'],['Bairro','bairro','M'],['Porto','porto','M'],['Represa (barragem)','represa','M']];
const LUGARES=[['🏠','Casa'],['🏥','Hospital'],['🌳','Praça'],['🍞','Padaria'],['⛪','Igreja'],['🏪','Mercado'],['🚒','Bombeiros'],['🏦','Banco'],['📮','Correios'],['🏟️','Estádio'],['💊','Farmácia'],['🚉','Estação']];
const DIRS=[['N','norte',0,-1],['NE','nordeste',1,-1],['L','leste',1,0],['SE','sudeste',1,1],['S','sul',0,1],['SO','sudoeste',-1,1],['O','oeste',-1,0],['NO','noroeste',-1,-1]];
const FIGS=['🍎','⭐','🐟','🚗','🌸','⚽','🎈','🐱','🏠','🌙'];
const cw=s=>s.split('|').map(x=>{const[p,pista]=x.split('=');return{p,pista}});
const CACA={
 relevo:['⛰️ Relevo',cw("MONTANHA=Grande elevação do terreno, com picos altos|PLANALTO=Terreno elevado e mais plano no alto, onde há desgaste|PLANICIE=Terreno plano e baixo onde se acumulam sedimentos|DEPRESSAO=Área mais baixa que as terras ao redor|SERRA=Conjunto de morros ou montanhas em sequência|VALE=Área baixa entre montanhas, por onde costuma correr um rio|VULCAO=Abertura na crosta da Terra por onde sai lava|EROSAO=Desgaste do solo causado pela água ou pelo vento|PICO=Ponto mais alto de uma montanha|MORRO=Elevação pequena do terreno|CHAPADA=Planalto de topo plano e bordas íngremes|LITORAL=Faixa de terra junto ao mar")],
 clima:['🌦️ Clima e tempo',cw("CHUVA=Água que cai das nuvens|VENTO=Ar em movimento|NUVEM=Gotinhas de água suspensas no céu|TEMPERATURA=Medida de quanto está quente ou frio|UMIDADE=Quantidade de vapor de água no ar|GEADA=Camada fina de gelo que se forma em noites muito frias|SECA=Longo período sem chuva|TERMOMETRO=Aparelho que mede a temperatura|ESTACAO=Primavera, verão, outono ou inverno|TROPICAL=Clima quente da maior parte do Brasil|GRANIZO=Chuva de pedrinhas de gelo|NEBLINA=Nuvem baixa, perto do chão, que atrapalha a visão")],
 agua:['💧 Rios e águas',cw("RIO=Curso de água doce que corre até o mar ou outro rio|NASCENTE=Lugar onde o rio começa|FOZ=Lugar onde o rio termina, no mar ou em outro rio|AFLUENTE=Rio que deságua em outro rio maior|BACIA=Área cujas águas correm para um mesmo rio principal|AMAZONAS=Rio mais volumoso do mundo|PARANA=Rio onde fica a usina de Itaipu|AQUIFERO=Grande reserva de água debaixo da terra|LAGO=Porção de água parada cercada de terra|CACHOEIRA=Queda de água num rio|OCEANO=Grande massa de água salgada que cobre a maior parte da Terra|REPRESA=Lago artificial formado por uma barragem")],
 mapas:['🧭 Mapas e orientação',cw("MAPA=Representação de um lugar visto de cima, em tamanho reduzido|LEGENDA=Quadro que explica os símbolos e as cores do mapa|ESCALA=Mostra quantas vezes o lugar foi reduzido no mapa|TITULO=Diz qual é o assunto do mapa|BUSSOLA=Instrumento com agulha imantada usado para se orientar|NORTE=Ponto cardeal oposto ao sul|OESTE=Lado onde o Sol se põe|GLOBO=Representação da Terra em forma de esfera|LATITUDE=Distância, em graus, da linha do Equador|LONGITUDE=Distância, em graus, do meridiano de Greenwich|EQUADOR=Linha imaginária que divide a Terra em Norte e Sul|GREENWICH=Meridiano de 0°, que passa perto de Londres")],
 regioes:['🇧🇷 Regiões do Brasil',cw("NORTE=Maior região do Brasil em área|NORDESTE=Região com nove estados|SUDESTE=Região mais populosa do país|SUL=Região de Paraná, Santa Catarina e Rio Grande do Sul|BRASILIA=Capital do Brasil|AMAZONAS=Maior estado do Brasil em área|SERGIPE=Menor estado do Brasil em área|MANAUS=Capital do Amazonas|SALVADOR=Capital da Bahia e primeira capital do Brasil|CURITIBA=Capital do Paraná|RECIFE=Capital de Pernambuco|PALMAS=Capital do Tocantins, o estado mais novo")],
 biomas:['🌳 Biomas',cw("AMAZONIA=Maior bioma do Brasil, com a maior floresta tropical do mundo|CERRADO=Bioma de savana do centro do Brasil|CAATINGA=Bioma do semiárido que só existe no Brasil|PANTANAL=Maior planície alagável do mundo|PAMPA=Bioma de campos do Rio Grande do Sul|MANGUEZAL=Ambiente de lama e água salgada na beira do mar|ONCA=Maior felino das Américas|ARARA=Ave colorida de bico forte|IPE=Árvore de flores amarelas, roxas ou brancas|QUEIMADA=Fogo que destrói a vegetação|MANDACARU=Cacto típico da Caatinga|BIOMA=Conjunto de seres vivos e paisagens de uma grande região")]};
// mapas da biblioteca para leitura: [chave, arquivo, título, crédito, perguntas [pergunta, resposta, linhas]]
const MAPAS=[
 ['continentes','/assets/geografia/continentes-oceanos.jpg','Mapa-múndi: continentes e oceanos','IBGE, Atlas Geográfico Escolar',[
   ['1. Cada continente está pintado de uma cor. Escreva o nome dos continentes.','América, Europa, África, Ásia, Oceania e Antártida.',2],
   ['2. Escreva o nome dos oceanos.','Pacífico, Atlântico, Índico, Glacial Ártico e Glacial Antártico.',2],
   ['3. Em que continente fica o Brasil? Que oceano banha o Brasil?','Na América (do Sul). O Oceano Atlântico.',2],
   ['4. Qual é o maior continente? E o continente coberto de gelo, no extremo sul?','A Ásia. A Antártida.',2]]],
 ['linhas','/assets/geografia/linhas-imaginarias.jpg','Linhas imaginárias da Terra','IBGE, Atlas Geográfico Escolar',[
   ['1. Qual linha imaginária divide a Terra em hemisfério Norte e hemisfério Sul?','A Linha do Equador.',1],
   ['2. Qual meridiano é o 0° e divide a Terra em Leste e Oeste?','O Meridiano de Greenwich.',1],
   ['3. Qual trópico passa pelo Brasil, nos estados de São Paulo, Paraná e Mato Grosso do Sul?','O Trópico de Capricórnio.',1],
   ['4. A maior parte do Brasil fica em qual hemisfério: Norte ou Sul? E Leste ou Oeste?','No hemisfério Sul. Todo o Brasil fica no hemisfério Oeste (ocidental).',2]]],
 ['biomas','/assets/geografia/biomas-mapa.png','Biomas brasileiros','Biblioteca Doceria Pedagógica, com base no IBGE',[
   ['1. Quantos biomas aparecem no mapa? Escreva o nome deles.','Seis: Amazônia, Cerrado, Mata Atlântica, Caatinga, Pampa e Pantanal.',2],
   ['2. Qual bioma ocupa a maior parte do Brasil?','A Amazônia.',1],
   ['3. Qual bioma aparece em quase todo o Nordeste, no interior?','A Caatinga.',1],
   ['4. Qual bioma fica no extremo sul do Brasil? E qual é o menor em área?','O Pampa. O Pantanal.',2],
   ['5. Em qual bioma fica a sua cidade? Como é a paisagem aí?','Resposta pessoal.',2]]],
 ['regioes','/assets/geografia/brasil-regioes-cores.svg','Brasil: as cinco regiões','Biblioteca Doceria Pedagógica, com base no IBGE',[
   ['1. Quantas regiões tem o Brasil? Escreva o nome delas.','Cinco: Norte, Nordeste, Centro-Oeste, Sudeste e Sul.',2],
   ['2. Qual é a maior região em área? E qual tem mais estados?','A Região Norte. A Região Nordeste, com nove estados.',2],
   ['3. Em que região fica Brasília, a capital do país?','Na Região Centro-Oeste.',1],
   ['4. Em que região você mora? Cite um estado vizinho ao seu.','Resposta pessoal.',2]]],
 ['rosa','/assets/geografia/rosa-dos-ventos.svg','Rosa dos ventos','Biblioteca Doceria Pedagógica',[
   ['1. Quais são os quatro pontos cardeais?','Norte, Sul, Leste e Oeste.',1],
   ['2. Quais são os pontos colaterais?','Nordeste, Sudeste, Sudoeste e Noroeste.',1],
   ['3. Qual ponto colateral fica entre o Norte e o Leste? E entre o Sul e o Oeste?','Nordeste. Sudoeste.',1],
   ['4. De que lado o Sol nasce? E de que lado ele se põe?','Nasce no lado Leste e se põe no lado Oeste.',1]]]];
`,

ger: `
const st={g:'capitais',qtd:8,reg:'todos',dirs:'cardeais',escala:100,caca:'relevo',cacaModo:'banco',cacaN:8,mapa:'continentes'};
const segBtns=(campo,lista)=>\`<div class="seg">\${lista.map(([k,n])=>\`<button class="\${st[campo]===k?'sel':''}" onclick="st.\${campo}=\${JSON.stringify(k).replace(/"/g,"'")};render()">\${n}</button>\`).join('')}</div>\`;
const regSeg=()=>\`<div class="field"><label>Região</label>\${segBtns('reg',[['todos','🇧🇷 Brasil todo'],...Object.entries(REG)])}</div>\`;
const ufs=()=>UF.filter(u=>st.reg==='todos'||u[3]===st.reg);
const pq=(t,n)=>\`<div class="pq">\${t}</div>\${linhas(n)}\`;
// mapa do Brasil (SVG com um caminho por estado) — carregado uma vez e colorido na folha
let MAPA_SVG='';
fetch('/assets/geografia/brasil-contorno-estados.svg').then(r=>r.text()).then(t=>{
  MAPA_SVG=t.replace(/<\\?xml[^>]*>/,'').replace(/<style>[\\s\\S]*?<\\/style>/,'').replace('<svg ','<svg class="mapa-br" fill="#ffffff" stroke="#333333" stroke-width="420" stroke-linejoin="round" ');
  if(['mapa','casa'].includes(st.g))render()}).catch(()=>{});
function mapaBR(cores){if(!MAPA_SVG)return '<p style="text-align:center;color:#999">Carregando o mapa…</p>';
  let s=MAPA_SVG;for(const[nome,cor]of Object.entries(cores))s=s.replace('id="'+nome+'"','id="'+nome+'" style="fill:'+cor+'"');return s}

const GER={
  capitais:{i:'🏙️',n:'Estados e capitais',d:'ligue o estado à capital',c:'#2E7D4F',reg:true,
    gerar(){const n=Math.min(st.qtd,8,ufs().length);const us=emb(ufs()).slice(0,n);const dir=emb(us);
      return{folha:head('Estados e capitais','<b>Ligue</b> cada estado à sua capital.')+'<div class="lig txt">'+us.map((u,i)=>\`<div class="l">\${u[1]} (\${u[0]})<span class="dot"></span></div><div></div><div class="r"><span class="dot"></span>\${dir[i][2]}</div>\`).join('')+'</div>',
        gab:us.map(u=>\`\${u[1]} (\${u[0]}) → \${u[2]}\`).join('<br>')}}},
  mapa:{i:'🗺️',n:'Descubra no mapa',d:'estados coloridos',c:'#E85A7D',reg:true,
    gerar(){const n=Math.min(st.qtd===6?4:6,ufs().length);const us=emb(ufs()).slice(0,n);const cores={};us.forEach((u,i)=>cores[u[1]]=CORES_MAPA[i]);
      return{folha:head('Descubra no mapa','Observe os estados pintados no mapa. Escreva o <b>nome</b> e a <b>capital</b> de cada um.')+mapaBR(cores)+
        '<div class="leg-c">'+us.map((u,i)=>\`<div><i style="background:\${CORES_MAPA[i]}">\${i+1}</i><span class="linha-ad"></span></div>\`).join('')+'</div>',
        gab:us.map((u,i)=>\`<b>\${i+1}.</b> \${u[1]} (\${u[0]}) — capital: \${u[2]} — Região \${REG[u[3]]}\`).join('<br>')}}},
  regiao:{i:'🧩',n:'Estado e região',d:'em que região fica?',c:'#F2A900',
    gerar(){const n=st.qtd;let us=[];const por={};UF.forEach(u=>(por[u[3]]=por[u[3]]||[]).push(u));for(let i=0;us.length<n;i++)for(const r of emb(Object.keys(REG)))if(por[r][i]&&us.length<n)us.push(por[r][i]);us=emb(us);
      return{folha:head('Estado e região','Escreva a <b>sigla da região</b> onde fica cada estado.')+'<div class="leg" style="grid-template-columns:repeat(5,1fr)">'+Object.entries(REG).map(([k,v])=>\`<div><b>\${k}</b>\${v}</div>\`).join('')+'</div><div class="g2">'+
        us.map(u=>\`<div class="item"><span style="flex:1;font-size:20px;font-weight:700">\${u[1]}</span><span class="box vazia" style="width:60px"></span></div>\`).join('')+'</div>',
        gab:us.map(u=>\`\${u[1]} → <b>\${u[3]}</b> (\${REG[u[3]]})\`).join('<br>')}}},
  cardeais:{i:'🧭',n:'Pontos cardeais',d:'onde fica no bairro?',c:'#3B82C4',qtd:false,opts:()=>\`<div class="field"><label>Direções</label>\${segBtns('dirs',[['cardeais','Só cardeais'],['colaterais','Com colaterais']])}</div>\`,
    gerar(){const ls=emb(LUGARES).slice(0,8);const grid={};DIRS.forEach((d,i)=>grid[d[2]+','+d[3]]=ls[i]);
      const cel=(x,y)=>{if(!x&&!y)return '<td class="centro"><b>🏫</b>Escola</td>';const l=grid[x+','+y];return \`<td><b>\${l[0]}</b>\${l[1]}</td>\`};
      const usa=st.dirs==='cardeais'?DIRS.filter(d=>d[0].length===1):DIRS;const qs=emb(usa);const metade=Math.ceil(qs.length/2);
      const q1=qs.slice(0,metade).map(d=>[\`O que fica a <b>\${d[1]}</b> da escola?\`,grid[d[2]+','+d[3]][1]]);
      const q2=qs.slice(metade).map(d=>{const l=grid[d[2]+','+d[3]];return[\`Em que direção fica <b>\${l[0]} \${l[1]}</b>, olhando da escola?\`,d[1]]});
      const tab='<p class="norte">⬆ N (norte)</p><table class="bairro">'+[-1,0,1].map(y=>'<tr>'+[-1,0,1].map(x=>cel(x,y)).join('')+'</tr>').join('')+'</table>';
      return{folha:head('Pontos cardeais no bairro','Observe o mapa do bairro. O <b>norte</b> fica para cima. Responda olhando a partir da <b>escola</b>.')+tab+
        '<div style="margin-top:10px">'+[...q1,...q2].map((q,i)=>\`<div class="prob"><b>\${i+1}.</b> \${q[0]} <span class="linha-ad"></span></div>\`).join('')+'</div>',
        gab:[...q1,...q2].map((q,i)=>\`<b>\${i+1}.</b> \${q[1]}\`).join('<br>')}}},
  coord:{i:'🎯',n:'Coordenadas',d:'como na batalha naval',c:'#C8742A',qtd:false,
    gerar(){const C='ABCDEF',cels=emb([...Array(36)].map((_,i)=>i));const figs=emb(FIGS).slice(0,6);const pos=cels.slice(0,6),vaz=cels.slice(6,8);
      const nome=i=>C[i%6]+(Math.floor(i/6)+1);const em={};pos.forEach((p,i)=>em[p]=figs[i]);const desenhar=[['❌ um X',vaz[0]],['⭕ um círculo',vaz[1]]];
      const tab='<table class="grade"><tr><th></th>'+[...C].map(c=>\`<th>\${c}</th>\`).join('')+'</tr>'+[...Array(6)].map((_,y)=>\`<tr><th>\${y+1}</th>\`+[...Array(6)].map((_,x)=>\`<td>\${em[y*6+x]||''}</td>\`).join('')+'</tr>').join('')+'</table>';
      return{folha:head('Coordenadas','Cada quadradinho tem uma <b>letra</b> (coluna) e um <b>número</b> (linha), como na batalha naval: <b>B3</b>.')+tab+
        '<div class="pq">1. Escreva a coordenada de cada figura:</div><div class="g2" style="grid-auto-rows:auto">'+figs.map(f=>\`<div class="item" style="padding:6px 12px"><span class="fig" style="font-size:34px">\${f}</span><span class="linha-ad"></span></div>\`).join('')+'</div>'+
        '<div class="pq">2. Desenhe na grade: '+desenhar.map(d=>\`\${d[0]} em <b>\${nome(d[1])}</b>\`).join(' e ')+'.</div>',
        gab:figs.map((f,i)=>\`\${f} = \${nome(pos[i])}\`).join(' · ')+'<br>2. '+desenhar.map(d=>\`\${d[0]} em \${nome(d[1])}\`).join(' e ')}}},
  escala:{i:'📏',n:'Escala do mapa',d:'distância no mapa e real',c:'#7C5CE0',qtd:false,opts:()=>\`<div class="field"><label>Escala: 1 cm no mapa =</label>\${segBtns('escala',[[1,'1 km'],[10,'10 km'],[50,'50 km'],[100,'100 km']])}</div>\`,
    gerar(){const e=st.escala,cid=emb(['a escola e a praça','a casa e o mercado','a cidade A e a cidade B','o rio e a montanha','a ponte e o porto','a fazenda e a cidade']);
      const ps=cid.map((c,i)=>{const cm=2+(Math.random()*9|0);return i%2?{t:\`No mapa, a distância entre \${c} é de <b>\${cm} cm</b>. Qual é a distância real?\`,r:\`\${cm} × \${e} = \${cm*e} km\`}:{t:\`A distância real entre \${c} é de <b>\${cm*e} km</b>. Quantos centímetros isso dá no mapa?\`,r:\`\${cm*e} ÷ \${e} = \${cm} cm\`}});
      return{folha:head('Escala do mapa',\`Neste mapa, <b>1 cm representa \${e} km</b> na realidade. Resolva os problemas.\`)+
        \`<div class="sec-aj">📏 <b>Escala:</b> <span style="display:inline-flex;align-items:center;gap:0;vertical-align:middle"><span style="width:60px;height:10px;background:#333"></span><span style="width:60px;height:10px;border:2px solid #333"></span></span> &nbsp; cada pedaço de 1 cm = \${e} km. Para achar a distância real, <b>multiplique</b>; para achar a do mapa, <b>divida</b>.</div>\`+
        ps.map((p,i)=>\`<div class="pq">\${i+1}. \${p.t}</div>\${linhas(1)}\`).join(''),
        gab:ps.map((p,i)=>\`<b>\${i+1}.</b> \${p.r}\`).join('<br>')}}},
  setores:{i:'🏭',n:'Setores da economia',d:'primário, secundário, terciário',c:'#B8860B',
    gerar(){const n=st.qtd;const por={P:[],S:[],T:[]};emb(SETORES).forEach(s=>por[s[2]].push(s));let ss=[];for(let i=0;ss.length<n;i++)for(const k of emb(['P','S','T']))if(por[k][i]&&ss.length<n)ss.push(por[k][i]);ss=emb(ss);
      return{folha:head('Setores da economia','Escreva a letra do <b>setor</b> de cada atividade.')+'<div class="leg" style="grid-template-columns:repeat(3,1fr)">'+
        [['P','Primário','tira da natureza'],['S','Secundário','transforma (indústria)'],['T','Terciário','comércio e serviços']].map(([k,v,d])=>\`<div><b>\${k}</b>\${v}<br><small>\${d}</small></div>\`).join('')+'</div><div class="g2">'+
        ss.map(s=>\`<div class="item"><span class="fig" style="font-size:44px">\${s[1]}</span><span style="flex:1;font-size:19px;font-weight:700">\${s[0]}</span><span class="box vazia"></span></div>\`).join('')+'</div>',
        gab:ss.map(s=>\`\${s[1]} \${s[0]} → <b>\${s[2]}</b> (\${SETOR[s[2]]})\`).join('<br>')}}},
  paisagem:{i:'🏞️',n:'Paisagem',d:'natural ou modificada?',c:'#5E9E3A',
    gerar(){const n=st.qtd;const nat=emb(PAISAGENS.filter(p=>p[2]==='N')),mod=emb(PAISAGENS.filter(p=>p[2]==='M'));const ps=emb([...nat.slice(0,n/2),...mod.slice(0,n/2)]);
      return{folha:head('Paisagem natural ou modificada?','Escreva <b>N</b> se a paisagem é <b>natural</b> ou <b>M</b> se foi <b>modificada</b> pelo ser humano. Depois, explique uma resposta.')+
        '<div class="leg" style="grid-template-columns:1fr 1fr"><div><b>N</b>Natural</div><div><b>M</b>Modificada pelo ser humano</div></div><div class="g2">'+
        ps.map((p,i)=>\`<div class="item foto"><img src="/assets/paisagem/\${p[1]}.jpg" alt=""><span style="flex:1;font-size:18px;font-weight:700">\${i+1}. \${p[0]}</span><span class="box vazia"></span></div>\`).join('')+'</div>'+linhas(2),
        gab:ps.map((p,i)=>\`\${i+1}. \${p[0]} → <b>\${p[2]}</b> (\${p[2]==='N'?'natural':'modificada'})\`).join('<br>')}}},
  leitura:{i:'🌍',n:'Leitura de mapa',d:'mapas do IBGE',c:'#1F4E9A',qtd:false,opts:()=>\`<div class="field"><label>Mapa</label>\${segBtns('mapa',MAPAS.map(m=>[m[0],m[2].replace(/^Mapa-múndi: /,'')]))}</div>\`,
    gerar(){const m=MAPAS.find(x=>x[0]===st.mapa)||MAPAS[0];
      return{folha:head('Leitura de mapa','Observe o mapa com atenção e responda.')+\`<img class="obra" src="\${m[1]}" alt="\${m[2]}" style="max-height:290px"><div class="obra-cred"><b>\${m[2]}</b> — fonte: \${m[3]}.</div>\`+m[4].map(q=>pq(q[0],q[2])).join(''),
        gab:m[4].map(q=>q[1]).join('<br>')}}},
  caca:null};
`,

kits: `
const KITS={
  brasil:{t:'Meu Brasil',paginas(){const sv={...st};st.reg='todos';st.qtd=8;const a=GER.capitais.gerar();const b=GER.mapa.gerar();const c=GER.regiao.gerar();Object.assign(st,sv);
    return{pg:[head('As regiões do Brasil','Observe o mapa. Pinte a região onde você mora e responda.')+'<img class="esq" src="/assets/geografia/brasil-regioes-cores.svg" alt="" style="max-height:470px">'+pq('Em que região você mora? Qual é o seu estado?',2)+pq('Cite um estado de cada região do Brasil.',3),
      a.folha,b.folha,c.folha],gab:'<b>Estados e capitais</b><br>'+a.gab+'<br><br><b>Descubra no mapa</b><br>'+b.gab+'<br><br><b>Estado e região</b><br>'+c.gab}}},
  orientacao:{t:'Orientação no espaço',paginas(){const sv={...st};st.dirs='colaterais';st.escala=10;const a=GER.cardeais.gerar();const b=GER.coord.gerar();const c=GER.escala.gerar();Object.assign(st,sv);
    return{pg:[head('A rosa dos ventos','Observe a rosa dos ventos e complete com os pontos cardeais e colaterais.')+'<img class="esq" src="/assets/geografia/rosa-dos-ventos.svg" alt="" style="max-height:430px">'+pq('Quais são os quatro pontos cardeais?',1)+pq('Que ponto colateral fica entre o norte e o leste?',1)+pq('De que lado o Sol nasce?',1),
      a.folha,b.folha,c.folha],gab:'<b>Rosa dos ventos</b><br>Norte, Sul, Leste e Oeste · Nordeste · O Sol nasce no lado Leste.<br><br><b>Pontos cardeais no bairro</b><br>'+a.gab+'<br><br><b>Coordenadas</b><br>'+b.gab+'<br><br><b>Escala</b><br>'+c.gab}}},
  mundo:{t:'O planeta Terra',paginas(){const sv={...st};const r=[];for(const k of ['continentes','linhas','biomas']){st.mapa=k;r.push(GER.leitura.gerar())}Object.assign(st,sv);
    return{pg:r.map(x=>x.folha),gab:['<b>Continentes e oceanos</b>','<b>Linhas imaginárias</b>','<b>Biomas</b>'].map((t,i)=>t+'<br>'+r[i].gab).join('<br><br>')}}},
};
`
};

// Partes próprias da Central de Ciências. O montador (build-ciencias.js) junta com o
// código comum da Central de História (topo, rodapé, caça-palavras, impressão e kits).
module.exports = {
css: `:root{--rosa:#2563A8;--rosa-bg:#E3F0FB}
.eyebrow{border-color:rgba(37,99,168,.3);color:#2563A8}
.seg button.sel{color:#173F6E}
.btn-print{box-shadow:0 5px 0 #173F6E}
.leg-n{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin:0 0 14px}
.leg-n div{display:flex;align-items:center;gap:8px;border:2px solid #333;border-radius:12px;padding:5px 10px;font-size:16px;font-weight:700}
.leg-n i{width:26px;height:26px;border-radius:6px;display:grid;place-items:center;color:#fff;font-style:normal;font-size:15px}
.cadeia{border:2px dashed #C9D6E8;border-radius:14px;padding:10px 12px;margin-bottom:12px}
.cadeia .itens{display:flex;flex-wrap:wrap;gap:10px;justify-content:center}
.cadeia .itens div{display:flex;flex-direction:column;align-items:center;gap:4px;font-size:16px;font-weight:700;width:104px;min-height:118px;text-align:center}
.cadeia .itens .fig{font-size:44px}
.cadeia .itens .box{margin-top:auto}
.mud{width:100%;border-collapse:collapse;font-size:17px}
.mud th{background:#E3F0FB;border:1.5px solid #555;padding:7px 4px;font-size:14px}
.mud th:first-child{text-align:left;padding-left:10px}
.mud td{border:1.5px solid #555;padding:9px 10px;line-height:1.3}
.mud td.x{width:15%;text-align:center}
.caixa-alta .mud{font-size:15px}
.caixa-alta .mud th{font-size:12px;padding:6px 2px}
.caixa-alta .mud td{padding:6px 8px}
.caixa-alta .pq{font-size:16px}
.mud td.x span{display:inline-block;width:30px;height:30px;border:2px solid #333;border-radius:6px;vertical-align:middle}
.planetas{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px}
.planetas div{border:2px dashed #C9D6E8;border-radius:12px;padding:8px;display:flex;align-items:center;justify-content:space-between;font-size:18px;font-weight:700}`,

hero: `<div class="hero">
  <div class="blob" style="width:480px;height:480px;background:#DCEBF7;top:-180px;left:-160px"></div>
  <div class="blob" style="width:380px;height:380px;background:#FFE9A8;top:40px;right:-120px"></div>
  <div class="blob" style="width:300px;height:300px;background:#D7EEDD;bottom:-160px;left:40%"></div>
  <div class="hero-in">
    <div>
      <div class="eyebrow">🔬 Central de Ciências</div>
      <h1>Atividades de Ciências <em>para imprimir</em></h1>
      <p>Biologia, Física e Química do Fundamental: animais, corpo humano, células, cadeia alimentar, água, Sistema Solar, eletricidade, ímãs, pH, misturas e <b>leitura de esquemas corretos</b> — tudo com <b>gabarito do professor</b>.</p>
      <div class="chips"><span>🎁 Comece grátis, sem cadastro</span><span>🧪 Esquemas conferidos</span><span>🥦 Guia Alimentar do Brasil</span><span>✅ Com gabarito</span></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="letra" style="--r:-8deg;background:#2563A8;left:2%;top:8%;width:120px;font-size:38px">H₂O</div>
      <div class="letra" style="--r:6deg;background:#F2A900;right:4%;top:0;animation-delay:-2s">☀️</div>
      <div class="letra" style="--r:-4deg;background:#2C9C7E;left:14%;top:46%;animation-delay:-4s">🌱</div>
      <div class="letra" style="--r:8deg;background:#E85A7D;right:8%;top:42%;animation-delay:-3s">🫀</div>
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
    <button class="card" onclick="abrirKit('corpo')" style="--sh:#FDE3E6;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#FDE3E6">🫀</div><h3>Corpo humano</h3><p>Leitura do sistema digestório, órgãos e sistemas e caça-palavras do corpo + gabarito.</p><span class="tag" style="background:#FDE3E6;color:#A01528">👀 Ver o kit · 4 páginas</span></button>
    <button class="card" onclick="abrirKit('plantas')" style="--sh:#DDF7EE;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#DDF7EE">🌱</div><h3>Plantas e água</h3><p>Partes da planta, ciclo da água e mudanças de estado físico + gabarito.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">👀 Ver o kit · 4 páginas</span></button>
    <button class="card" onclick="abrirKit('fisqui')" style="--sh:#EEE9FF;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#EEE9FF">⚡</div><h3>Física e Química</h3><p>Circuito elétrico, condutores e isolantes, separação de misturas e escala de pH + gabarito.</p><span class="tag" style="background:#EEE9FF;color:#6A4FD8">👀 Ver o kit · 5 páginas</span></button>
    <button class="card" onclick="abrirKit('ambiente')" style="--sh:#FFF1D6;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#FFF1D6">♻️</div><h3>Meio ambiente</h3><p>Cadeia alimentar, coleta seletiva e alimentação saudável pelo Guia Alimentar + gabarito.</p><span class="tag" style="background:#FFF1D6;color:#9A5418">👀 Ver o kit · 4 páginas</span></button>
  </div>
  <div id="kitView"></div>
</div></section>

<section id="jogos" style="padding-top:10px"><div class="wrap">
  <div class="kicker">Jogos e aula</div>
  <h2 class="sec-title">Para jogar e apresentar na TV</h2>
  <p class="sec-sub">Monte um jogo ou uma aula de Ciências sobre o tema que você está trabalhando.</p>
  <div class="cards">
    <a class="card" href="/jogos.html" style="--sh:#EEE9FF"><div class="ic" style="background:#EEE9FF">❓</div><h3>Quiz</h3><p>Perguntas sobre o tema da aula, na TV, com modo equipes.</p><span class="tag" style="background:#EEE9FF;color:#6A4FD8">▶ Criar quiz</span></a>
    <a class="card" href="/slides.html" style="--sh:#FFF0DE"><div class="ic" style="background:#FFF0DE">🧪</div><h3>Slides com esquemas</h3><p>Aula pronta com os esquemas corretos da biblioteca: corpo humano, células, ciclos.</p><span class="tag" style="background:#FFF0DE;color:#9A5418">▶ Criar slides</span></a>
    <a class="card" href="/trilha.html" style="--sh:#DDF7EE"><div class="ic" style="background:#DDF7EE">🎲</div><h3>Trilha</h3><p>Tabuleiro com perguntas de Ciências.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">▶ Criar jogo</span></a>
  </div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
  <div class="ia">
    <div class="robo"><span class="balao">Me diga o tema! 😊</span><img src="/img/robo-doceria.webp" alt="Robozinho da IA da Doceria"></div>
    <div>
      <div class="kicker" style="color:#FFD9A8">Quer outro tema?</div>
      <h2>A IA da Doceria cria a atividade do seu jeito</h2>
      <p>Células, vacinas, energia, misturas, ecossistemas… Diga o tema e a IA monta a atividade de Ciências com gabarito e os esquemas certos da biblioteca.</p>
      <a class="btn3d" href="/prova.html?componente=ciencias" style="background:#FFC93C;color:#3D1F0D;padding:14px 22px;box-shadow:0 6px 0 #C99A16;font-size:17px">✨ Criar com IA</a>
    </div>
    <div class="ia-list">
      <a href="/prova.html?componente=ciencias">📝 Atividade</a><a href="/prova.html?componente=ciencias">✅ Avaliação</a><a href="/apostila.html">📖 Texto & compreensão</a><a href="/mapa.html">🧠 Mapa mental</a><a href="/slides.html">🖼️ Slides</a><a href="/jogos.html">❓ Quiz</a>
    </div>
  </div>
</div></section>

<section class="faq" style="padding-top:10px"><div class="wrap" style="max-width:820px">
  <h2 class="sec-title" style="text-align:center;margin-bottom:18px">Perguntas frequentes</h2>
  <details><summary>Para qual turma servem?</summary><p>Para o Ensino Fundamental. As folhas não trazem ano escrito — você escolhe a atividade, as opções e a quantidade de itens.</p></details>
  <details><summary>Os esquemas e as respostas são confiáveis?</summary><p>Sim. Os esquemas foram desenhados e conferidos para a biblioteca da Doceria, e as folhas não são geradas por IA: elas sorteiam itens de um banco conferido. A atividade de alimentação segue a classificação do Guia Alimentar para a População Brasileira, do Ministério da Saúde.</p></details>
  <details><summary>Tem Biologia, Física e Química?</summary><p>Tem. Seguindo a BNCC, a central cobre Vida e evolução (animais, corpo humano, células, plantas), Matéria e energia (eletricidade, ímãs, calor, luz, som, átomo, pH e misturas) e Terra e Universo (ciclo da água, fases da Lua, Sistema Solar).</p></details>
  <details><summary>Por que não tem pirâmide alimentar?</summary><p>Porque o Guia Alimentar do Ministério da Saúde, desde 2014, orienta pelo grau de processamento dos alimentos (in natura, processados e ultraprocessados) — é o que usamos aqui.</p></details>
  <details><summary>Como funcionam os créditos?</summary><p>Você pode ver e gerar quantas folhas quiser. Para imprimir ou salvar em PDF, cada folha usa 1 crédito — e você começa com 3 grátis, sem cadastro. Com o e-mail ganha mais 2 e, depois, 1 grátis por semana. Cada kit inteiro usa só 1 crédito.</p></details>
</div></section>`,

dados: `
// ── BANCO CONFERIDO ──
const GRUPOS={MA:'Mamífero',AV:'Ave',RE:'Réptil',AN:'Anfíbio',PE:'Peixe'};
const ANIMAIS=[['Baleia','🐋','MA'],['Morcego','🦇','MA'],['Golfinho','🐬','MA'],['Vaca','🐄','MA'],['Macaco','🐒','MA'],['Elefante','🐘','MA'],['Leão','🦁','MA'],
 ['Pinguim','🐧','AV'],['Papagaio','🦜','AV'],['Galinha','🐔','AV'],['Coruja','🦉','AV'],['Pato','🦆','AV'],['Flamingo','🦩','AV'],
 ['Tartaruga','🐢','RE'],['Cobra','🐍','RE'],['Jacaré','🐊','RE'],['Lagarto','🦎','RE'],
 ['Sapo','🐸','AN'],['Perereca','🐸','AN'],
 ['Tubarão','🦈','PE'],['Sardinha','🐟','PE'],['Peixe-palhaço','🐠','PE'],['Baiacu','🐡','PE']];
// cadeias alimentares: do produtor ao último consumidor
const CADEIAS=[[['🌿','Capim'],['🦗','Gafanhoto'],['🐸','Sapo'],['🐍','Cobra'],['🦅','Gavião']],[['🌽','Milho'],['🐭','Rato'],['🐍','Cobra'],['🦅','Gavião']],[['🍃','Folhas'],['🐛','Lagarta'],['🐦','Passarinho'],['🐍','Cobra']],
 [['🌿','Capim'],['🦓','Zebra'],['🦁','Leão']],[['🌱','Algas'],['🐟','Peixe pequeno'],['🐡','Peixe maior'],['🦈','Tubarão']],[['🥕','Cenoura'],['🐇','Coelho'],['🦊','Raposa']]];
const MUDANCAS=[['O gelo derrete fora do congelador','Fusão'],['O sorvete derrete no sol','Fusão'],['A manteiga derrete na frigideira quente','Fusão'],
 ['A água vira gelo no congelador','Solidificação'],['A água da forminha vira cubinhos de gelo','Solidificação'],['A vela derretida endurece de novo','Solidificação'],
 ['A roupa molhada seca no varal','Vaporização'],['A poça de água some depois do sol','Vaporização'],['A água ferve na panela','Vaporização'],
 ['Aparecem gotinhas do lado de fora de um copo gelado','Condensação'],['O espelho do banheiro fica embaçado depois do banho','Condensação'],['A tampa da panela fica cheia de gotinhas','Condensação']];
const ORGAOS=[['Coração','🫀','Circulatório'],['Pulmões','🫁','Respiratório'],['Estômago','🍽️','Digestório'],['Cérebro','🧠','Nervoso'],['Rins','💧','Urinário'],['Ossos','🦴','Esquelético'],['Músculos','💪','Muscular'],['Pele','✋','Tegumentar']];
const PLANETAS=[['Mercúrio','É o planeta mais perto do Sol'],['Vênus','É o planeta mais quente'],['Terra','É o único planeta com vida conhecida'],['Marte','É chamado de planeta vermelho'],['Júpiter','É o maior planeta'],['Saturno','Tem os anéis mais visíveis'],['Urano','Gira como se estivesse deitado'],['Netuno','É o planeta mais distante do Sol']];
// Guia Alimentar para a População Brasileira (Ministério da Saúde, 2014)
const ALIM={N:'In natura ou minimamente processado',P:'Processado',U:'Ultraprocessado'};
const ALIMENTOS=[['Maçã','🍎','N'],['Ovo','🥚','N'],['Cenoura','🥕','N'],['Arroz','🍚','N'],['Feijão','🫘','N'],['Leite','🥛','N'],['Banana','🍌','N'],['Peixe fresco','🐟','N'],
 ['Queijo','🧀','P'],['Pão francês','🥖','P'],['Sardinha em lata','🥫','P'],['Pepino em conserva','🥒','P'],
 ['Refrigerante','🥤','U'],['Biscoito recheado','🍪','U'],['Salsicha','🌭','U'],['Macarrão instantâneo','🍜','U'],['Bala','🍬','U'],['Barra de chocolate','🍫','U']];
const LIXEIRAS=[['Papel','Azul','#2563A8'],['Plástico','Vermelho','#C8102E'],['Vidro','Verde','#2E7D4F'],['Metal','Amarelo','#E2A400'],['Orgânico','Marrom','#7A4A26']];
const LIXO=[['Jornal','📰',0],['Caixa de papelão','📦',0],['Folha de caderno','📄',0],['Frasco de xampu','🧴',1],['Copo plástico','🥤',1],['Sacola plástica','🛍️',1],['Garrafa de vidro','🍾',2],['Pote de vidro','🫙',2],['Lata de alumínio','🥫',3],['Tampinha de metal','🔩',3],['Casca de banana','🍌',4],['Resto de maçã','🍎',4],['Casca de ovo','🥚',4],['Borra de café','☕',4]];
const cw=s=>s.split('|').map(x=>{const[p,pista]=x.split('=');return{p,pista}});
const CACA={
 corpo:['🫀 Corpo humano',cw("CORACAO=Órgão que bombeia o sangue para o corpo todo|PULMAO=Órgão onde o oxigênio entra no sangue|ESTOMAGO=Órgão em forma de bolsa que digere os alimentos|CEREBRO=Órgão que comanda o corpo e guarda a memória|ESQUELETO=Conjunto de ossos que sustenta o corpo|MUSCULO=Parte do corpo que permite os movimentos|PELE=Maior órgão do corpo, que nos protege|SANGUE=Líquido vermelho que circula nos vasos sanguíneos|RINS=Órgãos que filtram o sangue e formam a urina|DENTES=Servem para cortar e triturar os alimentos|INTESTINO=Tubo longo onde os nutrientes são absorvidos|NARIZ=Órgão do olfato")],
 plantas:['🌱 Plantas',cw("RAIZ=Parte que fixa a planta e absorve água|CAULE=Parte que sustenta a planta e leva a seiva|FOLHA=Parte verde onde acontece a fotossíntese|FLOR=Parte responsável pela reprodução|FRUTO=Protege as sementes|SEMENTE=Dá origem a uma nova planta|CLOROFILA=Pigmento verde que capta a luz do Sol|SEIVA=Líquido que circula dentro da planta|POLEN=Pozinho da flor que ajuda na reprodução|GERMINACAO=Quando a semente começa a brotar|ABELHA=Inseto que leva o pólen de flor em flor|OXIGENIO=Gás que as plantas liberam na fotossíntese")],
 animais:['🐾 Animais',cw("MAMIFERO=Animal que mama quando é filhote|AVE=Animal com penas e bico|REPTIL=Animal de pele com escamas, como a cobra|ANFIBIO=Vive parte da vida na água e parte na terra, como o sapo|PEIXE=Respira por brânquias e tem nadadeiras|VERTEBRADO=Animal que tem coluna vertebral|INSETO=Invertebrado com seis patas|HERBIVORO=Animal que se alimenta só de plantas|CARNIVORO=Animal que se alimenta de outros animais|ONIVORO=Animal que come plantas e animais|METAMORFOSE=Grande mudança no corpo, como a da lagarta em borboleta|HABITAT=Lugar onde o animal vive")],
 agua:['💧 Água',cw("EVAPORACAO=Passagem da água líquida para vapor|CONDENSACAO=Vapor que vira gotinhas e forma as nuvens|CHUVA=Água que cai das nuvens|GELO=Água no estado sólido|VAPOR=Água no estado gasoso|NUVEM=Conjunto de gotinhas de água no céu|RIO=Curso de água doce que corre até o mar|OCEANO=Grande massa de água salgada|POTAVEL=Água boa para beber|ESGOTO=Água suja que sai das casas e precisa ser tratada|FILTRO=Retira impurezas da água|DESPERDICIO=Gastar água sem necessidade")],
 solar:['🪐 Sistema Solar',cw("SOL=Estrela no centro do Sistema Solar|MERCURIO=Planeta mais perto do Sol|VENUS=Planeta mais quente|TERRA=Único planeta com vida conhecida|MARTE=Planeta vermelho|JUPITER=Maior planeta|SATURNO=Planeta com os anéis mais visíveis|URANO=Planeta que gira como se estivesse deitado|NETUNO=Planeta mais distante do Sol|LUA=Satélite natural da Terra|ORBITA=Caminho que um planeta faz ao redor do Sol|ASTRONAUTA=Pessoa que viaja ao espaço")],
 ambiente:['♻️ Meio ambiente',cw("RECICLAGEM=Transformar o lixo em novos produtos|POLUICAO=Sujeira que prejudica o ar, a água ou o solo|QUEIMADA=Fogo que destrói a vegetação|COMPOSTAGEM=Transformar restos de comida em adubo|LIXO=Restos que jogamos fora|SOLAR=Energia ____: vem da luz do Sol|PRESERVAR=Cuidar da natureza para que ela continue existindo|FLORESTA=Grande área coberta de árvores|ECOSSISTEMA=Os seres vivos e o ambiente onde vivem, juntos|REUTILIZAR=Usar de novo um objeto em vez de jogar fora|AQUECIMENTO=O ____ global faz a temperatura da Terra subir|ECONOMIZAR=Gastar menos água e energia")]};
// esquemas da biblioteca para leitura: [chave, arquivo, título, perguntas [pergunta, resposta, linhas]]
const ESQUEMAS=[
 ['digestorio','/assets/ciencias/sistema-digestorio.png','Sistema digestório',[
   ['1. Escreva, em ordem, o caminho do alimento no corpo, da boca até o ânus.','Boca, esôfago, estômago, intestino delgado, intestino grosso, reto e ânus.',2],
   ['2. Onde a digestão começa? Como?','Na boca, com a mastigação e a saliva.',1],
   ['3. Em qual órgão a maior parte dos nutrientes passa para o sangue?','No intestino delgado.',1],
   ['4. O que acontece no intestino grosso?','A água é absorvida e as fezes são formadas.',2]]],
 ['planta','/assets/ciencias/partes-da-planta.svg','Partes da planta',[
   ['1. Qual parte fixa a planta no solo e absorve água e sais minerais?','A raiz.',1],
   ['2. Qual parte sustenta a planta e leva a seiva?','O caule.',1],
   ['3. Em qual parte acontece a maior parte da fotossíntese?','Na folha.',1],
   ['4. Para que servem a flor e o fruto?','A flor serve para a reprodução; o fruto protege as sementes e ajuda a espalhá-las.',2]]],
 ['ciclo','/assets/ciencias/ciclo-da-agua.svg','Ciclo da água',[
   ['1. Como a água dos rios e do mar sobe para o céu?','Pela evaporação, com o calor do Sol.',1],
   ['2. Como as nuvens se formam?','O vapor de água esfria lá no alto e se condensa em gotinhas (condensação).',2],
   ['3. Como a água volta para a superfície da Terra?','Pela precipitação: chuva, granizo ou neve.',1],
   ['4. Por que o ciclo da água é importante para a vida?','Resposta pessoal (ex.: ele renova a água dos rios, lagos e do solo, que os seres vivos usam).',2]]],
 ['lua','/assets/ciencias/fases-da-lua.svg','Fases da Lua',[
   ['1. Escreva o nome das quatro fases principais da Lua.','Lua nova, quarto crescente, lua cheia e quarto minguante.',1],
   ['2. A Lua tem luz própria? Explique.','Não. Ela reflete a luz do Sol.',1],
   ['3. Quanto tempo dura, mais ou menos, um ciclo completo das fases?','Cerca de 29 dias e meio (mais ou menos um mês).',1],
   ['4. Em que fase não conseguimos ver a parte iluminada da Lua?','Na lua nova.',1]]],
 ['cadeia','/assets/ciencias/cadeia-alimentar.svg','Cadeia alimentar',[
   ['1. Quem é o produtor dessa cadeia? Por que ele tem esse nome?','O capim. Porque produz o próprio alimento usando a luz do Sol (fotossíntese).',2],
   ['2. Quem se alimenta do gafanhoto?','O sapo.',1],
   ['3. Qual é o último consumidor da cadeia?','O gavião.',1],
   ['4. Se os sapos desaparecessem, o que aconteceria com os gafanhotos e com o gavião?','Os gafanhotos iriam aumentar (e comer mais capim) e o gavião ficaria com menos alimento.',2]]],
 ['cel_animal','/assets/ciencias/celula-animal.png','Célula animal',[
   ['1. Qual estrutura controla as atividades da célula e guarda o material genético (DNA)?','O núcleo.',1],
   ['2. Qual estrutura envolve a célula e controla o que entra e o que sai dela?','A membrana plasmática.',1],
   ['3. Qual organela produz a energia que a célula usa?','A mitocôndria.',1],
   ['4. Em que parte da célula ficam as organelas?','No citoplasma.',1]]],
 ['cel_vegetal','/assets/ciencias/celula-vegetal.png','Célula vegetal',[
   ['1. Cite duas estruturas que a célula vegetal tem e a célula animal não tem.','A parede celular e os cloroplastos (e também o grande vacúolo central).',2],
   ['2. Em qual organela acontece a fotossíntese?','No cloroplasto.',1],
   ['3. Para que serve a parede celular?','Dá forma, sustentação e proteção à célula.',1],
   ['4. O que o vacúolo central armazena?','Água e outras substâncias, como sais e nutrientes.',1]]],
 ['circuito','/assets/ciencias/circuito-eletrico.svg','Circuito elétrico',[
   ['1. Quais são as partes desse circuito elétrico?','Pilha, fios, interruptor e lâmpada.',1],
   ['2. Qual parte fornece energia ao circuito?','A pilha.',1],
   ['3. O que acontece com a lâmpada quando o interruptor fica aberto? Por quê?','Ela apaga: o circuito fica aberto e a corrente elétrica não passa.',2],
   ['4. Cite um material condutor de eletricidade e um isolante.','Condutor: metais, como o cobre dos fios. Isolante: plástico, borracha ou madeira.',1]]],
 ['ima','/assets/ciencias/ima-magnetismo.svg','Ímã e magnetismo',[
   ['1. Quais são os polos de um ímã?','Polo Norte e Polo Sul.',1],
   ['2. O que acontece quando aproximamos dois polos iguais? E dois polos diferentes?','Polos iguais se repelem; polos diferentes se atraem.',2],
   ['3. Para que serve a bússola?','Sua agulha é um ímã que aponta para o norte e ajuda a se orientar.',1],
   ['4. Cite um objeto que o ímã atrai e um que ele não atrai.','Atrai: prego ou clipe de ferro. Não atrai: papel, plástico, madeira ou alumínio.',1]]],
 ['maquinas','/assets/ciencias/maquinas-simples.svg','Máquinas simples',[
   ['1. Quais máquinas simples aparecem no esquema?','Alavanca, roldana e plano inclinado.',1],
   ['2. Para que servem as máquinas simples?','Para diminuir o esforço ou mudar a direção da força ao realizar um trabalho.',2],
   ['3. Dê um exemplo de alavanca no dia a dia.','Gangorra, tesoura, abridor de garrafa ou carrinho de mão.',1],
   ['4. Dê um exemplo de plano inclinado.','Rampa, escorregador ou ladeira.',1]]],
 ['calor','/assets/fisica/transmissao-calor.svg','Transmissão de calor',[
   ['1. Quais são as três formas de transmissão de calor?','Condução, convecção e radiação.',1],
   ['2. Como o calor do Sol chega até a Terra?','Por radiação, que não precisa de matéria para se propagar.',1],
   ['3. Por que o cabo de uma colher de metal esquenta dentro da panela quente?','Por condução: o calor passa de partícula em partícula no metal.',2],
   ['4. Em que materiais acontece a convecção?','Nos líquidos e nos gases (o ar ou a água quente sobem e os frios descem).',1]]],
 ['energia','/assets/fisica/tipos-energia.svg','Tipos de energia',[
   ['1. Que energia a bola tem quando está parada no alto da rampa?','Energia potencial (gravitacional).',1],
   ['2. E quando ela está descendo, em movimento?','Energia cinética.',1],
   ['3. O que acontece com a energia potencial enquanto a bola desce?','Ela diminui e se transforma em energia cinética.',2],
   ['4. Cite outra forma de energia que usamos em casa.','Elétrica, térmica, luminosa ou sonora, por exemplo.',1]]],
 ['luz','/assets/fisica/decomposicao-luz.svg','Decomposição da luz',[
   ['1. O que acontece com a luz branca quando ela passa pelo prisma?','Ela se separa (se decompõe) em várias cores.',1],
   ['2. Escreva as cores que aparecem.','Vermelho, laranja, amarelo, verde, azul, anil e violeta.',1],
   ['3. Que fenômeno da natureza mostra a decomposição da luz?','O arco-íris.',1],
   ['4. A luz branca é uma cor só? Explique.','Não. Ela é a mistura de todas as cores.',1]]],
 ['som','/assets/fisica/som-propagacao.svg','Propagação do som',[
   ['1. Como o som se propaga?','Em ondas, através de um meio material, como o ar, a água ou os sólidos.',1],
   ['2. Quem produz e quem recebe o som no esquema?','A fonte sonora produz e o ouvinte recebe.',1],
   ['3. O som se propaga no vácuo, onde não há ar?','Não. O som precisa de um meio material.',1],
   ['4. O som é mais rápido no ar ou na água?','Na água (ele é mais rápido nos líquidos e nos sólidos).',1]]],
 ['atomo','/assets/quimica/atomo.svg','O átomo',[
   ['1. Quais partículas ficam no núcleo do átomo?','Prótons e nêutrons.',1],
   ['2. Onde ficam os elétrons?','Na eletrosfera, ao redor do núcleo.',1],
   ['3. Qual é a carga elétrica do próton, do elétron e do nêutron?','Próton: positiva. Elétron: negativa. Nêutron: sem carga.',2],
   ['4. Num átomo neutro, como são o número de prótons e o de elétrons?','São iguais.',1]]],
 ['agua_mol','/assets/quimica/molecula-agua.svg','Molécula da água',[
   ['1. Quantos átomos de hidrogênio e de oxigênio formam uma molécula de água?','Dois de hidrogênio e um de oxigênio.',1],
   ['2. Como se escreve a fórmula da água?','H₂O.',1],
   ['3. Em quais estados físicos a água aparece na natureza? Dê um exemplo de cada.','Sólido (gelo), líquido (rios e mar) e gasoso (vapor de água).',2]]],
 ['ph','/assets/quimica/escala-ph.svg','Escala de pH',[
   ['1. Qual é o valor do pH neutro?','7.',1],
   ['2. Os valores menores que 7 indicam o quê? E os maiores que 7?','Menores que 7: ácido. Maiores que 7: básico.',1],
   ['3. Classifique como ácido, neutro ou básico: limão, água pura e sabão.','Limão: ácido. Água pura: neutra. Sabão: básico.',1],
   ['4. O vinagre tem pH maior ou menor que 7?','Menor que 7 (é ácido).',1]]],
 ['misturas','/assets/quimica/substancia-mistura.svg','Substância e mistura',[
   ['1. Qual é a diferença entre uma substância pura e uma mistura?','A substância pura tem um só tipo de componente; a mistura tem dois ou mais.',2],
   ['2. Qual é a diferença entre mistura homogênea e heterogênea?','Na homogênea não dá para distinguir os componentes (uma fase); na heterogênea dá (duas ou mais fases).',2],
   ['3. Classifique: água com sal, água com óleo e água com areia.','Água com sal: homogênea. Água com óleo e água com areia: heterogêneas.',1]]],
 ['reacao','/assets/quimica/reacao-quimica.svg','Reação química',[
   ['1. Quais são os reagentes dessa reação? E qual é o produto?','Reagentes: hidrogênio (H₂) e oxigênio (O₂). Produto: água (H₂O).',2],
   ['2. Quantos átomos de hidrogênio e de oxigênio há antes e depois da reação?','4 de hidrogênio e 2 de oxigênio, antes e depois.',1],
   ['3. Por que aparece o número 2 antes de H₂ e de H₂O?','Para que o número de átomos de cada elemento seja igual dos dois lados (a equação fica balanceada).',2],
   ['4. O que diz a lei de Lavoisier?','Numa reação química, nada se perde e nada se cria: os átomos só se reorganizam e a massa se conserva.',2]]],
 ['separacao','/assets/ciencias/separacao-misturas.svg','Separação de misturas',[
   ['1. Que método separa a areia da água?','A filtração.',1],
   ['2. Que método separa a água do óleo?','A decantação.',1],
   ['3. Por que o óleo fica por cima da água?','Porque ele é menos denso que a água.',1],
   ['4. Como podemos separar o sal da água do mar?','Pela evaporação da água (como nas salinas) ou pela destilação.',1]]]];
const AREAS=[['bio','🧬 Vida (Biologia)',['digestorio','planta','cadeia','cel_animal','cel_vegetal']],['terra','🌍 Terra e Universo',['ciclo','lua']],
 ['fis','⚡ Física',['circuito','ima','maquinas','calor','energia','luz','som']],['qui','🧪 Química',['atomo','agua_mol','reacao','ph','misturas','separacao']]];
// materiais e química do dia a dia: [nome, emoji, grupo]
const MATERIAIS={condutor:[{C:'Condutor',I:'Isolante'},[['Colher de metal','🥄','C'],['Prego','🔩','C'],['Chave de metal','🔑','C'],['Clipe de metal','📎','C'],['Fio de cobre','🔌','C'],['Panela de alumínio','🍳','C'],
   ['Pedaço de madeira','🪵','I'],['Frasco de plástico','🧴','I'],['Luva de borracha','🧤','I'],['Folha de papel','📄','I'],['Copo de vidro','🥛','I'],['Novelo de lã','🧶','I']]],
 ima:[{A:'O ímã atrai',N:'O ímã não atrai'},[['Prego de ferro','🔩','A'],['Clipe de aço','📎','A'],['Agulha de costura','🪡','A'],['Parafuso de ferro','🪛','A'],['Chave de fenda','🔧','A'],
   ['Folha de papel','📄','N'],['Lápis de madeira','✏️','N'],['Frasco de plástico','🧴','N'],['Lata de alumínio','🥫','N'],['Copo de vidro','🥛','N'],['Borracha escolar','🧽','N']]]};
const QUIMICA={ph:[{A:'Ácido',N:'Neutro',B:'Básico'},[['Limão','🍋','A'],['Vinagre','🫙','A'],['Suco de laranja','🍊','A'],['Refrigerante','🥤','A'],['Água pura','💧','N'],['Sabão','🧼','B'],['Água sanitária','🧴','B'],['Bicarbonato de sódio','🧂','B']]],
 mistura:[{HO:'Homogênea',HE:'Heterogênea'},[['Água com sal dissolvido','🧂','HO'],['Água com açúcar dissolvido','🍬','HO'],['Ar que respiramos','🌬️','HO'],['Café coado','☕','HO'],['Água e óleo','🛢️','HE'],['Água e areia','🏖️','HE'],['Salada de frutas','🥗','HE'],['Granito (pedra)','🪨','HE']]]};
`,

ger: `
const st={g:'animais',qtd:8,caca:'corpo',cacaModo:'banco',cacaN:8,esq:'digestorio',mat:'condutor',qui:'ph'};
const segBtns=(campo,lista)=>\`<div class="seg">\${lista.map(([k,n])=>\`<button class="\${st[campo]===k?'sel':''}" onclick="st.\${campo}=\${JSON.stringify(k).replace(/"/g,"'")};render()">\${n}</button>\`).join('')}</div>\`;
const pq=(t,n)=>\`<div class="pq">\${t}</div>\${linhas(n)}\`;
// sorteia n itens alternando entre os grupos (nenhum grupo fica de fora)
function equilibrado(lista,grupo,n){const por={};emb(lista).forEach(x=>(por[grupo(x)]=por[grupo(x)]||[]).push(x));const ks=Object.keys(por);let r=[];for(let i=0;r.length<n&&i<30;i++)for(const k of emb(ks))if(por[k][i]&&r.length<n)r.push(por[k][i]);return emb(r)}
const classifica=(titulo,instr,legenda,itens,cor)=>head(titulo,instr)+'<div class="leg" style="grid-template-columns:repeat('+legenda.length+',1fr)">'+legenda.map(([k,v])=>\`<div><b>\${k}</b>\${v}</div>\`).join('')+'</div><div class="g2">'+
  itens.map(x=>\`<div class="item"><span class="fig" style="font-size:44px">\${x[1]}</span><span style="flex:1;font-size:19px;font-weight:700">\${x[0]}</span><span class="box vazia" style="width:\${cor||48}px"></span></div>\`).join('')+'</div>';

const GER={
  animais:{i:'🐾',n:'Classificação dos animais',d:'vertebrados',c:'#2563A8',
    gerar(){const as=equilibrado(ANIMAIS,a=>a[2],st.qtd);
      return{folha:classifica('Classificação dos animais','Escreva a <b>sigla do grupo</b> de cada animal vertebrado.',Object.entries(GRUPOS),as,60),
        gab:as.map(a=>\`\${a[1]} \${a[0]} → <b>\${a[2]}</b> (\${GRUPOS[a[2]]})\`).join('<br>')}}},
  cadeia:{i:'🦅',n:'Cadeia alimentar',d:'quem come quem?',c:'#2C9C7E',qtd:false,
    gerar(){const cs=emb(CADEIAS).slice(0,3);
      return{folha:head('Cadeia alimentar','Numere cada cadeia na ordem certa, começando pelo <b>produtor</b> (1). Depois, responda.')+
        cs.map((c,i)=>\`<div class="cadeia"><b>Cadeia \${i+1}</b><div class="itens">\${emb(c).map(x=>\`<div><span class="fig">\${x[0]}</span>\${x[1]}<span class="box vazia"></span></div>\`).join('')}</div></div>\`).join('')+
        pq('Quem é o produtor em todas as cadeias? Por que ele é tão importante?',2),
        gab:cs.map((c,i)=>\`<b>Cadeia \${i+1}:</b> \`+c.map((x,j)=>\`\${j+1}. \${x[1]}\`).join(' → ')).join('<br>')+'<br><b>Pergunta:</b> as plantas (o produtor), que fazem o próprio alimento com a luz do Sol; sem elas, nenhum consumidor teria alimento.'}}},
  agua:{i:'💧',n:'Mudanças de estado',d:'fusão, condensação…',c:'#3B82C4',
    gerar(){const ms=equilibrado(MUDANCAS,m=>m[1],st.qtd);
      const TIPOS=['Fusão','Solidificação','Vaporização','Condensação'];
      return{folha:head('Mudanças de estado físico','Observe o esquema. Depois, marque com um <b>X</b> a mudança de estado que acontece em cada situação.')+'<img class="esq" src="/assets/ciencias/estados-da-materia.svg" alt="" style="max-height:180px">'+
        '<table class="mud"><tr><th>Situação</th>'+TIPOS.map(x=>\`<th>\${x}</th>\`).join('')+'</tr>'+
        ms.map((m,i)=>\`<tr><td><b>\${i+1}.</b> \${m[0]}</td>\${TIPOS.map(()=>'<td class="x"><span></span></td>').join('')}</tr>\`).join('')+'</table>',
        gab:ms.map((m,i)=>\`<b>\${i+1}.</b> \${m[0]} → \${m[1]}\`).join('<br>')}}},
  corpo:{i:'🫀',n:'Órgãos e sistemas',d:'corpo humano',c:'#E85A7D',
    gerar(){const n=Math.min(st.qtd,8);const os=emb(ORGAOS).slice(0,n);const dir=emb(os);
      return{folha:head('Órgãos e sistemas do corpo','<b>Ligue</b> cada órgão ao sistema do corpo de que ele faz parte.')+'<div class="lig">'+os.map((o,i)=>\`<div class="l"><span style="font-size:21px;font-weight:700">\${o[0]}</span><span class="fig" style="font-size:40px">\${o[1]}</span><span class="dot"></span></div><div></div><div class="r"><span class="dot"></span><span style="font-size:21px">Sistema \${dir[i][2].toLowerCase()}</span></div>\`).join('')+'</div>',
        gab:os.map(o=>\`\${o[0]} → sistema \${o[2].toLowerCase()}\`).join('<br>')}}},
  solar:{i:'🪐',n:'Sistema Solar',d:'ordem dos planetas',c:'#7C5CE0',qtd:false,
    gerar(){const ps=emb(PLANETAS);const qs=emb(PLANETAS).slice(0,5);const dir=emb(qs);
      return{folha:head('Sistema Solar','1. Numere os planetas do <b>mais perto</b> (1) ao <b>mais longe</b> (8) do Sol.')+'<div class="planetas">'+ps.map(p=>\`<div>\${p[0]}<span class="box vazia"></span></div>\`).join('')+'</div>'+
        '<p class="pi" style="margin:4px 0 10px">2. <b>Ligue</b> cada planeta à sua característica.</p><div class="lig txt">'+qs.map((p,i)=>\`<div class="l">\${p[0]}<span class="dot"></span></div><div></div><div class="r"><span class="dot"></span>\${dir[i][1]}</div>\`).join('')+'</div>',
        gab:'1. '+PLANETAS.map((p,i)=>\`\${i+1}. \${p[0]}\`).join(' · ')+'<br>2. '+qs.map(p=>\`\${p[0]} → \${p[1]}\`).join('<br>')}}},
  alimentos:{i:'🥦',n:'Alimentação',d:'Guia Alimentar',c:'#5E9E3A',
    gerar(){const as=equilibrado(ALIMENTOS,a=>a[2],st.qtd);
      return{folha:classifica('Do natural ao ultraprocessado','Escreva a letra de cada alimento, como no <b>Guia Alimentar para a População Brasileira</b>. Prefira sempre os alimentos da letra N!',Object.entries(ALIM),as),
        gab:as.map(a=>\`\${a[1]} \${a[0]} → <b>\${a[2]}</b> (\${ALIM[a[2]]})\`).join('<br>')+'<br><i>Fonte: Guia Alimentar para a População Brasileira, Ministério da Saúde, 2014.</i>'}}},
  lixo:{i:'♻️',n:'Coleta seletiva',d:'cores das lixeiras',c:'#B8860B',
    gerar(){const ls=equilibrado(LIXO,l=>l[2],st.qtd);
      return{folha:head('Coleta seletiva','Escreva o <b>número da lixeira</b> certa para cada resíduo.')+'<div class="leg-n">'+LIXEIRAS.map((l,i)=>\`<div><i style="background:\${l[2]}">\${i+1}</i>\${l[1]} · \${l[0]}</div>\`).join('')+'</div><div class="g2">'+
        ls.map(l=>\`<div class="item"><span class="fig" style="font-size:44px">\${l[1]}</span><span style="flex:1;font-size:19px;font-weight:700">\${l[0]}</span><span class="box vazia"></span></div>\`).join('')+'</div>',
        gab:ls.map(l=>\`\${l[1]} \${l[0]} → <b>\${l[2]+1}</b> (\${LIXEIRAS[l[2]][1].toLowerCase()} · \${LIXEIRAS[l[2]][0].toLowerCase()})\`).join('<br>')}}},
  materiais:{i:'⚡',n:'Materiais',d:'condutor? o ímã atrai?',c:'#E07A45',opts:()=>\`<div class="field"><label>Pergunta</label>\${segBtns('mat',[['condutor','⚡ Conduz eletricidade?'],['ima','🧲 O ímã atrai?']])}</div>\`,
    gerar(){const[leg,lista]=MATERIAIS[st.mat];const ms=equilibrado(lista,m=>m[2],st.qtd);const t=st.mat==='ima'?['O ímã atrai?','Escreva <b>A</b> se o ímã atrai o objeto ou <b>N</b> se ele não atrai.']:['Condutor ou isolante?','Escreva <b>C</b> se o material conduz eletricidade (condutor) ou <b>I</b> se não conduz (isolante).'];
      return{folha:classifica(t[0],t[1],Object.entries(leg),ms),gab:ms.map(m=>\`\${m[1]} \${m[0]} → <b>\${m[2]}</b> (\${leg[m[2]]})\`).join('<br>')}}},
  quimica:{i:'🧪',n:'Química do dia a dia',d:'pH e misturas',c:'#9A4A1F',opts:()=>\`<div class="field"><label>Classificar</label>\${segBtns('qui',[['ph','🍋 Ácido, neutro ou básico'],['mistura','🥗 Tipos de mistura']])}</div>\`,
    gerar(){const[leg,lista]=QUIMICA[st.qui];const n=Math.min(st.qtd,lista.length);const qs=equilibrado(lista,q=>q[2],n);const t=st.qui==='ph'?['Ácido, neutro ou básico?','Escreva a letra: <b>A</b> (ácido, pH menor que 7), <b>N</b> (neutro, pH 7) ou <b>B</b> (básico, pH maior que 7).']:['Homogênea ou heterogênea?','Escreva <b>HO</b> se a mistura é homogênea (uma fase só) ou <b>HE</b> se é heterogênea (dá para ver as partes).'];
      return{folha:classifica(t[0],t[1],Object.entries(leg),qs,st.qui==='mistura'?60:48)+(st.qui==='ph'?'<img class="esq" src="/assets/quimica/escala-ph.svg" alt="" style="max-height:170px;margin-top:12px">':''),gab:qs.map(q=>\`\${q[1]} \${q[0]} → <b>\${q[2]}</b> (\${leg[q[2]]})\`).join('<br>')}}},
  esquema:{i:'🔬',n:'Leitura de esquema',d:'Biologia, Física e Química',c:'#1F4E9A',qtd:false,prox(){const a=AREAS.find(x=>x[2].includes(st.esq))||AREAS[0];const ks=a[2];st.esq=ks[(ks.indexOf(st.esq)+1)%ks.length]},opts:()=>AREAS.map(([a,nome,ks])=>\`<div class="field"><label>\${nome}</label>\${segBtns('esq',ks.map(k=>[k,ESQUEMAS.find(e=>e[0]===k)[2]]))}</div>\`).join(''),
    gerar(){const e=ESQUEMAS.find(x=>x[0]===st.esq)||ESQUEMAS[0];
      return{folha:head('Leitura de esquema: '+e[2].toLowerCase(),'Observe o esquema com atenção e responda.')+\`<img class="esq" src="\${e[1]}" alt="\${e[2]}" style="max-height:370px">\`+e[3].map(q=>pq(q[0],q[2])).join(''),
        gab:e[3].map(q=>q[1]).join('<br>')}}},
  caca:null};
`,

kits: `
const KITS={
  corpo:{t:'Corpo humano',paginas(){const sv={...st};st.esq='digestorio';const a=GER.esquema.gerar();st.qtd=8;const b=GER.corpo.gerar();st.caca='corpo';st.cacaModo='pistas';st.cacaN=10;const c=GER.caca.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha],gab:'<b>Sistema digestório</b><br>'+a.gab+'<br><br><b>Órgãos e sistemas</b><br>'+b.gab+'<br><br><b>Caça-palavras</b><div style="zoom:.55">'+c.gab+'</div>'}}},
  plantas:{t:'Plantas e água',paginas(){const sv={...st};st.esq='planta';const a=GER.esquema.gerar();st.esq='ciclo';const b=GER.esquema.gerar();st.qtd=8;const c=GER.agua.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha],gab:'<b>Partes da planta</b><br>'+a.gab+'<br><br><b>Ciclo da água</b><br>'+b.gab+'<br><br><b>Mudanças de estado</b><br>'+c.gab}}},
  fisqui:{t:'Física e Química',paginas(){const sv={...st};st.esq='circuito';const a=GER.esquema.gerar();st.qtd=8;st.mat='condutor';const b=GER.materiais.gerar();st.esq='separacao';const c=GER.esquema.gerar();st.qui='ph';const d=GER.quimica.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha,d.folha],gab:'<b>Circuito elétrico</b><br>'+a.gab+'<br><br><b>Condutor ou isolante</b><br>'+b.gab+'<br><br><b>Separação de misturas</b><br>'+c.gab+'<br><br><b>Ácido, neutro ou básico</b><br>'+d.gab}}},
  ambiente:{t:'Meio ambiente',paginas(){const sv={...st};const a=GER.cadeia.gerar();st.qtd=8;const b=GER.lixo.gerar();const c=GER.alimentos.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha],gab:'<b>Cadeia alimentar</b><br>'+a.gab+'<br><br><b>Coleta seletiva</b><br>'+b.gab+'<br><br><b>Alimentação</b><br>'+c.gab}}},
};
`
};

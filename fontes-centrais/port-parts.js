// Partes próprias da Central de Língua Portuguesa. O montador (build-portugues.js) junta com o
// código comum da Central de História (topo, rodapé, caça-palavras, impressão, kits e caixa alta).
module.exports = {
css: `:root{--rosa:#B5462A;--rosa-bg:#FBE7DF}
.eyebrow{border-color:rgba(181,70,42,.3);color:#B5462A}
.seg button.sel{color:#7A2E1A}
.btn-print{box-shadow:0 5px 0 #7A2E1A}
.ops{display:flex;gap:8px;justify-content:center;margin:0 0 14px}
.ops span{border:2px solid #333;border-radius:10px;padding:3px 14px;font-size:22px;font-weight:700}
.pal{font-size:24px;font-weight:700;letter-spacing:1px;display:flex;align-items:center;flex-wrap:wrap}
.pal .box{width:52px;height:38px;margin:0 3px}
.frase{font-size:19px;line-height:1.35;flex:1}
.frase b{text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px}
.texto-box{border:2px solid #E3CDBE;border-radius:14px;padding:14px 18px;background:#FFFCF8;margin-bottom:12px}
.texto-box h4{font-family:'Baloo 2';font-size:22px;margin:0 0 6px}
.texto-box p{font-size:17px;line-height:1.55;margin:0 0 7px;text-align:justify}
.texto-box ul,.texto-box ol{font-size:17px;line-height:1.5;margin:0 0 6px;padding-left:22px}
.nv{display:inline-block;font-size:11px;font-weight:800;color:#fff;border-radius:99px;padding:1px 8px;margin-right:6px;vertical-align:2px;font-family:'Nunito'}
.nv.loc{background:#0D9488}.nv.inf{background:#C99A16}.nv.ref{background:#7C3AED}
.alf{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:14px}
.alf span{border:2px dashed #C9A27E;border-radius:10px;padding:4px 12px;font-size:21px;font-weight:700}
.num-l{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px}
.num-l div{display:flex;align-items:flex-end;gap:8px;font-size:18px;font-weight:700}
.caixa-alta .texto-box p,.caixa-alta .texto-box li{font-size:15.5px}`,

hero: `<div class="hero">
  <div class="blob" style="width:480px;height:480px;background:#FBE0D6;top:-180px;left:-160px"></div>
  <div class="blob" style="width:380px;height:380px;background:#FFE9A8;top:40px;right:-120px"></div>
  <div class="blob" style="width:300px;height:300px;background:#E9DCCB;bottom:-160px;left:40%"></div>
  <div class="hero-in">
    <div>
      <div class="eyebrow">📖 Central de Língua Portuguesa</div>
      <h1>Atividades de Português <em>para imprimir</em></h1>
      <p>Classes de palavras, ortografia, acentuação, plural e feminino, sinônimos e antônimos, pontuação, ordem alfabética e <b>interpretação de texto em três níveis</b> — tudo com <b>gabarito do professor</b>.</p>
      <div class="chips"><span>🎁 Comece grátis, sem cadastro</span><span>✍️ Ortografia conferida</span><span>📚 Textos originais</span><span>🔠 Opção caixa alta (EJA)</span></div>
    </div>
    <div class="hero-art" aria-hidden="true">
      <div class="letra" style="--r:-8deg;background:#B5462A;left:2%;top:8%">Ç</div>
      <div class="letra" style="--r:6deg;background:#F2A900;right:4%;top:0;animation-delay:-2s;width:110px;font-size:42px">SS</div>
      <div class="letra" style="--r:-4deg;background:#2C9C7E;left:14%;top:46%;animation-delay:-4s">?</div>
      <div class="letra" style="--r:8deg;background:#3B82C4;right:8%;top:42%;animation-delay:-3s">á</div>
      <div class="lia"><div data-char="duda"></div></div>
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
    <button class="card" onclick="abrirKit('ortografia')" style="--sh:#FBE7DF;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#FBE7DF">✍️</div><h3>Ortografia na semana</h3><p>S, SS ou Ç · X ou CH · G ou J · R ou RR — uma folha por dia + gabarito.</p><span class="tag" style="background:#FBE7DF;color:#7A2E1A">👀 Ver o kit · 5 páginas</span></button>
    <button class="card" onclick="abrirKit('gramatica')" style="--sh:#E3ECFA;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#E3ECFA">🧩</div><h3>Gramática básica</h3><p>Substantivo, adjetivo e verbo, plural, feminino e sinônimos + gabarito.</p><span class="tag" style="background:#E3ECFA;color:#163a73">👀 Ver o kit · 5 páginas</span></button>
    <button class="card" onclick="abrirKit('leitura')" style="--sh:#DDF7EE;font:inherit;color:inherit;text-align:left;cursor:pointer"><div class="ic" style="background:#DDF7EE">📚</div><h3>Leitura e interpretação</h3><p>Dois textos com perguntas em três níveis e uma folha de pontuação + gabarito.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">👀 Ver o kit · 4 páginas</span></button>
  </div>
  <div id="kitView"></div>
</div></section>

<section id="jogos" style="padding-top:10px"><div class="wrap">
  <div class="kicker">Jogos e aula</div>
  <h2 class="sec-title">Para jogar e apresentar na TV</h2>
  <p class="sec-sub">Monte um jogo ou uma aula de Português sobre o que você está trabalhando.</p>
  <div class="cards">
    <a class="card" href="/jogos.html" style="--sh:#EEE9FF"><div class="ic" style="background:#EEE9FF">❓</div><h3>Quiz</h3><p>Perguntas de gramática ou de leitura, na TV, com modo equipes.</p><span class="tag" style="background:#EEE9FF;color:#6A4FD8">▶ Criar quiz</span></a>
    <a class="card" href="/apostila.html" style="--sh:#FFF0DE"><div class="ic" style="background:#FFF0DE">📖</div><h3>Texto & compreensão</h3><p>A IA escreve um texto do seu tema com perguntas nos três níveis.</p><span class="tag" style="background:#FFF0DE;color:#9A5418">▶ Criar texto</span></a>
    <a class="card" href="/palavras.html" style="--sh:#DDF7EE"><div class="ic" style="background:#DDF7EE">🔤</div><h3>Jogos de palavras</h3><p>Caça-palavras e cruzadinha interativos.</p><span class="tag" style="background:#DDF7EE;color:#1E8A72">▶ Jogar</span></a>
  </div>
</div></section>

<section style="padding-top:10px"><div class="wrap">
  <div class="ia">
    <div class="robo"><span class="balao">Me diga o tema! 😊</span><img src="/img/robo-doceria.webp" alt="Robozinho da IA da Doceria"></div>
    <div>
      <div class="kicker" style="color:#FFD9A8">Quer outro tema?</div>
      <h2>A IA da Doceria cria a atividade do seu jeito</h2>
      <p>Gêneros textuais, produção de texto, concordância, crase, figuras de linguagem… Diga o tema e a IA monta a atividade de Português com gabarito.</p>
      <a class="btn3d" href="/prova.html?componente=portugues" style="background:#FFC93C;color:#3D1F0D;padding:14px 22px;box-shadow:0 6px 0 #C99A16;font-size:17px">✨ Criar com IA</a>
    </div>
    <div class="ia-list">
      <a href="/prova.html?componente=portugues">📝 Atividade</a><a href="/prova.html?componente=portugues">✅ Avaliação</a><a href="/apostila.html">📖 Texto & compreensão</a><a href="/mapa.html">🧠 Mapa mental</a><a href="/slides.html">🖼️ Slides</a><a href="/jogos.html">❓ Quiz</a>
    </div>
  </div>
</div></section>

<section class="faq" style="padding-top:10px"><div class="wrap" style="max-width:820px">
  <h2 class="sec-title" style="text-align:center;margin-bottom:18px">Perguntas frequentes</h2>
  <details><summary>Para qual turma servem?</summary><p>Para o Ensino Fundamental e a EJA. As folhas não trazem ano escrito — você escolhe a atividade, as opções e a quantidade de itens.</p></details>
  <details><summary>A ortografia e as respostas são confiáveis?</summary><p>Sim. As folhas não são geradas por IA: elas sorteiam itens de um banco de palavras conferido, com a grafia do Acordo Ortográfico em vigor. Os textos de interpretação são originais, escritos para a Doceria.</p></details>
  <details><summary>Dá para usar com a EJA?</summary><p>Dá. Em "Tipo de letra" você escolhe <b>caixa alta</b>, e a folha, o gabarito e os kits saem todos em letra maiúscula.</p></details>
  <details><summary>Como funcionam os créditos?</summary><p>Você pode ver e gerar quantas folhas quiser. Para imprimir ou salvar em PDF, cada folha usa 1 crédito — e você começa com 3 grátis, sem cadastro. Com o e-mail ganha mais 2 e, depois, 1 grátis por semana. Cada kit inteiro usa só 1 crédito.</p></details>
</div></section>`,

dados: `
// ── BANCO CONFERIDO (grafia do Acordo Ortográfico em vigor) ──
const CLASSES={S:'Substantivo',A:'Adjetivo',V:'Verbo'};
const FRASES=[['O <b>gato</b> dormiu no sofá.','S'],['A <b>escola</b> fica perto da praça.','S'],['Comprei um <b>livro</b> novo.','S'],['A <b>chuva</b> molhou o quintal.','S'],['Minha <b>avó</b> faz bolo de fubá.','S'],['O <b>rio</b> estava cheio.','S'],
 ['O dia está <b>bonito</b>.','A'],['A sopa ficou <b>quente</b>.','A'],['Ganhei uma bola <b>azul</b>.','A'],['O menino é muito <b>alto</b>.','A'],['A casa <b>velha</b> foi pintada.','A'],['Que flor <b>cheirosa</b>!','A'],
 ['As crianças <b>correm</b> no pátio.','V'],['Eu <b>leio</b> antes de dormir.','V'],['O pássaro <b>cantou</b> cedo.','V'],['Nós <b>plantamos</b> uma árvore.','V'],['Ela <b>escreve</b> uma carta.','V'],['O cachorro <b>late</b> para o carteiro.','V']];
// ortografia: [palavra com _ no lugar das letras, resposta, palavra certa, emoji]
const ORTO={
 sss:{t:'S, SS ou Ç?',ops:['S','SS','Ç'],itens:[['PÁ_ARO','SS','PÁSSARO','🐦'],['O_O','SS','OSSO','🦴'],['PÊ_EGO','SS','PÊSSEGO','🍑'],['MA_A','SS','MASSA','🍝'],['MA_Ã','Ç','MAÇÃ','🍎'],['LA_O','Ç','LAÇO','🎀'],['BRA_O','Ç','BRAÇO','💪'],['PALHA_O','Ç','PALHAÇO','🤡'],['_APO','S','SAPO','🐸'],['_OL','S','SOL','☀️'],['BOL_A','S','BOLSA','👜'],['UR_O','S','URSO','🐻']]},
 xch:{t:'X ou CH?',ops:['X','CH'],itens:[['_ÍCARA','X','XÍCARA','☕'],['PEI_E','X','PEIXE','🐟'],['CAI_A','X','CAIXA','📦'],['LI_O','X','LIXO','🗑️'],['ABACA_I','X','ABACAXI','🍍'],['_ADREZ','X','XADREZ','♟️'],['_UVA','CH','CHUVA','🌧️'],['_AVE','CH','CHAVE','🔑'],['MO_ILA','CH','MOCHILA','🎒'],['_INELO','CH','CHINELO','🩴'],['_OCOLATE','CH','CHOCOLATE','🍫'],['_APÉU','CH','CHAPÉU','🎩']]},
 gj:{t:'G ou J?',ops:['G','J'],itens:[['_IRAFA','G','GIRAFA','🦒'],['_ELO','G','GELO','🧊'],['RELÓ_IO','G','RELÓGIO','⏰'],['TI_ELA','G','TIGELA','🥣'],['_ELADEIRA','G','GELADEIRA',''],['_ENTE','G','GENTE',''],['_IBOIA','J','JIBOIA','🐍'],['_IPE','J','JIPE','🚙'],['BERIN_ELA','J','BERINJELA','🍆'],['_EITO','J','JEITO',''],['SU_EIRA','J','SUJEIRA',''],['CAN_ICA','J','CANJICA','']]},
 rrr:{t:'R ou RR?',ops:['R','RR'],itens:[['CA_O','RR','CARRO','🚗'],['CACHO_O','RR','CACHORRO','🐶'],['GA_AFA','RR','GARRAFA','🍾'],['MACA_ÃO','RR','MACARRÃO','🍝'],['BU_O','RR','BURRO','🫏'],['TE_A','RR','TERRA','🌍'],['PE_A','R','PERA','🍐'],['A_ARA','R','ARARA','🦜'],['CO_UJA','R','CORUJA','🦉'],['TESOU_A','R','TESOURA','✂️'],['CADEI_A','R','CADEIRA','🪑'],['PI_ULITO','R','PIRULITO','🍭']]}};
// acentuação: [sílabas separadas por -, índice da sílaba tônica]
const TONICAS=[['ca-fé',1],['so-fá',1],['ja-ca-ré',2],['a-vó',1],['a-mor',1],['pa-pel',1],['ja-bu-ti',2],['u-ru-bu',2],
 ['me-sa',0],['ca-ne-ta',1],['es-co-la',1],['ja-ne-la',1],['lá-pis',0],['a-çú-car',1],['fá-cil',0],['tá-xi',0],
 ['lâm-pa-da',0],['pás-sa-ro',0],['mé-di-co',0],['mú-si-ca',0],['ár-vo-re',0],['sá-ba-do',0],['má-qui-na',0],['ô-ni-bus',0]];
const TIPO_T={O:'Oxítona',PA:'Paroxítona',PR:'Proparoxítona'};
const tipoTonica=([s,i])=>{const d=s.split('-').length-1-i;return d===0?'O':d===1?'PA':'PR'};
const PLURAL=[['flor','flores'],['pão','pães'],['mão','mãos'],['cão','cães'],['limão','limões'],['animal','animais'],['papel','papéis'],['lápis','lápis'],['ônibus','ônibus'],['mar','mares'],['nariz','narizes'],['anel','anéis'],['jovem','jovens'],['homem','homens'],['coração','corações'],['chapéu','chapéus'],['trem','trens'],['cidade','cidades']];
const FEMININO=[['menino','menina'],['homem','mulher'],['pai','mãe'],['cavalo','égua'],['boi','vaca'],['galo','galinha'],['ator','atriz'],['rei','rainha'],['príncipe','princesa'],['leão','leoa'],['professor','professora'],['padrinho','madrinha'],['genro','nora'],['bode','cabra'],['carneiro','ovelha'],['cão','cadela']];
const SINONIMOS=[['alegre','contente'],['bonito','belo'],['começar','iniciar'],['rápido','veloz'],['casa','lar'],['medo','pavor'],['olhar','observar'],['achar','encontrar'],['ajudar','auxiliar'],['calmo','tranquilo'],['falar','dizer'],['pedir','solicitar']];
const ANTONIMOS=[['alto','baixo'],['quente','frio'],['alegre','triste'],['abrir','fechar'],['cheio','vazio'],['dia','noite'],['grande','pequeno'],['rápido','lento'],['entrar','sair'],['claro','escuro'],['forte','fraco'],['perto','longe']];
const PONTOS=[['Que horas são','?'],['Você gosta de suco de uva','?'],['Onde fica a biblioteca','?'],['Como você se chama','?'],['Quantos anos você tem','?'],
 ['Hoje vai chover à tarde','.'],['Meu irmão tem seis anos','.'],['A escola abre às sete horas','.'],['O ônibus chegou atrasado','.'],['Minha mãe trabalha no mercado','.'],
 ['Que susto','!'],['Socorro','!'],['Viva, ganhamos o jogo','!'],['Que bolo delicioso','!'],['Cuidado com o degrau','!']];
const ALFA={diferentes:['abacaxi','banana','caju','dado','elefante','foca','gato','hipopótamo','ilha','janela','leão','macaco','navio','ovo','pato','queijo','rato','sapo','tatu','uva','vaca','xícara','zebra'],
 C:['cabra','cachorro','caju','camelo','cavalo','cebola','coelho','coruja'],P:['panela','pato','peixe','pera','pipoca','pirulito','porco','pulga'],B:['bala','banana','barco','bola','boneca','bota','bule','burro']};
const cw=s=>s.split('|').map(x=>{const[p,pista]=x.split('=');return{p,pista}});
const CACA={
 gramatica:['🧩 Gramática',cw("SUBSTANTIVO=Palavra que dá nome a pessoas, animais, objetos e lugares|ADJETIVO=Palavra que dá uma característica ao substantivo|VERBO=Palavra que indica ação, como correr e pular|ARTIGO=Palavras como o, a, um e uma|PRONOME=Palavra que substitui o nome, como ele e ela|SILABA=Cada pedacinho de som de uma palavra|VOGAL=A, E, I, O ou U|CONSOANTE=Letra que não é vogal, como B, C e D|ACENTO=Sinal como o agudo ou o circunflexo|FRASE=Conjunto de palavras com sentido completo|PARAGRAFO=Parte do texto que começa com um recuo na linha|PLURAL=Indica mais de um")],
 generos:['✉️ Gêneros textuais',cw("CARTA=Texto enviado a alguém, com saudação e despedida|BILHETE=Recado curto e rápido|RECEITA=Ensina a preparar um alimento|NOTICIA=Informa um fato que aconteceu|POEMA=Texto escrito em versos|FABULA=História curta com animais e um ensinamento|CONTO=História curta inventada|CONVITE=Chama alguém para uma festa ou evento|ANUNCIO=Texto que quer vender ou divulgar algo|LENDA=História popular passada de geração em geração|BIOGRAFIA=Conta a vida de uma pessoa|DIARIO=Caderno onde escrevemos o que aconteceu no dia")],
 leitura:['📚 Livros e leitura',cw("LIVRO=Conjunto de páginas com uma história ou informações|AUTOR=Pessoa que escreve a história|LEITOR=Pessoa que lê|TITULO=Nome do livro ou do texto|CAPA=Parte de fora do livro, onde fica o título|PAGINA=Cada folha numerada do livro|BIBLIOTECA=Lugar com muitos livros para ler e emprestar|PERSONAGEM=Quem participa da história|NARRADOR=Quem conta a história|ILUSTRACAO=Desenho que acompanha o texto|ENREDO=Sequência dos acontecimentos da história|POESIA=Arte de escrever em versos")]};
// textos originais (escritos para a Doceria). Perguntas: [nível, pergunta, resposta, linhas]
const TEXTOS=[
 {k:'horta',t:'A horta da escola',g:'Texto narrativo',html:'<p>Na escola de Lucas, cada turma cuida de um canteiro da horta. A turma dele plantou alface, cenoura e cheiro-verde. Toda segunda-feira, as crianças regam as mudas e tiram o mato que cresce em volta.</p><p>Na semana passada, a professora Rita mostrou as primeiras folhas de alface.</p><p>— Daqui a um mês, vamos fazer uma salada para a escola toda! — disse ela.</p><p>Lucas ficou animado. Ele nunca tinha comido alface, mas agora queria provar a que ajudou a plantar.</p>',
  q:[['loc','O que a turma de Lucas plantou?','Alface, cenoura e cheiro-verde.',1],['loc','Em que dia da semana as crianças cuidam da horta?','Na segunda-feira.',1],['inf','Por que Lucas ficou com vontade de provar a alface, se nunca tinha comido?','Porque ele ajudou a plantar e a cuidar dela.',2],['ref','Você acha importante uma escola ter horta? Por quê?','Resposta pessoal.',2]]},
 {k:'bilhete',t:'Bilhete',g:'Bilhete',html:'<p><i>Mãe,</i></p><p>fui à casa da vovó buscar a forma de bolo que ela pediu emprestada. Volto antes das seis horas. O Toby já comeu e eu deixei água fresca para ele.</p><p><i>Beijos,<br>Júlia</i></p>',
  q:[['loc','Quem escreveu o bilhete? Para quem?','Júlia escreveu para a mãe.',1],['loc','Aonde Júlia foi? Para quê?','À casa da avó, buscar a forma de bolo.',1],['inf','Quem deve ser o Toby? Como você descobriu?','Provavelmente o cachorro (ou outro animal de estimação) da família, porque ele comeu e Júlia deixou água para ele.',2],['ref','Por que é importante deixar um recado quando saímos de casa?','Resposta pessoal (ex.: para a família saber onde estamos e não se preocupar).',2]]},
 {k:'receita',t:'Suco de laranja com cenoura',g:'Receita',html:'<p><b>Ingredientes</b></p><ul><li>3 laranjas</li><li>1 cenoura pequena</li><li>1 copo de água</li></ul><p><b>Modo de fazer</b></p><ol><li>Peça a um adulto para descascar a cenoura e cortar em pedaços.</li><li>Esprema as laranjas.</li><li>Bata tudo no liquidificador com a água.</li><li>Sirva sem açúcar e bem gelado.</li></ol>',
  q:[['loc','Quantas laranjas a receita usa?','Três.',1],['loc','O que se faz depois de espremer as laranjas?','Bate-se tudo no liquidificador com a água.',1],['inf','Por que a receita pede a ajuda de um adulto?','Porque é preciso usar faca e liquidificador, que podem machucar.',2],['ref','Para que serve uma receita? Que receita você gostaria de aprender?','Para ensinar a preparar um alimento. A segunda parte é pessoal.',2]]},
 {k:'fabula',t:'O sabiá e o tatu',g:'Fábula',html:'<p>O sabiá vivia cantando no galho mais alto da mangueira.</p><p>— Para que cavar tanto? — perguntava ao tatu, que passava os dias abrindo túneis.</p><p>— Estou preparando um abrigo — respondia o tatu.</p><p>Uma tarde, chegou uma tempestade forte. O vento balançou a mangueira, e o sabiá quase caiu do ninho. Molhado e com frio, ele ouviu uma voz:</p><p>— Venha para cá!</p><p>Era o tatu, na entrada do túnel. Naquela noite, o sabiá dormiu quentinho e entendeu que o trabalho do amigo tinha valor.</p>',
  q:[['loc','Onde o sabiá vivia?','No galho mais alto da mangueira.',1],['loc','O que o tatu fazia o dia todo?','Cavava túneis para preparar um abrigo.',1],['inf','Por que o sabiá mudou de opinião sobre o trabalho do tatu?','Porque o abrigo do tatu o protegeu da tempestade.',2],['ref','Que ensinamento essa fábula pode ter?','Resposta pessoal (ex.: devemos valorizar o trabalho dos outros; é bom se preparar para os dias difíceis).',2]]}];
const NIVEL={loc:'Localizar',inf:'Inferir',ref:'Refletir'};
`,

ger: `
const st={g:'classes',qtd:8,orto:'sss',num:'plural',sin:'sinonimos',alfa:'diferentes',texto:'horta',caca:'gramatica',cacaModo:'banco',cacaN:8};
const segBtns=(campo,lista)=>\`<div class="seg">\${lista.map(([k,n])=>\`<button class="\${st[campo]===k?'sel':''}" onclick="st.\${campo}=\${JSON.stringify(k).replace(/"/g,"'")};render()">\${n}</button>\`).join('')}</div>\`;
const pq=(t,n)=>\`<div class="pq">\${t}</div>\${linhas(n)}\`;
function equilibrado(lista,grupo,n){const por={};emb(lista).forEach(x=>(por[grupo(x)]=por[grupo(x)]||[]).push(x));const ks=Object.keys(por);let r=[];for(let i=0;r.length<n&&i<30;i++)for(const k of emb(ks))if(por[k][i]&&r.length<n)r.push(por[k][i]);return emb(r)}
const legenda=pares=>'<div class="leg" style="grid-template-columns:repeat('+pares.length+',1fr)">'+pares.map(([k,v])=>\`<div><b>\${k}</b>\${v}</div>\`).join('')+'</div>';
const ligar=(pares,esq,dir)=>{const d=emb(pares);return '<div class="lig txt">'+pares.map((p,i)=>\`<div class="l">\${p[esq]}<span class="dot"></span></div><div></div><div class="r"><span class="dot"></span>\${d[i][dir]}</div>\`).join('')+'</div>'};

const GER={
  classes:{i:'🧩',n:'Classes de palavras',d:'substantivo, adjetivo, verbo',c:'#B5462A',
    gerar(){const fs=equilibrado(FRASES,f=>f[1],st.qtd);
      return{folha:head('Classes de palavras','Leia cada frase. A palavra <b>sublinhada</b> é substantivo, adjetivo ou verbo? Escreva a letra.')+legenda(Object.entries(CLASSES))+'<div class="ord">'+
        fs.map((f,i)=>\`<div class="item"><span class="frase"><b style="text-decoration:none">\${i+1}.</b> \${f[0]}</span><span class="box vazia"></span></div>\`).join('')+'</div>',
        gab:fs.map((f,i)=>\`<b>\${i+1}.</b> \${f[0].replace(/<\\/?b>/g,'')} → <b>\${f[1]}</b> (\${CLASSES[f[1]]})\`).join('<br>')}}},
  orto:{i:'✍️',n:'Ortografia',d:'S/SS/Ç, X/CH, G/J, R/RR',c:'#C8742A',opts:()=>\`<div class="field"><label>Dificuldade</label>\${segBtns('orto',Object.entries(ORTO).map(([k,v])=>[k,v.t.replace('?','')]))}</div>\`,
    gerar(){const O=ORTO[st.orto];const its=equilibrado(O.itens,x=>x[1],st.qtd);
      return{folha:head(O.t,'Complete cada palavra com '+O.ops.map(o=>'<b>'+o+'</b>').join(O.ops.length>2?', ':' ou ').replace(/, ([^,]*)$/,' ou $1')+'. Depois, leia em voz alta.')+'<div class="ops">'+O.ops.map(o=>\`<span>\${o}</span>\`).join('')+'</div><div class="g2">'+
        its.map(x=>\`<div class="item"><span class="fig" style="font-size:42px">\${x[3]||''}</span><span class="pal">\${x[0].split('_')[0]}<span class="box vazia"></span>\${x[0].split('_')[1]}</span></div>\`).join('')+'</div>',
        gab:its.map(x=>\`\${x[3]||''} \${x[2]} (\${x[1]})\`).join(' · ')}}},
  acento:{i:'🔊',n:'Sílaba tônica',d:'oxítona, paroxítona…',c:'#3B82C4',
    gerar(){const ws=equilibrado(TONICAS,tipoTonica,st.qtd);
      return{folha:head('Sílaba tônica','Separe as sílabas, <b>circule a sílaba tônica</b> (a mais forte) e escreva a letra da classificação.')+legenda(Object.entries(TIPO_T).map(([k,v])=>[k,v]))+'<div class="ord">'+
        ws.map((w,i)=>\`<div class="item"><span style="font-size:22px;font-weight:700;min-width:150px">\${i+1}. \${w[0].replace(/-/g,'')}</span><span class="linha-ad"></span><span class="box vazia" style="width:60px"></span></div>\`).join('')+'</div>',
        gab:ws.map((w,i)=>\`<b>\${i+1}.</b> \${w[0].split('-').map((s,j)=>j===w[1]?'<b><u>'+s+'</u></b>':s).join('-')} → <b>\${tipoTonica(w)}</b> (\${TIPO_T[tipoTonica(w)]})\`).join('<br>')}}},
  numero:{i:'👥',n:'Plural e feminino',d:'escreva a palavra',c:'#7C5CE0',opts:()=>\`<div class="field"><label>Escrever o</label>\${segBtns('num',[['plural','Plural'],['feminino','Feminino']])}</div>\`,
    gerar(){const pl=st.num==='plural';const ps=emb(pl?PLURAL:FEMININO).slice(0,st.qtd);
      return{folha:head(pl?'Singular e plural':'Masculino e feminino',pl?'Escreva o <b>plural</b> de cada palavra (mais de um).':'Escreva o <b>feminino</b> de cada palavra.')+'<div class="g2">'+
        ps.map((p,i)=>\`<div class="item"><span style="font-size:21px;font-weight:700;min-width:120px">\${i+1}. \${p[0]}</span><span style="font-size:22px">→</span><span class="linha-ad"></span></div>\`).join('')+'</div>',
        gab:ps.map((p,i)=>\`<b>\${i+1}.</b> \${p[0]} → \${p[1]}\`).join(' · ')}}},
  sinonimos:{i:'🔗',n:'Sinônimos e antônimos',d:'ligue os pares',c:'#2C9C7E',qtd:false,opts:()=>\`<div class="field"><label>Ligar</label>\${segBtns('sin',[['sinonimos','Sinônimos (mesmo sentido)'],['antonimos','Antônimos (sentido contrário)']])}</div>\`,
    gerar(){const s=st.sin==='sinonimos';const ps=emb(s?SINONIMOS:ANTONIMOS).slice(0,8);
      return{folha:head(s?'Sinônimos':'Antônimos',s?'<b>Ligue</b> cada palavra a outra que tem o <b>mesmo sentido</b>.':'<b>Ligue</b> cada palavra a outra que tem o <b>sentido contrário</b>.')+ligar(ps,0,1)+pq('Escolha um par e escreva uma frase com as duas palavras.',2),
        gab:ps.map(p=>\`\${p[0]} → \${p[1]}\`).join('<br>')}}},
  pontuacao:{i:'❓',n:'Pontuação',d:'ponto, interrogação, exclamação',c:'#E07A45',
    gerar(){const ps=equilibrado(PONTOS,p=>p[1],st.qtd);
      return{folha:head('Pontuação','Complete cada frase com o sinal certo: <b>.</b> (afirmação), <b>?</b> (pergunta) ou <b>!</b> (emoção, susto, alegria).')+'<div class="ops"><span>.</span><span>?</span><span>!</span></div><div class="ord">'+
        ps.map((p,i)=>\`<div class="item"><span class="frase"><b>\${i+1}.</b> \${p[0]}</span><span class="box vazia"></span></div>\`).join('')+'</div>',
        gab:ps.map((p,i)=>\`<b>\${i+1}.</b> \${p[0]}<b>\${p[1]}</b>\`).join('<br>')}}},
  alfabetica:{i:'🔤',n:'Ordem alfabética',d:'como no dicionário',c:'#1F4E9A',opts:()=>\`<div class="field"><label>Palavras</label>\${segBtns('alfa',[['diferentes','Letras diferentes'],['C','Todas com C'],['P','Todas com P'],['B','Todas com B']])}</div>\`,
    gerar(){const n=Math.min(st.qtd,8);const ws=emb(ALFA[st.alfa]).slice(0,n);const ord=ws.slice().sort((a,b)=>a.localeCompare(b,'pt'));
      return{folha:head('Ordem alfabética',st.alfa==='diferentes'?'Escreva as palavras em <b>ordem alfabética</b>, como no dicionário.':'Todas começam com a mesma letra! Olhe a <b>segunda letra</b> (e a terceira, se precisar) e escreva em ordem alfabética.')+
        '<div class="alf">'+ws.map(w=>\`<span>\${w}</span>\`).join('')+'</div><div class="num-l">'+ord.map((_,i)=>\`<div>\${i+1}.<span class="linha-ad"></span></div>\`).join('')+'</div>'+
        pq('Que palavra veio primeiro? Por quê?',2),
        gab:ord.map((w,i)=>\`\${i+1}. \${w}\`).join(' · ')+'<br>Pergunta: '+ord[0]+' — resposta pessoal sobre a ordem das letras.'}}},
  interpretacao:{i:'📚',n:'Interpretação',d:'textos em 3 níveis',c:'#0D9488',qtd:false,prox(){const i=TEXTOS.findIndex(t=>t.k===st.texto);st.texto=TEXTOS[(i+1)%TEXTOS.length].k},opts:()=>\`<div class="field"><label>Texto</label>\${segBtns('texto',TEXTOS.map(t=>[t.k,t.g===t.t?t.t:t.g+': '+t.t]))}</div>\`,
    gerar(){const T=TEXTOS.find(x=>x.k===st.texto)||TEXTOS[0];
      return{folha:head('Leitura e interpretação','Leia o texto com atenção e responda.')+\`<div class="texto-box"><h4>\${T.t}</h4>\${T.html}</div>\`+
        T.q.map((q,i)=>\`<div class="pq"><span class="nv \${q[0]}">\${NIVEL[q[0]]}</span>\${i+1}. \${q[1]}</div>\${linhas(q[3])}\`).join(''),
        gab:\`<b>\${T.t}</b> (\${T.g})<br>\`+T.q.map((q,i)=>\`<b>\${i+1}.</b> [\${NIVEL[q[0]]}] \${q[2]}\`).join('<br>')+'<br><i>Níveis: Localizar (informação no texto) · Inferir (deduzir) · Refletir (opinião).</i>'}}},
  caca:null};
`,

kits: `
const KITS={
  ortografia:{t:'Ortografia na semana',paginas(){const sv={...st};st.qtd=8;const r=[];for(const k of ['sss','xch','gj','rrr']){st.orto=k;r.push(GER.orto.gerar())}Object.assign(st,sv);
    return{pg:r.map(x=>x.folha),gab:['S, SS ou Ç','X ou CH','G ou J','R ou RR'].map((t,i)=>'<b>'+t+'</b><br>'+r[i].gab).join('<br><br>')}}},
  gramatica:{t:'Gramática básica',paginas(){const sv={...st};st.qtd=8;const a=GER.classes.gerar();st.num='plural';const b=GER.numero.gerar();st.num='feminino';const c=GER.numero.gerar();st.sin='sinonimos';const d=GER.sinonimos.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha,d.folha],gab:'<b>Classes de palavras</b><br>'+a.gab+'<br><br><b>Plural</b><br>'+b.gab+'<br><br><b>Feminino</b><br>'+c.gab+'<br><br><b>Sinônimos</b><br>'+d.gab}}},
  leitura:{t:'Leitura e interpretação',paginas(){const sv={...st};st.texto='horta';const a=GER.interpretacao.gerar();st.texto='fabula';const b=GER.interpretacao.gerar();st.qtd=8;const c=GER.pontuacao.gerar();Object.assign(st,sv);
    return{pg:[a.folha,b.folha,c.folha],gab:a.gab+'<br><br>'+b.gab+'<br><br><b>Pontuação</b><br>'+c.gab}}},
};
`
};

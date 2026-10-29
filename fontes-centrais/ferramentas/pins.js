const sharp=require('sharp');const[P,OUT]=process.argv.slice(2);
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const C=[
 {f:'alfabetizacao',k:'CENTRAL DE ALFABETIZAÇÃO',t:['Atividades de','alfabetização'],cor:'#E85A7D',bg:['#FFE3EC','#FFF4DC'],chips:[['BA','#E85A7D'],['LH','#F2A900'],['NH','#2C9C7E'],['A E I','#3B82C4']],it:['Famílias silábicas e vogais','LH, NH e CH','Caça-palavras com figuras','12 geradores + 3 kits prontos']},
 {f:'alfabetizacao-eja',k:'ALFABETIZAÇÃO DE JOVENS E ADULTOS',t:['Alfabetização','EJA'],cor:'#2d6e6e',bg:['#E3F1F0','#FFF4DC'],chips:[['A','#2d6e6e'],['B','#C8742A'],['BA','#4F6E9E'],['C','#8A5A3B']],it:['Leituras da vida real','Mercado, placas e documentos','Letra em caixa alta','Sem infantilizar']},
 {f:'matematica',k:'CENTRAL DE MATEMÁTICA',t:['Atividades de','matemática'],cor:'#1E8A72',bg:['#DDF7EE','#FFF4DC'],chips:[['+','#1E8A72'],['½','#F2A900'],['R$','#E85A7D'],['×','#3B82C4']],it:['Operações e problemas','Frações e área','Sistema monetário','Com gabarito do professor']},
 {f:'ingles',k:'CENTRAL DE INGLÊS',t:['Atividades de','inglês'],cor:'#1F4E9A',bg:['#E3ECFA','#FFF4DC'],chips:[['Hello','#1F4E9A'],['cat','#F2A900'],['red','#C8102E'],['one','#2C9C7E']],it:['Vocabulário por tema','Flashcards ilustrados','Botão de pronúncia','Com gabarito do professor']},
 {f:'espanhol',k:'CENTRAL DE ESPANHOL',t:['Atividades de','espanhol'],cor:'#C8102E',bg:['#FDE3E6','#FFF4DC'],chips:[['Hola','#C8102E'],['gato','#F2A900'],['rojo','#2C9C7E'],['uno','#1F4E9A']],it:['Vocabulário por tema','Tarjetas ilustradas','Botão de pronúncia','Com gabarito do professor']},
 {f:'historia',k:'CENTRAL DE HISTÓRIA',t:['Atividades de','História'],cor:'#9A4A1F',bg:['#FBE3D2','#FFF4DC'],chips:[['1500','#9A4A1F'],['1822','#F2A900'],['XIX','#2C9C7E'],['476','#1F4E9A']],it:['Linha do tempo por período','Leitura de imagem com obras reais','Fontes históricas','Caça-palavras com pistas']},
 {f:'geografia',k:'CENTRAL DE GEOGRAFIA',t:['Atividades de','Geografia'],cor:'#2E7D4F',bg:['#D7EEDD','#FFF4DC'],chips:[['N','#2E7D4F'],['SP','#F2A900'],['B3','#3B82C4'],['1 cm','#C8742A']],it:['Estados e capitais','Mapa do Brasil para colorir','Pontos cardeais e escala','Leitura de mapas do IBGE']},
 {f:'ciencias',k:'CENTRAL DE CIÊNCIAS',t:['Atividades de','Ciências'],cor:'#2563A8',bg:['#DCEBF7','#FFF4DC'],chips:[['H₂O','#2563A8'],['Sol','#F2A900'],['Lua','#2C9C7E'],['Raiz','#E85A7D']],it:['Classificação dos animais','Corpo humano e cadeia alimentar','Água e Sistema Solar','Alimentação e coleta seletiva']},
 {f:'portugues',k:'CENTRAL DE LÍNGUA PORTUGUESA',t:['Atividades de','Português'],cor:'#B5462A',bg:['#FBE0D6','#FFF4DC'],chips:[['Ç','#B5462A'],['SS','#F2A900'],['?','#2C9C7E'],['á','#3B82C4']],it:['Ortografia: S, SS, Ç, X, CH…','Classes de palavras','Sílaba tônica e pontuação','Interpretação em 3 níveis']},
 {f:'ensino-religioso',k:'CENTRAL DE ENSINO RELIGIOSO',t:['Ensino','Religioso'],cor:'#6A4FD8',bg:['#E5DEFF','#FFF4DC'],chips:[['Respeito','#6A4FD8'],['Paz','#E07A45']],it:['Não confessional e plural','Identidade e respeito','Símbolos, espaços e festas','Liberdade de crença']},
];
(async()=>{const robo=await sharp(P+'/img/robo-doceria.webp').resize({height:470}).png().toBuffer();const rm=await sharp(robo).metadata();
for(const c of C){let x=70;const chips=c.chips.map(([t,col],i)=>{const w=Math.max(120,t.length*38+56);const g=`<g transform='translate(${x} ${490+(i%2?18:0)}) rotate(${[-6,4,-3,5][i]})'><rect width='${w}' height='104' rx='22' fill='${col}'/><text x='${w/2}' y='72' font-family='Arial' font-weight='900' font-size='54' fill='#fff' text-anchor='middle'>${esc(t)}</text></g>`;x+=w+22;return g}).join('');
const itens=c.it.map((t,i)=>`<g transform='translate(70 ${660+i*92})'><circle cx='24' cy='-14' r='24' fill='${c.cor}'/><path d='M13 -14 l8 8 l15 -16' stroke='#fff' stroke-width='6' fill='none' stroke-linecap='round' stroke-linejoin='round'/><text x='66' y='0' font-family='Arial' font-weight='800' font-size='36' fill='#3D1F0D'>${esc(t)}</text></g>`).join('');
const svg=`<svg xmlns='http://www.w3.org/2000/svg' width='1000' height='1500'><defs><linearGradient id='g' x1='0' y1='0' x2='0.4' y2='1'><stop offset='0' stop-color='${c.bg[0]}'/><stop offset='1' stop-color='${c.bg[1]}'/></linearGradient></defs>
<rect width='1000' height='1500' fill='url(#g)'/>
<text x='70' y='120' font-family='Arial' font-weight='900' font-size='32' fill='${c.cor}'>${esc(c.k)}</text>
<text x='70' y='235' font-family='Arial' font-weight='900' font-size='96' fill='#3D1F0D'>${esc(c.t[0])}</text>
<text x='70' y='340' font-family='Arial' font-weight='900' font-size='96' fill='#3D1F0D'>${esc(c.t[1])}</text>
<text x='70' y='430' font-family='Arial' font-weight='900' font-size='72' fill='${c.cor}'>para imprimir</text>
${chips}${itens}
<rect x='0' y='1290' width='1000' height='210' fill='#3D1F0D'/>
<text x='70' y='1380' font-family='Arial' font-weight='900' font-size='50' fill='#FFC93C'>Comece grátis, sem cadastro</text>
<text x='70' y='1445' font-family='Arial' font-weight='700' font-size='38' fill='#fff'>doceriapedagogica.com</text></svg>`;
await sharp(Buffer.from(svg)).composite([{input:robo,left:1000-rm.width+40,top:1290-470+40}]).jpeg({quality:88,mozjpeg:true}).toFile(OUT+'/pin-'+c.f+'.jpg');console.log('pin-'+c.f+'.jpg')}})();

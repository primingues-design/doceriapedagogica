// Monta public/atividades-portugues.html: código comum da Central de História + partes de port-parts.js
const fs=require('fs');const P=process.argv[2],S=process.argv[3];
const G=require(S+'/port-parts.js');const H=fs.readFileSync(S+'/historia-body.html','utf8');
const cut=(a,b,incA=true)=>{const i=H.indexOf(a);const j=H.indexOf(b,i+1);if(i<0||j<0)throw new Error('trecho: '+a.slice(0,40));return H.slice(incA?i:i+a.length,j)};
const style=cut('<style>\n','</style>',false)+G.css+'\n.tabs{grid-template-columns:repeat(5,1fr)}\n@media(max-width:1000px){.tabs{grid-template-columns:repeat(3,1fr)}}\n@media(max-width:560px){.tabs{grid-template-columns:repeat(2,1fr)}}\n';
const header=cut('<header','<div class="hero">');
const footer=cut('<footer','<script>\n');
const jsBase=cut("document.querySelectorAll('[data-char]')",'// ── BANCO CONFERIDO');
let caca=cut("  caca:{i:'🔎'",'\n};\nfunction cacaGrade');
caca=caca.replace('Ex.: Revolução Francesa, Era Vargas, Mesopotâmia','Ex.: Gêneros textuais, Acentuação, Verbos');
let cacaFn=cut('function cacaGrade','const ORDEM=');
cacaFn=cacaFn.replace('de HISTÓRIA','de LÍNGUA PORTUGUESA').replace('(ex.: Revolução Francesa, Era Vargas)','(ex.: Gêneros textuais, Verbos)')
  .replace('use só informações históricas consolidadas (na dúvida, troque a palavra); escreva "pessoas escravizadas", nunca "escravos"; nada partidário.','use só palavras com a grafia do Acordo Ortográfico em vigor e pistas corretas sobre a língua (na dúvida, troque a palavra).');
if(!cacaFn.includes('de LÍNGUA PORTUGUESA')||!cacaFn.includes('Acordo Ortográfico'))throw new Error('prompt IA');
const motor=cut('let atual=null;','// ── KITS PRONTOS ──');
const kitFn=cut('let kitAtual=null','render();\n</script>');
const ger=G.ger.replace('  caca:null};','\n'+caca+'\n};');
const js=jsBase+G.dados+ger+cacaFn+"const ORDEM=['classes','orto','acento','numero','sinonimos','pontuacao','alfabetica','interpretacao','caca'];\n\n"+motor+G.kits+kitFn+'render();\n</script>\n</body>\n</html>\n';
const og='https://doceriapedagogica.com/og/portugues.jpg';
const head=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Atividades de Português para Imprimir | Doceria Pedagógica</title>
<meta name="description" content="Atividades de Português para imprimir com gabarito: classes de palavras, ortografia (S, SS, Ç, X, CH, G, J, R, RR), sílaba tônica, plural e feminino, sinônimos e antônimos, pontuação, ordem alfabética e interpretação de texto. Opção em caixa alta para EJA.">
<link rel="canonical" href="https://doceriapedagogica.com/atividades-portugues.html">
<meta property="og:title" content="Atividades de Português para Imprimir">
<meta property="og:description" content="Gramática, ortografia, pontuação e interpretação de texto — com gabarito e opção em caixa alta.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://doceriapedagogica.com/atividades-portugues.html">
<meta property="og:site_name" content="Doceria Pedagógica">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${og}">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://doceriapedagogica.com/#org","name":"Doceria Pedagógica","url":"https://doceriapedagogica.com"},{"@type":"CollectionPage","@id":"https://doceriapedagogica.com/atividades-portugues.html","url":"https://doceriapedagogica.com/atividades-portugues.html","name":"Atividades de Português para Imprimir","inLanguage":"pt-BR","description":"Atividades de Língua Portuguesa para imprimir com gabarito: classes de palavras, ortografia, sílaba tônica, plural e feminino, sinônimos e antônimos, pontuação, ordem alfabética, interpretação de texto e caça-palavras.","educationalLevel":"Ensino Fundamental","about":"Língua Portuguesa","publisher":{"@id":"https://doceriapedagogica.com/#org"},"image":"${og}"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"https://doceriapedagogica.com/"},{"@type":"ListItem","position":2,"name":"Central de Língua Portuguesa","item":"https://doceriapedagogica.com/atividades-portugues.html"}]}]}</script>
`;
const es=fs.readFileSync(P+'/atividades-espanhol.html','utf8');
const css=es.slice(es.indexOf('<link href="https://fonts'),es.indexOf('</style>')+8);
fs.writeFileSync(P+'/atividades-portugues.html',head+css+'\n<style>\n'+style+'</style>\n</head>\n<body>\n'+header+G.hero+'\n\n'+G.secoes+'\n\n'+footer.replace('<a href="/atividades-espanhol.html" style="color:var(--brand)">Espanhol</a>','<a href="/atividades-espanhol.html" style="color:var(--brand)">Espanhol</a> · <a href="/atividades-historia.html" style="color:var(--brand)">História</a> · <a href="/atividades-geografia.html" style="color:var(--brand)">Geografia</a> · <a href="/atividades-ciencias.html" style="color:var(--brand)">Ciências</a>')+'<script>\n'+js);
console.log('ok');

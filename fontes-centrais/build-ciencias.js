// Monta public/atividades-ciencias.html: código comum da Central de História + partes de cien-parts.js
const fs=require('fs');const P=process.argv[2],S=process.argv[3];
const G=require(S+'/cien-parts.js');const H=fs.readFileSync(S+'/historia-body.html','utf8');
const cut=(a,b,incA=true)=>{const i=H.indexOf(a);const j=H.indexOf(b,i+1);if(i<0||j<0)throw new Error('trecho: '+a.slice(0,40));return H.slice(incA?i:i+a.length,j)};
const style=cut('<style>\n','</style>',false)+G.css+'\n.tabs{grid-template-columns:repeat(5,1fr)}\n@media(max-width:1000px){.tabs{grid-template-columns:repeat(3,1fr)}}\n@media(max-width:560px){.tabs{grid-template-columns:repeat(2,1fr)}}\n';
const header=cut('<header','<div class="hero">');
const footer=cut('<footer','<script>\n');
const jsBase=cut("document.querySelectorAll('[data-char]')",'// ── BANCO CONFERIDO');
let caca=cut("  caca:{i:'🔎'",'\n};\nfunction cacaGrade');
caca=caca.replace('Ex.: Revolução Francesa, Era Vargas, Mesopotâmia','Ex.: Vacinas, Energia, Células');
let cacaFn=cut('function cacaGrade','const ORDEM=');
cacaFn=cacaFn.replace('de HISTÓRIA','de CIÊNCIAS').replace('(ex.: Revolução Francesa, Era Vargas)','(ex.: Vacinas, Energia)')
  .replace('use só informações históricas consolidadas (na dúvida, troque a palavra); escreva "pessoas escravizadas", nunca "escravos"; nada partidário.','use só informações científicas corretas e consolidadas (na dúvida, troque a palavra); nada de pseudociência.');
if(!cacaFn.includes('de CIÊNCIAS')||!cacaFn.includes('científicas'))throw new Error('prompt IA');
const motor=cut('let atual=null;','// ── KITS PRONTOS ──');
const kitFn=cut('let kitAtual=null','render();\n</script>');
const ger=G.ger.replace('  caca:null};','\n'+caca+'\n};');
const js=jsBase+G.dados+ger+cacaFn+"const ORDEM=['animais','cadeia','corpo','agua','materiais','quimica','solar','alimentos','lixo','esquema','caca'];\n\n"+motor+G.kits+kitFn+'render();\n</script>\n</body>\n</html>\n';
const og='https://doceriapedagogica.com/og/ciencias.jpg';
const head=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Atividades de Ciências para Imprimir | Doceria Pedagógica</title>
<meta name="description" content="Atividades de Ciências para imprimir com gabarito: Biologia, Física e Química do Fundamental — animais, corpo humano, células, cadeia alimentar, estados da água, eletricidade, ímãs, pH, misturas, Sistema Solar, alimentação, coleta seletiva e leitura de esquemas.">
<link rel="canonical" href="https://doceriapedagogica.com/atividades-ciencias.html">
<meta property="og:title" content="Atividades de Ciências para Imprimir">
<meta property="og:description" content="Animais, corpo humano, água, Sistema Solar e meio ambiente — com gabarito.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://doceriapedagogica.com/atividades-ciencias.html">
<meta property="og:site_name" content="Doceria Pedagógica">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${og}">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://doceriapedagogica.com/#org","name":"Doceria Pedagógica","url":"https://doceriapedagogica.com"},{"@type":"CollectionPage","@id":"https://doceriapedagogica.com/atividades-ciencias.html","url":"https://doceriapedagogica.com/atividades-ciencias.html","name":"Atividades de Ciências para Imprimir","inLanguage":"pt-BR","description":"Atividades de Ciências para imprimir com gabarito: classificação dos animais, cadeia alimentar, mudanças de estado físico, órgãos e sistemas, Sistema Solar, alimentação, coleta seletiva, leitura de esquemas e caça-palavras.","educationalLevel":"Ensino Fundamental","about":"Ciências","publisher":{"@id":"https://doceriapedagogica.com/#org"},"image":"${og}"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"https://doceriapedagogica.com/"},{"@type":"ListItem","position":2,"name":"Central de Ciências","item":"https://doceriapedagogica.com/atividades-ciencias.html"}]}]}</script>
`;
const es=fs.readFileSync(P+'/atividades-espanhol.html','utf8');
const css=es.slice(es.indexOf('<link href="https://fonts'),es.indexOf('</style>')+8);
fs.writeFileSync(P+'/atividades-ciencias.html',head+css+'\n<style>\n'+style+'</style>\n</head>\n<body>\n'+header+G.hero+'\n\n'+G.secoes+'\n\n'+footer.replace('<a href="/atividades-espanhol.html" style="color:var(--brand)">Espanhol</a>','<a href="/atividades-espanhol.html" style="color:var(--brand)">Espanhol</a> · <a href="/atividades-historia.html" style="color:var(--brand)">História</a> · <a href="/atividades-geografia.html" style="color:var(--brand)">Geografia</a>')+'<script>\n'+js);
console.log('ok');

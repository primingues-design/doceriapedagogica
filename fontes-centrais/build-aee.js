// Monta public/atividades-aee.html: código comum da Central de História (topo, rodapé, motor de
// impressão, kits e caixa alta) + aee/aee-parts.js (visual) + aee/aee-ger.js (geradores)
// + aee/aee-pos.js (painel de imagens e "usar a minha foto") + pictogramas e fotos.
// Uso: node fontes-centrais/build-aee.js public fontes-centrais
const fs=require('fs');const P=process.argv[2],S=process.argv[3];
const G=require(S+'/aee/aee-parts.js');const GER=fs.readFileSync(S+'/aee/aee-ger.js','utf8');
const H=fs.readFileSync(S+'/historia-body.html','utf8');
const cut=(a,b,incA=true)=>{const i=H.indexOf(a);const j=H.indexOf(b,i+1);if(i<0||j<0)throw new Error('trecho: '+a.slice(0,40));return H.slice(incA?i:i+a.length,j)};
const style=cut('<style>\n','</style>',false)+G.css+'\n';
const header=cut('<header','<div class="hero">');
const footer=cut('<footer','<script>\n');
const jsBase=cut("document.querySelectorAll('[data-char]')",'// ── BANCO CONFERIDO');
const motor=cut('let atual=null;','// ── KITS PRONTOS ──').split("dpCobrar('hi-'").join("dpCobrar('aee-'");
const kitFn=cut('let kitAtual=null','render();\n</script>').split("dpCobrar('kit-hi-'").join("dpCobrar('kit-aee-'");
// pictogramas: { chave: [rótulo, arquivo, grupo] }
const L=require(S+'/aee/pictos.js');const hex=e=>[...e].map(c=>c.codePointAt(0)).filter(c=>c!==0xFE0F).map(c=>c.toString(16).toUpperCase()).join('-');
for(const x of L)if(!fs.existsSync(P+'/assets/pictos/'+hex(x[2])+'.svg'))throw new Error('falta o pictograma de '+x[0]+' ('+hex(x[2])+')');
const PIC='const PIC='+JSON.stringify(Object.fromEntries(L.map(x=>[x[0],[x[1],hex(x[2]),x[3]]])))+';\n';
// fotos realistas: { chave: arquivo } — só as aprovadas na curadoria; o resto fica como pictograma
const FL=require(S+'/aee/fotos.js');for(const x of FL)if(!fs.existsSync(P+'/assets/fotos-aee/'+x[0]+'.jpg'))throw new Error('falta a foto '+x[0]);
const FOTOS='const FOTOS='+JSON.stringify(Object.fromEntries(FL.flatMap(x=>x[1].map(k=>[k,x[0]]))))+';\n';
// aee-pos.js entra depois do motor comum: embrulha o gerar() para desenhar o painel de imagens
const POS=fs.readFileSync(S+'/aee/aee-pos.js','utf8');
const js=jsBase+PIC+FOTOS+GER+'\n'+motor+kitFn+POS+'\nrender();\n</script>\n</body>\n</html>\n';
const og='https://doceriapedagogica.com/og/aee.jpg';
const head=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Recursos de AEE para Imprimir: Rotina Visual e Prancha de Comunicação | Doceria Pedagógica</title>
<meta name="description" content="Recursos de AEE para imprimir com pictogramas: rotina visual, quadro primeiro e depois, passo a passo de higiene, prancha de comunicação alternativa, cartões de apoio, quadro de fichas e pareamento. Sem pedir diagnóstico.">
<link rel="canonical" href="https://doceriapedagogica.com/atividades-aee.html">
<meta property="og:title" content="Recursos de AEE para Imprimir">
<meta property="og:description" content="Rotina visual, prancha de comunicação, cartões de apoio e mais — com pictogramas consistentes, prontos para plastificar.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://doceriapedagogica.com/atividades-aee.html">
<meta property="og:site_name" content="Doceria Pedagógica">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="${og}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="${og}">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://doceriapedagogica.com/#org","name":"Doceria Pedagógica","url":"https://doceriapedagogica.com"},{"@type":"CollectionPage","@id":"https://doceriapedagogica.com/atividades-aee.html","url":"https://doceriapedagogica.com/atividades-aee.html","name":"Recursos de AEE para Imprimir","inLanguage":"pt-BR","description":"Recursos de Atendimento Educacional Especializado para imprimir com pictogramas: rotina visual, primeiro e depois, sequências de vida diária, prancha de comunicação alternativa, cartões de apoio, quadro de fichas e pareamento.","educationalLevel":"Educação Infantil, Ensino Fundamental","about":"Atendimento Educacional Especializado","publisher":{"@id":"https://doceriapedagogica.com/#org"},"image":"${og}"},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"https://doceriapedagogica.com/"},{"@type":"ListItem","position":2,"name":"Central de AEE","item":"https://doceriapedagogica.com/atividades-aee.html"}]}]}</script>
`;
const es=fs.readFileSync(P+'/atividades-espanhol.html','utf8');
const css=es.slice(es.indexOf('<link href="https://fonts'),es.indexOf('</style>')+8);
fs.writeFileSync(P+'/atividades-aee.html',head+css+'\n<style>\n'+style+'</style>\n</head>\n<body>\n'+header+G.hero+'\n\n'+G.secoes+'\n\n'+footer+'<script>\n'+js);
console.log('ok');

const fs=require('fs');const P=process.argv[2],S=process.argv[3];
const es=fs.readFileSync(P+'/atividades-espanhol.html','utf8');
const css=es.slice(es.indexOf('<link href="https://fonts'),es.indexOf('</style>')+8);
const head=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Atividades de História para Imprimir | Doceria Pedagógica</title>
<meta name="description" content="Atividades de História para imprimir com gabarito: linha do tempo, datas e personagens do Brasil e do mundo, século em algarismos romanos, fontes históricas e leitura de imagem com obras em domínio público.">
<link rel="canonical" href="https://doceriapedagogica.com/atividades-historia.html">
<meta property="og:title" content="Atividades de História para Imprimir">
<meta property="og:description" content="Linha do tempo, datas, personagens, fontes históricas e leitura de imagem — com gabarito.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://doceriapedagogica.com/atividades-historia.html">
<meta property="og:site_name" content="Doceria Pedagógica">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="https://doceriapedagogica.com/og/historia.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://doceriapedagogica.com/og/historia.jpg">
<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","@id":"https://doceriapedagogica.com/#org","name":"Doceria Pedagógica","url":"https://doceriapedagogica.com"},{"@type":"CollectionPage","@id":"https://doceriapedagogica.com/atividades-historia.html","url":"https://doceriapedagogica.com/atividades-historia.html","name":"Atividades de História para Imprimir","inLanguage":"pt-BR","description":"Atividades de História para imprimir com gabarito: linha do tempo, data e acontecimento, personagens do Brasil e do mundo, século em algarismos romanos, fontes históricas, antes e agora, leitura de imagem e caça-palavras.","educationalLevel":"Ensino Fundamental","about":"História","publisher":{"@id":"https://doceriapedagogica.com/#org"}},{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Início","item":"https://doceriapedagogica.com/"},{"@type":"ListItem","position":2,"name":"Central de História","item":"https://doceriapedagogica.com/atividades-historia.html"}]}]}</script>
`;
fs.writeFileSync(P+'/atividades-historia.html',head+css+'\n</head>\n<body>\n'+fs.readFileSync(S+'/historia-body.html','utf8'));
console.log('ok');

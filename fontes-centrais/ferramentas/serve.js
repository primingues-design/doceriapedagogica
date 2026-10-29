// Servidor estático da prévia: entrega a pasta public do projeto em localhost:5177.
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT='C:/Users/pri-m/OneDrive/Documentos/Doceria Pedagogica - projeto/doceria-pedagogica/public';
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp'};
http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';const f=path.join(ROOT,p);
fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end('nf')}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});r.end(d)})}).listen(5177,()=>console.log('ok 5177'));

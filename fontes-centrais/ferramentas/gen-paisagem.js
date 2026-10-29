// Gera fotos realistas de paisagem com Flux (fal.ai). Lê FAL_KEY do .env.local sem imprimir.
const fs=require('fs');const[ENV,OUT,...only]=process.argv.slice(2);
const KEY=(fs.readFileSync(ENV,'utf8').match(/^FAL_KEY=(.+)$/m)||[])[1].trim().replace(/^["']|["']$/g,'');
const BASE='professional landscape photograph, wide shot, photorealistic, natural daylight, sharp focus, vivid natural colors, no text, no watermark, no people';
const NAT=', untouched wild nature, no buildings, no roads, no boats, no fences, no human structures';
const IT=[
 ['montanha','rocky mountain range with green slopes and a clear blue sky'+NAT],
 ['vulcao','active volcano cone with smoke rising from the crater at the top, dark lava rock slopes'+NAT],
 ['ilha','deserted wild tropical island seen from the sea, green hills covered by dense forest, empty sandy beach, rocks and turquoise water, no houses, no pier, no dock, no huts'+NAT],
 ['mar','open ocean waves under a blue sky, view from a rocky shore'+NAT],
 ['deserto','sand dunes desert landscape with ripples in the sand'+NAT],
 ['floresta','dense tropical rainforest canopy, lush green trees'+NAT],
 ['cachoeira','tall waterfall in a tropical forest falling into a natural pool'+NAT],
 ['rio','winding river through a green forest, aerial view'+NAT],
 ['cidade','dense city of plain concrete apartment buildings of similar height, busy avenue with cars in the middle, aerial view in daylight, no skyscrapers, no towers, no landmarks'],
 ['ponte','large cable-stayed bridge over a river connecting two sides of a city'],
 ['estrada','asphalt highway with cars crossing green countryside, aerial view'],
 ['fabrica','industrial factory with chimneys and warehouses'],
 ['plantacao','large sugarcane or soybean plantation in straight rows with a tractor, aerial view'],
 ['bairro','residential neighborhood with colorful houses and streets, aerial view'],
 ['porto','top-down aerial view of a cargo port terminal, rows of colorful shipping containers, big cranes loading a ship, no letters, no logos'],
 ['represa','hydroelectric dam with concrete wall holding a large reservoir lake'],
];
(async()=>{for(const[slug,desc]of IT){if(only.length&&!only.includes(slug))continue;
  const r=await fetch('https://fal.run/fal-ai/flux/schnell',{method:'POST',headers:{Authorization:'Key '+KEY,'Content-Type':'application/json'},body:JSON.stringify({prompt:desc+', '+BASE,image_size:'landscape_4_3',num_images:1,seed:Math.random()*1e6|0})});
  if(!r.ok){console.log(slug,'ERRO',r.status);continue}const j=await r.json();const u=j.images&&j.images[0]&&j.images[0].url;
  const b=Buffer.from(await (await fetch(u)).arrayBuffer());fs.writeFileSync(OUT+'/'+slug+'.jpg',b);console.log(slug,Math.round(b.length/1024)+'KB')}})();

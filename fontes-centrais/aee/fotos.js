// Fotos realistas da Central de AEE (geradas com Flux e curadas). [arquivo, chaves que usam a foto, prompt]
// Ficam como PICTOGRAMA, de propósito: conceitos abstratos (mais, acabou, agora não, estrela) e
// higiene íntima (abaixar/levantar a roupa) — não geramos fotos de crianças nessas situações.
const OBJ='professional studio product photograph, single subject centered, plain very light gray seamless background with soft shadow, photorealistic, sharp focus, bright even lighting, no text, no letters, no watermark, no logos';
const CENA='realistic bright photograph, simple uncluttered composition, soft natural daylight, photorealistic, no text, no letters, no watermark, no logos';
const MAOS='close-up realistic photograph of a child\'s hands only, no face visible, bright clean bathroom, soft light, photorealistic, no text, no watermark';
const RETRATO='head and shoulders portrait photograph, plain soft light gray background, natural light, photorealistic, sharp focus, no text, no watermark';
module.exports=[
 // rotina e lugares
 ['escola',['chegada'],'front entrance of a bright colorful primary school building with open front door, daytime, no people, '+CENA],
 ['roda',['roda'],'small group of five diverse young children sitting in a circle on a colorful carpet in a bright classroom, smiling, seen slightly from above, '+CENA],
 ['musica',['musica'],'colorful children\'s xylophone and a pair of maracas, '+OBJ],
 ['livro-aberto',['historia'],'open colorful children\'s picture book with illustrations of animals, no readable text, '+OBJ],
 ['arte',['arte'],'children\'s watercolor paint set with brushes and a sheet of white paper, '+OBJ],
 ['atividade',['atividade'],'yellow pencil lying on a blank sheet of lined school paper, '+OBJ],
 ['lanche',['lanche'],'open children\'s lunch box with a sandwich, an apple and a juice box with no label, '+OBJ],
 ['beber-agua',['agua','beber'],'young child drinking water from a clear glass, happy, plain light background, '+CENA],
 ['vaso',['banheiro','banheiroc','vaso'],'clean white toilet in a bright tiled school bathroom, no people, '+CENA],
 ['parque',['parque'],'colorful children\'s playground slide in a park, sunny day, no people, '+CENA],
 ['bola',['edfisica','bola'],'classic black and white soccer ball on green grass, '+CENA],
 ['computador',['computador'],'open laptop computer on a white desk, screen showing a colorful abstract wallpaper, '+OBJ],
 ['brinquedos',['brincar','brincarv'],'brown teddy bear sitting next to colorful wooden toy blocks, '+OBJ],
 ['dormir',['descanso','dormir'],'young child sleeping peacefully on a soft mat with a pillow and blanket, '+CENA],
 ['biblioteca',['biblioteca'],'low wooden bookshelf full of colorful children\'s books, no readable titles, '+CENA],
 ['quebra-cabeca',['quebracabeca'],'colorful jigsaw puzzle pieces, some connected, '+OBJ],
 ['lavar-maos',['lavarmaos'],'hands covered in soap foam being washed under running water from a faucet, '+MAOS],
 ['escovar-dentes',['escovar','escovardentes'],'smiling young child brushing teeth with a toothbrush, front view, '+RETRATO],
 ['mochila',['mochila','guardarmochila'],'bright red children\'s school backpack, '+OBJ],
 ['onibus',['onibus','busao'],'yellow school bus seen from the side, parked on a street, no text, '+CENA],
 ['casa',['casa'],'small simple colorful house with a garden and a front door, daytime, '+CENA],
 ['festa',['festa'],'birthday cake with lit candles and colorful balloons, '+OBJ],
 ['calendario',['calendario'],'blank wall calendar grid with empty squares, red top binding, no numbers, no text, '+OBJ],
 ['aee',['aee'],'friendly female teacher and a young child working together with colorful blocks at a small table, both smiling, '+CENA],
 // pessoas
 ['eu',['eu'],'smiling young Afro-Brazilian girl pointing at her own chest with her index finger, '+RETRATO],
 ['voce',['voce'],'child\'s hand pointing straight toward the camera, close up, plain light background, '+CENA],
 ['professora',['professora'],'smiling female teacher in her thirties standing in a bright classroom, '+RETRATO],
 ['mae',['mae'],'smiling Brazilian woman in her thirties, warm expression, '+RETRATO],
 ['pai',['pai'],'smiling Brazilian man in his thirties, warm expression, '+RETRATO],
 ['amigos',['amigo'],'two young children of different ethnicities smiling side by side with arms around each other\'s shoulders, '+RETRATO],
 // ações
 ['quero',['quero'],'child\'s open hand reaching forward with palm up, asking for something, close up, plain light background, '+CENA],
 ['ir',['ir'],'young child walking, full body side view, plain light background, '+CENA],
 ['comer',['comer'],'young child eating rice and beans with a spoon from a plate at a table, '+CENA],
 ['ver',['ver'],'young East Asian boy looking with wide curious eyes, '+RETRATO],
 ['ouvir',['ouvir'],'young child with a hand cupped behind the ear, listening carefully, '+RETRATO],
 ['parar',['parar'],'child\'s hand raised with palm facing forward in a stop gesture, close up, plain light background, '+CENA],
 // coisas
 ['agua',['aguac','molhar'],'clear glass of fresh water, '+OBJ],
 ['comida',['comida'],'plate of Brazilian food with rice, beans, salad and chicken, '+OBJ],
 ['livro',['livro'],'closed colorful children\'s hardcover book, no title text, '+OBJ],
 ['lapis',['lapis'],'single yellow pencil, '+OBJ],
 // sentimentos (crianças diferentes)
 ['feliz',['feliz'],'young mixed-race Brazilian boy with a big happy smile, clearly happy expression, '+RETRATO],
 ['triste',['triste'],'young white girl with a clearly sad expression, slight frown, one tear, '+RETRATO],
 ['bravo',['bravo'],'young Afro-Brazilian boy with a clearly angry expression, frowning, arms crossed, '+RETRATO],
 ['medo',['medo'],'young East Asian girl with a clearly scared expression, wide eyes, hands near mouth, '+RETRATO],
 ['cansado',['cansado'],'young child yawning, clearly tired, rubbing one eye, '+RETRATO],
 ['dor',['dor'],'young child holding their cheek with a pained expression, toothache, '+RETRATO],
 ['calor',['calor'],'young child sweating on a hot sunny day, fanning their face with a hand, '+RETRATO],
 ['frio',['frio'],'young child wearing a warm coat and scarf, shivering in the cold, '+RETRATO],
 // social e apoio
 ['sim',['sim'],'child\'s hand making a thumbs up gesture, close up, plain light background, '+CENA],
 ['nao',['nao'],'child\'s hand making a thumbs down gesture, close up, plain light background, '+CENA],
 ['oi',['oi','bomdia'],'smiling young girl waving hello with one hand, '+RETRATO],
 ['ajuda',['ajuda'],'young child in a classroom raising one hand high to ask for help, '+RETRATO],
 ['espera',['espera'],'classic wooden hourglass with sand flowing, '+OBJ],
 ['silencio',['silencio'],'young child holding an index finger over the lips, shushing gesture, '+RETRATO],
 ['pausa',['pausa'],'cozy beanbag chair with a soft cushion in a quiet corner, no people, '+CENA],
 ['respira',['respira'],'calm young child with eyes closed taking a deep breath, hands on belly, '+RETRATO],
 // passos de higiene (só mãos e objetos)
 ['torneira',['torneira'],'child\'s hand turning on a chrome bathroom faucet, '+MAOS],
 ['sabao',['sabao'],'child\'s hands pressing a liquid soap pump dispenser, '+MAOS],
 ['esfregar',['esfregar'],'child\'s hands rubbing together with lots of white soap foam, '+MAOS],
 ['enxaguar',['enxaguar'],'child\'s hands rinsing soap off under running water at a sink, '+MAOS],
 ['secar',['secar'],'child\'s hands drying with a white paper towel, '+MAOS],
 ['escova',['escova'],'child\'s hand holding a colorful toothbrush, '+MAOS],
 ['pasta',['pasta'],'squeezing a small amount of white toothpaste onto a toothbrush, close up, '+OBJ],
 ['cuspir',['cuspir'],'white bathroom sink with a little toothpaste foam and running water, no people, '+CENA],
 ['bochechar',['bochechar'],'child\'s hand holding a small plastic cup of water next to a bathroom sink, '+MAOS],
 ['porta',['porta'],'open white door of a clean school bathroom, no people, '+CENA],
 ['papel',['papel'],'roll of white toilet paper on a holder, '+OBJ],
 ['descarga',['descarga'],'hand pressing a chrome toilet flush button on a white wall, close up, '+CENA],
 // material e chegada
 ['estojo',['estojo'],'child\'s hand putting a pencil into an open pencil case, '+CENA],
 ['caderno',['caderno'],'closed spiral school notebook with a plain colored cover, no text, '+OBJ],
 ['cadeira',['cadeira'],'small school chair pushed neatly under a school desk, no people, '+CENA],
 ['pendurar',['pendurar'],'school backpack hanging on a wall hook in a classroom, no people, '+CENA],
 ['casaco',['casaco'],'children\'s jacket hanging on a wall hook, '+CENA],
 ['sentar',['sentar'],'young child sitting at a school desk with a notebook, smiling, '+CENA],
 // pareamento
 ['cachorro',['cachorro'],'friendly golden puppy sitting, '+OBJ],['gato',['gato'],'orange tabby cat sitting, '+OBJ],['vaca',['vaca'],'black and white dairy cow standing on grass, '+CENA],
 ['porco',['porco'],'pink pig standing, '+OBJ],['sapo',['sapo'],'green frog sitting, '+OBJ],['leao',['leao'],'adult male lion with a big mane, '+CENA],
 ['elefante',['elefante'],'grey elephant standing, '+CENA],['peixe',['peixe'],'orange clownfish swimming, '+OBJ],['maca',['maca'],'shiny red apple, '+OBJ],
 ['banana',['banana'],'single ripe yellow banana, '+OBJ],['uva',['uva'],'bunch of purple grapes, '+OBJ],['morango',['morango'],'fresh red strawberry, '+OBJ],
 ['carro',['carro'],'small red car seen from the side, '+OBJ],['sol',['sol'],'bright sun in a clear blue sky, '+CENA],['flor',['flor'],'single pink flower, '+OBJ],
 ['premio',['premio'],'shiny golden trophy cup, '+OBJ]];
// Textos corrigidos depois da curadoria (a 1ª versão saiu com texto em inglês, gesto errado ou figura pequena)
const CORRIGIDOS={
 escola:'primary school building facade with colorful painted walls and an open front door, daytime, no signs, no letters or words anywhere, no people, '+CENA,
 onibus:'toy model of a plain yellow bus with blank sides, no lettering, no words, '+OBJ,
 eu:'smiling young Afro-Brazilian girl pointing at herself with her index finger touching her own chest, '+RETRATO,
 voce:"index finger pointing directly at the camera, foreshortened, close up of a child's hand, plain light background, "+CENA,
 quero:"child's two cupped hands held out together with palms up, as if asking to receive something, close up, plain light background, "+CENA,
 nao:"child's hand clearly making a thumbs down gesture, thumb pointing down to the floor, close up, plain light background, "+CENA,
 calor:'young child on a hot sunny day with red cheeks wiping sweat from the forehead with the back of the hand, squinting in the sun, not crying, '+RETRATO,
 cansado:'young child yawning widely with eyes closed and one hand covering the mouth, clearly sleepy, '+RETRATO,
 flor:'single pink gerbera daisy flower filling most of the frame, '+OBJ,
 musica:"colorful children's xylophone with two mallets, filling most of the frame, "+OBJ,
 lapis:'single yellow pencil lying diagonally, filling most of the frame, '+OBJ,
 mochila:"bright red children's school backpack filling most of the frame, "+OBJ,
 esfregar:'small hands lathering white soap bubbles under a faucet, close up, no face, '+MAOS,
 // 2ª tentativa
 escola:'cheerful school playground and colorful school wall seen from inside the gate on a sunny morning, plain walls with no signs, no writing, no people, '+CENA,
 nao:'close up of a hand giving a thumbs down, the thumb clearly pointing downward, plain white background, nothing else in the image, '+CENA,
 calor:'smiling young child wearing a yellow t-shirt and a sun hat, fanning their face with a paper fan on a bright hot sunny day, '+RETRATO,
 eu:'cheerful young girl with curly hair touching her own chest with her hand, as if saying me, '+RETRATO};
for(const x of module.exports)if(CORRIGIDOS[x[0]])x[2]=CORRIGIDOS[x[0]];

// reprovadas na curadoria (2 ou 3 tentativas): o pictograma é mais claro — ficam como pictograma também no modo foto
const REPROVADAS=['escola','nao','quero','eu'];
module.exports=module.exports.filter(x=>!REPROVADAS.includes(x[0]));

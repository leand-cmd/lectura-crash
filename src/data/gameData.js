export const CHARS = [
  { id: 'crash',  name: 'Crash',         desc: 'El clásico',     sprite: '/lectura-crash/sprites/crash.png' },
  { id: 'mario',  name: 'Mario',          desc: 'Super héroe',    sprite: '/lectura-crash/sprites/mario.png' },
  { id: 'sonic',  name: 'Sonic',          desc: 'El más rápido',  sprite: '/lectura-crash/sprites/sonic.png' },
  { id: 'bowser', name: 'Bowser',         desc: 'El poderoso',    sprite: '/lectura-crash/sprites/bowser.png' },
  { id: 'buzz',   name: 'Buzz Lightyear', desc: 'Al infinito',    sprite: '/lectura-crash/sprites/buzz.png' },
];

export const ZONES = [
  { name: 'Zona 1 — Vocales y sílabas directas', color: '#4ddc7a', bg: 'rgba(77,220,122,.15)',   levels: [1,2,3]   },
  { name: 'Zona 2 — Vocal + consonante ⚡',       color: '#7F77DD', bg: 'rgba(127,119,221,.15)', levels: [4,5,6]   },
  { name: 'Zona 3 — Sílabas de 3 letras ⚡',      color: '#D85A30', bg: 'rgba(216,90,48,.15)',   levels: [7,8,9]   },
  { name: 'Zona 4 — Combinaciones complejas',     color: '#D4537E', bg: 'rgba(212,83,126,.15)',  levels: [10,11,12]},
  { name: 'Zona 5 — Dominio y velocidad',         color: '#378ADD', bg: 'rgba(55,138,221,.15)',  levels: [13,14,15]},
];

export const LEVELS = [
  { n:1,  title:'Vocales solas',          desc:'a · e · i · o · u · ma me mi',
    words:['a','e','i','o','u','ma','me','mi','mo','mu','la','le','li','lo','lu','pa','pe','pi','po','pu'],
    sentences:['mamá ama a papá','mi mamá me mima','la luna es mi luz','mi mamá me da leche','papá me da la mano'] },
  { n:2,  title:'Sílabas p/t/s',          desc:'pa pe pi · ta te ti · pato',
    words:['pa','pe','pi','ta','te','ti','sa','se','si','pato','tasa','sopa','piso','tela','seta','paso','tipo','cama','rama','loma'],
    sentences:['el pato toma sopa','papá pisa la tela','la sopa está en la tasa','mi cama es de pino','el paso es tipo tela'] },
  { n:3,  title:'Sílabas n/l/d',          desc:'na ne ni · la le li · nene',
    words:['na','ne','ni','la','le','li','da','de','di','nene','dado','luna','lado','lana','dedo','nido','dale','lona','duna','nube'],
    sentences:['el nene da el dado','la luna está al lado','dale la lana al nene','el nido es de lona','mamá le da el dado al nene'] },
  { n:4,  title:'VC final: -an -en -in',  desc:'pan · ten · fin · con · tun',
    words:['pan','ten','fin','con','sin','van','den','pin','ton','bin','man','ven','mon','jun','tan','len','min','ron','can','sen'],
    sentences:['el pan con sal está tan rico','van sin fin por el camino','ten el pin en la mano','el van van con don juan','den el pan con el ron'] },
  { n:5,  title:'VC final: -al -el -ol',  desc:'sal · gel · col · mal · sol',
    words:['sal','gel','col','mal','sol','pal','vel','pol','tal','mol','bal','nel','rol','cal','del','fol','hal','jel','lal','mel'],
    sentences:['el sol sale del mar','la col con sal está mal','tal vez el sol es del cielo','el rol del gel es tal','la sal del mar es cal'] },
  { n:6,  title:'VC en medio: com lan',   desc:'campo · lento · canto',
    words:['campo','lento','canto','bando','funda','mundo','cinta','banco','tango','ronda','menta','punto','venta','combo','planta','pronto','frente','cuenta','puente','tierra'],
    sentences:['el campo tiene mucho viento','la planta está en el banco','voy pronto al puente del río','canto un tango en el frente','la funda cuenta con cinta verde'] },
  { n:7,  title:'CVC simples',            desc:'bol · mar · par · col',
    words:['bol','mar','par','col','bis','bar','cor','ful','gar','her','sol','tor','val','ber','car','dul','fan','gol','haz','jar'],
    sentences:['el sol brilla sobre el mar','el gol fue en el segundo par','el val del bar tiene col','haz un bol con el jar','el car va por el sol'] },
  { n:8,  title:'CVC en palabras largas', desc:'camper · ventana · portal',
    words:['camper','portal','lentes','colmillo','ventana','cartel','animal','bonito','regalo','camisa','salida','cocina','puerta','cabeza','mañana','zapato','jardín','familia','sonrisa','dinero'],
    sentences:['mañana abro la ventana del portal','el animal bonito tiene colmillo','mi familia tiene una sonrisa bonita','la camisa y el zapato son un regalo','la cocina tiene salida al jardín'] },
  { n:9,  title:'Mezcla directa + CVC',   desc:'pelota · domingo · sonrisa',
    words:['paleta','domingo','carrera','ventana','pelota','camino','paloma','maleta','tomate','semana','pastel','ciudad','bonito','regalo','camisa','salida','cocina','puerta','cabeza','familia'],
    sentences:['el domingo hago una carrera con la pelota','la paloma vuela sobre la ciudad bonita','mi familia come pastel de tomate','la maleta tiene ropa para la semana','el camino pasa por la ventana del portal'] },
  { n:10, title:'R suave',                desc:'caro · pero · aroma',
    words:['caro','pero','loro','muro','careta','torero','aroma','maroma','faro','pera','foro','cura','mira','toro','bara','cara','mira','soro','tero','moro'],
    sentences:['el loro mira el faro lejano','la pera tiene un aroma caro','pero el torero usa careta','el toro da vueltas cerca del muro','mira la cara del loro en el foro'] },
  { n:11, title:'RR · LL · CH · QU',     desc:'carro · leche · queso',
    words:['carro','calle','leche','queso','lluvia','perro','pollo','ducha','chico','quince','lleno','choza','queja','llora','chupa','chela','llama','chirro','quilla','quello'],
    sentences:['el perro llora en la lluvia','el chico toma leche con queso','la llama llena la choza de lana','el carro va por la calle mojada','quince pollos duermen en la ducha'] },
  { n:12, title:'Sílabas: bla fla cla',   desc:'blusa · flor · clavo',
    words:['blusa','flor','clavo','plato','globo','pluma','clima','flora','bloque','claro','playa','flaco','blanco','clase','plaza','flecha','blando','plomo','globo','clínica'],
    sentences:['la flor blanca está en el plato','el globo flaco vuela en la plaza','la clase tiene clima blando','clavo la flecha en el bloque de plomo','la pluma de la blusa es clara'] },
  { n:13, title:'R fuerte: bra tra',      desc:'brazo · frente · dragón',
    words:['brazo','frente','trampa','dragón','grillo','crema','brisa','fruta','trama','grito','crudo','bravo','freno','trece','gripe','cresta','bruja','frotar','trozo','grasa'],
    sentences:['el dragón grita con la frente en alto','la brisa fresca trae fruta fresca','trece grillos frotan sus alas con grasa','la bruja trama un truco bravo','el gripo crudo tiene crema en la cresta'] },
  { n:14, title:'Palabras largas',        desc:'murciélago · mariposa',
    words:['murciélago','mariposa','electricidad','chocolate','helicóptero','cumpleaños','computadora','refrigerador','comunicación','universidad','departamento','biblioteca','ambulancia','arquitectura','civilización','independencia','responsabilidad','extraordinario','temperatura','vocabulario'],
    sentences:['el murciélago vuela con extraordinaria velocidad','la mariposa tiene una responsabilidad con la naturaleza','en la biblioteca de la universidad hay computadoras','el helicóptero de la ambulancia tiene temperatura controlada','la arquitectura de la civilización requiere comunicación'] },
  { n:15, title:'Oraciones completas',    desc:'Lee con fluidez',
    words:['el gato duerme en la cama','mamá lava la ropa blanca','el pájaro canta en el árbol','papá trae frutas del mercado','mi perro corre por el parque','la mariposa vuela entre las flores','el niño lee un libro nuevo','la luna brilla en la noche clara','jugamos fútbol en el jardín','comemos frutas y verduras frescas','el tren pasa por el túnel','la lluvia cae sobre el campo','mi amigo tiene un gato negro','vamos al parque todos los domingos','la profesora escribe en el pizarrón','el cielo está lleno de estrellas','bebemos agua fría en verano','el sol sale por la mañana','mi familia cena junta cada día','los niños juegan con alegría'],
    sentences:[] },
];

// Clases de sílabas para Etapa 2
export const SYLLABLE_LESSONS = [
  { id:'vocales',   title:'Las vocales',        items:['a','e','i','o','u'],                 color:'#4ddc7a' },
  { id:'ma_group',  title:'Familia MA',          items:['ma','me','mi','mo','mu'],            color:'#7F77DD' },
  { id:'pa_group',  title:'Familia PA',          items:['pa','pe','pi','po','pu'],            color:'#D85A30' },
  { id:'ta_group',  title:'Familia TA',          items:['ta','te','ti','to','tu'],            color:'#378ADD' },
  { id:'na_group',  title:'Familia NA',          items:['na','ne','ni','no','nu'],            color:'#D4537E' },
  { id:'vc_an',     title:'VC final: AN EN IN',  items:['an','en','in','on','un'],            color:'#f97316' },
  { id:'vc_al',     title:'VC final: AL EL OL',  items:['al','el','ol','ul','il'],            color:'#eab308' },
  { id:'vc_medio',  title:'VC en medio',         items:['cam','lan','pon','can','den','com'], color:'#ec4899' },
  { id:'cvc_basic', title:'3 letras: CVC',        items:['bol','mar','par','col','sol','bis'], color:'#06b6d4' },
];

export const ALL_ITEMS = [
  // Nivel 1
  { id:'bg_stars',     level:1,  cat:'Fondo',     name:'Fondo estrellas',  emoji:'✨', effect:'bg-stars'    },
  { id:'eyes_glow',    level:1,  cat:'Efecto',     name:'Ojos brillantes',  emoji:'👀', effect:'glow-soft'   },
  { id:'aura_soft',    level:1,  cat:'Efecto',     name:'Aura suave',       emoji:'🌟', effect:'aura-soft'   },
  // Nivel 2
  { id:'shirt_blue',   level:2,  cat:'Ropa',       name:'Remera azul',      emoji:'👕', effect:null          },
  { id:'pants_jeans',  level:2,  cat:'Ropa',       name:'Jeans',            emoji:'👖', effect:null          },
  { id:'shoes_white',  level:2,  cat:'Calzado',    name:'Zapatillas',       emoji:'👟', effect:null          },
  // Nivel 3
  { id:'hat_cap',      level:3,  cat:'Sombrero',   name:'Gorra roja',       emoji:'🧢', effect:null          },
  { id:'necklace_b',   level:3,  cat:'Accesorio',  name:'Collar',           emoji:'📿', effect:null          },
  { id:'glasses_sq',   level:3,  cat:'Accesorio',  name:'Anteojos',         emoji:'🕶️', effect:null          },
  // Nivel 4
  { id:'jacket_red',   level:4,  cat:'Ropa',       name:'Chaqueta roja',    emoji:'🥻', effect:null          },
  { id:'bracelet_g',   level:4,  cat:'Accesorio',  name:'Pulsera dorada',   emoji:'✨', effect:null          },
  { id:'glow_gold',    level:4,  cat:'Efecto',     name:'Brillo dorado',    emoji:'🌟', effect:'glow-gold'   },
  // Nivel 5
  { id:'scarf_purple', level:5,  cat:'Accesorio',  name:'Bufanda morada',   emoji:'🧣', effect:null          },
  { id:'bag_back',     level:5,  cat:'Accesorio',  name:'Mochila',          emoji:'🎒', effect:null          },
  { id:'bg_galaxy',    level:5,  cat:'Fondo',      name:'Fondo galaxia',    emoji:'🌌', effect:'bg-galaxy'   },
  // Nivel 6
  { id:'tattoo_arm',   level:6,  cat:'Accesorio',  name:'Tatuaje brazo',    emoji:'💉', effect:null          },
  { id:'shadow_efx',   level:6,  cat:'Efecto',     name:'Sombra oscura',    emoji:'🌑', effect:'shadow'      },
  { id:'belt_studs',   level:6,  cat:'Accesorio',  name:'Cinto',            emoji:'🔗', effect:null          },
  // Nivel 7
  { id:'cape_black',   level:7,  cat:'Ropa',       name:'Capa negra',       emoji:'🦸', effect:null          },
  { id:'hat_witch',    level:7,  cat:'Sombrero',   name:'Sombrero mago',    emoji:'🎩', effect:null          },
  { id:'boots_black',  level:7,  cat:'Calzado',    name:'Botas negras',     emoji:'👢', effect:null          },
  // Nivel 8
  { id:'mask_cool',    level:8,  cat:'Accesorio',  name:'Máscara',          emoji:'🎭', effect:null          },
  { id:'gloves_blk',   level:8,  cat:'Accesorio',  name:'Guantes',          emoji:'🥊', effect:null          },
  { id:'bg_rainbow',   level:8,  cat:'Fondo',      name:'Fondo arcoíris',   emoji:'🌈', effect:'bg-rainbow'  },
  // Nivel 9
  { id:'necklace_gold',level:9,  cat:'Accesorio',  name:'Collar de oro',    emoji:'⛓️', effect:null          },
  { id:'item_crystal', level:9,  cat:'Especial',   name:'Cristal raro',     emoji:'💎', effect:'glow-cyan'   },
  { id:'crown_silver', level:9,  cat:'Sombrero',   name:'Corona plateada',  emoji:'👑', effect:null          },
  // Nivel 10
  { id:'skin_special', level:10, cat:'Skin',       name:'Skin especial',    emoji:'🎨', effect:'hue-rotate'  },
  { id:'aura_purple',  level:10, cat:'Efecto',     name:'Aura morada',      emoji:'💜', effect:'aura-purple' },
  { id:'outfit_ninja', level:10, cat:'Ropa',       name:'Traje ninja',      emoji:'🥷', effect:'contrast'    },
  // Nivel 11
  { id:'hoodie_dark',  level:11, cat:'Ropa',       name:'Capucha oscura',   emoji:'🧥', effect:null          },
  { id:'scar_cool',    level:11, cat:'Accesorio',  name:'Cicatriz cool',    emoji:'⚡', effect:null          },
  { id:'shoes_wild',   level:11, cat:'Calzado',    name:'Zapatos raros',    emoji:'🥿', effect:null          },
  // Nivel 12
  { id:'skin_metal',   level:12, cat:'Skin',       name:'Skin metálico',    emoji:'🤖', effect:'metal'       },
  { id:'wings_dark',   level:12, cat:'Especial',   name:'Alas oscuras',     emoji:'🦇', effect:null          },
  { id:'bg_dark',      level:12, cat:'Fondo',      name:'Fondo oscuro',     emoji:'🌑', effect:'bg-dark'     },
  // Nivel 13
  { id:'crown_gold',   level:13, cat:'Sombrero',   name:'Corona dorada',    emoji:'👑', effect:null          },
  { id:'cape_gold',    level:13, cat:'Ropa',       name:'Capa dorada',      emoji:'✨', effect:null          },
  { id:'bg_legendary', level:13, cat:'Fondo',      name:'Fondo legendario', emoji:'🔥', effect:'bg-legendary'},
  // Nivel 14
  { id:'skin_gold',    level:14, cat:'Skin',       name:'Skin dorado',      emoji:'🌟', effect:'gold'        },
  { id:'fire_efx',     level:14, cat:'Efecto',     name:'Efecto fuego',     emoji:'🔥', effect:'fire'        },
  { id:'weapon_deco',  level:14, cat:'Especial',   name:'Arma decorativa',  emoji:'⚔️', effect:null          },
  // Nivel 15
  { id:'skin_legend',  level:15, cat:'Skin',       name:'Skin legendario',  emoji:'💫', effect:'legendary'   },
  { id:'throne_deco',  level:15, cat:'Especial',   name:'Podio campeón',    emoji:'🏆', effect:null          },
  { id:'title_master', level:15, cat:'Especial',   name:'Título Maestro',   emoji:'🎓', effect:null          },
];

export const EFFECT_STYLES = {
  'glow-soft':    'filter: drop-shadow(0 0 8px #fbbf24)',
  'glow-gold':    'filter: drop-shadow(0 0 14px #fbbf24) drop-shadow(0 0 28px #f97316)',
  'glow-cyan':    'filter: drop-shadow(0 0 10px #06b6d4)',
  'aura-soft':    'filter: drop-shadow(0 0 6px #a78bfa)',
  'aura-purple':  'filter: drop-shadow(0 0 18px #a855f7) drop-shadow(0 0 36px #7c3aed)',
  'shadow':       'filter: drop-shadow(4px 4px 0 #000) brightness(0.85)',
  'metal':        'filter: grayscale(0.8) brightness(1.3) contrast(1.1)',
  'gold':         'filter: sepia(0.8) saturate(4) brightness(1.1)',
  'fire':         'filter: drop-shadow(0 0 14px #f97316) drop-shadow(0 0 28px #ef4444)',
  'legendary':    'filter: hue-rotate(180deg) saturate(2) brightness(1.2) drop-shadow(0 0 20px #c084fc)',
  'hue-rotate':   'filter: hue-rotate(60deg) saturate(1.5)',
  'contrast':     'filter: grayscale(0.3) contrast(1.2)',
};

export const BG_STYLES = {
  'bg-stars':     'background: radial-gradient(ellipse at top, #1a0a4e 0%, #0d0620 100%)',
  'bg-galaxy':    'background: radial-gradient(ellipse at center, #2d0a5e 0%, #0a0a2e 100%)',
  'bg-rainbow':   'background: linear-gradient(135deg, #2d0a5e, #0a2d5e, #0a5e2d)',
  'bg-dark':      'background: #050210',
  'bg-legendary': 'background: radial-gradient(circle, #4a1080, #0d0620); box-shadow: inset 0 0 60px #f9731640',
};

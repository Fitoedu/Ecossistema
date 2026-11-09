export interface BingoPest {
  readonly id: string
  readonly name: string
  readonly scientificName: string
  readonly emoji: string
  readonly crop: string
  readonly cropEmoji: string
  readonly clue: string
  readonly curiosity: string
}

export const BINGO_BOARD_SIZE = 3
export const BINGO_TOTAL_CELLS = BINGO_BOARD_SIZE * BINGO_BOARD_SIZE

export const WINNING_LINES: readonly (readonly [number, number, number])[] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
] as const

export const BINGO_PESTS: readonly BingoPest[] = [
  {
    id: 'mosca-da-carambola',
    name: 'Mosca-da-carambola',
    scientificName: 'Bactrocera carambolae',
    emoji: '🪰',
    crop: 'Carambola e Goiaba',
    cropEmoji: '⭐',
    clue: 'Entrou no Brasil pelo Amapá e ataca carambolas, goiabas e acerolas! Por causa dela existem barreiras de fiscalização.',
    curiosity: 'Nunca transporte frutas do Amapá para outros estados sem autorização da defesa agropecuária!',
  },
  {
    id: 'broca-do-cupuacu',
    name: 'Broca-do-cupuaçu',
    scientificName: 'Conotrachelus humeropictus',
    emoji: '🪲',
    crop: 'Cupuaçu',
    cropEmoji: '🥥',
    clue: 'Besourinho escuro cujas larvas abrem galerias dentro da polpa do cupuaçu.',
    curiosity: 'Recolher os frutos caídos no chão é a melhor forma de evitar que essa broca se espalhe no pomar.',
  },
  {
    id: 'mandarova-da-mandioca',
    name: 'Mandarová-da-mandioca',
    scientificName: 'Erinnyis ello',
    emoji: '🐛',
    crop: 'Mandioca',
    cropEmoji: '🍠',
    clue: 'Lagarta grande e muito comilona que devora as folhas da mandioca rapidamente.',
    curiosity: 'Inimigos naturais como vespinhas ajudam a controlar o mandarová sem precisar de agrotóxicos.',
  },
  {
    id: 'acaro-vermelho-das-palmeiras',
    name: 'Ácaro-vermelho-das-palmeiras',
    scientificName: 'Raoiella indica',
    emoji: '🕷️',
    crop: 'Açaí e Coqueiro',
    cropEmoji: '🌴',
    clue: 'Praga minúscula e avermelhada que vive debaixo das folhas do açaizeiro e do coqueiro, deixando-as amareladas.',
    curiosity: 'Apesar do tamanho microscópico, o vento pode carregá-lo para outras palmeiras bem distantes.',
  },
  {
    id: 'sauva',
    name: 'Formiga Saúva',
    scientificName: 'Atta spp.',
    emoji: '🐜',
    crop: 'Mandioca e Pomares',
    cropEmoji: '🌿',
    clue: 'Corta pedacinhos de folhas em meia-lua e carrega em fila indiana para dentro do formigueiro.',
    curiosity: 'As saúvas não comem as folhas! Elas usam as folhas para cultivar um fungo que alimenta a colônia.',
  },
  {
    id: 'mosca-negra-dos-citros',
    name: 'Mosca-negra-dos-citros',
    scientificName: 'Aleurocanthus woglumi',
    emoji: '🦟',
    crop: 'Laranja e Limão',
    cropEmoji: '🍊',
    clue: 'Suga a seiva das laranjeiras e limoeiros, favorecendo um fungo escuro (fumagina) que deixa a folha preta.',
    curiosity: 'A camada escura nas folhas impede que a planta receba luz do sol para fazer fotossíntese.',
  },
  {
    id: 'broca-do-olho-do-coqueiro',
    name: 'Broca-do-olho-do-coqueiro',
    scientificName: 'Rhynchophorus palmarum',
    emoji: '🪳',
    crop: 'Coqueiro e Açaí',
    cropEmoji: '🥥',
    clue: 'Besouro grande e bicudo que ataca o topo das palmeiras e transmite a doença do anel-vermelho.',
    curiosity: 'Armadilhas com pedaços de cana ou abacaxi ajudam os agricultores a monitorar esse besouro.',
  },
  {
    id: 'pulgao',
    name: 'Pulgão-das-hortaliças',
    scientificName: 'Aphis gossypii',
    emoji: '🐞',
    crop: 'Hortaliças e Melancia',
    cropEmoji: '🍉',
    clue: 'Inseto pequenininho que vive em colônias nos brotos novos e deixa as folhas todas enroladas.',
    curiosity: 'As joaninhas são as maiores aliadas da horta porque adoram comer pulgões!',
  },
  {
    id: 'lagarta-do-cartucho',
    name: 'Lagarta-do-cartucho',
    scientificName: 'Spodoptera frugiperda',
    emoji: '🐛',
    crop: 'Milho',
    cropEmoji: '🌽',
    clue: 'Esconde-se bem no miolo (cartucho) do pé de milho, raspando e furando as folhas novas.',
    curiosity: 'Recebe esse nome porque ataca justamente as folhas enroladas no topo do milho, que parecem um cartucho.',
  },
  {
    id: 'mosca-branca',
    name: 'Mosca-branca',
    scientificName: 'Bemisia tabaci',
    emoji: '🦋',
    crop: 'Feijão, Tomate e Mandioca',
    cropEmoji: '🍅',
    clue: 'Inseto minúsculo de asas brancas que voa em nuvem quando mexemos nas folhas da horta.',
    curiosity: 'Apesar do nome, ela não é uma mosca de verdade: é parente das cigarras e dos pulgões!',
  },
  {
    id: 'broca-da-bananeira',
    name: 'Moleque-da-bananeira',
    scientificName: 'Cosmopolites sordidus',
    emoji: '🪲',
    crop: 'Bananeira',
    cropEmoji: '🍌',
    clue: 'Besouro escuro que faz túneis na base (rizoma) da bananeira, deixando a planta fraca e fácil de tombar.',
    curiosity: 'Iscas feitas com o próprio pseudocaule da bananeira cortado ao meio atraem o besouro para controle.',
  },
  {
    id: 'cochonilha-da-mandioca',
    name: 'Cochonilha-da-mandioca',
    scientificName: 'Phenacoccus manihoti',
    emoji: '⚪',
    crop: 'Mandioca',
    cropEmoji: '🌱',
    clue: 'Parece um floquinho de algodão branco grudado nos brotos e folhas da mandioca.',
    curiosity: 'Ela suga a seiva e deixa a ponta da planta deformada, parecendo um pequeno repolho.',
  },
]

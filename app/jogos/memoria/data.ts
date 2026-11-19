export interface Pest {
  readonly id: string
  readonly name: string
  readonly scientificName: string
  readonly icon: string
  readonly image?: string
  readonly host: string
  readonly hostIcon: string
  readonly color: string
  readonly curiosity: string
}

export type CardFace = 'image' | 'name'

export interface MemoryCard {
  readonly uid: string
  readonly pairId: string
  readonly face: CardFace
}

export const SETTINGS = {
  flipBackDelayMs: 1100,
  storageKey: 'fitoedu:memoria:recorde',
  menuHref: '/jogos',
} as const

export const PESTS: readonly Pest[] = [
  {
    id: 'mosca-da-carambola',
    name: 'Mosca-da-carambola',
    scientificName: 'Bactrocera carambolae',
    icon: '🪰',
    host: 'Carambola',
    hostIcon: '⭐',
    color: '#fde68a',
    curiosity:
      'Ela entrou no Brasil pelo Amapá, vinda dos países vizinhos! Por isso, não podemos levar frutas como carambola, goiaba e acerola para outros estados sem autorização.',
  },
  {
    id: 'broca-do-cupuacu',
    name: 'Broca-do-cupuaçu',
    scientificName: 'Conotrachelus humeropictus',
    icon: '🪲',
    host: 'Cupuaçu',
    hostIcon: '🥥',
    color: '#fed7aa',
    curiosity:
      'É um besourinho que coloca ovos no fruto. As larvas comem a polpa por dentro! Recolher os frutos caídos no chão ajuda a proteger o cupuaçuzeiro.',
  },
  {
    id: 'mandarova-da-mandioca',
    name: 'Mandarová-da-mandioca',
    scientificName: 'Erinnyis ello',
    icon: '🐛',
    host: 'Mandioca',
    hostIcon: '🍠',
    color: '#bbf7d0',
    curiosity:
      'Essa lagarta é muito comilona e pode deixar a mandioca sem folhas em poucos dias. Vespinhas e um vírus natural (baculovírus) ajudam a controlá-la sem veneno!',
  },
  {
    id: 'acaro-vermelho-das-palmeiras',
    name: 'Ácaro-vermelho-das-palmeiras',
    scientificName: 'Raoiella indica',
    icon: '🕷️',
    host: 'Açaí e coqueiro',
    hostIcon: '🌴',
    color: '#fecaca',
    curiosity:
      'Ele é tão pequenininho que quase não dá para ver! Vive embaixo das folhas do coqueiro, do açaizeiro e da bananeira, sugando a seiva e deixando tudo amarelado.',
  },
  {
    id: 'sauva',
    name: 'Saúva',
    scientificName: 'Atta spp.',
    icon: '🐜',
    host: 'Mandioca e pomares',
    hostIcon: '🌿',
    color: '#ddd6fe',
    curiosity:
      'As saúvas não comem as folhas que cortam! Elas levam as folhas para o formigueiro para cultivar um fungo, que é o verdadeiro alimento delas.',
  },
  {
    id: 'mosca-negra-dos-citros',
    name: 'Mosca-negra-dos-citros',
    scientificName: 'Aleurocanthus woglumi',
    icon: '🦟',
    host: 'Laranja e limão',
    hostIcon: '🍊',
    color: '#bae6fd',
    curiosity:
      'Ela suga a seiva das folhas e solta um melzinho. Nele cresce um fungo preto chamado fumagina, que cobre a folha e atrapalha a planta a fazer fotossíntese.',
  },
]

export const PESTS_BY_ID: ReadonlyMap<string, Pest> = new Map(PESTS.map((pest) => [pest.id, pest]))

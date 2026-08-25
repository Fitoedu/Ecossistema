export interface TermoGlossario {
  id: string
  termo: string
  categoria: 'Doenças' | 'Pragas' | 'Manejo e Defesa' | 'Botânica e Solo'
  definicao: string
  exemploPratico?: string
}

export const termosGlossario: TermoGlossario[] = [
  {
    id: 'triangulo-da-doenca',
    termo: 'Triângulo da Doença',
    categoria: 'Doenças',
    definicao:
      'Conceito fundamental da fitopatologia que estabelece que uma doença vegetal só ocorre quando há a interação simultânea de um Hospedeiro suscetível, um Patógeno virulento e um Ambiente favorável.',
    exemploPratico:
      'Se a umidade foliar for reduzida por poda de aeração, o vértice do ambiente é quebrado e o fungo não consegue germinar.',
  },
  {
    id: 'sintoma',
    termo: 'Sintoma',
    categoria: 'Doenças',
    definicao:
      'Qualquer manifestação das reações da planta hospedeira resultante da agressão de um patógeno ou estresse abiótico (ex: manchas, murchas, clorose).',
    exemploPratico: 'O amarelecimento (clorose) entre as nervuras da folha é um sintoma característico.',
  },
  {
    id: 'sinal',
    termo: 'Sinal',
    categoria: 'Doenças',
    definicao:
      'Estruturas visíveis do próprio agente causal da doença presentes na lesão (ex: micélio fúngico, esporos, pústulas, exsudato bacteriano).',
    exemploPratico: 'O pó branco aveludado na superfície da folha atacada por oídio é o micélio do fungo (um sinal).',
  },
  {
    id: 'oidio',
    termo: 'Oídio',
    categoria: 'Doenças',
    definicao:
      'Doença fúngica biotrófica comum caracterizada pela formação de uma camada pulverulenta esbranquiçada sobre folhas, ramos e frutos. Prospera em clima seco com noites úmidas.',
    exemploPratico: 'Muito frequente em cucurbitáceas (abobrinha, pepino) e videiras.',
  },
  {
    id: 'mildio',
    termo: 'Míldio',
    categoria: 'Doenças',
    definicao:
      'Doença provocada por oomicetos que se manifesta com manchas oleosas na face superior da folha e esporulação esbranquiçada/acinzentada na face inferior. Exige água livre na folha.',
    exemploPratico: 'Comum em hortaliças e uva após chuvas contínuas e temperaturas amenas.',
  },
  {
    id: 'anasarca',
    termo: 'Anasarca (Encharcamento / Hidrose)',
    categoria: 'Doenças',
    definicao:
      'Aspecto translúcido ou encharcado nos tecidos vegetais, típico das fases iniciais de infecções bacterianas antes da necrose.',
    exemploPratico: 'Manchas translúcidas com formato angular delimitadas pelas nervuras em folhas de tomateiro.',
  },
  {
    id: 'vetor',
    termo: 'Vetor Biológico',
    categoria: 'Pragas',
    definicao:
      'Organismo vivo (geralmente insetos sugadores como pulgões, cigarrinhas e moscas-brancas) capaz de transmitir vírus, bactérias ou fitoplasmas de uma planta infectada para uma sadia.',
    exemploPratico: 'A mosca-branca (*Bemisia tabaci*) é o principal vetor do geminivírus no tomate.',
  },
  {
    id: 'roguing',
    termo: 'Roguing (Erradicação Sanitária)',
    categoria: 'Manejo e Defesa',
    definicao:
      'Prática cultural que consiste em arrancar e eliminar do campo plantas doentes ou atípicas para reduzir fontes de inóculo e conter a disseminação de vírus ou bactérias.',
    exemploPratico: 'Eliminação imediata de plantas de mamoeiro com sintomas do mosaico.',
  },
  {
    id: 'nde',
    termo: 'Nível de Dano Econômico (NDE)',
    categoria: 'Manejo e Defesa',
    definicao:
      'A menor densidade populacional de uma praga ou intensidade de doença que causará prejuízos econômicos superiores ao custo de controle.',
    exemploPratico: 'Aplicar bionematicida apenas quando a contagem de nematoides no solo atingir o limiar estabelecido.',
  },
  {
    id: 'periodo-de-carencia',
    termo: 'Período de Carência (Intervalo de Segurança)',
    categoria: 'Manejo e Defesa',
    definicao:
      'O número de dias que deve obrigatoriamente decorrer entre a última aplicação de um produto fitossanitário e a colheita do alimento, garantindo limites seguros de resíduos.',
    exemploPratico: 'Se a carência for de 7 dias, os frutos só podem ser colhidos a partir do 8º dia após a pulverização.',
  },
  {
    id: 'bionematicida',
    termo: 'Bionematicida / Bioinsumo',
    categoria: 'Manejo e Defesa',
    definicao:
      'Agente de controle biológico de base microbiológica (ex: *Bacillus subtilis*, *Trichoderma*, *Purpureocillium lilacinum*) utilizado no solo para reduzir populações de nematoides fitoparasitas.',
    exemploPratico: 'Inoculação de *Trichoderma* no sulco de plantio para proteger as raízes contra nematoides-das-galhas.',
  },
  {
    id: 'fitotoxidade',
    termo: 'Fitotoxidade',
    categoria: 'Manejo e Defesa',
    definicao:
      'Dano tóxico ou queimadura química provocada nos tecidos da planta devido ao uso inadequado de dosagens, misturas incompatíveis de caldas ou aplicações sob sol intenso.',
    exemploPratico: 'Queima das bordas das folhas após pulverização de óleo mineral ao meio-dia sob calor excessivo.',
  },
  {
    id: 'holometabolo',
    termo: 'Metamorfose Completa (Holometábolo)',
    categoria: 'Pragas',
    definicao:
      'Desenvolvimento de insetos que passa por 4 fases distintas: Ovo → Larva (lagarta) → Pupa (crisálida) → Adulto (mariposa/borboleta/besouro).',
    exemploPratico: 'A lagarta-do-cartucho é a fase larval voraz que causa o dano direto na cultura.',
  },
  {
    id: 'tagma',
    termo: 'Tagma',
    categoria: 'Pragas',
    definicao:
      'Divisão corporal dos insetos e artrópodes. Nos insetos verdadeiros, o corpo é dividido em 3 tagmas: Cabeça, Tórax e Abdome.',
    exemploPratico: 'As 6 pernas e as asas do inseto inserem-se exclusivamente no tagma do Tórax.',
  },
  {
    id: 'metabolitos-secundarios',
    termo: 'Metabólitos Secundários',
    categoria: 'Botânica e Solo',
    definicao:
      'Compostos químicos sintetizados pelas plantas para sua defesa contra herbívoros e patógenos, responsáveis pelas propriedades terapêuticas das plantas medicinais (ex: óleos essenciais, alcaloides, taninos).',
    exemploPratico: 'O timol e o carvacrol presentes no orégano e tomilho possuem potente ação antimicrobiana.',
  },
  {
    id: 'adubacao-verde',
    termo: 'Adubação Verde e Rotação Antagônica',
    categoria: 'Botânica e Solo',
    definicao:
      'Plantio de espécies vegetais (ex: *Crotalaria spectabilis*, *Tagetes*, aveia-preta) para incorporar matéria orgânica, fixar nitrogênio e suprimir pragas e nematoides de solo.',
    exemploPratico: 'Cultivar crotalária na entressafra atrai fêmeas de nematoides para raízes onde não conseguem completar o ciclo reprodutivo.',
  },
]

export const categoriasGlossario = [
  'Todas',
  'Doenças',
  'Pragas',
  'Manejo e Defesa',
  'Botânica e Solo',
] as const


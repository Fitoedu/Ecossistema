export type SobreContent = {
  badge: string
  title: string
  description: string
  historia: {
    heading: string
    paragraphs: string[]
  }
  porqueDigital: {
    heading: string
    paragraph: string
    footerLabel: string
  }
}

export const sobreContent: SobreContent = {
  badge: 'Educação Digital na Amazônia',
  title: 'Transformando a Educação Fitossanitária no Amapá.',
  description:
    'O EducaFito nasceu da necessidade de conectar o conhecimento científico agronômico com a comunidade local de forma acessível, interativa e amigável, utilizando tecnologia como ponte para a preservação ambiental.',
  historia: {
    heading: 'História do Projeto',
    paragraphs: [
      'Originado como um Trabalho de Conclusão de Curso (TCC), o EducaFito foi idealizado para suprir uma lacuna histórica na comunicação de riscos e práticas agronômicas na região Norte do Brasil, com foco especial no estado do Amapá.',
      'A barreira da linguagem técnica frequentemente afastava produtores rurais familiares, estudantes e a comunidade em geral do conhecimento vital sobre pragas e doenças vegetais. A criação da personagem "Dona Fito" e a digitalização do conteúdo através de cartilhas interativas marcaram o início de uma nova era na extensão rural digital.',
    ],
  },
  porqueDigital: {
    heading: 'Por que Digital?',
    paragraph:
      'A gamificação e o design focado no usuário (UX) transformam manuais complexos em experiências de aprendizado retentivas. A tecnologia Progressive Web App (PWA) garante que o conhecimento chegue até mesmo em áreas com conectividade limitada.',
    footerLabel: 'ABORDAGEM CIENTÍFICA',
  },
}
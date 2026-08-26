export type RoleColor = "primary" | "tertiary" | "accent";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  roleColor: RoleColor;
  bio: string;
  photo: string;
  lattesUrl: string;
  expertise: string[];
  linkedin?: string;
  email?: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "ana-silva",
    name: "Dra. Ana Silva",
    role: "Coordenação de Projeto",
    roleColor: "primary",
    bio: "Engenheira Agrônoma com mais de 15 anos de experiência em fitossanidade. Lidera a visão estratégica do EducaFito, garantindo a ponte entre os dados científicos e a comunidade local do Amapá.",
    photo: "/assets/avatars/avatar2.webp",
    lattesUrl: "#",
    expertise: ["Fitossanidade", "Gestão de Projetos", "Extensão Rural"],
  },
  {
    id: "carlos-mendes",
    name: "Carlos Mendes",
    role: "Liderança Técnica",
    roleColor: "tertiary",
    bio: "Especialista em desenvolvimento de Progressive Web Apps (PWA) e acessibilidade digital. Responsável por traduzir a experiência educacional em uma plataforma robusta, fluida e inclusiva para todos os dispositivos.",
    photo: "/assets/avatars/avatar1.webp",
    lattesUrl: "#",
    expertise: ["PWA & Next.js", "Acessibilidade Digital", "UX Engineering"],
  },
  {
    id: "pedro-costa",
    name: "Pedro Costa",
    role: "Especialista Educacional",
    roleColor: "accent",
    bio: "Pedagogo com foco em gamificação e design instrucional. Desenvolve as trilhas de aprendizagem, quizzes e dinâmicas interativas da Dona Fito, garantindo que o aprendizado seja divertido e memorável.",
    photo: "/assets/avatars/avatar3.webp",
    lattesUrl: "#",
    expertise: ["Gamificação", "Design Instrucional", "Pedagogia Digital"],
  },
];

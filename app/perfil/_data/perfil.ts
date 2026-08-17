export interface AppInfoLink {
  label: string;
  href?: string;
}

// Rótulos para o slider de acessibilidade
export const TAMANHOS_TEXTO = ["Pequeno", "Médio", "Grande"];

// Versão atual da aplicação
export const APP_VERSION = "v0.0.1 (Test Flight)";

// Estado inicial padrão para a tela de configurações
export const INITIAL_USER_SETTINGS = {
  nome: "Estudante EducaFito",
  email: "estudante@educafito.org.br",
  tamanhoTexto: [1],
  altoContraste: false,
  notifPush: true,
  notifEmail: false,
};

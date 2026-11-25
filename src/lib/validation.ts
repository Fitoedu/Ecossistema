/**
 * Validadores reutilizáveis de formulário.
 *
 * Uso típico:
 *   const errors = {
 *     email: validateEmail(form.email),
 *     senha: validateSenha(form.senha),
 *   };
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Regras de força de senha usadas no cadastro (ajuste conforme a política do produto). */
export const SENHA_MIN_LENGTH = 8;
const SENHA_TEM_MAIUSCULA = /[A-Z]/;
const SENHA_TEM_MINUSCULA = /[a-z]/;
const SENHA_TEM_NUMERO = /[0-9]/;

/* -------------------------------------------------------------------------- */
/* E-mail                                                                     */
/* -------------------------------------------------------------------------- */

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validação de e-mail para uso em formulários (login, registro, recuperação de senha).
 * Retorna a mensagem de erro ou `undefined` se válido.
 */
export function validateEmail(email: string): string | undefined {
  const value = email.trim();

  if (!value) {
    return "Informe seu e-mail.";
  }

  if (!isValidEmail(value)) {
    return "Informe um e-mail válido.";
  }

  return undefined;
}

/* -------------------------------------------------------------------------- */
/* Senha — login                                                              */
/* -------------------------------------------------------------------------- */

/**
 * Validação de senha para LOGIN.
 * Propositalmente permissiva: não expõe regras de força aqui, pois isso
 * ajudaria um atacante a enumerar critérios. Apenas garante que foi preenchida.
 */
export function validateSenhaLogin(senha: string): string | undefined {
  if (!senha) {
    return "Informe sua senha.";
  }

  return undefined;
}

/* -------------------------------------------------------------------------- */
/* Senha — cadastro (regras de força)                                        */
/* -------------------------------------------------------------------------- */

export interface SenhaForcaResultado {
  valida: boolean;
  mensagem?: string;
  criterios: {
    tamanho: boolean;
    maiuscula: boolean;
    minuscula: boolean;
    numero: boolean;
  };
}

/**
 * Avalia a força da senha para CADASTRO, retornando cada critério
 * individualmente — útil para exibir um checklist visual ao usuário.
 */
export function avaliarForcaSenha(senha: string): SenhaForcaResultado {
  const criterios = {
    tamanho: senha.length >= SENHA_MIN_LENGTH,
    maiuscula: SENHA_TEM_MAIUSCULA.test(senha),
    minuscula: SENHA_TEM_MINUSCULA.test(senha),
    numero: SENHA_TEM_NUMERO.test(senha),
  };

  const valida = Object.values(criterios).every(Boolean);

  return {
    valida,
    criterios,
    mensagem: valida
      ? undefined
      : `A senha deve ter pelo menos ${SENHA_MIN_LENGTH} caracteres, incluindo maiúscula, minúscula e número.`,
  };
}

/**
 * Validação de senha para CADASTRO.
 * Retorna a mensagem de erro ou `undefined` se válida.
 */
export function validateSenhaCadastro(senha: string): string | undefined {
  if (!senha) {
    return "Crie uma senha.";
  }

  return avaliarForcaSenha(senha).mensagem;
}

/**
 * Validação de confirmação de senha.
 */
export function validateConfirmacaoSenha(
  senha: string,
  confirmacao: string,
): string | undefined {
  if (!confirmacao) {
    return "Confirme sua senha.";
  }

  if (senha !== confirmacao) {
    return "As senhas não coincidem.";
  }

  return undefined;
}

/**
 * Classificação de força em 4 níveis (Fraca/Razoável/Boa/Forte), usada para
 * feedback visual em tempo real durante o cadastro. Mais granular que
 * `avaliarForcaSenha` (que é binária: válida ou não).
 */
export interface SenhaForcaNivel {
  label: "Fraca" | "Razoável" | "Boa" | "Forte";
  /** Token de cor do Chakra, pronto para uso em `color={...}`. */
  color: string;
}

export function getSenhaForcaNivel(senha: string): SenhaForcaNivel | null {
  if (!senha) return null;

  let score = 0;
  if (senha.length >= SENHA_MIN_LENGTH) score++;
  if (SENHA_TEM_NUMERO.test(senha)) score++;
  if (SENHA_TEM_MAIUSCULA.test(senha) && SENHA_TEM_MINUSCULA.test(senha)) score++;
  if (/[^A-Za-z0-9]/.test(senha)) score++;

  if (score <= 1) return { label: "Fraca", color: "red.500" };
  if (score <= 2) return { label: "Razoável", color: "accent.600" };
  if (score === 3) return { label: "Boa", color: "primary.500" };
  return { label: "Forte", color: "primary.700" };
}

/* -------------------------------------------------------------------------- */
/* Nome (usado no cadastro)                                                   */
/* -------------------------------------------------------------------------- */

export function validateNome(nome: string): string | undefined {
  const value = nome.trim();

  if (!value) {
    return "Informe seu nome.";
  }

  if (value.length < 2) {
    return "Informe um nome válido.";
  }

  return undefined;
}

/* -------------------------------------------------------------------------- */
/* Aceite de termos (usado no cadastro)                                      */
/* -------------------------------------------------------------------------- */

export function validateAceiteTermos(aceite: boolean): string | undefined {
  if (!aceite) {
    return "É preciso aceitar os termos para continuar.";
  }

  return undefined;
}

/* -------------------------------------------------------------------------- */
/* Formulário de registro (composto)                                         */
/* -------------------------------------------------------------------------- */

export interface RegistroFormState {
  nome: string;
  email: string;
  senha: string;
  aceiteTermos: boolean;
}

export interface RegistroFormErrors {
  nome?: string;
  email?: string;
  senha?: string;
  aceiteTermos?: string;
}

/**
 * Validação completa da tela de registro/cadastro.
 * Centraliza todas as regras num único ponto para não duplicar lógica
 * caso o formulário seja reaproveitado em outro lugar (ex: onboarding).
 */
export function validateRegistroForm(
  form: RegistroFormState,
): RegistroFormErrors {
  return {
    nome: validateNome(form.nome),
    email: validateEmail(form.email),
    senha: validateSenhaCadastro(form.senha),
    aceiteTermos: validateAceiteTermos(form.aceiteTermos),
  };
}

/* -------------------------------------------------------------------------- */
/* Helper genérico                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Roda um conjunto de validadores e retorna apenas os erros presentes.
 * Facilita compor o objeto `errors` em qualquer formulário.
 *
 * Exemplo:
 *   const errors = runValidators({
 *     email: () => validateEmail(form.email),
 *     senha: () => validateSenhaLogin(form.senha),
 *   });
 */
export function runValidators<T extends Record<string, () => string | undefined>>(
  validators: T,
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const key in validators) {
    const message = validators[key]();
    if (message) {
      errors[key] = message;
    }
  }

  return errors;
}
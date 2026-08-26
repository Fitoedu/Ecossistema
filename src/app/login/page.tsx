"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Field,
  Flex,
  Heading,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import { validateEmail, validateSenhaLogin } from "@/lib/validation";
import { useAuth } from "@/providers/AuthProvider";
import { logger } from "@/lib/logger";

interface FormState {
  email: string;
  senha: string;
}

interface FormErrors {
  email?: string;
  senha?: string;
}

function validate({ email, senha }: FormState): FormErrors {
  return {
    email: validateEmail(email),
    senha: validateSenhaLogin(senha),
  };
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") ?? "/home";
  const { signIn } = useAuth();
  const emailRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({ email: "", senha: "" });
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    email: false,
    senha: false,
  });
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const errors = validate(form);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched({ email: true, senha: true });

    const hasErrors = Object.values(validate(form)).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    setFormError(null);

    try {
      const { error } = await signIn(form.email.trim(), form.senha);

      if (error) {
        logger.warn('auth', 'login_failed', 'Tentativa de login inválida', { email: form.email.trim() });
        setFormError("E-mail ou senha incorretos. Verifique e tente novamente.");
        return;
      }

      logger.info('auth', 'login_success', 'Login realizado com sucesso', { email: form.email.trim() });
      router.push(redirectTarget.startsWith("/") ? redirectTarget : "/home");
      router.refresh();
    } catch (err) {
      logger.error('auth', 'login_exception', err, { email: form.email.trim() });
      setFormError("Ocorreu um erro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      as="main"
      w="full"
      maxW="26rem"
      bg="surface"
      borderWidth="1px"
      borderColor="primary.100"
      borderRadius="2xl"
      boxShadow="sm"
      p={{ base: 6, md: 8 }}
    >
      <Stack gap={6} align="center" textAlign="center" mb={6}>
        <Flex
          w="56px"
          h="56px"
          borderRadius="full"
          bg="primary.500"
          align="center"
          justify="center"
          color="white"
          boxShadow="0 4px 12px rgba(46, 125, 50, 0.3)"
        >
          <Leaf size={28} />
        </Flex>
        <Box>
          <Heading as="h1" size="lg" color="primary.700">
            Bem-vindo de volta!
          </Heading>
          <Text color="muted" fontSize="sm" mt={1}>
            Acesse sua conta para continuar seus estudos
          </Text>
        </Box>
      </Stack>

      <form onSubmit={handleSubmit} noValidate>
        <Stack gap={4}>
          {formError && (
            <Box
              role="alert"
              aria-live="assertive"
              bg="red.50"
              border="1px solid"
              borderColor="red.200"
              borderRadius="lg"
              px={4}
              py={3}
            >
              <Text color="red.700" fontSize="sm">
                {formError}
              </Text>
            </Box>
          )}

          <Field.Root invalid={touched.email && Boolean(errors.email)}>
            <Field.Label fontSize="sm" fontWeight="medium" color="fg">
              E-mail
            </Field.Label>
            <Input
              ref={emailRef}
              type="email"
              placeholder="seu@email.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              bg="bg"
              borderColor="border"
              _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
            />
            {touched.email && errors.email && (
              <Field.ErrorText fontSize="xs" color="red.500" mt={1}>
                {errors.email}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={touched.senha && Boolean(errors.senha)}>
            <Field.Label fontSize="sm" fontWeight="medium" color="fg">
              Senha
            </Field.Label>
            <InputGroup
              w="full"
              endElement={
                <IconButton
                  aria-label={showSenha ? "Ocultar senha" : "Exibir senha"}
                  variant="ghost"
                  size="xs"
                  onClick={() => setShowSenha((v) => !v)}
                  tabIndex={-1}
                  color="muted"
                  _hover={{ color: "fg" }}
                >
                  {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
                </IconButton>
              }
            >
              <Input
                type={showSenha ? "text" : "password"}
                placeholder="Sua senha"
                value={form.senha}
                onChange={(e) => handleChange("senha", e.target.value)}
                onBlur={() => handleBlur("senha")}
                autoComplete="current-password"
                bg="bg"
                borderColor="border"
                _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
              />
            </InputGroup>
            {touched.senha && errors.senha && (
              <Field.ErrorText fontSize="xs" color="red.500" mt={1}>
                {errors.senha}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Button
            type="submit"
            colorPalette="green"
            bg="primary.500"
            color="white"
            _hover={{ bg: "primary.600" }}
            loading={loading}
            loadingText="Entrando..."
            w="full"
            mt={2}
            borderRadius="lg"
            fontWeight="semibold"
          >
            Entrar
          </Button>

          <Text fontSize="sm" color="muted" textAlign="center" mt={2}>
            Não tem uma conta?{" "}
            <Link
              href={redirectTarget !== "/home" ? `/registro?redirect=${encodeURIComponent(redirectTarget)}` : "/registro"}
              style={{ color: "var(--chakra-colors-primary-600)", fontWeight: 600 }}
            >
              Cadastre-se
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
}

export default function Login() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="bg" px={4}>
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </Flex>
  );
}

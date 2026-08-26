"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Button,
  Checkbox,
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
import {
  validateRegistroForm,
  type RegistroFormState,
  type RegistroFormErrors,
} from "@/lib/validation";
import { useAuth } from "@/providers/AuthProvider";
import { logger } from "@/lib/logger";

interface FormState extends RegistroFormState {}

function RegistroForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get("redirect") ?? "/home";
  const { signUp } = useAuth();
  const nomeRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState<FormState>({
    nome: "",
    email: "",
    senha: "",
    aceiteTermos: false,
  });
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    nome: false,
    email: false,
    senha: false,
    aceiteTermos: false,
  });
  const [showSenha, setShowSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const errors: RegistroFormErrors = validateRegistroForm(form);

  useEffect(() => {
    nomeRef.current?.focus();
  }, []);

  function handleChange<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormError(null);
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched({ nome: true, email: true, senha: true, aceiteTermos: true });

    const hasErrors = Object.values(validateRegistroForm(form)).some(Boolean);
    if (hasErrors) return;

    setLoading(true);
    setFormError(null);

    try {
      const { error } = await signUp(
        form.email.trim(),
        form.senha,
        form.nome.trim(),
      );

      if (error) {
        logger.warn('auth', 'signup_failed', `Falha no cadastro: ${error.message}`, { email: form.email.trim() });
        if (error.message.toLowerCase().includes("already registered")) {
          setFormError("Este e-mail já está cadastrado. Faça login.");
        } else {
          setFormError("Não foi possível criar sua conta. Tente novamente.");
        }
        return;
      }

      logger.info('auth', 'signup_success', 'Novo usuário registrado com sucesso', { email: form.email.trim(), nome: form.nome.trim() });
      router.push(redirectTarget.startsWith("/") ? redirectTarget : "/home");
      router.refresh();
    } catch (err) {
      logger.error('auth', 'signup_exception', err, { email: form.email.trim() });
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
            Crie sua conta
          </Heading>
          <Text color="muted" fontSize="sm" mt={1}>
            Aprenda sobre sanidade vegetal e plantas medicinais
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

          <Field.Root invalid={touched.nome && Boolean(errors.nome)}>
            <Field.Label fontSize="sm" fontWeight="medium" color="fg">
              Nome completo
            </Field.Label>
            <Input
              ref={nomeRef}
              type="text"
              placeholder="Maria Silva"
              value={form.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
              onBlur={() => handleBlur("nome")}
              autoComplete="name"
              bg="bg"
              borderColor="border"
              _focus={{ borderColor: "primary.500", boxShadow: "0 0 0 1px var(--chakra-colors-primary-500)" }}
            />
            {touched.nome && errors.nome && (
              <Field.ErrorText fontSize="xs" color="red.500" mt={1}>
                {errors.nome}
              </Field.ErrorText>
            )}
          </Field.Root>

          <Field.Root invalid={touched.email && Boolean(errors.email)}>
            <Field.Label fontSize="sm" fontWeight="medium" color="fg">
              E-mail
            </Field.Label>
            <Input
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
                placeholder="Mínimo 6 caracteres"
                value={form.senha}
                onChange={(e) => handleChange("senha", e.target.value)}
                onBlur={() => handleBlur("senha")}
                autoComplete="new-password"
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

          <Field.Root invalid={touched.aceiteTermos && Boolean(errors.aceiteTermos)}>
            <Checkbox.Root
              checked={form.aceiteTermos}
              onCheckedChange={({ checked }) =>
                handleChange("aceiteTermos", checked === true)
              }
              colorPalette="green"
            >
              <Checkbox.HiddenInput onBlur={() => handleBlur("aceiteTermos")} />
              <Checkbox.Control />
              <Checkbox.Label fontSize="xs" color="muted">
                Li e aceito os{" "}
                <Link
                  href="/sobre"
                  style={{ color: "var(--chakra-colors-primary-600)", fontWeight: 600 }}
                  tabIndex={-1}
                >
                  Termos de Uso
                </Link>{" "}
                e a{" "}
                <Link
                  href="/sobre"
                  style={{ color: "var(--chakra-colors-primary-600)", fontWeight: 600 }}
                  tabIndex={-1}
                >
                  Política de Privacidade
                </Link>
              </Checkbox.Label>
            </Checkbox.Root>
            {touched.aceiteTermos && errors.aceiteTermos && (
              <Field.ErrorText fontSize="xs" color="red.500" mt={1}>
                {errors.aceiteTermos}
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
            loadingText="Criando conta..."
            w="full"
            mt={2}
            borderRadius="lg"
            fontWeight="semibold"
          >
            Cadastrar
          </Button>

          <Text fontSize="sm" color="muted" textAlign="center" mt={2}>
            Já tem uma conta?{" "}
            <Link
              href={redirectTarget !== "/home" ? `/login?redirect=${encodeURIComponent(redirectTarget)}` : "/login"}
              style={{ color: "var(--chakra-colors-primary-600)", fontWeight: 600 }}
            >
              Entrar
            </Link>
          </Text>
        </Stack>
      </form>
    </Box>
  );
}

export default function Registro() {
  return (
    <Flex minH="100vh" align="center" justify="center" bg="bg" px={4}>
      <Suspense fallback={null}>
        <RegistroForm />
      </Suspense>
    </Flex>
  );
}

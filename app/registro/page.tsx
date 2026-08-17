"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Eye, EyeOff, Leaf } from "lucide-react";
import {
  SENHA_MIN_LENGTH,
  getSenhaForcaNivel,
  validateRegistroForm,
  type RegistroFormState,
} from "@/lib/validation";

type FormState = RegistroFormState;

export default function Registro() {
  const router = useRouter();
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

  const errors = validateRegistroForm(form);
  const senhaForca = useMemo(() => getSenhaForcaNivel(form.senha), [form.senha]);

  useEffect(() => {
    nomeRef.current?.focus();
  }, []);

  function handleChange<K extends keyof FormState>(
    field: K,
    value: FormState[K],
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setTouched({ nome: true, email: true, senha: true, aceiteTermos: true });

    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    // Cadastro ainda não implementado — segue direto para o dashboard.
    router.push("/home");
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="bg" px={4} py={8}>
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
          >
            <Box as={Leaf} color="white" fontSize="24px" aria-hidden="true" />
          </Flex>
          <Stack gap={1}>
            <Heading as="h1" size="lg">
              Criar conta
            </Heading>
            <Text color="muted" fontSize="sm">
              Comece a aprender com o EducaFito
            </Text>
          </Stack>
        </Stack>

        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={4}>
            <Field.Root required invalid={touched.nome && !!errors.nome}>
              <Field.Label>Nome</Field.Label>
              <Input
                ref={nomeRef}
                autoComplete="name"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                onBlur={() => handleBlur("nome")}
                disabled={loading}
                borderColor="primary.100"
              />
              {touched.nome && errors.nome && (
                <Field.ErrorText>{errors.nome}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={touched.email && !!errors.email}>
              <Field.Label>E-mail</Field.Label>
              <Input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="voce@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                disabled={loading}
                borderColor="primary.100"
              />
              {touched.email && errors.email && (
                <Field.ErrorText>{errors.email}</Field.ErrorText>
              )}
            </Field.Root>

            <Field.Root required invalid={touched.senha && !!errors.senha}>
              <Field.Label>Senha</Field.Label>
              <InputGroup
                w="full"
                endElement={
                  <IconButton
                    aria-label={showSenha ? "Ocultar senha" : "Mostrar senha"}
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSenha((prev) => !prev)}
                    disabled={loading}
                  >
                    {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                }
              >
                <Input
                  type={showSenha ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={(e) => handleChange("senha", e.target.value)}
                  onBlur={() => handleBlur("senha")}
                  disabled={loading}
                  borderColor="primary.100"
                />
              </InputGroup>

              {touched.senha && errors.senha ? (
                <Field.ErrorText>{errors.senha}</Field.ErrorText>
              ) : (
                <Field.HelperText>
                  Mínimo de {SENHA_MIN_LENGTH} caracteres, incluindo maiúscula,
                  minúscula e número.
                </Field.HelperText>
              )}

              {senhaForca && (
                <HStack gap={2} mt={1}>
                  <Text fontSize="xs" color="muted">
                    Força da senha:
                  </Text>
                  <Text fontSize="xs" fontWeight={700} color={senhaForca.color}>
                    {senhaForca.label}
                  </Text>
                </HStack>
              )}
            </Field.Root>

            <Field.Root invalid={touched.aceiteTermos && !!errors.aceiteTermos}>
              <Checkbox.Root
                checked={form.aceiteTermos}
                onCheckedChange={(details) =>
                  handleChange("aceiteTermos", !!details.checked)
                }
                onBlur={() => handleBlur("aceiteTermos")}
                disabled={loading}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control borderColor="primary.200" />
                <Checkbox.Label fontSize="sm" color="fg">
                  Li e aceito os termos de uso e a política de privacidade.
                </Checkbox.Label>
              </Checkbox.Root>
              {touched.aceiteTermos && errors.aceiteTermos && (
                <Field.ErrorText>{errors.aceiteTermos}</Field.ErrorText>
              )}
            </Field.Root>

            <Button
              type="submit"
              bg="primary.500"
              color="white"
              _hover={{ bg: "primary.600" }}
              loading={loading}
              loadingText="Criando conta..."
              w="full"
              mt={2}
            >
              Cadastrar
            </Button>
          </Stack>
        </form>

        <Text mt={6} textAlign="center" fontSize="sm" color="muted">
          Já tem conta?{" "}
          <Link
            href="/login"
            style={{
              color: "inherit",
              fontWeight: 600,
              textDecoration: "underline",
            }}
          >
            Entrar
          </Link>
        </Text>
      </Box>
    </Flex>
  );
}
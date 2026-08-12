'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
} from '@chakra-ui/react'
import { Eye, EyeOff, Leaf } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_SENHA = 8

interface FormState {
  nome: string
  email: string
  senha: string
  aceiteTermos: boolean
}

interface FormErrors {
  nome?: string
  email?: string
  senha?: string
  aceiteTermos?: string
}

function validate({ nome, email, senha, aceiteTermos }: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!nome.trim()) {
    errors.nome = 'Informe seu nome.'
  }

  if (!email.trim()) {
    errors.email = 'Informe seu e-mail.'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (!senha) {
    errors.senha = 'Crie uma senha.'
  } else if (senha.length < MIN_SENHA) {
    errors.senha = `A senha precisa ter pelo menos ${MIN_SENHA} caracteres.`
  } else if (!/\d/.test(senha)) {
    errors.senha = 'A senha precisa ter pelo menos 1 número.'
  }

  if (!aceiteTermos) {
    errors.aceiteTermos = 'É preciso aceitar os termos para continuar.'
  }

  return errors
}

export default function Registro() {
  const router = useRouter()
  const nomeRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormState>({
    nome: '',
    email: '',
    senha: '',
    aceiteTermos: false,
  })
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    nome: false,
    email: false,
    senha: false,
    aceiteTermos: false,
  })
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)

  const errors = validate(form)

  const senhaForca = useMemo(() => {
    const { senha } = form
    if (!senha) return null
    let score = 0
    if (senha.length >= MIN_SENHA) score++
    if (/\d/.test(senha)) score++
    if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) score++
    if (/[^A-Za-z0-9]/.test(senha)) score++

    if (score <= 1) return { label: 'Fraca', color: 'red.500' }
    if (score <= 2) return { label: 'Razoável', color: 'accent.600' }
    if (score === 3) return { label: 'Boa', color: 'primary.500' }
    return { label: 'Forte', color: 'primary.700' }
  }, [form])

  useEffect(() => {
    nomeRef.current?.focus()
  }, [])

  function handleChange<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setTouched({ nome: true, email: true, senha: true, aceiteTermos: true })

    if (Object.keys(errors).length > 0) return

    setLoading(true)
    // Cadastro ainda não implementado — segue direto para o dashboard.
    router.push('/home')
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
            <Box as={Leaf} color="white" fontSize="24px" />
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
                onChange={(e) => handleChange('nome', e.target.value)}
                onBlur={() => handleBlur('nome')}
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
                onChange={(e) => handleChange('email', e.target.value)}
                onBlur={() => handleBlur('email')}
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
                    aria-label={showSenha ? 'Ocultar senha' : 'Mostrar senha'}
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSenha((prev) => !prev)}
                    tabIndex={-1}
                  >
                    {showSenha ? <EyeOff size={18} /> : <Eye size={18} />}
                  </IconButton>
                }
              >
                <Input
                  type={showSenha ? 'text' : 'password'}
                  autoComplete="new-password"
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={(e) => handleChange('senha', e.target.value)}
                  onBlur={() => handleBlur('senha')}
                  borderColor="primary.100"
                />
              </InputGroup>

              {touched.senha && errors.senha ? (
                <Field.ErrorText>{errors.senha}</Field.ErrorText>
              ) : (
                <Field.HelperText>
                  Mínimo de {MIN_SENHA} caracteres, incluindo 1 número.
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
                  handleChange('aceiteTermos', !!details.checked)
                }
                onBlur={() => handleBlur('aceiteTermos')}
              >
                <Checkbox.HiddenInput />
                <Checkbox.Control borderColor="primary.200" />
                <Checkbox.Label fontSize="sm" color="fg">
                  Li e aceito os{' '}
                  <Link href="/termos" style={{ fontWeight: 600, textDecoration: 'underline' }}>
                    termos de uso
                  </Link>{' '}
                  e a{' '}
                  <Link href="/privacidade" style={{ fontWeight: 600, textDecoration: 'underline' }}>
                    política de privacidade
                  </Link>
                  .
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
              _hover={{ bg: 'primary.600' }}
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
          Já tem conta?{' '}
          <Link href="/login" style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}>
            Entrar
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}

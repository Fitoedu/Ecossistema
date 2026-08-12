'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
} from '@chakra-ui/react'
import { Eye, EyeOff, Leaf } from 'lucide-react'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface FormState {
  email: string
  senha: string
}

interface FormErrors {
  email?: string
  senha?: string
}

function validate({ email, senha }: FormState): FormErrors {
  const errors: FormErrors = {}

  if (!email.trim()) {
    errors.email = 'Informe seu e-mail.'
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (!senha) {
    errors.senha = 'Informe sua senha.'
  }

  return errors
}

export default function Login() {
  const router = useRouter()
  const emailRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState<FormState>({ email: '', senha: '' })
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    email: false,
    senha: false,
  })
  const [showSenha, setShowSenha] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const errors = validate(form)

  useEffect(() => {
    emailRef.current?.focus()
  }, [])

  function handleChange(field: keyof FormState, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    setFormError(null)
  }

  function handleBlur(field: keyof FormState) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setTouched({ email: true, senha: true })

    if (Object.keys(errors).length > 0) return

    setLoading(true)
    setFormError(null)

    // Autenticação ainda não implementada — mensagem genérica por segurança
    // (nunca revelar se o e-mail existe ou não na base).
    router.push('/home')
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="bg" px={4}>
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
              Entrar
            </Heading>
            <Text color="muted" fontSize="sm">
              Acesse sua conta no EducaFito
            </Text>
          </Stack>
        </Stack>

        <form onSubmit={handleSubmit} noValidate>
          <Stack gap={4}>
            <Field.Root required invalid={touched.email && !!errors.email}>
              <Field.Label>E-mail</Field.Label>
              <Input
                ref={emailRef}
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
              <Flex w="full" justify="space-between" align="center">
                <Field.Label>Senha</Field.Label>
                <Link
                  href="/recuperar-senha"
                  style={{ fontSize: '13px', fontWeight: 600, color: 'inherit' }}
                >
                  Esqueci minha senha
                </Link>
              </Flex>
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
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={form.senha}
                  onChange={(e) => handleChange('senha', e.target.value)}
                  onBlur={() => handleBlur('senha')}
                  borderColor="primary.100"
                />
              </InputGroup>
              {touched.senha && errors.senha && (
                <Field.ErrorText>{errors.senha}</Field.ErrorText>
              )}
            </Field.Root>

            {formError && (
              <Text fontSize="sm" color="red.500" role="alert">
                {formError}
              </Text>
            )}

            <Button
              type="submit"
              bg="primary.500"
              color="white"
              _hover={{ bg: 'primary.600' }}
              loading={loading}
              loadingText="Entrando..."
              w="full"
              mt={2}
            >
              Entrar
            </Button>
          </Stack>
        </form>

        <Text mt={6} textAlign="center" fontSize="sm" color="muted">
          Ainda não tem conta?{' '}
          <Link href="/registro" style={{ color: 'inherit', fontWeight: 600, textDecoration: 'underline' }}>
            Cadastre-se
          </Link>
        </Text>
      </Box>
    </Flex>
  )
}

'use client'

import { useState } from 'react'
import {
  Button,
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  NativeSelect,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { UserPlus, Send, X } from 'lucide-react'

export function CollaboratorForm() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    instituicao: '',
    area: 'pesquisa',
    mensagem: '',
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Ponto de integração: Supabase / API Route
    console.log('Inscrição EducaFito enviada:', formData)

    setTimeout(() => {
      setLoading(false)
      setFormData({
        nome: '',
        email: '',
        instituicao: '',
        area: 'pesquisa',
        mensagem: '',
      })
      setOpen(false)
    }, 800)
  }

  return (
    <DialogRoot
      open={open}
      onOpenChange={(details) => setOpen(details.open)}
      placement="center"
      motionPreset="scale"
    >
      {/* Botão Gatilho que fica na página */}
      <DialogTrigger asChild>
        <Button
          bg="#2E7D32"
          color="white"
          borderRadius="xl"
          px={6}
          py={3}
          fontSize="sm"
          fontWeight={700}
          fontFamily="heading"
          display="inline-flex"
          alignItems="center"
          gap={2}
          _hover={{ bg: '#236327', transform: 'translateY(-2px)' }}
          transition="all 0.2s ease"
          boxShadow="0 4px 14px rgba(46, 125, 50, 0.25)"
        >
          <UserPlus size={18} aria-hidden />
          Quero ser colaborador
        </Button>
      </DialogTrigger>

      {/* Backdrop (Fundo escurecido) e Positioner (Centralizador de tela) */}
      <DialogBackdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <DialogPositioner>
        <DialogContent
          bg="surface"
          borderColor="border"
          borderWidth="1px"
          borderRadius="2xl"
          maxW={{ base: '92vw', md: '540px' }}
          boxShadow="0 20px 40px rgba(0,0,0,0.18)"
          p={{ base: 4, md: 6 }}
        >
          <form onSubmit={handleSubmit}>
            <DialogHeader p={0} mb={4}>
              <DialogTitle
                fontSize="xl"
                fontWeight={800}
                color="#2E7D32"
                fontFamily="heading"
              >
                Junte-se à Equipe EducaFito
              </DialogTitle>
              <Text fontSize="xs" color="muted" mt={1} lineHeight={1.6}>
                Contribua com a educação fitossanitária, diagnósticos de pragas agrícolas e extensão rural no ecossistema amazônico.
              </Text>
            </DialogHeader>

            <DialogBody p={0}>
              <Stack gap={3.5}>
                {/* Nome Completo */}
                <Field.Root required>
                  <Field.Label fontSize="xs" fontWeight={600} color="#263238">
                    Nome Completo
                  </Field.Label>
                  <Input
                    name="nome"
                    placeholder="Ex: Dra. Maria Santos"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    borderRadius="lg"
                    fontSize="sm"
                    borderColor="border"
                    _focus={{ borderColor: '#2E7D32' }}
                  />
                </Field.Root>

                {/* E-mail */}
                <Field.Root required>
                  <Field.Label fontSize="xs" fontWeight={600} color="#263238">
                    E-mail Institucional ou Pessoal
                  </Field.Label>
                  <Input
                    type="email"
                    name="email"
                    placeholder="exemplo@unifap.br"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    borderRadius="lg"
                    fontSize="sm"
                    borderColor="border"
                    _focus={{ borderColor: '#2E7D32' }}
                  />
                </Field.Root>

                {/* Instituição / Laboratório */}
                <Field.Root>
                  <Field.Label fontSize="xs" fontWeight={600} color="#263238">
                    Instituição / Escola / Laboratório
                  </Field.Label>
                  <Input
                    name="instituicao"
                    placeholder="Ex: UNIFAP Mazagão, IFS, Escola Família..."
                    value={formData.instituicao}
                    onChange={handleChange}
                    borderRadius="lg"
                    fontSize="sm"
                    borderColor="border"
                    _focus={{ borderColor: '#2E7D32' }}
                  />
                </Field.Root>

                {/* Área de Atuação Fitossanitária */}
                <Field.Root required>
                  <Field.Label fontSize="xs" fontWeight={600} color="#263238">
                    Área Principal de Colaboração
                  </Field.Label>
                  <NativeSelect.Root>
                    <NativeSelect.Field
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      borderRadius="lg"
                      fontSize="sm"
                      borderColor="border"
                      _focus={{ borderColor: '#2E7D32' }}
                    >
                      <option value="pesquisa">Pesquisa Científica (Fitopatologia / Entomologia)</option>
                      <option value="educacao">Educação do Campo e Extensão Rural</option>
                      <option value="gamificacao">Gamificação e Conteúdo Didático</option>
                      <option value="desenvolvimento">Desenvolvimento de Software (PWA)</option>
                      <option value="outro">Outra Área</option>
                    </NativeSelect.Field>
                  </NativeSelect.Root>
                </Field.Root>

                {/* Proposta / Mensagem */}
                <Field.Root required>
                  <Field.Label fontSize="xs" fontWeight={600} color="#263238">
                    Como gostaria de colaborar?
                  </Field.Label>
                  <Textarea
                    name="mensagem"
                    placeholder="Conte sobre sua experiência, projetos ou ideias para o EducaFito..."
                    rows={3}
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                    borderRadius="lg"
                    fontSize="sm"
                    borderColor="border"
                    _focus={{ borderColor: '#2E7D32' }}
                  />
                </Field.Root>
              </Stack>
            </DialogBody>

            <DialogFooter p={0} mt={6} gap={3}>
              <DialogActionTrigger asChild>
                <Button variant="outline" size="sm" borderRadius="lg">
                  Cancelar
                </Button>
              </DialogActionTrigger>

              <Button
                type="submit"
                loading={loading}
                bg="#2E7D32"
                color="white"
                size="sm"
                borderRadius="lg"
                fontWeight={700}
                display="inline-flex"
                alignItems="center"
                gap={1.5}
                _hover={{ bg: '#236327' }}
              >
                <Send size={14} aria-hidden />
                Enviar Inscrição
              </Button>
            </DialogFooter>

            <DialogCloseTrigger top={4} right={4} />
          </form>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  )
}
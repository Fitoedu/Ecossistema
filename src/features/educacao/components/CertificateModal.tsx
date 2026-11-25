'use client'

import { useRef } from 'react'
import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Portal,
  Separator,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  Award,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  TreeDeciduous,
} from 'lucide-react'
import type { TopicWithLock } from '../data/educacao'

interface CertificateModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topic: TopicWithLock
  studentName?: string
  score?: number
}

export function CertificateModal({
  open,
  onOpenChange,
  topic,
  studentName = 'Estudante / Produtor(a) Rural',
  score = 100,
}: CertificateModalProps) {
  const certRef = useRef<HTMLDivElement>(null)

  const currentDate = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  // Código de autenticação estável
  const authCode = `EF-${topic.slug.slice(0, 6).toUpperCase()}-${Math.abs(
    topic.slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 1234),
  )}`

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} size="xl">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" maxW="880px" overflow="hidden" boxShadow="0 24px 60px rgba(15,42,26,0.3)">
            {/* ── Dialog Header ───────────────────────────── */}
            <Dialog.Header bg="primary.700" color="white" py={3} px={6}>
              <Flex justify="space-between" align="center" w="100%">
                <Flex align="center" gap={2}>
                  <Sparkles size={18} />
                  <Dialog.Title fontSize="sm" fontWeight={700} color="white">
                    Certificado Digital de Conclusão
                  </Dialog.Title>
                </Flex>
              </Flex>
            </Dialog.Header>

            {/* ── Certificado ──────────────────────────────── */}
            <Dialog.Body p={{ base: 4, md: 8 }} bg="neutral.50">
              <Box
                ref={certRef}
                bg="white"
                borderRadius="xl"
                p={{ base: 6, md: 10 }}
                position="relative"
                border="8px double"
                borderColor="primary.500"
                boxShadow="0 8px 32px rgba(15,42,26,0.08)"
              >
                {/* Detalhes nos cantos */}
                <Box
                  position="absolute"
                  top={2}
                  left={2}
                  w={4}
                  h={4}
                  borderTop="2px solid"
                  borderLeft="2px solid"
                  borderColor="accent.500"
                />
                <Box
                  position="absolute"
                  top={2}
                  right={2}
                  w={4}
                  h={4}
                  borderTop="2px solid"
                  borderRight="2px solid"
                  borderColor="accent.500"
                />
                <Box
                  position="absolute"
                  bottom={2}
                  left={2}
                  w={4}
                  h={4}
                  borderBottom="2px solid"
                  borderLeft="2px solid"
                  borderColor="accent.500"
                />
                <Box
                  position="absolute"
                  bottom={2}
                  right={2}
                  w={4}
                  h={4}
                  borderBottom="2px solid"
                  borderRight="2px solid"
                  borderColor="accent.500"
                />

                <Stack gap={6} align="center" textAlign="center">
                  {/* Topo: Logo / Selo */}
                  <Flex align="center" gap={2}>
                    <Flex
                      w={12}
                      h={12}
                      borderRadius="full"
                      bg="primary.50"
                      color="primary.600"
                      align="center"
                      justify="center"
                    >
                      <TreeDeciduous size={28} strokeWidth={2.5} />
                    </Flex>
                    <Stack gap={0} textAlign="left">
                      <Heading as="h2" fontSize="lg" fontWeight={900} color="primary.800" letterSpacing="wide">
                        🌿 EducaFito
                      </Heading>
                      <Text fontSize="2xs" color="muted" textTransform="uppercase" letterSpacing="widest">
                        Educação Fitossanitária Regional
                      </Text>
                    </Stack>
                  </Flex>

                  {/* Título Principal do Certificado */}
                  <Stack gap={1}>
                    <Text
                      fontSize="xs"
                      fontWeight={700}
                      textTransform="uppercase"
                      letterSpacing="0.2em"
                      color="accent.700"
                    >
                      Certificado de Conclusão e Aproveitamento
                    </Text>
                    <Heading
                      as="h1"
                      fontSize={{ base: 'xl', md: '2xl' }}
                      fontWeight={800}
                      color="primary.900"
                    >
                      Capacitação Técnica em Sanidade Vegetal
                    </Heading>
                  </Stack>

                  {/* Texto do Certificado */}
                  <Box maxW="600px">
                    <Text fontSize={{ base: 'sm', md: 'md' }} color="fg" lineHeight={1.8}>
                      Certificamos para os devidos fins que{' '}
                      <Text as="span" fontWeight={800} color="primary.700" borderBottom="1.5px solid" borderColor="primary.300" px={2}>
                        {studentName || 'Participante do EducaFito'}
                      </Text>{' '}
                      concluiu com êxito e excelente aproveitamento pedagógico ({score}% de acertos) o módulo didático{' '}
                      <strong>{topic.title}</strong>, integrante da trilha de <strong>{topic.category}</strong>,
                      com carga horária estimada de <strong>{topic.duration}</strong>.
                    </Text>
                  </Box>

                  {/* Linha divisória com selo */}
                  <Flex align="center" justify="center" w="100%" gap={4} py={2}>
                    <Separator flex={1} borderColor="primary.200" />
                    <Flex
                      align="center"
                      gap={1.5}
                      bg="primary.50"
                      px={3}
                      py={1}
                      borderRadius="full"
                      border="1px solid"
                      borderColor="primary.200"
                    >
                      <ShieldCheck size={14} color="var(--chakra-colors-primary-600)" />
                      <Text fontSize="2xs" fontWeight={700} color="primary.700">
                        VALIDAÇÃO OFICIAL EDUCAFITO
                      </Text>
                    </Flex>
                    <Separator flex={1} borderColor="primary.200" />
                  </Flex>

                  {/* Rodapé: Data e Assinaturas */}
                  <Flex
                    justify="space-between"
                    align="flex-end"
                    w="100%"
                    direction={{ base: 'column', sm: 'row' }}
                    gap={4}
                    pt={2}
                  >
                    <Stack gap={0} textAlign={{ base: 'center', sm: 'left' }}>
                      <Text fontSize="2xs" color="muted">
                        Emitido em: <strong>{currentDate}</strong>
                      </Text>
                      <Text fontSize="2xs" color="muted">
                        Código de Autenticidade:{' '}
                        <Text as="span" fontFamily="monospace" fontWeight={700}>
                          {authCode}
                        </Text>
                      </Text>
                    </Stack>

                    <Stack gap={1} align="center">
                      <Box w="160px" borderBottom="1px solid" borderColor="fg" />
                      <Text fontSize="2xs" fontWeight={700} color="fg">
                        Coordenação Pedagógica
                      </Text>
                      <Text fontSize="3xs" color="muted">
                        Projeto EducaFito
                      </Text>
                    </Stack>
                  </Flex>
                </Stack>
              </Box>
            </Dialog.Body>

            {/* ── Dialog Footer ───────────────────────────── */}
            <Dialog.Footer bg="surface" borderTop="1px solid" borderColor="primary.100" p={4}>
              <Flex justify="flex-end" w="100%">
                <Button colorPalette="green" onClick={() => onOpenChange(false)}>
                  Fechar
                </Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

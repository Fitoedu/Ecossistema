'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  Award,
  BookOpen,
  Bug,
  CheckCircle2,
  FileCheck,
  GraduationCap,
  Leaf,
  Lock,
  Microscope,
  PlayCircle,
  Sparkles,
  Sprout,
  TreeDeciduous,
  Trophy,
} from 'lucide-react'
import { CertificateModal } from '@/features/educacao/components/CertificateModal'
import { useGamification, CertifiedTopicItem } from '@/features/educacao/hooks/useGamification'
import { useAuth } from '@/providers/AuthProvider'
import type { TopicWithLock } from '@/features/educacao/data/educacao'

const badgeIconMap: Record<string, typeof Trophy> = {
  Sprout,
  Microscope,
  Bug,
  Leaf,
  Trophy,
  TreeDeciduous,
}

export function CertificadosSection() {
  const { user } = useAuth()
  const {
    xp,
    levelInfo,
    badges,
    certifiedTopics,
    inProgressTopics,
    totalCompletedLessons,
  } = useGamification(user?.id ?? null)

  const [selectedTopicForCert, setSelectedTopicForCert] = useState<CertifiedTopicItem | null>(null)

  const studentName =
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'Estudante / Produtor(a)'

  return (
    <Stack gap={6}>
      {/* ── Banner de Nível & Gamificação ─────────────── */}
      <Box
        position="relative"
        overflow="hidden"
        borderRadius="2xl"
        bg="linear-gradient(135deg, var(--chakra-colors-primary-800) 0%, var(--chakra-colors-primary-600) 60%, var(--chakra-colors-primary-400) 100%)"
        p={{ base: 5, md: 6 }}
        boxShadow="0 8px 32px rgba(15,42,26,0.18)"
      >
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap={4}
          position="relative"
          zIndex={1}
        >
          <Flex align="center" gap={3.5}>
            <Flex
              w={14}
              h={14}
              borderRadius="2xl"
              bg="rgba(255,255,255,0.15)"
              color="accent.300"
              align="center"
              justify="center"
              flexShrink={0}
              border="2px solid rgba(255,255,255,0.2)"
            >
              <Trophy size={28} strokeWidth={2.5} />
            </Flex>
            <Stack gap={0.5}>
              <Flex align="center" gap={2}>
                <Heading as="h2" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={800} color="white">
                  {levelInfo.levelName}
                </Heading>
                <Badge colorPalette="yellow" variant="solid" borderRadius="full" px={2.5} fontSize="2xs">
                  {xp} XP
                </Badge>
              </Flex>
              <Text fontSize="xs" color="rgba(255,255,255,0.85)">
                {totalCompletedLessons} aulas concluídas • {certifiedTopics.length} certificações emitidas
              </Text>
            </Stack>
          </Flex>

          <Box minW={{ base: '100%', md: '240px' }}>
            <Flex justify="space-between" mb={1.5} fontSize="2xs" color="rgba(255,255,255,0.85)" fontWeight={600}>
              <Text>Progresso do Nível</Text>
              <Text>{levelInfo.nextLevelXp - xp > 0 ? `Faltam ${levelInfo.nextLevelXp - xp} XP` : 'Nível Máximo'}</Text>
            </Flex>
            <Progress.Root value={levelInfo.progressPct} size="sm" borderRadius="full">
              <Progress.Track bg="rgba(255,255,255,0.2)" borderRadius="full">
                <Progress.Range bg="accent.400" borderRadius="full" />
              </Progress.Track>
            </Progress.Root>
          </Box>
        </Flex>
      </Box>

      {/* ── Galeria de Insígnias (Badges) ─────────────── */}
      <Box
        bg="surface"
        borderRadius="2xl"
        border="1.5px solid"
        borderColor="primary.100"
        p={{ base: 5, md: 6 }}
        boxShadow="0 4px 20px rgba(15,42,26,0.06)"
      >
        <Flex align="center" gap={2} mb={4}>
          <Sparkles size={18} color="var(--chakra-colors-accent-600)" strokeWidth={2.5} />
          <Heading as="h3" fontSize="md" fontWeight={700} color="fg">
            Galeria de Conquistas & Insígnias
          </Heading>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} gap={3}>
          {badges.map((badge) => {
            const IconComp = badgeIconMap[badge.icon] ?? Trophy
            return (
              <Flex
                key={badge.id}
                direction="column"
                align="center"
                textAlign="center"
                p={4}
                borderRadius="xl"
                border="1.5px solid"
                borderColor={badge.unlocked ? 'accent.300' : 'gray.200'}
                bg={badge.unlocked ? 'accent.50' : 'gray.50'}
                opacity={badge.unlocked ? 1 : 0.6}
                transition="all 0.2s ease"
              >
                <Flex
                  w={12}
                  h={12}
                  borderRadius="xl"
                  bg={badge.unlocked ? 'accent.500' : 'gray.200'}
                  color={badge.unlocked ? 'white' : 'gray.400'}
                  align="center"
                  justify="center"
                  mb={2.5}
                >
                  {badge.unlocked ? (
                    <IconComp size={22} strokeWidth={2.5} />
                  ) : (
                    <Lock size={18} strokeWidth={2} />
                  )}
                </Flex>

                <Text fontSize="xs" fontWeight={700} color={badge.unlocked ? 'accent.900' : 'gray.600'} mb={1}>
                  {badge.title}
                </Text>
                <Text fontSize="3xs" color="muted" lineHeight={1.4}>
                  {badge.description}
                </Text>

                <Badge
                  colorPalette={badge.unlocked ? 'green' : 'gray'}
                  variant="subtle"
                  size="xs"
                  borderRadius="full"
                  mt={2}
                >
                  {badge.unlocked ? '✓ Desbloqueada' : 'Bloqueada'}
                </Badge>
              </Flex>
            )
          })}
        </SimpleGrid>
      </Box>

      {/* ── Certificados Oficiais Conquistados ────────── */}
      <Box
        bg="surface"
        borderRadius="2xl"
        border="1.5px solid"
        borderColor="primary.100"
        p={{ base: 5, md: 6 }}
        boxShadow="0 4px 20px rgba(15,42,26,0.06)"
      >
        <Flex align="center" justify="space-between" mb={4} wrap="wrap" gap={2}>
          <Flex align="center" gap={2}>
            <GraduationCap size={20} color="var(--chakra-colors-primary-600)" strokeWidth={2.5} />
            <Heading as="h3" fontSize="md" fontWeight={700} color="fg">
              Meus Certificados Oficiais
            </Heading>
          </Flex>
          <Badge colorPalette="green" variant="subtle" borderRadius="full" px={2.5}>
            {certifiedTopics.length} certificados
          </Badge>
        </Flex>

        {certifiedTopics.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {certifiedTopics.map((item) => (
              <Box
                key={item.topic.slug}
                borderRadius="xl"
                border="1.5px solid"
                borderColor="primary.200"
                bg="linear-gradient(135deg, var(--chakra-colors-primary-50) 0%, var(--chakra-colors-surface) 100%)"
                p={5}
                boxShadow="0 2px 12px rgba(15,42,26,0.05)"
              >
                <Flex justify="space-between" align="flex-start" mb={2}>
                  <Badge colorPalette="green" variant="solid" size="sm" borderRadius="full">
                    Aprovado ({item.score}%)
                  </Badge>
                  <Text fontSize="3xs" color="muted" fontFamily="monospace">
                    {item.authCode}
                  </Text>
                </Flex>

                <Heading as="h4" fontSize="sm" fontWeight={800} color="primary.900" mb={1}>
                  {item.topic.title}
                </Heading>
                <Text fontSize="xs" color="muted" mb={4}>
                  {item.topic.category} • Emitido em {item.date}
                </Text>

                <Button
                  colorPalette="green"
                  size="sm"
                  borderRadius="lg"
                  w="100%"
                  onClick={() => setSelectedTopicForCert(item)}
                  gap={1.5}
                >
                  <FileCheck size={15} />
                  Visualizar Certificado
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            textAlign="center"
            py={8}
            px={4}
            bg="gray.50"
            borderRadius="xl"
            border="1px dashed"
            borderColor="border"
          >
            <GraduationCap size={32} color="var(--chakra-colors-neutral-400)" strokeWidth={1.5} />
            <Heading as="h4" fontSize="sm" fontWeight={700} color="fg" mt={2} mb={1}>
              Nenhum certificado emitido ainda
            </Heading>
            <Text fontSize="xs" color="muted" maxW="360px" mb={4}>
              Conclua as lições de um módulo e obtenha nota 70% ou superior no teste de avaliação final para emitir seu primeiro certificado oficial.
            </Text>
            <Button asChild colorPalette="green" size="sm" borderRadius="lg">
              <Link href="/educacao">Explorar Módulos Educativos</Link>
            </Button>
          </Flex>
        )}
      </Box>

      {/* ── Módulos em Andamento ──────────────────────── */}
      {inProgressTopics.length > 0 && (
        <Box
          bg="surface"
          borderRadius="2xl"
          border="1.5px solid"
          borderColor="primary.100"
          p={{ base: 5, md: 6 }}
          boxShadow="0 4px 20px rgba(15,42,26,0.06)"
        >
          <Flex align="center" gap={2} mb={4}>
            <BookOpen size={18} color="var(--chakra-colors-primary-600)" strokeWidth={2.5} />
            <Heading as="h3" fontSize="md" fontWeight={700} color="fg">
              Módulos em Andamento
            </Heading>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
            {inProgressTopics.map((item) => (
              <Box
                key={item.topic.slug}
                borderRadius="xl"
                border="1px solid"
                borderColor="primary.100"
                p={4}
                bg="surface"
              >
                <Flex justify="space-between" align="center" mb={2}>
                  <Badge colorPalette="gray" variant="subtle" size="xs">
                    {item.topic.category}
                  </Badge>
                  <Text fontSize="xs" fontWeight={700} color="primary.700">
                    {item.progressPct}%
                  </Text>
                </Flex>

                <Heading as="h4" fontSize="sm" fontWeight={700} color="fg" mb={2}>
                  {item.topic.title}
                </Heading>

                <Progress.Root value={item.progressPct} size="xs" borderRadius="full" mb={3}>
                  <Progress.Track bg="gray.100" borderRadius="full">
                    <Progress.Range bg="primary.500" borderRadius="full" />
                  </Progress.Track>
                </Progress.Root>

                <Button asChild colorPalette="green" variant="subtle" size="xs" borderRadius="md" w="100%">
                  <Link href={`/educacao/${item.topic.slug}`}>
                    <PlayCircle size={13} style={{ marginRight: 4 }} />
                    Continuar Estudos
                  </Link>
                </Button>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      )}

      {/* ── Modal de Certificado ───────────────────────── */}
      {selectedTopicForCert && (
        <CertificateModal
          open={!!selectedTopicForCert}
          onOpenChange={(open) => {
            if (!open) setSelectedTopicForCert(null)
          }}
          topic={selectedTopicForCert.topic}
          studentName={studentName}
          score={selectedTopicForCert.score}
        />
      )}
    </Stack>
  )
}


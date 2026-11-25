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
  ArrowLeft,
  Award,
  BookMarked,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  HardDriveDownload,
  Lock,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { TopicCard } from '@/features/educacao/components/TopicCard'
import { ModuleQuizModal } from '@/features/educacao/components/ModuleQuizModal'
import { CertificateModal } from '@/features/educacao/components/CertificateModal'
import { GlossarioDrawer } from '@/features/educacao/components/GlossarioDrawer'
import { RelatedMaterials } from '@/features/educacao/components/RelatedMaterials'
import { useAuth } from '@/providers/AuthProvider'
import { useLessons } from '@/features/educacao/hooks/useLessons'
import { useModuleQuiz } from '@/features/educacao/hooks/useModuleQuiz'
import { useOfflineModules } from '@/features/educacao/hooks/useOfflineModules'
import { iconMap } from '@/features/educacao/data/educacao'
import type { TopicWithLock, Topic } from '@/features/educacao/data/educacao'

interface TopicDetailClientProps {
  topic: TopicWithLock
  related: TopicWithLock[]
}

const levelColorPalette: Record<string, string> = {
  Básico: 'green',
  Intermediário: 'orange',
  Avançado: 'red',
}

export function TopicDetailClient({ topic, related }: TopicDetailClientProps) {
  const { user } = useAuth()
  const { lessons, loading: lessonsLoading } = useLessons(topic.slug, null, user?.id ?? null)
  const {
    questions,
    isPassed,
    bestScore,
    recordAttempt,
  } = useModuleQuiz(topic.slug, topic.category, user?.id ?? null)

  const { isModuleSaved, saveModuleOffline, removeModuleOffline } = useOfflineModules()
  const isSavedOffline = isModuleSaved(topic.slug)

  const [quizOpen, setQuizOpen] = useState(false)
  const [certOpen, setCertOpen] = useState(false)
  const [glossarioOpen, setGlossarioOpen] = useState(false)

  const IconComp = iconMap[topic.icon] ?? BookOpen
  const palette = levelColorPalette[topic.level] ?? 'gray'

  const completedLessons = lessons.filter((l) => l.completed).length
  const totalLessons = lessons.length || topic.lessons
  const progressPct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  const allLessonsCompleted = progressPct === 100

  const firstPending = lessons.find((l) => !l.completed) ?? lessons[0]
  const targetUrl = firstPending
    ? `/educacao/${topic.slug}/${firstPending.id}`
    : `/educacao/${topic.slug}/${lessons[0]?.id ?? ''}`

  const handleToggleOffline = () => {
    if (isSavedOffline) {
      removeModuleOffline(topic.slug)
    } else {
      saveModuleOffline(topic.slug, topic, lessons)
    }
  }

  return (
    <AppShell>
      <Stack gap={6}>
        {/* ── Breadcrumb & Top Actions ──────────────────────── */}
        <Flex
          align="center"
          justify="space-between"
          wrap="wrap"
          gap={3}
        >
          <Link href="/educacao">
            <Flex
              align="center"
              gap={1.5}
              color="muted"
              fontSize="sm"
              fontWeight={600}
              w="fit-content"
              _hover={{ color: 'primary.600' }}
              transition="color 0.15s ease"
            >
              <ArrowLeft size={14} strokeWidth={2.5} aria-hidden />
              Voltar para Conteúdo Educacional
            </Flex>
          </Link>

          <Flex align="center" gap={2}>
            <Button
              size="xs"
              variant="outline"
              colorPalette="green"
              borderRadius="md"
              onClick={() => setGlossarioOpen(true)}
              gap={1.5}
            >
              <BookMarked size={13} />
              Glossário Fitossanitário
            </Button>

            <Badge colorPalette="green" variant="subtle" borderRadius="full" px={2.5}>
              {topic.category}
            </Badge>
            <Badge colorPalette="gray" variant="subtle" borderRadius="full" px={2.5}>
              {topic.level}
            </Badge>
          </Flex>
        </Flex>

        {/* ── Acesso bloqueado ─────────────────────────────── */}
        {topic.locked ? (
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            gap={3}
            bg="surface"
            borderRadius="2xl"
            border="2px solid"
            borderColor="border"
            px={6}
            py={12}
          >
            <Flex
              w={14}
              h={14}
              borderRadius="full"
              bg="gray.100"
              align="center"
              justify="center"
              color="gray.400"
            >
              <Lock size={28} strokeWidth={2} aria-hidden />
            </Flex>
            <Heading as="h1" fontSize="lg" fontWeight={800} color="fg">
              Módulo bloqueado
            </Heading>
            <Text fontSize="sm" color="muted" maxW="420px" lineHeight={1.65}>
              Conclua os módulos de nível anterior da categoria{' '}
              <strong>{topic.category}</strong> para desbloquear{' '}
              <strong>{topic.title}</strong>.
            </Text>
            <Button asChild colorPalette="green" borderRadius="lg" mt={2}>
              <Link href="/educacao">Ver todos os módulos</Link>
            </Button>
          </Flex>
        ) : (
          <>
            {/* ── Header do tópico ─────────────────────────── */}
            <Box
              position="relative"
              overflow="hidden"
              borderRadius="2xl"
              bg="surface"
              border="1.5px solid"
              borderColor="primary.100"
              px={{ base: 5, md: 8 }}
              py={{ base: 6, md: 8 }}
              boxShadow="0 4px 24px rgba(15,42,26,0.08)"
            >
              <Flex
                align="flex-start"
                justify="space-between"
                gap={4}
                mb={4}
                wrap="wrap"
              >
                <Flex align="center" gap={3}>
                  <Flex
                    w={12}
                    h={12}
                    borderRadius="xl"
                    bg={`${topic.color}18`}
                    align="center"
                    justify="center"
                    color={topic.color}
                    flexShrink={0}
                  >
                    <IconComp size={24} strokeWidth={2} aria-hidden />
                  </Flex>
                  <Stack gap={1}>
                    <Flex gap={2} wrap="wrap">
                      <Badge colorPalette={palette} size="sm" borderRadius="full" px={2}>
                        {topic.level}
                      </Badge>
                      <Badge colorPalette="gray" variant="subtle" size="sm" borderRadius="full" px={2}>
                        {topic.category}
                      </Badge>
                    </Flex>
                  </Stack>
                </Flex>

                {/* Botão Modo Campo / Salvar Offline */}
                <Button
                  size="xs"
                  variant={isSavedOffline ? 'subtle' : 'outline'}
                  colorPalette={isSavedOffline ? 'green' : 'gray'}
                  borderRadius="full"
                  onClick={handleToggleOffline}
                  gap={1.5}
                >
                  {isSavedOffline ? (
                    <>
                      <CheckCircle2 size={13} />
                      Salvo para o Campo ✓
                    </>
                  ) : (
                    <>
                      <HardDriveDownload size={13} />
                      Salvar p/ o Campo (Offline)
                    </>
                  )}
                </Button>
              </Flex>

              <Heading
                as="h1"
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight={800}
                color="fg"
                lineHeight={1.2}
                mb={2}
              >
                {topic.title}
              </Heading>
              <Text fontSize="sm" color="muted" maxW="640px" lineHeight={1.7} mb={5}>
                {topic.description}
              </Text>

              <Flex align="center" gap={5} mb={6} wrap="wrap">
                <Flex align="center" gap={1.5} color="muted">
                  <Clock size={14} strokeWidth={2} aria-hidden />
                  <Text fontSize="sm" fontWeight={500}>
                    {topic.duration}
                  </Text>
                </Flex>
                <Flex align="center" gap={1.5} color="muted">
                  <BookOpen size={14} strokeWidth={2} aria-hidden />
                  <Text fontSize="sm" fontWeight={500}>
                    {totalLessons} lições
                  </Text>
                </Flex>
              </Flex>

              {/* Barra de Progresso */}
              <Box mb={6}>
                <Flex justify="space-between" mb={1.5}>
                  <Text fontSize="xs" color="muted" fontWeight={500}>
                    {completedLessons} de {totalLessons} lições concluídas
                  </Text>
                  <Text fontSize="xs" color="primary.600" fontWeight={700}>
                    {progressPct}%
                  </Text>
                </Flex>
                <Progress.Root value={progressPct} size="sm" borderRadius="full">
                  <Progress.Track borderRadius="full" bg={`${topic.color}18`}>
                    <Progress.Range borderRadius="full" bg={topic.color} />
                  </Progress.Track>
                </Progress.Root>
              </Box>

              {/* Botões de Ação */}
              <Flex gap={3} wrap="wrap">
                <Button
                  asChild
                  colorPalette="green"
                  variant={progressPct === 100 ? 'outline' : 'solid'}
                  borderRadius="lg"
                  fontWeight={600}
                  w={{ base: '100%', sm: 'auto' }}
                >
                  <Link href={targetUrl}>
                    <PlayCircle size={16} strokeWidth={2} style={{ marginRight: 6 }} />
                    {progressPct === 100
                      ? 'Revisar aulas'
                      : progressPct > 0
                        ? 'Continuar de onde parou'
                        : 'Iniciar módulo'}
                  </Link>
                </Button>

                {allLessonsCompleted && (
                  <Button
                    colorPalette="yellow"
                    variant={isPassed ? 'outline' : 'solid'}
                    borderRadius="lg"
                    fontWeight={700}
                    onClick={() => setQuizOpen(true)}
                    w={{ base: '100%', sm: 'auto' }}
                  >
                    <Award size={16} strokeWidth={2.5} style={{ marginRight: 6 }} />
                    {isPassed ? 'Refazer Avaliação' : 'Fazer Avaliação Final'}
                  </Button>
                )}

                {isPassed && (
                  <Button
                    colorPalette="green"
                    borderRadius="lg"
                    fontWeight={700}
                    onClick={() => setCertOpen(true)}
                    w={{ base: '100%', sm: 'auto' }}
                  >
                    <Sparkles size={16} strokeWidth={2} style={{ marginRight: 6 }} />
                    Emitir Certificado Digital
                  </Button>
                )}
              </Flex>
            </Box>

            {/* ── Card de Avaliação & Certificação ─────────── */}
            <Box
              borderRadius="2xl"
              border="2px solid"
              borderColor={
                isPassed ? 'primary.300' : allLessonsCompleted ? 'accent.300' : 'border'
              }
              bg={
                isPassed
                  ? 'linear-gradient(135deg, var(--chakra-colors-primary-50) 0%, var(--chakra-colors-surface) 100%)'
                  : allLessonsCompleted
                    ? 'linear-gradient(135deg, var(--chakra-colors-accent-50) 0%, var(--chakra-colors-surface) 100%)'
                    : 'surface'
              }
              p={{ base: 5, md: 6 }}
              boxShadow="0 4px 20px rgba(15,42,26,0.06)"
            >
              <Flex
                direction={{ base: 'column', md: 'row' }}
                justify="space-between"
                align={{ base: 'flex-start', md: 'center' }}
                gap={4}
              >
                <Flex align="center" gap={3}>
                  <Flex
                    w={12}
                    h={12}
                    borderRadius="xl"
                    bg={
                      isPassed
                        ? 'primary.500'
                        : allLessonsCompleted
                          ? 'accent.500'
                          : 'gray.200'
                    }
                    color={isPassed || allLessonsCompleted ? 'white' : 'gray.500'}
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    {isPassed ? (
                      <Trophy size={24} strokeWidth={2.5} />
                    ) : (
                      <Award size={24} strokeWidth={2.5} />
                    )}
                  </Flex>

                  <Stack gap={0.5}>
                    <Heading as="h3" fontSize="md" fontWeight={700} color="fg">
                      {isPassed
                        ? 'Certificado Digital Conquistado! 🎓'
                        : allLessonsCompleted
                          ? 'Avaliação de Conclusão Liberada! 📝'
                          : 'Avaliação Final do Módulo (Bloqueada)'}
                    </Heading>
                    <Text fontSize="xs" color="muted" maxW="480px">
                      {isPassed
                        ? `Parabéns! Você alcançou ${bestScore}% na avaliação. Seu certificado oficial com carga horária de ${topic.duration} está disponível para download e impressão.`
                        : allLessonsCompleted
                          ? 'Você finalizou todas as lições! Realize a avaliação de 5 perguntas para testar seus conhecimentos e emitir seu certificado (aprovação com 70%).'
                          : `Complete todas as ${totalLessons} lições deste módulo para liberar o teste de avaliação e a emissão do seu certificado.`}
                    </Text>
                  </Stack>
                </Flex>

                <Flex gap={2} w={{ base: '100%', md: 'auto' }}>
                  {isPassed ? (
                    <Button
                      colorPalette="green"
                      borderRadius="xl"
                      fontWeight={700}
                      w={{ base: '100%', md: 'auto' }}
                      onClick={() => setCertOpen(true)}
                    >
                      <Sparkles size={16} />
                      Ver Certificado
                    </Button>
                  ) : allLessonsCompleted ? (
                    <Button
                      colorPalette="yellow"
                      borderRadius="xl"
                      fontWeight={700}
                      w={{ base: '100%', md: 'auto' }}
                      onClick={() => setQuizOpen(true)}
                    >
                      <Award size={16} />
                      Iniciar Avaliação
                    </Button>
                  ) : (
                    <Badge colorPalette="gray" variant="subtle" size="sm" px={3} py={1} borderRadius="full">
                      Pendente ({completedLessons}/{totalLessons} aulas)
                    </Badge>
                  )}
                </Flex>
              </Flex>
            </Box>

            {/* ── Lista de lições ──────────────────────────── */}
            <Box>
              <Heading as="h2" fontSize="lg" fontWeight={700} color="fg" mb={4}>
                Conteúdo do módulo
              </Heading>
              <Stack
                gap={0}
                bg="surface"
                borderRadius="2xl"
                border="1.5px solid"
                borderColor="primary.100"
                overflow="hidden"
              >
                {lessons.map((lesson, i) => (
                  <Link
                    key={lesson.id}
                    href={`/educacao/${topic.slug}/${lesson.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Flex
                      align="center"
                      justify="space-between"
                      gap={3}
                      px={5}
                      py={4}
                      borderBottom={i < lessons.length - 1 ? '1px solid' : undefined}
                      borderColor="border"
                      _hover={{ bg: 'primary.50' }}
                      transition="background 0.15s ease"
                    >
                      <Flex align="center" gap={3}>
                        {lesson.completed ? (
                          <CheckCircle2
                            size={18}
                            color={topic.color}
                            strokeWidth={2}
                            aria-hidden
                          />
                        ) : (
                          <Circle
                            size={18}
                            color="gray.300"
                            strokeWidth={2}
                            aria-hidden
                          />
                        )}
                        <Text
                          fontSize="sm"
                          fontWeight={lesson.completed ? 600 : 500}
                          color={lesson.completed ? 'fg' : 'muted'}
                        >
                          {lesson.title}
                        </Text>
                      </Flex>
                      <Text fontSize="xs" color="muted" flexShrink={0}>
                        {lesson.duration}
                      </Text>
                    </Flex>
                  </Link>
                ))}
              </Stack>
            </Box>

            {/* ── Módulos relacionados ─────────────────────── */}
            {related.length > 0 && (
              <Box>
                <Heading as="h2" fontSize="lg" fontWeight={700} color="fg" mb={4}>
                  Continue estudando {topic.category}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
                  {related.map((t, i) => (
                    <TopicCard
                      key={t.slug}
                      topic={t}
                      index={i}
                      locked={t.locked}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            )}

            {/* ── Materiais e Conexões do Ecossistema ─────── */}
            <RelatedMaterials category={topic.category} topicTitle={topic.title} />
          </>
        )}
      </Stack>

      {/* ── Modais de Quiz, Certificado e Glossário ───────── */}
      <ModuleQuizModal
        open={quizOpen}
        onOpenChange={setQuizOpen}
        topic={topic}
        questions={questions}
        onCompleteQuiz={recordAttempt}
        onOpenCertificate={() => setCertOpen(true)}
      />

      <CertificateModal
        open={certOpen}
        onOpenChange={setCertOpen}
        topic={topic}
        studentName={user?.user_metadata?.name || user?.email?.split('@')[0] || 'Produtor(a) / Estudante'}
        score={bestScore || 100}
      />

      <GlossarioDrawer
        open={glossarioOpen}
        onOpenChange={setGlossarioOpen}
      />
    </AppShell>
  )
}

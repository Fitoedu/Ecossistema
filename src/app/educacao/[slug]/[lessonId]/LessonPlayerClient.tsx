'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  ArrowRight,
  Award,
  BookMarked,
  CheckCircle2,
  Circle,
  Clock,
  BookOpen,
  ListOrdered,
  PartyPopper,
  Sparkles,
  Trophy,
} from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { LessonContent } from '@/features/educacao/components/LessonContent'
import { LessonToolbar, FontSizeLevel } from '@/features/educacao/components/LessonToolbar'
import { GlossarioDrawer } from '@/features/educacao/components/GlossarioDrawer'
import { ModuleQuizModal } from '@/features/educacao/components/ModuleQuizModal'
import { CertificateModal } from '@/features/educacao/components/CertificateModal'
import { RelatedMaterials } from '@/features/educacao/components/RelatedMaterials'
import { useLessons } from '@/features/educacao/hooks/useLessons'
import { useModuleQuiz } from '@/features/educacao/hooks/useModuleQuiz'
import { useOfflineModules } from '@/features/educacao/hooks/useOfflineModules'
import { useAuth } from '@/providers/AuthProvider'
import type { TopicWithLock } from '@/features/educacao/data/educacao'

interface LessonPlayerClientProps {
  topic: TopicWithLock
  initialLessonId: string
}

export function LessonPlayerClient({
  topic,
  initialLessonId,
}: LessonPlayerClientProps) {
  const router = useRouter()
  const { user } = useAuth()
  const { lessons, loading, toggleLessonCompleted } = useLessons(
    topic.slug,
    null,
    user?.id ?? null,
  )

  const {
    questions,
    isPassed,
    bestScore,
    recordAttempt,
  } = useModuleQuiz(topic.slug, topic.category, user?.id ?? null)

  const { isModuleSaved } = useOfflineModules()
  const isSavedOffline = isModuleSaved(topic.slug)

  // Estados de Interface & Acessibilidade
  const [fontSizeLevel, setFontSizeLevel] = useState<FontSizeLevel>('md')
  const [isFocusMode, setIsFocusMode] = useState(false)
  const [glossarioOpen, setGlossarioOpen] = useState(false)
  const [quizOpen, setQuizOpen] = useState(false)
  const [certOpen, setCertOpen] = useState(false)

  const activeLessonIndex = useMemo(() => {
    const idx = lessons.findIndex((l) => l.id === initialLessonId)
    return idx >= 0 ? idx : 0
  }, [lessons, initialLessonId])

  const activeLesson = lessons[activeLessonIndex] ?? {
    id: initialLessonId,
    title: 'Carregando aula...',
    duration: '—',
    completed: false,
  }

  const completedCount = useMemo(() => {
    return lessons.filter((l) => l.completed).length
  }, [lessons])

  const progressPct = useMemo(() => {
    if (lessons.length === 0) return 0
    return Math.round((completedCount / lessons.length) * 100)
  }, [completedCount, lessons.length])

  const prevLesson = activeLessonIndex > 0 ? lessons[activeLessonIndex - 1] : null
  const nextLesson =
    activeLessonIndex < lessons.length - 1
      ? lessons[activeLessonIndex + 1]
      : null

  const handleNavigateLesson = (targetLessonId: string) => {
    router.push(`/educacao/${topic.slug}/${targetLessonId}`)
  }

  const handleToggleComplete = async () => {
    await toggleLessonCompleted(activeLesson.id)
  }

  return (
    <AppShell>
      <Stack gap={6}>
        {/* ── Top Bar & Breadcrumb ───────────────────────── */}
        <Flex
          align="center"
          justify="space-between"
          wrap="wrap"
          gap={3}
        >
          <Link href={`/educacao/${topic.slug}`}>
            <Flex
              align="center"
              gap={1.5}
              color="muted"
              fontSize="sm"
              fontWeight={600}
              _hover={{ color: 'primary.600' }}
              transition="color 0.15s ease"
            >
              <ArrowLeft size={14} strokeWidth={2.5} />
              Voltar ao Módulo ({topic.title})
            </Flex>
          </Link>

          <Flex align="center" gap={2}>
            <Badge colorPalette="green" variant="subtle" borderRadius="full" px={2.5}>
              {topic.category}
            </Badge>
            <Badge colorPalette="gray" variant="subtle" borderRadius="full" px={2.5}>
              {topic.level}
            </Badge>
          </Flex>
        </Flex>

        {/* ── Header do Player com Progresso ─────────────── */}
        <Box
          bg="surface"
          borderRadius="2xl"
          border="1.5px solid"
          borderColor="primary.100"
          p={{ base: 4, md: 5 }}
          boxShadow="0 2px 14px rgba(15,42,26,0.05)"
        >
          <Flex
            justify="space-between"
            align={{ base: 'flex-start', sm: 'center' }}
            direction={{ base: 'column', sm: 'row' }}
            gap={3}
            mb={3}
          >
            <Flex align="center" gap={2.5}>
              <Flex
                w={8}
                h={8}
                borderRadius="lg"
                bg={`${topic.color}18`}
                color={topic.color}
                align="center"
                justify="center"
                flexShrink={0}
              >
                <BookOpen size={16} strokeWidth={2.5} />
              </Flex>
              <Stack gap={0}>
                <Heading as="h2" fontSize="sm" fontWeight={700} color="fg">
                  {topic.title}
                </Heading>
                <Text fontSize="xs" color="muted">
                  Aula {activeLessonIndex + 1} de {lessons.length}
                </Text>
              </Stack>
            </Flex>

            <Flex align="center" gap={2}>
              <Text fontSize="xs" fontWeight={700} color="primary.700">
                {progressPct}% concluído
              </Text>
              <Text fontSize="xs" color="muted">
                ({completedCount}/{lessons.length})
              </Text>
            </Flex>
          </Flex>

          <Progress.Root value={progressPct} size="sm" borderRadius="full">
            <Progress.Track borderRadius="full" bg="primary.50">
              <Progress.Range borderRadius="full" bg={topic.color} />
            </Progress.Track>
          </Progress.Root>
        </Box>

        {/* ── Barra de Acessibilidade & Modo Foco ─────────── */}
        <LessonToolbar
          fontSizeLevel={fontSizeLevel}
          onFontSizeChange={setFontSizeLevel}
          onOpenGlossario={() => setGlossarioOpen(true)}
          isFocusMode={isFocusMode}
          onToggleFocusMode={() => setIsFocusMode((prev) => !prev)}
          isSavedOffline={isSavedOffline}
        />

        {/* ── Main Layout: Content + Syllabus Sidebar ────── */}
        <SimpleGrid columns={{ base: 1, lg: 12 }} gap={6} alignItems="start">
          {/* Main Lesson Body */}
          <Box
            gridColumn={
              isFocusMode
                ? { base: 'span 1', lg: 'span 12' }
                : { base: 'span 1', lg: 'span 8' }
            }
            maxW={isFocusMode ? '860px' : '100%'}
            mx={isFocusMode ? 'auto' : undefined}
            w="100%"
          >
            <Stack gap={6}>
              {/* Lesson Title Header */}
              <Box
                bg="surface"
                borderRadius="2xl"
                border="1.5px solid"
                borderColor="primary.100"
                p={{ base: 5, md: 7 }}
                boxShadow="0 2px 16px rgba(15,42,26,0.06)"
              >
                <Flex justify="space-between" align="flex-start" gap={3} mb={2} wrap="wrap">
                  <Badge
                    colorPalette={activeLesson.completed ? 'green' : 'gray'}
                    variant={activeLesson.completed ? 'solid' : 'subtle'}
                    borderRadius="full"
                    px={3}
                    py={0.5}
                    fontSize="xs"
                    fontWeight={600}
                  >
                    {activeLesson.completed ? '✓ Concluída' : 'Em andamento'}
                  </Badge>

                  <Flex align="center" gap={1.5} color="muted" fontSize="xs">
                    <Clock size={13} strokeWidth={2} />
                    <Text fontWeight={500}>{activeLesson.duration}</Text>
                  </Flex>
                </Flex>

                <Heading
                  as="h1"
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight={800}
                  color="fg"
                  lineHeight={1.25}
                >
                  {activeLesson.title}
                </Heading>
              </Box>

              {/* Rich Lesson Content Renderer with Dynamic Font Size */}
              <LessonContent
                lesson={activeLesson}
                color={topic.color}
                fontSizeLevel={fontSizeLevel}
              />

              {/* Lesson Action Footer */}
              <Box
                bg="surface"
                borderRadius="2xl"
                border="1.5px solid"
                borderColor="primary.100"
                p={{ base: 4, md: 6 }}
                boxShadow="0 4px 20px rgba(15,42,26,0.06)"
              >
                <Flex
                  direction={{ base: 'column', sm: 'row' }}
                  justify="space-between"
                  align="center"
                  gap={3}
                >
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    colorPalette="gray"
                    borderRadius="xl"
                    size="md"
                    w={{ base: '100%', sm: 'auto' }}
                    disabled={!prevLesson}
                    onClick={() => prevLesson && handleNavigateLesson(prevLesson.id)}
                  >
                    <ArrowLeft size={16} strokeWidth={2} />
                    Aula Anterior
                  </Button>

                  {/* Toggle Complete Button */}
                  <Button
                    colorPalette="green"
                    variant={activeLesson.completed ? 'subtle' : 'solid'}
                    borderRadius="xl"
                    size="md"
                    w={{ base: '100%', sm: 'auto' }}
                    onClick={handleToggleComplete}
                    fontWeight={600}
                  >
                    <CheckCircle2 size={18} strokeWidth={2.5} />
                    {activeLesson.completed ? 'Concluída (Clique p/ Desmarcar)' : 'Marcar como Concluída'}
                  </Button>

                  {/* Next Button or Quiz Trigger */}
                  {nextLesson ? (
                    <Button
                      colorPalette="green"
                      borderRadius="xl"
                      size="md"
                      w={{ base: '100%', sm: 'auto' }}
                      onClick={() => handleNavigateLesson(nextLesson.id)}
                    >
                      Próxima Aula
                      <ArrowRight size={16} strokeWidth={2} />
                    </Button>
                  ) : (
                    <Button
                      colorPalette="yellow"
                      borderRadius="xl"
                      size="md"
                      w={{ base: '100%', sm: 'auto' }}
                      fontWeight={700}
                      onClick={() => setQuizOpen(true)}
                    >
                      <Award size={16} strokeWidth={2.5} />
                      Avaliação do Módulo
                    </Button>
                  )}
                </Flex>
              </Box>

              {/* Module Completed Card if all finished */}
              {progressPct === 100 && (
                <Flex
                  direction="column"
                  align="center"
                  textAlign="center"
                  gap={3}
                  bg="linear-gradient(135deg, var(--chakra-colors-primary-50) 0%, var(--chakra-colors-surface) 100%)"
                  borderRadius="2xl"
                  border="2px solid"
                  borderColor="primary.300"
                  p={6}
                >
                  <Flex
                    w={12}
                    h={12}
                    borderRadius="full"
                    bg="accent.100"
                    color="accent.600"
                    align="center"
                    justify="center"
                  >
                    <Trophy size={24} strokeWidth={2.5} />
                  </Flex>
                  <Heading as="h3" fontSize="md" fontWeight={800} color="fg">
                    Parabéns! Você concluiu todas as aulas de {topic.title}! 🌿
                  </Heading>
                  <Text fontSize="xs" color="muted" maxW="420px">
                    Realize a avaliação final de fixação para validar seu aprendizado e desbloquear seu Certificado Digital de Conclusão.
                  </Text>
                  <Flex gap={3} wrap="wrap" justify="center">
                    <Button
                      colorPalette="yellow"
                      size="sm"
                      borderRadius="lg"
                      fontWeight={700}
                      onClick={() => setQuizOpen(true)}
                    >
                      <Award size={15} />
                      {isPassed ? 'Refazer Avaliação' : 'Fazer Avaliação Final'}
                    </Button>

                    {isPassed && (
                      <Button
                        colorPalette="green"
                        size="sm"
                        borderRadius="lg"
                        fontWeight={700}
                        onClick={() => setCertOpen(true)}
                      >
                        <Sparkles size={15} />
                        Ver Certificado
                      </Button>
                    )}

                    <Button asChild variant="outline" size="sm" borderRadius="lg">
                      <Link href="/educacao">Ver outros módulos</Link>
                    </Button>
                  </Flex>
                </Flex>
              )}
            </Stack>
          </Box>

          {/* Syllabus Sidebar (oculta no modo foco) */}
          {!isFocusMode && (
            <Box gridColumn={{ base: 'span 1', lg: 'span 4' }}>
              <Box
                bg="surface"
                borderRadius="2xl"
                border="1.5px solid"
                borderColor="primary.100"
                p={5}
                position={{ lg: 'sticky' }}
                top={{ lg: '24px' }}
                boxShadow="0 4px 20px rgba(15,42,26,0.06)"
              >
                <Flex align="center" gap={2} mb={4}>
                  <ListOrdered size={18} color="var(--chakra-colors-primary-600)" strokeWidth={2.5} />
                  <Heading as="h3" fontSize="md" fontWeight={700} color="fg">
                    Ementa do Módulo
                  </Heading>
                </Flex>

                <Stack gap={2}>
                  {lessons.map((lesson) => {
                    const isActive = lesson.id === activeLesson.id
                    return (
                      <Flex
                        key={lesson.id}
                        align="center"
                        justify="space-between"
                        gap={3}
                        p={3}
                        borderRadius="xl"
                        cursor="pointer"
                        bg={isActive ? 'primary.50' : 'transparent'}
                        border="1px solid"
                        borderColor={isActive ? 'primary.300' : 'transparent'}
                        _hover={{ bg: isActive ? 'primary.50' : 'gray.50' }}
                        transition="all 0.15s ease"
                        onClick={() => handleNavigateLesson(lesson.id)}
                      >
                        <Flex align="center" gap={2.5} flex={1} overflow="hidden">
                          {lesson.completed ? (
                            <CheckCircle2
                              size={16}
                              color="var(--chakra-colors-primary-600)"
                              strokeWidth={2.5}
                              style={{ flexShrink: 0 }}
                            />
                          ) : (
                            <Circle
                              size={16}
                              color="var(--chakra-colors-neutral-400)"
                              strokeWidth={2}
                              style={{ flexShrink: 0 }}
                            />
                          )}
                          <Text
                            fontSize="xs"
                            fontWeight={isActive ? 700 : 500}
                            color={isActive ? 'primary.800' : lesson.completed ? 'fg' : 'muted'}
                            lineHeight={1.4}
                            truncate
                          >
                            {lesson.title}
                          </Text>
                        </Flex>

                        <Text fontSize="2xs" color="muted" flexShrink={0}>
                          {lesson.duration}
                        </Text>
                      </Flex>
                    )
                  })}
                </Stack>
              </Box>
            </Box>
          )}
        </SimpleGrid>

        {/* ── Materiais Complementares do Ecossistema ─── */}
        <RelatedMaterials category={topic.category} topicTitle={topic.title} />
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

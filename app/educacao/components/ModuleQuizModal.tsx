'use client'

import { useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Portal,
  Progress,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  Award,
  CheckCircle2,
  HelpCircle,
  PartyPopper,
  RotateCcw,
  Sparkles,
  XCircle,
} from 'lucide-react'
import type { ModuleQuizQuestion, TopicWithLock } from '../_data/educacao'
import type { QuizAttemptResult } from '@/hooks/useModuleQuiz'

interface ModuleQuizModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  topic: TopicWithLock
  questions: ModuleQuizQuestion[]
  onCompleteQuiz: (correct: number, total: number) => Promise<QuizAttemptResult>
  onOpenCertificate?: () => void
}

export function ModuleQuizModal({
  open,
  onOpenChange,
  topic,
  questions,
  onCompleteQuiz,
  onOpenCertificate,
}: ModuleQuizModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null)
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState(false)
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: string }>({})
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [finalResult, setFinalResult] = useState<QuizAttemptResult | null>(null)

  const currentQuestion = questions[currentIndex]
  const progressPct =
    questions.length > 0 ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0

  const handleSelectOption = (optId: string) => {
    if (isAnswerConfirmed) return
    setSelectedOptionId(optId)
  }

  const handleConfirmAnswer = () => {
    if (!selectedOptionId || !currentQuestion) return

    const selectedOpt = currentQuestion.options.find((o) => o.id === selectedOptionId)
    const isCorrect = !!selectedOpt?.isCorrect

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1)
    }

    setUserAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedOptionId }))
    setIsAnswerConfirmed(true)
  }

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOptionId(null)
      setIsAnswerConfirmed(false)
    } else {
      // Finished all questions!
      setSubmitting(true)
      try {
        const finalCorrect = correctCount
        const result = await onCompleteQuiz(finalCorrect, questions.length)
        setFinalResult(result)
        setIsFinished(true)
      } finally {
        setSubmitting(false)
      }
    }
  }

  const handleRestart = () => {
    setCurrentIndex(0)
    setSelectedOptionId(null)
    setIsAnswerConfirmed(false)
    setUserAnswers({})
    setCorrectCount(0)
    setIsFinished(false)
    setFinalResult(null)
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} size="lg">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content borderRadius="2xl" overflow="hidden" boxShadow="0 16px 48px rgba(15,42,26,0.22)">
            {/* ── Header ───────────────────────────────────────── */}
            <Dialog.Header bg="primary.50" borderBottom="1px solid" borderColor="primary.100" py={4} px={6}>
              <Flex justify="space-between" align="center" w="100%">
                <Flex align="center" gap={2.5}>
                  <Flex
                    w={8}
                    h={8}
                    borderRadius="lg"
                    bg="primary.500"
                    color="white"
                    align="center"
                    justify="center"
                  >
                    <Award size={18} strokeWidth={2.5} />
                  </Flex>
                  <Stack gap={0}>
                    <Dialog.Title fontSize="md" fontWeight={800} color="primary.800">
                      Avaliação de Conclusão
                    </Dialog.Title>
                    <Text fontSize="xs" color="muted">
                      {topic.title}
                    </Text>
                  </Stack>
                </Flex>

                {!isFinished && (
                  <Badge colorPalette="green" variant="subtle" borderRadius="full" px={2.5}>
                    {currentIndex + 1} de {questions.length}
                  </Badge>
                )}
              </Flex>
            </Dialog.Header>

            {/* ── Body ─────────────────────────────────────────── */}
            <Dialog.Body p={{ base: 4, md: 6 }}>
              {!isFinished && (
                <Box mb={5}>
                  <Progress.Root value={progressPct} size="xs" borderRadius="full">
                    <Progress.Track bg="gray.100" borderRadius="full">
                      <Progress.Range bg="primary.500" borderRadius="full" />
                    </Progress.Track>
                  </Progress.Root>
                </Box>
              )}

              {/* ── View: Pergunta Ativa ────────────────────────── */}
              {!isFinished && currentQuestion && (
                <Stack gap={5}>
                  <Heading as="h3" fontSize={{ base: 'md', md: 'lg' }} fontWeight={700} color="fg" lineHeight={1.4}>
                    {currentQuestion.question}
                  </Heading>

                  {/* Lista de Alternativas */}
                  <Stack gap={2.5}>
                    {currentQuestion.options.map((opt, i) => {
                      const isSelected = selectedOptionId === opt.id
                      const showResultStyle = isAnswerConfirmed

                      let bg = 'surface'
                      let borderColor = 'primary.100'
                      let textColor = 'fg'
                      let badgeColor = 'gray'

                      if (isSelected && !showResultStyle) {
                        bg = 'primary.50'
                        borderColor = 'primary.500'
                        textColor = 'primary.800'
                        badgeColor = 'green'
                      }

                      if (showResultStyle) {
                        if (opt.isCorrect) {
                          bg = 'green.50'
                          borderColor = 'green.500'
                          textColor = 'green.900'
                          badgeColor = 'green'
                        } else if (isSelected && !opt.isCorrect) {
                          bg = 'red.50'
                          borderColor = 'red.500'
                          textColor = 'red.900'
                          badgeColor = 'red'
                        }
                      }

                      const optionLetters = ['A', 'B', 'C', 'D', 'E']

                      return (
                        <Flex
                          key={opt.id}
                          align="center"
                          gap={3}
                          p={3.5}
                          borderRadius="xl"
                          border="1.5px solid"
                          borderColor={borderColor}
                          bg={bg}
                          cursor={isAnswerConfirmed ? 'default' : 'pointer'}
                          onClick={() => handleSelectOption(opt.id)}
                          _hover={
                            isAnswerConfirmed
                              ? undefined
                              : {
                                  borderColor: 'primary.400',
                                  bg: 'primary.50',
                                }
                          }
                          transition="all 0.15s ease"
                        >
                          <Flex
                            w={7}
                            h={7}
                            borderRadius="lg"
                            bg={
                              showResultStyle && opt.isCorrect
                                ? 'green.500'
                                : showResultStyle && isSelected && !opt.isCorrect
                                  ? 'red.500'
                                  : isSelected
                                    ? 'primary.500'
                                    : 'gray.100'
                            }
                            color={
                              isSelected || (showResultStyle && (opt.isCorrect || isSelected))
                                ? 'white'
                                : 'muted'
                            }
                            align="center"
                            justify="center"
                            fontSize="xs"
                            fontWeight={700}
                            flexShrink={0}
                          >
                            {showResultStyle && opt.isCorrect ? (
                              <CheckCircle2 size={16} strokeWidth={2.5} />
                            ) : showResultStyle && isSelected && !opt.isCorrect ? (
                              <XCircle size={16} strokeWidth={2.5} />
                            ) : (
                              optionLetters[i] ?? (i + 1)
                            )}
                          </Flex>

                          <Text fontSize="sm" fontWeight={500} color={textColor} lineHeight={1.5} flex={1}>
                            {opt.text}
                          </Text>
                        </Flex>
                      )
                    })}
                  </Stack>

                  {/* Explicação Pedagógica pós-confirmação */}
                  {isAnswerConfirmed && currentQuestion.explanation && (
                    <Box
                      p={4}
                      borderRadius="xl"
                      bg="blue.50"
                      border="1.5px solid"
                      borderColor="blue.200"
                    >
                      <Flex align="center" gap={2} mb={1.5}>
                        <HelpCircle size={16} color="var(--chakra-colors-blue-600)" strokeWidth={2.5} />
                        <Text fontSize="xs" fontWeight={700} textTransform="uppercase" color="blue.700" letterSpacing="wider">
                          Comentário Pedagógico
                        </Text>
                      </Flex>
                      <Text fontSize="xs" color="blue.900" lineHeight={1.6}>
                        {currentQuestion.explanation}
                      </Text>
                    </Box>
                  )}
                </Stack>
              )}

              {/* ── View: Resultado Final ──────────────────────── */}
              {isFinished && (
                <Stack gap={5} align="center" textAlign="center" py={4}>
                  <Flex
                    w={16}
                    h={16}
                    borderRadius="full"
                    bg={finalResult?.passed ? 'green.100' : 'orange.100'}
                    color={finalResult?.passed ? 'green.600' : 'orange.600'}
                    align="center"
                    justify="center"
                  >
                    {finalResult?.passed ? (
                      <PartyPopper size={32} strokeWidth={2} />
                    ) : (
                      <Award size={32} strokeWidth={2} />
                    )}
                  </Flex>

                  <Stack gap={1}>
                    <Heading as="h3" fontSize="xl" fontWeight={800} color="fg">
                      {finalResult?.passed
                        ? '🎉 Parabéns! Você foi aprovado!'
                        : 'Quase lá! Vamos revisar?'}
                    </Heading>
                    <Text fontSize="sm" color="muted" maxW="380px">
                      {finalResult?.passed
                        ? `Você acertou ${finalResult.correct} de ${finalResult.total} perguntas (${finalResult.score}%). Seu certificado de conclusão está liberado!`
                        : `Você acertou ${finalResult?.correct} de ${finalResult?.total} perguntas (${finalResult?.score}%). O mínimo para certificação é 70%.`}
                    </Text>
                  </Stack>

                  <Flex gap={3} mt={2} wrap="wrap" justify="center">
                    {finalResult?.passed && onOpenCertificate && (
                      <Button
                        colorPalette="green"
                        borderRadius="xl"
                        fontWeight={700}
                        onClick={() => {
                          onOpenChange(false)
                          onOpenCertificate()
                        }}
                      >
                        <Sparkles size={16} strokeWidth={2} />
                        Emitir Certificado Digital
                      </Button>
                    )}

                    <Button variant="outline" borderRadius="xl" onClick={handleRestart} gap={1.5}>
                      <RotateCcw size={15} />
                      {finalResult?.passed ? 'Fazer Novamente' : 'Tentar Novamente'}
                    </Button>
                  </Flex>
                </Stack>
              )}
            </Dialog.Body>

            {/* ── Footer ───────────────────────────────────────── */}
            {!isFinished && (
              <Dialog.Footer bg="surface" borderTop="1px solid" borderColor="primary.100" p={4}>
                <Flex justify="space-between" w="100%" align="center">
                  <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                    Pausar
                  </Button>

                  {!isAnswerConfirmed ? (
                    <Button
                      colorPalette="green"
                      size="sm"
                      borderRadius="lg"
                      disabled={!selectedOptionId}
                      onClick={handleConfirmAnswer}
                    >
                      Confirmar Resposta
                    </Button>
                  ) : (
                    <Button
                      colorPalette="green"
                      size="sm"
                      borderRadius="lg"
                      loading={submitting}
                      onClick={handleNext}
                    >
                      {currentIndex < questions.length - 1 ? 'Próxima Questão →' : 'Finalizar Avaliação'}
                    </Button>
                  )}
                </Flex>
              </Dialog.Footer>
            )}
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}


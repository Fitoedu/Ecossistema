'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion'
import { Box, Text, VStack, HStack } from '@chakra-ui/react'
import { CheckCircle, XCircle, ChevronRight, Trophy, RotateCcw, Lightbulb } from 'lucide-react'

interface Option   { id: string; text: string }
interface Question { id: number; text: string; options: Option[]; correctId: string; explanation: string; emoji: string }

const QUESTIONS: Question[] = [
  {
    id: 1,
    emoji: '🔬',
    text: 'O que é Fitossanidade?',
    options: [
      { id: 'a', text: 'A ciência que estuda apenas os remédios naturais.' },
      { id: 'b', text: 'A área responsável pela saúde e proteção das plantas contra pragas e doenças.' },
      { id: 'c', text: 'Um tipo de plantação orgânica sem uso de qualquer produto.' },
      { id: 'd', text: 'O processo de irrigação dos campos agrícolas.' },
    ],
    correctId: 'b',
    explanation: 'Fitossanidade zela pela saúde das plantas, prevenindo e controlando pragas, doenças e plantas invasoras para garantir colheitas saudáveis.',
  },
  {
    id: 2,
    emoji: '🚨',
    text: 'O que é uma Praga Quarentenária?',
    options: [
      { id: 'a', text: 'Um inseto comum encontrado em jardins residenciais.' },
      { id: 'b', text: 'Uma praga muito pequena, invisível a olho nu.' },
      { id: 'c', text: 'Uma praga de alto risco econômico, ausente ou com distribuição limitada no país, sujeita a controle oficial.' },
      { id: 'd', text: 'Qualquer planta que cresce entre as lavouras.' },
    ],
    correctId: 'c',
    explanation: 'Pragas quarentenárias têm alto impacto econômico e sofrem controle rigoroso para impedir sua entrada e dispersão no Brasil.',
  },
  {
    id: 3,
    emoji: '🌿',
    text: 'Qual praga representa um caso real no Amapá / Região Norte?',
    options: [
      { id: 'a', text: 'A ferrugem do café no sul de Minas Gerais.' },
      { id: 'b', text: 'A vassoura-de-bruxa na mandioca.' },
      { id: 'c', text: 'O cancro cítrico nas laranjas do Nordeste.' },
      { id: 'd', text: 'A podridão-seca da soja no Cerrado.' },
    ],
    correctId: 'b',
    explanation: 'A vassoura-de-bruxa (fungo Moniliophthora perniciosa) é uma praga relevante que afeta a mandioca na Região Norte, podendo reduzir até 90% da produção.',
  },
  {
    id: 4,
    emoji: '🏛️',
    text: 'Qual órgão federal é responsável pela fiscalização fitossanitária no Brasil?',
    options: [
      { id: 'a', text: 'IBAMA' },
      { id: 'b', text: 'ANVISA' },
      { id: 'c', text: 'MAPA — Ministério da Agricultura, Pecuária e Abastecimento' },
      { id: 'd', text: 'INPE' },
    ],
    correctId: 'c',
    explanation: 'O MAPA, por meio do VIGIAGRO, fiscaliza a entrada e dispersão de pragas em portos, aeroportos e fronteiras terrestres do Brasil.',
  },
  {
    id: 5,
    emoji: '🛡️',
    text: 'Qual das práticas abaixo NÃO é uma boa prática fitossanitária?',
    options: [
      { id: 'a', text: 'Usar sementes certificadas e sadias.' },
      { id: 'b', text: 'Fazer rotação de culturas.' },
      { id: 'c', text: 'Transportar plantas sem verificar sua procedência.' },
      { id: 'd', text: 'Monitorar regularmente a lavoura.' },
    ],
    correctId: 'c',
    explanation: 'Transportar plantas sem verificar a origem facilita a disseminação de pragas e doenças entre regiões — o risco mais simples de evitar.',
  },
]

function getResultTier(score: number, total: number) {
  const pct = score / total
  if (pct === 1)    return { emoji: '🏆', grade: 'A+', label: 'Expert em Fitossanidade!',        color: '#2E7D32', bg: 'linear-gradient(135deg,#1B5E20,#2E7D32)', stars: 5 }
  if (pct >= 0.8)   return { emoji: '🌟', grade: 'A',  label: 'Excelente! Quase perfeito.',       color: '#00695C', bg: 'linear-gradient(135deg,#004D40,#00897B)', stars: 4 }
  if (pct >= 0.6)   return { emoji: '🌱', grade: 'B',  label: 'Muito bem! No caminho certo.',     color: '#F57F17', bg: 'linear-gradient(135deg,#E65100,#F57C00)', stars: 3 }
  if (pct >= 0.4)   return { emoji: '📖', grade: 'C',  label: 'Continue estudando!',              color: '#1565C0', bg: 'linear-gradient(135deg,#0D47A1,#1565C0)', stars: 2 }
  return              { emoji: '🌿', grade: 'D',  label: 'Todo especialista foi iniciante!', color: '#C62828', bg: 'linear-gradient(135deg,#B71C1C,#C62828)', stars: 1 }
}

function QuizProgress({ current, total }: { current: number; total: number }) {
  const pct = ((current + 1) / total) * 100
  return (
    <Box w="full">
      <HStack justify="space-between" mb="6px">
        <Text fontSize="0.65rem" fontWeight="700" textTransform="uppercase"
          letterSpacing="0.08em" color="#2E7D32">
          Pergunta {current + 1} de {total}
        </Text>
        <Text fontSize="0.65rem" fontWeight="600" color="rgba(46,125,50,0.6)">
          {Math.round(pct)}%
        </Text>
      </HStack>
      <Box h="6px" bg="rgba(46,125,50,0.1)" borderRadius="999px" overflow="hidden">
        <motion.div
          animate={{ width: `${pct}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #2E7D32, #66BB6A)',
            borderRadius: '999px',
            boxShadow: '0 0 8px rgba(102,187,106,0.5)',
          }}
        />
      </Box>
    </Box>
  )
}

function AnswerCard({
  opt,
  status,
  isRevealed,
  onSelect,
}: {
  opt: Option
  status: 'idle' | 'selected' | 'correct' | 'wrong' | 'dim'
  isRevealed: boolean
  onSelect: () => void
}) {
  const controls = useAnimationControls()

  const handleClick = useCallback(async () => {
    if (isRevealed) return
    onSelect()
  }, [isRevealed, onSelect])

  const shake = useCallback(async () => {
    await controls.start({
      x: [0, -8, 8, -6, 6, -4, 4, 0],
      transition: { duration: 0.45, ease: 'easeInOut' },
    })
  }, [controls])

  useState(() => {
    if (status === 'wrong') shake()
  })

  const styles = {
    idle:     { bg: '#FFFFFF',  border: '2px solid #E8EDE9', letterBg: 'rgba(46,125,50,0.08)', letterColor: '#2E7D32', shadow: '0 2px 8px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.9) inset' },
    selected: { bg: '#F1F8F2',  border: '2px solid #2E7D32',  letterBg: '#2E7D32',             letterColor: '#FFF',    shadow: '0 4px 16px rgba(46,125,50,0.18), 0 1px 0 rgba(255,255,255,0.9) inset' },
    correct:  { bg: '#E8F5E9',  border: '2px solid #2E7D32',  letterBg: '#2E7D32',             letterColor: '#FFF',    shadow: '0 4px 20px rgba(46,125,50,0.25)' },
    wrong:    { bg: '#FFEBEE',  border: '2px solid #C62828',  letterBg: '#C62828',             letterColor: '#FFF',    shadow: '0 4px 20px rgba(198,40,40,0.2)' },
    dim:      { bg: '#FAFAFA',  border: '2px solid #F0F0F0',  letterBg: '#E0E0E0',             letterColor: '#9E9E9E', shadow: 'none' },
  }
  const s = styles[status]

  return (
    <motion.div
      animate={controls}
      whileHover={isRevealed ? {} : { y: -2, scale: 1.01 }}
      whileTap={isRevealed ? {} : { scale: 0.96, y: 2 }}
      transition={{ type: 'spring', stiffness: 400, damping: 24 }}
      onClick={handleClick}
      style={{ cursor: isRevealed ? 'default' : 'pointer', width: '100%' }}
    >
      <Box
        bg={s.bg}
        border={s.border}
        borderRadius="16px"
        p="14px 18px"
        display="flex"
        alignItems="center"
        gap={3}
        boxShadow={s.shadow}
        transition="background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease"
        role="button"
        aria-pressed={status === 'selected' || status === 'correct' || status === 'wrong'}
      >
        <Box
          w="32px"
          h="32px"
          borderRadius="50%"
          bg={s.letterBg}
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="0.78rem"
          fontWeight="800"
          color={s.letterColor}
          flexShrink={0}
          transition="background 0.2s ease"
        >
          {opt.id.toUpperCase()}
        </Box>

        <Text
          flex="1"
          fontSize="0.86rem"
          fontWeight={status === 'selected' || status === 'correct' || status === 'wrong' ? 600 : 400}
          color={status === 'dim' ? '#9E9E9E' : '#1a1a1a'}
          lineHeight="1.55"
          transition="color 0.2s ease"
        >
          {opt.text}
        </Text>

        <AnimatePresence>
          {status === 'correct' && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <CheckCircle size={20} color="#2E7D32" strokeWidth={2.5} />
            </motion.div>
          )}
          {status === 'wrong' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              <XCircle size={20} color="#C62828" strokeWidth={2.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  )
}

function ResultScreen({
  score,
  total,
  answers,
  onRetry,
}: {
  score: number
  total: number
  answers: (string | null)[]
  onRetry: () => void
}) {
  const tier = getResultTier(score, total)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      transition={{ type: 'spring', stiffness: 220, damping: 24 }}
    >
      <VStack gap={5} pb={6}>
        <Box
          w="full"
          borderRadius="24px"
          overflow="hidden"
          boxShadow="0 16px 48px rgba(0,0,0,0.18)"
        >
          <Box
            bg={tier.bg}
            py="36px"
            px={6}
            textAlign="center"
            position="relative"
            overflow="hidden"
          >
            <Box position="absolute" w="200px" h="200px" borderRadius="50%"
              bg="rgba(255,255,255,0.06)" top="-60px" right="-40px" aria-hidden="true" />
            <Box position="absolute" w="120px" h="120px" borderRadius="50%"
              bg="rgba(255,255,255,0.04)" bottom="-40px" left="-20px" aria-hidden="true" />

            <motion.div
              animate={{ y: [0, -8, 0], rotate: [0, 4, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
              style={{ fontSize: '64px', lineHeight: 1, marginBottom: '16px', display: 'block' }}
              aria-hidden="true"
            >
              {tier.emoji}
            </motion.div>

            <HStack justify="center" gap="4px" mb={3}>
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0, rotate: -30 }}
                  animate={{ opacity: i < tier.stars ? 1 : 0.2, scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 300, damping: 18 }}
                  style={{ fontSize: '24px', display: 'inline-block' }}
                  aria-hidden="true"
                >
                  ⭐
                </motion.span>
              ))}
            </HStack>

            <Text as="h2" fontSize="clamp(1.2rem,3.5vw,1.6rem)" fontWeight="900" color="white" mb={1} lineHeight="1.2">
              {tier.label}
            </Text>
            <Text fontSize="0.85rem" color="rgba(255,255,255,0.8)" lineHeight="1.6" maxW="320px" mx="auto">
              Fitossanidade é responsabilidade de todos. Compartilhe o que aprendeu!
            </Text>
          </Box>

          <Box
            bg="white"
            py={5}
            px={6}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={5}
          >
            <Box
              w="90px"
              h="90px"
              borderRadius="50%"
              border="6px solid #E8F5E9"
              boxShadow={`0 0 0 3px ${tier.color}, 0 8px 24px rgba(0,0,0,0.1)`}
              display="flex"
              flexDir="column"
              alignItems="center"
              justifyContent="center"
            >
              <Text fontSize="1.6rem" fontWeight="900" color={tier.color} lineHeight="1">
                {score}
              </Text>
              <Text fontSize="0.6rem" fontWeight="700" color="gray.400" textTransform="uppercase" letterSpacing="0.05em">
                de {total}
              </Text>
            </Box>
            <Box>
              <Text fontSize="0.75rem" fontWeight="700" textTransform="uppercase"
                letterSpacing="0.08em" color="#9E9E9E" mb={1}>
                Pontuação Final
              </Text>
              <HStack gap={1} align="baseline">
                <Text fontSize="2.4rem" fontWeight="900" color={tier.color} lineHeight="1">
                  {tier.grade}
                </Text>
                <Text fontSize="0.8rem" fontWeight="600" color="gray.500" mb="4px">
                  — {Math.round((score / total) * 100)}%
                </Text>
              </HStack>
            </Box>
          </Box>
        </Box>

        <Box w="full">
          <Text fontSize="0.65rem" fontWeight="700" textTransform="uppercase"
            letterSpacing="0.1em" color="#2E7D32" mb={3}>
            Revisão das respostas
          </Text>
          <VStack gap="10px" align="stretch">
            {QUESTIONS.map((q, idx) => {
              const userAns   = answers[idx]
              const isCorrect = userAns === q.correctId
              return (
                <Box
                  key={q.id}
                  bg={isCorrect ? '#F1F8F2' : '#FFF5F5'}
                  border={`1.5px solid ${isCorrect ? '#A5D6A7' : '#EF9A9A'}`}
                  borderRadius="16px"
                  p="16px 18px"
                >
                  <HStack gap={2} align="flex-start" mb="6px">
                    {isCorrect
                      ? <CheckCircle size={16} color="#2E7D32" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                      : <XCircle    size={16} color="#C62828" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
                    }
                    <Text fontSize="0.82rem" fontWeight="600" color="#212121" lineHeight="1.4">
                      {q.text}
                    </Text>
                  </HStack>
                  {!isCorrect && (
                    <Text fontSize="0.75rem" color="#2E7D32" fontWeight="600" ml="24px" mb="4px">
                      ✓ {q.options.find(o => o.id === q.correctId)?.text}
                    </Text>
                  )}
                  <HStack gap="6px" align="flex-start" ml="24px">
                    <Lightbulb size={13} color="#F57F17" strokeWidth={2} style={{ flexShrink: 0, marginTop: 2 }} />
                    <Text fontSize="0.73rem" color="#616161" lineHeight="1.55">
                      {q.explanation}
                    </Text>
                  </HStack>
                </Box>
              )
            })}
          </VStack>
        </Box>

        <VStack gap={3} w="full">
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.96, y: 2 }}
            transition={{ type: 'spring', stiffness: 380, damping: 24 }}
            onClick={onRetry}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2E7D32, #43A047)',
              color: 'white',
              border: 'none',
              borderRadius: '16px',
              padding: '14px 24px',
              fontSize: '0.9rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 0 rgba(15,60,20,0.5), 0 8px 24px rgba(46,125,50,0.3)',
            }}
          >
            <RotateCcw size={16} strokeWidth={2.5} />
            Tentar novamente
          </motion.button>
        </VStack>
      </VStack>
    </motion.div>
  )
}

export default function QuizGamificado() {
  const [currentQ,  setCurrentQ]  = useState(0)
  const [selected,  setSelected]  = useState<string | null>(null)
  const [revealed,  setRevealed]  = useState(false)
  const [answers,   setAnswers]   = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null))
  const [finished,  setFinished]  = useState(false)
  const [wrongAnim, setWrongAnim] = useState(false)

  const question = QUESTIONS[currentQ]
  const isLast   = currentQ === QUESTIONS.length - 1

  const score = answers.reduce<number>(
    (acc, ans, idx) => (ans === QUESTIONS[idx].correctId ? acc + 1 : acc),
    0,
  )

  const handleSelect = useCallback((optId: string) => {
    if (revealed) return
    setSelected(optId)
  }, [revealed])

  const handleConfirm = useCallback(() => {
    if (!selected) return
    const newAnswers = [...answers]
    newAnswers[currentQ] = selected
    setAnswers(newAnswers)
    setRevealed(true)
    if (selected !== question.correctId) {
      setWrongAnim(true)
      setTimeout(() => setWrongAnim(false), 600)
    }
  }, [selected, answers, currentQ, question.correctId])

  const handleNext = useCallback(() => {
    if (isLast) {
      setFinished(true)
    } else {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setRevealed(false)
      setWrongAnim(false)
    }
  }, [isLast])

  const handleRetry = useCallback(() => {
    setCurrentQ(0)
    setSelected(null)
    setRevealed(false)
    setAnswers(Array(QUESTIONS.length).fill(null))
    setFinished(false)
    setWrongAnim(false)
  }, [])

  if (finished) {
    return (
      <ResultScreen
        score={score}
        total={QUESTIONS.length}
        answers={answers}
        onRetry={handleRetry}
      />
    )
  }

  return (
    <Box>
      <VStack textAlign="center" gap={2} mb={7}>
        <Box
          display="inline-flex"
          alignItems="center"
          gap={2}
          bg="#E8F5E9"
          border="1px solid rgba(46,125,50,0.2)"
          px="14px"
          py="6px"
          borderRadius="999px"
          mb={1}
        >
          <Text fontSize="16px" aria-hidden="true">🧠</Text>
          <Text fontSize="0.68rem" fontWeight="700" textTransform="uppercase"
            letterSpacing="0.08em" color="#1B5E20">
            Quiz de Aprendizagem
          </Text>
        </Box>

        <Text
          as="h1"
          fontSize="clamp(1.5rem, 4vw, 2rem)"
          fontWeight="900"
          color="#1B5E20"
          lineHeight="1.15"
          letterSpacing="-0.02em"
        >
          Teste seus conhecimentos
        </Text>
        <Text fontSize="0.88rem" color="gray.500" lineHeight="1.65" maxW="380px">
          5 perguntas sobre Fitossanidade e Proteção de Plantas
        </Text>
      </VStack>

      <Box mb={6}>
        <QuizProgress current={currentQ} total={QUESTIONS.length} />
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 40, scale: 0.98 }}
          animate={{ opacity: 1, x: 0,  scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        >
          <Box
            bg="white"
            borderRadius="22px"
            boxShadow="0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05)"
            border="1.5px solid rgba(46,125,50,0.1)"
            overflow="hidden"
            mb={4}
          >
            <Box
              bg="linear-gradient(135deg, #2E7D32, #43A047)"
              px={5}
              py={4}
              display="flex"
              alignItems="center"
              gap={3}
              position="relative"
              overflow="hidden"
            >
              <Box position="absolute" w="80px" h="80px" borderRadius="50%"
                bg="rgba(255,255,255,0.08)" bottom="-30px" right="-20px" aria-hidden="true" />
              <Box
                w="38px" h="38px"
                bg="rgba(255,255,255,0.15)"
                borderRadius="12px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="22px"
                flexShrink={0}
                aria-hidden="true"
              >
                {question.emoji}
              </Box>
              <Box>
                <Text fontSize="0.6rem" fontWeight="700" textTransform="uppercase"
                  letterSpacing="0.1em" color="rgba(255,255,255,0.7)" mb="2px">
                  Pergunta {currentQ + 1}
                </Text>
                <Text fontSize="0.95rem" fontWeight="700" color="white" lineHeight="1.35">
                  {question.text}
                </Text>
              </Box>
            </Box>

            <VStack gap="10px" p={5} align="stretch">
              {question.options.map((opt) => {
                let status: 'idle' | 'selected' | 'correct' | 'wrong' | 'dim' = 'idle'
                if (revealed) {
                  if (opt.id === question.correctId)               status = 'correct'
                  else if (opt.id === selected)                    status = 'wrong'
                  else                                             status = 'dim'
                } else {
                  if (opt.id === selected)                         status = 'selected'
                }

                return (
                  <AnswerCard
                    key={opt.id}
                    opt={opt}
                    status={status}
                    isRevealed={revealed}
                    onSelect={() => handleSelect(opt.id)}
                  />
                )
              })}
            </VStack>

            <AnimatePresence>
              {revealed && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <Box
                    mx={5}
                    mb={5}
                    bg={selected === question.correctId ? '#E8F5E9' : '#FFF3E0'}
                    border={`1.5px solid ${selected === question.correctId ? '#A5D6A7' : '#FFCC80'}`}
                    borderRadius="16px"
                    p="16px 20px"
                    display="flex"
                    alignItems="flex-start"
                    gap={3}
                  >
                    <Lightbulb
                      size={20}
                      color="#F57F17"
                      strokeWidth={2}
                      style={{ flexShrink: 0, marginTop: 2 }}
                    />
                    <Box>
                      <Text fontSize="0.75rem" fontWeight="700" color="#E65100" mb="4px"
                        textTransform="uppercase" letterSpacing="0.06em">
                        Explicação
                      </Text>
                      <Text fontSize="0.85rem" color="#212121" lineHeight="1.65">
                        {question.explanation}
                      </Text>
                    </Box>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              id="quiz-confirm-btn"
              whileHover={selected ? { scale: 1.02, y: -2 } : {}}
              whileTap={selected ? { scale: 0.96, y: 2 } : {}}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              onClick={handleConfirm}
              disabled={!selected}
              style={{
                width: '100%',
                background: selected
                  ? 'linear-gradient(135deg, #2E7D32, #43A047)'
                  : 'rgba(46,125,50,0.12)',
                color: selected ? 'white' : 'rgba(46,125,50,0.4)',
                border: 'none',
                borderRadius: '16px',
                padding: '14px 24px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: selected ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: selected
                  ? '0 4px 0 rgba(15,60,20,0.45), 0 8px 24px rgba(46,125,50,0.25)'
                  : 'none',
                transition: 'all 0.2s ease',
              }}
            >
              Confirmar resposta
              {selected && <ChevronRight size={18} strokeWidth={2.5} />}
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="next"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <motion.button
              id="quiz-next-btn"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.96, y: 2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 24 }}
              onClick={handleNext}
              style={{
                width: '100%',
                background: isLast
                  ? 'linear-gradient(135deg, #F57F17, #FBC02D)'
                  : 'linear-gradient(135deg, #2E7D32, #43A047)',
                color: isLast ? '#212121' : 'white',
                border: 'none',
                borderRadius: '16px',
                padding: '14px 24px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: isLast
                  ? '0 4px 0 rgba(200,100,0,0.45), 0 8px 24px rgba(245,127,23,0.3)'
                  : '0 4px 0 rgba(15,60,20,0.45), 0 8px 24px rgba(46,125,50,0.25)',
              }}
            >
              {isLast ? (
                <>
                  <Trophy size={18} strokeWidth={2.5} />
                  Ver resultado
                </>
              ) : (
                <>
                  Próxima pergunta
                  <ChevronRight size={18} strokeWidth={2.5} />
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

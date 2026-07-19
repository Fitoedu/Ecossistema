'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  Progress,
} from '@chakra-ui/react'

/* ── Types ───────────────────────────────────────────── */
interface Option {
  id: string
  text: string
}

interface Question {
  id: number
  text: string
  options: Option[]
  correctId: string
  explanation: string
}

/* ── Questions Data ──────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'O que é Fitossanidade?',
    options: [
      { id: 'a', text: 'A ciência que estuda apenas os remédios naturais.' },
      { id: 'b', text: 'A área responsável pela saúde e proteção das plantas contra pragas e doenças.' },
      { id: 'c', text: 'Um tipo de plantação orgânica sem uso de qualquer produto.' },
      { id: 'd', text: 'O processo de irrigação dos campos agrícolas.' },
    ],
    correctId: 'b',
    explanation: 'Fitossanidade é a ciência que zela pela saúde das plantas, prevenindo e controlando pragas, doenças e plantas invasoras.',
  },
  {
    id: 2,
    text: 'O que é uma Praga Quarentenária?',
    options: [
      { id: 'a', text: 'Um inseto comum encontrado em jardins residenciais.' },
      { id: 'b', text: 'Uma praga muito pequena, invisível a olho nu.' },
      { id: 'c', text: 'Uma praga de alto risco econômico, ausente ou com distribuição limitada no país, sujeita a controle oficial.' },
      { id: 'd', text: 'Qualquer planta que cresce entre as lavouras.' },
    ],
    correctId: 'c',
    explanation: 'Pragas quarentenárias são de alto impacto econômico e sofrem controle rigoroso para impedir sua entrada e dispersão no território nacional.',
  },
  {
    id: 3,
    text: 'Qual das opções abaixo é um exemplo de caso real de praga no Amapá / Região Norte?',
    options: [
      { id: 'a', text: 'A ferrugem do café no sul de Minas Gerais.' },
      { id: 'b', text: 'A vassoura-de-bruxa na mandioca.' },
      { id: 'c', text: 'O cancro cítrico nas laranjas do Nordeste.' },
      { id: 'd', text: 'A podridão-seca da soja no Cerrado.' },
    ],
    correctId: 'b',
    explanation: 'A vassoura-de-bruxa (causada pelo fungo Moniliophthora perniciosa) é uma praga relevante que afeta a mandioca na Região Norte, incluindo o Amapá.',
  },
  {
    id: 4,
    text: 'Qual órgão federal é responsável pela fiscalização fitossanitária no Brasil?',
    options: [
      { id: 'a', text: 'IBAMA' },
      { id: 'b', text: 'ANVISA' },
      { id: 'c', text: 'MAPA — Ministério da Agricultura, Pecuária e Abastecimento' },
      { id: 'd', text: 'INPE' },
    ],
    correctId: 'c',
    explanation: 'O MAPA, por meio do VIGIAGRO e da Secretaria de Defesa Agropecuária, é responsável pelo controle e fiscalização fitossanitária nas fronteiras e no território brasileiro.',
  },
  {
    id: 5,
    text: 'Qual das práticas abaixo NÃO é uma boa prática fitossanitária?',
    options: [
      { id: 'a', text: 'Usar sementes certificadas e sadias.' },
      { id: 'b', text: 'Fazer rotação de culturas.' },
      { id: 'c', text: 'Transportar plantas sem verificar sua procedência.' },
      { id: 'd', text: 'Monitorar regularmente a lavoura.' },
    ],
    correctId: 'c',
    explanation: 'Transportar plantas sem verificar a origem é uma prática de risco, pois pode facilitar a disseminação de pragas e doenças entre regiões.',
  },
]

/* ── Score helper ────────────────────────────────────── */
function getResultData(score: number, total: number) {
  const pct = score / total
  if (pct === 1)   return { emoji: '🏆', stars: '⭐⭐⭐⭐⭐', msg: 'Parabéns! Você é um(a) Expert em Fitossanidade!', sub: 'Incrível! Você acertou todas as perguntas. Você está pronto(a) para defender nossas lavouras!' }
  if (pct >= 0.8)  return { emoji: '🌟', stars: '⭐⭐⭐⭐', msg: 'Excelente! Quase perfeito!', sub: 'Você demonstrou ótimo conhecimento sobre fitossanidade. Continue aprendendo!' }
  if (pct >= 0.6)  return { emoji: '🌱', stars: '⭐⭐⭐', msg: 'Muito bem! Você está no caminho certo!', sub: 'Bom desempenho! Reveja os tópicos que errou e tente novamente.' }
  if (pct >= 0.4)  return { emoji: '📖', stars: '⭐⭐', msg: 'Continue estudando!', sub: 'Você deu um bom começo. Releia a cartilha e tente novamente para melhorar sua pontuação.' }
  return { emoji: '🌿', stars: '⭐', msg: 'Não desista! Todo especialista já foi iniciante.', sub: 'Releia a cartilha com calma e tente novamente. Você vai melhorar!' }
}

/* ── Option colour logic ─────────────────────────────── */
function getOptionStyle(
  optId: string,
  selected: string | null,
  revealed: boolean,
  correctId: string,
) {
  if (!revealed) {
    if (selected === optId)
      return { border: '2px solid #2E7D32', bg: '#E8F5E9', letterBg: '#2E7D32', letterColor: 'white' }
    return { border: '2px solid #EEEEEE', bg: '#FAFAFA', letterBg: '#EEEEEE', letterColor: '#424242' }
  }
  if (optId === correctId)
    return { border: '2px solid #2E7D32', bg: '#E8F5E9', letterBg: '#2E7D32', letterColor: 'white' }
  if (selected === optId)
    return { border: '2px solid #C62828', bg: '#FFEBEE', letterBg: '#C62828', letterColor: 'white' }
  return { border: '2px solid #EEEEEE', bg: '#FAFAFA', letterBg: '#EEEEEE', letterColor: '#424242' }
}

/* ── Component ───────────────────────────────────────── */
export default function Quiz() {
  const [currentQ, setCurrentQ]   = useState(0)
  const [selected, setSelected]   = useState<string | null>(null)
  const [revealed, setRevealed]   = useState(false)
  const [answers, setAnswers]     = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null))
  const [finished, setFinished]   = useState(false)

  const question = QUESTIONS[currentQ]
  const isLast   = currentQ === QUESTIONS.length - 1

  const score = answers.reduce<number>((acc, ans, idx) =>
    ans === QUESTIONS[idx].correctId ? acc + 1 : acc, 0)

  const handleSelect = (optId: string) => {
    if (revealed) return
    setSelected(optId)
  }

  const handleConfirm = () => {
    if (!selected) return
    setRevealed(true)
    const newAnswers = [...answers]
    newAnswers[currentQ] = selected
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (isLast) {
      setFinished(true)
    } else {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const handleRetry = () => {
    setCurrentQ(0)
    setSelected(null)
    setRevealed(false)
    setAnswers(Array(QUESTIONS.length).fill(null))
    setFinished(false)
  }

  /* ── Result screen ── */
  if (finished) {
    const result = getResultData(score, QUESTIONS.length)
    return (
      <VStack gap={4} textAlign="center" py={6}>
        <Text fontSize="72px">{result.emoji}</Text>

        <Box
          w="140px" h="140px" borderRadius="50%"
          border="8px solid #E8F5E9"
          display="flex" flexDir="column" alignItems="center" justifyContent="center"
          bg="white"
          boxShadow="0 0 0 4px #2E7D32, 0 12px 32px rgba(46,125,50,0.2)"
        >
          <Text fontSize="2.4rem" fontWeight="900" color="#1B5E20" lineHeight="1">
            {score}/{QUESTIONS.length}
          </Text>
          <Text fontSize="0.72rem" fontWeight="600" color="gray.600">acertos</Text>
        </Box>

        <Text fontSize="1.1rem" fontWeight="700" color="#1B5E20">{result.msg}</Text>
        <Text fontSize="0.85rem" color="gray.600" lineHeight="1.65" maxW="380px">{result.sub}</Text>
        <Text fontSize="28px" letterSpacing="4px">{result.stars}</Text>

        {/* Answer review */}
        <Box w="full" textAlign="left" mb={6}>
          <Text
            fontSize="0.7rem" textTransform="uppercase" letterSpacing="0.1em"
            fontWeight="700" color="#2E7D32" mb={3}
          >
            Revisão das respostas
          </Text>
          <VStack gap={2} align="stretch">
            {QUESTIONS.map((q, idx) => {
              const userAns = answers[idx]
              const isCorrect = userAns === q.correctId
              return (
                <Box
                  key={q.id}
                  bg={isCorrect ? '#E8F5E9' : '#FFEBEE'}
                  border={`1px solid ${isCorrect ? '#66BB6A' : '#EF9A9A'}`}
                  borderRadius="14px"
                  p="14px 16px"
                >
                  <HStack gap={2} align="flex-start" mb={1}>
                    <Text fontSize="16px">{isCorrect ? '✅' : '❌'}</Text>
                    <Text fontSize="0.82rem" fontWeight="600" color="#212121" lineHeight="1.4">{q.text}</Text>
                  </HStack>
                  {!isCorrect && (
                    <Text fontSize="0.75rem" color="#424242" ml={6} lineHeight="1.5">
                      <Text as="strong" color="#2E7D32">Resposta correta: </Text>
                      {q.options.find(o => o.id === q.correctId)?.text}
                    </Text>
                  )}
                  <Text fontSize="0.72rem" color="#616161" ml={6} mt={1} lineHeight="1.5">
                    💡 {q.explanation}
                  </Text>
                </Box>
              )
            })}
          </VStack>
        </Box>

        <Button
          id="quiz-retry-btn"
          variant="outline"
          borderColor="#2E7D32"
          color="#2E7D32"
          borderWidth="2px"
          borderRadius="14px"
          px={7} py={3}
          fontWeight="700"
          _hover={{ bg: '#2E7D32', color: 'white', transform: 'translateY(-2px)' }}
          transition="all 0.25s ease"
          onClick={handleRetry}
        >
          🔄 Tentar novamente
        </Button>
      </VStack>
    )
  }

  /* ── Question screen ── */
  return (
    <Box>
      {/* Header */}
      <VStack textAlign="center" gap={2} mb={6}>
        <Text
          fontSize="56px"
          display="block"
          style={{ animation: 'floatIcon 3s ease-in-out infinite' }}
        >
          🧠
        </Text>
        <Text fontSize="clamp(1.6rem,4vw,2.2rem)" fontWeight="800" color="#1B5E20" lineHeight="1.2">
          Quiz de Aprendizagem
        </Text>
        <Text fontSize="1rem" color="gray.600" lineHeight="1.75">
          Teste o que você aprendeu! Responda as 5 perguntas abaixo sobre Fitossanidade.
        </Text>

        <Box w="full" mt={3}>
          <Progress.Root
            value={((currentQ + 1) / QUESTIONS.length) * 100}
            size="sm"
          >
            <Progress.Track borderRadius="full" h="8px" bg="gray.200">
              <Progress.Range
                style={{
                  background: 'linear-gradient(90deg, #2E7D32, #66BB6A)',
                  borderRadius: '999px',
                }}
              />
            </Progress.Track>
          </Progress.Root>
          <Text fontSize="0.75rem" color="#424242" fontWeight="600" textAlign="right" mt={1}>
            Pergunta {currentQ + 1} de {QUESTIONS.length}
          </Text>
        </Box>
      </VStack>

      {/* Question card */}
      <Box
        key={currentQ}
        bg="white"
        borderRadius="20px"
        p="28px 24px"
        boxShadow="0 8px 32px rgba(0,0,0,0.10)"
        border="1px solid rgba(46,125,50,0.1)"
        mb={5}
      >
        <Text fontSize="0.7rem" fontWeight="700" textTransform="uppercase" letterSpacing="0.1em" color="#2E7D32" mb={2}>
          Pergunta {currentQ + 1}
        </Text>
        <Text fontSize="1rem" fontWeight="700" color="#212121" lineHeight="1.5" mb={5}>
          {question.text}
        </Text>

        <VStack gap={2} align="stretch">
          {question.options.map((opt) => {
            const style = getOptionStyle(opt.id, selected, revealed, question.correctId)
            const isCorrectOpt = revealed && opt.id === question.correctId
            const isWrongOpt   = revealed && selected === opt.id && opt.id !== question.correctId

            return (
              <Button
                key={opt.id}
                id={`quiz-option-${currentQ}-${opt.id}`}
                w="full"
                display="flex"
                alignItems="center"
                gap={3}
                px={4} py={3}
                bg={style.bg}
                border={style.border}
                borderRadius="14px"
                cursor={revealed ? 'not-allowed' : 'pointer'}
                fontFamily="body"
                fontSize="0.85rem"
                fontWeight="500"
                color="#212121"
                textAlign="left"
                h="auto"
                justifyContent="flex-start"
                _hover={revealed ? {} : { borderColor: '#66BB6A', bg: '#E8F5E9', transform: 'translateX(4px)' }}
                transition="all 0.2s ease"
                disabled={revealed}
                aria-pressed={selected === opt.id}
                onClick={() => handleSelect(opt.id)}
              >
                <Box
                  w="28px" h="28px" borderRadius="50%"
                  bg={style.letterBg}
                  display="flex" alignItems="center" justifyContent="center"
                  fontSize="0.75rem" fontWeight="800"
                  color={style.letterColor}
                  flexShrink={0}
                  transition="all 0.2s ease"
                >
                  {opt.id.toUpperCase()}
                </Box>
                <Text flex="1" whiteSpace="normal" textAlign="left">{opt.text}</Text>
                {revealed && (
                  <Text ml="auto" fontSize="18px" flexShrink={0}>
                    {isCorrectOpt ? '✅' : isWrongOpt ? '❌' : ''}
                  </Text>
                )}
              </Button>
            )
          })}
        </VStack>

        {/* Explanation */}
        {revealed && (
          <HStack
            bg="#E8F5E9"
            border="1px solid rgba(46,125,50,0.2)"
            borderRadius="16px"
            p="20px 24px"
            mt={4}
            align="flex-start"
            gap={4}
          >
            <Text fontSize="28px" flexShrink={0} lineHeight="1" mt="2px">💡</Text>
            <Box>
              <Text display="block" fontSize="0.95rem" fontWeight="700" mb={1} color="#1B5E20">
                Explicação
              </Text>
              <Text fontSize="0.9rem" lineHeight="1.65" color="#212121">{question.explanation}</Text>
            </Box>
          </HStack>
        )}
      </Box>

      {/* Nav */}
      <HStack gap={3} flexWrap="wrap">
        {!revealed ? (
          <Button
            id="quiz-confirm-btn"
            flex="1"
            bg="linear-gradient(135deg, #2E7D32, #66BB6A)"
            color="white"
            borderRadius="14px"
            px={6} py={4}
            fontWeight="700"
            fontSize="0.9rem"
            boxShadow="0 2px 12px rgba(46,125,50,0.3)"
            _hover={!selected ? {} : { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(46,125,50,0.4)' }}
            disabled={!selected}
            opacity={!selected ? 0.5 : 1}
            cursor={!selected ? 'not-allowed' : 'pointer'}
            onClick={handleConfirm}
          >
            Confirmar resposta
          </Button>
        ) : (
          <Button
            id="quiz-next-btn"
            flex="1"
            bg="linear-gradient(135deg, #2E7D32, #66BB6A)"
            color="white"
            borderRadius="14px"
            px={6} py={4}
            fontWeight="700"
            fontSize="0.9rem"
            boxShadow="0 2px 12px rgba(46,125,50,0.3)"
            _hover={{ transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(46,125,50,0.4)' }}
            onClick={handleNext}
          >
            {isLast ? '🏁 Ver resultado' : 'Próxima pergunta →'}
          </Button>
        )}
      </HStack>
    </Box>
  )
}

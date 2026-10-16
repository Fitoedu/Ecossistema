'use client'

/**
 * DragAndDropSorter.tsx — EducaFito
 * ─────────────────────────────────────────────────────────────────────────────
 * Atividade interativa de classificação fitossanitária.
 *
 * O estudante distribui cartões de ações agrícolas em duas caixas:
 *   • Zona SEGURA  — práticas que protegem a lavoura
 *   • Zona de RISCO — ações que favorecem pragas e doenças
 *
 * Interação híbrida:
 *   1. Clique simples no cartão (seleção) + clique na zona (posicionamento)
 *   2. Arrastar com mouse ou toque (pointer drag via Framer Motion)
 *   3. Teclado: Tab para focar, Enter/Space para selecionar, depois Tab + Enter
 *      para mover para zona desejada
 *
 * Props:
 *  - cards?     : Array de SorterCard (usa DEFAULT_CARDS quando omitido)
 *  - safeLabel? : Rótulo da zona segura (padrão: "Práticas Seguras")
 *  - riskLabel? : Rótulo da zona de risco (padrão: "Riscos Fitossanitários")
 */

import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Box, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import { Avatar } from '../layout/Avatar'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SorterCard {
  id: string
  text: string
  /** 'safe' = prática recomendada | 'risk' = prática prejudicial */
  correct: 'safe' | 'risk'
  /** Breve explicação exibida após classificação */
  explanation: string
}

type Zone = 'safe' | 'risk'
type CardState = 'pool' | Zone

interface CardEntry extends SorterCard {
  state: CardState
  /** null = não classificado ainda; true/false = acertou/errou */
  verdict: boolean | null
}

export interface DragAndDropSorterProps {
  cards?: SorterCard[]
  safeLabel?: string
  riskLabel?: string
}

// ─── Dados padrão ─────────────────────────────────────────────────────────────

const DEFAULT_CARDS: SorterCard[] = [
  {
    id: 'c1',
    text: 'Usar sementes e mudas certificadas pelo MAPA',
    correct: 'safe',
    explanation:
      'Sementes certificadas garantem material livre de pragas e doenças desde o início do ciclo produtivo.',
  },
  {
    id: 'c2',
    text: 'Inspecionar a plantação regularmente em busca de sintomas',
    correct: 'safe',
    explanation:
      'O monitoramento precoce permite identificar infestações antes que se tornem epidemias.',
  },
  {
    id: 'c3',
    text: 'Lavar e desinfetar ferramentas antes de usá-las em outra área',
    correct: 'safe',
    explanation:
      'Ferramentas contaminadas são vetores eficientes de patógenos entre talhões e propriedades.',
  },
  {
    id: 'c4',
    text: 'Mover plantas doentes de uma região para outra sem inspeção',
    correct: 'risk',
    explanation:
      'O transporte de material vegetal infectado é uma das principais rotas de disseminação de pragas quarentenárias.',
  },
  {
    id: 'c5',
    text: 'Ignorar manchas e sintomas nas folhas até a colheita',
    correct: 'risk',
    explanation:
      'Sintomas precoces não tratados permitem que a praga se reproduza e contamine toda a lavoura.',
  },
  {
    id: 'c6',
    text: 'Usar ferramentas sujas provenientes de lavouras infectadas',
    correct: 'risk',
    explanation:
      'Implementos sem higienização são vetores mecânicos que dispersam fungos, bactérias e vírus.',
  },
]

// ─── Paletas de cor ───────────────────────────────────────────────────────────

const SAFE_PALETTE = {
  zone: 'rgba(46,125,50,0.12)',
  zoneBg: 'green.50',
  border: '#66BB6A',
  borderActive: '#2E7D32',
  header: '#2E7D32',
  headerBg: '#E8F5E9',
  badge: '#1B5E20',
  cardCorrect: '#E8F5E9',
  cardBorderCorrect: 'rgba(46,125,50,0.40)',
}

const RISK_PALETTE = {
  zone: 'rgba(230,81,0,0.12)',
  zoneBg: 'orange.50',
  border: '#FF9800',
  borderActive: '#E65100',
  header: '#BF360C',
  headerBg: '#FBE9E7',
  badge: '#BF360C',
  cardCorrect: '#FBE9E7',
  cardBorderCorrect: 'rgba(230,81,0,0.35)',
}

const CARD_ICONS: Record<string, string> = {
  c1: '🌾',
  c2: '🔍',
  c3: '🧰',
  c4: '🚚',
  c5: '🛑',
  c6: '🧼',
}

// ─── Utilitários ──────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function initCards(cards: SorterCard[]): CardEntry[] {
  return shuffle(cards).map((c) => ({ ...c, state: 'pool', verdict: null }))
}

// ─── SortableCard ─────────────────────────────────────────────────────────────

interface SortableCardProps {
  entry: CardEntry
  isSelected: boolean
  onSelect: () => void
  onDrop: (zone: Zone) => void
  /** Largura da zona segura e risco (para calcular destino do drag) */
  safeRef: React.RefObject<HTMLDivElement | null>
  riskRef: React.RefObject<HTMLDivElement | null>
}

function SortableCard({
  entry,
  isSelected,
  onSelect,
  onDrop,
  safeRef,
  riskRef,
}: SortableCardProps) {
  const isDone = entry.state !== 'pool'
  const isCorrect = entry.verdict === true
  const isWrong = entry.verdict === false

  /** Detecta em qual zona o elemento foi solto via coordenadas */
  function resolveDropZone(x: number, y: number): Zone | null {
    for (const [ref, zone] of [
      [safeRef, 'safe'] as const,
      [riskRef, 'risk'] as const,
    ]) {
      if (!ref.current) continue
      const r = ref.current.getBoundingClientRect()
      if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)
        return zone
    }
    return null
  }

  const cardBg = isDone
    ? isCorrect
      ? entry.correct === 'safe'
        ? SAFE_PALETTE.cardCorrect
        : RISK_PALETTE.cardCorrect
      : '#FFEBEE'
    : isSelected
    ? '#F3F8FF'
    : 'white'

  const cardBorder = isDone
    ? isCorrect
      ? entry.correct === 'safe'
        ? SAFE_PALETTE.cardBorderCorrect
        : RISK_PALETTE.cardBorderCorrect
      : 'rgba(198,40,40,0.45)'
    : isSelected
    ? 'brand.500'
    : 'rgba(0,0,0,0.10)'

  return (
    <motion.div
      layout
      drag={!isDone}
      dragSnapToOrigin
      dragMomentum={false}
      dragElastic={0.12}
      onDragEnd={(_, info) => {
        if (isDone) return
        const zone = resolveDropZone(info.point.x, info.point.y)
        if (zone) onDrop(zone)
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileDrag={{ scale: 1.04, boxShadow: '0 12px 36px rgba(0,0,0,0.18)', zIndex: 50 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{ touchAction: 'none', cursor: isDone ? 'default' : isSelected ? 'grab' : 'pointer' }}
    >
      <Box
        bg={cardBg}
        borderWidth={isSelected && !isDone ? '2px' : '1.5px'}
        borderStyle="solid"
        borderColor={cardBorder}
        borderRadius="14px"
        p={{ base: '12px 14px', sm: '14px 18px' }}
        boxShadow={
          isSelected
            ? 'md'
            : isDone
            ? '0 1px 4px rgba(0,0,0,0.06)'
            : '0 2px 10px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05)'
        }
        transition="background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.18s"
        _hover={!isDone && !isSelected ? {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.07)',
          borderColor: 'rgba(0,0,0,0.18)',
        } : {}}
        onClick={() => { if (!isDone) onSelect() }}
        onKeyDown={(e) => {
          if (!isDone && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault()
            onSelect()
          }
        }}
        role="button"
        aria-pressed={isSelected}
        aria-label={entry.text}
        tabIndex={isDone ? -1 : 0}
        _focusVisible={{ outline: '3px solid #1565C0', outlineOffset: '2px' }}
        userSelect="none"
      >
        {/* Indicador de estado no topo */}
        <Box display="flex" alignItems="flex-start" gap={2}>
        <Text
          as="span"
          fontSize="1.35rem"
          lineHeight="1.2"
          flexShrink={0}
          aria-hidden="true"
        >
          {CARD_ICONS[entry.id] ?? '🌱'}
        </Text>
          {/* Marcador de status */}
          <Box
            w="20px"
            h="20px"
            borderRadius="50%"
            flexShrink={0}
            mt="1px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg={
              isDone
                ? isCorrect
                  ? entry.correct === 'safe'
                    ? '#2E7D32'
                    : RISK_PALETTE.header
                  : '#C62828'
                : isSelected
                ? '#1565C0'
                : 'rgba(0,0,0,0.08)'
            }
            transition="background 0.2s"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
              {isDone ? (
                isCorrect ? (
                  <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                ) : (
                  <>
                    <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
                  </>
                )
              ) : isSelected ? (
                <circle cx="5" cy="5" r="2.5" fill="white" />
              ) : null}
            </svg>
          </Box>

          <Text
            fontSize={{ base: '0.82rem', sm: '0.85rem' }}
            fontWeight={isSelected ? '600' : '500'}
            color={isDone ? (isCorrect ? '#1a2e1a' : '#7F1D1D') : '#212121'}
            lineHeight="1.55"
          >
            {entry.text}
          </Text>
        </Box>

        {/* Explicação revelada após classificar */}
        <AnimatePresence>
          {isDone && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              <Box
                mt={2}
                pt={2}
                borderTop="1px solid rgba(0,0,0,0.08)"
                pl="28px"
              >
                <Text
                  fontSize="0.74rem"
                  color={isCorrect ? '#2E7D32' : '#C62828'}
                  lineHeight="1.6"
                  fontStyle="italic"
                >
                  {isWrong && (
                    <Text as="span" fontWeight="700" fontStyle="normal">
                      Resposta correta:{' '}
                    </Text>
                  )}
                  {entry.explanation}
                </Text>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    </motion.div>
  )
}

// ─── DropZone ─────────────────────────────────────────────────────────────────

interface DropZoneProps {
  zone: Zone
  label: string
  cards: CardEntry[]
  isTargeted: boolean // hover de drag sobre esta zona
  onClick: () => void
  zoneRef: React.RefObject<HTMLDivElement | null>
}

function DropZone({ zone, label, cards, isTargeted, onClick, zoneRef }: DropZoneProps) {
  const pal = zone === 'safe' ? SAFE_PALETTE : RISK_PALETTE
  const zoneCards = cards.filter((c) => c.state === zone)
  const correctCount = zoneCards.filter((c) => c.verdict === true).length

  return (
    <Box
      ref={zoneRef}
      minH="140px"
      bg={isTargeted ? pal.zone : pal.zoneBg}
      border={`2px dashed ${isTargeted ? pal.borderActive : pal.border}`}
      borderRadius="18px"
      p={{ base: 3, sm: 4 }}
      transition="background 0.2s, border-color 0.2s, box-shadow 0.2s"
      boxShadow={isTargeted ? `0 0 0 4px ${pal.zone}` : 'none'}
      cursor="pointer"
      onClick={onClick}
      role="button"
      aria-label={`Zona: ${label}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick() }
      }}
      _focusVisible={{ outline: `3px solid ${pal.borderActive}`, outlineOffset: '2px' }}
    >
      {/* Cabeçalho da zona */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={zoneCards.length > 0 ? 3 : 0}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Box
            w="8px"
            h="8px"
            borderRadius="50%"
            bg={pal.borderActive}
            flexShrink={0}
            aria-hidden="true"
          />
          <Text
            fontSize={{ base: '0.72rem', sm: '0.76rem' }}
            fontWeight="800"
            color={pal.header}
            textTransform="uppercase"
            letterSpacing="0.07em"
            lineHeight="1"
          >
            {zone === 'safe' ? '🛡️ ' : '⚠️ '}{label}
          </Text>
        </Box>
        {zoneCards.length > 0 && (
          <Box
            bg={pal.headerBg}
            borderRadius="999px"
            px="8px"
            py="2px"
          >
            <Text fontSize="0.65rem" fontWeight="700" color={pal.badge} lineHeight="1.6">
              {correctCount}/{zoneCards.length} correto{correctCount !== 1 ? 's' : ''}
            </Text>
          </Box>
        )}
      </Box>

      {/* Cards classificados nesta zona */}
      <VStack gap={2} align="stretch">
        {zoneCards.length === 0 && (
          <Text
            fontSize="0.75rem"
            color="gray.400"
            textAlign="center"
            py={4}
            fontStyle="italic"
            userSelect="none"
          >
            Arraste ou clique para soltar aqui
          </Text>
        )}
        {zoneCards.map((c) => (
          <Box
            key={c.id}
            bg={c.verdict === true
              ? zone === 'safe' ? SAFE_PALETTE.cardCorrect : RISK_PALETTE.cardCorrect
              : '#FFEBEE'}
            border={`1.5px solid ${
              c.verdict === true
                ? zone === 'safe' ? SAFE_PALETTE.cardBorderCorrect : RISK_PALETTE.cardBorderCorrect
                : 'rgba(198,40,40,0.4)'
            }`}
            borderRadius="12px"
            p="10px 14px"
          >
            <Box display="flex" alignItems="flex-start" gap="8px">
              <Text as="span" fontSize="1.15rem" lineHeight="1.2" flexShrink={0} aria-hidden="true">
                {CARD_ICONS[c.id] ?? '🌱'}
              </Text>
              <Box
                w="18px"
                h="18px"
                borderRadius="50%"
                flexShrink={0}
                mt="1px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg={c.verdict === true ? pal.borderActive : '#C62828'}
              >
                <svg width="9" height="9" viewBox="0 0 10 10" aria-hidden="true">
                  {c.verdict ? (
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  ) : (
                    <>
                      <line x1="2.5" y1="2.5" x2="7.5" y2="7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                      <line x1="7.5" y1="2.5" x2="2.5" y2="7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </Box>
              <Box>
                <Text fontSize="0.8rem" fontWeight="500" color="#212121" lineHeight="1.5">
                  {c.text}
                </Text>
                <Text fontSize="0.72rem" color={c.verdict ? pal.header : '#C62828'} lineHeight="1.55" mt="4px" fontStyle="italic">
                  {c.explanation}
                </Text>
              </Box>
            </Box>
          </Box>
        ))}
      </VStack>
    </Box>
  )
}

// ─── CompletionBanner ─────────────────────────────────────────────────────────

function CompletionBanner({ allCorrect, onReset }: { allCorrect: boolean; onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
    >
      <Box
        bg={allCorrect ? 'linear-gradient(135deg, #1B5E20, #2E7D32)' : 'linear-gradient(135deg, #BF360C, #E64A19)'}
        borderRadius="18px"
        p={{ base: '20px 18px', sm: '24px 28px' }}
        color="white"
        position="relative"
        overflow="hidden"
        mt={4}
      >
        {/* Círculo decorativo */}
        <Box
          position="absolute"
          w="140px"
          h="140px"
          borderRadius="50%"
          bg="rgba(255,255,255,0.06)"
          bottom="-50px"
          right="-30px"
          aria-hidden="true"
        />

        <Box display="flex" alignItems="center" gap={3} mb={3}>
          {allCorrect && (
            <motion.div
              initial={{ scale: 0.7, rotate: -8 }}
              animate={{ scale: [1, 1.08, 1], rotate: [0, 4, 0] }}
              transition={{ duration: 1.4, ease: 'easeInOut', repeat: 1 }}
              style={{ flexShrink: 0 }}
            >
              <Avatar src="/assets/dona-fito/dona-fito-celebrating.png" />
            </motion.div>
          )}
          <Box>
            <Text
              fontSize={{ base: '1rem', sm: '1.1rem' }}
              fontWeight="800"
              mb={1}
              letterSpacing="-0.01em"
            >
              {allCorrect ? 'Atividade concluída com sucesso!' : 'Quase lá — revise os itens em vermelho'}
            </Text>
            <Text fontSize={{ base: '0.82rem', sm: '0.86rem' }} opacity={0.9} lineHeight="1.65">
              {allCorrect
                ? 'A prevenção sempre vence o combate! Você classificou corretamente todas as práticas fitossanitárias.'
                : 'Alguns cartões foram classificados na zona incorreta. Leia as explicações em vermelho e tente novamente.'}
            </Text>
          </Box>
        </Box>
        <button
          onClick={onReset}
          style={{
            background: 'rgba(255,255,255,0.18)',
            border: '1.5px solid rgba(255,255,255,0.35)',
            borderRadius: '10px',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            padding: '8px 20px',
            cursor: 'pointer',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.28)')}
          onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)')}
        >
          Reiniciar atividade
        </button>
      </Box>
    </motion.div>
  )
}

// ─── DragAndDropSorter (exportação padrão) ────────────────────────────────────

export default function DragAndDropSorter({
  cards: cardsProp,
  safeLabel = 'Práticas Seguras',
  riskLabel = 'Riscos Fitossanitários',
}: DragAndDropSorterProps) {
  const source = cardsProp ?? DEFAULT_CARDS
  const [entries, setEntries] = useState<CardEntry[]>(() => initCards(source))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [dragOverZone, setDragOverZone] = useState<Zone | null>(null)

  const safeRef = useRef<HTMLDivElement>(null)
  const riskRef = useRef<HTMLDivElement>(null)

  const poolCards = entries.filter((e) => e.state === 'pool')
  const isDone = poolCards.length === 0
  const allCorrect = isDone && entries.every((e) => e.verdict === true)

  // ── Classificar cartão numa zona ──────────────────────────────────────────

  const classify = useCallback((cardId: string, zone: Zone) => {
    setEntries((prev) =>
      prev.map((e) =>
        e.id === cardId
          ? { ...e, state: zone, verdict: e.correct === zone }
          : e
      )
    )
    setSelectedId(null)
  }, [])

  // ── Selecionar via clique ─────────────────────────────────────────────────

  const handleSelect = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id))
  }, [])

  // ── Soltar na zona via clique na zona ─────────────────────────────────────

  const handleZoneClick = useCallback((zone: Zone) => {
    if (selectedId) classify(selectedId, zone)
  }, [selectedId, classify])

  // ── Drop via pointer drag ─────────────────────────────────────────────────

  const handleDrop = useCallback((cardId: string, zone: Zone) => {
    classify(cardId, zone)
  }, [classify])

  // ── Reiniciar ─────────────────────────────────────────────────────────────

  const reset = useCallback(() => {
    setEntries(initCards(source))
    setSelectedId(null)
    setDragOverZone(null)
  }, [source])

  return (
    <Box>
      {/* ── Instrução ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Box
          bg="#F8F9FA"
          border="1px solid rgba(0,0,0,0.08)"
          borderRadius="14px"
          p={{ base: '10px 14px', sm: '12px 18px' }}
          mb={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            bg="blue.50"
            border="1px solid"
            borderColor="blue.200"
            borderRadius="999px"
            px="14px"
            py="5px"
          >
            <Text fontSize="0.72rem" fontWeight="800" color="blue.800" lineHeight="1.4">
              Progresso: {entries.length - poolCards.length}/{entries.length} classificados
            </Text>
          </Box>
        </Box>
      </motion.div>

      {/* ── Pool de cartões não classificados ────────────────────────────── */}
      <AnimatePresence mode="popLayout">
        {poolCards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Box mb={4}>
              <Text
                fontSize="0.65rem"
                fontWeight="700"
                textTransform="uppercase"
                letterSpacing="0.1em"
                color="gray.500"
                mb={2}
              >
                Cartões para classificar — {poolCards.length} restante{poolCards.length !== 1 ? 's' : ''}
              </Text>
              <VStack gap={2} align="stretch">
                {poolCards.map((entry) => (
                  <SortableCard
                    key={entry.id}
                    entry={entry}
                    isSelected={selectedId === entry.id}
                    onSelect={() => handleSelect(entry.id)}
                    onDrop={(zone) => handleDrop(entry.id, zone)}
                    safeRef={safeRef}
                    riskRef={riskRef}
                  />
                ))}
              </VStack>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Zonas de classificação ────────────────────────────────────────── */}
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
        <DropZone
          zone="safe"
          label={safeLabel}
          cards={entries}
          isTargeted={dragOverZone === 'safe' || (selectedId !== null)}
          onClick={() => handleZoneClick('safe')}
          zoneRef={safeRef}
        />
        <DropZone
          zone="risk"
          label={riskLabel}
          cards={entries}
          isTargeted={dragOverZone === 'risk' || (selectedId !== null)}
          onClick={() => handleZoneClick('risk')}
          zoneRef={riskRef}
        />
      </SimpleGrid>

      {/* ── Banner de conclusão ───────────────────────────────────────────── */}
      <AnimatePresence>
        {isDone && (
          <CompletionBanner allCorrect={allCorrect} onReset={reset} />
        )}
      </AnimatePresence>
    </Box>
  )
}

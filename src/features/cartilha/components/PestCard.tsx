'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { Box, Text, VStack, HStack } from '@chakra-ui/react'

export type SeverityTag =
  | 'Praga Quarentenária'
  | 'Praga Regulamentada'
  | 'Alta Ameaça'
  | 'Risco Moderado'
  | 'Em Monitoramento'

export interface PestCardProps {
  emoji: string
  name: string
  scientificName?: string
  severity: SeverityTag
  description: string
  variant?: 'red' | 'amber' | 'green' | 'teal' | 'purple'
  impact: {
    headline: string
    items: { icon: string; text: string }[]
  }
  economicStat?: {
    value: string
    label: string
  }
}

const VARIANT_COLORS = {
  red:    { gradient: 'linear-gradient(135deg, #B71C1C, #C62828)', light: '#FFEBEE', border: '#EF5350', tag: '#C62828', tagBg: '#FFCDD2' },
  amber:  { gradient: 'linear-gradient(135deg, #E65100, #F57C00)', light: '#FFF3E0', border: '#FFA726', tag: '#E65100', tagBg: '#FFE0B2' },
  green:  { gradient: 'linear-gradient(135deg, #1B5E20, #2E7D32)', light: '#E8F5E9', border: '#66BB6A', tag: '#2E7D32', tagBg: '#C8E6C9' },
  teal:   { gradient: 'linear-gradient(135deg, #004D40, #00695C)', light: '#E0F2F1', border: '#26A69A', tag: '#00695C', tagBg: '#B2DFDB' },
  purple: { gradient: 'linear-gradient(135deg, #4A148C, #6A1B9A)', light: '#F3E5F5', border: '#CE93D8', tag: '#6A1B9A', tagBg: '#E1BEE7' },
}

const SEVERITY_COLORS: Record<SeverityTag, { bg: string; text: string }> = {
  'Praga Quarentenária': { bg: '#B71C1C', text: '#fff' },
  'Praga Regulamentada': { bg: '#E65100', text: '#fff' },
  'Alta Ameaça':         { bg: '#F57F17', text: '#212121' },
  'Risco Moderado':      { bg: '#1565C0', text: '#fff' },
  'Em Monitoramento':    { bg: '#2E7D32', text: '#fff' },
}

function useTilt(strength = 12) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-1, 1], [strength, -strength]), {
    stiffness: 200, damping: 20,
  })
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-strength, strength]), {
    stiffness: 200, damping: 20,
  })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    rawX.set(((e.clientX - rect.left) / rect.width) * 2 - 1)
    rawY.set(((e.clientY - rect.top) / rect.height) * 2 - 1)
  }, [rawX, rawY])

  const handleMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
  }, [rawX, rawY])

  return { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave }
}

function FrontFace({
  emoji,
  name,
  scientificName,
  severity,
  description,
  variant,
  onFlip,
}: PestCardProps & { onFlip: () => void }) {
  const colors = VARIANT_COLORS[variant ?? 'red']
  const sevColors = SEVERITY_COLORS[severity]
  const { ref, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
      }}
    >
      <Box
        h="full"
        borderRadius="22px"
        overflow="hidden"
        bg="white"
        border={`2px solid ${colors.border}55`}
        boxShadow={`0 12px 40px rgba(0,0,0,0.14), 0 4px 12px rgba(0,0,0,0.08), 0 0 0 1px ${colors.border}22`}
        display="flex"
        flexDir="column"
      >
        <Box
          bg={colors.gradient}
          py="28px"
          px="24px"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          position="relative"
          overflow="hidden"
          gap={2}
          flex="0 0 auto"
        >
          <Box
            position="absolute"
            w="160px"
            h="160px"
            borderRadius="50%"
            bg="rgba(255,255,255,0.07)"
            bottom="-50px"
            right="-40px"
            aria-hidden="true"
          />
          <Box
            position="absolute"
            top="14px"
            right="14px"
            bg={sevColors.bg}
            color={sevColors.text}
            fontSize="0.6rem"
            fontWeight="800"
            px="10px"
            py="4px"
            borderRadius="999px"
            letterSpacing="0.06em"
            textTransform="uppercase"
            boxShadow="0 2px 8px rgba(0,0,0,0.25)"
          >
            {severity}
          </Box>

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
            style={{ fontSize: '64px', lineHeight: '1', filter: 'drop-shadow(0 6px 14px rgba(0,0,0,0.3))' }}
            aria-hidden="true"
          >
            {emoji}
          </motion.div>
        </Box>

        <VStack gap={2} p="20px 22px" align="flex-start" flex="1">
          <Box>
            <Text
              fontSize="1.05rem"
              fontWeight="800"
              color="#1a1a1a"
              lineHeight="1.25"
              letterSpacing="-0.01em"
            >
              {name}
            </Text>
            {scientificName && (
              <Text fontSize="0.72rem" color="#888" fontStyle="italic" mt="2px">
                {scientificName}
              </Text>
            )}
          </Box>
          <Text fontSize="0.82rem" color="#444" lineHeight="1.65" flex="1">
            {description}
          </Text>
        </VStack>

        <Box px="22px" pb="18px" pt={0}>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onFlip}
            type="button"
            style={{
              width: '100%',
              background: colors.gradient,
              border: 'none',
              borderRadius: '12px',
              padding: '11px 20px',
              cursor: 'pointer',
              color: 'white',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              letterSpacing: '0.01em',
              boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            }}
          >
            <span aria-hidden="true">📊</span>
            Ver Impacto
            <span aria-hidden="true" style={{ marginLeft: '2px' }}>→</span>
          </motion.button>
        </Box>
      </Box>
    </motion.div>
  )
}

function BackFace({
  emoji,
  name,
  variant,
  impact,
  economicStat,
  onFlip,
}: PestCardProps & { onFlip: () => void }) {
  const colors = VARIANT_COLORS[variant ?? 'red']

  return (
    <motion.div
      style={{
        position: 'absolute',
        inset: 0,
        backfaceVisibility: 'hidden',
        rotateY: 180,
      }}
    >
      <Box
        h="full"
        borderRadius="22px"
        overflow="hidden"
        bg={colors.light}
        border={`2px solid ${colors.border}66`}
        boxShadow="0 12px 40px rgba(0,0,0,0.14)"
        display="flex"
        flexDir="column"
      >
        <Box
          bg={colors.gradient}
          px={5}
          py={4}
          display="flex"
          alignItems="center"
          gap={3}
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            w="100px"
            h="100px"
            borderRadius="50%"
            bg="rgba(255,255,255,0.07)"
            bottom="-35px"
            right="-20px"
            aria-hidden="true"
          />
          <Text fontSize="32px" aria-hidden="true" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))' }}>
            {emoji}
          </Text>
          <Box>
            <Text fontSize="0.65rem" fontWeight="700" textTransform="uppercase"
              letterSpacing="0.08em" color="rgba(255,255,255,0.75)">
              Impacto Econômico
            </Text>
            <Text fontSize="0.95rem" fontWeight="800" color="white" lineHeight="1.25">
              {name}
            </Text>
          </Box>
        </Box>

        <VStack gap={3} p="18px 22px" align="stretch" flex="1" overflowY="auto">
          {economicStat && (
            <Box
              bg={colors.gradient}
              borderRadius="14px"
              p="14px 18px"
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Box>
                <Text fontSize="1.6rem" fontWeight="900" color="white" lineHeight="1">
                  {economicStat.value}
                </Text>
                <Text fontSize="0.72rem" color="rgba(255,255,255,0.85)" lineHeight="1.4">
                  {economicStat.label}
                </Text>
              </Box>
            </Box>
          )}

          <Text fontSize="0.78rem" fontWeight="700" color={colors.tag} textTransform="uppercase"
            letterSpacing="0.06em">
            {impact.headline}
          </Text>

          {impact.items.map((item, i) => (
            <HStack
              key={i}
              gap={3}
              align="flex-start"
              bg="rgba(255,255,255,0.65)"
              borderRadius="12px"
              p="10px 14px"
              border={`1px solid ${colors.border}44`}
            >
              <Text fontSize="18px" flexShrink={0} mt="1px" aria-hidden="true">{item.icon}</Text>
              <Text fontSize="0.8rem" color="#212121" lineHeight="1.6">{item.text}</Text>
            </HStack>
          ))}
        </VStack>

        <Box px="22px" pb="18px" pt="8px">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onFlip}
            type="button"
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.7)',
              border: `1.5px solid ${colors.border}`,
              borderRadius: '12px',
              padding: '11px 20px',
              cursor: 'pointer',
              color: colors.tag,
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}
          >
            <span aria-hidden="true">←</span>
            Voltar
          </motion.button>
        </Box>
      </Box>
    </motion.div>
  )
}

export default function PestCard(props: PestCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <Box
      position="relative"
      w="full"
      minH="380px"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 160, damping: 22 }}
        style={{
          transformStyle: 'preserve-3d',
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: '380px',
        }}
      >
        <FrontFace {...props} onFlip={() => setIsFlipped(true)} />
        <BackFace  {...props} onFlip={() => setIsFlipped(false)} />
      </motion.div>
    </Box>
  )
}

export function PestCardGrid({ cards }: { cards: PestCardProps[] }) {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      gap={5}
      my={6}
    >
      {cards.map((card) => (
        <PestCard key={card.name} {...card} />
      ))}
    </Box>
  )
}

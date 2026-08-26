'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Grid, Text, HStack, VStack } from '@chakra-ui/react'

export interface Flap {
  id: string
  frontEmoji: string
  frontText: string
  backContent: string
  backAccent?: 'green' | 'yellow' | 'red' | 'teal'
}

interface LiftTheFlapProps {
  title: string
  subtitle?: string
  flaps: Flap[]
  columns?: 2 | 3
  direction?: 'top' | 'left' | 'right' | 'bottom'
}

const ACCENT: Record<
  NonNullable<Flap['backAccent']>,
  { bg: string; border: string; badgeBg: string; badgeText: string }
> = {
  green:  { bg: 'linear-gradient(145deg,#E8F5E9,#F1F8E9)', border: '#66BB6A', badgeBg: '#2E7D32', badgeText: '#fff' },
  yellow: { bg: 'linear-gradient(145deg,#FFF9C4,#FFFDE7)', border: '#FBC02D', badgeBg: '#F57F17', badgeText: '#fff' },
  red:    { bg: 'linear-gradient(145deg,#FFEBEE,#FCE4EC)', border: '#EF9A9A', badgeBg: '#C62828', badgeText: '#fff' },
  teal:   { bg: 'linear-gradient(145deg,#E0F2F1,#E8F5E9)', border: '#26A69A', badgeBg: '#00695C', badgeText: '#fff' },
}

function getFoldParams(direction: NonNullable<LiftTheFlapProps['direction']>) {
  switch (direction) {
    case 'top':    return { origin: 'top center',    axisKey: 'rotateX' as const, angle: -110 }
    case 'bottom': return { origin: 'bottom center', axisKey: 'rotateX' as const, angle:  110 }
    case 'left':   return { origin: 'center left',   axisKey: 'rotateY' as const, angle:  110 }
    case 'right':  return { origin: 'center right',  axisKey: 'rotateY' as const, angle: -110 }
  }
}

const PAPER_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`

function FlapCard({
  flap,
  isOpen,
  onToggle,
  direction,
}: {
  flap: Flap
  isOpen: boolean
  onToggle: () => void
  direction: NonNullable<LiftTheFlapProps['direction']>
}) {
  const accent = ACCENT[flap.backAccent ?? 'green']
  const { origin, axisKey, angle } = getFoldParams(direction)

  const animateVariant = isOpen
    ? { [axisKey]: angle, opacity: 0 }
    : { [axisKey]: 0, opacity: 1 }

  return (
    <Box
      position="relative"
      borderRadius="20px"
      overflow="visible"
      style={{ perspective: '900px' }}
      role="listitem"
    >
      <Box
        position="absolute"
        inset="0"
        borderRadius="20px"
        bg={accent.bg}
        border={`2px solid ${accent.border}`}
        boxShadow="inset 0 2px 12px rgba(0,0,0,0.06)"
        zIndex={0}
        overflow="hidden"
      >
        <Box
          position="absolute"
          inset="0"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />
        <VStack
          gap={3}
          align="flex-start"
          p="20px 22px 24px"
          position="relative"
          zIndex={1}
          h="full"
          justify="flex-start"
        >
          <Box
            display="inline-flex"
            alignItems="center"
            gap="6px"
            bg={accent.badgeBg}
            color={accent.badgeText}
            fontSize="0.65rem"
            fontWeight="700"
            px="10px"
            py="3px"
            borderRadius="999px"
            letterSpacing="0.05em"
            textTransform="uppercase"
          >
            {flap.frontEmoji} Resposta
          </Box>
          <Text
            fontSize="0.88rem"
            fontWeight="400"
            color="#1a1a1a"
            lineHeight="1.75"
          >
            {flap.backContent}
          </Text>
        </VStack>
      </Box>

      <motion.div
        initial={false}
        animate={animateVariant}
        transition={{ type: 'spring', stiffness: 180, damping: 22, mass: 0.9 }}
        style={{
          transformOrigin: origin,
          transformStyle: 'preserve-3d',
          position: 'relative',
          zIndex: isOpen ? 0 : 2,
          pointerEvents: isOpen ? 'none' : 'auto',
        }}
      >
        <button
          id={`ltf-btn-${flap.id}`}
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`ltf-region-${flap.id}`}
          type="button"
          style={{
            width: '100%',
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: 'pointer',
            display: 'block',
          }}
        >
          <Box
            borderRadius="20px"
            overflow="hidden"
            border={`2px solid ${isOpen ? accent.border : 'rgba(46,125,50,0.18)'}`}
            boxShadow="0 8px 28px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08)"
            bg="white"
            style={{ backgroundImage: PAPER_TEXTURE }}
            transition="border-color 0.25s ease"
          >
            <Box
              bg="linear-gradient(135deg, #2E7D32, #43A047)"
              px={5}
              py={4}
              display="flex"
              alignItems="center"
              gap={3}
              _hover={{ bg: 'linear-gradient(135deg, #245c27, #2E7D32)' }}
              transition="background 0.25s ease"
            >
              <Text
                fontSize="30px"
                lineHeight="1"
                flexShrink={0}
                aria-hidden="true"
                style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))' }}
              >
                {flap.frontEmoji}
              </Text>
              <Text
                flex="1"
                fontSize="0.88rem"
                fontWeight="700"
                color="white"
                lineHeight="1.4"
                letterSpacing="-0.01em"
                textAlign="left"
              >
                {flap.frontText}
              </Text>
              <Box
                display="flex"
                flexDir="column"
                gap="3px"
                alignItems="center"
                flexShrink={0}
                opacity={0.7}
                aria-hidden="true"
              >
                <Box w="14px" h="2px" bg="white" borderRadius="2px" />
                <Box w="10px" h="2px" bg="white" borderRadius="2px" />
                <Box w="6px" h="2px" bg="white" borderRadius="2px" />
              </Box>
            </Box>

            <Box
              px={5}
              py={3}
              display="flex"
              alignItems="center"
              gap={2}
              bg="rgba(255,255,255,0.92)"
            >
              <Text fontSize="14px" color="#2E7D32" flexShrink={0} aria-hidden="true">
                👆
              </Text>
              <Text fontSize="0.74rem" color="#5c746d" fontWeight="500" fontStyle="italic">
                Clique para levantar a aba
              </Text>
            </Box>
          </Box>
        </button>
      </motion.div>

      <Box
        id={`ltf-region-${flap.id}`}
        role="region"
        aria-labelledby={`ltf-btn-${flap.id}`}
        aria-hidden={!isOpen}
        style={{ minHeight: '110px', pointerEvents: 'none' }}
      />
    </Box>
  )
}

export default function LiftTheFlap({
  title,
  subtitle = 'Clique em cada aba para descobrir o conteúdo!',
  flaps,
  columns = 2,
  direction = 'top',
}: LiftTheFlapProps) {
  const [openIds, setOpenIds] = useState<string[]>([])

  const toggle = (id: string) => {
    setOpenIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    )
  }

  return (
    <Box w="full">
      <HStack
        aria-hidden="true"
        bg="rgba(46,125,50,0.07)"
        border="1px solid rgba(46,125,50,0.18)"
        borderRadius="16px"
        p="14px 20px"
        mb={5}
        align="flex-start"
        gap={3}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          left={0}
          top={0}
          bottom={0}
          w="4px"
          bg="linear-gradient(to bottom, #2E7D32, #66BB6A)"
          borderRadius="4px 0 0 4px"
        />
        <Text fontSize="22px" flexShrink={0} mt="1px" aria-hidden="true">
          🎴
        </Text>
        <Box flex="1">
          <Text fontSize="0.82rem" fontWeight="600" color="#1B5E20" lineHeight="1.55">
            {subtitle}
          </Text>
          <Text fontSize="0.72rem" color="#5c746d" mt={1}>
            {openIds.length} de {flaps.length} abas reveladas
          </Text>
        </Box>
      </HStack>

      <Grid
        templateColumns={{ base: '1fr', sm: `repeat(${columns}, minmax(0, 1fr))` }}
        gap={5}
        role="list"
        aria-label={title}
      >
        {flaps.map((flap) => (
          <FlapCard
            key={flap.id}
            flap={flap}
            isOpen={openIds.includes(flap.id)}
            onToggle={() => toggle(flap.id)}
            direction={direction}
          />
        ))}
      </Grid>

      <AnimatePresence>
        {openIds.length > 0 && (
          <motion.div
            key="hint"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.34, 1.2, 0.64, 1] }}
          >
            <Box
              mt={5}
              bg="linear-gradient(135deg,#E8F5E9,#F1F8E9)"
              border="1.5px solid rgba(46,125,50,0.25)"
              borderRadius="16px"
              px={5}
              py={3}
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Text fontSize="20px" aria-hidden="true">🌿</Text>
              <Text fontSize="0.82rem" color="#2E7D32" fontWeight="600" lineHeight="1.55">
                Clique em outra aba para comparar, ou na mesma para fechar!
              </Text>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

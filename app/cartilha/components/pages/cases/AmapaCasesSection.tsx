'use client'

/**
 * AmapaCasesSection.tsx — EducaFito
 * Seção "Casos Reais do Amapá" — Paleta Botânica Clara (Light Mode).
 * Efeito Antigravity 3D mantido; tema escuro completamente removido.
 */

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Box, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import AmapaCaseCard from './AmapaCaseCard'
import AmapaDossierModal from './AmapaDossierModal'
import { AMAPA_CASES, type AmapaCaseData } from '../../../data/amapa-cases-data'

/* ─── Partículas botânicas decorativas (substituem as estrelas escuras) ────── */

function BotanicParticles() {
  const dots = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    top: `${((i * 41) % 95) + 2}%`,
    left: `${((i * 67) % 95) + 2}%`,
    size: i % 4 === 0 ? 6 : i % 3 === 0 ? 4 : 3,
    delay: (i * 0.25) % 2.5,
    color: i % 3 === 0
      ? 'rgba(46, 125, 50, 0.18)'
      : i % 3 === 1
        ? 'rgba(139, 195, 74, 0.14)'
        : 'rgba(245, 127, 23, 0.12)',
  }))

  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none" aria-hidden="true">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          style={{
            position: 'absolute',
            top: dot.top,
            left: dot.left,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: dot.color,
          }}
          animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 3 + dot.delay,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: dot.delay,
          }}
        />
      ))}
    </Box>
  )
}

/* ─── Header da seção ─────────────────────────────────────────────────────── */

function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <VStack align="center" gap={3} mb={{ base: 7, sm: 9 }} textAlign="center">
        {/* Título */}
        <Text
          as="h2"
          fontSize="clamp(1.5rem, 4.5vw, 2.2rem)"
          fontWeight="900"
          color="green.900"
          lineHeight="1.18"
          letterSpacing="-0.025em"
        >
          Casos Reais do{' '}
          <Box
            as="span"
            color="green.700"
            borderBottom="3px solid"
            borderColor="green.300"
            pb="1px"
          >
            Amapá
          </Box>
        </Text>

        {/* Subtítulo */}
        <Text
          maxW="500px"
          fontSize={{ base: '0.85rem', sm: '0.92rem' }}
          color="gray.600"
          lineHeight="1.7"
        >
          Pragas e doenças reais que ameaçam a agricultura familiar e as
          exportações do estado. Clique em cada dossiê para investigar.
        </Text>

        {/* Linha decorativa verde */}
        <Box
          w="64px"
          h="3px"
          borderRadius="full"
          bg="linear-gradient(90deg, #2E7D32, #66BB6A)"
          aria-hidden="true"
        />
      </VStack>
    </motion.div>
  )
}

/* ─── Componente Principal ────────────────────────────────────────────────── */

export default function AmapaCasesSection() {
  const [selectedCase, setSelectedCase] = useState<AmapaCaseData | null>(null)

  return (
    <Box
      position="relative"
      py={{ base: 6, sm: 8 }}
      px={{ base: 3, sm: 4 }}
      borderRadius="24px"
      overflow="hidden"
      /* Fundo claro botânico com glassmorphism */
      bg="rgba(255, 255, 255, 0.88)"
      border="1px solid"
      borderColor="green.200"
      style={{
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow:
          '0 4px 24px rgba(46, 125, 50, 0.07), 0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      {/* Partículas botânicas decorativas */}
      <BotanicParticles />

      {/* Brilhos de fundo suaves */}
      <Box
        position="absolute"
        top="-30%"
        left="-15%"
        w="55%"
        h="55%"
        borderRadius="50%"
        style={{
          background:
            'radial-gradient(circle, rgba(200, 230, 201, 0.35) 0%, transparent 70%)',
        }}
        pointerEvents="none"
        aria-hidden="true"
      />
      <Box
        position="absolute"
        bottom="-25%"
        right="-10%"
        w="45%"
        h="45%"
        borderRadius="50%"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 224, 178, 0.25) 0%, transparent 70%)',
        }}
        pointerEvents="none"
        aria-hidden="true"
      />

      {/* Conteúdo */}
      <Box position="relative" zIndex={1}>
        <SectionHeader />

        <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 5, sm: 6 }}>
          {AMAPA_CASES.map((caseData, idx) => (
            <AmapaCaseCard
              key={caseData.id}
              item={caseData}
              onOpenDossier={setSelectedCase}
              enterDelay={idx * 0.18}
            />
          ))}
        </SimpleGrid>
      </Box>

      {/* Modal de Dossiê */}
      <AmapaDossierModal
        item={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </Box>
  )
}

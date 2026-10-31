'use client'

/**
 * AmapaCaseCard.tsx — EducaFito
 * Card flutuante (efeito Antigravity 3D) — Paleta Botânica Clara (Light Mode).
 * Animações Framer Motion mantidas; tema escuro completamente removido.
 */

import Image from 'next/image'
import { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Box, Text, HStack } from '@chakra-ui/react'
import { ShieldAlert, Search, MapPin } from 'lucide-react'
import type { AmapaCaseData } from '../../../data/amapa-cases-data'
import { getThreatLabel } from '../../../data/amapa-cases-data'

/* ─── Paleta light dos níveis de ameaça ──────────────────────────────────── */

/** Cores semânticas para badges/bordas por nível de ameaça.
 *  O botão "Abrir Dossiê" é sempre verde botânico em todos os casos
 *  para harmonizar com o design system da cartilha EducaFito. */
function getLightColors(level: AmapaCaseData['threatLevel']) {
  // Botão verde botânico — igual ao padrão da cartilha — aplicado a todos os níveis
  const btn = {
    btnBg: 'linear-gradient(135deg, #2E7D32 0%, #388E3C 60%, #66BB6A 100%)',
    btnHoverBg: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
    btnTextColor: 'white',
  }

  if (level === 'quarentenaria') {
    return {
      ...btn,
      badgeBg: '#FFF1F2',
      badgeBorder: '#FECDD3',
      badgeText: '#BE123C',
      cardBorder: '#FECDD3',
      cardHoverBorder: '#FDA4AF',
      cardHoverShadow:
        '0 20px 48px rgba(225, 29, 72, 0.11), 0 4px 12px rgba(225, 29, 72, 0.07)',
      accentLine: 'linear-gradient(90deg, #FECDD3, #FB7185, #FECDD3)',
    }
  }
  if (level === 'alerta-critico') {
    return {
      ...btn,
      badgeBg: '#FFFBEB',
      badgeBorder: '#FDE68A',
      badgeText: '#92400E',
      cardBorder: '#FDE68A',
      cardHoverBorder: '#FCD34D',
      cardHoverShadow:
        '0 20px 48px rgba(251, 192, 45, 0.14), 0 4px 12px rgba(251, 192, 45, 0.08)',
      accentLine: 'linear-gradient(90deg, #FDE68A, #FBC02D, #FDE68A)',
    }
  }
  // Monitorada — verde botânico pleno
  return {
    ...btn,
    badgeBg: '#F0FDF4',
    badgeBorder: '#BBF7D0',
    badgeText: '#15803D',
    cardBorder: '#BBF7D0',
    cardHoverBorder: '#4ADE80',
    cardHoverShadow:
      '0 20px 48px rgba(22, 163, 74, 0.12), 0 4px 12px rgba(22, 163, 74, 0.07)',
    accentLine: 'linear-gradient(90deg, #BBF7D0, #4ADE80, #BBF7D0)',
  }
}

/* ─── Subcomponente: Imagem com fallback ─────────────────────────────────── */

function CardImage({ item }: { item: AmapaCaseData }) {
  const [hasError, setHasError] = useState(false)
  const lc = getLightColors(item.threatLevel)

  if (hasError) {
    return (
      <Box
        w="full"
        h="full"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        bg={lc.badgeBg}
      >
        <MapPin size={36} color={lc.badgeText} aria-hidden="true" />
        <Text fontSize="0.7rem" fontWeight="700" color={lc.badgeText} textAlign="center" px={4}>
          {item.name}
        </Text>
      </Box>
    )
  }

  return (
    <Image
      src={item.cardImageSrc}
      alt={item.cardImageAlt}
      fill
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      style={{ objectFit: 'cover' }}
      onError={() => setHasError(true)}
    />
  )
}

/* ─── Badge de nível de ameaça ───────────────────────────────────────────── */

function ThreatBadge({ item }: { item: AmapaCaseData }) {
  const lc = getLightColors(item.threatLevel)

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap="5px"
      px={2.5}
      py={1}
      borderRadius="full"
      bg={lc.badgeBg}
      border="1px solid"
      borderColor={lc.badgeBorder}
      color={lc.badgeText}
      fontSize="0.6rem"
      fontWeight="900"
      letterSpacing="0.06em"
      textTransform="uppercase"
    >
      <ShieldAlert size={11} aria-hidden="true" />
      <span>{getThreatLabel(item.threatLevel)}</span>
    </Box>
  )
}

/* ─── Card Principal ─────────────────────────────────────────────────────── */

interface AmapaCaseCardProps {
  item: AmapaCaseData
  onOpenDossier: (item: AmapaCaseData) => void
  enterDelay?: number
}

export default function AmapaCaseCard({
  item,
  onOpenDossier,
  enterDelay = 0,
}: AmapaCaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const lc = getLightColors(item.threatLevel)

  /* ── Parallax 3D no hover ── */
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const springCfg = { stiffness: 240, damping: 22 }
  const springX = useSpring(rawX, springCfg)
  const springY = useSpring(rawY, springCfg)
  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg'])

  const [isHovered, setIsHovered] = useState(false)

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handleMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    setIsHovered(false)
  }

  return (
    /* Wrapper de levitação contínua (Antigravity) */
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: [0, -8, 0] }}
      transition={{
        opacity: { duration: 0.5, delay: enterDelay },
        y: {
          duration: 4.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: enterDelay * 0.5,
        },
      }}
      style={{ perspective: '1200px' }}
    >
      {/* Card com 3D no hover */}
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        animate={isHovered ? { scale: 1.04 } : { scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <Box
          position="relative"
          borderRadius="22px"
          overflow="hidden"
          bg="white"
          border="1.5px solid"
          borderColor={isHovered ? lc.cardHoverBorder : lc.cardBorder}
          boxShadow={
            isHovered
              ? lc.cardHoverShadow
              : '0 4px 16px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)'
          }
          style={{ transition: 'box-shadow 0.3s ease, border-color 0.3s ease' }}
          cursor="pointer"
          role="button"
          tabIndex={0}
          aria-label={`Abrir Dossiê de ${item.name}`}
          onClick={() => onOpenDossier(item)}
          onKeyDown={(e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onOpenDossier(item)
            }
          }}
          _focusVisible={{
            outline: '3px solid',
            outlineColor: lc.cardHoverBorder,
            outlineOffset: '3px',
          }}
        >
          {/* ── Área da imagem ── */}
          <Box position="relative" h={{ base: '210px', sm: '250px' }} w="full" bg="gray.100">
            <CardImage item={item} />

            {/* Badges sobrepostos — sem overlay de texto sobre a imagem */}
            <Box position="absolute" top={3} left={3}>
              <ThreatBadge item={item} />
            </Box>

            <Box
              position="absolute"
              top={3}
              right={3}
              display="flex"
              alignItems="center"
              gap="4px"
              px={2}
              py={1}
              borderRadius="8px"
              bg="rgba(255,255,255,0.88)"
              border="1px solid rgba(0,0,0,0.06)"
              color="gray.700"
              fontSize="0.58rem"
              fontWeight="800"
              letterSpacing="0.08em"
              textTransform="uppercase"
              boxShadow="0 1px 4px rgba(0,0,0,0.08)"
            >
              <MapPin size={9} color="#2E7D32" aria-hidden="true" />
              Amapá
            </Box>
          </Box>

          {/* ── Rodapé do card (fundo branco) ── */}
          <Box px={4} pt={3} pb={4} bg="white">
            {/* Nome científico para leitores sem imagem */}
            <HStack justify="space-between" align="center" mb={3}>
              <Box>
                <Text fontSize="0.9rem" fontWeight="800" color="gray.800" lineHeight="1.2">
                  {item.name}
                </Text>
                <Text fontSize="0.72rem" color="gray.500" fontStyle="italic">
                  {item.scientificName}
                </Text>
              </Box>
            </HStack>

            {/* Linha decorativa colorida */}
            <Box
              h="2px"
              mb={3}
              borderRadius="full"
              style={{ background: lc.accentLine }}
              aria-hidden="true"
            />

            {/* Botão "Abrir Dossiê" */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '10px 16px',
                borderRadius: '12px',
                border: 'none',
                background: lc.btnBg,
                color: lc.btnTextColor,
                fontSize: '0.78rem',
                fontWeight: '900',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
              }}
              onClick={() => onOpenDossier(item)}
              aria-label={`Abrir dossiê de ${item.name}`}
            >
              <Search size={14} aria-hidden="true" />
              Abrir Dossiê Investigativo
            </motion.button>
          </Box>
        </Box>
      </motion.div>
    </motion.div>
  )
}

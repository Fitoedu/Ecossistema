'use client'

/**
 * MascotSpeech.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Balão de fala pedagógico do mascote EducaFito.
 *
 * Exibe o Avatar ao lado de um balão de fala/provocação com animação de
 * entrada via Framer Motion. Totalmente responsivo (horizontal em telas
 * grandes, vertical em mobile).
 *
 * Props:
 *  - speech        : Texto da fala (suporta ReactNode para marcações)
 *  - avatarSrc?    : Caminho da imagem do avatar (padrão: Dona Fito)
 *  - avatarName?   : Nome exibido sob o avatar
 *  - avatarSide?   : 'left' | 'right' (padrão: 'left')
 *  - variant?      : 'default' | 'question' | 'alert'
 *  - delay?        : Atraso da animação de entrada em segundos (padrão: 0)
 */

import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { Avatar } from './Avatar'

// ─── Types ────────────────────────────────────────────────────────────────────

export type MascotSpeechVariant = 'default' | 'question' | 'alert'

export interface MascotSpeechProps {
  speech: React.ReactNode
  avatarSrc?: string
  avatarName?: string
  avatarSide?: 'left' | 'right'
  variant?: MascotSpeechVariant
  delay?: number
}

// ─── Design tokens por variante ───────────────────────────────────────────────

const VARIANT_STYLES: Record<
  MascotSpeechVariant,
  {
    bubbleBg: string
    bubbleBorder: string
    bubblePointerColor: string
    nameTagBg: string
    nameTagColor: string
    topAccentGradient: string
    labelText: string
    labelColor: string
  }
> = {
  default: {
    bubbleBg: '#F1F8E9',
    bubbleBorder: 'rgba(46,125,50,0.16)',
    bubblePointerColor: '#F1F8E9',
    nameTagBg: '#E8F5E9',
    nameTagColor: '#1B5E20',
    topAccentGradient: 'linear-gradient(90deg, #2E7D32, #66BB6A, #A5D6A7)',
    labelText: '',
    labelColor: '#2E7D32',
  },
  question: {
    bubbleBg: '#FFFDE7',
    bubbleBorder: 'rgba(251,192,45,0.28)',
    bubblePointerColor: '#FFFDE7',
    nameTagBg: '#FFF9C4',
    nameTagColor: '#E65100',
    topAccentGradient: 'linear-gradient(90deg, #F57F17, #FBC02D, #FFF176)',
    labelText: 'Reflita',
    labelColor: '#E65100',
  },
  alert: {
    bubbleBg: '#FFF3E0',
    bubbleBorder: 'rgba(230,81,0,0.20)',
    bubblePointerColor: '#FFF3E0',
    nameTagBg: '#FFE0B2',
    nameTagColor: '#BF360C',
    topAccentGradient: 'linear-gradient(90deg, #E64A19, #FF7043, #FFAB91)',
    labelText: 'Atenção',
    labelColor: '#BF360C',
  },
}

// ─── Triângulo apontador do balão ─────────────────────────────────────────────

function BubblePointer({
  side,
  color,
}: {
  side: 'left' | 'right'
  color: string
}) {
  const isLeft = side === 'left'

  return (
    <Box
      position="absolute"
      top="18px"
      {...(isLeft
        ? { left: '-11px', borderRight: `12px solid ${color}`, borderLeft: 'none' }
        : { right: '-11px', borderLeft: `12px solid ${color}`, borderRight: 'none' })}
      w={0}
      h={0}
      borderTop="7px solid transparent"
      borderBottom="7px solid transparent"
      aria-hidden="true"
    />
  )
}

// ─── MascotSpeech ─────────────────────────────────────────────────────────────

export default function MascotSpeech({
  speech,
  avatarSrc = '/assets/dona_fito_meio_corpo.png',
  avatarName = 'Dona Fito',
  avatarSide = 'left',
  variant = 'default',
  delay = 0,
}: MascotSpeechProps) {
  const styles = VARIANT_STYLES[variant]
  const isRight = avatarSide === 'right'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 24,
        delay,
      }}
      style={{ width: '100%' }}
    >
      <Box
        display="flex"
        flexDirection={{
          base: 'column',
          sm: isRight ? 'row-reverse' : 'row',
        }}
        alignItems={{ base: 'flex-start', sm: 'flex-start' }}
        gap={{ base: 3, sm: 4 }}
        position="relative"
      >
        {/* ── Avatar + name tag ─────────────────────────────────────────────── */}
        <Box
          flexShrink={0}
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={2}
          /* Em mobile ficam avatar e nome lado a lado na mesma linha */
          w={{ base: 'auto', sm: 'auto' }}
        >
          {/* Wrapper que agrupa avatar + nome verticalmente em ≥ sm */}
          <Box
            display="flex"
            flexDirection={{ base: 'row', sm: 'column' }}
            alignItems="center"
            gap={{ base: 2, sm: '6px' }}
          >
            <Avatar src={avatarSrc} />

            {/* Name tag */}
            <Box
              bg={styles.nameTagBg}
              borderRadius="999px"
              px={2}
              py="3px"
              textAlign="center"
            >
              <Text
                fontSize="0.55rem"
                fontWeight="800"
                color={styles.nameTagColor}
                textTransform="uppercase"
                letterSpacing="0.06em"
                lineHeight="1.3"
                whiteSpace="nowrap"
              >
                {avatarName}
              </Text>
            </Box>
          </Box>
        </Box>

        {/* ── Balão de fala ────────────────────────────────────────────────── */}
        <Box flex="1" position="relative" minW={0}>
          {/* Triângulo — oculto em mobile para evitar posicionamento incorreto */}
          <Box display={{ base: 'none', sm: 'block' }}>
            <BubblePointer
              side={isRight ? 'right' : 'left'}
              color={styles.bubblePointerColor}
            />
          </Box>

          <Box
            bg={styles.bubbleBg}
            border={`1px solid ${styles.bubbleBorder}`}
            borderRadius="18px"
            overflow="hidden"
            boxShadow="0 4px 20px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)"
          >
            {/* Faixa de acento superior */}
            <Box
              h="3px"
              bg={styles.topAccentGradient}
              aria-hidden="true"
            />

            <Box p={{ base: '14px 16px', sm: '16px 20px' }}>
              {/* Rótulo da variante (apenas question e alert) */}
              {styles.labelText && (
                <Text
                  fontSize="0.6rem"
                  fontWeight="800"
                  textTransform="uppercase"
                  letterSpacing="0.1em"
                  color={styles.labelColor}
                  mb="6px"
                  lineHeight="1"
                >
                  {styles.labelText}
                </Text>
              )}

              {/* Fala */}
              <Text
                fontSize={{ base: '0.85rem', sm: '0.9rem' }}
                fontWeight="500"
                lineHeight="1.75"
                color="#1a2e1a"
                letterSpacing="0.01em"
              >
                {speech}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}

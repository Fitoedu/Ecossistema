'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, BookOpen, CheckCircle2 } from 'lucide-react'
import { Box, Text, HStack, VStack } from '@chakra-ui/react'

interface PageNavigationProps {
  currentPage: number
  totalPages: number
  pageLabel?: string
  onPrev: () => void
  onNext: () => void
  onGoTo?: (index: number) => void
}

const PAGE_EMOJIS: Record<number, string> = {
  0:  '📗', // Capa
  1:  '📖', // Apresentação
  2:  '🔬', // Fitossanidade
  3:  '🐛', // Pragas
  4:  '📉', // Impacto
  5:  '🚨', // Alerta
  6:  '🏛️', // Órgãos
  7:  '✅', // Como Evitar
  8:  '🌿', // Vassoura
  9:  '🫐', // Açaí
  10: '🦟', // Mosca da Fruta
  11: '💡', // Cadeia
  12: '🧠', // Quiz
  13: '🎓', // Encerramento
}

function NavButton({
  onClick,
  disabled,
  direction,
  isLast,
  id,
  label,
}: {
  onClick: () => void
  disabled: boolean
  direction: 'prev' | 'next'
  isLast?: boolean
  id: string
  label: string
}) {
  const isPrev = direction === 'prev'

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    borderRadius: '16px',
    fontWeight: 700,
    fontSize: '0.82rem',
    letterSpacing: '-0.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none',
    padding: isPrev ? '12px 18px' : '12px 22px',
    minWidth: isPrev ? '52px' : '120px',
    transition: 'opacity 0.2s ease',
    opacity: disabled ? 0.35 : 1,
    userSelect: 'none',
    WebkitUserSelect: 'none',
    ...(isPrev
      ? {
          background: 'linear-gradient(180deg, #ffffff 0%, #f0f7f1 100%)',
          color: '#2E7D32',
          border: '1.5px solid rgba(46,125,50,0.22)',
          boxShadow: [
            '0 1px 0 rgba(255,255,255,0.9) inset',
            '0 -1px 0 rgba(46,125,50,0.12) inset',
            '0 4px 0 rgba(46,125,50,0.18)',
            '0 8px 20px rgba(46,125,50,0.12)',
            '0 2px 6px rgba(0,0,0,0.06)',
          ].join(', '),
        }
      : isLast
      ? {
          background: 'linear-gradient(135deg, #1B5E20, #2E7D32)',
          color: '#fff',
          border: 'none',
          boxShadow: [
            '0 1px 0 rgba(255,255,255,0.15) inset',
            '0 4px 0 rgba(15,60,20,0.5)',
            '0 8px 24px rgba(46,125,50,0.35)',
          ].join(', '),
        }
      : {
          background: 'linear-gradient(135deg, #F9A825 0%, #FBC02D 50%, #FFD54F 100%)',
          color: '#3E2723',
          border: 'none',
          boxShadow: [
            '0 1px 0 rgba(255,255,255,0.4) inset',
            '0 4px 0 rgba(183, 109, 11, 0.6)',
            '0 8px 24px rgba(251, 192, 45, 0.35)',
            '0 2px 8px rgba(0,0,0,0.12)',
          ].join(', '),
        }),
  }

    const tapStyle = disabled
    ? undefined
    : {
        scale: 0.95,
        y: 2,
        boxShadow: `
          0 1px 0 rgba(255,255,255,0.2) inset,
          0 1px 0 rgba(15,60,20,0.5),
          0 4px 12px rgba(46,125,50,0.2)
        `,
      }

  return (
    <motion.button
      id={id}
      onClick={disabled ? undefined : onClick}
      aria-label={label}
      aria-disabled={disabled}
      type="button"
      style={baseStyle}
            whileHover={disabled ? undefined : { y: -2, scale: 1.02 }}
      whileTap={tapStyle}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
    >
      {isPrev && <ChevronLeft size={16} strokeWidth={2.5} aria-hidden="true" />}
      {isPrev ? (
        <span style={{ display: 'none' }}>Anterior</span>
      ) : isLast ? (
        <>
          <CheckCircle2 size={15} strokeWidth={2.5} aria-hidden="true" />
          <span>Concluído</span>
        </>
      ) : (
        <>
          <span>Próxima</span>
          <ChevronRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </>
      )}
    </motion.button>
  )
}

function ProgressDots({
  currentPage,
  totalPages,
  onGoTo,
}: {
  currentPage: number
  totalPages: number
  onGoTo?: (i: number) => void
}) {
  const MAX_VISIBLE = 7
  const half = Math.floor(MAX_VISIBLE / 2)

  let start = Math.max(0, currentPage - half)
  const end   = Math.min(totalPages - 1, start + MAX_VISIBLE - 1)
  if (end - start < MAX_VISIBLE - 1) start = Math.max(0, end - MAX_VISIBLE + 1)

  const visibleIndices = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  )

  return (
    <HStack gap="5px" align="center" justify="center" aria-hidden="true">
      {start > 0 && (
        <Box w="4px" h="4px" borderRadius="50%" bg="rgba(46,125,50,0.25)" />
      )}
      {visibleIndices.map((i) => {
        const isCurrent = i === currentPage
        const isPast    = i < currentPage

        return (
          <motion.button
            key={i}
            type="button"
            title={`Ir para página ${i + 1}`}
            onClick={() => onGoTo?.(i)}
            style={{
              background: isCurrent
                ? 'linear-gradient(135deg, #2E7D32, #66BB6A)'
                : isPast
                ? '#A5D6A7'
                : 'rgba(46,125,50,0.15)',
              border: isCurrent ? '2px solid #1B5E20' : '2px solid transparent',
              cursor: onGoTo ? 'pointer' : 'default',
              padding: 0,
              outline: 'none',
              borderRadius: '50%',
              flexShrink: 0,
            }}
            animate={{
              width:  isCurrent ? 20 : 8,
              height: isCurrent ? 20 : 8,
              scale:  isCurrent ? 1 : isPast ? 0.9 : 0.8,
            }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                        whileHover={onGoTo ? { scale: 1.3 } : undefined}
            whileTap={onGoTo ? { scale: 0.85 } : undefined}
          >
            {isCurrent && (
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  fontSize: '9px',
                  lineHeight: '1',
                  color: 'white',
                }}
                aria-hidden="true"
              >
                                {PAGE_EMOJIS[currentPage] ? PAGE_EMOJIS[currentPage] : '●'}
              </motion.span>
            )}
          </motion.button>
        )
      })}
      {end < totalPages - 1 && (
        <Box w="4px" h="4px" borderRadius="50%" bg="rgba(46,125,50,0.25)" />
      )}
    </HStack>
  )
}

function PageInfo({
  currentPage,
  totalPages,
  pageLabel,
}: {
  currentPage: number
  totalPages: number
  pageLabel?: string
}) {
  const emoji = PAGE_EMOJIS[currentPage] ?? '📄'

  return (
    <VStack gap={1} flex="1" align="center" minW={0}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{ textAlign: 'center', width: '100%' }}
        >
          <HStack gap={1} justify="center" wrap="nowrap">
            <Text
              fontSize="14px"
              lineHeight="1"
              aria-hidden="true"
              style={{ flexShrink: 0 }}
            >
              {emoji}
            </Text>
            {pageLabel && (
              <Text
                fontSize="0.7rem"
                fontWeight="700"
                color="#1B5E20"
                lineHeight="1.25"
                style={{
                  maxWidth: '140px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  display: 'block',
                }}
              >
                {pageLabel}
              </Text>
            )}
          </HStack>
        </motion.div>
      </AnimatePresence>

      <ProgressDots currentPage={currentPage} totalPages={totalPages} />

      <Text
        fontSize="0.62rem"
        color="rgba(46,125,50,0.65)"
        fontWeight="500"
        aria-live="polite"
        aria-atomic="true"
      >
        {currentPage + 1} / {totalPages}
      </Text>
    </VStack>
  )
}

export default function PageNavigation({
  currentPage,
  totalPages,
  pageLabel,
  onPrev,
  onNext,
  onGoTo,
}: PageNavigationProps) {
  const isFirst = currentPage === 0
  const isLast  = currentPage === totalPages - 1

  return (
    <Box
      as="nav"
      aria-label="Navegação da cartilha"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={50}
      style={{
        background: [
          'linear-gradient(180deg, rgba(248,252,249,0) 0%, rgba(248,252,249,0.96) 18%)',
          'rgba(248,252,249,0.96)',
        ].join(', '),
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
      }}
      borderTop="1px solid rgba(46,125,50,0.10)"
      boxShadow="0 -4px 24px rgba(0,0,0,0.06), 0 -1px 0 rgba(46,125,50,0.08)"
      pt="10px"
      pb="max(18px, env(safe-area-inset-bottom))"
      px="16px"
    >
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        h="3px"
        bg="rgba(46,125,50,0.08)"
        overflow="hidden"
      >
        <motion.div
          animate={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, #2E7D32, #66BB6A)',
            borderRadius: '0 2px 2px 0',
            boxShadow: '0 0 8px rgba(102,187,106,0.6)',
          }}
        />
      </Box>

      <HStack
        maxW="780px"
        mx="auto"
        gap={3}
        align="center"
      >
        <NavButton
          id="nav-btn-prev"
          direction="prev"
          onClick={onPrev}
          disabled={isFirst}
          label="Página anterior"
        />

        <PageInfo
          currentPage={currentPage}
          totalPages={totalPages}
          pageLabel={pageLabel}
        />

        <NavButton
          id="nav-btn-next"
          direction="next"
          onClick={onNext}
          disabled={isLast}
          isLast={isLast}
          label={isLast ? 'Última página — cartilha concluída' : 'Próxima página'}
        />
      </HStack>
    </Box>
  )
}

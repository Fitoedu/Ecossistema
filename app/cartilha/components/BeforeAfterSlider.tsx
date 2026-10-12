'use client'

/**
 * BeforeAfterSlider
 * ─────────────────────────────────────────────────────────────────────────────
 * Componente de comparação "Antes / Depois" para fotografias reais.
 * Suporta arrastar via mouse e toque (touch/swipe).
 *
 * Props:
 *  - beforeImage   : URL da imagem "Antes"
 *  - afterImage    : URL da imagem "Depois"
 *  - beforeLabel?  : Legenda do lado esquerdo  (padrão: "Antes")
 *  - afterLabel?   : Legenda do lado direito   (padrão: "Depois")
 *  - altText       : Texto alternativo descritivo para acessibilidade
 */

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import { Box, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  altText: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Clamp value between min and max */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

/** Returns the X position relative to a DOM element's left edge (0..1) */
function getRelativeX(clientX: number, container: HTMLElement): number {
  const { left, width } = container.getBoundingClientRect()
  return clamp((clientX - left) / width, 0, 1)
}

// ─── Label badge ──────────────────────────────────────────────────────────────

function SliderLabel({
  children,
  side,
}: {
  children: string
  side: 'left' | 'right'
}) {
  return (
    <Box
      position="absolute"
      bottom="14px"
      {...(side === 'left' ? { left: '14px' } : { right: '14px' })}
      zIndex={10}
      bg="rgba(10, 10, 10, 0.52)"
      backdropFilter="blur(8px)"
      border="1px solid rgba(255,255,255,0.18)"
      borderRadius="6px"
      px="10px"
      py="4px"
      pointerEvents="none"
      userSelect="none"
    >
      <Text
        fontSize="0.68rem"
        fontWeight="700"
        color="white"
        letterSpacing="0.07em"
        textTransform="uppercase"
        lineHeight="1"
      >
        {children}
      </Text>
    </Box>
  )
}

// ─── Drag handle (divisor central) ────────────────────────────────────────────

function DividerHandle({ isDragging }: { isDragging: boolean }) {
  return (
    <Box
      position="absolute"
      top="0"
      bottom="0"
      w="2px"
      bg="white"
      boxShadow="0 0 0 1px rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.35)"
      zIndex={20}
      pointerEvents="none"
      aria-hidden="true"
    >
      {/* Círculo central do handle */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        w={isDragging ? '44px' : '38px'}
        h={isDragging ? '44px' : '38px'}
        borderRadius="50%"
        bg="white"
        boxShadow={
          isDragging
            ? '0 0 0 3px rgba(255,255,255,0.5), 0 8px 24px rgba(0,0,0,0.45)'
            : '0 0 0 2px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.3)'
        }
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="width 0.15s ease, height 0.15s ease, box-shadow 0.15s ease"
      >
        {/* Setas horizontais — SVG minimalista, sem ícone externo */}
        <svg
          width="18"
          height="10"
          viewBox="0 0 18 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6 1L1 5L6 9"
            stroke="#1a1a1a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 1L17 5L12 9"
            stroke="#1a1a1a"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Box>

      {/* Linha superior (acima do círculo) */}
      <Box
        position="absolute"
        top="0"
        bottom="calc(50% + 22px)"
        left="50%"
        transform="translateX(-50%)"
        w="2px"
        bg="white"
        boxShadow="0 0 6px rgba(0,0,0,0.2)"
      />
      {/* Linha inferior (abaixo do círculo) */}
      <Box
        position="absolute"
        top="calc(50% + 22px)"
        bottom="0"
        left="50%"
        transform="translateX(-50%)"
        w="2px"
        bg="white"
        boxShadow="0 0 6px rgba(0,0,0,0.2)"
      />
    </Box>
  )
}

// ─── BeforeAfterSlider (exportação padrão) ────────────────────────────────────

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Antes',
  afterLabel = 'Depois',
  altText,
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState(0.5)  // 0 … 1
  const [isDragging, setIsDragging] = useState(false)

  // ── Lógica de arrastar ──────────────────────────────────────────────────────

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return
    setPosition(getRelativeX(clientX, containerRef.current))
  }, [])

  // Mouse
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      setIsDragging(true)
      handleMove(e.clientX)

      const onMove = (ev: MouseEvent) => handleMove(ev.clientX)
      const onUp = () => {
        setIsDragging(false)
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
      }
      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseup', onUp)
    },
    [handleMove]
  )

  // Touch
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true)
      handleMove(e.touches[0].clientX)

      const onMove = (ev: TouchEvent) => handleMove(ev.touches[0].clientX)
      const onEnd = () => {
        setIsDragging(false)
        window.removeEventListener('touchmove', onMove)
        window.removeEventListener('touchend', onEnd)
      }
      window.addEventListener('touchmove', onMove, { passive: true })
      window.addEventListener('touchend', onEnd)
    },
    [handleMove]
  )

  // Clique direto no container (posicionamento sem arrastar)
  const onContainerClick = useCallback((e: React.MouseEvent) => {
    if (containerRef.current) {
      setPosition(getRelativeX(e.clientX, containerRef.current))
    }
  }, [])

  // Teclado: acessibilidade com setas
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 0.1 : 0.02
    if (e.key === 'ArrowLeft')  setPosition((p) => clamp(p - step, 0, 1))
    if (e.key === 'ArrowRight') setPosition((p) => clamp(p + step, 0, 1))
    if (e.key === 'Home') setPosition(0)
    if (e.key === 'End')  setPosition(1)
  }, [])

  // ── Render ──────────────────────────────────────────────────────────────────

  const pct = `${(position * 100).toFixed(2)}%`

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1] }}
      style={{ width: '100%' }}
    >
      <Box
        ref={containerRef}
        position="relative"
        w="full"
        /* Mantém proporção 4:3. Ajuste paddingBottom conforme suas fotos:
           56.25% = 16:9 | 66.66% = 4:3 | 75% = 4:3 portrait */
        paddingBottom="66.66%"
        borderRadius="16px"
        overflow="hidden"
        boxShadow="0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)"
        border="1.5px solid rgba(0,0,0,0.10)"
        bg="#111"
        cursor={isDragging ? 'grabbing' : 'col-resize'}
        userSelect="none"
        role="slider"
        aria-label={`Comparação de imagens: ${altText}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position * 100)}
        tabIndex={0}
        onMouseDown={onMouseDown}
        onClick={onContainerClick}
        onTouchStart={onTouchStart}
        onKeyDown={onKeyDown}
        _focusVisible={{
          outline: '3px solid #2E7D32',
          outlineOffset: '3px',
        }}
      >
        {/* ── Imagem DEPOIS (fundo completo — camada de baixo) ──────────────── */}
        <Box position="absolute" inset="0">
          <Image
            src={afterImage}
            alt={`Depois — ${altText}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: 'cover', pointerEvents: 'none' }}
            draggable={false}
            priority
          />
          <SliderLabel side="right">{afterLabel}</SliderLabel>
        </Box>

        {/* ── Imagem ANTES (revelada via clip-path da esquerda) ─────────────── */}
        <Box
          position="absolute"
          inset="0"
          style={{ clipPath: `inset(0 ${((1 - position) * 100).toFixed(2)}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={`Antes — ${altText}`}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            style={{ objectFit: 'cover', pointerEvents: 'none' }}
            draggable={false}
            priority
          />
          <SliderLabel side="left">{beforeLabel}</SliderLabel>
        </Box>

        {/* ── Área de arraste (largura ampliada para facilitar toque mobile) ── */}
        <Box
          position="absolute"
          top="0"
          bottom="0"
          style={{ left: pct, transform: 'translateX(-50%)' }}
          w="40px"
          display="flex"
          alignItems="stretch"
          justifyContent="center"
          zIndex={30}
          cursor={isDragging ? 'grabbing' : 'col-resize'}
        >
          <DividerHandle isDragging={isDragging} />
        </Box>
      </Box>

      {/* ── Instrução discreta ─────────────────────────────────────────────────── */}
      <Text
        mt={2}
        fontSize="0.7rem"
        color="gray.500"
        textAlign="center"
        letterSpacing="0.03em"
        userSelect="none"
      >
        Arraste o divisor ou use as teclas ← → para comparar
      </Text>
    </motion.div>
  )
}

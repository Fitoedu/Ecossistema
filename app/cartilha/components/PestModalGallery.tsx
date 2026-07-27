'use client'

import Image from 'next/image'
import { SimpleGrid, Box, Text } from '@chakra-ui/react'
import type { PestGalleryItemData } from '../data/cartilha-data'

/* ─────────────────────────────────────────────────────────────────────────
   ACCENT PALETTE — cada praga recebe uma cor distinta ciclicamente
───────────────────────────────────────────────────────────────────────── */

export const PEST_ACCENT_PALETTE = [
  { gradient: 'linear-gradient(135deg, #B71C1C, #E53935)', light: '#FFF5F5', border: '#FC8181' },
  { gradient: 'linear-gradient(135deg, #E65100, #FB8C00)', light: '#FFF8F0', border: '#FBD38D' },
  { gradient: 'linear-gradient(135deg, #1565C0, #1976D2)', light: '#EBF8FF', border: '#90CDF4' },
  { gradient: 'linear-gradient(135deg, #1B5E20, #2E7D32)', light: '#F0FFF4', border: '#9AE6B4' },
  { gradient: 'linear-gradient(135deg, #4A148C, #6A1B9A)', light: '#FAF5FF', border: '#D6BCFA' },
  { gradient: 'linear-gradient(135deg, #004D40, #00695C)', light: '#E0FFF8', border: '#81E6D9' },
] as const

export type PestAccent = typeof PEST_ACCENT_PALETTE[number]

/* ─────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────── */

interface PestGalleryCardProps {
  item: PestGalleryItemData
  accentIndex: number
  onClick: () => void
}

export interface PestModalGalleryProps {
  items: PestGalleryItemData[]
  /** Chamado ao clicar em um card — eleva o estado para o pai */
  onSelectItem: (item: PestGalleryItemData, index: number) => void
}

/* ─────────────────────────────────────────────────────────────────────────
   PEST GALLERY CARD — card clicavel do grid
───────────────────────────────────────────────────────────────────────── */

function PestGalleryCard({ item, accentIndex, onClick }: PestGalleryCardProps) {
  const accent = PEST_ACCENT_PALETTE[accentIndex % PEST_ACCENT_PALETTE.length]

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Abrir informacoes sobre ${item.name}`}
      style={{
        all: 'unset',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'white',
        border: `2px solid ${accent.border}66`,
        boxShadow: '0 6px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        cursor: 'pointer',
        textAlign: 'left',
        transition: 'all 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-4px)'
        el.style.boxShadow = '0 16px 40px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.08)'
        el.style.borderColor = accent.border
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.transform = ''
        el.style.boxShadow = '0 6px 24px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)'
        el.style.borderColor = `${accent.border}66`
      }}
    >
      {/* Card header com gradiente */}
      <Box
        h="140px"
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        style={{ background: accent.gradient }}
      >
        {/* Circulos decorativos */}
        <Box
          position="absolute"
          w="120px"
          h="120px"
          borderRadius="50%"
          bg="rgba(255,255,255,0.08)"
          bottom="-40px"
          right="-30px"
          aria-hidden="true"
        />
        <Box
          position="absolute"
          w="80px"
          h="80px"
          borderRadius="50%"
          bg="rgba(255,255,255,0.06)"
          top="-20px"
          left="-20px"
          aria-hidden="true"
        />

        {/* Imagem da praga */}
        <Box
          position="relative"
          w="96px"
          h="96px"
          borderRadius="50%"
          overflow="hidden"
          border="3px solid rgba(255,255,255,0.35)"
          boxShadow="0 4px 16px rgba(0,0,0,0.25)"
          bg="rgba(255,255,255,0.12)"
        >
          <Image
            src={item.imageSrc}
            alt={`Imagem de ${item.name}`}
            fill
            style={{ objectFit: 'cover' }}
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        </Box>
      </Box>

      {/* Rodape do card */}
      <Box p="16px 18px 20px" flex="1" style={{ background: accent.light }}>
        <Text
          fontSize="0.95rem"
          fontWeight="800"
          color="#1a1a1a"
          lineHeight="1.25"
          letterSpacing="-0.01em"
          mb={1}
        >
          {item.name}
        </Text>
        <Text fontSize="0.72rem" color="#555" fontWeight="500">
          Toque para saber mais
        </Text>
      </Box>
    </button>
  )
}

/* ─────────────────────────────────────────────────────────────────────────
   PEST MODAL GALLERY — apenas o grid de cards.
   O DialogRoot foi deliberadamente elevado para page.tsx para escapar do
   stacking context criado pelo PageTransitionWrapper (filter + transform).
   Este componente e intencionalmente stateless em relacao ao modal.
───────────────────────────────────────────────────────────────────────── */

export default function PestModalGallery({ items, onSelectItem }: PestModalGalleryProps) {
  return (
    <SimpleGrid
      columns={{ base: 2, sm: 2, md: 3 }}
      gap={4}
      my={6}
    >
      {items.map((item, index) => (
        <PestGalleryCard
          key={item.id}
          item={item}
          accentIndex={index}
          onClick={() => onSelectItem(item, index)}
        />
      ))}
    </SimpleGrid>
  )
}

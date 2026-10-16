'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { SimpleGrid, Box, Text } from '@chakra-ui/react'
import type { PestGalleryItemData } from '../../../data/cartilha-data'

// ─── Paleta de acentos ────────────────────────────────────────────────────────

export const PEST_ACCENT_PALETTE = [
  { gradient: 'linear-gradient(135deg, #2E7D32, #66BB6A)', light: '#F0FFF4', border: '#9AE6B4' },
  { gradient: 'linear-gradient(135deg, #E65100, #FB8C00)', light: '#FFF8F0', border: '#FBD38D' },
  { gradient: 'linear-gradient(135deg, #F57F17, #FBC02D)', light: '#FFFBEA', border: '#F6E05E' },
  { gradient: 'linear-gradient(135deg, #1B5E20, #388E3C)', light: '#F0FFF4', border: '#68D391' },
  { gradient: 'linear-gradient(135deg, #8D6E63, #A1887F)', light: '#FAF7F5', border: '#C6B5AE' },
  { gradient: 'linear-gradient(135deg, #558B2F, #7CB342)', light: '#F7FCEB', border: '#A5D66A' },
] as const

export type PestAccent = typeof PEST_ACCENT_PALETTE[number]

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── PestGalleryCard ──────────────────────────────────────────────────────────

function PestGalleryCard({ item, accentIndex, onClick }: PestGalleryCardProps) {
  const accent = PEST_ACCENT_PALETTE[accentIndex % PEST_ACCENT_PALETTE.length]
  const [hasImageError, setHasImageError] = useState(false)

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Abrir informações sobre ${item.name}`}
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
        // Touch target mínimo garantido via minHeight
        minHeight: '44px',
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
      {/* Header do card com gradiente */}
      <Box
        h={{ base: '160px', sm: '180px' }}
        position="relative"
        overflow="hidden"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexShrink={0}
        style={{ background: accent.gradient }}
      >
        <Box
          position="absolute"
          top="10px"
          left="10px"
          display="flex"
          alignItems="center"
          gap="4px"
          px="7px"
          py="4px"
          borderRadius="999px"
          bg="rgba(0,0,0,0.28)"
          color="white"
          fontSize="0.58rem"
          fontWeight="700"
          letterSpacing="0.02em"
          pointerEvents="none"
        >
          <Search size={12} strokeWidth={2.4} aria-hidden="true" />
          Ampliar
        </Box>

        {hasImageError ? (
          <Box
            h="full"
            w="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bg="rgba(255,255,255,0.14)"
            color="white"
            fontSize="2rem"
            aria-label={`Imagem de ${item.name} indisponível`}
          >
            🌿
          </Box>
        ) : (
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              transformOrigin: 'center',
            }}
          >
            <Image
              src={item.imageSrc}
              alt={`Imagem de ${item.name}`}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              style={{ objectFit: 'cover' }}
              onError={() => setHasImageError(true)}
            />
          </motion.div>
        )}
      </Box>

      {/* Rodapé do card */}
      <Box
        p={{ base: '12px 14px 16px', sm: '16px 18px 20px' }}
        flex="1"
        style={{ background: accent.light }}
      >
        <Text
          fontSize={{ base: '0.85rem', sm: '0.95rem' }}
          fontWeight="800"
          color="#1a1a1a"
          lineHeight="1.25"
          letterSpacing="-0.01em"
          mb={1}
        >
          {item.name}
        </Text>
        <Text
          fontSize={{ base: '0.68rem', sm: '0.72rem' }}
          color="#555"
          fontWeight="500"
        >
          Toque para saber mais
        </Text>
      </Box>
    </button>
  )
}

// ─── PestModalGallery ─────────────────────────────────────────────────────────

/**
 * Grid de cards stateless em relação ao modal.
 * O DialogRoot reside em page.tsx, fora do PageTransitionWrapper, para
 * escapar do stacking context criado por filter + transform.
 */
export default function PestModalGallery({ items, onSelectItem }: PestModalGalleryProps) {
  return (
    <SimpleGrid
      columns={{ base: 2, sm: 2, md: 3 }}
      gap={{ base: 3, sm: 4 }}
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

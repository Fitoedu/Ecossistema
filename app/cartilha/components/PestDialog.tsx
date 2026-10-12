'use client'

/**
 * PestDialog.tsx
 *
 * Renderiza o DialogRoot do Chakra UI v3 para o modal da galeria de pragas.
 * Este componente é renderizado em page.tsx — diretamente dentro do <AppShell>,
 * FORA do <PageTransitionWrapper> — para garantir que o Portal do Dialog não
 * herde o stacking context criado por `filter` e `transform` da animação de
 * transição de página.
 *
 * ARQUITETURA:
 *   page.tsx (AppShell)
 *     ├─ PageTransitionWrapper  ← filter + transform  (Modal NÃO pode ficar aqui)
 *     │    └─ renderPage(page)
 *     │         └─ PagePestGallery
 *     │              └─ PestModalGallery (grid stateless)
 *     │                   └─ onSelectItem ──────────────────┐ (callback)
 *     └─ <PestDialog />  ← renderizado aqui, sem stacking   ◄─┘
 */

import Image from 'next/image'
import { useState } from 'react'
import {
  Box,
  Text,
  VStack,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogCloseTrigger,
  Portal,
} from '@chakra-ui/react'
import { PEST_ACCENT_PALETTE } from './PestModalGallery'
import type { PestGalleryItemData } from '../data/cartilha-data'

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PestDialogProps {
  /** Item selecionado; null = modal fechado */
  selectedItem: PestGalleryItemData | null
  /** Índice do item selecionado — determina a paleta de cores */
  selectedIndex: number
  /** Controlador de abertura */
  open: boolean
  /** Callback de fechamento */
  onClose: () => void
}

// ─── PestDialog ───────────────────────────────────────────────────────────────

/**
 * Portal garante que o DialogRoot e seus filhos sejam montados diretamente
 * no <body>, escapando de qualquer ancestral com filter/transform/overflow.
 */
export default function PestDialog({
  selectedItem,
  selectedIndex,
  open,
  onClose,
}: PestDialogProps) {
  const accent = PEST_ACCENT_PALETTE[selectedIndex % PEST_ACCENT_PALETTE.length]
  const [imageErrorId, setImageErrorId] = useState<number | null>(null)
  const hasImageError = selectedItem !== null && imageErrorId === selectedItem.id

  return (
    <Portal>
      <DialogRoot
        open={open}
        onOpenChange={(details) => {
          if (!details.open) onClose()
        }}
        placement="center"
        motionPreset="slide-in-bottom"
        scrollBehavior="inside"
      >
        {/* Backdrop com blur */}
        <DialogBackdrop
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
        />

        <DialogPositioner>
          <DialogContent
            borderRadius={{ base: '20px', sm: '24px' }}
            overflow="hidden"
            boxShadow="0 32px 80px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.15)"
            mx={{ base: 3, sm: 4 }}
            maxW={{ base: '100%', sm: '440px' }}
            w="full"
          >
            {selectedItem && (
              <>
                {/* Cabeçalho visual com imagem */}
                <Box
                  h={{ base: '160px', sm: '200px' }}
                  position="relative"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ background: accent.gradient }}
                >
                  {/* Círculos decorativos */}
                  <Box
                    position="absolute"
                    w="200px"
                    h="200px"
                    borderRadius="50%"
                    bg="rgba(255,255,255,0.07)"
                    bottom="-80px"
                    right="-60px"
                    aria-hidden="true"
                  />
                  <Box
                    position="absolute"
                    w="120px"
                    h="120px"
                    borderRadius="50%"
                    bg="rgba(255,255,255,0.05)"
                    top="-30px"
                    left="-30px"
                    aria-hidden="true"
                  />

                  {/* Imagem da praga */}
                  <Box
                    position="relative"
                    w={{ base: '120px', sm: '140px' }}
                    h={{ base: '120px', sm: '140px' }}
                    borderRadius="50%"
                    overflow="hidden"
                    border="4px solid rgba(255,255,255,0.40)"
                    boxShadow="0 8px 32px rgba(0,0,0,0.30)"
                    bg="rgba(255,255,255,0.15)"
                  >
                    {hasImageError ? (
                      <Box
                        h="full"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        color="white"
                        fontSize="3rem"
                        bg="rgba(255,255,255,0.12)"
                        aria-label={`Imagem de ${selectedItem.name} indisponível`}
                      >
                        🌿
                      </Box>
                    ) : (
                      <Image
                        src={selectedItem.imageSrc}
                        alt={`Imagem de ${selectedItem.name}`}
                        fill
                        style={{ objectFit: 'cover' }}
                        onError={() => setImageErrorId(selectedItem.id)}
                      />
                    )}
                  </Box>
                </Box>

                {/* Header do Dialog */}
                <DialogHeader pt={4} pb={2} px={{ base: 4, sm: 6 }}>
                  <DialogTitle
                    fontSize={{ base: '1.1rem', sm: '1.3rem' }}
                    fontWeight="800"
                    color="#1a1a1a"
                    letterSpacing="-0.01em"
                    lineHeight="1.2"
                  >
                    {selectedItem.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Botão de fechar */}
                <DialogCloseTrigger
                  top={3}
                  right={3}
                  bg="rgba(255,255,255,0.25)"
                  color="white"
                  borderRadius="50%"
                  _hover={{ bg: 'rgba(255,255,255,0.40)' }}
                  _focusVisible={{ boxShadow: '0 0 0 3px rgba(255,255,255,0.5)' }}
                />

                {/* Body do Dialog */}
                <DialogBody px={{ base: 4, sm: 6 }} pb={{ base: 6, sm: 8 }} pt={2}>
                  <VStack align="stretch" gap={4}>
                    {/* Divisor de acento */}
                    <Box
                      h="3px"
                      w="48px"
                      borderRadius="999px"
                      style={{ background: accent.gradient }}
                    />

                    <Text
                      fontSize={{ base: '0.85rem', sm: '0.9rem' }}
                      color="#3a3a3a"
                      lineHeight="1.8"
                      fontWeight="400"
                    >
                      {selectedItem.description}
                    </Text>
                    {selectedItem.damageType && (
                      <Box bg="orange.50" borderLeft="4px solid" borderColor="orange.400" p={3} borderRadius="md">
                        <Text fontSize="0.72rem" fontWeight="800" color="orange.800" mb={1}>
                          Tipo de dano
                        </Text>
                        <Text fontSize="0.8rem" color="gray.700" lineHeight="1.5">
                          {selectedItem.damageType}
                        </Text>
                      </Box>
                    )}
                    {selectedItem.fieldTip && (
                      <Box bg="green.50" borderLeft="4px solid" borderColor="green.500" p={3} borderRadius="md">
                        <Text fontSize="0.72rem" fontWeight="800" color="green.800" mb={1}>
                          Dica de identificação em campo
                        </Text>
                        <Text fontSize="0.8rem" color="gray.700" lineHeight="1.5">
                          {selectedItem.fieldTip}
                        </Text>
                      </Box>
                    )}
                  </VStack>
                </DialogBody>
              </>
            )}
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </Portal>
  )
}

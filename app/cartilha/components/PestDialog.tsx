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
import { motion } from 'framer-motion'
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
                  h={{ base: '200px', sm: '240px' }}
                  w="full"
                  position="relative"
                  overflow="hidden"
                  borderTopRadius={{ base: '20px', sm: '24px' }}
                  bg={accent.light}
                >
                  {hasImageError ? (
                    <Box
                      h="full"
                      w="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="green.800"
                      fontSize="3rem"
                      bgGradient="linear(to-br, green.50, yellow.50)"
                      aria-label={`Imagem de ${selectedItem.name} indisponível`}
                    >
                      🌿
                    </Box>
                  ) : (
                    <motion.div
                      key={selectedItem.id}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6 }}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        transformOrigin: 'center',
                      }}
                    >
                      <Image
                        src={selectedItem.imageSrc}
                        alt={`Imagem de ${selectedItem.name}`}
                        fill
                        sizes="(max-width: 640px) 100vw, 440px"
                        style={{ objectFit: 'cover' }}
                        onError={() => setImageErrorId(selectedItem.id)}
                      />
                    </motion.div>
                  )}
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
                  position="absolute"
                  right="12px"
                  top="12px"
                  zIndex={10}
                  w="36px"
                  h="36px"
                  bg="white"
                  color="gray.800"
                  borderRadius="full"
                  shadow="md"
                  fontSize="1.35rem"
                  fontWeight="800"
                  lineHeight="1"
                  _hover={{ bg: 'gray.100' }}
                  _focusVisible={{ outline: '3px solid', outlineColor: 'green.300' }}
                >
                  ×
                </DialogCloseTrigger>

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

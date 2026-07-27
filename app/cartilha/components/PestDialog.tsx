'use client'

/**
 * PestDialog.tsx
 *
 * Renderiza o DialogRoot do Chakra UI v3 para o modal da galeria de pragas.
 * Este componente e renderizado em page.tsx — diretamente dentro do <AppShell>,
 * FORA do <PageTransitionWrapper> — para garantir que o Portal do Dialog nao
 * herde o stacking context criado por `filter` e `transform` da animacao de
 * transicao de pagina.
 *
 * ARQUITETURA:
 *   page.tsx (AppShell)
 *     ├─ PageTransitionWrapper  ← filter + transform  (Modal NAO pode ficar aqui)
 *     │    └─ renderPage(page)
 *     │         └─ PagePestGallery
 *     │              └─ PestModalGallery (grid stateless)
 *     │                   └─ onSelectItem ──────────────────┐ (callback)
 *     └─ <PestDialog />  ← renderizado aqui, sem stacking   ◄─┘
 */

import Image from 'next/image'
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

/* ─────────────────────────────────────────────────────────────────────────
   TYPES
───────────────────────────────────────────────────────────────────────── */

export interface PestDialogProps {
  /** Item selecionado; null = modal fechado */
  selectedItem: PestGalleryItemData | null
  /** Indice do item selecionado — determina a paleta de cores */
  selectedIndex: number
  /** Controlador de abertura */
  open: boolean
  /** Callback de fechamento */
  onClose: () => void
}

/* ─────────────────────────────────────────────────────────────────────────
   PEST DIALOG — modal isolado do stacking context pai
───────────────────────────────────────────────────────────────────────── */

export default function PestDialog({
  selectedItem,
  selectedIndex,
  open,
  onClose,
}: PestDialogProps) {
  const accent = PEST_ACCENT_PALETTE[selectedIndex % PEST_ACCENT_PALETTE.length]

  return (
    /**
     * Portal garante que o DialogRoot e seus filhos sejam montados diretamente
     * no <body>, escapando de qualquer ancestral com filter/transform/overflow.
     * Mesmo que o Chakra ja use Portal internamente no DialogPositioner,
     * envolver o DialogRoot inteiro no Portal e a garantia mais robusta contra
     * stacking context criado por um ancestral arbitrario.
     */
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
        {/* Backdrop com blur — equivalente ao ModalOverlay */}
        <DialogBackdrop
          bg="blackAlpha.600"
          backdropFilter="blur(10px)"
        />

        <DialogPositioner>
          <DialogContent
            borderRadius="24px"
            overflow="hidden"
            boxShadow="0 32px 80px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.15)"
            mx={4}
            maxW="440px"
          >
            {selectedItem && (
              <>
                {/* Cabecalho visual com imagem */}
                <Box
                  h="200px"
                  position="relative"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  style={{ background: accent.gradient }}
                >
                  {/* Circulos decorativos */}
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

                  {/* Imagem da praga com objectFit="contain" */}
                  <Box
                    position="relative"
                    w="140px"
                    h="140px"
                    borderRadius="50%"
                    overflow="hidden"
                    border="4px solid rgba(255,255,255,0.40)"
                    boxShadow="0 8px 32px rgba(0,0,0,0.30)"
                    bg="rgba(255,255,255,0.15)"
                  >
                    <Image
                      src={selectedItem.imageSrc}
                      alt={`Imagem de ${selectedItem.name}`}
                      fill
                      style={{ objectFit: 'contain' }}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </Box>
                </Box>

                {/* Header do Dialog */}
                <DialogHeader pt={5} pb={2} px={6}>
                  <DialogTitle
                    fontSize="1.3rem"
                    fontWeight="800"
                    color="#1a1a1a"
                    letterSpacing="-0.01em"
                    lineHeight="1.2"
                  >
                    {selectedItem.name}
                  </DialogTitle>
                </DialogHeader>

                {/* Botao de fechar */}
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
                <DialogBody px={6} pb={8} pt={2}>
                  <VStack align="stretch" gap={4}>
                    {/* Divisor de acento */}
                    <Box
                      h="3px"
                      w="48px"
                      borderRadius="999px"
                      style={{ background: accent.gradient }}
                    />

                    <Text
                      fontSize="0.9rem"
                      color="#3a3a3a"
                      lineHeight="1.8"
                      fontWeight="400"
                    >
                      {selectedItem.description}
                    </Text>
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

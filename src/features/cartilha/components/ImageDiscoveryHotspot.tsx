'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Flex,
  Text,
  SimpleGrid,
} from '@chakra-ui/react'
import type { HotspotItemData, MicroorgCategory } from '../data/cartilha-data'

/* ═══════════════════════════════════════════════════════════════════
   CONSTANTES DE DESIGN
═══════════════════════════════════════════════════════════════════ */

const CATEGORY_META: Record<
  MicroorgCategory,
  { label: string; badgeBg: string; dotColor: string }
> = {
  fungo: {
    label: 'Fungo',
    badgeBg: 'linear-gradient(135deg, #BF360C, #E64A19)',
    dotColor: '#FF8A65',
  },
  bacteria: {
    label: 'Bactéria',
    badgeBg: 'linear-gradient(135deg, #0D47A1, #1976D2)',
    dotColor: '#64B5F6',
  },
  virus: {
    label: 'Vírus',
    badgeBg: 'linear-gradient(135deg, #4A148C, #7B1FA2)',
    dotColor: '#CE93D8',
  },
  fitoplasma: {
    label: 'Fitoplasma',
    badgeBg: 'linear-gradient(135deg, #33691E, #689F38)',
    dotColor: '#AED581',
  },
}

/* ═══════════════════════════════════════════════════════════════════
   VARIANTES FRAMER MOTION
═══════════════════════════════════════════════════════════════════ */

const triggerVariants = {
  initial: { opacity: 0, scale: 0.4 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, bounce: 0.5, duration: 0.55 },
  },
  exit: { opacity: 0, scale: 0.3, transition: { duration: 0.22, ease: 'easeIn' as const } },
}

const cardVariants = {
  initial: { opacity: 0, y: 18, scale: 0.92 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, bounce: 0.3, duration: 0.5 },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.94,
    transition: { duration: 0.22, ease: 'easeIn' as const },
  },
}

/* ═══════════════════════════════════════════════════════════════════
   HOTSPOT CARD INDIVIDUAL
═══════════════════════════════════════════════════════════════════ */

function HotspotCard({ item }: { item: HotspotItemData }) {
  const [isOpen, setIsOpen] = useState(false)
  const meta = CATEGORY_META[item.category]

  return (
    <Box
      position="relative"
      minHeight="300px"
      borderRadius="18px"
      overflow="hidden"
      bg="linear-gradient(135deg, #1B5E20, #2E7D32)"
      backgroundImage={`url('${item.backgroundImageSrc}')`}
      backgroundSize="cover"
      backgroundPosition="center"
      cursor={isOpen ? 'default' : 'pointer'}
      role="button"
      aria-label={`Investigar: ${item.name}`}
      aria-expanded={isOpen}
      onClick={() => { if (!isOpen) setIsOpen(true) }}
      _hover={!isOpen ? { transform: 'translateY(-3px)' } : undefined}
      transition="transform 0.25s ease"
      boxShadow="0 6px 28px rgba(0,0,0,0.25)"
    >
      {/* Overlay escuro sobre a imagem */}
      <Box
        position="absolute"
        inset={0}
        bg={
          isOpen
            ? 'rgba(0,0,0,0.6)'
            : 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)'
        }
        transition="background 0.4s ease"
        borderRadius="18px"
        aria-hidden="true"
      />

      {/* Nome da doença no rodapé — visível apenas no estado fechado */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="label"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            style={{
              position: 'absolute',
              bottom: 14,
              left: 14,
              right: 14,
              zIndex: 2,
              pointerEvents: 'none',
            }}
          >
            <Text
              fontSize="0.82rem"
              fontWeight="800"
              color="white"
              textTransform="uppercase"
              letterSpacing="0.08em"
              textShadow="0 1px 6px rgba(0,0,0,0.8)"
            >
              {item.name}
            </Text>
            <Text fontSize="0.65rem" color="rgba(255,255,255,0.75)" fontWeight="600" mt="2px">
              {meta.label}
            </Text>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ESTADO 1: Gatilho Circular Pulsante ── */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="trigger"
            variants={triggerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 3,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.06, 1] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            >
              <Box
                w="104px"
                h="104px"
                borderRadius="50%"
                bg="rgba(27,94,32,0.93)"
                border="3px dashed white"
                display="flex"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                gap="5px"
                boxShadow="0 8px 32px rgba(0,0,0,0.5), 0 0 0 6px rgba(255,255,255,0.1)"
                backdropFilter="blur(3px)"
              >
                <Box
                  w="32px"
                  h="32px"
                  borderRadius="50%"
                  bg="#FBC02D"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  boxShadow="0 2px 8px rgba(0,0,0,0.3)"
                >
                  <Text fontSize="1rem" fontWeight="900" color="#212121" lineHeight={1}>
                    ?
                  </Text>
                </Box>
                <Text
                  fontSize="0.6rem"
                  fontWeight="700"
                  color="white"
                  textAlign="center"
                  lineHeight="1.25"
                  px="10px"
                >
                  O que há nesta folha?
                </Text>
              </Box>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── ESTADO 2: Card de Descoberta ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="discovery-card"
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: 'absolute',
              inset: '10px',
              zIndex: 5,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              bg="white"
              borderRadius="14px"
              boxShadow="xl"
              overflow="hidden"
              h="full"
              display="flex"
              flexDir="column"
            >
              {/* Cabeçalho colorido por categoria */}
              <Flex
                align="center"
                justify="space-between"
                px={3}
                py="10px"
                bg={meta.badgeBg}
                flexShrink={0}
              >
                <Flex align="center" gap="7px" flex={1} minW={0}>
                  <Box
                    w="8px"
                    h="8px"
                    borderRadius="50%"
                    bg={meta.dotColor}
                    flexShrink={0}
                    boxShadow={`0 0 6px ${meta.dotColor}`}
                  />
                  <Text
                    fontSize="0.78rem"
                    fontWeight="900"
                    color="white"
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                    overflow="hidden"
                    style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                  >
                    {item.name}
                  </Text>
                  <Box
                    bg="rgba(255,255,255,0.22)"
                    borderRadius="999px"
                    px="8px"
                    py="2px"
                    flexShrink={0}
                  >
                    <Text
                      fontSize="0.55rem"
                      fontWeight="700"
                      color="white"
                      whiteSpace="nowrap"
                    >
                      {meta.label}
                    </Text>
                  </Box>
                </Flex>

                {/* Botão Fechar (X) */}
                <Box
                  as="button"
                  aria-label={`Fechar informações sobre ${item.name}`}
                  w="26px"
                  h="26px"
                  borderRadius="50%"
                  bg="rgba(255,255,255,0.22)"
                  border="1.5px solid rgba(255,255,255,0.45)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  ml={2}
                  cursor="pointer"
                  _hover={{ bg: 'rgba(255,255,255,0.38)' }}
                  transition="background 0.2s"
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    setIsOpen(false)
                  }}
                >
                  <Text fontSize="0.72rem" fontWeight="900" color="white" lineHeight={1}>
                    ✕
                  </Text>
                </Box>
              </Flex>

              {/* Corpo com scroll */}
              <Box
                flex={1}
                overflowY="auto"
                p={3}
                css={{
                  '&::-webkit-scrollbar': { width: '3px' },
                  '&::-webkit-scrollbar-track': { background: '#f5f5f5' },
                  '&::-webkit-scrollbar-thumb': { background: '#ccc', borderRadius: '2px' },
                }}
              >
                {/* Conceito — container com maxHeight para scroll interno */}
                <Box
                  overflowY="auto"
                  maxHeight="120px"
                  mb={item.impactText || item.preventionText ? 2 : 0}
                  css={{
                    '&::-webkit-scrollbar': { width: '2px' },
                    '&::-webkit-scrollbar-thumb': { background: '#ddd' },
                  }}
                >
                  <Text fontSize="0.75rem" lineHeight="1.65" color="#212121">
                    {item.concept}
                  </Text>
                </Box>

                {/* Destaque de Impacto — bg vermelho */}
                {item.impactText && (
                  <Box
                    bg="#FFEBEE"
                    border="1px solid rgba(198,40,40,0.2)"
                    borderRadius="10px"
                    p="9px 11px"
                    mb={item.preventionText ? 2 : 0}
                  >
                    <Flex align="center" gap="5px" mb="3px">
                      <Text fontSize="0.62rem" lineHeight={1}>⚠️</Text>
                      <Text
                        fontSize="0.6rem"
                        fontWeight="800"
                        color="#B71C1C"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                      >
                        Impacto
                      </Text>
                    </Flex>
                    <Text fontSize="0.69rem" color="#7F0000" lineHeight="1.5">
                      {item.impactText}
                    </Text>
                  </Box>
                )}

                {/* Destaque de Prevenção — bg amarelo */}
                {item.preventionText && (
                  <Box
                    bg="#FFFDE7"
                    border="1px solid rgba(251,192,45,0.35)"
                    borderRadius="10px"
                    p="9px 11px"
                  >
                    <Flex align="center" gap="5px" mb="3px">
                      <Text fontSize="0.62rem" lineHeight={1}>🛡️</Text>
                      <Text
                        fontSize="0.6rem"
                        fontWeight="800"
                        color="#F57F17"
                        textTransform="uppercase"
                        letterSpacing="0.06em"
                      >
                        Prevenção
                      </Text>
                    </Flex>
                    <Text fontSize="0.69rem" color="#5D4037" lineHeight="1.5">
                      {item.preventionText}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  )
}

/* ═══════════════════════════════════════════════════════════════════
   EXPORTAÇÃO — Grid de Hotspots
═══════════════════════════════════════════════════════════════════ */

export interface ImageDiscoveryHotspotGridProps {
  items: HotspotItemData[]
}

export function ImageDiscoveryHotspotGrid({ items }: ImageDiscoveryHotspotGridProps) {
  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={5} my={6}>
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.09, duration: 0.45, ease: 'easeOut' }}
        >
          <HotspotCard item={item} />
        </motion.div>
      ))}
    </SimpleGrid>
  )
}

export default ImageDiscoveryHotspotGrid

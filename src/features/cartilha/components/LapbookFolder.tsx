'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Box, Grid, Text, HStack, VStack, SimpleGrid } from '@chakra-ui/react'

export interface PocketCard {
  id: string
  emoji: string
  title: string
  subtitle: string
  variant?: 'green' | 'amber' | 'teal' | 'red' | 'purple'
  details: {
    icon: string
    label: string
    value: string
  }[]
  callout?: {
    icon: string
    text: string
  }
}

interface LapbookFolderProps {
  title: string
  subtitle?: string
  badge?: string
  cards: PocketCard[]
  footerNote?: string
}

const VARIANT_COLORS = {
  green:  { tab: '#2E7D32', tabLight: '#43A047', bg: '#E8F5E9', border: '#66BB6A', tag: '#1B5E20' },
  amber:  { tab: '#E65100', tabLight: '#F57C00', bg: '#FFF3E0', border: '#FFA726', tag: '#BF360C' },
  teal:   { tab: '#00695C', tabLight: '#00897B', bg: '#E0F2F1', border: '#26A69A', tag: '#004D40' },
  red:    { tab: '#C62828', tabLight: '#D32F2F', bg: '#FFEBEE', border: '#EF9A9A', tag: '#B71C1C' },
  purple: { tab: '#6A1B9A', tabLight: '#7B1FA2', bg: '#F3E5F5', border: '#CE93D8', tag: '#4A148C' },
}

const KRAFT_TEXTURE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 0.6  0 0 0 0 0.45  0 0 0 0 0.3  0 0 0 0.08 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E")`

function PocketTab({
  card,
  onOpen,
  index,
}: {
  card: PocketCard
  onOpen: () => void
  index: number
}) {
  const colors = VARIANT_COLORS[card.variant ?? 'green']

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: 'spring', stiffness: 220, damping: 20 }}
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      style={{ cursor: 'pointer' }}
      onClick={onOpen}
    >
      <Box
        borderRadius="16px"
        overflow="hidden"
        border={`2px solid ${colors.border}`}
        boxShadow={`0 6px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.08), 0 0 0 1px ${colors.border}33`}
        bg="white"
        role="button"
        aria-label={`Abrir ficha: ${card.title}`}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onOpen() }}
        style={{ backgroundImage: KRAFT_TEXTURE }}
        transition="box-shadow 0.25s ease"
        _hover={{ boxShadow: `0 12px 32px rgba(0,0,0,0.18), 0 0 0 2px ${colors.border}` }}
      >
        <Box
          bg={`linear-gradient(135deg, ${colors.tab}, ${colors.tabLight})`}
          px={4}
          py={3}
          display="flex"
          alignItems="center"
          gap={3}
        >
          <Text
            fontSize="28px"
            lineHeight="1"
            flexShrink={0}
            style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }}
            aria-hidden="true"
          >
            {card.emoji}
          </Text>
          <Box flex="1">
            <Text
              fontSize="0.78rem"
              fontWeight="800"
              color="white"
              lineHeight="1.3"
              letterSpacing="-0.01em"
            >
              {card.title}
            </Text>
            <Text fontSize="0.68rem" color="rgba(255,255,255,0.8)" lineHeight="1.4" mt="2px">
              {card.subtitle}
            </Text>
          </Box>
        </Box>

        <Box
          px={4}
          py="10px"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          bg="rgba(255,255,255,0.85)"
        >
          <Text fontSize="0.7rem" color={colors.tag} fontWeight="600" fontStyle="italic">
            Clique para puxar a ficha
          </Text>
          <Box display="flex" gap="3px" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <Box
                key={i}
                w="4px"
                h="4px"
                borderRadius="50%"
                bg={colors.tab}
                opacity={1 - i * 0.25}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </motion.div>
  )
}

function DetailCard({
  card,
  onClose,
}: {
  card: PocketCard
  onClose: () => void
}) {
  const colors = VARIANT_COLORS[card.variant ?? 'green']

  return (
    <motion.div
      key={card.id}
      initial={{ opacity: 0, y: 40, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: '0 8px 8px',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(10,30,15,0.55)',
          backdropFilter: 'blur(4px)',
        }}
        onClick={onClose}
      />

      <Box
        position="relative"
        zIndex={1}
        w="full"
        maxW="520px"
        borderRadius="24px"
        overflow="hidden"
        boxShadow="0 32px 80px rgba(0,0,0,0.4)"
        style={{ backgroundImage: KRAFT_TEXTURE }}
        bg="white"
      >
        <Box
          bg={`linear-gradient(135deg, ${colors.tab}, ${colors.tabLight})`}
          px={6}
          py={5}
          display="flex"
          alignItems="center"
          gap={4}
          position="relative"
        >
          <Box
            position="absolute"
            w="160px"
            h="160px"
            borderRadius="50%"
            bg="rgba(255,255,255,0.06)"
            bottom="-60px"
            right="-40px"
            aria-hidden="true"
          />
          <Text
            fontSize="52px"
            lineHeight="1"
            flexShrink={0}
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
            aria-hidden="true"
          >
            {card.emoji}
          </Text>
          <Box flex="1">
            <Text
              as="h2"
              fontSize="clamp(1rem, 3vw, 1.3rem)"
              fontWeight="900"
              color="white"
              lineHeight="1.2"
              mb={1}
            >
              {card.title}
            </Text>
            <Text fontSize="0.82rem" color="rgba(255,255,255,0.85)" lineHeight="1.5">
              {card.subtitle}
            </Text>
          </Box>
          <button
            onClick={onClose}
            aria-label="Fechar ficha"
            type="button"
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              background: 'rgba(255,255,255,0.2)',
              border: '1.5px solid rgba(255,255,255,0.35)',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              lineHeight: '1',
            }}
          >
            ✕
          </button>
        </Box>

        <Box px={6} py={5}>
          <Text
            fontSize="0.65rem"
            textTransform="uppercase"
            letterSpacing="0.1em"
            fontWeight="700"
            color={colors.tag}
            mb={3}
          >
            📋 Ficha Técnica
          </Text>
          <VStack gap={3} align="stretch" mb={card.callout ? 5 : 0}>
            {card.details.map((row, i) => (
              <HStack
                key={i}
                gap={3}
                align="flex-start"
                fontSize="0.83rem"
                lineHeight="1.55"
                color="#212121"
              >
                <Text fontSize="18px" flexShrink={0} mt="1px">{row.icon}</Text>
                <Text>
                  <Text as="strong" color={colors.tag}>{row.label}:</Text>{' '}{row.value}
                </Text>
              </HStack>
            ))}
          </VStack>

          {card.callout && (
            <Box
              bg={colors.bg}
              border={`1.5px solid ${colors.border}`}
              borderRadius="14px"
              px={4}
              py={3}
              display="flex"
              alignItems="flex-start"
              gap={3}
            >
              <Text fontSize="20px" flexShrink={0} mt="1px" aria-hidden="true">
                {card.callout.icon}
              </Text>
              <Text fontSize="0.82rem" color="#212121" lineHeight="1.65">
                {card.callout.text}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  )
}

export default function LapbookFolder({
  title,
  subtitle = 'Clique em um bolso para puxar a ficha de detalhes!',
  badge,
  cards,
  footerNote,
}: LapbookFolderProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const openCard = cards.find((c) => c.id === openId) ?? null

  return (
    <Box position="relative">
      <Box
        borderRadius="24px"
        overflow="hidden"
        boxShadow="0 16px 48px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.10)"
        border="2px solid rgba(120,80,30,0.18)"
        style={{ backgroundImage: KRAFT_TEXTURE }}
        bg="#f5efe0"
        mb={5}
      >
        <Box
          bg="linear-gradient(135deg, #5D4037, #795548)"
          px={{ base: 5, md: 7 }}
          py={5}
          display="flex"
          alignItems="center"
          gap={5}
          position="relative"
          overflow="hidden"
        >
          <Box position="absolute" right="-30px" top="-30px" w="120px" h="120px"
            borderRadius="50%" bg="rgba(255,255,255,0.05)" aria-hidden="true" />
          <Box position="absolute" right="40px" bottom="-40px" w="80px" h="80px"
            borderRadius="50%" bg="rgba(255,255,255,0.04)" aria-hidden="true" />

          <Box
            w="52px"
            h="52px"
            borderRadius="14px"
            bg="rgba(255,255,255,0.15)"
            border="2px solid rgba(255,255,255,0.25)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="28px"
            flexShrink={0}
            aria-hidden="true"
          >
            📁
          </Box>
          <Box flex="1">
            {badge && (
              <Box
                display="inline-flex"
                bg="rgba(255,255,255,0.2)"
                px="10px"
                py="3px"
                borderRadius="999px"
                mb={1}
              >
                <Text fontSize="0.6rem" fontWeight="700" textTransform="uppercase"
                  letterSpacing="0.08em" color="rgba(255,255,255,0.9)">
                  {badge}
                </Text>
              </Box>
            )}
            <Text
              as="h2"
              fontSize="clamp(1rem, 3vw, 1.35rem)"
              fontWeight="900"
              color="white"
              lineHeight="1.2"
              mb={1}
            >
              {title}
            </Text>
            <Text fontSize="0.78rem" color="rgba(255,255,255,0.75)" lineHeight="1.5">
              {subtitle}
            </Text>
          </Box>
        </Box>

        <Box p={{ base: 4, md: 6 }} bg="rgba(245,239,224,0.85)">
          <Box
            position="absolute"
            left="28px"
            top="0"
            bottom="0"
            w="24px"
            display="flex"
            flexDir="column"
            justifyContent="space-evenly"
            aria-hidden="true"
            pointerEvents="none"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Box
                key={i}
                w="14px"
                h="14px"
                borderRadius="50%"
                bg="rgba(120,80,30,0.15)"
                border="1.5px solid rgba(120,80,30,0.2)"
                mx="auto"
              />
            ))}
          </Box>

          <SimpleGrid columns={{ base: 1, sm: 2 }} gap={4} pl={{ base: 0, md: 2 }}>
            {cards.map((card, index) => (
              <PocketTab
                key={card.id}
                card={card}
                index={index}
                onOpen={() => setOpenId(card.id)}
              />
            ))}
          </SimpleGrid>
        </Box>

        {footerNote && (
          <Box
            borderTop="2px dashed rgba(120,80,30,0.2)"
            px={{ base: 5, md: 7 }}
            py={3}
            bg="rgba(245,239,224,0.6)"
            display="flex"
            alignItems="center"
            gap={3}
          >
            <Text fontSize="16px" aria-hidden="true">📌</Text>
            <Text fontSize="0.76rem" color="#5D4037" fontWeight="500" lineHeight="1.55" fontStyle="italic">
              {footerNote}
            </Text>
          </Box>
        )}
      </Box>

      <AnimatePresence>
        {openCard && (
          <DetailCard
            key={openCard.id}
            card={openCard}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </Box>
  )
}

'use client'

import { useState } from 'react'
import {
  Box,
  Button,
  Grid,
  Text,
  HStack,
} from '@chakra-ui/react'

/* ── Types ─────────────────────────────────────────────────────────────── */
export interface Flap {
  id: string
  frontEmoji: string
  frontText: string
  backContent: string
  backAccent?: 'green' | 'yellow' | 'red' | 'teal'
}

interface LiftTheFlapProps {
  title: string
  subtitle?: string
  flaps: Flap[]
  columns?: 2 | 3
}

/* ── Accent colour tokens ──────────────────────────────────────────────── */
const ACCENT: Record<
  NonNullable<Flap['backAccent']>,
  { bg: string; border: string }
> = {
  green: { bg: 'linear-gradient(145deg,#E8F5E9,#F1F8E9)', border: '#66BB6A' },
  yellow: { bg: 'linear-gradient(145deg,#FFF9C4,#FFFDE7)', border: '#FBC02D' },
  red: { bg: 'linear-gradient(145deg,#FFEBEE,#FCE4EC)', border: '#EF9A9A' },
  teal: { bg: 'linear-gradient(145deg,#E0F2F1,#E8F5E9)', border: '#26A69A' },
}

export default function LiftTheFlap({
  title,
  subtitle = 'Clique em cada aba para descobrir o conteúdo!',
  flaps,
  columns = 2,
}: LiftTheFlapProps) {
  const [activeId, setActiveId] = useState<string | null>(null)

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id))

  return (
    <Box w="full">
      {/* Instruction hint */}
      <HStack
        aria-hidden="true"
        bg="rgba(46,125,50,0.06)"
        border="1px solid rgba(46,125,50,0.14)"
        borderRadius="14px"
        p="12px 18px"
        mb={5}
        align="flex-start"
        gap={3}
      >
        <Text fontSize="20px" flexShrink={0} mt="1px">👆</Text>
        <Text fontSize="0.82rem" fontWeight="500" color="gray.600" lineHeight="1.55">
          {subtitle}
        </Text>
      </HStack>

      {/* Grid */}
      <Grid
        templateColumns={{ base: '1fr', sm: `repeat(${columns}, minmax(0, 1fr))` }}
        gap={4}
        role="list"
        aria-label={title}
      >
        {flaps.map((flap) => {
          const isOpen = activeId === flap.id
          const accent = ACCENT[flap.backAccent ?? 'green']

          return (
            <Box
              key={flap.id}
              borderRadius="16px"
              overflow="hidden"
              border={`2px solid ${isOpen ? accent.border : 'rgba(46,125,50,0.16)'}`}
              bg="white"
              boxShadow={isOpen ? '0 6px 24px rgba(46,125,50,0.18)' : '0 2px 10px rgba(46,125,50,0.08)'}
              transition="border-color 0.25s ease, box-shadow 0.25s ease"
              role="listitem"
            >
              {/* Flap button */}
              <Button
                id={`ltf-btn-${flap.id}`}
                w="full"
                display="flex"
                alignItems="center"
                gap={3}
                px={5}
                py={4}
                bg={isOpen
                  ? 'linear-gradient(135deg, #245c27, #2E7D32)'
                  : 'linear-gradient(135deg, #2E7D32, #388E3C)'}
                borderRadius="0"
                cursor="pointer"
                textAlign="left"
                height="auto"
                _hover={{ bg: 'linear-gradient(135deg, #245c27, #2E7D32)' }}
                _focusVisible={{ outline: '3px solid #FBC02D', outlineOffset: '-2px' }}
                onClick={() => toggle(flap.id)}
                aria-expanded={isOpen}
                aria-controls={`ltf-region-${flap.id}`}
                type="button"
                justifyContent="flex-start"
              >
                <Text
                  fontSize="28px"
                  lineHeight="1"
                  flexShrink={0}
                  style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.18))' }}
                  transform={isOpen ? 'scale(1.12)' : 'scale(1)'}
                  transition="transform 0.3s ease"
                  aria-hidden="true"
                >
                  {flap.frontEmoji}
                </Text>
                <Text
                  flex="1"
                  fontSize="0.87rem"
                  fontWeight="700"
                  color="white"
                  lineHeight="1.4"
                  letterSpacing="-0.01em"
                >
                  {flap.frontText}
                </Text>
                <Text
                  fontSize="11px"
                  color="rgba(255,255,255,0.75)"
                  flexShrink={0}
                  display="inline-block"
                  transform={isOpen ? 'rotate(-180deg)' : 'rotate(0deg)'}
                  transition="transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
                  aria-hidden="true"
                >
                  ▼
                </Text>
              </Button>

              {/* Body */}
              <Box
                id={`ltf-region-${flap.id}`}
                role="region"
                aria-labelledby={`ltf-btn-${flap.id}`}
                overflow="hidden"
                maxH={isOpen ? '400px' : '0px'}
                transition="max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1)"
                bg={accent.bg}
                borderTop={isOpen ? `2px solid ${accent.border}` : '2px solid transparent'}
              >
                <HStack align="flex-start" gap={3} p="20px 24px 24px">
                  <Text
                    fontSize="22px"
                    flexShrink={0}
                    opacity={0.45}
                    mt="3px"
                    lineHeight="1"
                    aria-hidden="true"
                  >
                    {flap.frontEmoji}
                  </Text>
                  <Text
                    fontSize="0.86rem"
                    fontWeight="400"
                    color="gray.800"
                    lineHeight="1.72"
                  >
                    {flap.backContent}
                  </Text>
                </HStack>
              </Box>
            </Box>
          )
        })}
      </Grid>
    </Box>
  )
}

'use client'

import {
  Box,
  Card,
  Flex,
  Heading,
  Separator,
  Stack,
  Text,
  Badge,
} from '@chakra-ui/react'
import {
  Lightbulb,
  CheckCircle2,
  BookmarkCheck,
  AlertTriangle,
  FileText,
} from 'lucide-react'
import type { Lesson } from '../data/educacao'
import type { FontSizeLevel } from './LessonToolbar'

interface LessonContentProps {
  lesson: Lesson
  color?: string
  fontSizeLevel?: FontSizeLevel
}

const fontSizeMap: Record<FontSizeLevel, { body: string; heading: string; line: string }> = {
  sm: { body: 'xs', heading: 'sm', line: '1.6' },
  md: { body: 'sm', heading: 'md', line: '1.75' },
  lg: { body: 'md', heading: 'lg', line: '1.85' },
}

export function LessonContent({
  lesson,
  color = '#2E7D32',
  fontSizeLevel = 'md',
}: LessonContentProps) {
  const fontSizes = fontSizeMap[fontSizeLevel]

  // Render content sections by breaking markdown-like headlines and paragraphs
  const renderFormattedBody = (rawContent?: string) => {
    if (!rawContent) return null

    const paragraphs = rawContent.split('\n\n')

    return (
      <Stack gap={4} fontSize={fontSizes.body} lineHeight={fontSizes.line} color="fg">
        {paragraphs.map((p, idx) => {
          const trimmed = p.trim()
          if (!trimmed) return null

          // H3 Heading (### ...)
          if (trimmed.startsWith('### ')) {
            return (
              <Heading
                key={idx}
                as="h3"
                fontSize={fontSizes.heading}
                fontWeight={700}
                color="primary.700"
                mt={3}
                mb={1}
              >
                {trimmed.replace('### ', '')}
              </Heading>
            )
          }

          // List item with bullet
          if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('1. ')) {
            const lines = trimmed.split('\n')
            return (
              <Box key={idx} as="ul" pl={5} style={{ listStyleType: 'disc' }}>
                {lines.map((line, liIdx) => {
                  const cleaned = line.replace(/^(\*|-|\d+\.)\s*/, '')
                  return (
                    <Box as="li" key={liIdx} mb={1.5} color="fg" fontSize={fontSizes.body} lineHeight={fontSizes.line}>
                      <span dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(cleaned) }} />
                    </Box>
                  )
                })}
              </Box>
            )
          }

          return (
            <Text
              key={idx}
              fontSize={fontSizes.body}
              lineHeight={fontSizes.line}
              color="fg"
              dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
            />
          )
        })}
      </Stack>
    )
  }

  return (
    <Stack gap={6}>
      {/* ── Summary Card ─────────────────────────────── */}
      {lesson.summary && (
        <Card.Root
          bg="surface"
          border="1.5px solid"
          borderColor="primary.100"
          borderRadius="2xl"
          boxShadow="0 2px 12px rgba(15,42,26,0.05)"
          p={5}
        >
          <Flex align="center" gap={2} mb={2}>
            <FileText size={18} color={color} strokeWidth={2.5} />
            <Text fontSize="xs" fontWeight={700} textTransform="uppercase" color="primary.600" letterSpacing="wider">
              Objetivo da Aula
            </Text>
          </Flex>
          <Text fontSize={fontSizes.body} color="muted" lineHeight={fontSizes.line}>
            {lesson.summary}
          </Text>
        </Card.Root>
      )}

      {/* ── Main Content Body ───────────────────────── */}
      <Box
        bg="surface"
        borderRadius="2xl"
        border="1.5px solid"
        borderColor="primary.100"
        p={{ base: 5, md: 8 }}
        boxShadow="0 4px 20px rgba(15,42,26,0.06)"
      >
        {renderFormattedBody(lesson.content)}
      </Box>

      {/* ── Field Tips Callout ───────────────────────── */}
      {lesson.tips && lesson.tips.length > 0 && (
        <Box
          borderRadius="2xl"
          bg="accent.50"
          border="1.5px solid"
          borderColor="accent.200"
          p={{ base: 5, md: 6 }}
        >
          <Flex align="center" gap={2.5} mb={3}>
            <Flex
              w={8}
              h={8}
              borderRadius="lg"
              bg="accent.100"
              align="center"
              justify="center"
              color="accent.700"
            >
              <Lightbulb size={18} strokeWidth={2.5} />
            </Flex>
            <Heading as="h4" fontSize={fontSizes.heading} fontWeight={700} color="accent.800">
              Dicas Práticas de Campo
            </Heading>
          </Flex>

          <Stack gap={2.5}>
            {lesson.tips.map((tip, i) => (
              <Flex key={i} align="flex-start" gap={2.5}>
                <Box pt={0.5}>
                  <CheckCircle2 size={16} color="var(--chakra-colors-accent-600)" strokeWidth={2.5} />
                </Box>
                <Text fontSize={fontSizes.body} color="accent.900" lineHeight={fontSizes.line}>
                  {tip}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      )}

      {/* ── Key Takeaways ────────────────────────────── */}
      {lesson.keyTakeaways && lesson.keyTakeaways.length > 0 && (
        <Box
          borderRadius="2xl"
          bg="primary.50"
          border="1.5px solid"
          borderColor="primary.200"
          p={{ base: 5, md: 6 }}
        >
          <Flex align="center" gap={2.5} mb={3}>
            <Flex
              w={8}
              h={8}
              borderRadius="lg"
              bg="primary.100"
              align="center"
              justify="center"
              color="primary.700"
            >
              <BookmarkCheck size={18} strokeWidth={2.5} />
            </Flex>
            <Heading as="h4" fontSize={fontSizes.heading} fontWeight={700} color="primary.800">
              Pontos-Chave para Fixação
            </Heading>
          </Flex>

          <Stack gap={2}>
            {lesson.keyTakeaways.map((point, i) => (
              <Flex key={i} align="flex-start" gap={2.5}>
                <Badge colorPalette="green" variant="subtle" size="sm" mt={0.5}>
                  {i + 1}
                </Badge>
                <Text fontSize={fontSizes.body} color="primary.900" fontWeight={500} lineHeight={fontSizes.line}>
                  {point}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      )}
    </Stack>
  )
}

/** Helper simples para formatar negrito, itálico e tags inline */
function formatInlineMarkdown(str: string): string {
  return str
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background: rgba(0,0,0,0.06); padding: 2px 5px; border-radius: 4px; font-size: 0.9em;">$1</code>')
}

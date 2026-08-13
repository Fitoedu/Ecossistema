'use client'

import { Badge, Box, Button, Flex, Heading, Progress, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, BookOpen, Lock } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface Topic {
  title: string
  description: string
  level: 'Básico' | 'Intermediário' | 'Avançado'
  category: string
  icon: LucideIcon
  color: string
  duration: string
  lessons: number
  progress: number
}

interface TopicCardProps {
  topic: Topic
  featured?: boolean
  index?: number
  locked?: boolean
}

const levelColorPalette: Record<Topic['level'], string> = {
  Básico: 'green',
  Intermediário: 'orange',
  Avançado: 'red',
}

const MotionBox = motion.create(Box)

export function TopicCard({ topic, featured = false, index = 0, locked = false }: TopicCardProps) {
  const IconComp = topic.icon
  const palette = levelColorPalette[topic.level]

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07 }}
      h="100%"
    >
      <Flex
        direction="column"
        h="100%"
        bg="surface"
        borderRadius="2xl"
        border="1.5px solid"
        borderColor={locked ? 'border' : 'primary.100'}
        overflow="hidden"
        boxShadow="0 2px 16px rgba(15,42,26,0.07)"
        opacity={locked ? 0.65 : 1}
        _hover={
          locked
            ? undefined
            : {
                boxShadow: '0 8px 32px rgba(15,42,26,0.14)',
                transform: 'translateY(-3px)',
                borderColor: 'primary.300',
              }
        }
        transition="all 0.25s ease"
        position="relative"
        aria-disabled={locked || undefined}
      >
        {/* Top accent strip */}
        <Box
          h="4px"
          w="100%"
          bg={locked ? 'gray.300' : `linear-gradient(90deg, ${topic.color}, ${topic.color}88)`}
          flexShrink={0}
        />

        {/* Card body */}
        <Flex direction="column" flex={1} p={featured ? 6 : 5} gap={4}>
          {/* Header */}
          <Flex align="flex-start" justify="space-between" gap={3}>
            <Flex
              w={featured ? 12 : 10}
              h={featured ? 12 : 10}
              borderRadius="xl"
              bg={locked ? 'gray.100' : `${topic.color}18`}
              align="center"
              justify="center"
              color={locked ? 'gray.400' : topic.color}
              flexShrink={0}
            >
              {locked ? (
                <Lock size={featured ? 22 : 18} strokeWidth={2} aria-hidden />
              ) : (
                <IconComp size={featured ? 22 : 18} strokeWidth={2} aria-hidden />
              )}
            </Flex>

            {locked ? (
              <Badge colorPalette="gray" size="sm" borderRadius="full" px={2} gap={1}>
                <Lock size={10} strokeWidth={2.5} aria-hidden />
                Bloqueado
              </Badge>
            ) : (
              <Badge colorPalette={palette} size="sm" borderRadius="full" px={2}>
                {topic.level}
              </Badge>
            )}
          </Flex>

          {/* Title + Description */}
          <Box flex={1}>
            <Heading
              as="h3"
              fontSize={featured ? 'lg' : 'md'}
              fontWeight={700}
              color={locked ? 'muted' : 'fg'}
              lineHeight={1.3}
              mb={2}
            >
              {topic.title}
            </Heading>
            <Text fontSize="sm" color="muted" lineHeight={1.65}>
              {topic.description}
            </Text>
          </Box>

          {/* Meta: duration + lessons */}
          <Flex align="center" gap={4}>
            <Flex align="center" gap={1.5} color="muted">
              <Clock size={13} strokeWidth={2} aria-hidden />
              <Text fontSize="xs" fontWeight={500}>{topic.duration}</Text>
            </Flex>
            <Flex align="center" gap={1.5} color="muted">
              <BookOpen size={13} strokeWidth={2} aria-hidden />
              <Text fontSize="xs" fontWeight={500}>{topic.lessons} lições</Text>
            </Flex>
          </Flex>

          {/* Progress — omitido quando bloqueado, já que 0% bloqueado != 0% disponível */}
          {!locked && (
            <Box>
              <Flex justify="space-between" mb={1.5}>
                <Text fontSize="xs" color="muted" fontWeight={500}>Progresso</Text>
                <Text fontSize="xs" color="primary.600" fontWeight={700}>{topic.progress}%</Text>
              </Flex>
              <Progress.Root
                value={topic.progress}
                size="xs"
                colorPalette="green"
                borderRadius="full"
              >
                <Progress.Track borderRadius="full">
                  <Progress.Range borderRadius="full" />
                </Progress.Track>
              </Progress.Root>
            </Box>
          )}

          {locked && (
            <Text fontSize="xs" color="muted" fontStyle="italic">
              Conclua o módulo anterior desta categoria para desbloquear.
            </Text>
          )}

          {/* CTA */}
          <Button
            size="sm"
            colorPalette={locked ? 'gray' : 'green'}
            variant={locked ? 'outline' : topic.progress > 0 ? 'solid' : 'outline'}
            borderRadius="lg"
            fontWeight={600}
            w="100%"
            disabled={locked}
            aria-label={
              locked
                ? `${topic.title}: bloqueado, conclua o módulo anterior para desbloquear`
                : undefined
            }
          >
            {locked ? (
              <>
                Bloqueado
                <Lock size={13} strokeWidth={2.5} aria-hidden style={{ marginLeft: 4 }} />
              </>
            ) : (
              <>
                {topic.progress > 0 ? 'Continuar módulo' : 'Iniciar módulo'}
                <ArrowRight size={14} strokeWidth={2.5} aria-hidden style={{ marginLeft: 4 }} />
              </>
            )}
          </Button>
        </Flex>
      </Flex>
    </MotionBox>
  )
}

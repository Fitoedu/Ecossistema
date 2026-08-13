'use client'

import { Box, Flex, Stat, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StatItem {
  label: string
  value: string | number
  icon: LucideIcon
  color: string
}

interface StatsBarProps {
  stats: StatItem[]
}

const MotionFlex = motion.create(Flex)

export function StatsBar({ stats }: StatsBarProps) {
  return (
    <Flex
      gap={4}
      wrap="wrap"
    >
      {stats.map((item, i) => {
        const IconComp = item.icon
        return (
          <MotionFlex
            key={item.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.08 }}
            flex={1}
            minW="130px"
            align="center"
            gap={3}
            bg="surface"
            borderRadius="xl"
            border="1.5px solid"
            borderColor="primary.100"
            px={4}
            py={3}
            boxShadow="0 1px 6px rgba(15,42,26,0.05)"
          >
            <Flex
              w={9}
              h={9}
              borderRadius="lg"
              bg={`${item.color}18`}
              align="center"
              justify="center"
              color={item.color}
              flexShrink={0}
            >
              <Box as={IconComp} size={16} strokeWidth={2} aria-hidden />
            </Flex>

            <Stat.Root size="sm">
              <Stat.Label fontSize="xs" color="muted" fontWeight={500}>
                {item.label}
              </Stat.Label>
              <Stat.ValueText fontSize="xl" fontWeight={800} color="fg" lineHeight={1.1}>
                {item.value}
              </Stat.ValueText>
            </Stat.Root>
          </MotionFlex>
        )
      })}
    </Flex>
  )
}

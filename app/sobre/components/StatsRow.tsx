import { Box, Flex, Text } from '@chakra-ui/react'
import type { Stat } from '../_data/sobre'

type StatsRowProps = {
  stats: Stat[]
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <Box
      borderRadius="2xl"
      bg="primary.600"
      px={{ base: 6, md: 10 }}
      py={6}
      overflow="hidden"
      position="relative"
    >
      {/* Círculos decorativos de fundo */}
      <Box
        aria-hidden
        position="absolute"
        top="-40px"
        right="-40px"
        w="180px"
        h="180px"
        borderRadius="full"
        bg="whiteAlpha.100"
      />
      <Box
        aria-hidden
        position="absolute"
        bottom="-30px"
        left="20%"
        w="120px"
        h="120px"
        borderRadius="full"
        bg="whiteAlpha.100"
      />

      <Flex
        position="relative"
        zIndex={1}
        justify="space-around"
        align="center"
        wrap="wrap"
        gap={6}
        role="list"
        aria-label="Métricas do projeto"
      >
        {stats.map((stat, index) => (
          <Box
            key={index}
            role="listitem"
            textAlign="center"
            color="white"
            minW="80px"
          >
            <Text
              fontSize={{ base: '2xl', md: '3xl' }}
              fontWeight={800}
              lineHeight={1}
              letterSpacing="-0.02em"
            >
              {stat.value}
              {stat.suffix && (
                <Text as="span" fontSize={{ base: 'xl', md: '2xl' }} opacity={0.8}>
                  {stat.suffix}
                </Text>
              )}
            </Text>
            <Text
              fontSize="xs"
              fontWeight={600}
              opacity={0.85}
              mt={1}
              letterSpacing="0.03em"
              textTransform="uppercase"
            >
              {stat.label}
            </Text>
          </Box>
        ))}
      </Flex>
    </Box>
  )
}

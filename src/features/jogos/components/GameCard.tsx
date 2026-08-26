import { Badge, Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import Link from 'next/link'
import type { Game } from '../data/jogos'

interface GameCardProps {
  game: Game
}

export function GameCard({ game }: GameCardProps) {
  const inner = (
    <Box
      bg={game.gradient}
      border="1.5px solid"
      borderColor={game.available ? 'transparent' : 'rgba(0,0,0,0.06)'}
      borderRadius="20px"
      p={5}
      minH="200px"
      position="relative"
      overflow="hidden"
      transition="all 0.25s ease"
      cursor={game.available ? 'pointer' : 'default'}
      opacity={game.available ? 1 : 0.72}
      _hover={
        game.available
          ? {
              transform: 'translateY(-4px)',
              boxShadow: `0 20px 40px ${game.accentColor}28`,
              borderColor: `${game.accentColor}40`,
            }
          : {}
      }
    >
      <Box
        position="absolute"
        right="-8px"
        bottom="-8px"
        fontSize="72px"
        opacity={0.1}
        lineHeight={1}
        userSelect="none"
        zIndex={0}
      >
        {game.emoji}
      </Box>

      <Stack gap={4} h="full" position="relative" zIndex={1}>
        <Flex justify="space-between" align="flex-start">
          <Flex
            w={11}
            h={11}
            borderRadius="14px"
            bg={game.iconBg}
            align="center"
            justify="center"
            color="white"
            boxShadow={`0 8px 20px ${game.accentColor}44`}
            fontSize="20px"
          >
            <Icon boxSize={5}>
              <game.icon />
            </Icon>
          </Flex>

          {game.available ? (
            <Badge
              px={2}
              py={0.5}
              borderRadius="full"
              bg={`${game.accentColor}18`}
              color={game.accentColor}
              fontSize="10px"
              fontWeight={700}
              letterSpacing="0.05em"
              textTransform="uppercase"
            >
              Disponível
            </Badge>
          ) : (
            <Badge
              px={2}
              py={0.5}
              borderRadius="full"
              bg="rgba(0,0,0,0.08)"
              color="#5c746d"
              fontSize="10px"
              fontWeight={700}
              letterSpacing="0.05em"
              textTransform="uppercase"
            >
              Em breve
            </Badge>
          )}
        </Flex>

        <Stack gap={1.5} flex={1}>
          <Text fontWeight={800} fontSize="lg" color="#1b3327" lineHeight={1.2}>
            {game.title}
          </Text>
          <Text color="#4a6358" fontSize="sm" lineHeight={1.6}>
            {game.desc}
          </Text>
        </Stack>

        <Flex align="center" gap={2}>
          <Box w={2} h={2} borderRadius="full" bg={game.accentColor} />
          <Text fontSize="xs" fontWeight={600} color={game.accentColor}>
            {game.tag}
          </Text>
        </Flex>
      </Stack>
    </Box>
  )

  if (game.available) {
    return (
      <Link href={game.href} style={{ textDecoration: 'none' }}>
        {inner}
      </Link>
    )
  }

  return inner
}
import { Box, Flex, Icon, Stack, Text } from '@chakra-ui/react'
import { LuGamepad2, LuZap } from 'react-icons/lu'
import { games } from '../_data/jogos'

export function JogosHero() {
  const totalJogos = games.length
  const jogosDisponiveis = games.filter((game) => game.available).length

  return (
    <Box
      position="relative"
      overflow="hidden"
      borderRadius="24px"
      bg="linear-gradient(135deg, var(--chakra-colors-primary-800) 0%, var(--chakra-colors-primary-600) 45%, var(--chakra-colors-accent-500) 100%)"
      boxShadow="0 20px 50px rgba(15, 107, 61, 0.22)"
      p={{ base: 6, md: 8 }}
      minH={{ base: '160px', md: '180px' }}
    >
      <Box
        position="absolute"
        inset={0}
        bg="radial-gradient(circle at 80% 20%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(circle at 10% 80%, rgba(244,176,0,0.2), transparent 35%)"
        zIndex={0}
      />
      <Box
        position="absolute"
        right={{ base: '-20px', md: '32px' }}
        top="50%"
        transform="translateY(-50%)"
        fontSize={{ base: '80px', md: '110px' }}
        opacity={0.18}
        zIndex={0}
        lineHeight={1}
        userSelect="none"
      >
        🎮
      </Box>

      <Flex
        position="relative"
        zIndex={1}
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={4}
      >
        <Stack gap={2} flex={1}>
          <Flex align="center" gap={2}>
            <Flex
              w={8}
              h={8}
              borderRadius="lg"
              bg="rgba(255,255,255,0.18)"
              align="center"
              justify="center"
            >
              <Icon boxSize={4} color="white">
                <LuGamepad2 />
              </Icon>
            </Flex>
            <Text
              fontSize="xs"
              fontWeight={700}
              color="rgba(255,255,255,0.75)"
              letterSpacing="0.1em"
              textTransform="uppercase"
            >
              Central de Jogos
            </Text>
          </Flex>

          <Text
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight={800}
            color="white"
            lineHeight={1.1}
            letterSpacing="-0.02em"
          >
            Aprenda brincando!
          </Text>
          <Text color="rgba(255,255,255,0.82)" fontSize={{ base: 'sm', md: 'md' }} maxW="480px" lineHeight={1.65}>
            Escolha um dos jogos abaixo e explore o mundo das plantas medicinais de um jeito
            divertido e interativo.
          </Text>
        </Stack>

        <Flex gap={4} align="center" shrink={0}>
          <Stack gap={1} align="center">
            <Flex align="center" gap={1}>
              <Icon color="var(--chakra-colors-accent-400)" boxSize={4}>
                <LuZap />
              </Icon>
              <Text fontSize="xl" fontWeight={800} color="white">
                {totalJogos}
              </Text>
            </Flex>
            <Text fontSize="xs" color="rgba(255,255,255,0.65)" fontWeight={600}>
              jogos
            </Text>
          </Stack>
          <Box w="1px" h="36px" bg="rgba(255,255,255,0.2)" />
          <Stack gap={1} align="center">
            <Text fontSize="xl" fontWeight={800} color="white">
              {jogosDisponiveis}
            </Text>
            <Text fontSize="xs" color="rgba(255,255,255,0.65)" fontWeight={600}>
              disponíveis
            </Text>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  )
}
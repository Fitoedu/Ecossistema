'use client'

import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  SimpleGrid,
  Image,
  Badge,
} from '@chakra-ui/react'

import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  LuBrain,
  LuGrid2X2,
  LuInfo,
  LuLetterText,
  LuPuzzle,
  LuSprout,
  LuUserRound,
  LuZap,
} from 'react-icons/lu'
import { PiCardsBold } from 'react-icons/pi'

type Game = {
  id: string
  icon: IconType
  emoji: string
  title: string
  desc: string
  tag: string
  tagColor: string
  gradient: string
  iconBg: string
  accentColor: string
  href: string
  available: boolean
}

const games: Game[] = [
  {
    id: 'quiz',
    icon: LuBrain,
    emoji: '🧠',
    title: 'Quiz de Pragas',
    desc: 'Teste seus conhecimentos sobre plantas medicinais e fitossanidade em perguntas de múltipla escolha.',
    tag: 'Conhecimento',
    tagColor: '#0f6b3d',
    gradient: 'linear-gradient(145deg, #e6f9ee 0%, #cff0df 100%)',
    iconBg: '#0f6b3d',
    accentColor: '#0f6b3d',
    href: '/jogos/quiz',
    available: true,
  },
  {
    id: 'memoria',
    icon: PiCardsBold,
    emoji: '🃏',
    title: 'Jogo da Memória',
    desc: 'Encontre os pares de plantas e seus nomes científicos virando as cartas com concentração.',
    tag: 'Memória',
    tagColor: '#7c3aed',
    gradient: 'linear-gradient(145deg, #f0ebff 0%, #e0d4fd 100%)',
    iconBg: '#7c3aed',
    accentColor: '#7c3aed',
    href: '/jogos/memoria',
    available: false,
  },
  {
    id: 'bingo',
    icon: LuGrid2X2,
    emoji: '🎱',
    title: 'Bingo Botânico',
    desc: 'Marque as plantas sorteadas na sua cartela e seja o primeiro a completar uma linha!',
    tag: 'Sorte & Atenção',
    tagColor: '#c2410c',
    gradient: 'linear-gradient(145deg, #fff3e6 0%, #fde0c0 100%)',
    iconBg: '#ea580c',
    accentColor: '#ea580c',
    href: '/jogos/bingo',
    available: false,
  },
  {
    id: 'caca-palavras',
    icon: LuLetterText,
    emoji: '🔡',
    title: 'Caça-Palavras',
    desc: 'Encontre os nomes das plantas escondidos em um grid de letras antes do tempo acabar.',
    tag: 'Vocabulário',
    tagColor: '#0369a1',
    gradient: 'linear-gradient(145deg, #e6f4ff 0%, #c8e8fd 100%)',
    iconBg: '#0369a1',
    accentColor: '#0369a1',
    href: '/jogos/caca-palavras',
    available: false,
  },
  {
    id: 'quebra-cabeca',
    icon: LuPuzzle,
    emoji: '🧩',
    title: 'Quebra-Cabeça',
    desc: 'Monte imagens de plantas medicinais peça por peça e aprenda enquanto resolve o puzzle.',
    tag: 'Raciocínio',
    tagColor: '#b45309',
    gradient: 'linear-gradient(145deg, #fffbeb 0%, #fef3c3 100%)',
    iconBg: '#d97706',
    accentColor: '#d97706',
    href: '/jogos/quebra-cabeca',
    available: false,
  },
  {
    id: 'simulador',
    icon: LuSprout,
    emoji: '🌱',
    title: 'Simulador de Cultivo',
    desc: 'Simule o cultivo de plantas medicinais, gerencie pragas e descubra as melhores práticas agrícolas.',
    tag: 'Simulação',
    tagColor: '#166534',
    gradient: 'linear-gradient(145deg, #f0fdf4 0%, #dcfce7 100%)',
    iconBg: '#16a34a',
    accentColor: '#16a34a',
    href: '/jogos/simulador',
    available: false,
  },
]

export default function JogosPage() {
  return (
    <Box
      minH="100vh"
      bg="linear-gradient(180deg, #f7faef 0%, #f7f9f2 100%)"
      px={{ base: 2, md: 3 }}
      py={{ base: 2, md: 3 }}
      color="fg"
      fontFamily="body"
    >
      <Flex
        direction="column"
        maxW="1180px"
        mx="auto"
        minH="calc(100vh - 24px)"
        borderRadius="24px"
        overflow="hidden"
        border="1px solid"
        borderColor="rgba(15, 107, 61, 0.12)"
        bg="rgba(246, 246, 252, 0.94)"
        boxShadow="0 24px 80px rgba(15, 42, 26, 0.12)"
        backdropFilter="blur(10px)"
      >
        {/* Header */}
        <Flex
          as="header"
          px={{ base: 4, md: 6 }}
          py={3}
          align="center"
          justify="space-between"
          borderBottom="1px solid"
          borderColor="brand.100"
          bg="rgba(250, 252, 246, 0.92)"
        >
          <Flex align="center" gap={3}>
            <Box
              w={8}
              h={8}
              borderRadius="full"
              overflow="hidden"
              border="1px solid"
              borderColor="brand.200"
              boxShadow="0 8px 18px rgba(15, 107, 61, 0.12)"
            >
              <Image
                src="/imgs/joaninha_corpo_todo.png"
                alt="Mascote EducaFito"
                w="full"
                h="full"
                objectFit="cover"
              />
            </Box>
            <Text fontSize="lg" fontWeight={800} color="brand.700">
              EducaFito
            </Text>
          </Flex>

          <Flex align="center" gap={3}>
            <Link href="/perfil" aria-label="Perfil" style={{ textDecoration: 'none' }}>
              <Flex
                w={8}
                h={8}
                align="center"
                justify="center"
                borderRadius="full"
                border="1px solid"
                borderColor="brand.200"
                color="brand.600"
                bg="whiteAlpha.700"
              >
                <Icon as={LuUserRound} boxSize={4} />
              </Flex>
            </Link>
            <Link href="/conteudo" aria-label="Ajuda" style={{ textDecoration: 'none' }}>
              <Flex
                w={8}
                h={8}
                align="center"
                justify="center"
                borderRadius="full"
                border="1px solid"
                borderColor="brand.200"
                color="brand.600"
                bg="whiteAlpha.700"
              >
                <Icon as={LuInfo} boxSize={4} />
              </Flex>
            </Link>
          </Flex>
        </Flex>

        <Box px={{ base: 4, md: 6, lg: 7 }} py={{ base: 4, md: 5 }}>
          <Box
            position="relative"
            overflow="hidden"
            borderRadius="20px"
            bg="linear-gradient(135deg, #1a4731 0%, #0f6b3d 45%, #f4b000 100%)"
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
                  <Box
                    w={8}
                    h={8}
                    borderRadius="lg"
                    bg="rgba(255,255,255,0.18)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="16px"
                  >
                    🎮
                  </Box>
                  <Text fontSize="xs" fontWeight={700} color="rgba(255,255,255,0.75)" letterSpacing="0.1em" textTransform="uppercase">
                    Central de Jogos
                  </Text>
                </Flex>

                <Text
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight={800}
                  color="white"
                  lineHeight={1.1}
                  letterSpacing="-0.02em"
                >
                  Aprenda brincando!
                </Text>
                <Text
                  color="rgba(255,255,255,0.82)"
                  fontSize={{ base: 'sm', md: 'md' }}
                  maxW="480px"
                  lineHeight={1.65}
                >
                  Escolha um dos jogos abaixo e explore o mundo das plantas medicinais de um jeito divertido e interativo.
                </Text>
              </Stack>

              <Flex gap={4} align="center" shrink={0}>
                <Stack gap={1} align="center">
                  <Flex align="center" gap={1}>
                    <Icon as={LuZap} color="#f4b000" boxSize={4} />
                    <Text fontSize="xl" fontWeight={800} color="white">6</Text>
                  </Flex>
                  <Text fontSize="xs" color="rgba(255,255,255,0.65)" fontWeight={600}>jogos</Text>
                </Stack>
                <Box w="1px" h="36px" bg="rgba(255,255,255,0.2)" />
                <Stack gap={1} align="center">
                  <Text fontSize="xl" fontWeight={800} color="white">2</Text>
                  <Text fontSize="xs" color="rgba(255,255,255,0.65)" fontWeight={600}>disponíveis</Text>
                </Stack>
              </Flex>
            </Flex>
          </Box>
        </Box>

        <Box px={{ base: 4, md: 6, lg: 7 }} pb={{ base: 6, md: 8 }} flex={1}>
          <Text fontSize="sm" fontWeight={700} color="#5c746d" letterSpacing="0.06em" textTransform="uppercase" mb={4}>
            Escolha seu jogo
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
        </Box>

        <Flex
          px={{ base: 4, md: 6, lg: 7 }}
          py={4}
          align="center"
          justify="space-between"
          borderTop="1px solid"
          borderColor="brand.100"
          color="muted"
          fontSize="xs"
          gap={3}
          wrap="wrap"
        >
          <Text fontWeight={700} color="brand.600">
            © 2026 EducaFito - Educação Fitossanitária Regional.
          </Text>
          <Flex align="center" gap={3} wrap="wrap" justify="flex-end">
            <Text>Parceiros institucionais</Text>
            <Text>•</Text>
            <Text>Termos de Uso</Text>
            <Text>•</Text>
            <Text>Privacidade</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

function GameCard({ game }: { game: Game }) {
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
      _hover={game.available ? {
        transform: 'translateY(-4px)',
        boxShadow: `0 20px 40px ${game.accentColor}28`,
        borderColor: `${game.accentColor}40`,
      } : {}}
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
            <Icon as={game.icon} boxSize={5} />
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
          <Box
            w={2}
            h={2}
            borderRadius="full"
            bg={game.accentColor}
          />
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

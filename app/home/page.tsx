'use client'

import {
  Box,
  Flex,
  Text,
  Stack,
  Icon,
  SimpleGrid,
  Image,
  Button,
} from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'
import { LuLeaf, LuBookOpen, LuFlaskConical, LuScrollText } from 'react-icons/lu'
import Link from 'next/link'
import type { IconType } from 'react-icons'
import {
  LuGamepad2,
  LuGraduationCap,
  LuInfo,
  LuNewspaper,
  LuUserRound,
  LuUsers,
} from 'react-icons/lu'

type Feature = {
  icon: IconType
  title: string
  desc: string
  href?: string
  bg: string
  iconBg: string
  darkText?: boolean
}

const features: Feature[] = [
  {
    icon: LuLeaf,
    title: 'Plantas Medicinais',
    desc: 'Explore um catálogo visual e didático com espécies e usos terapêuticos.',
    href: '/plantas-medicinais',
    bg: 'linear-gradient(180deg, #9ff29c 0%, #8fe98e 100%)',
    iconBg: '#1f7e32',
  },
  {
    icon: LuBookOpen,
    title: 'Cartilha Interativa',
    desc: 'Explore nosso material didático animado.',
    href: '/cartilha',
    bg: 'linear-gradient(180deg, #9ff29c 0%, #8fe98e 100%)',
    iconBg: '#1f7e32',
  },
  {
    icon: LuGamepad2,
    title: 'Jogos',
    desc: 'Aprender brincando é muito mais divertido!',
    bg: 'linear-gradient(180deg, #fff3bf 0%, #ffeaa1 100%)',
    iconBg: '#f0b000',
  },
  {
    icon: LuNewspaper,
    title: 'Na Mídia',
    desc: 'Notícias, vídeos e destaques do projeto.',
    href: '/midia',
    bg: 'linear-gradient(180deg, #2e6fcd 0%, #2a65c2 100%)',
    iconBg: '#1756ad',
    darkText: true,
  },
  {
    icon: LuUsers,
    title: 'Equipe',
    desc: 'Conheça os profissionais por trás do EducaFito.',
    href: '/perfil',
    bg: 'linear-gradient(180deg, #eff2ea 0%, #e7eae2 100%)',
    iconBg: '#2d8a3d',
  },
  {
    icon: LuInfo,
    title: 'Sobre o Projeto',
    desc: 'Nossa missão e parceiros institucionais.',
    bg: 'linear-gradient(180deg, #eff2ea 0%, #e7eae2 100%)',
    iconBg: '#2d8a3d',
  },
]

export default function Home() {
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
            minH={{ base: '320px', md: '360px' }}
            borderRadius="20px"
            bg="linear-gradient(135deg, #2b6b28 0%, #5c983d 52%, #a8d26b 100%)"
            boxShadow="0 20px 50px rgba(15, 107, 61, 0.18)"
          >
            <Box
              position="absolute"
              inset={0}
              bg="linear-gradient(90deg, rgba(8, 47, 20, 0.82) 0%, rgba(8, 47, 20, 0.5) 42%, rgba(8, 47, 20, 0.08) 100%)"
              zIndex={1}
            />
            <Box
              position="absolute"
              inset={0}
              bg="radial-gradient(circle at 15% 12%, rgba(255,255,255,0.22), transparent 30%), radial-gradient(circle at 82% 20%, rgba(255,255,255,0.14), transparent 22%), radial-gradient(circle at 70% 78%, rgba(125, 223, 113, 0.22), transparent 18%)"
              zIndex={1}
            />

            <Flex
              position="relative"
              zIndex={2}
              minH={{ base: '320px', md: '360px' }}
              direction={{ base: 'column', md: 'row' }}
              align="center"
              justify="space-between"
              gap={{ base: 6, md: 8 }}
              px={{ base: 5, md: 8, lg: 10 }}
              py={{ base: 7, md: 8 }}
            >
              <Box flex="1" maxW={{ base: '100%', md: '48%' }}>
                <Text
                  fontSize={{ base: '2xl', md: '3xl' }}
                  fontWeight={800}
                  color="white"
                  lineHeight={1.08}
                  letterSpacing="-0.03em"
                  mb={4}
                >
                  Aprenda sobre Fitossanidade
                </Text>
                <Text
                  maxW="430px"
                  color="rgba(255,255,255,0.92)"
                  fontSize={{ base: 'sm', md: 'md' }}
                  lineHeight={1.7}
                  mb={6}
                >
                  Junte-se à Dona Fito para descobrir como proteger nossas plantas e garantir alimentos saudáveis para todos!
                </Text>
                <Link href="/cartilha" style={{ textDecoration: 'none' }}>
                  <Button
                    bg="#f8bf2b"
                    color="#20311c"
                    borderRadius="lg"
                    fontWeight={800}
                    px={5}
                    boxShadow="0 12px 24px rgba(248, 191, 43, 0.32)"
                    _hover={{ bg: '#ffd24e', transform: 'translateY(-1px)' }}
                  >
                    Começar Jornada →
                  </Button>
                </Link>
              </Box>

              <Box
                flex="1"
                position="relative"
                minH={{ base: '190px', md: '260px' }}
                alignSelf="stretch"
                display="flex"
                justifyContent={{ base: 'center', md: 'flex-end' }}
                alignItems="center"
              >
                <Box
                  position="absolute"
                  inset="18% 10% 10% 10%"
                  borderRadius="full"
                  bg="radial-gradient(circle, rgba(255,255,255,0.36) 0%, rgba(255,255,255,0.1) 55%, transparent 78%)"
                  filter="blur(12px)"
                />
                <Image
                  src="/imgs/dona_fito_meio_corpo.png"
                  alt="Dona Fito em destaque"
                  position="relative"
                  zIndex={1}
                  h={{ base: '270px', md: '330px', lg: '350px' }}
                  w="auto"
                  objectFit="contain"
                  filter="drop-shadow(0 18px 24px rgba(0,0,0,0.22))"
                />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Flex>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={4}
        px={{ base: 4, md: 6, lg: 7 }}
        pb={{ base: 6, md: 7 }}
        maxW="1180px"
        mx="auto"
      >
        {features.map((f) => (
          <Box
            key={f.title}
            bg={f.bg}
            border="1px solid"
            borderColor="rgba(15, 107, 61, 0.08)"
            borderRadius="18px"
            p={5}
            transition="all 0.25s ease"
            minH="168px"
            _hover={{
              transform: 'translateY(-3px)',
              boxShadow: '0 16px 34px rgba(15, 107, 61, 0.10)',
            }}
          >
            <Stack gap={4} h="full" justify="space-between">
              <Flex
                w={10}
                h={10}
                borderRadius="md"
                bg={f.iconBg}
                align="center"
                justify="center"
                color="white"
                boxShadow="0 8px 18px rgba(0,0,0,0.14)"
              >
                <Icon as={f.icon} boxSize={4.5} />
              </Flex>
              <Text fontWeight={800} fontSize="lg" color={f.darkText ? 'white' : 'fg'}>
                {f.title}
              </Text>
              <Text color={f.darkText ? 'rgba(255,255,255,0.88)' : 'muted'} fontSize="sm" lineHeight={1.55} maxW="240px">
                {f.desc}
              </Text>
            </Stack>
          </Box>
        ))}
      </SimpleGrid>

      <Flex
        maxW="1180px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 7 }}
        py={4}
        align="center"
        justify="space-between"
        color="muted"
        fontSize="xs"
        gap={3}
        wrap="wrap"
      >
        <Text fontWeight={700} color="brand.600">
          © 2024 EducaFito - Educação Fitossanitária Regional.
        </Text>
        <Flex align="center" gap={3} wrap="wrap" justify="flex-end">
          <Text>Parceiros institucionais</Text>
          <Text>•</Text>
          <Text>Termos de Uso</Text>
          <Text>•</Text>
          <Text>Privacidade</Text>
        </Flex>
      </Flex>
    </Box>
  )
}

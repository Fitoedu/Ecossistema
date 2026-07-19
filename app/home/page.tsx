'use client'

import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Stack,
  Icon,
} from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'
import { LuLeaf, LuBookOpen, LuFlaskConical, LuScrollText } from 'react-icons/lu'
import Link from 'next/link'

const features = [
  {
    icon: LuLeaf,
    title: 'Plantas Medicinais',
    desc: 'Explore o catálogo completo de espécies com propriedades terapêuticas.',
    href: null,
  },
  {
    icon: LuBookOpen,
    title: 'Conteúdo Educativo',
    desc: 'Artigos, vídeos e quizzes criados por especialistas em fitoterapia.',
    href: null,
  },
  {
    icon: LuFlaskConical,
    title: 'Pesquisa Científica',
    desc: 'Referências atualizadas de estudos clínicos e etnobotânicos.',
    href: null,
  },
  {
    icon: LuScrollText,
    title: 'Cartilha Interativa',
    desc: 'Aprenda sobre fitossanidade, pragas e casos reais do Amapá de forma interativa.',
    href: '/cartilha',
  },
]

export default function Home() {
  return (
    <Box minH="100vh" bg="bg" color="fg" fontFamily="body">
      {/* ── Navbar ── */}
      <Flex
        as="header"
        px={{ base: 6, md: 12 }}
        py={4}
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="surface"
        backdropFilter="blur(8px)"
        position="sticky"
        top={0}
        zIndex={10}
        bg="bg"
      >
        <Flex align="center" gap={2}>
          <Text fontSize="2xl" lineHeight={1}>🌿</Text>
          <Text
            fontWeight={800}
            fontSize="xl"
            bgGradient="to-r"
            gradientFrom="brand.500"
            gradientTo="brand.300"
            bgClip="text"
          >
            FitoEdu
          </Text>
        </Flex>
        <ColorModeButton />
      </Flex>

      {/* ── Hero ── */}
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        px={6}
        pt={{ base: 20, md: 28 }}
        pb={{ base: 16, md: 20 }}
        gap={6}
      >
        <Badge
          colorPalette="green"
          variant="surface"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="sm"
          fontWeight={600}
          letterSpacing="0.05em"
        >
          🌱 Plataforma Educativa de Fitoterapia
        </Badge>

        <Heading
          as="h1"
          fontSize={{ base: '3xl', md: '5xl', lg: '6xl' }}
          fontWeight={800}
          lineHeight={1.1}
          letterSpacing="-0.02em"
          maxW="700px"
        >
          Aprenda com a{' '}
          <Text
            as="span"
            bgGradient="to-r"
            gradientFrom="brand.400"
            gradientTo="brand.200"
            bgClip="text"
          >
            natureza
          </Text>
          ,{' '}
          <Text
            as="span"
            bgGradient="to-r"
            gradientFrom="brand.600"
            gradientTo="brand.400"
            bgClip="text"
          >
            cresça
          </Text>{' '}
          com o conhecimento
        </Heading>

        <Text
          fontSize={{ base: 'md', md: 'lg' }}
          color="fg"
          opacity={0.7}
          maxW="480px"
          lineHeight={1.7}
        >
          Sua plataforma educativa sobre plantas medicinais — embasada em
          ciência, acessível para todos.
        </Text>
      </Flex>

      {/* ── Cards de funcionalidades ── */}
      <Flex
        wrap="wrap"
        justify="center"
        gap={6}
        px={{ base: 6, md: 12 }}
        pb={{ base: 16, md: 24 }}
        maxW="1100px"
        mx="auto"
      >
        {features.map((f) => {
          const cardContent = (
            <Stack gap={4}>
              <Flex
                w={12}
                h={12}
                borderRadius="xl"
                bg="brand.500"
                align="center"
                justify="center"
                color="white"
              >
                <Icon as={f.icon} boxSize={6} />
              </Flex>
              <Text fontWeight={700} fontSize="lg">
                {f.title}
              </Text>
              <Text opacity={0.7} fontSize="sm" lineHeight={1.6}>
                {f.desc}
              </Text>
              {f.href && (
                <Text
                  fontSize="xs"
                  fontWeight={700}
                  color="brand.500"
                  letterSpacing="0.04em"
                >
                  Acessar cartilha →
                </Text>
              )}
            </Stack>
          )

          return f.href ? (
            <Link
              key={f.title}
              href={f.href}
              style={{ textDecoration: 'none', flex: '1 1 280px', maxWidth: '340px', display: 'block' }}
            >
              <Box
                id={`feature-card-${f.title.toLowerCase().replace(/\s+/g, '-')}`}
                bg="surface"
                border="1px solid"
                borderColor="brand.800"
                borderRadius="2xl"
                p={7}
                transition="all 0.25s ease"
                h="100%"
                _hover={{
                  transform: 'translateY(-4px)',
                  boxShadow: '0 16px 40px rgba(16,185,129,0.25)',
                  borderColor: 'brand.500',
                }}
              >
                {cardContent}
              </Box>
            </Link>
          ) : (
            <Box
              key={f.title}
              id={`feature-card-${f.title.toLowerCase().replace(/\s+/g, '-')}`}
              flex="1 1 280px"
              maxW="340px"
              bg="surface"
              border="1px solid"
              borderColor="brand.800"
              borderRadius="2xl"
              p={7}
              transition="all 0.25s ease"
              _hover={{
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 40px rgba(16,185,129,0.15)',
                borderColor: 'brand.500',
              }}
            >
              {cardContent}
            </Box>
          )
        })}
      </Flex>
    </Box>
  )
}

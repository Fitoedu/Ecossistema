'use client'

import {
  Box,
  Flex,
  Heading,
  Text,
  Badge,
  Stack,
  Icon,
  SimpleGrid,
  Image,
} from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'
import { LuLeaf, LuBookOpen, LuFlaskConical, LuScrollText } from 'react-icons/lu'   
import Link from 'next/link'

const features = [
  {
    icon: LuLeaf,
    title: 'Plantas Medicinais',
    desc: 'Explore um catálogo visual e didático com espécies e usos terapêuticos.',
    href: '/plantas-medicinais', 

  },
  {
    icon: LuBookOpen,
    title: 'Conteúdo Educativo',
    desc: 'Artigos, vídeos e quizzes preparados para tornar o aprendizado mais claro.',
  },
  {
    icon: LuFlaskConical,
    title: 'Pesquisa Científica',
    desc: 'Conteúdo guiado por referências atuais, com linguagem acessível e objetiva.',
  },
]

export default function Home() {
  return (
    <Box minH="100vh" bg="bg" color="fg" fontFamily="body">
      <Flex
        as="header"
        px={{ base: 6, md: 12 }}
        py={4}
        align="center"
        justify="space-between"
        borderBottom="1px solid"
        borderColor="brand.100"
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
            gradientFrom="brand.600"
            gradientTo="blue.500"
            bgClip="text"
          >
            FitoEdu
          </Text>
        </Flex>
        <ColorModeButton />
      </Flex>

      <Box px={{ base: 6, md: 12 }} pt={{ base: 10, md: 16 }} pb={{ base: 10, md: 16 }}>
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          align="center"
          justify="space-between"
          gap={{ base: 8, lg: 12 }}
          maxW="1200px"
          mx="auto"
        >
          <Box flex="1" textAlign={{ base: 'center', lg: 'start' }}>
            <Badge
              colorPalette="green"
              variant="subtle"
              px={4}
              py={1}
              borderRadius="full"
              fontSize="sm"
              fontWeight={600}
              letterSpacing="0.05em"
              mb={4}
            >
              🌱 Modelo visual adaptado à referência
            </Badge>

            <Heading
              as="h1"
              fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}
              fontWeight={800}
              lineHeight={1.1}
              letterSpacing="-0.02em"
              maxW="620px"
              mb={4}
            >
              Aprenda com a{' '}
              <Text as="span" color="brand.600">
                natureza
              </Text>
              {' '}e transforme conhecimento em prática.
            </Heading>

            <Text
              fontSize={{ base: 'md', md: 'lg' }}
              color="muted"
              maxW="560px"
              lineHeight={1.7}
              mb={6}
            >
              Uma experiência mais limpa, visual e acolhedora para explorar plantas medicinais com segurança, ciência e contexto cultural.
            </Text>

            <Flex justify={{ base: 'center', lg: 'flex-start' }} align="center" gap={3}>
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="brand.600"
                color="white"
                fontWeight={600}
              >
                Conteúdo guiado
              </Box>
              <Box
                px={4}
                py={2}
                borderRadius="full"
                bg="accent"
                color="brand.900"
                fontWeight={600}
              >
                Estilo moderno
              </Box>
            </Flex>
          </Box>

          <Box flex="1" maxW="520px" w="full">
            <Box position="relative">
              <Box
                position="absolute"
                inset="-8px"
                borderRadius="3xl"
                bgGradient="linear(to-br, brand.100, blue.100)"
                filter="blur(16px)"
                opacity={0.7}
              />
              <Image
                src="/images/model.png"
                alt="Referência visual do EducaFito"
                w="full"
                h="auto"
                borderRadius="3xl"
                border="1px solid"
                borderColor="brand.100"
                boxShadow="0 24px 80px rgba(15, 107, 61, 0.16)"
                objectFit="cover"
              />
            </Box>
          </Box>
        </Flex>
      </Box>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        gap={6}
        px={{ base: 6, md: 12 }}
        pb={{ base: 16, md: 24 }}
        maxW="1200px"
        mx="auto"
      >
        {features.map((f) => (
          <Box
            key={f.title}
            bg="surface"
            border="1px solid"
            borderColor="brand.100"
            borderRadius="2xl"
            p={7}
            transition="all 0.25s ease"
            _hover={{
              transform: 'translateY(-4px)',
              boxShadow: '0 16px 40px rgba(15, 107, 61, 0.12)',
              borderColor: 'brand.300',
            }}
          >
            <Stack gap={4}>
              <Flex
                w={12}
                h={12}
                borderRadius="xl"
                bgGradient="linear(to-br, brand.600, blue.500)"
                align="center"
                justify="center"
                color="white"
              >
                <Icon as={f.icon} boxSize={6} />
              </Flex>
              <Text fontWeight={700} fontSize="lg">
                {f.title}
              </Text>
              <Text color="muted" fontSize="sm" lineHeight={1.6}>
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
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  )
}

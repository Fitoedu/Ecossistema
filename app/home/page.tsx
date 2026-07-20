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
import { Info, Leaf, BookOpen, FlaskConical, ScrollText, UserRound } from 'lucide-react'
import Link from 'next/link'

const features = [
  {
    icon: Leaf,
    title: 'Plantas Medicinais',
    desc: 'Explore o catálogo completo de espécies com propriedades terapêuticas.',
    href: null,
  },
  {
    icon: BookOpen,
    title: 'Conteúdo Educativo',
    desc: 'Artigos, vídeos e quizzes criados por especialistas em fitoterapia.',
    href: null,
  },
  {
    icon: FlaskConical,
    title: 'Pesquisa Científica',
    desc: 'Referências atualizadas de estudos clínicos e etnobotânicos.',
    href: null,
  },
  {
    icon: ScrollText,
    title: 'Cartilha Interativa',
    desc: 'Aprenda sobre fitossanidade, pragas e casos reais do Amapá de forma interativa.',
    href: '/cartilha',
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
                <Icon as={UserRound} boxSize={4} />
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
                <Icon as={Info} boxSize={4} />
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

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          gap={4}
          px={{ base: 4, md: 6, lg: 7 }}
          pb={{ base: 6, md: 7 }}
          maxW="1180px"
          mx="auto"
        >
          {features.map((f) => {
            const cardContent = (
              <Stack gap={4}>
                <Flex
                  w={10}
                  h={10}
                  borderRadius="md"
                  bg="brand.700"
                  align="center"
                  justify="center"
                  color="white"
                  boxShadow="0 8px 18px rgba(0,0,0,0.14)"
                >
                  <Icon as={f.icon} boxSize={4.5} />
                </Flex>
                <Text fontWeight={800} fontSize="lg" color="fg">
                  {f.title}
                </Text>
                <Text color="muted" fontSize="sm" lineHeight={1.55} maxW="240px">
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
                  bg="brand.700"
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
                bg="brand.700"
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
        </SimpleGrid>
      </Flex>
    </Box>
  )
}

import { Box, Flex, Text, SimpleGrid, Button, Link as ChakraLink } from '@chakra-ui/react'
import { UserRound } from 'lucide-react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { FeatureCard } from '@/app/home/components/FeatureCard'
import { features } from '@/app/home/_data/features'

export default function Home() {
  return (
    <Box
      minH="100vh"
      bg="surface"
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
        borderColor="border"
        bg="bg/95"
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
          borderColor="primary.100"
          bg="surface/95"
        >
          <Flex align="center" gap={3}>
            <Box
              w={8}
              h={8}
              borderRadius="full"
              overflow="hidden"
              border="1px solid"
              borderColor="primary.200"
              boxShadow="0 8px 18px rgba(15, 107, 61, 0.12)"
              position="relative"
            >
              <NextImage
                src="/imgs/joaninha_corpo_todo.png"
                alt="Mascote EducaFito"
                fill
                sizes="32px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
            <Text fontSize="lg" fontWeight={800} color="primary.700">
              EducaFito
            </Text>
          </Flex>

          <Flex align="center" gap={3} as="nav" aria-label="Navegação secundária">
            <ChakraLink
              asChild
              aria-label="Perfil"
              w={8}
              h={8}
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              border="1px solid"
              borderColor="primary.200"
              color="primary.600"
              bg="bg/70"
              textDecoration="none"
              _hover={{ textDecoration: 'none', bg: 'primary.50' }}
            >
              <NextLink href="/perfil">
                <UserRound size={16} />
              </NextLink>
            </ChakraLink>
          </Flex>
        </Flex>

        <Box as="main" px={{ base: 4, md: 6, lg: 7 }} py={{ base: 4, md: 5 }}>
          <Box
            position="relative"
            overflow="hidden"
            minH={{ base: '320px', md: '360px' }}
            borderRadius="20px"
            bg="linear-gradient(135deg, var(--chakra-colors-primary-800) 0%, var(--chakra-colors-primary-600) 52%, var(--chakra-colors-primary-300) 100%)"
            boxShadow="0 20px 50px rgba(15, 107, 61, 0.18)"
          >
            <Box
              position="absolute"
              inset={0}
              bg="linear-gradient(90deg, color-mix(in srgb, var(--chakra-colors-primary-900) 82%, transparent) 0%, color-mix(in srgb, var(--chakra-colors-primary-900) 50%, transparent) 42%, color-mix(in srgb, var(--chakra-colors-primary-900) 8%, transparent) 100%)"
              zIndex={1}
            />
            <Box
              position="absolute"
              inset={0}
              bg="radial-gradient(circle at 15% 12%, rgba(255,255,255,0.22), transparent 30%), radial-gradient(circle at 82% 20%, rgba(255,255,255,0.14), transparent 22%), radial-gradient(circle at 70% 78%, color-mix(in srgb, var(--chakra-colors-primary-400) 22%, transparent), transparent 18%)"
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
                  as="h1"
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
                  Junte-se à Dona Fito para descobrir como proteger nossas plantas e garantir
                  alimentos saudáveis para todos!
                </Text>
                <Button
                  asChild
                  bg="accent.400"
                  color="primary.900"
                  borderRadius="lg"
                  fontWeight={800}
                  px={5}
                  boxShadow="0 12px 24px rgba(248, 191, 43, 0.32)"
                  _hover={{ bg: 'accent.300', transform: 'translateY(-1px)' }}
                >
                  <NextLink href="/cartilha">Começar Jornada →</NextLink>
                </Button>
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
                <Box
                  position="relative"
                  zIndex={1}
                  h={{ base: '270px', md: '330px', lg: '350px' }}
                  w={{ base: '200px', md: '260px', lg: '280px' }}
                  filter="drop-shadow(0 18px 24px rgba(0,0,0,0.22))"
                >
                  <NextImage
                    src="/imgs/dona_fito_meio_corpo.png"
                    alt="Dona Fito em destaque"
                    fill
                    sizes="(max-width: 768px) 200px, 280px"
                    style={{ objectFit: 'contain' }}
                    priority
                  />
                </Box>
              </Box>
            </Flex>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} mt={{ base: 4, md: 5 }}>
            {features.map((feature) => (
              <FeatureCard key={feature.title} feature={feature} />
            ))}
          </SimpleGrid>
        </Box>

        <Flex
          as="footer"
          px={{ base: 4, md: 6, lg: 7 }}
          py={4}
          align="center"
          justify="space-between"
          direction={{ base: 'column', sm: 'row' }}
          gap={2}
          borderTop="1px solid"
          borderColor="primary.100"
          bg="rgba(250, 252, 246, 0.92)"
          fontSize="sm"
          color="muted"
        >
          <Text>© 2026 EducaFito - Educação Fitossanitária Regional.</Text>
          <Flex as="nav" aria-label="Links institucionais" align="center" gap={4}>
            <ChakraLink asChild _hover={{ color: 'primary.600' }} textDecoration="none">
              <NextLink href="/parceiros">Parceiros Institucionais</NextLink>
            </ChakraLink>
            <ChakraLink asChild _hover={{ color: 'primary.600' }} textDecoration="none">
              <NextLink href="/termos">Termos de Uso</NextLink>
            </ChakraLink>
            <ChakraLink asChild _hover={{ color: 'primary.600' }} textDecoration="none">
              <NextLink href="/privacidade">Privacidade</NextLink>
            </ChakraLink>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}
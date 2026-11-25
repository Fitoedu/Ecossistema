'use client'

import Link from 'next/link'
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  ArrowRight,
  BookOpenCheck,
  Gamepad2,
  Layers,
  Newspaper,
  Sparkles,
} from 'lucide-react'

interface RelatedMaterialsProps {
  category?: string
  topicTitle?: string
}

export function RelatedMaterials({ category, topicTitle }: RelatedMaterialsProps) {
  const materials = [
    {
      title: 'Cartilha Interativa da Dona Fito',
      category: 'Interativo',
      description:
        'Explore os organismos no microscópio virtual, investigue sintomas em lâminas e interaja com abas ilustradas.',
      href: '/cartilha',
      icon: Layers,
      color: '#2E7D32',
      badge: 'Cartilha Digital',
    },
    {
      title: 'Boletins & Mídia Fitossanitária',
      category: 'Notícias & Pesquisa',
      description:
        'Acompanhe alertas fitossanitários recentes, publicações da Embrapa e vídeos práticos de manejo.',
      href: '/midia',
      icon: Newspaper,
      color: '#1565C0',
      badge: 'Artigos & Vídeos',
    },
    {
      title: 'Arena de Jogos & Quiz Geral',
      category: 'Gamificação',
      description:
        'Desafie seus conhecimentos em rodadas rápidas com ranking, conquistas e perguntas por categoria.',
      href: '/jogos/quiz',
      icon: Gamepad2,
      color: '#E65100',
      badge: 'Desafio Rápido',
    },
  ]

  return (
    <Box
      borderRadius="2xl"
      bg="surface"
      border="1.5px solid"
      borderColor="primary.100"
      p={{ base: 5, md: 7 }}
      boxShadow="0 4px 20px rgba(15,42,26,0.06)"
    >
      <Flex align="center" justify="space-between" mb={4} wrap="wrap" gap={2}>
        <Flex align="center" gap={2.5}>
          <Flex
            w={9}
            h={9}
            borderRadius="xl"
            bg="primary.50"
            color="primary.600"
            align="center"
            justify="center"
          >
            <BookOpenCheck size={20} strokeWidth={2.5} />
          </Flex>
          <Stack gap={0}>
            <Heading as="h3" fontSize="md" fontWeight={700} color="fg">
              Conexões do Ecossistema EducaFito
            </Heading>
            <Text fontSize="xs" color="muted">
              Aprofunde seus estudos com materiais práticos integrados
            </Text>
          </Stack>
        </Flex>

        <Badge colorPalette="green" variant="subtle" borderRadius="full" px={2.5}>
          Materiais Complementares
        </Badge>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4}>
        {materials.map((m) => {
          const IconComp = m.icon
          return (
            <Flex
              key={m.title}
              direction="column"
              justify="space-between"
              p={4}
              borderRadius="xl"
              border="1.5px solid"
              borderColor="primary.100"
              bg="surface"
              _hover={{
                borderColor: 'primary.400',
                boxShadow: '0 6px 20px rgba(15,42,26,0.10)',
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s ease"
            >
              <Box mb={3}>
                <Flex justify="space-between" align="center" mb={3}>
                  <Flex
                    w={10}
                    h={10}
                    borderRadius="xl"
                    bg={`${m.color}18`}
                    color={m.color}
                    align="center"
                    justify="center"
                  >
                    <IconComp size={20} strokeWidth={2.5} />
                  </Flex>
                  <Badge colorPalette="gray" variant="subtle" size="xs" borderRadius="full">
                    {m.badge}
                  </Badge>
                </Flex>

                <Heading as="h4" fontSize="sm" fontWeight={700} color="fg" mb={1.5} lineHeight={1.3}>
                  {m.title}
                </Heading>
                <Text fontSize="xs" color="muted" lineHeight={1.6}>
                  {m.description}
                </Text>
              </Box>

              <Button
                asChild
                variant="ghost"
                colorPalette="green"
                size="xs"
                justifyContent="space-between"
                px={0}
              >
                <Link href={m.href}>
                  Acessar conteúdo
                  <ArrowRight size={13} style={{ marginLeft: 4 }} />
                </Link>
              </Button>
            </Flex>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}


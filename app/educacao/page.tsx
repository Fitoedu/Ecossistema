'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Box, Badge, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'

const temas = [
  {
    title: 'Fitopatologia básica',
    description: 'Entenda principais doenças, sintomas e manejo inicial.',
    level: 'Básico',
  },
  {
    title: 'Entomologia agrícola',
    description: 'Conheça insetos-praga e estratégias de prevenção.',
    level: 'Intermediário',
  },
  {
    title: 'Plantas medicinais',
    description: 'Explore usos terapêuticos de forma segura e contextualizada.',
    level: 'Básico',
  },
]

export default function ConteudoPage() {
  return (
    <AppShell>
      <Stack gap={6}>
        <Box>
          <Heading as="h2" size="lg">
            Módulo de conteúdo
          </Heading>
          <Text color="muted" mt={2}>
            O conteúdo educacional está organizado por temas para facilitar a navegação e a aprendizagem.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {temas.map((tema) => (
            <Box key={tema.title} borderWidth="1px" borderColor="primary.100" borderRadius="2xl" p={6} bg="surface">
              <Badge colorPalette="green" mb={3}>{tema.level}</Badge>
              <Heading as="h3" size="md" mb={2}>
                {tema.title}
              </Heading>
              <Text color="muted">{tema.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </AppShell>
  )
}

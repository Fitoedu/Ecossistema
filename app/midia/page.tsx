'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Box, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'

const midias = [
  {
    title: 'Vídeo introdutório',
    description: 'Uma visão geral sobre o uso pedagógico do conteúdo.',
  },
  {
    title: 'Entrevista com especialista',
    description: 'Conversas curtas para ampliar o entendimento do tema.',
  },
  {
    title: 'Demonstração prática',
    description: 'Exemplos visuais para reforçar a aprendizagem.',
  },
]

export default function MidiaPage() {
  return (
    <AppShell title="Mídia" description="Conteúdos em vídeo e leitura complementar.">
      <Stack gap={6}>
        <Box>
          <Heading as="h2" size="lg">
            Módulo de mídia
          </Heading>
          <Text color="muted" mt={2}>
            A experiência pode evoluir com vídeos, artigos e materiais multimídia integrados.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
          {midias.map((item) => (
            <Box key={item.title} borderWidth="1px" borderColor="brand.100" borderRadius="2xl" p={6} bg="surface">
              <Heading as="h3" size="md" mb={2}>
                {item.title}
              </Heading>
              <Text color="muted">{item.description}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </AppShell>
  )
}

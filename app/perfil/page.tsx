'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Badge, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'

export default function PerfilPage() {
  return (
    <AppShell>
      <Stack gap={6}>
        <Box borderWidth="1px" borderColor="brand.100" borderRadius="2xl" p={6} bg="surface">
          <Flex justify="space-between" align="center" gap={4} flexWrap="wrap">
            <Box>
              <Heading as="h2" size="lg">
                Progresso do estudante
              </Heading>
              <Text color="muted" mt={2}>
                O perfil centraliza o avanço em conteúdo, mídia e atividades.
              </Text>
            </Box>
            <Badge colorPalette="green" fontSize="sm">Em desenvolvimento</Badge>
          </Flex>
        </Box>

        <Box borderWidth="1px" borderColor="brand.100" borderRadius="2xl" p={6} bg="surface">
          <Heading as="h3" size="md" mb={3}>
            Próximos passos
          </Heading>
          <Stack gap={2} color="muted">
            <Text>• Persistência de progresso local</Text>
            <Text>• Conquistas e ranking</Text>
            <Text>• Melhor experiência de navegação mobile</Text>
          </Stack>
        </Box>
      </Stack>
    </AppShell>
  )
}

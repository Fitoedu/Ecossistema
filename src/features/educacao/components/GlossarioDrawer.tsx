'use client'

import { useMemo, useState } from 'react'
import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Input,
  InputGroup,
  Portal,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import {
  BookMarked,
  Lightbulb,
  Search,
  SearchX,
  Sparkles,
  X,
} from 'lucide-react'
import { termosGlossario, categoriasGlossario, TermoGlossario } from '../data/glossario'

interface GlossarioDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const categoriaColorMap: Record<string, string> = {
  Doenças: 'red',
  Pragas: 'orange',
  'Manejo e Defesa': 'green',
  'Botânica e Solo': 'teal',
}

export function GlossarioDrawer({ open, onOpenChange }: GlossarioDrawerProps) {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('Todas')

  const filteredTermos = useMemo(() => {
    const q = query.trim().toLowerCase()
    return termosGlossario.filter((item) => {
      const matchesCat = activeCategory === 'Todas' || item.categoria === activeCategory
      const matchesText =
        q === '' ||
        item.termo.toLowerCase().includes(q) ||
        item.definicao.toLowerCase().includes(q) ||
        item.exemploPratico?.toLowerCase().includes(q)
      return matchesCat && matchesText
    })
  }, [query, activeCategory])

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} size="lg">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            borderRadius="2xl"
            maxH="90vh"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            boxShadow="0 24px 60px rgba(15,42,26,0.25)"
          >
            {/* ── Header ───────────────────────────────────────── */}
            <Dialog.Header bg="primary.50" borderBottom="1px solid" borderColor="primary.100" py={4} px={6}>
              <Flex justify="space-between" align="center" w="100%">
                <Flex align="center" gap={2.5}>
                  <Flex
                    w={9}
                    h={9}
                    borderRadius="xl"
                    bg="primary.500"
                    color="white"
                    align="center"
                    justify="center"
                  >
                    <BookMarked size={20} strokeWidth={2.5} />
                  </Flex>
                  <Stack gap={0}>
                    <Dialog.Title fontSize="md" fontWeight={800} color="primary.800">
                      Glossário Fitossanitário
                    </Dialog.Title>
                    <Text fontSize="2xs" color="muted">
                      Guia de consulta rápida de termos técnicos agronômicos
                    </Text>
                  </Stack>
                </Flex>

                <Badge colorPalette="green" variant="subtle" borderRadius="full" px={2.5}>
                  {termosGlossario.length} termos
                </Badge>
              </Flex>
            </Dialog.Header>

            {/* ── Controles de Busca e Filtros ─────────────────── */}
            <Box p={4} borderBottom="1px solid" borderColor="primary.100" bg="surface">
              <InputGroup
                w="100%"
                mb={3}
                startElement={<Search size={16} color="var(--chakra-colors-neutral-500)" />}
              >
                <Input
                  placeholder="Pesquisar termo, doença ou conceito..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  borderRadius="xl"
                  size="sm"
                  bg="neutral.50"
                />
              </InputGroup>

              {/* Categorias */}
              <Flex gap={1.5} overflowX="auto" pb={1}>
                {categoriasGlossario.map((cat) => {
                  const isSelected = activeCategory === cat
                  return (
                    <Button
                      key={cat}
                      size="xs"
                      borderRadius="full"
                      variant={isSelected ? 'solid' : 'outline'}
                      colorPalette={isSelected ? 'green' : 'gray'}
                      onClick={() => setActiveCategory(cat)}
                      flexShrink={0}
                      fontWeight={600}
                    >
                      {cat}
                    </Button>
                  )
                })}
              </Flex>
            </Box>

            {/* ── Lista de Termos ──────────────────────────────── */}
            <Dialog.Body p={4} flex={1} overflowY="auto" bg="neutral.50">
              <Stack gap={3}>
                {filteredTermos.map((item) => (
                  <Box
                    key={item.id}
                    p={4}
                    borderRadius="xl"
                    bg="white"
                    border="1.5px solid"
                    borderColor="primary.100"
                    boxShadow="0 2px 10px rgba(15,42,26,0.04)"
                  >
                    <Flex justify="space-between" align="flex-start" mb={1.5} gap={2} wrap="wrap">
                      <Heading as="h4" fontSize="sm" fontWeight={800} color="primary.900">
                        {item.termo}
                      </Heading>
                      <Badge
                        colorPalette={categoriaColorMap[item.categoria] ?? 'gray'}
                        variant="subtle"
                        size="xs"
                        borderRadius="full"
                      >
                        {item.categoria}
                      </Badge>
                    </Flex>

                    <Text fontSize="xs" color="fg" lineHeight={1.6} mb={item.exemploPratico ? 2.5 : 0}>
                      {item.definicao}
                    </Text>

                    {item.exemploPratico && (
                      <Flex
                        align="flex-start"
                        gap={2}
                        p={2.5}
                        borderRadius="lg"
                        bg="accent.50"
                        border="1px solid"
                        borderColor="accent.200"
                      >
                        <Lightbulb
                          size={14}
                          color="var(--chakra-colors-accent-700)"
                          strokeWidth={2.5}
                          style={{ flexShrink: 0, marginTop: 2 }}
                        />
                        <Text fontSize="2xs" color="accent.900" lineHeight={1.5}>
                          <strong>Exemplo de Campo:</strong> {item.exemploPratico}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                ))}

                {filteredTermos.length === 0 && (
                  <Flex direction="column" align="center" justify="center" py={12} textAlign="center">
                    <SearchX size={36} color="var(--chakra-colors-neutral-400)" strokeWidth={1.5} />
                    <Heading as="h4" fontSize="sm" fontWeight={700} color="fg" mt={2} mb={1}>
                      Nenhum termo encontrado
                    </Heading>
                    <Text fontSize="xs" color="muted">
                      Tente buscar por outras palavras-chave ou limpe os filtros.
                    </Text>
                  </Flex>
                )}
              </Stack>
            </Dialog.Body>

            {/* ── Footer ───────────────────────────────────────── */}
            <Dialog.Footer bg="surface" borderTop="1px solid" borderColor="primary.100" p={3}>
              <Button variant="outline" size="sm" w="100%" onClick={() => onOpenChange(false)}>
                Fechar Glossário
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}


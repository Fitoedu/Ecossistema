'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  SimpleGrid,
  Spinner,
  Stack,
  Table,
  Text,
} from '@chakra-ui/react'
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Info,
  Layers,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { useLogs } from '@/hooks/useLogs'
import type { AppLog, LogLevel, LogModule } from '@/lib/types'

const LEVEL_COLORS: Record<LogLevel, { bg: string; color: string; palette: string }> = {
  error: { bg: 'red.50', color: 'red.700', palette: 'red' },
  warn: { bg: 'orange.50', color: 'orange.700', palette: 'orange' },
  info: { bg: 'blue.50', color: 'blue.700', palette: 'blue' },
  debug: { bg: 'gray.50', color: 'gray.700', palette: 'gray' },
}

const MODULES: { label: string; value: LogModule | 'all' }[] = [
  { label: 'Todos os módulos', value: 'all' },
  { label: 'Autenticação', value: 'auth' },
  { label: 'Educação', value: 'educacao' },
  { label: 'Quiz', value: 'quiz' },
  { label: 'Mídia', value: 'midia' },
  { label: 'Perfil', value: 'perfil' },
  { label: 'Admin', value: 'admin' },
  { label: 'Sistema', value: 'system' },
]

export default function AdminLogsPage() {
  const [level, setLevel] = useState<LogLevel | 'all'>('all')
  const [module, setModule] = useState<LogModule | 'all'>('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 20

  const { logs, total, totalPages, loading, stats, statsLoading, refetch, clearLogs } = useLogs({
    level,
    module,
    search,
    page,
    pageSize,
  })

  // Modal de Detalhes
  const [selectedLog, setSelectedLog] = useState<AppLog | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)

  // Modal de Limpeza
  const [isClearOpen, setIsClearOpen] = useState(false)
  const [clearing, setClearing] = useState(false)

  function openDetail(log: AppLog) {
    setSelectedLog(log)
    setIsDetailOpen(true)
  }

  function handleExportJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(logs, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `educafito-logs-${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }

  async function handleConfirmClear() {
    setClearing(true)
    try {
      await clearLogs(7) // Limpa logs com mais de 7 dias
      setIsClearOpen(false)
    } finally {
      setClearing(false)
    }
  }

  return (
    <AppShell>
      <Stack gap={6}>
        {/* ── Breadcrumb & Cabeçalho ── */}
        <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
          <Stack gap={1}>
            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <Flex align="center" gap={1.5} color="muted" fontSize="sm" _hover={{ color: 'primary.600' }}>
                <ArrowLeft size={16} />
                Voltar ao Admin
              </Flex>
            </Link>
            <Flex align="center" gap={2}>
              <Activity size={24} color="var(--chakra-colors-primary-600)" />
              <Heading as="h1" size="lg" color="fg">
                Logs e Auditoria
              </Heading>
            </Flex>
          </Stack>

          <HStack gap={2}>
            <Button
              size="sm"
              variant="outline"
              borderColor="primary.100"
              gap={1.5}
              onClick={handleExportJSON}
              disabled={logs.length === 0}
            >
              <Download size={15} />
              Exportar JSON
            </Button>
            <Button
              size="sm"
              variant="outline"
              colorPalette="red"
              color="red.600"
              borderColor="red.200"
              gap={1.5}
              onClick={() => setIsClearOpen(true)}
            >
              <Trash2 size={15} />
              Limpar antigos
            </Button>
            <IconButton
              aria-label="Atualizar logs"
              size="sm"
              variant="ghost"
              onClick={() => refetch()}
              loading={loading}
            >
              <RefreshCw size={16} />
            </IconButton>
          </HStack>
        </Flex>

        {/* ── Métricas Resumidas ── */}
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
          <Box p={4} borderRadius="xl" bg="surface" borderWidth="1px" borderColor="border">
            <Text fontSize="xs" color="muted" fontWeight={600} textTransform="uppercase">
              Total de Eventos
            </Text>
            <Text fontSize="2xl" fontWeight={800} color="fg" mt={1}>
              {statsLoading ? '...' : stats?.total ?? 0}
            </Text>
          </Box>

          <Box p={4} borderRadius="xl" bg="surface" borderWidth="1px" borderColor="red.100">
            <Flex align="center" justify="space-between">
              <Text fontSize="xs" color="red.600" fontWeight={600} textTransform="uppercase">
                Erros (24h)
              </Text>
              <AlertCircle size={16} color="var(--chakra-colors-red-500)" />
            </Flex>
            <Text fontSize="2xl" fontWeight={800} color="red.600" mt={1}>
              {statsLoading ? '...' : stats?.errors24h ?? 0}
            </Text>
          </Box>

          <Box p={4} borderRadius="xl" bg="surface" borderWidth="1px" borderColor="orange.100">
            <Flex align="center" justify="space-between">
              <Text fontSize="xs" color="orange.600" fontWeight={600} textTransform="uppercase">
                Avisos (24h)
              </Text>
              <AlertTriangle size={16} color="var(--chakra-colors-orange-500)" />
            </Flex>
            <Text fontSize="2xl" fontWeight={800} color="orange.600" mt={1}>
              {statsLoading ? '...' : stats?.warns24h ?? 0}
            </Text>
          </Box>

          <Box p={4} borderRadius="xl" bg="surface" borderWidth="1px" borderColor="border">
            <Flex align="center" justify="space-between">
              <Text fontSize="xs" color="muted" fontWeight={600} textTransform="uppercase">
                Módulo Ativo
              </Text>
              <Layers size={16} color="var(--chakra-colors-primary-500)" />
            </Flex>
            <Text fontSize="lg" fontWeight={700} color="primary.600" mt={1} textTransform="capitalize">
              {statsLoading ? '...' : stats?.topModule ?? 'Nenhum'}
            </Text>
          </Box>
        </SimpleGrid>

        {/* ── Barra de Filtros ── */}
        <Box p={4} borderRadius="xl" bg="surface" borderWidth="1px" borderColor="border">
          <Flex gap={3} wrap="wrap" align="center" justify="space-between">
            <HStack gap={2} wrap="wrap">
              {(['all', 'error', 'warn', 'info', 'debug'] as const).map((lvl) => (
                <Button
                  key={lvl}
                  size="xs"
                  borderRadius="full"
                  variant={level === lvl ? 'solid' : 'ghost'}
                  colorPalette={lvl === 'all' ? 'gray' : LEVEL_COLORS[lvl]?.palette || 'gray'}
                  onClick={() => {
                    setLevel(lvl)
                    setPage(1)
                  }}
                  textTransform="capitalize"
                  fontWeight={600}
                >
                  {lvl === 'all' ? 'Todos os níveis' : lvl}
                </Button>
              ))}
            </HStack>

            <Flex gap={3} align="center" wrap="wrap" flex={1} justify="flex-end">
              <Box minW="140px">
                <select
                  value={module}
                  onChange={(e) => {
                    setModule(e.target.value as LogModule | 'all')
                    setPage(1)
                  }}
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: '1px solid var(--chakra-colors-border)',
                    fontSize: '13px',
                    background: 'var(--chakra-colors-surface)',
                    color: 'var(--chakra-colors-fg)',
                  }}
                >
                  {MODULES.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </Box>

              <InputGroup maxW="240px" startElement={<Search size={14} color="muted" />}>
                <Input
                  size="sm"
                  placeholder="Buscar ação ou texto..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  borderRadius="lg"
                />
              </InputGroup>
            </Flex>
          </Flex>
        </Box>

        {/* ── Tabela de Logs ── */}
        <Box borderRadius="xl" bg="surface" borderWidth="1px" borderColor="border" overflow="hidden">
          {loading ? (
            <Flex justify="center" align="center" py={16}>
              <Spinner size="lg" color="primary.500" />
            </Flex>
          ) : logs.length === 0 ? (
            <Flex direction="column" align="center" justify="center" py={16} textAlign="center">
              <Info size={32} color="var(--chakra-colors-muted)" />
              <Text fontSize="md" fontWeight={600} color="fg" mt={3}>
                Nenhum log encontrado
              </Text>
              <Text fontSize="sm" color="muted" maxW="360px" mt={1}>
                {search || level !== 'all' || module !== 'all'
                  ? 'Tente ajustar os filtros acima para encontrar registros.'
                  : 'Os eventos do sistema aparecerão aqui automaticamente conforme os usuários utilizam o aplicativo.'}
              </Text>
            </Flex>
          ) : (
            <Table.Root size="sm" variant="line" striped>
              <Table.Header bg="neutral.50">
                <Table.Row>
                  <Table.ColumnHeader width="160px">Timestamp</Table.ColumnHeader>
                  <Table.ColumnHeader width="90px">Nível</Table.ColumnHeader>
                  <Table.ColumnHeader width="110px">Módulo</Table.ColumnHeader>
                  <Table.ColumnHeader width="170px">Ação</Table.ColumnHeader>
                  <Table.ColumnHeader>Mensagem</Table.ColumnHeader>
                  <Table.ColumnHeader width="90px" textAlign="right">Detalhes</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {logs.map((log) => {
                  const date = new Date(log.created_at)
                  const formattedDate = `${date.toLocaleDateString('pt-BR')} ${date.toLocaleTimeString('pt-BR')}`
                  const style = LEVEL_COLORS[log.level] || LEVEL_COLORS.info

                  return (
                    <Table.Row key={log.id} _hover={{ bg: 'blackAlpha.50' }}>
                      <Table.Cell fontSize="xs" color="muted" whiteSpace="nowrap">
                        {formattedDate}
                      </Table.Cell>
                      <Table.Cell>
                        <Badge
                          colorPalette={style.palette}
                          variant="subtle"
                          borderRadius="full"
                          px={2}
                          py={0.5}
                          fontSize="10px"
                          fontWeight={700}
                          textTransform="uppercase"
                        >
                          {log.level}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Badge variant="outline" borderRadius="md" px={1.5} py={0.5} fontSize="11px">
                          {log.module}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell fontSize="xs" fontWeight={600} color="fg">
                        {log.action}
                      </Table.Cell>
                      <Table.Cell fontSize="xs" color="muted" maxW="380px" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                        {log.message}
                      </Table.Cell>
                      <Table.Cell textAlign="right">
                        <Button
                          size="xs"
                          variant="ghost"
                          colorPalette="green"
                          onClick={() => openDetail(log)}
                        >
                          Ver JSON
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
              </Table.Body>
            </Table.Root>
          )}

          {/* ── Paginação ── */}
          {total > pageSize && (
            <Flex align="center" justify="space-between" p={3} borderTop="1px solid" borderColor="border">
              <Text fontSize="xs" color="muted">
                Página <strong>{page}</strong> de <strong>{totalPages}</strong> ({total} registros no total)
              </Text>
              <HStack gap={2}>
                <IconButton
                  aria-label="Página anterior"
                  size="xs"
                  variant="outline"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={14} />
                </IconButton>
                <IconButton
                  aria-label="Próxima página"
                  size="xs"
                  variant="outline"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={14} />
                </IconButton>
              </HStack>
            </Flex>
          )}
        </Box>

        {/* ── Modal de Detalhes do Log ── */}
        <Dialog.Root open={isDetailOpen} onOpenChange={(e) => !e.open && setIsDetailOpen(false)}>
          <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content bg="surface" p={6} borderRadius="2xl" maxW="2xl" borderWidth="1px" borderColor="border">
              <Flex justify="space-between" align="center" pb={3} borderBottom="1px solid" borderColor="border">
                <Dialog.Title fontWeight={700} fontSize="lg">
                  Detalhes do Evento
                </Dialog.Title>
                <IconButton
                  aria-label="Fechar"
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsDetailOpen(false)}
                >
                  <X size={16} />
                </IconButton>
              </Flex>

              {selectedLog && (
                <Stack gap={4} pt={4}>
                  <SimpleGrid columns={2} gap={3}>
                    <Box>
                      <Text fontSize="xs" color="muted">Nível</Text>
                      <Badge colorPalette={LEVEL_COLORS[selectedLog.level]?.palette} mt={1}>
                        {selectedLog.level.toUpperCase()}
                      </Badge>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="muted">Módulo</Text>
                      <Text fontSize="sm" fontWeight={600} mt={1}>{selectedLog.module}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="muted">Ação</Text>
                      <Text fontSize="sm" fontWeight={600} mt={1}>{selectedLog.action}</Text>
                    </Box>
                    <Box>
                      <Text fontSize="xs" color="muted">Usuário ID</Text>
                      <Text fontSize="xs" fontFamily="mono" color="fg" mt={1}>
                        {selectedLog.user_id || 'Anônimo / Sistema'}
                      </Text>
                    </Box>
                  </SimpleGrid>

                  <Box>
                    <Text fontSize="xs" color="muted">Mensagem</Text>
                    <Text fontSize="sm" fontWeight={500} color="fg" mt={1}>
                      {selectedLog.message}
                    </Text>
                  </Box>

                  <Box>
                    <Text fontSize="xs" color="muted" mb={1}>Payload & Metadata (JSON)</Text>
                    <Box
                      as="pre"
                      p={3}
                      borderRadius="lg"
                      bg="neutral.900"
                      color="green.300"
                      fontSize="xs"
                      fontFamily="mono"
                      overflowX="auto"
                      maxH="260px"
                    >
                      {JSON.stringify(selectedLog.metadata, null, 2)}
                    </Box>
                  </Box>
                </Stack>
              )}
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>

        {/* ── Modal de Confirmação de Limpeza ── */}
        <Dialog.Root open={isClearOpen} onOpenChange={(e) => !e.open && setIsClearOpen(false)}>
          <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
          <Dialog.Positioner>
            <Dialog.Content bg="surface" p={6} borderRadius="2xl" maxW="md" borderWidth="1px" borderColor="red.200">
              <Stack gap={4} textAlign="center" align="center">
                <Flex w={12} h={12} borderRadius="full" bg="red.100" align="center" justify="center" color="red.600">
                  <Trash2 size={24} />
                </Flex>
                <Dialog.Title fontWeight={700} fontSize="lg">
                  Limpar logs antigos?
                </Dialog.Title>
                <Text fontSize="sm" color="muted">
                  Isso apagará permanentemente todos os registros de log com mais de 7 dias. Ações recentes e auditorias da última semana serão preservadas.
                </Text>
                <Flex gap={3} w="full" pt={2}>
                  <Button variant="outline" flex={1} onClick={() => setIsClearOpen(false)} disabled={clearing}>
                    Cancelar
                  </Button>
                  <Button bg="red.600" color="white" _hover={{ bg: 'red.700' }} flex={1} onClick={handleConfirmClear} loading={clearing}>
                    Sim, limpar
                  </Button>
                </Flex>
              </Stack>
            </Dialog.Content>
          </Dialog.Positioner>
        </Dialog.Root>
      </Stack>
    </AppShell>
  )
}

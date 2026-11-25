'use client'

import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Input,
  Portal,
  Spinner,
  Stack,
  Switch as ChakraSwitch,
  Table,
  Tabs,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Plus, Pencil, Trash2, Image, Video } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import {
  getAllPublicacoesAdmin,
  createPublicacao,
  updatePublicacao,
  deletePublicacao,
} from '@/lib/services/publicacoesService'
import {
  getAllVideosAdmin,
  createVideo,
  updateVideo,
  deleteVideo,
} from '@/lib/services/videosService'
import type { Publicacao, PublicacaoInsert, Video as VideoType, VideoInsert } from '@/lib/types'

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const EMPTY_PUB: PublicacaoInsert = { slug: '', source: '', date: '', title: '', description: '', image: '', href: '', category: '', published: true }
const EMPTY_VID: VideoInsert = { href: '', title: '', description: '', order_index: 0, published: true }

export default function AdminMidiaPage() {
  // ----- publicacoes state -----
  const [pubs, setPubs] = useState<Publicacao[]>([])
  const [loadingPubs, setLoadingPubs] = useState(true)
  const [savingPub, setSavingPub] = useState(false)
  const [deletePubId, setDeletePubId] = useState<string | null>(null)
  const [pubFormOpen, setPubFormOpen] = useState(false)
  const [editingPub, setEditingPub] = useState<Publicacao | null>(null)
  const [pubForm, setPubForm] = useState<PublicacaoInsert>(EMPTY_PUB)

  // ----- videos state -----
  const [vids, setVids] = useState<VideoType[]>([])
  const [loadingVids, setLoadingVids] = useState(true)
  const [savingVid, setSavingVid] = useState(false)
  const [deleteVidId, setDeleteVidId] = useState<string | null>(null)
  const [vidFormOpen, setVidFormOpen] = useState(false)
  const [editingVid, setEditingVid] = useState<VideoType | null>(null)
  const [vidForm, setVidForm] = useState<VideoInsert>(EMPTY_VID)

  const loadPubs = useCallback(async () => {
    setLoadingPubs(true)
    try { setPubs(await getAllPublicacoesAdmin()) } finally { setLoadingPubs(false) }
  }, [])

  const loadVids = useCallback(async () => {
    setLoadingVids(true)
    try { setVids(await getAllVideosAdmin()) } finally { setLoadingVids(false) }
  }, [])

  useEffect(() => { loadPubs(); loadVids() }, [loadPubs, loadVids])

  // ----- publicacoes handlers -----
  function openCreatePub() { setEditingPub(null); setPubForm(EMPTY_PUB); setPubFormOpen(true) }

  function openEditPub(p: Publicacao) {
    setEditingPub(p)
    setPubForm({ slug: p.slug, source: p.source, date: p.date, title: p.title, description: p.description ?? '', image: p.image ?? '', href: p.href ?? '', category: p.category ?? '', published: p.published })
    setPubFormOpen(true)
  }

  async function handleSavePub() {
    setSavingPub(true)
    try {
      if (editingPub) {
        await updatePublicacao(editingPub.id, pubForm)
      } else {
        await createPublicacao({ ...pubForm, slug: pubForm.slug || slugify(pubForm.title) })
      }
      setPubFormOpen(false)
      await loadPubs()
    } finally { setSavingPub(false) }
  }

  async function handleDeletePub() {
    if (!deletePubId) return
    await deletePublicacao(deletePubId)
    setDeletePubId(null)
    await loadPubs()
  }

  // ----- videos handlers -----
  function openCreateVid() { setEditingVid(null); setVidForm(EMPTY_VID); setVidFormOpen(true) }

  function openEditVid(v: VideoType) {
    setEditingVid(v)
    setVidForm({ href: v.href, title: v.title ?? '', description: v.description ?? '', order_index: v.order_index, published: v.published })
    setVidFormOpen(true)
  }

  async function handleSaveVid() {
    setSavingVid(true)
    try {
      if (editingVid) {
        await updateVideo(editingVid.id, vidForm)
      } else {
        await createVideo(vidForm)
      }
      setVidFormOpen(false)
      await loadVids()
    } finally { setSavingVid(false) }
  }

  async function handleDeleteVid() {
    if (!deleteVidId) return
    await deleteVideo(deleteVidId)
    setDeleteVidId(null)
    await loadVids()
  }

  return (
    <AppShell>
      <Stack gap={6}>
        <Heading as="h1" fontSize="xl" fontWeight={800} color="primary.700">Midia</Heading>

        <Tabs.Root defaultValue="publicacoes" variant="enclosed" colorPalette="green">
          <Tabs.List bg="surface" borderRadius="xl" border="1.5px solid" borderColor="primary.100" p={1} mb={6}>
            <Tabs.Trigger value="publicacoes" borderRadius="lg" fontWeight={600} fontSize="sm" px={4} gap={1.5} _selected={{ bg: 'primary.500', color: 'white' }}>
              <Image size={14} />
              Publicacoes
            </Tabs.Trigger>
            <Tabs.Trigger value="videos" borderRadius="lg" fontWeight={600} fontSize="sm" px={4} gap={1.5} _selected={{ bg: 'primary.500', color: 'white' }}>
              <Video size={14} />
              Videos
            </Tabs.Trigger>
          </Tabs.List>

          {/* ── Publicacoes tab ─── */}
          <Tabs.Content value="publicacoes">
            <Flex justify="flex-end" mb={4}>
              <Button colorPalette="green" size="sm" onClick={openCreatePub}><Plus size={16} /> Nova Publicacao</Button>
            </Flex>
            {loadingPubs ? (
              <Flex justify="center" py={12}><Spinner color="primary.500" /></Flex>
            ) : (
              <Box overflowX="auto" borderRadius="xl" border="1.5px solid" borderColor="primary.100">
                <Table.Root>
                  <Table.Header>
                    <Table.Row bg="surface">
                      <Table.ColumnHeader>Titulo</Table.ColumnHeader>
                      <Table.ColumnHeader>Fonte</Table.ColumnHeader>
                      <Table.ColumnHeader>Categoria</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                      <Table.ColumnHeader>Acoes</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {pubs.map((p) => (
                      <Table.Row key={p.id} _hover={{ bg: 'surface' }}>
                        <Table.Cell maxW="240px"><Text fontSize="sm" truncate>{p.title}</Text><Text fontSize="xs" color="muted">{p.date}</Text></Table.Cell>
                        <Table.Cell fontSize="sm" color="muted">{p.source}</Table.Cell>
                        <Table.Cell><Badge colorPalette="blue" variant="subtle" borderRadius="full" fontSize="xs">{p.category ?? '-'}</Badge></Table.Cell>
                        <Table.Cell><Badge colorPalette={p.published ? 'green' : 'gray'} variant="subtle" borderRadius="full">{p.published ? 'Publicado' : 'Rascunho'}</Badge></Table.Cell>
                        <Table.Cell>
                          <Flex gap={2}>
                            <Button size="xs" variant="ghost" onClick={() => openEditPub(p)}><Pencil size={14} /></Button>
                            <Button size="xs" variant="ghost" colorPalette="red" onClick={() => setDeletePubId(p.id)}><Trash2 size={14} /></Button>
                          </Flex>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                    {pubs.length === 0 && <Table.Row><Table.Cell colSpan={5} textAlign="center" color="muted" py={8}>Nenhuma publicacao cadastrada.</Table.Cell></Table.Row>}
                  </Table.Body>
                </Table.Root>
              </Box>
            )}
          </Tabs.Content>

          {/* ── Videos tab ─── */}
          <Tabs.Content value="videos">
            <Flex justify="flex-end" mb={4}>
              <Button colorPalette="green" size="sm" onClick={openCreateVid}><Plus size={16} /> Novo Video</Button>
            </Flex>
            {loadingVids ? (
              <Flex justify="center" py={12}><Spinner color="primary.500" /></Flex>
            ) : (
              <Box overflowX="auto" borderRadius="xl" border="1.5px solid" borderColor="primary.100">
                <Table.Root>
                  <Table.Header>
                    <Table.Row bg="surface">
                      <Table.ColumnHeader>Titulo</Table.ColumnHeader>
                      <Table.ColumnHeader>URL</Table.ColumnHeader>
                      <Table.ColumnHeader>Ordem</Table.ColumnHeader>
                      <Table.ColumnHeader>Status</Table.ColumnHeader>
                      <Table.ColumnHeader>Acoes</Table.ColumnHeader>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {vids.map((v) => (
                      <Table.Row key={v.id} _hover={{ bg: 'surface' }}>
                        <Table.Cell fontSize="sm" color="fg">{v.title ?? '-'}</Table.Cell>
                        <Table.Cell maxW="200px"><Text fontSize="xs" color="muted" truncate>{v.href}</Text></Table.Cell>
                        <Table.Cell fontSize="sm" color="muted">{v.order_index}</Table.Cell>
                        <Table.Cell><Badge colorPalette={v.published ? 'green' : 'gray'} variant="subtle" borderRadius="full">{v.published ? 'Publicado' : 'Rascunho'}</Badge></Table.Cell>
                        <Table.Cell>
                          <Flex gap={2}>
                            <Button size="xs" variant="ghost" onClick={() => openEditVid(v)}><Pencil size={14} /></Button>
                            <Button size="xs" variant="ghost" colorPalette="red" onClick={() => setDeleteVidId(v.id)}><Trash2 size={14} /></Button>
                          </Flex>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                    {vids.length === 0 && <Table.Row><Table.Cell colSpan={5} textAlign="center" color="muted" py={8}>Nenhum video cadastrado.</Table.Cell></Table.Row>}
                  </Table.Body>
                </Table.Root>
              </Box>
            )}
          </Tabs.Content>
        </Tabs.Root>
      </Stack>

      {/* ── Modal Publicacao ───────────────────────────── */}
      <Dialog.Root open={pubFormOpen} onOpenChange={(e) => setPubFormOpen(e.open)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header><Dialog.Title>{editingPub ? 'Editar Publicacao' : 'Nova Publicacao'}</Dialog.Title></Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  {[
                    { key: 'title', label: 'Titulo *', ph: 'Titulo do artigo' },
                    { key: 'slug', label: 'Slug *', ph: 'titulo-do-artigo' },
                    { key: 'source', label: 'Fonte *', ph: 'G1 Amapa' },
                    { key: 'date', label: 'Data *', ph: '01 de Janeiro, 2025' },
                    { key: 'category', label: 'Categoria', ph: 'Reportagem' },
                    { key: 'image', label: 'Imagem (caminho ou URL)', ph: '/assets/midia/foto.webp' },
                    { key: 'href', label: 'Link externo', ph: 'https://...' },
                  ].map(({ key, label, ph }) => (
                    <Stack key={key} gap={1}>
                      <Text fontSize="sm" fontWeight={600}>{label}</Text>
                      <Input
                        value={(pubForm as unknown as Record<string, string>)[key] ?? ''}
                        onChange={(e) => {
                          const val = e.target.value
                          setPubForm((f) => {
                            const next = { ...f, [key]: val } as PublicacaoInsert
                            if (key === 'title' && !editingPub) next.slug = slugify(val)
                            return next
                          })
                        }}
                        placeholder={ph}
                      />
                    </Stack>
                  ))}
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>Descricao</Text>
                    <Textarea value={pubForm.description ?? ''} onChange={(e) => setPubForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
                  </Stack>
                  <Flex align="center" gap={3}>
                    <ChakraSwitch.Root checked={pubForm.published} onCheckedChange={(e) => setPubForm((f) => ({ ...f, published: e.checked }))} colorPalette="green"><ChakraSwitch.HiddenInput /><ChakraSwitch.Control><ChakraSwitch.Thumb /></ChakraSwitch.Control></ChakraSwitch.Root>
                    <Text fontSize="sm" fontWeight={600}>Publicado</Text>
                  </Flex>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setPubFormOpen(false)}>Cancelar</Button>
                <Button colorPalette="green" loading={savingPub} onClick={handleSavePub}>{editingPub ? 'Salvar' : 'Criar'}</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* ── Modal Video ───────────────────────────────── */}
      <Dialog.Root open={vidFormOpen} onOpenChange={(e) => setVidFormOpen(e.open)}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header><Dialog.Title>{editingVid ? 'Editar Video' : 'Novo Video'}</Dialog.Title></Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Stack gap={1}><Text fontSize="sm" fontWeight={600}>URL embed do YouTube *</Text><Input value={vidForm.href} onChange={(e) => setVidForm((f) => ({ ...f, href: e.target.value }))} placeholder="https://www.youtube.com/embed/..." /></Stack>
                  <Stack gap={1}><Text fontSize="sm" fontWeight={600}>Titulo</Text><Input value={vidForm.title ?? ''} onChange={(e) => setVidForm((f) => ({ ...f, title: e.target.value }))} /></Stack>
                  <Stack gap={1}><Text fontSize="sm" fontWeight={600}>Descricao</Text><Textarea value={vidForm.description ?? ''} onChange={(e) => setVidForm((f) => ({ ...f, description: e.target.value }))} rows={2} /></Stack>
                  <Stack gap={1}><Text fontSize="sm" fontWeight={600}>Ordem</Text><Input type="number" value={vidForm.order_index} onChange={(e) => setVidForm((f) => ({ ...f, order_index: Number(e.target.value) }))} /></Stack>
                  <Flex align="center" gap={3}>
                    <ChakraSwitch.Root checked={vidForm.published} onCheckedChange={(e) => setVidForm((f) => ({ ...f, published: e.checked }))} colorPalette="green"><ChakraSwitch.HiddenInput /><ChakraSwitch.Control><ChakraSwitch.Thumb /></ChakraSwitch.Control></ChakraSwitch.Root>
                    <Text fontSize="sm" fontWeight={600}>Publicado</Text>
                  </Flex>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setVidFormOpen(false)}>Cancelar</Button>
                <Button colorPalette="green" loading={savingVid} onClick={handleSaveVid}>{editingVid ? 'Salvar' : 'Criar'}</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* ── Modal Delete Pub ──────────────────────────── */}
      <Dialog.Root open={!!deletePubId} onOpenChange={(e) => { if (!e.open) setDeletePubId(null) }}>
        <Portal><Dialog.Backdrop /><Dialog.Positioner><Dialog.Content borderRadius="2xl">
          <Dialog.Header><Dialog.Title>Excluir publicacao?</Dialog.Title></Dialog.Header>
          <Dialog.Body><Text color="muted">Esta acao e irreversivel.</Text></Dialog.Body>
          <Dialog.Footer gap={3}><Button variant="ghost" onClick={() => setDeletePubId(null)}>Cancelar</Button><Button colorPalette="red" onClick={handleDeletePub}>Excluir</Button></Dialog.Footer>
        </Dialog.Content></Dialog.Positioner></Portal>
      </Dialog.Root>

      {/* ── Modal Delete Vid ──────────────────────────── */}
      <Dialog.Root open={!!deleteVidId} onOpenChange={(e) => { if (!e.open) setDeleteVidId(null) }}>
        <Portal><Dialog.Backdrop /><Dialog.Positioner><Dialog.Content borderRadius="2xl">
          <Dialog.Header><Dialog.Title>Excluir video?</Dialog.Title></Dialog.Header>
          <Dialog.Body><Text color="muted">Esta acao e irreversivel.</Text></Dialog.Body>
          <Dialog.Footer gap={3}><Button variant="ghost" onClick={() => setDeleteVidId(null)}>Cancelar</Button><Button colorPalette="red" onClick={handleDeleteVid}>Excluir</Button></Dialog.Footer>
        </Dialog.Content></Dialog.Positioner></Portal>
      </Dialog.Root>
    </AppShell>
  )
}



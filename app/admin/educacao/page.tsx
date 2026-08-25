'use client'

import {
  Badge,
  Box,
  Button,
  Dialog,
  Flex,
  Heading,
  Input,
  NativeSelect,
  Portal,
  SimpleGrid,
  Spinner,
  Stack,
  Switch as ChakraSwitch,
  Table,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Plus, Pencil, Trash2, BookOpen, ListOrdered, ArrowLeft } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import {
  getAllTopicsAdmin,
  createTopic,
  updateTopic,
  deleteTopic,
} from '@/lib/services/topicsService'
import {
  getAllLessonsAdmin,
  createLesson,
  updateLesson,
  deleteLesson,
} from '@/lib/services/lessonsService'
import type { Topic, TopicInsert, TopicUpdate, Lesson, LessonInsert, LessonUpdate } from '@/lib/types'

const EMPTY_TOPIC: TopicInsert = {
  slug: '',
  title: '',
  description: '',
  level: 'Basico',
  category: '',
  icon: '',
  color: '#2E7D32',
  duration: '',
  lessons_count: 0,
  order_index: 0,
  published: true,
}

const EMPTY_LESSON: LessonInsert = {
  topic_id: '',
  title: '',
  duration: '8 min',
  content: '',
  order_index: 1,
  published: true,
}

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export default function AdminEducacaoPage() {
  const [topics, setTopics] = useState<Topic[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Topic | null>(null)
  const [form, setForm] = useState<TopicInsert>(EMPTY_TOPIC)

  // ── Gestão de Aulas do Tópico ───────────────────────────
  const [selectedTopicForLessons, setSelectedTopicForLessons] = useState<Topic | null>(null)
  const [lessons, setLessons] = useState<Lesson[]>([])
  const [lessonsLoading, setLessonsLoading] = useState(false)
  const [lessonFormOpen, setLessonFormOpen] = useState(false)
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null)
  const [lessonForm, setLessonForm] = useState<LessonInsert>(EMPTY_LESSON)
  const [lessonDeleteId, setLessonDeleteId] = useState<string | null>(null)

  const loadTopics = useCallback(async () => {
    setLoading(true)
    try {
      setTopics(await getAllTopicsAdmin())
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTopics()
  }, [loadTopics])

  // Carrega aulas do tópico selecionado
  const loadLessons = useCallback(async (topicId: string) => {
    setLessonsLoading(true)
    try {
      const data = await getAllLessonsAdmin(topicId)
      setLessons(data)
    } catch {
      setLessons([])
    } finally {
      setLessonsLoading(false)
    }
  }, [])

  function openLessonsModal(topic: Topic) {
    setSelectedTopicForLessons(topic)
    loadLessons(topic.id)
  }

  function openCreateTopic() {
    setEditing(null)
    setForm(EMPTY_TOPIC)
    setFormOpen(true)
  }

  function openEditTopic(topic: Topic) {
    setEditing(topic)
    setForm({
      slug: topic.slug,
      title: topic.title,
      description: topic.description ?? '',
      level: topic.level,
      category: topic.category,
      icon: topic.icon ?? '',
      color: topic.color ?? '#2E7D32',
      duration: topic.duration ?? '',
      lessons_count: topic.lessons_count,
      order_index: topic.order_index,
      published: topic.published,
    })
    setFormOpen(true)
  }

  function setTopicField(key: keyof TopicInsert, value: unknown) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSaveTopic() {
    setSaving(true)
    try {
      if (editing) {
        await updateTopic(editing.id, form as TopicUpdate)
      } else {
        await createTopic({ ...form, slug: form.slug || slugify(form.title) })
      }
      setFormOpen(false)
      await loadTopics()
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteTopic() {
    if (!deleteId) return
    await deleteTopic(deleteId)
    setDeleteId(null)
    await loadTopics()
  }

  // ── Handlers de Aulas ───────────────────────────────────
  function openCreateLesson() {
    if (!selectedTopicForLessons) return
    setEditingLesson(null)
    setLessonForm({
      ...EMPTY_LESSON,
      topic_id: selectedTopicForLessons.id,
      order_index: lessons.length + 1,
    })
    setLessonFormOpen(true)
  }

  function openEditLesson(lesson: Lesson) {
    setEditingLesson(lesson)
    setLessonForm({
      topic_id: lesson.topic_id,
      title: lesson.title,
      duration: lesson.duration ?? '8 min',
      content: lesson.content ?? '',
      order_index: lesson.order_index,
      published: lesson.published,
    })
    setLessonFormOpen(true)
  }

  function setLessonField(key: keyof LessonInsert, value: unknown) {
    setLessonForm((f) => ({ ...f, [key]: value }))
  }

  async function handleSaveLesson() {
    if (!selectedTopicForLessons) return
    setSaving(true)
    try {
      if (editingLesson) {
        await updateLesson(editingLesson.id, lessonForm as LessonUpdate)
      } else {
        await createLesson(lessonForm)
      }
      setLessonFormOpen(false)
      await loadLessons(selectedTopicForLessons.id)
      await loadTopics()
    } finally {
      setSaving(false)
    }
  }

  async function handleDeleteLesson() {
    if (!lessonDeleteId || !selectedTopicForLessons) return
    await deleteLesson(lessonDeleteId)
    setLessonDeleteId(null)
    await loadLessons(selectedTopicForLessons.id)
    await loadTopics()
  }

  return (
    <AppShell>
      <Stack gap={6}>
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Heading as="h1" fontSize="xl" fontWeight={800} color="primary.700">
            Módulos Educativos
          </Heading>
          <Button colorPalette="green" size="sm" onClick={openCreateTopic}>
            <Plus size={16} />
            Novo Módulo
          </Button>
        </Flex>

        {loading ? (
          <Flex justify="center" py={12}>
            <Spinner color="primary.500" />
          </Flex>
        ) : (
          <Box
            overflowX="auto"
            borderRadius="xl"
            border="1.5px solid"
            borderColor="primary.100"
          >
            <Table.Root>
              <Table.Header>
                <Table.Row bg="surface">
                  <Table.ColumnHeader>Título</Table.ColumnHeader>
                  <Table.ColumnHeader>Categoria</Table.ColumnHeader>
                  <Table.ColumnHeader>Nível</Table.ColumnHeader>
                  <Table.ColumnHeader>Aulas</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader textAlign="right">Ações</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {topics.map((t) => (
                  <Table.Row key={t.id} _hover={{ bg: 'surface' }}>
                    <Table.Cell fontWeight={600} color="fg" maxW="240px">
                      <Text truncate>{t.title}</Text>
                      <Text fontSize="xs" color="muted">
                        {t.slug}
                      </Text>
                    </Table.Cell>
                    <Table.Cell color="muted" fontSize="sm">
                      {t.category}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorPalette={
                          t.level === 'Basico'
                            ? 'green'
                            : t.level === 'Intermediario'
                              ? 'blue'
                              : 'red'
                        }
                        variant="subtle"
                        borderRadius="full"
                      >
                        {t.level}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell color="muted" fontSize="sm">
                      <Button
                        size="xs"
                        variant="subtle"
                        colorPalette="green"
                        borderRadius="md"
                        onClick={() => openLessonsModal(t)}
                        gap={1.5}
                      >
                        <ListOrdered size={12} />
                        {t.lessons_count} aulas
                      </Button>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge
                        colorPalette={t.published ? 'green' : 'gray'}
                        variant="subtle"
                        borderRadius="full"
                      >
                        {t.published ? 'Publicado' : 'Rascunho'}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell textAlign="right">
                      <Flex justify="flex-end" gap={1}>
                        <Button
                          size="xs"
                          variant="ghost"
                          title="Gerenciar Aulas"
                          onClick={() => openLessonsModal(t)}
                        >
                          <BookOpen size={14} />
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          title="Editar Tópico"
                          onClick={() => openEditTopic(t)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button
                          size="xs"
                          variant="ghost"
                          colorPalette="red"
                          title="Excluir Tópico"
                          onClick={() => setDeleteId(t.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {topics.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={6} textAlign="center" color="muted" py={8}>
                      Nenhum módulo cadastrado ainda.
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Stack>

      {/* ── Modal Gerenciar Aulas do Tópico ─────────────── */}
      <Dialog.Root
        open={!!selectedTopicForLessons}
        onOpenChange={(e) => {
          if (!e.open) setSelectedTopicForLessons(null)
        }}
        size="xl"
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl" maxH="90vh" overflowY="auto">
              <Dialog.Header>
                <Flex justify="space-between" align="center" w="100%" pr={4}>
                  <Stack gap={0}>
                    <Dialog.Title>Aulas do Módulo</Dialog.Title>
                    <Text fontSize="xs" color="muted">
                      {selectedTopicForLessons?.title}
                    </Text>
                  </Stack>
                  <Button colorPalette="green" size="xs" onClick={openCreateLesson}>
                    <Plus size={14} />
                    Nova Aula
                  </Button>
                </Flex>
              </Dialog.Header>

              <Dialog.Body>
                {lessonsLoading ? (
                  <Flex justify="center" py={8}>
                    <Spinner color="primary.500" />
                  </Flex>
                ) : (
                  <Stack gap={3}>
                    {lessons.map((l, idx) => (
                      <Flex
                        key={l.id}
                        align="center"
                        justify="space-between"
                        p={3}
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="primary.100"
                        bg="surface"
                        _hover={{ bg: 'primary.50' }}
                        transition="background 0.15s ease"
                      >
                        <Flex align="center" gap={3} flex={1}>
                          <Badge colorPalette="gray" size="sm" borderRadius="md">
                            #{l.order_index ?? idx + 1}
                          </Badge>
                          <Stack gap={0}>
                            <Text fontSize="sm" fontWeight={600} color="fg">
                              {l.title}
                            </Text>
                            <Text fontSize="xs" color="muted">
                              {l.duration ?? '8 min'} • {l.published ? 'Publicada' : 'Rascunho'}
                            </Text>
                          </Stack>
                        </Flex>

                        <Flex gap={1}>
                          <Button size="xs" variant="ghost" onClick={() => openEditLesson(l)}>
                            <Pencil size={13} />
                          </Button>
                          <Button
                            size="xs"
                            variant="ghost"
                            colorPalette="red"
                            onClick={() => setLessonDeleteId(l.id)}
                          >
                            <Trash2 size={13} />
                          </Button>
                        </Flex>
                      </Flex>
                    ))}

                    {lessons.length === 0 && (
                      <Flex direction="column" align="center" justify="center" py={8} textAlign="center">
                        <Text fontSize="sm" color="muted" mb={3}>
                          Nenhuma aula cadastrada especificamente neste tópico.
                        </Text>
                        <Button size="xs" colorPalette="green" onClick={openCreateLesson}>
                          <Plus size={14} /> Cadastrar primeira aula
                        </Button>
                      </Flex>
                    )}
                  </Stack>
                )}
              </Dialog.Body>

              <Dialog.Footer gap={3}>
                <Button variant="outline" onClick={() => setSelectedTopicForLessons(null)}>
                  Fechar
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* ── Modal Criar / Editar Aula ───────────────────── */}
      <Dialog.Root open={lessonFormOpen} onOpenChange={(e) => setLessonFormOpen(e.open)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header>
                <Dialog.Title>{editingLesson ? 'Editar Aula' : 'Nova Aula'}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Stack gap={1} gridColumn="1 / -1">
                    <Text fontSize="sm" fontWeight={600}>
                      Título da Aula *
                    </Text>
                    <Input
                      value={lessonForm.title}
                      onChange={(e) => setLessonField('title', e.target.value)}
                      placeholder="Ex: 1. O que é Fitopatologia"
                    />
                  </Stack>

                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Duração Estimada
                    </Text>
                    <Input
                      value={lessonForm.duration ?? ''}
                      onChange={(e) => setLessonField('duration', e.target.value)}
                      placeholder="Ex: 8 min"
                    />
                  </Stack>

                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Ordem de Exibição
                    </Text>
                    <Input
                      type="number"
                      value={lessonForm.order_index}
                      onChange={(e) => setLessonField('order_index', Number(e.target.value))}
                    />
                  </Stack>

                  <Stack gap={1} gridColumn="1 / -1">
                    <Text fontSize="sm" fontWeight={600}>
                      Conteúdo da Lição (Texto / Markdown)
                    </Text>
                    <Textarea
                      value={lessonForm.content ?? ''}
                      onChange={(e) => setLessonField('content', e.target.value)}
                      rows={8}
                      placeholder="Escreva o conteúdo formatado com títulos (### Título), tópicos (* item) e destaques (**negrito**)..."
                    />
                  </Stack>

                  <Flex align="center" gap={3} pt={2}>
                    <ChakraSwitch.Root
                      checked={lessonForm.published}
                      onCheckedChange={(e) => setLessonField('published', e.checked)}
                      colorPalette="green"
                    >
                      <ChakraSwitch.HiddenInput />
                      <ChakraSwitch.Control>
                        <ChakraSwitch.Thumb />
                      </ChakraSwitch.Control>
                    </ChakraSwitch.Root>
                    <Text fontSize="sm" fontWeight={600}>
                      Publicada
                    </Text>
                  </Flex>
                </SimpleGrid>
              </Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setLessonFormOpen(false)}>
                  Cancelar
                </Button>
                <Button colorPalette="green" loading={saving} onClick={handleSaveLesson}>
                  {editingLesson ? 'Salvar Aula' : 'Criar Aula'}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* ── Modal Confirmar Exclusão de Aula ────────────── */}
      <Dialog.Root
        open={!!lessonDeleteId}
        onOpenChange={(e) => {
          if (!e.open) setLessonDeleteId(null)
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header>
                <Dialog.Title>Excluir aula?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text color="muted">Tem certeza de que deseja excluir permanentemente esta aula?</Text>
              </Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setLessonDeleteId(null)}>
                  Cancelar
                </Button>
                <Button colorPalette="red" onClick={handleDeleteLesson}>
                  Excluir
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* ── Modal Formulário de Tópico ───────────────────── */}
      <Dialog.Root open={formOpen} onOpenChange={(e) => setFormOpen(e.open)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header>
                <Dialog.Title>{editing ? 'Editar Módulo' : 'Novo Módulo'}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Título *
                    </Text>
                    <Input
                      value={form.title}
                      onChange={(e) => {
                        setTopicField('title', e.target.value)
                        if (!editing) setTopicField('slug', slugify(e.target.value))
                      }}
                      placeholder="Ex: Fitopatologia Básica"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Slug *
                    </Text>
                    <Input
                      value={form.slug}
                      onChange={(e) => setTopicField('slug', e.target.value)}
                      placeholder="fitopatologia-basica"
                    />
                  </Stack>
                  <Stack gap={1} gridColumn="1 / -1">
                    <Text fontSize="sm" fontWeight={600}>
                      Descrição
                    </Text>
                    <Textarea
                      value={form.description ?? ''}
                      onChange={(e) => setTopicField('description', e.target.value)}
                      rows={3}
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Nível *
                    </Text>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        value={form.level}
                        onChange={(e) => setTopicField('level', e.target.value)}
                      >
                        <option value="Basico">Básico</option>
                        <option value="Intermediario">Intermediário</option>
                        <option value="Avancado">Avançado</option>
                      </NativeSelect.Field>
                    </NativeSelect.Root>
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Categoria *
                    </Text>
                    <Input
                      value={form.category}
                      onChange={(e) => setTopicField('category', e.target.value)}
                      placeholder="Ex: Fitopatologia"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Ícone (nome Lucide)
                    </Text>
                    <Input
                      value={form.icon ?? ''}
                      onChange={(e) => setTopicField('icon', e.target.value)}
                      placeholder="Microscope"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Cor (hex)
                    </Text>
                    <Input
                      value={form.color ?? ''}
                      onChange={(e) => setTopicField('color', e.target.value)}
                      placeholder="#2E7D32"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Duração
                    </Text>
                    <Input
                      value={form.duration ?? ''}
                      onChange={(e) => setTopicField('duration', e.target.value)}
                      placeholder="45 min"
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Nº de aulas
                    </Text>
                    <Input
                      type="number"
                      value={form.lessons_count}
                      onChange={(e) => setTopicField('lessons_count', Number(e.target.value))}
                    />
                  </Stack>
                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>
                      Ordem
                    </Text>
                    <Input
                      type="number"
                      value={form.order_index}
                      onChange={(e) => setTopicField('order_index', Number(e.target.value))}
                    />
                  </Stack>
                  <Flex align="center" gap={3} pt={2}>
                    <ChakraSwitch.Root
                      checked={form.published}
                      onCheckedChange={(e) => setTopicField('published', e.checked)}
                      colorPalette="green"
                    >
                      <ChakraSwitch.HiddenInput />
                      <ChakraSwitch.Control>
                        <ChakraSwitch.Thumb />
                      </ChakraSwitch.Control>
                    </ChakraSwitch.Root>
                    <Text fontSize="sm" fontWeight={600}>
                      Publicado
                    </Text>
                  </Flex>
                </SimpleGrid>
              </Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setFormOpen(false)}>
                  Cancelar
                </Button>
                <Button colorPalette="green" loading={saving} onClick={handleSaveTopic}>
                  {editing ? 'Salvar alterações' : 'Criar módulo'}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* ── Modal Confirmação Delete Tópico ─────────────── */}
      <Dialog.Root
        open={!!deleteId}
        onOpenChange={(e) => {
          if (!e.open) setDeleteId(null)
        }}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header>
                <Dialog.Title>Excluir módulo?</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text color="muted">
                  Esta ação é irreversível. Todas as aulas vinculadas também serão excluídas.
                </Text>
              </Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setDeleteId(null)}>
                  Cancelar
                </Button>
                <Button colorPalette="red" onClick={handleDeleteTopic}>
                  Excluir
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </AppShell>
  )
}

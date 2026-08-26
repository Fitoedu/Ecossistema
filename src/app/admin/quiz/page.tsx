'use client'

import {
  Badge,
  Box,
  Button,
  Checkbox,
  Dialog,
  Flex,
  Heading,
  Input,
  NativeSelect,
  Portal,
  Spinner,
  Stack,
  Switch as ChakraSwitch,
  Table,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import {
  getAllQuestionsAdmin,
  createQuestion,
  updateQuestion,
  replaceOptions,
  deleteQuestion,
} from '@/lib/services/quizService'
import type { QuizQuestionWithOptions, QuizQuestionInsert } from '@/lib/types'

const CATEGORIES = ['pragas', 'plantas', 'fitossanidade', 'identificacao']
const DIFFICULTIES = [
  { value: 'facil', label: 'Facil' },
  { value: 'medio', label: 'Medio' },
  { value: 'dificil', label: 'Dificil' },
]

type OptionDraft = { text: string; is_correct: boolean }

const EMPTY_FORM: { category: string; question: string; explanation: string; difficulty: 'facil' | 'medio' | 'dificil'; published: boolean } = { category: 'pragas', question: '', explanation: '', difficulty: 'medio', published: true }
const EMPTY_OPTIONS: OptionDraft[] = [
  { text: '', is_correct: true },
  { text: '', is_correct: false },
  { text: '', is_correct: false },
  { text: '', is_correct: false },
]

export default function AdminQuizPage() {
  const [questions, setQuestions] = useState<QuizQuestionWithOptions[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<QuizQuestionWithOptions | null>(null)
  const [form, setForm] = useState(EMPTY_FORM)
  const [options, setOptions] = useState<OptionDraft[]>(EMPTY_OPTIONS)

  const load = useCallback(async () => {
    setLoading(true)
    try { setQuestions(await getAllQuestionsAdmin()) } finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  function openCreate() {
    setEditing(null)
    setForm(EMPTY_FORM)
    setOptions(EMPTY_OPTIONS)
    setFormOpen(true)
  }

  function openEdit(q: QuizQuestionWithOptions) {
    setEditing(q)
    setForm({ category: q.category, question: q.question, explanation: q.explanation ?? '', difficulty: q.difficulty, published: q.published })
    const opts: OptionDraft[] = q.quiz_options.map((o) => ({ text: o.text, is_correct: o.is_correct }))
    while (opts.length < 2) opts.push({ text: '', is_correct: false })
    setOptions(opts)
    setFormOpen(true)
  }

  function setOpt(i: number, key: keyof OptionDraft, value: unknown) {
    setOptions((prev) => prev.map((o, idx) => idx === i ? { ...o, [key]: value } : key === 'is_correct' && value ? { ...o, is_correct: false } : o))
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload: QuizQuestionInsert = { ...form }
      if (editing) {
        await updateQuestion(editing.id, payload)
        await replaceOptions(editing.id, options.filter((o) => o.text.trim()))
      } else {
        await createQuestion(payload, options.filter((o) => o.text.trim()))
      }
      setFormOpen(false)
      await load()
    } finally { setSaving(false) }
  }

  async function handleDelete() {
    if (!deleteId) return
    await deleteQuestion(deleteId)
    setDeleteId(null)
    await load()
  }

  const diffColor = (d: string) => d === 'facil' ? 'green' : d === 'medio' ? 'yellow' : 'red'

  return (
    <AppShell>
      <Stack gap={6}>
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Heading as="h1" fontSize="xl" fontWeight={800} color="primary.700">
            Perguntas do Quiz
          </Heading>
          <Button colorPalette="green" size="sm" onClick={openCreate}>
            <Plus size={16} /> Nova Pergunta
          </Button>
        </Flex>

        {loading ? (
          <Flex justify="center" py={12}><Spinner color="primary.500" /></Flex>
        ) : (
          <Box overflowX="auto" borderRadius="xl" border="1.5px solid" borderColor="primary.100">
            <Table.Root>
              <Table.Header>
                <Table.Row bg="surface">
                  <Table.ColumnHeader>Pergunta</Table.ColumnHeader>
                  <Table.ColumnHeader>Categoria</Table.ColumnHeader>
                  <Table.ColumnHeader>Dificuldade</Table.ColumnHeader>
                  <Table.ColumnHeader>Opcoes</Table.ColumnHeader>
                  <Table.ColumnHeader>Status</Table.ColumnHeader>
                  <Table.ColumnHeader>Acoes</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {questions.map((q) => (
                  <Table.Row key={q.id} _hover={{ bg: 'surface' }}>
                    <Table.Cell maxW="280px">
                      <Text fontSize="sm" color="fg" lineClamp={2}>{q.question}</Text>
                    </Table.Cell>
                    <Table.Cell><Badge colorPalette="blue" variant="subtle" borderRadius="full" fontSize="xs">{q.category}</Badge></Table.Cell>
                    <Table.Cell><Badge colorPalette={diffColor(q.difficulty)} variant="subtle" borderRadius="full" fontSize="xs">{q.difficulty}</Badge></Table.Cell>
                    <Table.Cell color="muted" fontSize="sm">{q.quiz_options.length}</Table.Cell>
                    <Table.Cell><Badge colorPalette={q.published ? 'green' : 'gray'} variant="subtle" borderRadius="full">{q.published ? 'Publicado' : 'Rascunho'}</Badge></Table.Cell>
                    <Table.Cell>
                      <Flex gap={2}>
                        <Button size="xs" variant="ghost" onClick={() => openEdit(q)}><Pencil size={14} /></Button>
                        <Button size="xs" variant="ghost" colorPalette="red" onClick={() => setDeleteId(q.id)}><Trash2 size={14} /></Button>
                      </Flex>
                    </Table.Cell>
                  </Table.Row>
                ))}
                {questions.length === 0 && (
                  <Table.Row>
                    <Table.Cell colSpan={6} textAlign="center" color="muted" py={8}>Nenhuma pergunta cadastrada ainda.</Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table.Root>
          </Box>
        )}
      </Stack>

      {/* ── Modal Formulario ───────────────────────────── */}
      <Dialog.Root open={formOpen} onOpenChange={(e) => setFormOpen(e.open)} size="lg">
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header>
                <Dialog.Title>{editing ? 'Editar Pergunta' : 'Nova Pergunta'}</Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Stack gap={4}>
                  <Flex gap={4} wrap="wrap">
                    <Stack gap={1} flex={1} minW="180px">
                      <Text fontSize="sm" fontWeight={600}>Categoria *</Text>
                      <NativeSelect.Root>
                        <NativeSelect.Field value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Stack>
                    <Stack gap={1} flex={1} minW="140px">
                      <Text fontSize="sm" fontWeight={600}>Dificuldade</Text>
                      <NativeSelect.Root>
                        <NativeSelect.Field value={form.difficulty} onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value as 'facil' | 'medio' | 'dificil' }))}>
                          {DIFFICULTIES.map((d) => <option key={d.value} value={d.value}>{d.label}</option>)}
                        </NativeSelect.Field>
                      </NativeSelect.Root>
                    </Stack>
                  </Flex>

                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>Pergunta *</Text>
                    <Textarea value={form.question} onChange={(e) => setForm((f) => ({ ...f, question: e.target.value }))} rows={3} />
                  </Stack>

                  <Stack gap={1}>
                    <Text fontSize="sm" fontWeight={600}>Explicacao (exibida apos resposta)</Text>
                    <Textarea value={form.explanation} onChange={(e) => setForm((f) => ({ ...f, explanation: e.target.value }))} rows={2} />
                  </Stack>

                  <Stack gap={2}>
                    <Text fontSize="sm" fontWeight={600}>Alternativas (marque a correta)</Text>
                    {options.map((o, i) => (
                      <Flex key={i} align="center" gap={3}>
                        <Checkbox.Root checked={o.is_correct} onCheckedChange={(e) => setOpt(i, 'is_correct', e.checked)} colorPalette="green">
                          <Checkbox.HiddenInput />
                          <Checkbox.Control />
                        </Checkbox.Root>
                        <Input
                          flex={1}
                          size="sm"
                          value={o.text}
                          onChange={(e) => setOpt(i, 'text', e.target.value)}
                          placeholder={`Alternativa ${i + 1}`}
                          borderColor={o.is_correct ? 'green.400' : undefined}
                        />
                        {options.length > 2 && (
                          <Button size="xs" variant="ghost" colorPalette="red" onClick={() => setOptions((prev) => prev.filter((_, idx) => idx !== i))}>
                            <Trash2 size={12} />
                          </Button>
                        )}
                      </Flex>
                    ))}
                    {options.length < 6 && (
                      <Button size="xs" variant="outline" onClick={() => setOptions((prev) => [...prev, { text: '', is_correct: false }])}>
                        + Adicionar alternativa
                      </Button>
                    )}
                  </Stack>

                  <Flex align="center" gap={3}>
                    <ChakraSwitch.Root checked={form.published} onCheckedChange={(e) => setForm((f) => ({ ...f, published: e.checked }))} colorPalette="green"><ChakraSwitch.HiddenInput /><ChakraSwitch.Control><ChakraSwitch.Thumb /></ChakraSwitch.Control></ChakraSwitch.Root>
                    <Text fontSize="sm" fontWeight={600}>Publicado</Text>
                  </Flex>
                </Stack>
              </Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setFormOpen(false)}>Cancelar</Button>
                <Button colorPalette="green" loading={saving} onClick={handleSave}>
                  {editing ? 'Salvar alteracoes' : 'Criar pergunta'}
                </Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>

      {/* ── Modal Delete ───────────────────────────────── */}
      <Dialog.Root open={!!deleteId} onOpenChange={(e) => { if (!e.open) setDeleteId(null) }}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content borderRadius="2xl">
              <Dialog.Header><Dialog.Title>Excluir pergunta?</Dialog.Title></Dialog.Header>
              <Dialog.Body><Text color="muted">Esta acao e irreversivel. As alternativas tambem serao excluidas.</Text></Dialog.Body>
              <Dialog.Footer gap={3}>
                <Button variant="ghost" onClick={() => setDeleteId(null)}>Cancelar</Button>
                <Button colorPalette="red" onClick={handleDelete}>Excluir</Button>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </AppShell>
  )
}


'use client'

import { useCallback, useEffect, useMemo, useReducer, useState, useSyncExternalStore } from 'react'

import { PESTS, PESTS_BY_ID, SETTINGS, type MemoryCard, type Pest } from './data'

export function shuffle<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export function buildDeck(pests: readonly Pest[]): MemoryCard[] {
  return shuffle(
    pests.flatMap<MemoryCard>((pest) => [
      { uid: `${pest.id}:image`, pairId: pest.id, face: 'image' },
      { uid: `${pest.id}:name`, pairId: pest.id, face: 'name' },
    ]),
  )
}

export type StarRating = 1 | 2 | 3

export function calculateStars(moves: number, totalPairs: number): StarRating {
  if (moves <= totalPairs + 3) return 3
  if (moves <= totalPairs * 2 + 2) return 2
  return 1
}

export function formatTime(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export type GameStatus = 'idle' | 'playing' | 'won'

interface GameState {
  readonly status: GameStatus
  readonly round: number
  readonly deck: readonly MemoryCard[]
  readonly flipped: readonly string[]
  readonly matched: readonly string[]
  readonly wrong: readonly string[]
  readonly moves: number
  readonly seconds: number
  readonly curiosityId: string | null
  readonly message: string
}

type GameAction =
  | { type: 'START'; deck: readonly MemoryCard[] }
  | { type: 'FLIP'; uid: string }
  | { type: 'HIDE_WRONG' }
  | { type: 'TICK' }
  | { type: 'CLOSE_CURIOSITY' }
  | { type: 'EXIT' }

const initialState: GameState = {
  status: 'idle',
  round: 0,
  deck: [],
  flipped: [],
  matched: [],
  wrong: [],
  moves: 0,
  seconds: 0,
  curiosityId: null,
  message: '',
}

const pestName = (id: string): string => PESTS_BY_ID.get(id)?.name ?? 'praga'

function reducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START':
      return {
        ...initialState,
        status: 'playing',
        round: state.round + 1,
        deck: action.deck,
        message: 'Missão iniciada! Encontre os pares.',
      }

    case 'FLIP': {
      if (state.status !== 'playing' || state.curiosityId !== null || state.flipped.length >= 2) return state

      const card = state.deck.find((c) => c.uid === action.uid)
      if (!card || state.flipped.includes(card.uid) || state.matched.includes(card.pairId)) return state

      if (state.flipped.length === 0) {
        return { ...state, flipped: [card.uid], message: `Carta revelada: ${pestName(card.pairId)}` }
      }

      const first = state.deck.find((c) => c.uid === state.flipped[0])
      const moves = state.moves + 1

      if (first?.pairId === card.pairId) {
        return {
          ...state,
          moves,
          flipped: [],
          matched: [...state.matched, card.pairId],
          curiosityId: card.pairId,
          message: `Acertou! Par encontrado: ${pestName(card.pairId)}.`,
        }
      }

      return {
        ...state,
        moves,
        flipped: [...state.flipped, card.uid],
        wrong: [...state.flipped, card.uid],
        message: 'Ops! Essas cartas não formam um par.',
      }
    }

    case 'HIDE_WRONG':
      return { ...state, flipped: [], wrong: [] }

    case 'TICK':
      return state.status === 'playing' ? { ...state, seconds: state.seconds + 1 } : state

    case 'CLOSE_CURIOSITY': {
      const totalPairs = state.deck.length / 2
      const won = state.matched.length === totalPairs
      return {
        ...state,
        curiosityId: null,
        status: won ? 'won' : state.status,
        message: won ? 'Parabéns! Você encontrou todos os pares!' : state.message,
      }
    }

    case 'EXIT':
      return { ...initialState, round: state.round }

    default:
      return state
  }
}

export interface BestRecord {
  readonly moves: number
  readonly seconds: number
}

const recordListeners = new Set<() => void>()

function subscribeRecord(listener: () => void): () => void {
  recordListeners.add(listener)
  window.addEventListener('storage', listener)
  return () => {
    recordListeners.delete(listener)
    window.removeEventListener('storage', listener)
  }
}

function readRecordRaw(): string | null {
  try {
    return window.localStorage.getItem(SETTINGS.storageKey)
  } catch {
    return null
  }
}

function parseRecord(raw: string | null): BestRecord | null {
  if (!raw) return null
  try {
    const v: unknown = JSON.parse(raw)
    if (
      typeof v === 'object' &&
      v !== null &&
      'moves' in v &&
      'seconds' in v &&
      typeof v.moves === 'number' &&
      typeof v.seconds === 'number'
    ) {
      return { moves: v.moves, seconds: v.seconds }
    }
  } catch {
  }
  return null
}

function writeRecord(record: BestRecord): void {
  try {
    window.localStorage.setItem(SETTINGS.storageKey, JSON.stringify(record))
    recordListeners.forEach((listener) => listener())
  } catch {
  }
}

function isBetter(a: BestRecord, b: BestRecord | null): boolean {
  if (!b) return true
  return a.moves < b.moves || (a.moves === b.moves && a.seconds < b.seconds)
}

function subscribeVisibility(listener: () => void): () => void {
  document.addEventListener('visibilitychange', listener)
  return () => document.removeEventListener('visibilitychange', listener)
}

export function useMemoryGame() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const isVisible = useSyncExternalStore(
    subscribeVisibility,
    () => document.visibilityState === 'visible',
    () => true,
  )
  const recordRaw = useSyncExternalStore(subscribeRecord, readRecordRaw, () => null)
  const bestRecord = useMemo(() => parseRecord(recordRaw), [recordRaw])

  const totalPairs = PESTS.length

  const timerRunning = state.status === 'playing' && state.curiosityId === null && isVisible
  useEffect(() => {
    if (!timerRunning) return
    const id = window.setInterval(() => dispatch({ type: 'TICK' }), 1000)
    return () => window.clearInterval(id)
  }, [timerRunning])

  useEffect(() => {
    if (state.wrong.length === 0) return
    const id = window.setTimeout(() => dispatch({ type: 'HIDE_WRONG' }), SETTINGS.flipBackDelayMs)
    return () => window.clearTimeout(id)
  }, [state.wrong])

  const startGame = useCallback(() => dispatch({ type: 'START', deck: buildDeck(PESTS) }), [])
  const flipCard = useCallback((uid: string) => dispatch({ type: 'FLIP', uid }), [])
  const exitGame = useCallback(() => dispatch({ type: 'EXIT' }), [])

  const [isNewRecord, setIsNewRecord] = useState(false)

  const closeCuriosity = useCallback(() => {
    if (state.matched.length === totalPairs) {
      const result = { moves: state.moves, seconds: state.seconds }
      const better = isBetter(result, bestRecord)
      if (better) writeRecord(result)
      setIsNewRecord(better)
    }
    dispatch({ type: 'CLOSE_CURIOSITY' })
  }, [state.matched.length, state.moves, state.seconds, totalPairs, bestRecord])

  const flippedSet = useMemo(() => new Set(state.flipped), [state.flipped])
  const matchedSet = useMemo(() => new Set(state.matched), [state.matched])
  const wrongSet = useMemo(() => new Set(state.wrong), [state.wrong])

  return {
    status: state.status,
    round: state.round,
    deck: state.deck,
    moves: state.moves,
    seconds: state.seconds,
    time: formatTime(state.seconds),
    matchedCount: state.matched.length,
    totalPairs,
    stars: calculateStars(state.moves, totalPairs),
    message: state.message,
    curiosityPest: state.curiosityId ? (PESTS_BY_ID.get(state.curiosityId) ?? null) : null,
    bestRecord,
    isNewRecord,
    isFlipped: (card: MemoryCard) => flippedSet.has(card.uid) || matchedSet.has(card.pairId),
    isMatched: (card: MemoryCard) => matchedSet.has(card.pairId),
    isWrong: (card: MemoryCard) => wrongSet.has(card.uid),
    startGame,
    flipCard,
    closeCuriosity,
    exitGame,
  }
}

export type MemoryGameController = ReturnType<typeof useMemoryGame>

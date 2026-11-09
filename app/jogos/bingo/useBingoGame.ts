'use client'

import { useCallback, useMemo, useState } from 'react'

import {
  BINGO_PESTS,
  BINGO_TOTAL_CELLS,
  WINNING_LINES,
  type BingoPest,
} from './data'

export type CallMode = 'clue' | 'name'
export type FeedbackType = 'hit' | 'miss' | 'not-On-board' | 'already-marked' | null

export interface BingoFeedback {
  readonly type: Exclude<FeedbackType, null>
  readonly message: string
  readonly pest?: BingoPest
}

export function shuffleArray<T>(items: readonly T[]): T[] {
  const copy = [...items]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function findWinningLine(markedIndices: ReadonlySet<number>): readonly [number, number, number] | null {
  for (const line of WINNING_LINES) {
    if (line.every((cellIndex) => markedIndices.has(cellIndex))) {
      return line
    }
  }
  return null
}

function createInitialSession() {
  const board = shuffleArray(BINGO_PESTS).slice(0, BINGO_TOTAL_CELLS)
  const drawDeck = shuffleArray(BINGO_PESTS)
  return {
    board,
    drawDeck,
  }
}

export function useBingoGame() {
  const [session, setSession] = useState(createInitialSession)
  const [markedIndices, setMarkedIndices] = useState<ReadonlySet<number>>(() => new Set())
  const [drawnIndex, setDrawnIndex] = useState<number>(0)
  const [callMode, setCallMode] = useState<CallMode>('clue')
  const [mistakes, setMistakes] = useState<number>(0)
  const [wrongCellIndex, setWrongCellIndex] = useState<number | null>(null)
  const [feedback, setFeedback] = useState<BingoFeedback | null>(null)

  const { board, drawDeck } = session

  const winningLine = useMemo(() => findWinningLine(markedIndices), [markedIndices])
  const isWon = winningLine !== null

  const currentCall: BingoPest | null = drawDeck[drawnIndex] ?? null
  const calledHistory = useMemo(
    () => drawDeck.slice(0, drawnIndex + 1),
    [drawDeck, drawnIndex],
  )
  const calledIds = useMemo(
    () => new Set(calledHistory.map((pest) => pest.id)),
    [calledHistory],
  )

  const isCurrentOnBoard = useMemo(
    () => (currentCall ? board.some((cell) => cell.id === currentCall.id) : false),
    [board, currentCall],
  )

  const isCurrentAlreadyMarked = useMemo(() => {
    if (!currentCall) return false
    const idx = board.findIndex((cell) => cell.id === currentCall.id)
    return idx !== -1 && markedIndices.has(idx)
  }, [board, currentCall, markedIndices])

  const drawNext = useCallback(() => {
    if (isWon) return
    setWrongCellIndex(null)

    setDrawnIndex((prev) => {
      if (prev < drawDeck.length - 1) {
        return prev + 1
      }
      return 0
    })

    setFeedback(null)
  }, [drawDeck.length, isWon])

  const selectCell = useCallback(
    (cellIndex: number) => {
      if (isWon) return
      const clickedPest = board[cellIndex]
      if (!clickedPest) return

      if (markedIndices.has(cellIndex)) {
        setFeedback({
          type: 'already-marked',
          message: `Você já marcou a ${clickedPest.name} na sua cartela!`,
        })
        return
      }

      const matchesCurrent = currentCall?.id === clickedPest.id
      const wasCalledBefore = calledIds.has(clickedPest.id)

      if (matchesCurrent || wasCalledBefore) {
        const nextMarked = new Set(markedIndices)
        nextMarked.add(cellIndex)
        setMarkedIndices(nextMarked)
        setWrongCellIndex(null)

        const completedLine = findWinningLine(nextMarked)
        if (completedLine) {
          setFeedback({
            type: 'hit',
            message: `BINGO! Você marcou ${clickedPest.name} e completou uma sequência!`,
            pest: clickedPest,
          })
          return
        }

        setFeedback({
          type: 'hit',
          message: `Muito bem! Você identificou a ${clickedPest.name}.`,
          pest: clickedPest,
        })

        if (matchesCurrent && drawnIndex < drawDeck.length - 1) {
          setDrawnIndex((prev) => prev + 1)
        }
        return
      }

      setMistakes((prev) => prev + 1)
      setWrongCellIndex(cellIndex)
      setFeedback({
        type: 'miss',
        message: `Ops! "${clickedPest.name}" ainda não corresponde à dica sorteada. Leia com atenção!`,
      })
    },
    [board, calledIds, currentCall, drawDeck.length, drawnIndex, isWon, markedIndices],
  )

  const skipNotInBoard = useCallback(() => {
    if (isWon || !currentCall) return

    if (isCurrentOnBoard && !isCurrentAlreadyMarked) {
      setMistakes((prev) => prev + 1)
      setFeedback({
        type: 'miss',
        message: 'Olhe com cuidado! Essa praga ESTÁ na sua cartela!',
      })
      return
    }

    setFeedback({
      type: 'not-On-board',
      message: `Boa observação! ${currentCall.name} não estava na sua cartela. Sorteando a próxima...`,
    })

    if (drawnIndex < drawDeck.length - 1) {
      setDrawnIndex((prev) => prev + 1)
    } else {
      setDrawnIndex(0)
    }
  }, [currentCall, drawDeck.length, drawnIndex, isCurrentAlreadyMarked, isCurrentOnBoard, isWon])

  const restartGame = useCallback(() => {
    setSession(createInitialSession())
    setMarkedIndices(new Set())
    setDrawnIndex(0)
    setMistakes(0)
    setWrongCellIndex(null)
    setFeedback(null)
  }, [])

  const toggleCallMode = useCallback((mode: CallMode) => {
    setCallMode(mode)
  }, [])

  return {
    board,
    markedIndices,
    winningLine,
    isWon,
    currentCall,
    calledHistory,
    drawnCount: drawnIndex + 1,
    totalCalls: drawDeck.length,
    markedCount: markedIndices.size,
    mistakes,
    wrongCellIndex,
    callMode,
    feedback,
    isCurrentOnBoard,
    isCurrentAlreadyMarked,
    selectCell,
    drawNext,
    skipNotInBoard,
    restartGame,
    toggleCallMode,
  }
}

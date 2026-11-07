'use client'

import { memo, type CSSProperties } from 'react'

import type { MemoryCard, Pest } from './data'
import styles from './MemoryGame.module.css'

interface CardProps {
  readonly card: MemoryCard
  readonly pest: Pest
  readonly position: number
  readonly isFlipped: boolean
  readonly isMatched: boolean
  readonly isWrong: boolean
  readonly onFlip: (uid: string) => void
}

function CardComponent({ card, pest, position, isFlipped, isMatched, isWrong, onFlip }: CardProps) {
  const className = [styles.card, isFlipped && styles.flipped, isMatched && styles.matched, isWrong && styles.wrong]
    .filter(Boolean)
    .join(' ')

  const label = isFlipped
    ? `Carta ${position}: ${card.face === 'image' ? `imagem da ${pest.name}` : `nome ${pest.name}`}${isMatched ? ', par encontrado' : ''}`
    : `Carta ${position}: virada para baixo`

  return (
    <button
      type="button"
      className={className}
      onClick={() => onFlip(card.uid)}
      aria-label={label}
      aria-disabled={isFlipped}
      style={{ '--pair-color': pest.color } as CSSProperties}
    >
      <span className={styles.cardInner}>
        <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
          <span className={styles.backLeaf}>🌿</span>
          <span className={styles.backMark}>?</span>
        </span>

        <span className={`${styles.face} ${styles.front}`} aria-hidden="true">
          <span className={styles.hostBadge}>{pest.hostIcon}</span>

          {card.face === 'image' ? (
            pest.image ? (
              <img src={pest.image} alt="" className={styles.pestImage} draggable={false} />
            ) : (
              <span className={styles.pestIcon}>{pest.icon}</span>
            )
          ) : (
            <span className={styles.nameBox}>
              <span className={styles.pestName}>{pest.name}</span>
              <span className={styles.hostName}>
                ataca: <strong>{pest.host}</strong>
              </span>
            </span>
          )}

          {isMatched && <span className={styles.check}>✓</span>}
        </span>
      </span>
    </button>
  )
}

export const Card = memo(CardComponent)

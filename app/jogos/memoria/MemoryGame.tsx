'use client'

import { useEffect, useRef, type CSSProperties } from 'react'
import Link from 'next/link'

import { Card } from './Card'
import { PESTS_BY_ID, SETTINGS, type Pest } from './data'
import { formatTime, useMemoryGame, type MemoryGameController } from './useMemoryGame'
import styles from './MemoryGame.module.css'

export function MemoryGame() {
  const game = useMemoryGame()

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <Link href={SETTINGS.menuHref} className={styles.backLink}>
            <span aria-hidden="true">←</span> Jogos
          </Link>
          <strong className={styles.headerTitle}>Jogo da Memória</strong>
          <img src="/imgs/joaninha_corpo_todo.png" alt="" className={styles.headerMascot} />
        </header>

        <main className={styles.main}>
          {game.status === 'idle' && <StartScreen game={game} />}
          {game.status === 'playing' && <PlayingScreen game={game} />}
          {game.status === 'won' && <VictoryScreen game={game} />}
        </main>

        <p className={styles.srOnly} role="status" aria-live="polite">
          {game.message}
        </p>
      </div>
    </div>
  )
}

interface ScreenProps {
  readonly game: MemoryGameController
}

function StartScreen({ game }: ScreenProps) {
  return (
    <section className={`${styles.screen} ${styles.start}`} aria-labelledby="memoria-titulo">
      <div className={styles.hero}>
        <img src="/imgs/dona_fito_meio_corpo.png" alt="Dona Fito" className={styles.guide} />
        <div className={styles.bubble}>
          <p className={styles.bubbleTitle}>Olá, agente da natureza! 🌱</p>
          <p>As pragas se esconderam nas plantações do Amapá. Me ajude a encontrá-las?</p>
        </div>
      </div>

      <h1 id="memoria-titulo" className={styles.title}>
        Jogo da Memória <span className={styles.titleAccent}>das Pragas</span>
      </h1>

      <ol className={styles.howTo}>
        <li>
          <span className={styles.howToIcon} aria-hidden="true">👆</span>
          Toque em duas cartas para virá-las.
        </li>
        <li>
          <span className={styles.howToIcon} aria-hidden="true">🎯</span>
          Junte a <strong>imagem</strong> da praga com o seu <strong>nome</strong>.
        </li>
        <li>
          <span className={styles.howToIcon} aria-hidden="true">💡</span>
          Descubra uma curiosidade a cada par!
        </li>
      </ol>

      {game.bestRecord && (
        <p className={styles.record}>
          🏆 Seu recorde: <strong>{game.bestRecord.moves} tentativas</strong> em {formatTime(game.bestRecord.seconds)}
        </p>
      )}

      <button type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`} onClick={game.startGame}>
        <span aria-hidden="true">▶</span> Iniciar Missão
      </button>
    </section>
  )
}

function PlayingScreen({ game }: ScreenProps) {
  const hasWrong = game.deck.some(game.isWrong)

  useEffect(() => {
    if (hasWrong && 'vibrate' in navigator) navigator.vibrate(120)
  }, [hasWrong])

  return (
    <section className={styles.screen} aria-label="Tabuleiro">
      <div className={styles.scoreboard}>
        <dl className={styles.scores}>
          <div className={`${styles.score} ${styles.scoreMoves}`}>
            <dt>Tentativas</dt>
            <dd>{game.moves}</dd>
          </div>
          <div className={`${styles.score} ${styles.scorePairs}`}>
            <dt>Pares</dt>
            <dd>
              {game.matchedCount}/{game.totalPairs}
            </dd>
          </div>
          <div className={`${styles.score} ${styles.scoreTime}`}>
            <dt>Tempo</dt>
            <dd>{game.time}</dd>
          </div>
        </dl>
        <div
          className={styles.progress}
          role="progressbar"
          aria-label="Pares encontrados"
          aria-valuemin={0}
          aria-valuemax={game.totalPairs}
          aria-valuenow={game.matchedCount}
        >
          <div className={styles.progressBar} style={{ transform: `scaleX(${game.matchedCount / game.totalPairs})` }} />
        </div>
      </div>

      <div key={game.round} className={styles.board}>
        {game.deck.map((card, index) => {
          const pest = PESTS_BY_ID.get(card.pairId)
          if (!pest) return null
          return (
            <Card
              key={card.uid}
              card={card}
              pest={pest}
              position={index + 1}
              isFlipped={game.isFlipped(card)}
              isMatched={game.isMatched(card)}
              isWrong={game.isWrong(card)}
              onFlip={game.flipCard}
            />
          )
        })}
      </div>

      <div className={styles.actions}>
        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={game.startGame}>
          ↻ Recomeçar
        </button>
        <button type="button" className={`${styles.btn} ${styles.btnGhost}`} onClick={game.exitGame}>
          ← Sair
        </button>
      </div>

      {game.curiosityPest && (
        <CuriosityModal
          pest={game.curiosityPest}
          isLast={game.matchedCount === game.totalPairs}
          onClose={game.closeCuriosity}
        />
      )}
    </section>
  )
}

interface CuriosityModalProps {
  readonly pest: Pest
  readonly isLast: boolean
  readonly onClose: () => void
}

function CuriosityModal({ pest, isLast, onClose }: CuriosityModalProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className={styles.backdrop}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="curiosidade-titulo"
        aria-describedby="curiosidade-texto"
        style={{ '--pair-color': pest.color } as CSSProperties}
      >
        <div className={styles.modalBadge} aria-hidden="true">
          <span className={styles.modalIcon}>{pest.icon}</span>
          <span className={styles.modalHost}>{pest.hostIcon}</span>
        </div>
        <p className={styles.modalKicker}>✨ Par encontrado!</p>
        <h2 id="curiosidade-titulo" className={styles.modalTitle}>
          {pest.name}
        </h2>
        <p className={styles.modalScientific}>{pest.scientificName}</p>
        <div className={styles.curiosity}>
          <p className={styles.curiosityLabel}>💡 Você sabia?</p>
          <p id="curiosidade-texto">{pest.curiosity}</p>
        </div>
        <button
          ref={buttonRef}
          type="button"
          className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock}`}
          onClick={onClose}
        >
          {isLast ? 'Ver resultado 🏆' : 'Continuar 🔍'}
        </button>
      </div>
    </div>
  )
}

const CONFETTI = ['🍃', '⭐', '🌱', '✨', '🌿', '🎉', '🍃', '⭐', '🌱', '✨', '🌿', '🎉'] as const

function VictoryScreen({ game }: ScreenProps) {
  const headline = game.stars === 3 ? 'Incrível!' : game.stars === 2 ? 'Muito bem!' : 'Missão cumprida!'

  return (
    <section className={`${styles.screen} ${styles.victory}`} aria-labelledby="vitoria-titulo">
      <div className={styles.confetti} aria-hidden="true">
        {CONFETTI.map((piece, i) => (
          <span key={i} style={{ '--i': i } as CSSProperties}>
            {piece}
          </span>
        ))}
      </div>

      <div className={styles.trophy} aria-hidden="true">🏆</div>
      <h1 id="vitoria-titulo" className={styles.title}>
        {headline}
      </h1>
      <p className={styles.subtitle}>Você encontrou todas as {game.totalPairs} pragas e protegeu as plantações! 🌾</p>

      <div className={styles.stars} role="img" aria-label={`${game.stars} de 3 estrelas`}>
        {[1, 2, 3].map((n) => (
          <span key={n} className={n <= game.stars ? styles.starOn : styles.starOff} style={{ animationDelay: `${n * 180}ms` }}>
            ★
          </span>
        ))}
      </div>

      {game.isNewRecord && <p className={styles.newRecord}>🏅 Novo recorde!</p>}

      <dl className={styles.results}>
        <div>
          <dt>Tentativas</dt>
          <dd>{game.moves}</dd>
        </div>
        <div>
          <dt>Tempo</dt>
          <dd>{game.time}</dd>
        </div>
      </dl>

      <div className={styles.victoryActions}>
        <button type="button" className={`${styles.btn} ${styles.btnPrimary} ${styles.btnLarge}`} onClick={game.startGame}>
          ↻ Jogar Novamente
        </button>
        <Link href={SETTINGS.menuHref} className={`${styles.btn} ${styles.btnSecondary} ${styles.btnLarge}`}>
          🏠 Voltar ao menu
        </Link>
      </div>
    </section>
  )
}

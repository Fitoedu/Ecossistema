'use client'

import { useState } from 'react'

/* ── Types ───────────────────────────────────────────── */
interface Option {
  id: string
  text: string
}

interface Question {
  id: number
  text: string
  options: Option[]
  correctId: string
  explanation: string
}

/* ── Questions Data ──────────────────────────────────── */
const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'O que é Fitossanidade?',
    options: [
      { id: 'a', text: 'A ciência que estuda apenas os remédios naturais.' },
      { id: 'b', text: 'A área responsável pela saúde e proteção das plantas contra pragas e doenças.' },
      { id: 'c', text: 'Um tipo de plantação orgânica sem uso de qualquer produto.' },
      { id: 'd', text: 'O processo de irrigação dos campos agrícolas.' },
    ],
    correctId: 'b',
    explanation: 'Fitossanidade é a ciência que zela pela saúde das plantas, prevenindo e controlando pragas, doenças e plantas invasoras.',
  },
  {
    id: 2,
    text: 'O que é uma Praga Quarentenária?',
    options: [
      { id: 'a', text: 'Um inseto comum encontrado em jardins residenciais.' },
      { id: 'b', text: 'Uma praga muito pequena, invisível a olho nu.' },
      { id: 'c', text: 'Uma praga de alto risco econômico, ausente ou com distribuição limitada no país, sujeita a controle oficial.' },
      { id: 'd', text: 'Qualquer planta que cresce entre as lavouras.' },
    ],
    correctId: 'c',
    explanation: 'Pragas quarentenárias são de alto impacto econômico e sofrem controle rigoroso para impedir sua entrada e dispersão no território nacional.',
  },
  {
    id: 3,
    text: 'Qual das opções abaixo é um exemplo de caso real de praga no Amapá / Região Norte?',
    options: [
      { id: 'a', text: 'A ferrugem do café no sul de Minas Gerais.' },
      { id: 'b', text: 'A vassoura-de-bruxa na mandioca.' },
      { id: 'c', text: 'O cancro cítrico nas laranjas do Nordeste.' },
      { id: 'd', text: 'A podridão-seca da soja no Cerrado.' },
    ],
    correctId: 'b',
    explanation: 'A vassoura-de-bruxa (causada pelo fungo Moniliophthora perniciosa) é uma praga relevante que afeta a mandioca na Região Norte, incluindo o Amapá.',
  },
  {
    id: 4,
    text: 'Qual órgão federal é responsável pela fiscalização fitossanitária no Brasil?',
    options: [
      { id: 'a', text: 'IBAMA' },
      { id: 'b', text: 'ANVISA' },
      { id: 'c', text: 'MAPA — Ministério da Agricultura, Pecuária e Abastecimento' },
      { id: 'd', text: 'INPE' },
    ],
    correctId: 'c',
    explanation: 'O MAPA, por meio do VIGIAGRO e da Secretaria de Defesa Agropecuária, é responsável pelo controle e fiscalização fitossanitária nas fronteiras e no território brasileiro.',
  },
  {
    id: 5,
    text: 'Qual das práticas abaixo NÃO é uma boa prática fitossanitária?',
    options: [
      { id: 'a', text: 'Usar sementes certificadas e sadias.' },
      { id: 'b', text: 'Fazer rotação de culturas.' },
      { id: 'c', text: 'Transportar plantas sem verificar sua procedência.' },
      { id: 'd', text: 'Monitorar regularmente a lavoura.' },
    ],
    correctId: 'c',
    explanation: 'Transportar plantas sem verificar a origem é uma prática de risco, pois pode facilitar a disseminação de pragas e doenças entre regiões.',
  },
]

/* ── Score helper ────────────────────────────────────── */
function getResultData(score: number, total: number) {
  const pct = score / total
  if (pct === 1)   return { emoji: '🏆', stars: '⭐⭐⭐⭐⭐', msg: 'Parabéns! Você é um(a) Expert em Fitossanidade!', sub: 'Incrível! Você acertou todas as perguntas. Você está pronto(a) para defender nossas lavouras!' }
  if (pct >= 0.8)  return { emoji: '🌟', stars: '⭐⭐⭐⭐', msg: 'Excelente! Quase perfeito!', sub: 'Você demonstrou ótimo conhecimento sobre fitossanidade. Continue aprendendo!' }
  if (pct >= 0.6)  return { emoji: '🌱', stars: '⭐⭐⭐', msg: 'Muito bem! Você está no caminho certo!', sub: 'Bom desempenho! Reveja os tópicos que errou e tente novamente.' }
  if (pct >= 0.4)  return { emoji: '📖', stars: '⭐⭐', msg: 'Continue estudando!', sub: 'Você deu um bom começo. Releia a cartilha e tente novamente para melhorar sua pontuação.' }
  return { emoji: '🌿', stars: '⭐', msg: 'Não desista! Todo especialista já foi iniciante.', sub: 'Releia a cartilha com calma e tente novamente. Você vai melhorar!' }
}

/* ── Component ───────────────────────────────────────── */
export default function Quiz() {
  const [currentQ, setCurrentQ]       = useState(0)
  const [selected, setSelected]       = useState<string | null>(null)
  const [revealed, setRevealed]       = useState(false)
  const [answers, setAnswers]         = useState<(string | null)[]>(Array(QUESTIONS.length).fill(null))
  const [finished, setFinished]       = useState(false)

  const question = QUESTIONS[currentQ]
  const isLast   = currentQ === QUESTIONS.length - 1

  const score = answers.reduce<number>((acc, ans, idx) =>
    ans === QUESTIONS[idx].correctId ? acc + 1 : acc, 0)

  const handleSelect = (optId: string) => {
    if (revealed) return
    setSelected(optId)
  }

  const handleConfirm = () => {
    if (!selected) return
    setRevealed(true)
    const newAnswers = [...answers]
    newAnswers[currentQ] = selected
    setAnswers(newAnswers)
  }

  const handleNext = () => {
    if (isLast) {
      setFinished(true)
    } else {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  const handleRetry = () => {
    setCurrentQ(0)
    setSelected(null)
    setRevealed(false)
    setAnswers(Array(QUESTIONS.length).fill(null))
    setFinished(false)
  }

  /* ── Result screen ── */
  if (finished) {
    const result = getResultData(score, QUESTIONS.length)
    return (
      <div className="quiz-result">
        <span className="quiz-result-trophy">{result.emoji}</span>

        <div className="result-score-ring">
          <span className="result-score-num">{score}/{QUESTIONS.length}</span>
          <span className="result-score-label">acertos</span>
        </div>

        <p className="result-message">{result.msg}</p>
        <p className="result-sub">{result.sub}</p>
        <p className="result-stars">{result.stars}</p>

        {/* Answer review */}
        <div style={{ textAlign: 'left', marginBottom: 24 }}>
          <p className="section-heading" style={{ marginBottom: 12 }}>Revisão das respostas</p>
          {QUESTIONS.map((q, idx) => {
            const userAns = answers[idx]
            const isCorrect = userAns === q.correctId
            return (
              <div
                key={q.id}
                style={{
                  background: isCorrect ? '#E8F5E9' : '#FFEBEE',
                  border: `1px solid ${isCorrect ? '#66BB6A' : '#EF9A9A'}`,
                  borderRadius: 14,
                  padding: '14px 16px',
                  marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{isCorrect ? '✅' : '❌'}</span>
                  <p style={{ fontSize: '0.82rem', fontWeight: 600, color: '#212121', lineHeight: 1.4 }}>
                    {q.text}
                  </p>
                </div>
                {!isCorrect && (
                  <p style={{ fontSize: '0.75rem', color: '#424242', marginLeft: 26, lineHeight: 1.5 }}>
                    <strong style={{ color: '#2E7D32' }}>Resposta correta: </strong>
                    {q.options.find(o => o.id === q.correctId)?.text}
                  </p>
                )}
                <p style={{ fontSize: '0.72rem', color: '#616161', marginLeft: 26, marginTop: 4, lineHeight: 1.5 }}>
                  💡 {q.explanation}
                </p>
              </div>
            )
          })}
        </div>

        <button className="btn-retry" onClick={handleRetry} id="quiz-retry-btn">
          🔄 Tentar novamente
        </button>
      </div>
    )
  }

  /* ── Question screen ── */
  return (
    <div className="quiz-wrapper">
      <div className="quiz-header-section">
        <span className="quiz-icon-big">🧠</span>
        <h2 className="page-title">Quiz de Aprendizagem</h2>
        <p className="lead-text">
          Teste o que você aprendeu! Responda as 5 perguntas abaixo sobre Fitossanidade.
        </p>

        {/* Progress bar */}
        <div className="quiz-progress-bar" role="progressbar"
          aria-valuenow={currentQ + 1} aria-valuemin={1} aria-valuemax={QUESTIONS.length}>
          <div
            className="quiz-progress-fill"
            style={{ width: `${((currentQ + 1) / QUESTIONS.length) * 100}%` }}
          />
        </div>
        <p style={{ fontSize: '0.75rem', color: '#424242', fontWeight: 600, textAlign: 'right' }}>
          Pergunta {currentQ + 1} de {QUESTIONS.length}
        </p>
      </div>

      {/* Question card */}
      <div className="quiz-question-card" key={currentQ}>
        <p className="quiz-q-num">Pergunta {currentQ + 1}</p>
        <p className="quiz-question-text">{question.text}</p>

        <div className="quiz-options">
          {question.options.map((opt) => {
            const isSelected = selected === opt.id
            const isCorrect  = revealed && opt.id === question.correctId
            const isWrong    = revealed && isSelected && opt.id !== question.correctId
            const className  = [
              'quiz-option',
              isSelected && !revealed ? 'selected' : '',
              isCorrect ? 'correct' : '',
              isWrong   ? 'wrong'   : '',
            ].filter(Boolean).join(' ')

            return (
              <button
                key={opt.id}
                id={`quiz-option-${currentQ}-${opt.id}`}
                className={className}
                onClick={() => handleSelect(opt.id)}
                disabled={revealed}
                aria-pressed={isSelected}
              >
                <span className="quiz-option-letter">{opt.id.toUpperCase()}</span>
                <span>{opt.text}</span>
                {revealed && (
                  <span className="quiz-option-feedback">
                    {isCorrect ? '✅' : isWrong ? '❌' : ''}
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Explanation after reveal */}
        {revealed && (
          <div className="callout callout-green" style={{ marginTop: 16, marginBottom: 0 }}>
            <span className="callout-icon">💡</span>
            <div className="callout-content">
              <strong>Explicação</strong>
              <p>{question.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <div className="quiz-nav">
        {!revealed ? (
          <button
            id="quiz-confirm-btn"
            className="btn-quiz-next"
            onClick={handleConfirm}
            disabled={!selected}
          >
            Confirmar resposta
          </button>
        ) : (
          <button
            id="quiz-next-btn"
            className="btn-quiz-next"
            onClick={handleNext}
          >
            {isLast ? '🏁 Ver resultado' : 'Próxima pergunta →'}
          </button>
        )}
      </div>
    </div>
  )
}

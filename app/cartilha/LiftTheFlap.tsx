'use client'

import { useState } from 'react'

/* ── Types ─────────────────────────────────────────────────────────────── */
export interface Flap {
  id: string
  frontEmoji: string
  frontText: string
  backContent: string
  backAccent?: 'green' | 'yellow' | 'red' | 'teal'
}

interface LiftTheFlapProps {
  title: string
  subtitle?: string
  flaps: Flap[]
  /** Number of columns in the stable CSS Grid — passed as inline style */
  columns?: 2 | 3
}

/* ── Accent colour tokens ──────────────────────────────────────────────── */
const ACCENT: Record<
  NonNullable<Flap['backAccent']>,
  { bg: string; border: string }
> = {
  green:  { bg: 'linear-gradient(145deg,#E8F5E9,#F1F8E9)', border: '#66BB6A' },
  yellow: { bg: 'linear-gradient(145deg,#FFF9C4,#FFFDE7)', border: '#FBC02D' },
  red:    { bg: 'linear-gradient(145deg,#FFEBEE,#FCE4EC)', border: '#EF9A9A' },
  teal:   { bg: 'linear-gradient(145deg,#E0F2F1,#E8F5E9)', border: '#26A69A' },
}

/* ═══════════════════════════════════════════════════════════════════════
   LiftTheFlap — Accordion style
   ─────────────────────────────────────────────────────────────────────
   • No position:absolute on content panels — zero z-index chaos.
   • Expand / collapse via  grid-template-rows: 0fr → 1fr  transition.
     This is the most layout-stable technique: the card grows IN its own
     grid cell, pushing sibling elements down naturally.
   • Accordion mode: only one flap open at a time (keeps screen tidy).
   • Fully accessible: <button aria-expanded>, role="region" on body.
═══════════════════════════════════════════════════════════════════════ */
export default function LiftTheFlap({
  title,
  subtitle = 'Clique em cada aba para descobrir o conteúdo!',
  flaps,
  columns = 2,
}: LiftTheFlapProps) {
  /* Accordion: null = all closed; string = the open flap's id */
  const [activeId, setActiveId] = useState<string | null>(null)

  const toggle = (id: string) =>
    setActiveId((prev) => (prev === id ? null : id))

  return (
    <div className="ltf-root">

      {/* ── Instruction hint ── */}
      <div className="ltf-hint-row" aria-hidden="true">
        <span className="ltf-hint-icon">👆</span>
        <span className="ltf-hint-text">{subtitle}</span>
      </div>

      {/* ── Stable CSS Grid ── */}
      <div
        className="ltf-grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
        role="list"
        aria-label={title}
      >
        {flaps.map((flap) => {
          const isOpen = activeId === flap.id
          const accent = ACCENT[flap.backAccent ?? 'green']

          return (
            <div
              key={flap.id}
              className={`ltf-card${isOpen ? ' ltf-card--open' : ''}`}
              role="listitem"
            >
              {/* ── Header button (always visible — the "flap") ── */}
              <button
                id={`ltf-btn-${flap.id}`}
                className={`ltf-flap${isOpen ? ' ltf-flap--open' : ''}`}
                onClick={() => toggle(flap.id)}
                aria-expanded={isOpen}
                aria-controls={`ltf-region-${flap.id}`}
                type="button"
              >
                <span className="ltf-flap-emoji" aria-hidden="true">
                  {flap.frontEmoji}
                </span>
                <span className="ltf-flap-label">{flap.frontText}</span>
                <span
                  className={`ltf-flap-chevron${isOpen ? ' ltf-flap-chevron--open' : ''}`}
                  aria-hidden="true"
                >
                  ▼
                </span>
              </button>

              {/* ── Body — accordion reveal (grid-template-rows trick) ──
                   The outer .ltf-body animates 0fr → 1fr.
                   The inner .ltf-body-inner has overflow:hidden + min-height:0
                   so the content is properly clipped during transition.       ── */}
              <div
                id={`ltf-region-${flap.id}`}
                className={`ltf-body${isOpen ? ' ltf-body--open' : ''}`}
                role="region"
                aria-labelledby={`ltf-btn-${flap.id}`}
                style={{
                  /* CSS custom props drive the accent colours */
                  ['--ltf-bg' as string]: accent.bg,
                  ['--ltf-border' as string]: accent.border,
                }}
              >
                <div className="ltf-body-inner">
                  {/* Content lives here — rendered at full height, just clipped */}
                  <div className="ltf-content">
                    <span className="ltf-content-icon" aria-hidden="true">
                      {flap.frontEmoji}
                    </span>
                    <p className="ltf-content-text">{flap.backContent}</p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

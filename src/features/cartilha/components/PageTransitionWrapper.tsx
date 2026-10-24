'use client'

import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'

// ─── Constantes de animação ──────────────────────────────────────────────────

const SPRING = { type: 'spring' as const, stiffness: 260, damping: 28, mass: 0.9 }
const EASE   = [0.4, 0, 0.2, 1] as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeVariants(direction: 'next' | 'prev') {
  const sign = direction === 'next' ? 1 : -1

  return {
    initial: {
      x: sign * 60,
      opacity: 0,
      rotateY: sign * 8,
      scale: 0.97,
      filter: 'drop-shadow(0 0 0px rgba(0,0,0,0))',
    },
    animate: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.04))',
      transition: SPRING,
    },
    exit: {
      x: -sign * 60,
      opacity: 0,
      rotateY: -sign * 8,
      scale: 0.97,
      filter: 'drop-shadow(-8px 0 24px rgba(0,0,0,0.18))',
      transition: { duration: 0.28, ease: EASE },
    },
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface PageTransitionWrapperProps {
  pageKey: number | string
  direction?: 'next' | 'prev'
  children: React.ReactNode
  className?: string
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function PageTransitionWrapper({
  pageKey,
  direction = 'next',
  children,
  className,
}: PageTransitionWrapperProps) {
  const variants = makeVariants(direction)

  return (
    <div
      style={{
        perspective: '900px',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box',
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pageKey}
          className={className}
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{
            transformStyle: 'preserve-3d',
            width: '100%',
            maxWidth: '100%',
            minWidth: 0,
            boxSizing: 'border-box',
            willChange: 'transform, opacity',
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

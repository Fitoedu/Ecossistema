'use client'

import { useState, useEffect, useCallback } from 'react'
import { Box } from '@chakra-ui/react'
import { AppShell } from '@/components/layout/AppShell'
import PageController from './components/PageController'
import PageTransitionWrapper from './components/PageTransitionWrapper'
import {
  PageCover,
  PageContent,
  PageLapbook,
  PagePestGallery,
  PageHotspot,
  PageImpact,
  PageAlert,
  PageOrgaos,
  PageCase,
  PageChain,
  PageQuiz,
  PageFindTheHero,
  PageClosing,
} from './components/BookletPages'
import PestDialog from './components/PestDialog'
import {
  getPage,
  TOTAL_PAGES,
  type CartilhaPageData,
  type PestGalleryItemData,
} from './data/cartilha-data'

/* ─────────────────────────────────────────────────────────────────────────
   renderPage — o switch passa onSelectItem apenas para 'pest-gallery'
   para que o PagePestGallery possa elevar o evento de selecao para ca.
───────────────────────────────────────────────────────────────────────── */

function renderPage(
  page: CartilhaPageData,
  onSelectItem: (item: PestGalleryItemData, index: number) => void,
) {
  switch (page.type) {
    case 'cover':        return <PageCover data={page} />
    case 'content':      return <PageContent data={page} />
    case 'lapbook':      return <PageLapbook data={page} />
    case 'pest-gallery': return <PagePestGallery data={page} onSelectItem={onSelectItem} />
    case 'hotspot':      return <PageHotspot data={page} />
    case 'impact':       return <PageImpact data={page} />
    case 'alert':        return <PageAlert data={page} />
    case 'orgaos':       return <PageOrgaos data={page} />
    case 'case':         return <PageCase data={page} />
    case 'chain':        return <PageChain data={page} />
    case 'quiz':         return <PageQuiz data={page} />
    case 'find-the-hero': return <PageFindTheHero data={page} />
    case 'closing':      return <PageClosing data={page} />
  }
}

export default function CartilhaPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')

  /* ── Estado do modal de praga — mantido AQUI, fora do PageTransitionWrapper ── */
  const [pestDialogOpen, setPestDialogOpen] = useState(false)
  const [selectedPest, setSelectedPest] = useState<PestGalleryItemData | null>(null)
  const [selectedPestIndex, setSelectedPestIndex] = useState(0)

  const handleSelectPest = useCallback(
    (item: PestGalleryItemData, index: number) => {
      setSelectedPest(item)
      setSelectedPestIndex(index)
      setPestDialogOpen(true)
    },
    [],
  )

  const handleClosePestDialog = useCallback(() => {
    setPestDialogOpen(false)
  }, [])

  /* ── Navegacao de paginas ── */
  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(target, TOTAL_PAGES - 1))
      setDirection(clamped >= currentPage ? 'next' : 'prev')
      setCurrentPage(clamped)
      setAnimKey(k => k + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [currentPage],
  )

  const handlePrev = useCallback(() => goTo(currentPage - 1), [currentPage, goTo])
  const handleNext = useCallback(() => goTo(currentPage + 1), [currentPage, goTo])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement).tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handlePrev, handleNext])

  const page = getPage(currentPage)

  return (
    <AppShell
      title="Cartilha Interativa"
      description={`Página ${currentPage + 1} de ${TOTAL_PAGES}: ${page.label}`}
    >
      <Box fontFamily="body" id="cartilha-root">
        <Box
          as="main"
          maxW="780px"
          mx="auto"
          pb="130px"
          id="main-content"
        >
          <PageTransitionWrapper pageKey={animKey} direction={direction}>
            {renderPage(page, handleSelectPest)}
          </PageTransitionWrapper>
        </Box>

        <PageController
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPrev={handlePrev}
          onNext={handleNext}
          onGoTo={goTo}
        />
      </Box>

      {/*
        PestDialog e renderizado AQUI — irmao do <Box fontFamily="body">,
        filho direto do <AppShell>, completamente FORA do PageTransitionWrapper.
        Isso garante que o Portal do Dialog nao herde o stacking context de
        filter + transform da animacao de transicao de pagina.
        O componente usa <Portal> internamente para montar no <body>.
      */}
      <PestDialog
        open={pestDialogOpen}
        onClose={handleClosePestDialog}
        selectedItem={selectedPest}
        selectedIndex={selectedPestIndex}
      />
    </AppShell>
  )
}

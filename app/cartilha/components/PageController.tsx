'use client'

import { CARTILHA_PAGES } from '../data/cartilha-data'
import PageNavigation from './PageNavigation'

interface PageControllerProps {
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
  onGoTo?: (index: number) => void
}

export default function PageController({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  onGoTo,
}: PageControllerProps) {
  const page = CARTILHA_PAGES[currentPage]
  const pageLabel = page?.label ?? `Página ${currentPage + 1}`

  return (
    <PageNavigation
      currentPage={currentPage}
      totalPages={totalPages}
      pageLabel={pageLabel}
      onPrev={onPrev}
      onNext={onNext}
      onGoTo={onGoTo}
    />
  )
}

'use client'

interface PageControllerProps {
  currentPage: number
  totalPages: number
  onPrev: () => void
  onNext: () => void
}

export default function PageController({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}: PageControllerProps) {
  const isFirst = currentPage === 0
  const isLast  = currentPage === totalPages - 1

  /* Page label: "Capa" for page 0, "Pág X" for the rest */
  const pageLabel =
    currentPage === 0
      ? 'Capa'
      : currentPage === totalPages - 1
      ? 'Encerramento'
      : `Pág ${currentPage}`

  return (
    <nav className="page-nav-bar" aria-label="Navegação da cartilha">
      <div className="page-nav-inner">
        {/* Prev button */}
        <button
          id="nav-btn-prev"
          className="nav-btn nav-btn-prev"
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Página anterior"
        >
          ← Anterior
        </button>

        {/* Page counter */}
        <span className="nav-page-text" aria-live="polite" aria-atomic="true">
          {pageLabel}<br />
          <span style={{ opacity: 0.6, fontWeight: 400 }}>
            {currentPage + 1}/{totalPages}
          </span>
        </span>

        {/* Next button */}
        <button
          id="nav-btn-next"
          className="nav-btn nav-btn-next"
          onClick={onNext}
          disabled={isLast}
          aria-label={isLast ? 'Última página' : 'Próxima página'}
        >
          {isLast ? '✓ Concluído' : 'Próxima →'}
        </button>
      </div>
    </nav>
  )
}

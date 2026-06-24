'use client'

import { useState, useEffect, useCallback } from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
import { AppShell } from '@/components/layout/AppShell' 
import PageController from './components/PageController'
import {
  PageCover,
  PageContent,
  PageLapbook,
  PageImpact,
  PageAlert,
  PageOrgaos,
  PageCase,
  PageChain,
  PageQuiz,
  PageClosing,
} from './components/BookletPages'
import {
  getPage,
  TOTAL_PAGES,
  CARTILHA_PAGES,
  type CartilhaPageData,
} from './data/cartilha-data'

// Função para renderizar a página correta baseada no tipo
function renderPage(page: CartilhaPageData) {
  switch (page.type) {
    case 'cover':   return <PageCover   data={page} />
    case 'content': return <PageContent data={page} />
    case 'lapbook': return <PageLapbook data={page} />
    case 'impact':  return <PageImpact  data={page} />
    case 'alert':   return <PageAlert   data={page} />
    case 'orgaos':  return <PageOrgaos  data={page} />
    case 'case':    return <PageCase    data={page} />
    case 'chain':   return <PageChain   data={page} />
    case 'quiz':    return <PageQuiz    data={page} />
    case 'closing': return <PageClosing data={page} />
  }
}

// Componente principal da página da cartilha
export default function CartilhaPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [animKey, setAnimKey]         = useState(0)

  const goTo = useCallback(
    (page: number) => {
      const clamped = Math.max(0, Math.min(page, TOTAL_PAGES - 1))
      setCurrentPage(clamped)
      setAnimKey(k => k + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
    [],
  )

  const handlePrev = () => goTo(currentPage - 1)
  const handleNext = () => goTo(currentPage + 1)

  const page = getPage(currentPage)

  return (
    <AppShell
      title="Cartilha Interativa"
      description={`Página ${currentPage + 1} de ${TOTAL_PAGES}: ${page.label}`}
    >
      <Box
        fontFamily="body"
        id="cartilha-root"
      >
        {/* Conteúdo da página */}
        <Box
          as="main"
          key={animKey}
          maxW="780px" 
          mx="auto"
          pb="120px" // Espaço para o PageController no final
          id="main-content"
          style={{ animation: 'pageEnter 0.45s cubic-bezier(0.34,1.2,0.64,1) both' }}
        >
          {renderPage(page)}
        </Box>

        {/* Barra de navegação inferior */}
        <PageController
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPrev={handlePrev}
          onNext={handleNext}
        />

        {/* Estilos para animações */}
        <style>{`
          @keyframes pageEnter {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </Box>
    </AppShell>
  )
}

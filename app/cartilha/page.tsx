'use client'

import { useState, useEffect, useCallback } from 'react'
import { Box, HStack, Text } from '@chakra-ui/react'
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
} from './components/pages'
import {
  getPage,
  TOTAL_PAGES,
  CARTILHA_PAGES,
  type CartilhaPageData,
} from './data/cartilha-data'

/* ══════════════════════════════════════════════════════
   renderPage — switch discriminante
   TypeScript estreita o tipo em cada case, garantindo
   que as props passadas sejam 100% corretas.
══════════════════════════════════════════════════════ */
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

/* ══════════════════════════════════════════════════════
   CartilhaPage — Controlador principal
   • Estado: página atual, offline, chave de animação
   • Fonte de dados: CARTILHA_PAGES via getPage()
   • Layout: Chakra UI exclusivamente
══════════════════════════════════════════════════════ */
export default function CartilhaPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [isOffline, setIsOffline]     = useState(false)
  const [animKey, setAnimKey]         = useState(0)

  /* ── Detecção de offline ── */
  useEffect(() => {
    const onOnline  = () => setIsOffline(false)
    const onOffline = () => setIsOffline(true)
    window.addEventListener('online',  onOnline)
    window.addEventListener('offline', onOffline)
    return () => {
      window.removeEventListener('online',  onOnline)
      window.removeEventListener('offline', onOffline)
    }
  }, [])

  /* ── Navegação ── */
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

  /* ── Dados da página atual ── */
  const page     = getPage(currentPage)
  const progress = ((currentPage + 1) / TOTAL_PAGES) * 100

  return (
    <Box
      minH="100dvh"
      bgGradient="to-b"
      gradientFrom="#F1F8E9"
      gradientVia="#E8F5E9"
      gradientTo="#FAFFFE"
      color="gray.800"
      overflowX="hidden"
      fontFamily="body"
      id="cartilha-root"
    >
      {/* ── Banner offline ── */}
      {isOffline && (
        <Box
          role="status" aria-live="polite"
          position="fixed" top={0} left={0} right={0} zIndex={100}
          display="flex" alignItems="center" justifyContent="center" gap={2}
          bg="#FBC02D" color="gray.800"
          fontSize="0.82rem" fontWeight="600" py={2} px={4}
          letterSpacing="0.02em"
          style={{ animation: 'slideDown 0.4s ease' }}
        >
          <Text as="span" aria-hidden="true">📵</Text>
          Modo offline — conteúdo disponível localmente
        </Box>
      )}

      {/* ── Header ── */}
      <Box
        as="header"
        position="sticky"
        top={isOffline ? '36px' : 0}
        zIndex={50}
        bg="rgba(255,255,255,0.92)"
        style={{ backdropFilter: 'blur(12px)' }}
        borderBottom="1px solid rgba(46,125,50,0.12)"
        px={6} py={3}
        display="flex" alignItems="center" justifyContent="space-between" gap={3}
      >
        {/* Marca */}
        <Box
          as="a" href="/home"
          display="flex" alignItems="center" gap={2}
          textDecoration="none"
          aria-label="Voltar para o início do EducaFito"
        >
          <Box
            w="38px" h="38px" borderRadius="10px"
            bg="linear-gradient(135deg, #66BB6A, #2E7D32)"
            display="flex" alignItems="center" justifyContent="center"
            fontSize="20px" flexShrink={0} aria-hidden="true"
          >
            🌿
          </Box>
          <Box>
            <Text
              fontWeight="800" fontSize="1.1rem" lineHeight="1"
              bgGradient="to-r" gradientFrom="#2E7D32" gradientTo="#66BB6A"
              bgClip="text"
            >
              EducaFito
            </Text>
            <Text fontSize="0.65rem" color="#2E7D32" fontWeight="500" opacity={0.8} lineHeight="1">
              Cartilha Interativa
            </Text>
          </Box>
        </Box>

        {/* Dots indicadores — source: CARTILHA_PAGES */}
        <Box
          display="flex" alignItems="center" gap={2}
          aria-label={`Página ${currentPage + 1} de ${TOTAL_PAGES}: ${page.label}`}
        >
          <HStack gap="4px" flexWrap="wrap" maxW="200px" role="presentation">
            {CARTILHA_PAGES.map((_, idx) => (
              <Box
                key={idx}
                w={idx === currentPage ? '18px' : '6px'}
                h="6px"
                borderRadius="999px"
                bg={
                  idx === currentPage
                    ? '#2E7D32'
                    : idx < currentPage
                    ? '#66BB6A'
                    : '#EEEEEE'
                }
                transition="all 0.3s ease"
                flexShrink={0}
                aria-hidden="true"
              />
            ))}
          </HStack>
        </Box>
      </Box>

      {/* ── Barra de progresso ── */}
      <Box
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progresso de leitura"
        h="3px" bg="#EEEEEE"
        position="relative" overflow="hidden"
      >
        <Box
          h="full"
          bg="linear-gradient(90deg, #2E7D32, #66BB6A, #FBC02D)"
          w={`${progress}%`}
          transition="width 0.5s cubic-bezier(0.4,0,0.2,1)"
          borderRadius="0 2px 2px 0"
        />
      </Box>

      {/* ── Conteúdo da página ── */}
      <Box
        as="main"
        key={animKey}
        maxW="780px" mx="auto"
        px={{ base: '14px', md: '20px' }}
        pt={8} pb="120px"
        id="main-content"
        style={{ animation: 'pageEnter 0.45s cubic-bezier(0.34,1.2,0.64,1) both' }}
      >
        {renderPage(page)}
      </Box>

      {/* ── Barra de navegação ── */}
      <PageController
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPrev={handlePrev}
        onNext={handleNext}
      />

      {/* ── Keyframes (apenas o que Chakra não suporta nativamente) ── */}
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes pageEnter {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { transform: translateY(-100%); }
          to   { transform: translateY(0); }
        }
      `}</style>
    </Box>
  )
}

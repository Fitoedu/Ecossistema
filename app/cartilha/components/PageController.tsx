'use client'

import { Box, Button, HStack, Text } from '@chakra-ui/react'

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

  const pageLabel =
    currentPage === 0
      ? 'Capa'
      : currentPage === totalPages - 1
      ? 'Encerramento'
      : `Pág ${currentPage}`

  return (
    <Box
      as="nav"
      aria-label="Navegação da cartilha"
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={50}
      bg="rgba(255,255,255,0.95)"
      style={{ backdropFilter: 'blur(16px)' }}
      borderTop="1px solid rgba(46,125,50,0.12)"
      pt="12px"
      pb="20px"
      px="20px"
    >
      <HStack maxW="780px" mx="auto" gap={3} align="center">
        {/* Prev */}
        <Button
          id="nav-btn-prev"
          onClick={onPrev}
          disabled={isFirst}
          aria-label="Página anterior"
          variant="outline"
          borderColor="#2E7D32"
          color="#2E7D32"
          borderWidth="2px"
          borderRadius="14px"
          px={5} py="11px"
          fontSize="0.82rem"
          fontWeight="700"
          flexShrink={0}
          h="auto"
          cursor={isFirst ? 'not-allowed' : 'pointer'}
          opacity={isFirst ? 0.3 : 1}
          _hover={isFirst ? {} : { bg: '#E8F5E9', transform: 'translateX(-2px)' }}
          transition="all 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)"
        >
          ← Anterior
        </Button>

        {/* Page counter */}
        <Text
          as="span"
          fontSize="0.72rem"
          color="#2E7D32"
          fontWeight="600"
          textAlign="center"
          flexShrink={0}
          minW="56px"
          aria-live="polite"
          aria-atomic="true"
        >
          {pageLabel}
          <br />
          <Text as="span" opacity={0.6} fontWeight="400">
            {currentPage + 1}/{totalPages}
          </Text>
        </Text>

        {/* Next */}
        <Button
          id="nav-btn-next"
          onClick={onNext}
          disabled={isLast}
          aria-label={isLast ? 'Última página' : 'Próxima página'}
          flex="1"
          bg="linear-gradient(135deg, #2E7D32, #66BB6A)"
          color="white"
          borderRadius="14px"
          px={5} py="11px"
          fontSize="0.82rem"
          fontWeight="700"
          h="auto"
          boxShadow="0 2px 12px rgba(46,125,50,0.3)"
          cursor={isLast ? 'not-allowed' : 'pointer'}
          opacity={isLast ? 0.3 : 1}
          _hover={isLast ? {} : { transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(46,125,50,0.4)' }}
          transition="all 0.25s cubic-bezier(0.34, 1.2, 0.64, 1)"
          justifyContent="center"
        >
          {isLast ? '✓ Concluído' : 'Próxima →'}
        </Button>
      </HStack>
    </Box>
  )
}

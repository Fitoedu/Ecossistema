'use client'

import {
  Badge,
  Box,
  Button,
  Flex,
  Text,
} from '@chakra-ui/react'
import {
  BookMarked,
  CheckCircle2,
  Maximize2,
  Minimize2,
  Type,
  WifiOff,
} from 'lucide-react'

export type FontSizeLevel = 'sm' | 'md' | 'lg'

interface LessonToolbarProps {
  fontSizeLevel: FontSizeLevel
  onFontSizeChange: (level: FontSizeLevel) => void
  onOpenGlossario: () => void
  isFocusMode: boolean
  onToggleFocusMode: () => void
  isSavedOffline?: boolean
}

export function LessonToolbar({
  fontSizeLevel,
  onFontSizeChange,
  onOpenGlossario,
  isFocusMode,
  onToggleFocusMode,
  isSavedOffline = false,
}: LessonToolbarProps) {
  return (
    <Box
      bg="surface"
      borderRadius="xl"
      border="1px solid"
      borderColor="primary.100"
      px={4}
      py={2.5}
      boxShadow="0 2px 10px rgba(15,42,26,0.04)"
    >
      <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
        {/* Lado Esquerdo: Acessibilidade & Tamanho do Texto */}
        <Flex align="center" gap={2}>
          <Flex align="center" gap={1} color="muted">
            <Type size={14} />
            <Text fontSize="xs" fontWeight={600}>
              Fonte:
            </Text>
          </Flex>

          <Flex gap={1}>
            <Button
              size="xs"
              variant={fontSizeLevel === 'sm' ? 'solid' : 'ghost'}
              colorPalette={fontSizeLevel === 'sm' ? 'green' : 'gray'}
              borderRadius="md"
              onClick={() => onFontSizeChange('sm')}
              fontSize="2xs"
              px={2}
            >
              A-
            </Button>
            <Button
              size="xs"
              variant={fontSizeLevel === 'md' ? 'solid' : 'ghost'}
              colorPalette={fontSizeLevel === 'md' ? 'green' : 'gray'}
              borderRadius="md"
              onClick={() => onFontSizeChange('md')}
              fontSize="xs"
              px={2}
            >
              Padrão
            </Button>
            <Button
              size="xs"
              variant={fontSizeLevel === 'lg' ? 'solid' : 'ghost'}
              colorPalette={fontSizeLevel === 'lg' ? 'green' : 'gray'}
              borderRadius="md"
              onClick={() => onFontSizeChange('lg')}
              fontSize="sm"
              px={2}
              fontWeight={700}
            >
              A+
            </Button>
          </Flex>
        </Flex>

        {/* Lado Direito: Glossário, Modo Foco & Offline Badge */}
        <Flex align="center" gap={2} wrap="wrap">
          {isSavedOffline && (
            <Badge colorPalette="green" variant="subtle" size="sm" borderRadius="full" gap={1}>
              <CheckCircle2 size={12} />
              Pronto p/ o Campo
            </Badge>
          )}

          <Button
            size="xs"
            variant="outline"
            colorPalette="green"
            borderRadius="md"
            onClick={onOpenGlossario}
            gap={1.5}
          >
            <BookMarked size={13} />
            Glossário Fitossanitário
          </Button>

          <Button
            size="xs"
            variant="ghost"
            borderRadius="md"
            onClick={onToggleFocusMode}
            title={isFocusMode ? 'Sair do Modo Foco' : 'Modo Foco / Leitura Ampla'}
            gap={1}
          >
            {isFocusMode ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
            <Text fontSize="xs" display={{ base: 'none', sm: 'inline' }}>
              {isFocusMode ? 'Normal' : 'Foco'}
            </Text>
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

'use client'

import { useEffect, useRef, useState } from 'react'
import { Box, Circle, Flex, Text } from '@chakra-ui/react'
import { useOffline } from '@/hooks/useOffline'

export function OfflineBanner() {
  const { isOnline, isReady } = useOffline()
  const wasOfflineRef = useRef(false)
  const [showRecovered, setShowRecovered] = useState(false)

  useEffect(() => {
    if (!isReady) return

    if (!isOnline) {
      wasOfflineRef.current = true
      setShowRecovered(false)
      return
    }

    if (wasOfflineRef.current) {
      setShowRecovered(true)
      const timer = setTimeout(() => {
        setShowRecovered(false)
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [isOnline, isReady])

  if (!isReady) return null

  if (isOnline && !showRecovered) return null

  const isWarning = !isOnline

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1400}
      px={{ base: 3, md: 6 }}
      py={2}
      bg={isWarning ? 'orange.500' : 'primary.600'}
      color="white"
      boxShadow="0 8px 28px rgba(0,0,0,0.18)"
    >
      <Flex align="center" justify="center" gap={2.5}>
        <Circle size="8px" bg={isWarning ? 'orange.200' : 'green.200'} />
        <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight={700} letterSpacing="0.01em">
          {isWarning
            ? 'Sem conexão: alguns recursos podem ficar indisponíveis.'
            : 'Conexão restabelecida.'}
        </Text>
      </Flex>
    </Box>
  )
}
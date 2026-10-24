'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  Box,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
  Portal,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import type { PragaAlertCardData } from '../../../data/cartilha-data'

function AlertImage({ item, modal = false }: { item: PragaAlertCardData; modal?: boolean }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Box
        h="full"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-br, red.50, orange.50)"
        color="red.700"
        fontSize={modal ? '4rem' : '3rem'}
        aria-label={`Imagem de ${item.title} indisponível`}
      >
        🚨
      </Box>
    )
  }

  return (
    <Image
      src={item.imageSrc}
      alt={`Fotografia de ${item.title}`}
      fill
      sizes={modal ? '(max-width: 640px) 100vw, 640px' : '(max-width: 768px) 100vw, 33vw'}
      style={{ objectFit: 'cover' }}
      onError={() => setHasError(true)}
    />
  )
}

function QuarantineAlertModal({
  item,
  onClose,
}: {
  item: PragaAlertCardData | null
  onClose: () => void
}) {
  return (
    <Portal>
      <DialogRoot
        open={Boolean(item)}
        onOpenChange={(details) => {
          if (!details.open) onClose()
        }}
        placement="center"
        motionPreset="slide-in-bottom"
        scrollBehavior="inside"
      >
        <DialogBackdrop bg="blackAlpha.700" backdropFilter="blur(8px)" />
        <DialogPositioner>
          <DialogContent
            mx={{ base: 3, sm: 4 }}
            maxW={{ base: '100%', sm: '620px' }}
            w="full"
            borderRadius={{ base: '20px', sm: '24px' }}
            overflow="hidden"
            boxShadow="0 30px 80px rgba(90,0,0,0.35)"
          >
            {item && (
              <>
                <Box h={{ base: '210px', sm: '290px' }} position="relative" overflow="hidden" bg="red.50">
                  <AlertImage item={item} modal />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(to top, rgba(70,0,0,0.7), transparent 60%)"
                    pointerEvents="none"
                  />
                  <Box position="absolute" left={5} right={5} bottom={4} pointerEvents="none">
                    <Text color="white" fontSize={{ base: '1.3rem', sm: '1.7rem' }} fontWeight="900">
                      {item.title}
                    </Text>
                    <Text color="white" fontSize="0.78rem" fontWeight="800">
                      ALERTA AGROPECUÁRIO · QUARENTENA
                    </Text>
                  </Box>
                </Box>

                <DialogHeader px={{ base: 4, sm: 6 }} pt={5} pb={2}>
                  <DialogTitle color="red.900">Ficha de Alerta Quarentenário</DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger
                  position="absolute"
                  right="12px"
                  top="12px"
                  zIndex={10}
                  w="36px"
                  h="36px"
                  bg="white"
                  color="gray.800"
                  borderRadius="full"
                  shadow="md"
                  fontSize="1.35rem"
                  fontWeight="800"
                  lineHeight="1"
                  _hover={{ bg: 'gray.100' }}
                  _focusVisible={{ outline: '3px solid', outlineColor: 'red.300' }}
                >
                  ×
                </DialogCloseTrigger>
                <DialogBody px={{ base: 4, sm: 6 }} pb={{ base: 6, sm: 8 }}>
                  <VStack align="stretch" gap={3}>
                    <Box bg="red.50" borderLeft="4px solid" borderColor="red.600" p={3} borderRadius="md">
                      <Text fontSize="0.72rem" fontWeight="800" color="red.800" mb={1}>
                        Status no Brasil / Amapá
                      </Text>
                      <Text fontSize="0.85rem" color="gray.700" lineHeight="1.6">{item.status}</Text>
                    </Box>
                    <Box bg="orange.50" borderLeft="4px solid" borderColor="orange.500" p={3} borderRadius="md">
                      <Text fontSize="0.72rem" fontWeight="800" color="orange.800" mb={1}>
                        Risco Econômico
                      </Text>
                      <Text fontSize="0.85rem" color="gray.700" lineHeight="1.6">{item.economicRisk}</Text>
                    </Box>
                    <Box bg="yellow.50" borderLeft="4px solid" borderColor="yellow.500" p={3} borderRadius="md">
                      <Text fontSize="0.72rem" fontWeight="800" color="yellow.800" mb={1}>
                        Como Agir
                      </Text>
                      <Text fontSize="0.85rem" color="gray.700" lineHeight="1.6">{item.howToAct}</Text>
                    </Box>
                  </VStack>
                </DialogBody>
              </>
            )}
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </Portal>
  )
}

export default function QuarantineGallery({ items }: { items: PragaAlertCardData[] }) {
  const [selectedItem, setSelectedItem] = useState<PragaAlertCardData | null>(null)

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 4, sm: 5 }} my={6}>
        {items.map((item) => (
          <Box
            key={item.title}
            as="button"
            onClick={() => setSelectedItem(item)}
            overflow="hidden"
            borderRadius="18px"
            bg="white"
            border="1px solid"
            borderColor="red.200"
            boxShadow="sm"
            textAlign="left"
            cursor="pointer"
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{ transform: 'translateY(-3px)', shadow: 'md' }}
            _focusVisible={{ outline: '3px solid', outlineColor: 'red.300', outlineOffset: '3px' }}
          >
            <Box h="160px" w="100%" position="relative" overflow="hidden" bg="red.50">
              <AlertImage item={item} />
              <Box
                position="absolute"
                top={2}
                left={2}
                display="flex"
                alignItems="center"
                gap={1}
                px={2}
                py={1}
                borderRadius="full"
                bg="red.700"
                color="white"
                fontSize="0.58rem"
                fontWeight="900"
                letterSpacing="0.02em"
                pointerEvents="none"
              >
                <Text aria-hidden="true">🚨</Text>
                ALERTA MÁXIMO
              </Box>
            </Box>
            <Box p={{ base: 3, sm: 4 }}>
              <Text fontSize="0.9rem" fontWeight="900" color="red.900">{item.title}</Text>
              <Text mt={1} fontSize="0.72rem" color="gray.600" lineHeight="1.45">{item.desc}</Text>
              <Box mt={3} px={3} py={2} borderRadius="md" bg="red.700" color="white" textAlign="center">
                <Text fontSize="0.72rem" fontWeight="800">🚨 Ver Ficha de Alerta</Text>
              </Box>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <QuarantineAlertModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  )
}

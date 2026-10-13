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
import { Search } from 'lucide-react'
import type { AllyCardData } from '../data/cartilha-data'

function AllyImage({ item, modal = false }: { item: AllyCardData; modal?: boolean }) {
  const [hasImageError, setHasImageError] = useState(false)

  if (hasImageError) {
    return (
      <Box
        h="full"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-br, green.50, yellow.50)"
        color="green.700"
        fontSize={modal ? '4rem' : '3rem'}
        aria-label={`Imagem de ${item.label} indisponível`}
      >
        🐞
      </Box>
    )
  }

  return (
    <Image
      src={item.imageSrc}
      alt={item.alt}
      fill
      sizes={modal ? '(max-width: 600px) 100vw, 600px' : '(max-width: 768px) 33vw, 17vw'}
      style={{ objectFit: 'cover' }}
      onError={() => setHasImageError(true)}
    />
  )
}

function AllyModal({ item, onClose }: { item: AllyCardData | null; onClose: () => void }) {
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
        <DialogBackdrop bg="blackAlpha.600" backdropFilter="blur(8px)" />
        <DialogPositioner>
          <DialogContent
            mx={{ base: 3, sm: 4 }}
            maxW={{ base: '100%', sm: '600px' }}
            w="full"
            borderRadius={{ base: '20px', sm: '24px' }}
            overflow="hidden"
            boxShadow="0 28px 70px rgba(0,0,0,0.3)"
          >
            {item && (
              <>
                <Box h={{ base: '210px', sm: '280px' }} position="relative" overflow="hidden" bg="green.50">
                  <AllyImage item={item} modal />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(to top, rgba(0,0,0,0.55), transparent 60%)"
                    pointerEvents="none"
                  />
                  <Box position="absolute" left={5} right={5} bottom={4} pointerEvents="none">
                    <Text color="white" fontSize={{ base: '1.35rem', sm: '1.7rem' }} fontWeight="900">
                      {item.label}
                    </Text>
                    <Text color="white" fontSize="0.78rem" fontWeight="700">
                      Ficha técnica do aliado
                    </Text>
                  </Box>
                </Box>

                <DialogHeader px={{ base: 4, sm: 6 }} pt={5} pb={2}>
                  <DialogTitle color="green.900">Herói da lavoura</DialogTitle>
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
                  _focusVisible={{ outline: '3px solid', outlineColor: 'green.300' }}
                >
                  ×
                </DialogCloseTrigger>
                <DialogBody px={{ base: 4, sm: 6 }} pb={{ base: 6, sm: 8 }}>
                  <VStack align="stretch" gap={3}>
                    <Box bg="green.50" borderLeft="4px solid" borderColor="green.500" p={3} borderRadius="md">
                      <Text fontSize="0.72rem" fontWeight="800" color="green.800" mb={1}>
                        O que ele faz
                      </Text>
                      <Text fontSize="0.85rem" color="gray.700" lineHeight="1.6">
                        {item.role}
                      </Text>
                    </Box>
                    <Box bg="yellow.50" borderLeft="4px solid" borderColor="yellow.400" p={3} borderRadius="md">
                      <Text fontSize="0.72rem" fontWeight="800" color="yellow.800" mb={1}>
                        Benefício
                      </Text>
                      <Text fontSize="0.85rem" color="gray.700" lineHeight="1.6">
                        {item.benefit}
                      </Text>
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

export default function AllyGallery({ items }: { items: AllyCardData[] }) {
  const [selectedItem, setSelectedItem] = useState<AllyCardData | null>(null)

  return (
    <>
      <SimpleGrid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={{ base: 3, sm: 4 }}
        my={6}
      >
        {items.map((item) => (
          <Box
            key={item.label}
            as="button"
            onClick={() => setSelectedItem(item)}
            position="relative"
            overflow="hidden"
            borderRadius="16px"
            bg="white"
            border="1px solid"
            borderColor="green.200"
            boxShadow="sm"
            textAlign="left"
            cursor="pointer"
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{ transform: 'translateY(-3px)', shadow: 'md' }}
            _focusVisible={{ outline: '3px solid', outlineColor: 'yellow.300', outlineOffset: '3px' }}
          >
            <Box h="150px" w="100%" position="relative" overflow="hidden" bg="green.50">
              <AllyImage item={item} />
              <Box
                position="absolute"
                top={2}
                right={2}
                display="flex"
                alignItems="center"
                gap={1}
                px={2}
                py={1}
                borderRadius="full"
                bg="rgba(255,255,255,0.9)"
                color="green.800"
                fontSize="0.58rem"
                fontWeight="800"
                pointerEvents="none"
              >
                <Search size={11} aria-hidden="true" />
                Conhecer Herói
              </Box>
            </Box>
            <Box p={{ base: 3, sm: 4 }} bg="green.50">
              <Text fontSize={{ base: '0.75rem', sm: '0.86rem' }} fontWeight="800" color="green.900">
                {item.label}
              </Text>
              <Text mt={1} fontSize="0.64rem" color="gray.600">
                Clique para conhecer
              </Text>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
      <AllyModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </>
  )
}

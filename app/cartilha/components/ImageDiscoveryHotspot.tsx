'use client'

import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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
  Flex,
  Portal,
  SimpleGrid,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Search } from 'lucide-react'
import type { HotspotItemData, MicroorgCategory } from '../data/cartilha-data'

const CATEGORY_META: Record<
  MicroorgCategory,
  { label: string; color: string; soft: string }
> = {
  fungo: { label: 'Fungo', color: 'orange.700', soft: 'orange.50' },
  bacteria: { label: 'Bactéria', color: 'yellow.800', soft: 'yellow.50' },
  virus: { label: 'Vírus', color: 'green.700', soft: 'green.50' },
  fitoplasma: { label: 'Fitoplasma', color: 'teal.700', soft: 'teal.50' },
}

function InvestigationModal({
  item,
  onClose,
}: {
  item: HotspotItemData | null
  onClose: () => void
}) {
  const meta = item ? CATEGORY_META[item.category] : CATEGORY_META.fungo

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
            maxW={{ base: '100%', sm: '560px' }}
            w="full"
            borderRadius={{ base: '20px', sm: '24px' }}
            overflow="hidden"
            boxShadow="0 28px 70px rgba(0,0,0,0.3)"
          >
            {item && (
              <>
                <Box
                  h={{ base: '220px', sm: '290px' }}
                  position="relative"
                  overflow="hidden"
                  bg={meta.soft}
                >
                  <Image
                    src={item.backgroundImageSrc}
                    alt={`Fotografia ampliada de ${item.name}`}
                    fill
                    sizes="(max-width: 560px) 100vw, 560px"
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    bg="linear-gradient(to top, rgba(0,0,0,0.55), transparent 55%)"
                  />
                  <Box position="absolute" left={5} right={5} bottom={4}>
                    <Text color="white" fontSize={{ base: '1.35rem', sm: '1.65rem' }} fontWeight="900">
                      {item.name}
                    </Text>
                    <Text color="white" fontSize="0.8rem" fontWeight="700">
                      {meta.label}
                    </Text>
                  </Box>
                </Box>

                <DialogHeader px={{ base: 4, sm: 6 }} pt={5} pb={2}>
                  <DialogTitle color="green.900" fontSize={{ base: '1.05rem', sm: '1.2rem' }}>
                    Lente de Investigação
                  </DialogTitle>
                </DialogHeader>
                <DialogCloseTrigger
                  top={3}
                  right={3}
                  w="36px"
                  h="36px"
                  bg="rgba(0,0,0,0.35)"
                  color="white"
                  borderRadius="50%"
                  fontSize="1.35rem"
                  fontWeight="800"
                  lineHeight="1"
                  _hover={{ bg: 'rgba(0,0,0,0.55)' }}
                  _focusVisible={{ outline: '3px solid', outlineColor: 'yellow.300' }}
                >
                  ×
                </DialogCloseTrigger>
                <DialogBody px={{ base: 4, sm: 6 }} pb={{ base: 6, sm: 8 }}>
                  <VStack align="stretch" gap={3}>
                    <Box bg={meta.soft} borderLeft="4px solid" borderColor={meta.color} p={3} borderRadius="md">
                      <Text fontSize="0.72rem" fontWeight="800" color={meta.color} mb={1}>
                        O que observar
                      </Text>
                      <Text fontSize="0.85rem" color="gray.700" lineHeight="1.6">
                        {item.concept}
                      </Text>
                    </Box>
                    <Box bg="orange.50" borderLeft="4px solid" borderColor="orange.400" p={3} borderRadius="md">
                      <Text fontSize="0.72rem" fontWeight="800" color="orange.800" mb={1}>
                        Como se espalha
                      </Text>
                      <Text fontSize="0.85rem" color="gray.700" lineHeight="1.6">
                        {item.spreadText}
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

function HotspotCard({
  item,
  onInvestigate,
}: {
  item: HotspotItemData
  onInvestigate: () => void
}) {
  const meta = CATEGORY_META[item.category]

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ height: '100%' }}
    >
      <Box
        as="button"
        onClick={onInvestigate}
        position="relative"
        w="full"
        h={{ base: '250px', sm: '290px' }}
        borderRadius="18px"
        overflow="hidden"
        cursor="pointer"
        textAlign="left"
        bg="green.900"
        backgroundImage={`url('${item.backgroundImageSrc}')`}
        backgroundSize="cover"
        backgroundPosition="center"
        boxShadow="0 6px 28px rgba(0,0,0,0.2)"
        border="0"
        _hover={{ transform: 'translateY(-3px)', shadow: 'md' }}
        _focusVisible={{ outline: '3px solid', outlineColor: 'yellow.300', outlineOffset: '3px' }}
      >
        <Box position="absolute" inset={0} bg="linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0.05) 70%)" />

        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.1, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: '50%', left: '50%', zIndex: 2, transform: 'translate(-50%, -50%)' }}
        >
          <Flex
            w={{ base: '48px', sm: '54px' }}
            h={{ base: '48px', sm: '54px' }}
            align="center"
            justify="center"
            borderRadius="50%"
            bg="rgba(255,255,255,0.92)"
            color={meta.color}
            border="3px solid"
            borderColor="yellow.300"
            boxShadow="0 0 0 7px rgba(255,255,255,0.18), 0 5px 18px rgba(0,0,0,0.3)"
            aria-hidden="true"
          >
            <Search size={24} strokeWidth={2.5} />
          </Flex>
        </motion.div>

        <Box position="absolute" left={4} right={4} bottom={4} zIndex={3}>
          <Text color="white" fontSize={{ base: '0.85rem', sm: '0.95rem' }} fontWeight="900">
            {item.name}
          </Text>
          <Text color="whiteAlpha.800" fontSize="0.7rem" fontWeight="700">
            {meta.label} · clique para investigar
          </Text>
        </Box>
      </Box>
    </motion.div>
  )
}

export interface ImageDiscoveryHotspotGridProps {
  items: HotspotItemData[]
}

export function ImageDiscoveryHotspotGrid({ items }: ImageDiscoveryHotspotGridProps) {
  const [selectedItem, setSelectedItem] = useState<HotspotItemData | null>(null)

  return (
    <>
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap={{ base: 4, sm: 5 }} my={6}>
        {items.map((item) => (
          <HotspotCard key={item.id} item={item} onInvestigate={() => setSelectedItem(item)} />
        ))}
      </SimpleGrid>
      <AnimatePresence>
        {selectedItem && (
          <InvestigationModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default ImageDiscoveryHotspotGrid

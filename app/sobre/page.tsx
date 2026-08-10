'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Badge, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import { MapPin } from 'lucide-react'
import { sobreContent } from './_data/sobre'
import { HistoriaCard } from './components/HistoriaCard'
import { PorqueDigitalCard } from './components/PorqueDigitalCard'

export default function Sobre() {
  return (
    <AppShell>
      <Stack gap={{ base: 8, md: 10 }}>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          align="center"
          gap={{ base: 6, md: 8 }}
        >
          {/* Texto: prioridade de leitura */}
          <Stack gap={4} flex={1} maxW={{ base: 'full', md: '560px' }}>
            <Badge
              alignSelf="flex-start"
              bg="tertiary.600"
              color="white"
              borderRadius="full"
              px={3}
              py={1.5}
              display="inline-flex"
              alignItems="center"
              gap={1.5}
              fontSize="xs"
              fontWeight={600}
            >
              <MapPin size={12} aria-hidden />
              {sobreContent.badge}
            </Badge>

            <Heading as="h1" size="lg" lineHeight={1.3}>
              {sobreContent.title}
            </Heading>

            <Text color="muted" lineHeight={1.7}>
              {sobreContent.description}
            </Text>
          </Stack>

          {/* Imagem: reforço visual, com espaço reservado para não pular layout */}
          <Box
            position="relative"
            flexShrink={0}
            w={{ base: '200px', md: '220px' }}
            h={{ base: '200px', md: '220px' }}
          >
            {/* Círculo decorativo — puramente estético, oculto de leitores de tela */}
            <Box
              aria-hidden
              position="absolute"
              inset={0}
              borderRadius="full"
              bg="neutral.100"
              zIndex={0}
            />

            <Box
              position="relative"
              zIndex={1}
              w="full"
              h="full"
              borderRadius="full"
              overflow="hidden"
            >
              <NextImage
                src="/assets/dona_fito_meio_corpo.webp"
                alt="Dona Fito, mascote do EducaFito"
                fill
                sizes="(max-width: 768px) 200px, 220px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </Box>

            {/* Legenda vinculada à imagem, não posicionada "no chute" sobre o hero inteiro */}
            <Badge
              position="absolute"
              bottom="-4px"
              left="50%"
              transform="translateX(-50%)"
              bg="primary.600"
              color="white"
              borderRadius="full"
              px={3}
              py={1.5}
              fontSize="xs"
              fontWeight={700}
              zIndex={2}
              boxShadow="0 8px 20px rgba(0,0,0,0.15)"
              whiteSpace="nowrap"
            >
              Dona Fito
            </Badge>
          </Box>
        </Flex>

        <Flex direction={{ base: 'column', lg: 'row' }} gap={5} align="stretch">
          <HistoriaCard
            heading={sobreContent.historia.heading}
            paragraphs={sobreContent.historia.paragraphs}
          />
          <PorqueDigitalCard
            heading={sobreContent.porqueDigital.heading}
            paragraph={sobreContent.porqueDigital.paragraph}
            footerLabel={sobreContent.porqueDigital.footerLabel}
          />
        </Flex>
      </Stack>
    </AppShell>
  )
}
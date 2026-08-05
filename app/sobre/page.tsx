'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Badge, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { MapPin } from 'lucide-react'
import { sobreContent } from './_data/sobre'
import { HistoriaCard } from './components/HistoriaCard'
import { PorqueDigitalCard } from './components/PorqueDigitalCard'

export default function SobrePage() {
  return (
    <AppShell title="Sobre" description="Conheça a história e a missão do EducaFito.">
      <Stack gap={6}>
        <Box position="relative" overflow="hidden">
          <Box
            position="absolute"
            top="-30px"
            right="0"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="neutral.100"
            zIndex={0}
          />

          <Stack gap={4} position="relative" zIndex={1} maxW="560px">
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
              <MapPin size={12} />
              {sobreContent.badge}
            </Badge>

            <Heading as="h1" size="lg" lineHeight={1.3}>
              {sobreContent.title}
            </Heading>

            <Text color="muted" lineHeight={1.7}>
              {sobreContent.description}
            </Text>
          </Stack>

          <Badge
            position="absolute"
            bottom={0}
            right="60px"
            bg="primary.600"
            color="white"
            borderRadius="full"
            px={3}
            py={1.5}
            display="inline-flex"
            alignItems="center"
            gap={1.5}
            fontSize="xs"
            fontWeight={700}
            zIndex={2}
            boxShadow="0 8px 20px rgba(0,0,0,0.15)"
          >
            Dona Fito
          </Badge>
        </Box>

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
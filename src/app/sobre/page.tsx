import type { Metadata } from 'next'
import { AppShell } from '@/components/layout/AppShell'
import { Badge, Box, Separator, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import NextImage from 'next/image'
import { MapPin } from 'lucide-react'
import { sobreContent } from '@/features/sobre/data/sobre'
import { HistoriaCard } from '@/features/sobre/components/HistoriaCard'
import { PorqueDigitalCard } from '@/features/sobre/components/PorqueDigitalCard'
import { StatsRow } from '@/features/sobre/components/StatsRow'
import { MissaoVisionCard } from '@/features/sobre/components/MissaoVisionCard'
import { TechBadgeRow } from '@/features/sobre/components/TechBadgeRow'

export const metadata: Metadata = {
  title: 'Sobre',
  description:
    'Conheça a história, missão e visão do EducaFito — a plataforma de educação fitossanitária digital da Amazônia.',
}

export default function Sobre() {
  return (
    <AppShell>
      <Stack gap={{ base: 8, md: 10 }}>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <Box
          borderRadius="2xl"
          bg="surface"
          borderWidth="1px"
          borderColor="border"
          overflow="hidden"
          position="relative"
          px={{ base: 6, md: 10 }}
          py={{ base: 8, md: 10 }}
        >
          {/* Gradiente decorativo de fundo */}
          <Box
            aria-hidden
            position="absolute"
            top={0}
            right={0}
            w={{ base: '200px', md: '340px' }}
            h={{ base: '200px', md: '340px' }}
            borderRadius="full"
            bg="primary.50"
            style={{ filter: 'blur(60px)', transform: 'translate(30%, -30%)' }}
          />
          <Box
            aria-hidden
            position="absolute"
            bottom={0}
            left={0}
            w={{ base: '150px', md: '220px' }}
            h={{ base: '150px', md: '220px' }}
            borderRadius="full"
            bg="tertiary.50"
            style={{ filter: 'blur(50px)', transform: 'translate(-30%, 30%)' }}
          />

          <Flex
            direction={{ base: 'column', md: 'row' }}
            align="center"
            gap={{ base: 6, md: 10 }}
            position="relative"
            zIndex={1}
          >
            {/* Texto */}
            <Stack gap={5} flex={1} maxW={{ base: 'full', md: '560px' }}>
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

              <Heading as="h1" size="xl" lineHeight={1.25} fontWeight={800}>
                {sobreContent.title}
              </Heading>

              <Text color="muted" lineHeight={1.75} fontSize="sm">
                {sobreContent.description}
              </Text>
            </Stack>

            {/* Mascote */}
            <Box
              position="relative"
              flexShrink={0}
              w={{ base: '220px', md: '270px' }}
              h={{ base: '220px', md: '270px' }}
            >
              {/* Círculo decorativo */}
              <Box
                aria-hidden
                position="absolute"
                inset={0}
                borderRadius="full"
                bg="primary.50"
                borderWidth="3px"
                borderColor="primary.100"
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
                  sizes="(max-width: 768px) 220px, 270px"
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </Box>

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
        </Box>

        {/* ── Estatísticas ─────────────────────────────────────── */}
        <StatsRow stats={sobreContent.stats} />

        {/* ── Missão & Visão ────────────────────────────────────── */}
        <Stack gap={3}>
          <Heading as="h2" size="sm" color="muted" fontWeight={600} textTransform="uppercase" letterSpacing="0.08em">
            Propósito
          </Heading>
          <MissaoVisionCard data={sobreContent.missaoVisao} />
        </Stack>

        <Separator borderColor="border" />

        {/* ── História & Por que Digital ────────────────────────── */}
        <Stack gap={3}>
          <Heading as="h2" size="sm" color="muted" fontWeight={600} textTransform="uppercase" letterSpacing="0.08em">
            Nossa História
          </Heading>
          <Flex direction={{ base: 'column', lg: 'row' }} gap={5} align="stretch">
            <HistoriaCard
              heading={sobreContent.historia.heading}
              paragraphs={sobreContent.historia.paragraphs}
            />
            <PorqueDigitalCard
              heading={sobreContent.porqueDigital.heading}
              paragraph={sobreContent.porqueDigital.paragraph}
              footerLabel={sobreContent.porqueDigital.footerLabel}
              vantagens={sobreContent.porqueDigital.vantagens}
            />
          </Flex>
        </Stack>

        {/* ── Tecnologias ───────────────────────────────────────── */}
        <TechBadgeRow technologies={sobreContent.technologies} />

      </Stack>
    </AppShell>
  )
}
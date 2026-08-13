'use client'

import { useState, useMemo } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Badge,
  Button,
} from '@chakra-ui/react'
import { Sparkles, Newspaper, Video as VideoIcon, LayoutGrid } from 'lucide-react'
import { publicacoes, videos } from '@/app/midia/_data/midia'
import { PublicationCard } from '@/app/midia/components/PublicationCard'
import { VideoCard } from '@/app/midia/components/VideoCard'

type FilterType = 'all' | 'publicacoes' | 'videos'

const FILTER_OPTIONS: { value: FilterType; label: string; icon: React.ReactNode; count: number }[] = [
  { value: 'all', label: 'Tudo', icon: <LayoutGrid size={15} />, count: publicacoes.length + videos.length },
  { value: 'publicacoes', label: 'Publicações', icon: <Newspaper size={15} />, count: publicacoes.length },
  { value: 'videos', label: 'Vídeos', icon: <VideoIcon size={15} />, count: videos.length },
]

export default function MidiaPage() {
  const [filter, setFilter] = useState<FilterType>('all')

  const showPublicacoes = filter === 'all' || filter === 'publicacoes'
  const showVideos = filter === 'all' || filter === 'videos'

  const totalShown = useMemo(() => {
    if (filter === 'all') return publicacoes.length + videos.length
    if (filter === 'publicacoes') return publicacoes.length
    return videos.length
  }, [filter])

  return (
    <AppShell>
      <Stack gap={10}>

        {/* ── Hero Header ── */}
        <Box
          position="relative"
          borderRadius="2xl"
          overflow="hidden"
          px={{ base: 6, md: 10 }}
          py={{ base: 8, md: 10 }}
          bg="surface"
          borderWidth="1px"
          borderColor="border"
        >
          {/* Background decoration */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.045}
            bgImage="radial-gradient(circle at 80% 50%, var(--chakra-colors-primary-500) 0%, transparent 55%), radial-gradient(circle at 20% 80%, var(--chakra-colors-tertiary-500) 0%, transparent 50%)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            inset={0}
            opacity={0.4}
            bgImage="linear-gradient(rgba(15,107,61,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,107,61,0.06) 1px, transparent 1px)"
            bgSize="40px 40px"
            maskImage="radial-gradient(ellipse at 70% 40%, black 20%, transparent 80%)"
            pointerEvents="none"
          />

          <Box position="relative">
            <Badge
              colorPalette="green"
              variant="subtle"
              borderRadius="full"
              px={3}
              py={1}
              display="inline-flex"
              alignItems="center"
              gap={1.5}
              fontSize="xs"
              fontWeight={700}
              mb={4}
              letterSpacing="0.06em"
            >
              <Sparkles size={11} />
              ACOMPANHE
            </Badge>

            <Heading as="h1" size="xl" mb={3} letterSpacing="-0.02em">
              Na Mídia
            </Heading>

            <Text color="muted" maxW="540px" lineHeight={1.75} fontSize="sm">
              Fique por dentro das últimas novidades, reportagens e projetos do ecossistema
              EducaFito na região do Amapá. Cobertura jornalística, entrevistas e vídeos
              sobre educação fitossanitária e ciência cidadã.
            </Text>

            {/* Stats row */}
            <Flex gap={6} mt={6} flexWrap="wrap">
              {[
                { label: 'Publicações', value: publicacoes.length },
                { label: 'Vídeos', value: videos.length },
                { label: 'Fontes de mídia', value: new Set(publicacoes.map(p => p.source)).size },
              ].map(({ label, value }) => (
                <Box key={label}>
                  <Text fontSize="2xl" fontWeight={800} color="primary.600" lineHeight={1}>
                    {value}+
                  </Text>
                  <Text fontSize="xs" color="muted" mt={0.5}>
                    {label}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>

        {/* ── Filter Bar ── */}
        <Box>
          <Flex align="center" justify="space-between" flexWrap="wrap" gap={3} mb={6}>
            <Flex
              gap={2}
              p={1}
              bg="surface"
              borderWidth="1px"
              borderColor="border"
              borderRadius="full"
              flexWrap="wrap"
            >
              {FILTER_OPTIONS.map(opt => (
                <Button
                  key={opt.value}
                  size="sm"
                  borderRadius="full"
                  px={4}
                  gap={1.5}
                  fontWeight={600}
                  fontSize="sm"
                  variant={filter === opt.value ? 'solid' : 'ghost'}
                  colorPalette={filter === opt.value ? 'green' : 'gray'}
                  bg={filter === opt.value ? 'primary.600' : 'transparent'}
                  color={filter === opt.value ? 'white' : 'muted'}
                  _hover={filter === opt.value ? {} : { bg: 'neutral.100', color: 'fg' }}
                  transition="all 0.2s"
                  onClick={() => setFilter(opt.value)}
                >
                  {opt.icon}
                  {opt.label}
                  <Badge
                    ml={0.5}
                    px={1.5}
                    py={0}
                    borderRadius="full"
                    fontSize="10px"
                    fontWeight={700}
                    bg={filter === opt.value ? 'rgba(255,255,255,0.25)' : 'neutral.100'}
                    color={filter === opt.value ? 'white' : 'muted'}
                  >
                    {opt.count}
                  </Badge>
                </Button>
              ))}
            </Flex>

            <Text fontSize="sm" color="muted">
              {totalShown} {totalShown === 1 ? 'item encontrado' : 'itens encontrados'}
            </Text>
          </Flex>

          {/* ── Publicações Section ── */}
          {showPublicacoes && (
            <Box mb={filter === 'all' ? 10 : 0}>
              {filter === 'all' && (
                <Flex align="center" gap={3} mb={5}>
                  <Flex
                    w={8}
                    h={8}
                    borderRadius="lg"
                    bg="primary.50"
                    border="1px solid"
                    borderColor="primary.200"
                    align="center"
                    justify="center"
                    color="primary.600"
                    flexShrink={0}
                  >
                    <Newspaper size={15} />
                  </Flex>
                  <Heading as="h2" size="md">
                    Publicações recentes
                  </Heading>
                  <Badge
                    colorPalette="green"
                    variant="subtle"
                    borderRadius="full"
                    px={2}
                    py={0.5}
                    fontSize="xs"
                    fontWeight={700}
                  >
                    {publicacoes.length}
                  </Badge>
                </Flex>
              )}

              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                gap={5}
                css={{
                  '& > *': {
                    animation: 'fadeSlideUp 0.4s ease both',
                  },
                  '@keyframes fadeSlideUp': {
                    from: { opacity: 0, transform: 'translateY(16px)' },
                    to: { opacity: 1, transform: 'translateY(0)' },
                  },
                }}
              >
                {publicacoes.map((pub, i) => (
                  <PublicationCard key={pub.id} publicacao={pub} index={i} />
                ))}
              </SimpleGrid>
            </Box>
          )}

          {/* ── Section Divider (only when showing both) ── */}
          {filter === 'all' && (
            <Box
              position="relative"
              my={2}
              css={{
                '&::before': {
                  content: '""',
                  display: 'block',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, var(--chakra-colors-neutral-200) 20%, var(--chakra-colors-neutral-200) 80%, transparent)',
                },
              }}
            />
          )}

          {/* ── Vídeos Section ── */}
          {showVideos && (
            <Box
              mt={filter === 'all' ? 10 : 0}
              p={filter === 'all' ? { base: 5, md: 8 } : 0}
              bg={filter === 'all' ? 'surface' : 'transparent'}
              borderWidth={filter === 'all' ? '1px' : 0}
              borderColor="border"
              borderRadius={filter === 'all' ? '2xl' : 'none'}
            >
              {filter === 'all' && (
                <Flex align="center" gap={3} mb={5}>
                  <Flex
                    w={8}
                    h={8}
                    borderRadius="lg"
                    bg="tertiary.50"
                    border="1px solid"
                    borderColor="tertiary.200"
                    align="center"
                    justify="center"
                    color="tertiary.600"
                    flexShrink={0}
                  >
                    <VideoIcon size={15} />
                  </Flex>
                  <Heading as="h2" size="md">
                    Vídeos em destaque
                  </Heading>
                  <Badge
                    colorPalette="blue"
                    variant="subtle"
                    borderRadius="full"
                    px={2}
                    py={0.5}
                    fontSize="xs"
                    fontWeight={700}
                  >
                    {videos.length}
                  </Badge>
                </Flex>
              )}

              <SimpleGrid
                columns={{ base: 1, md: 2 }}
                gap={5}
                css={{
                  '& > *': {
                    animation: 'fadeSlideUp 0.4s ease both',
                  },
                }}
              >
                {videos.map((video, i) => (
                  <Box
                    key={video.id}
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <VideoCard video={video} />
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </Box>

      </Stack>
    </AppShell>
  )
}
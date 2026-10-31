'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Box, Flex, Heading, SimpleGrid, Stack, Text, Badge, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import { Sparkles, ArrowRight } from 'lucide-react'
import { publicacoes, videos } from '@/app/midia/_data/midia'
import { PublicationCard } from '@/app/midia/components/PublicationCard'
import { VideoCard } from '@/app/midia/components/VideoCard'

export default function MidiaPage() {
  return (
    <AppShell title="Mídia" description="Conteúdos em vídeo e leitura complementar.">
      <Stack gap={8}>
        <Box>
          <Badge
            colorPalette="gray"
            variant="subtle"
            borderRadius="full"
            px={3}
            py={1}
            display="inline-flex"
            alignItems="center"
            gap={1.5}
            fontSize="xs"
            fontWeight={600}
            color="muted"
            mb={4}
          >
            <Sparkles size={12} />
            ACOMPANHE
          </Badge>

          <Heading as="h1" size="xl" mb={2}>
            Na Mídia
          </Heading>
          <Text color="muted" maxW="560px" lineHeight={1.7}>
            Fique por dentro das últimas novidades, reportagens e projetos do ecossistema
            EducaFito na região do Amapá.
          </Text>
        </Box>

        <Box>
          <Flex align="center" justify="space-between" mb={4}>
            <Heading as="h2" size="md" color="tertiary.700">
              Publicações recentes
            </Heading>
            <ChakraLink
              asChild
              fontSize="sm"
              fontWeight={600}
              color="primary.600"
              display="inline-flex"
              alignItems="center"
              gap={1}
              _hover={{ color: 'primary.700', textDecoration: 'none' }}
            >
              <NextLink href="#">
                Ver todas
                <ArrowRight size={14} />
              </NextLink>
            </ChakraLink>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
            {publicacoes.map((pub) => (
              <PublicationCard key={pub.id} publicacao={pub} />
            ))}
          </SimpleGrid>
        </Box>

        <Box>
          <Flex align="center" gap={2} mb={4}>
            <Box w="4px" h="20px" bg="tertiary.500" borderRadius="full" />
            <Heading as="h2" size="md">
              Vídeos em destaque
            </Heading>
          </Flex>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={5}>
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </AppShell>
  )
}
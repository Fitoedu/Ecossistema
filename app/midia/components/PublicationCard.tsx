import { Box, Flex, Heading, Text, Badge, Link as ChakraLink, IconButton, Stack } from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Calendar, Share2, ArrowRight } from 'lucide-react'
import type { Publicacao } from '@/app/midia/_data/midia'

type PublicationCardProps = {
  publicacao: Publicacao
}

export function PublicationCard({ publicacao }: PublicationCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="2xl"
      overflow="hidden"
      bg="surface"
      transition="all 0.25s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 16px 40px color-mix(in srgb, var(--chakra-colors-primary-500) 14%, transparent)',
      }}
    >
      <Box position="relative" h="160px" bg="neutral.100">
        <NextImage
          src={publicacao.image}
          alt={publicacao.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover' }}
        />
        <Badge
          position="absolute"
          top={3}
          left={3}
          bg="blackAlpha.700"
          color="white"
          fontSize="xs"
          fontWeight={600}
          borderRadius="md"
          px={2}
          py={1}
        >
          {publicacao.source}
        </Badge>
      </Box>

      <Stack gap={2} p={4}>
        <Flex align="center" gap={1.5} fontSize="xs" color="muted">
          <Calendar size={12} />
          <Text>{publicacao.date}</Text>
        </Flex>

        <Heading as="h3" size="sm" lineHeight={1.4}>
          {publicacao.title}
        </Heading>

        <Text color="muted" fontSize="sm" lineHeight={1.6}>
          {publicacao.description}
        </Text>

        <Flex align="center" justify="space-between" pt={2}>
          <ChakraLink
            asChild
            fontSize="sm"
            fontWeight={600}
            color="tertiary.600"
            display="inline-flex"
            alignItems="center"
            gap={1}
            _hover={{ color: 'tertiary.700', textDecoration: 'none' }}
          >
            <NextLink href={publicacao.href}>
              Ler mais
              <ArrowRight size={14} />
            </NextLink>
          </ChakraLink>

          <IconButton
            aria-label="Compartilhar"
            variant="ghost"
            size="sm"
            color="muted"
            _hover={{ color: 'fg', bg: 'neutral.100' }}
          >
            <Share2 size={16} />
          </IconButton>
        </Flex>
      </Stack>
    </Box>
  )
}
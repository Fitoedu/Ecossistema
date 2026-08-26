'use client'

import { Box, Flex, Heading, Text, Badge, Link as ChakraLink, IconButton, Stack } from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { Calendar, Share2, ArrowRight, Tag } from 'lucide-react'
import type { Publicacao } from '../data/midia'

type PublicationCardProps = {
  publicacao: Publicacao
  index?: number
}

async function handleShare(publicacao: Publicacao) {
  const shareData = {
    title: publicacao.title,
    text: publicacao.description,
    url: publicacao.href === '#' ? window.location.href : publicacao.href,
  }
  try {
    if (navigator.share) {
      await navigator.share(shareData)
    } else {
      await navigator.clipboard.writeText(shareData.url)
    }
  } catch {
    // user cancelled or clipboard failed silently
  }
}

export function PublicationCard({ publicacao, index = 0 }: PublicationCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="2xl"
      overflow="hidden"
      bg="surface"
      display="flex"
      flexDirection="column"
      transition="all 0.28s ease"
      style={{ animationDelay: `${index * 80}ms` }}
      _hover={{
        transform: 'translateY(-5px)',
        borderColor: 'primary.200',
        boxShadow: '0 20px 48px color-mix(in srgb, var(--chakra-colors-primary-500) 16%, transparent)',
      }}
    >
      {/* Image */}
      <Box
        position="relative"
        h="200px"
        bg="neutral.100"
        overflow="hidden"
        flexShrink={0}
        css={{
          '&:hover .read-overlay': {
            opacity: 1,
          },
          '&:hover img': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <NextImage
          src={publicacao.image}
          alt={publicacao.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
        />

        {/* Read overlay on hover */}
        <Box
          className="read-overlay"
          position="absolute"
          inset={0}
          bg="linear-gradient(to top, rgba(15, 107, 61, 0.55) 0%, transparent 60%)"
          opacity={0}
          transition="opacity 0.3s ease"
          display="flex"
          alignItems="flex-end"
          px={3}
          pb={3}
        >
          <Text color="white" fontSize="xs" fontWeight={700} letterSpacing="0.06em">
            Ler reportagem →
          </Text>
        </Box>

        {/* Source badge */}
        <Badge
          position="absolute"
          top={3}
          left={3}
          bg="rgba(0, 0, 0, 0.58)"
          backdropFilter="blur(8px)"
          color="white"
          fontSize="xs"
          fontWeight={600}
          borderRadius="md"
          px={2}
          py={0.5}
          border="1px solid rgba(255,255,255,0.14)"
        >
          {publicacao.source}
        </Badge>

        {/* Category badge */}
        {publicacao.category && (
          <Badge
            position="absolute"
            top={3}
            right={3}
            bg="primary.600"
            color="white"
            fontSize="xs"
            fontWeight={600}
            borderRadius="md"
            px={2}
            py={0.5}
            display="inline-flex"
            alignItems="center"
            gap={1}
          >
            <Tag size={9} />
            {publicacao.category}
          </Badge>
        )}
      </Box>

      {/* Content */}
      <Stack gap={2} p={4} flex={1}>
        <Flex align="center" gap={1.5} fontSize="xs" color="muted">
          <Calendar size={12} />
          <Text>{publicacao.date}</Text>
        </Flex>

        <Heading
          as="h3"
          size="sm"
          lineHeight={1.45}
          css={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {publicacao.title}
        </Heading>

        <Text
          color="muted"
          fontSize="sm"
          lineHeight={1.65}
          flex={1}
          css={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {publicacao.description}
        </Text>

        <Flex align="center" justify="space-between" pt={2} borderTopWidth="1px" borderColor="border" mt="auto">
          <ChakraLink
            asChild
            fontSize="sm"
            fontWeight={600}
            color="tertiary.600"
            display="inline-flex"
            alignItems="center"
            gap={1}
            _hover={{ color: 'tertiary.700', textDecoration: 'none', gap: '6px' }}
            transition="all 0.2s"
          >
            <NextLink href={publicacao.href}>
              Ler mais
              <ArrowRight size={14} />
            </NextLink>
          </ChakraLink>

          <IconButton
            aria-label="Compartilhar publicação"
            variant="ghost"
            size="sm"
            color="muted"
            _hover={{ color: 'primary.600', bg: 'primary.50' }}
            transition="all 0.2s"
            onClick={() => handleShare(publicacao)}
          >
            <Share2 size={15} />
          </IconButton>
        </Flex>
      </Stack>
    </Box>
  )
}
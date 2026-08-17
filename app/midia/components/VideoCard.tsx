'use client'

import { AspectRatio, Box, Flex, Text, Badge, Stack } from '@chakra-ui/react'
import NextImage from 'next/image'
import NextLink from 'next/link'
import { Play, Clock, Eye } from 'lucide-react'
import type { Video } from '@/app/midia/_data/midia'

type VideoCardProps = {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  const isEmbed = video.href.includes('youtube') || video.href.includes('vimeo')

  return (
    <Box
      borderRadius="2xl"
      overflow="hidden"
      bg="neutral.900"
      borderWidth="1px"
      borderColor="border"
      transition="all 0.28s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 20px 48px rgba(0,0,0,0.22)',
      }}
      css={{
        '&:hover .play-btn': {
          transform: 'scale(1.14)',
          boxShadow: '0 12px 36px rgba(0,0,0,0.50)',
        },
        '&:hover .thumb-img': {
          transform: 'scale(1.05)',
        },
        '&:hover .hover-overlay': {
          opacity: 1,
        },
      }}
    >
      {/* ── Vídeo / Thumbnail ── */}
      <AspectRatio ratio={16 / 9}>
        {isEmbed ? (
          /* Vídeo embed real (YouTube / Vimeo) */
          <iframe
            title={video.title}
            src={video.href}
            allowFullScreen
            style={{ border: 'none' }}
          />
        ) : (
          /* Thumbnail + overlay com botão play */
          <NextLink href={video.href} style={{ display: 'block', position: 'relative', cursor: 'pointer' }}>
            {/* Imagem de capa */}
            <NextImage
              className="thumb-img"
              src={video.thumbnail}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
              }}
            />

            {/* Gradiente base */}
            <Box
              position="absolute"
              inset={0}
              bg="linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 45%, transparent 100%)"
            />

            {/* Overlay de hover */}
            <Box
              className="hover-overlay"
              position="absolute"
              inset={0}
              bg="rgba(0,0,0,0.18)"
              opacity={0}
              transition="opacity 0.3s ease"
            />

            {/* Badge duração — topo direito */}
            <Badge
              position="absolute"
              top={3}
              right={3}
              bg="rgba(0,0,0,0.70)"
              backdropFilter="blur(6px)"
              color="white"
              fontSize="xs"
              fontWeight={700}
              borderRadius="md"
              px={2}
              py={0.5}
              border="1px solid rgba(255,255,255,0.12)"
              display="inline-flex"
              alignItems="center"
              gap={1}
            >
              <Clock size={10} />
              {video.duration}
            </Badge>

            {/* Botão play — centro */}
            <Flex position="absolute" inset={0} align="center" justify="center">
              <Flex
                className="play-btn"
                w={14}
                h={14}
                borderRadius="full"
                bg="whiteAlpha.900"
                align="center"
                justify="center"
                boxShadow="0 8px 24px rgba(0,0,0,0.30)"
                transition="transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.28s ease"
                pl="3px"
              >
                <Play size={22} fill="currentColor" color="var(--chakra-colors-primary-600)" />
              </Flex>
            </Flex>
          </NextLink>
        )}
      </AspectRatio>

      {/* ── Informações do vídeo ── */}
      <Stack gap={1.5} px={4} py={3}>
        <Text
          fontWeight={700}
          fontSize="sm"
          lineHeight={1.4}
          color="white"
          css={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {video.title}
        </Text>

        <Flex align="center" justify="space-between">
          <Text color="whiteAlpha.600" fontSize="xs">
            {video.channel}
          </Text>
          <Flex align="center" gap={1} color="whiteAlpha.500" fontSize="xs">
            <Eye size={11} />
            {video.views}
          </Flex>
        </Flex>
      </Stack>
    </Box>
  )
}
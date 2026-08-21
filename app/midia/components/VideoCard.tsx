'use client'

import { AspectRatio, Box, chakra } from '@chakra-ui/react'
import type { Video } from '@/app/midia/_data/midia'

const ChakraIframe = chakra('iframe')

type VideoCardProps = {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
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
    >
      <AspectRatio ratio={16 / 9}>
        <ChakraIframe
          src={video.href}
          allowFullScreen
          border="none"
        />
      </AspectRatio>
    </Box>
  )
}
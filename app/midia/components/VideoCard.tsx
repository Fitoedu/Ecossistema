import { Box, Flex } from '@chakra-ui/react'
import NextImage from 'next/image'
import { Play } from 'lucide-react'
import type { Video } from '@/app/midia/_data/midia'

type VideoCardProps = {
  video: Video
}

export function VideoCard({ video }: VideoCardProps) {
  return (
    <Box position="relative" h="220px" borderRadius="2xl" overflow="hidden" bg="neutral.800">
      <NextImage
        src={video.thumbnail}
        alt={video.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        style={{ objectFit: 'cover' }}
      />
      <Box position="absolute" inset={0} bg="blackAlpha.300" />
      <Flex position="absolute" inset={0} align="center" justify="center">
        <Flex
          w={14}
          h={14}
          borderRadius="full"
          bg="whiteAlpha.900"
          align="center"
          justify="center"
          boxShadow="0 8px 24px rgba(0,0,0,0.25)"
        >
          <Play size={22} fill="currentColor" color="var(--chakra-colors-primary-600)" />
        </Flex>
      </Flex>
    </Box>
  )
}
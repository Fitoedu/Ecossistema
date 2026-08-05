import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Sprout } from 'lucide-react'

type HistoriaCardProps = {
  heading: string
  paragraphs: string[]
}

export function HistoriaCard({ heading, paragraphs }: HistoriaCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="2xl"
      p={6}
      bg="surface"
      flex="1"
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        top="-40px"
        right="-40px"
        w="140px"
        h="140px"
        borderRadius="full"
        bg="neutral.100"
        zIndex={0}
      />

      <Stack gap={4} position="relative" zIndex={1}>
        <Flex align="center" gap={3}>
          <Flex
            w={9}
            h={9}
            borderRadius="lg"
            bg="primary.600"
            align="center"
            justify="center"
            color="white"
            flexShrink={0}
          >
            <Sprout size={18} />
          </Flex>
          <Heading as="h3" size="md">
            {heading}
          </Heading>
        </Flex>

        <Stack gap={4}>
          {paragraphs.map((paragraph, index) => (
            <Text key={index} color="muted" lineHeight={1.7}>
              {paragraph}
            </Text>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
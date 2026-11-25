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
      transition="box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease"
      _hover={{
        boxShadow: 'lg',
        transform: 'translateY(-3px)',
        borderColor: 'primary.600',
      }}
    >
      {/* Círculo decorativo */}
      <Box
        aria-hidden
        position="absolute"
        top="-40px"
        right="-40px"
        w="160px"
        h="160px"
        borderRadius="full"
        bg="primary.50"
        zIndex={0}
      />

      <Stack gap={5} position="relative" zIndex={1}>
        <Flex align="center" gap={3}>
          <Flex
            w={10}
            h={10}
            borderRadius="lg"
            bg="primary.600"
            align="center"
            justify="center"
            color="white"
            flexShrink={0}
            boxShadow="0 4px 12px rgba(46,125,50,0.3)"
          >
            <Sprout size={20} aria-hidden />
          </Flex>
          <Heading as="h3" size="md" fontWeight={700}>
            {heading}
          </Heading>
        </Flex>

        <Stack gap={4}>
          {paragraphs.map((paragraph, index) => (
            <Text key={index} color="muted" lineHeight={1.75} fontSize="sm">
              {paragraph}
            </Text>
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}
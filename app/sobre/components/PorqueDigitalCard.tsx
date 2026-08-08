import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Lightbulb, Microscope } from 'lucide-react'

type PorqueDigitalCardProps = {
  heading: string
  paragraph: string
  footerLabel: string
}

export function PorqueDigitalCard({ heading, paragraph, footerLabel }: PorqueDigitalCardProps) {
  return (
    <Box
      borderRadius="2xl"
      p={6}
      bg="tertiary.600"
      color="white"
      w={{ base: '100%', lg: '280px' }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Stack gap={4}>
        <Flex
          w={9}
          h={9}
          borderRadius="lg"
          bg="whiteAlpha.200"
          align="center"
          justify="center"
        >
          <Lightbulb size={18} />
        </Flex>

        <Heading as="h3" size="md" color="white">
          {heading}
        </Heading>

        <Text color="whiteAlpha.900" fontSize="sm" lineHeight={1.7}>
          {paragraph}
        </Text>
      </Stack>

      <Flex
        align="center"
        gap={2}
        pt={5}
        mt={5}
        borderTop="1px solid"
        borderColor="whiteAlpha.300"
      >
        <Text fontSize="xs" fontWeight={700} letterSpacing="0.05em">
          {footerLabel}
        </Text>
        <Microscope size={16} />
      </Flex>
    </Box>
  )
}
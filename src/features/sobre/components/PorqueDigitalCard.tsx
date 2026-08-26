import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Check, Lightbulb, Microscope } from 'lucide-react'

type PorqueDigitalCardProps = {
  heading: string
  paragraph: string
  footerLabel: string
  vantagens: string[]
}

export function PorqueDigitalCard({ heading, paragraph, footerLabel, vantagens }: PorqueDigitalCardProps) {
  return (
    <Box
      borderRadius="2xl"
      p={6}
      bg="tertiary.600"
      color="white"
      flex="1"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      position="relative"
      overflow="hidden"
    >
      {/* Círculos decorativos */}
      <Box
        aria-hidden
        position="absolute"
        top="-30px"
        right="-30px"
        w="120px"
        h="120px"
        borderRadius="full"
        bg="whiteAlpha.100"
      />
      <Box
        aria-hidden
        position="absolute"
        bottom="60px"
        left="-20px"
        w="80px"
        h="80px"
        borderRadius="full"
        bg="whiteAlpha.100"
      />

      <Stack gap={4} position="relative" zIndex={1}>
        <Flex
          w={10}
          h={10}
          borderRadius="lg"
          bg="whiteAlpha.200"
          align="center"
          justify="center"
        >
          <Lightbulb size={20} aria-hidden />
        </Flex>

        <Heading as="h3" size="md" color="white">
          {heading}
        </Heading>

        <Text color="whiteAlpha.900" fontSize="sm" lineHeight={1.7}>
          {paragraph}
        </Text>

        {/* Lista de vantagens */}
        <Stack gap={2} mt={1}>
          {vantagens.map((vantagem, index) => (
            <Flex key={index} align="center" gap={2.5}>
              <Flex
                w={5}
                h={5}
                borderRadius="full"
                bg="whiteAlpha.200"
                align="center"
                justify="center"
                flexShrink={0}
              >
                <Check size={11} aria-hidden />
              </Flex>
              <Text fontSize="xs" color="whiteAlpha.900" lineHeight={1.5}>
                {vantagem}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Stack>

      <Flex
        align="center"
        gap={2}
        pt={5}
        mt={5}
        borderTop="1px solid"
        borderColor="whiteAlpha.300"
        position="relative"
        zIndex={1}
      >
        <Text fontSize="xs" fontWeight={700} letterSpacing="0.05em">
          {footerLabel}
        </Text>
        <Microscope size={16} aria-hidden />
      </Flex>
    </Box>
  )
}
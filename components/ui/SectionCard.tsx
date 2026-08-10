import { Box, Flex, Heading, Icon } from '@chakra-ui/react'
import type { IconType } from 'react-icons'
import { useId } from 'react'

interface SectionCardProps {
  title: string
  icon: IconType
  accentColor: string
  children: React.ReactNode
}

export function SectionCard({ title, icon, accentColor, children }: SectionCardProps) {
  const headingId = useId()

  return (
    <Box
      as="section"
      aria-labelledby={headingId}
      bg="surface"
      borderRadius="18px"
      border="1.5px solid"
      borderColor="primary.100"
      p={5}
      boxShadow="0 2px 12px rgba(15,42,26,0.06)"
    >
      <Flex align="center" gap={2}>
        <Flex
          w={7}
          h={7}
          borderRadius="8px"
          bg={`${accentColor}18`}
          align="center"
          justify="center"
          color={accentColor}
        >
          <Icon as={icon} boxSize={3.5} />
        </Flex>
        <Heading id={headingId} as="h3" fontWeight={700} fontSize="sm" color="fg">
          {title}
        </Heading>
      </Flex>
      <Box mt={3}>{children}</Box>
    </Box>
  )
}

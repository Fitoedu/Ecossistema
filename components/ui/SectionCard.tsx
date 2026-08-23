import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import type { LucideIcon } from 'lucide-react'

interface SectionCardProps {
  title: string
  icon: LucideIcon
  accentColor: string
  children: React.ReactNode
}

export function SectionCard({ title, icon, accentColor, children }: SectionCardProps) {
  return (
    <Box
      bg="white"
      borderRadius="18px"
      border="1.5px solid"
      borderColor="rgba(15,107,61,0.08)"
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
        <Text fontWeight={700} fontSize="sm" color="#1b3327">
          {title}
        </Text>
      </Flex>
      {children}
    </Box>
  )
}

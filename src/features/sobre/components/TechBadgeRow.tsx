import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react'
import { Code2 } from 'lucide-react'
import type { Technology } from '../data/sobre'

type TechBadgeRowProps = {
  technologies: Technology[]
}

export function TechBadgeRow({ technologies }: TechBadgeRowProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="2xl"
      p={5}
      bg="surface"
    >
      <Flex align="center" gap={2} mb={4}>
        <Flex
          w={8}
          h={8}
          borderRadius="lg"
          bg="neutral.100"
          align="center"
          justify="center"
          color="neutral.700"
          flexShrink={0}
        >
          <Code2 size={16} aria-hidden />
        </Flex>
        <Heading as="h3" size="sm" fontWeight={700}>
          Tecnologias Utilizadas
        </Heading>
      </Flex>

      <Flex wrap="wrap" gap={3} role="list" aria-label="Tecnologias do projeto">
        {technologies.map((tech) => (
          <Flex
            key={tech.name}
            role="listitem"
            align="center"
            gap={2}
            borderWidth="1px"
            borderColor="border"
            borderRadius="xl"
            px={3}
            py={2}
            bg="bg"
            transition="border-color 0.15s ease, background 0.15s ease"
            _hover={{ borderColor: 'primary.600', bg: 'primary.50' }}
            cursor="default"
          >
            <Badge
              bg="primary.600"
              color="white"
              borderRadius="md"
              px={1.5}
              py={0.5}
              fontSize="2xs"
              fontWeight={700}
            >
              {tech.name}
            </Badge>
            <Text fontSize="xs" color="muted" fontWeight={500}>
              {tech.description}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  )
}

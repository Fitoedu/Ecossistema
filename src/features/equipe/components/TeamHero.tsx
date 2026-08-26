import { Badge, Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Users } from 'lucide-react'

const stats = [
  { value: '3', label: 'Especialistas' },
  { value: '3', label: 'Áreas de Expertise' },
]

export function TeamHero() {
  return (
    <Box
      borderRadius="2xl"
      bg="surface"
      borderWidth="1px"
      borderColor="border"
      overflow="hidden"
      position="relative"
      px={{ base: 6, md: 10 }}
      py={{ base: 8, md: 10 }}
    >
      {/* Gradiente decorativo — blob superior direito */}
      <Box
        aria-hidden
        position="absolute"
        top={0}
        right={0}
        w={{ base: '200px', md: '320px' }}
        h={{ base: '200px', md: '320px' }}
        borderRadius="full"
        bg="primary.50"
        style={{ filter: 'blur(60px)', transform: 'translate(30%, -30%)' }}
      />
      {/* Gradiente decorativo — blob inferior esquerdo */}
      <Box
        aria-hidden
        position="absolute"
        bottom={0}
        left={0}
        w={{ base: '150px', md: '220px' }}
        h={{ base: '150px', md: '220px' }}
        borderRadius="full"
        bg="tertiary.50"
        style={{ filter: 'blur(50px)', transform: 'translate(-30%, 30%)' }}
      />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'flex-start', md: 'center' }}
        justify="space-between"
        gap={{ base: 6, md: 10 }}
        position="relative"
        zIndex={1}
      >
        {/* Texto principal */}
        <Stack gap={4} flex={1} maxW={{ base: 'full', md: '560px' }}>
          <Badge
            alignSelf="flex-start"
            bg="primary.600"
            color="white"
            borderRadius="full"
            px={3}
            py={1.5}
            display="inline-flex"
            alignItems="center"
            gap={1.5}
            fontSize="xs"
            fontWeight={600}
          >
            <Users size={12} aria-hidden />
            Equipe EducaFito
          </Badge>

          <Heading as="h1" size="xl" lineHeight={1.25} fontWeight={800}>
            Conheça Nossa Equipe
          </Heading>

          <Text color="muted" lineHeight={1.75} fontSize="sm" maxW="480px">
            Especialistas dedicados a conectar ciência, tecnologia e educação para proteger as
            plantas e garantir alimentos saudáveis para todos.
          </Text>
        </Stack>

        {/* Stats rápidas */}
        <Flex
          gap={{ base: 4, md: 6 }}
          wrap="wrap"
          justify={{ base: 'flex-start', md: 'flex-end' }}
          flexShrink={0}
        >
          {stats.map((stat) => (
            <Stack key={stat.label} gap={0} align="center" textAlign="center" minW="80px">
              <Text
                fontSize="2xl"
                fontWeight={800}
                color="primary.700"
                lineHeight={1.1}
              >
                {stat.value}
              </Text>
              <Text fontSize="xs" color="muted" fontWeight={500} lineHeight={1.4} mt={1}>
                {stat.label}
              </Text>
            </Stack>
          ))}
        </Flex>
      </Flex>
    </Box>
  )
}

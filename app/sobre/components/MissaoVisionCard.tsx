import { Badge, Box, Flex, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { Eye, Heart, Target } from 'lucide-react'
import type { MissaoVision } from '../_data/sobre'

type MissaoVisionCardProps = {
  data: MissaoVision
}

export function MissaoVisionCard({ data }: MissaoVisionCardProps) {
  return (
    <Stack gap={4}>
      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={4}>
        {/* Missão */}
        <Box
          borderWidth="1px"
          borderColor="primary.600"
          borderRadius="2xl"
          p={6}
          bg="surface"
          position="relative"
          overflow="hidden"
          transition="box-shadow 0.2s ease, transform 0.2s ease"
          _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
        >
          <Box
            aria-hidden
            position="absolute"
            bottom="-30px"
            right="-30px"
            w="100px"
            h="100px"
            borderRadius="full"
            bg="primary.50"
          />
          <Stack gap={3} position="relative" zIndex={1}>
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
                <Target size={18} aria-hidden />
              </Flex>
              <Heading as="h3" size="sm" fontWeight={700}>
                {data.missao.heading}
              </Heading>
            </Flex>
            <Text color="muted" fontSize="sm" lineHeight={1.7}>
              {data.missao.paragraph}
            </Text>
          </Stack>
        </Box>

        {/* Visão */}
        <Box
          borderWidth="1px"
          borderColor="tertiary.600"
          borderRadius="2xl"
          p={6}
          bg="surface"
          position="relative"
          overflow="hidden"
          transition="box-shadow 0.2s ease, transform 0.2s ease"
          _hover={{ boxShadow: 'md', transform: 'translateY(-2px)' }}
        >
          <Box
            aria-hidden
            position="absolute"
            bottom="-30px"
            right="-30px"
            w="100px"
            h="100px"
            borderRadius="full"
            bg="tertiary.50"
          />
          <Stack gap={3} position="relative" zIndex={1}>
            <Flex align="center" gap={3}>
              <Flex
                w={9}
                h={9}
                borderRadius="lg"
                bg="tertiary.600"
                align="center"
                justify="center"
                color="white"
                flexShrink={0}
              >
                <Eye size={18} aria-hidden />
              </Flex>
              <Heading as="h3" size="sm" fontWeight={700}>
                {data.visao.heading}
              </Heading>
            </Flex>
            <Text color="muted" fontSize="sm" lineHeight={1.7}>
              {data.visao.paragraph}
            </Text>
          </Stack>
        </Box>
      </Grid>

      {/* Valores */}
      <Flex
        align="center"
        gap={3}
        wrap="wrap"
        borderWidth="1px"
        borderColor="border"
        borderRadius="2xl"
        p={4}
        bg="surface"
      >
        <Flex align="center" gap={1.5} color="primary.600" flexShrink={0}>
          <Heart size={14} aria-hidden />
          <Text fontSize="xs" fontWeight={700} textTransform="uppercase" letterSpacing="0.05em">
            Valores
          </Text>
        </Flex>
        {data.valores.map((valor) => (
          <Badge
            key={valor}
            borderRadius="full"
            px={3}
            py={1}
            bg="primary.50"
            color="primary.700"
            fontSize="xs"
            fontWeight={600}
          >
            {valor}
          </Badge>
        ))}
      </Flex>
    </Stack>
  )
}

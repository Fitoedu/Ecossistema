import { Box, Flex, Text, Stack, Icon, LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { Feature } from '@/app/home/_data/features'

type FeatureCardProps = {
  feature: Feature
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const textColor = feature.dark ? 'white' : 'fg'
  const descColor = feature.dark ? 'whiteAlpha.900' : 'muted'

  return (
    <LinkBox
      as={Box}
      id={`feature-card-${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
      bg={feature.cardBg}
      border="1px solid"
      borderColor={feature.cardBorder}
      borderRadius="2xl"
      p={6}
      h="100%"
      transition="all 0.25s ease"
      _hover={{
        transform: 'translateY(-4px)',
        boxShadow: '0 16px 40px color-mix(in srgb, var(--chakra-colors-primary-500) 18%, transparent)',
      }}
      _focusWithin={{
        outline: '2px solid',
        outlineColor: 'primary.500',
        outlineOffset: '2px',
      }}
    >
      <Stack gap={3}>
        <Flex
          w={10}
          h={10}
          borderRadius="md"
          bg={feature.iconBg}
          align="center"
          justify="center"
          color="white"
          boxShadow="0 8px 18px rgba(0,0,0,0.14)"
        >
          <Icon boxSize={4.5}>
            <feature.icon />
          </Icon>
        </Flex>

        <Text fontWeight={800} fontSize="lg" color={textColor}>
          <LinkOverlay asChild>
            <NextLink href={feature.href}>{feature.title}</NextLink>
          </LinkOverlay>
        </Text>

        <Text color={descColor} fontSize="sm" lineHeight={1.55} maxW="260px">
          {feature.desc}
        </Text>
      </Stack>
    </LinkBox>
  )
}
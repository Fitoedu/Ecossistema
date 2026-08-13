import { Box, Badge, Flex, Heading, Text, Stack, Link as ChakraLink, Wrap } from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { GraduationCap } from 'lucide-react'
import type { TeamMember } from '@/app/equipe/_data/equipe'

type TeamMemberCardProps = {
  member: TeamMember
}

const roleColorMap = {
  primary: {
    text: 'primary.700',
    badge: 'primary.600',
    border: 'primary.200',
    ring: 'primary.300',
    tag: 'primary.50',
    tagText: 'primary.700',
  },
  tertiary: {
    text: 'tertiary.700',
    badge: 'tertiary.600',
    border: 'tertiary.200',
    ring: 'tertiary.300',
    tag: 'tertiary.50',
    tagText: 'tertiary.700',
  },
  accent: {
    text: 'accent.700',
    badge: 'accent.600',
    border: 'accent.200',
    ring: 'accent.300',
    tag: 'accent.50',
    tagText: 'accent.700',
  },
} as const

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  const colors = roleColorMap[member.roleColor]

  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="2xl"
      p={6}
      bg="surface"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      h="100%"
      transition="all 0.25s ease"
      _hover={{
        boxShadow: '0 8px 30px rgba(0,0,0,0.10)',
        transform: 'translateY(-4px)',
        borderColor: colors.border,
      }}
    >
      <Stack gap={4}>
        {/* Avatar + nome + cargo */}
        <Flex align="flex-start" gap={4}>
          {/* Foto com borda colorida */}
          <Box
            position="relative"
            w="80px"
            h="80px"
            borderRadius="full"
            flexShrink={0}
            p="3px"
            bg={colors.border}
          >
            <Box
              position="relative"
              w="full"
              h="full"
              borderRadius="full"
              overflow="hidden"
              bg="neutral.100"
            >
              <NextImage
                src={member.photo}
                alt={member.name}
                fill
                sizes="80px"
                style={{ objectFit: 'cover' }}
              />
            </Box>
          </Box>

          {/* Nome + badge de cargo */}
          <Box pt={1}>
            <Heading as="h3" size="sm" lineHeight={1.3} mb={2}>
              {member.name}
            </Heading>
            <Badge
              bg={colors.badge}
              color="white"
              borderRadius="full"
              px={2.5}
              py={1}
              fontSize="xs"
              fontWeight={700}
              letterSpacing="0.02em"
            >
              {member.role}
            </Badge>
          </Box>
        </Flex>

        {/* Bio */}
        <Text color="muted" fontSize="sm" lineHeight={1.75}>
          {member.bio}
        </Text>

        {/* Tags de expertise */}
        {member.expertise && member.expertise.length > 0 && (
          <Wrap gap={1.5}>
            {member.expertise.map((tag) => (
              <Box
                key={tag}
                as="span"
                px={2.5}
                py={0.5}
                borderRadius="full"
                bg={colors.tag}
                color={colors.tagText}
                fontSize="xs"
                fontWeight={600}
                lineHeight={1.6}
              >
                {tag}
              </Box>
            ))}
          </Wrap>
        )}
      </Stack>

      {/* Botão Lattes */}
      <ChakraLink
        asChild
        mt={5}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        border="1px solid"
        borderColor="tertiary.300"
        color="tertiary.700"
        borderRadius="lg"
        px={4}
        py={2.5}
        fontSize="sm"
        fontWeight={600}
        textDecoration="none"
        transition="all 0.2s ease"
        _hover={{ bg: 'tertiary.50', borderColor: 'tertiary.500', textDecoration: 'none' }}
      >
        <NextLink href={member.lattesUrl} target="_blank" rel="noopener noreferrer">
          <GraduationCap size={16} aria-hidden />
          Currículo Lattes
        </NextLink>
      </ChakraLink>
    </Box>
  )
}
import { Box, Flex, Heading, Text, Stack, Link as ChakraLink } from '@chakra-ui/react'
import NextLink from 'next/link'
import NextImage from 'next/image'
import { GraduationCap } from 'lucide-react'
import type { TeamMember } from '@/app/equipe/_data/equipe'

type TeamMemberCardProps = {
  member: TeamMember
}

const roleColorMap = {
  primary: 'primary.700',
  tertiary: 'tertiary.700',
  accent: 'accent.700',
} as const

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Box
      borderWidth="1px"
      borderColor="border"
      borderRadius="2xl"
      p={5}
      bg="surface"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      h="100%"
    >
      <Stack gap={4}>
        <Flex align="center" gap={3}>
          <Box
            position="relative"
            w="56px"
            h="56px"
            borderRadius="full"
            overflow="hidden"
            flexShrink={0}
            bg="neutral.100"
          >
            <NextImage
              src={member.photo}
              alt={member.name}
              fill
              sizes="56px"
              style={{ objectFit: 'cover' }}
            />
          </Box>

          <Box>
            <Heading as="h3" size="sm" lineHeight={1.3}>
              {member.name}
            </Heading>
            <Text
              fontSize="xs"
              fontWeight={700}
              color={roleColorMap[member.roleColor]}
              lineHeight={1.4}
              mt={0.5}
            >
              {member.role}
            </Text>
          </Box>
        </Flex>

        <Text color="muted" fontSize="sm" lineHeight={1.7}>
          {member.bio}
        </Text>
      </Stack>

      <ChakraLink
        asChild
        mt={5}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
        border="1px solid"
        borderColor="tertiary.500"
        color="tertiary.600"
        borderRadius="lg"
        px={4}
        py={2.5}
        fontSize="sm"
        fontWeight={600}
        textDecoration="none"
        transition="all 0.2s ease"
        _hover={{ bg: 'tertiary.50', textDecoration: 'none' }}
      >
        <NextLink href={member.lattesUrl}>
          <GraduationCap size={16} />
          Currículo Lattes
        </NextLink>
      </ChakraLink>
    </Box>
  )
}
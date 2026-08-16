import type { Metadata } from 'next'
import { AppShell } from '@/components/layout/AppShell'
import { Box, Heading, Separator, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { teamMembers } from '@/app/equipe/_data/equipe'
import { TeamMemberCard } from '@/app/equipe/components/TeamMemberCard'
import { TeamHero } from '@/app/equipe/components/TeamHero'
import { CollaboratorForm } from '@/app/equipe/components/CollaboratorForm'

export const metadata: Metadata = {
  title: 'Equipe',
  description:
    'Conheça os especialistas do EducaFito — a equipe dedicada a conectar ciência, tecnologia e educação fitossanitária na Amazônia.',
}

export default function EquipePage() {
  return (
    <AppShell>
      <Stack gap={{ base: 8, md: 10 }}>

        {/* ── Hero ─────────────────────────────────────────────── */}
        <TeamHero />

        {/* ── Membros da Equipe ─────────────────────────────────── */}
        <Stack gap={3}>
          <Heading
            as="h2"
            size="sm"
            color="muted"
            fontWeight={600}
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            Os Integrantes
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
            {teamMembers.map((member) => (
              <TeamMemberCard key={member.id} member={member} />
            ))}
          </SimpleGrid>
        </Stack>

        <Separator borderColor="border" />

        {/* ── Chamada de Colaboração ────────────────────────────── */}
        <Box
          borderRadius="2xl"
          bg="surface"
          borderWidth="1px"
          borderColor="border"
          px={{ base: 6, md: 10 }}
          py={{ base: 8, md: 10 }}
          textAlign="center"
        >
          <Stack gap={4} align="center" maxW="480px" mx="auto">
            <Heading as="h2" size="md" lineHeight={1.3} fontWeight={700}>
              Quer fazer parte da nossa equipe?
            </Heading>
            <Text color="muted" fontSize="sm" lineHeight={1.75}>
              O EducaFito é um projeto colaborativo e aberto. Se você é pesquisador, educador ou
              desenvolvedor apaixonado pela Amazônia, entre em contato conosco.
            </Text>

            {/* Modal interativo com o formulário */}
            <CollaboratorForm />
          </Stack>
        </Box>

      </Stack>
    </AppShell>
  )
}
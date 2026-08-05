'use client'

import { AppShell } from '@/components/layout/AppShell'
import { Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { teamMembers } from '@/app/equipe/_data/equipe'
import { TeamMemberCard } from '@/app/equipe/components/TeamMemberCard'

export default function EquipePage() {
  return (
    <AppShell title="Equipe" description="Conheça os profissionais por trás do EducaFito.">
      <Stack gap={6}>
        <Stack gap={2}>
          <Heading as="h1" size="lg" color="primary.700">
            Conheça Nossa Equipe
          </Heading>
          <Text color="muted" maxW="640px" lineHeight={1.7}>
            Especialistas dedicados a conectar ciência, tecnologia e educação para proteger as
            plantas e garantir alimentos saudáveis para todos.
          </Text>
        </Stack>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
          {teamMembers.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </SimpleGrid>
      </Stack>
    </AppShell>
  )
}
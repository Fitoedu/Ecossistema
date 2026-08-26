import type { Metadata } from 'next'
import { Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { AppShell } from '@/components/layout/AppShell'
import { games } from '@/features/jogos/data/jogos'
import { GameCard } from '@/features/jogos/components/GameCard'
import { JogosHero } from '@/features/jogos/components/JogosHero'

export const metadata: Metadata = {
  title: 'Jogos',
  description:
    'Aprenda sobre plantas medicinais e fitossanidade brincando com quiz, memória, bingo, caça-palavras, quebra-cabeça e simulador.',
}

export default function JogosPage() {
  return (
    <AppShell>
      <Stack gap={{ base: 8, md: 10 }}>
        {/* ── Hero ─────────────────────────────────────────────── */}
        <JogosHero />

        {/* ── Grade de Jogos ────────────────────────────────────── */}
        <Stack gap={3}>
          <Heading
            as="h2"
            size="sm"
            color="muted"
            fontWeight={600}
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            Escolha seu jogo
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={5}>
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </SimpleGrid>
        </Stack>
      </Stack>
    </AppShell>
  )
}
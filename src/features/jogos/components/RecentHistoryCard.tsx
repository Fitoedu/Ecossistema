import {Badge, Box, Flex, Stack, Text} from '@chakra-ui/react'
import {LuCalendarDays} from 'react-icons/lu'
import {SectionCard} from '@/components/ui/SectionCard'
import {EmptyState} from '@/components/ui/EmptyState'
import type {QuizSession} from '@/lib/types'

export function RecentHistoryCard({
    history = [],
    loading = false,
}: {
    history?: QuizSession[]
    loading?: boolean
}) {
    return (
        <SectionCard title="Histórico Recente" icon={LuCalendarDays} accentColor="#0369a1">
            <Box mt={3}>
                {history.length > 0 ? (
                    <Stack gap={2.5}>
                        {history.slice(0, 5).map((session) => (
                            <Flex
                                key={session.id}
                                align="center"
                                justify="space-between"
                                p={2.5}
                                borderRadius="lg"
                                bg="whiteAlpha.700"
                                border="1px solid"
                                borderColor="blackAlpha.50"
                            >
                                <Box>
                                    <Text fontSize="sm" fontWeight={700} color="fg" textTransform="capitalize">
                                        {session.category}
                                    </Text>
                                    <Text fontSize="xs" color="muted">
                                        {new Date(session.completed_at).toLocaleDateString('pt-BR')} • {session.correct_answers}/{session.total_questions} acertos
                                    </Text>
                                </Box>
                                <Badge colorPalette="green" variant="subtle" borderRadius="full" px={2.5} py={0.5}>
                                    +{session.score} pts
                                </Badge>
                            </Flex>
                        ))}
                    </Stack>
                ) : (
                    <EmptyState
                        emoji="📋"
                        title={loading ? "Carregando histórico..." : "Nenhum quiz realizado ainda"}
                        subtitle="Seu histórico de partidas aparecerá aqui."
                    />
                )}
            </Box>
        </SectionCard>
    )
}

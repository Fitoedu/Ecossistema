'use client'

import {Box} from '@chakra-ui/react'
import {LuCalendarDays} from 'react-icons/lu'
import {SectionCard} from '@/components/ui/SectionCard'
import {EmptyState} from '@/components/ui/EmptyState'

export function RecentHistoryCard() {
    return (
        <SectionCard title="Histórico Recente" icon={LuCalendarDays} accentColor="#0369a1">
            <Box mt={3}>
                <EmptyState
                    emoji="📋"
                    title="Nenhum quiz realizado ainda"
                    subtitle="Seu histórico de partidas aparecerá aqui."
                />
            </Box>
        </SectionCard>
    )
}

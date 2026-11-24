'use client'

import {Flex, Icon, Stack, Text} from '@chakra-ui/react'
import type {LucideIcon} from 'lucide-react'
import {ChartBar, Flame, Star, Trophy, Zap} from 'lucide-react'
import {SectionCard} from '@/components/ui/SectionCard'

function StatRow({
                     icon,
                     label,
                     value,
                 }: {
    icon: LucideIcon
    label: string
    value: string
}) {
    return (
        <Flex
            align="center"
            justify="space-between"
            py={1.5}
            borderBottom="1px solid"
            borderColor="rgba(0,0,0,0.05)"
        >
            <Flex align="center" gap={2}>
                <Icon as={icon} boxSize={3.5} color="#5c746d"/>
                <Text fontSize="sm" color="#4a6358">{label}</Text>
            </Flex>
            <Text fontSize="sm" fontWeight={700} color="#1b3327">{value}</Text>
        </Flex>
    )
}

export function StatsCard() {
    return (
        <SectionCard title="Suas Estatísticas" icon={ChartBar} accentColor="#0f6b3d">
            <Stack gap={3} mt={3}>
                <StatRow icon={Star} label="Pontuação total" value="—"/>
                <StatRow icon={Zap} label="Taxa de acerto" value="—"/>
                <StatRow icon={Flame} label="Sequência atual" value="—"/>
                <StatRow icon={Trophy} label="Melhor pontuação" value="—"/>
            </Stack>
            <Text fontSize="xs" color="#9ab0a2" mt={3} textAlign="center" fontStyle="italic">
                Faça seu primeiro quiz para ver suas estatísticas.
            </Text>
        </SectionCard>
    )
}

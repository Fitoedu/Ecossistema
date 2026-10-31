'use client'

import {Flex, Icon, Stack, Text} from '@chakra-ui/react'
import type {IconType} from 'react-icons'
import {LuChartBar, LuFlame, LuStar, LuTrophy, LuZap} from 'react-icons/lu'
import {SectionCard} from '@/components/ui/SectionCard'

function StatRow({
                     icon,
                     label,
                     value,
                 }: {
    icon: IconType
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
        <SectionCard title="Suas Estatísticas" icon={LuChartBar} accentColor="#0f6b3d">
            <Stack gap={3} mt={3}>
                <StatRow icon={LuStar} label="Pontuação total" value="—"/>
                <StatRow icon={LuZap} label="Taxa de acerto" value="—"/>
                <StatRow icon={LuFlame} label="Sequência atual" value="—"/>
                <StatRow icon={LuTrophy} label="Melhor pontuação" value="—"/>
            </Stack>
            <Text fontSize="xs" color="#9ab0a2" mt={3} textAlign="center" fontStyle="italic">
                Faça seu primeiro quiz para ver suas estatísticas.
            </Text>
        </SectionCard>
    )
}

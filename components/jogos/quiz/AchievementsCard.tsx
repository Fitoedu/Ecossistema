'use client'

import {Box, Icon, SimpleGrid, Text} from '@chakra-ui/react'
import {Lock, Trophy} from 'lucide-react'
import {SectionCard} from '@/components/ui/SectionCard'
import type {Achievement} from '@/app/jogos/quiz/_data'

function AchievementBadge({
                              achievement,
                              unlocked,
                          }: {
    achievement: Achievement
    unlocked: boolean
}) {
    return (
        <Box
            borderRadius="12px"
            border="1.5px solid"
            borderColor={unlocked ? 'rgba(15,107,61,0.2)' : 'rgba(0,0,0,0.07)'}
            bg={unlocked ? '#f5fbf6' : 'rgba(0,0,0,0.03)'}
            p={2.5}
            textAlign="center"
            position="relative"
            title={achievement.description}
            cursor="default"
        >
            <Text
                fontSize="xl"
                filter={unlocked ? 'none' : 'grayscale(1)'}
                opacity={unlocked ? 1 : 0.35}
            >
                {achievement.emoji}
            </Text>
            {!unlocked && (
                <Box position="absolute" top={1.5} right={1.5}>
                    <Icon as={Lock} boxSize={2.5} color="#9ab0a2"/>
                </Box>
            )}
            <Text
                fontSize="9px"
                fontWeight={700}
                color={unlocked ? '#0f6b3d' : '#9ab0a2'}
                mt={1}
                lineHeight={1.2}
            >
                {achievement.label}
            </Text>
        </Box>
    )
}

interface AchievementsCardProps {
    achievements: Achievement[]
    unlockedIds?: string[]
}

export function AchievementsCard({achievements, unlockedIds = []}: AchievementsCardProps) {
    return (
        <SectionCard title="Conquistas" icon={Trophy} accentColor="#d97706">
            <SimpleGrid columns={3} gap={2} mt={3}>
                {achievements.map((a) => (
                    <AchievementBadge
                        key={a.id}
                        achievement={a}
                        unlocked={unlockedIds.includes(a.id)}
                    />
                ))}
            </SimpleGrid>
            <Text fontSize="xs" color="#9ab0a2" mt={3} textAlign="center" fontStyle="italic">
                Complete quizzes para desbloquear conquistas.
            </Text>
        </SectionCard>
    )
}

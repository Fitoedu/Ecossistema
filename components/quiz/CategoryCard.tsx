'use client'

import {Badge, Box, Flex, Icon, Stack, Text} from '@chakra-ui/react'
import Link from 'next/link'
import {LuArrowRight} from 'react-icons/lu'
import type {QuizCategory} from '@/app/jogos/quiz/_data'

interface CategoryCardProps {
    category: QuizCategory
}

export function CategoryCard({category}: CategoryCardProps) {
    const inner = (
        <Box
            bg={category.gradient}
            borderRadius="16px"
            border="1.5px solid"
            borderColor={category.available ? 'transparent' : 'rgba(0,0,0,0.06)'}
            p={4}
            transition="all 0.22s ease"
            opacity={category.available ? 1 : 0.65}
            cursor={category.available ? 'pointer' : 'default'}
            _hover={
                category.available
                    ? {
                        transform: 'translateY(-3px)',
                        boxShadow: `0 14px 30px ${category.accentColor}22`,
                        borderColor: `${category.accentColor}30`,
                    }
                    : {}
            }
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                right="-4px"
                bottom="-8px"
                fontSize="56px"
                opacity={0.1}
                lineHeight={1}
                userSelect="none"
                zIndex={0}
            >
                {category.emoji}
            </Box>

            <Stack gap={2.5} position="relative" zIndex={1}>
                <Flex justify="space-between" align="center">
                    <Flex
                        w={9}
                        h={9}
                        borderRadius="10px"
                        bg={category.accentColor}
                        align="center"
                        justify="center"
                        color="white"
                        boxShadow={`0 6px 16px ${category.accentColor}40`}
                    >
                        <Icon as={category.icon} boxSize={4}/>
                    </Flex>

                    {!category.available && (
                        <Badge
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            bg="rgba(0,0,0,0.08)"
                            color="#5c746d"
                            fontSize="9px"
                            fontWeight={700}
                            textTransform="uppercase"
                            letterSpacing="0.05em"
                        >
                            Em breve
                        </Badge>
                    )}
                </Flex>

                <Stack gap={0.5}>
                    <Text fontWeight={700} fontSize="sm" color="#1b3327" lineHeight={1.2}>
                        {category.label}
                    </Text>
                    <Text fontSize="xs" color="#4a6358" lineHeight={1.55}>
                        {category.description}
                    </Text>
                </Stack>

                {category.available && (
                    <Flex align="center" gap={1} color={category.accentColor}>
                        <Text fontSize="xs" fontWeight={700}>Começar</Text>
                        <Icon as={LuArrowRight} boxSize={3}/>
                    </Flex>
                )}
            </Stack>
        </Box>
    )

    if (category.available) {
        return (
            <Link href={`/jogos/quiz/${category.id}`} style={{textDecoration: 'none'}}>
                {inner}
            </Link>
        )
    }

    return inner
}

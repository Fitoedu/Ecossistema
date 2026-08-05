'use client'

import {Badge, Box, Flex, Icon, Stack, Text} from '@chakra-ui/react'
import Link from 'next/link'
import {LuArrowRight, LuCircleHelp, LuClock} from 'react-icons/lu'
import type {FeaturedQuiz} from '@/app/jogos/quiz/_data'

interface FeaturedQuizCardProps {
    quiz: FeaturedQuiz
}

export function FeaturedQuizCard({quiz}: FeaturedQuizCardProps) {
    return (
        <Link href={quiz.href} style={{textDecoration: 'none'}}>
            <Box
                bg={quiz.gradient}
                borderRadius="18px"
                p={{base: 5, md: 6}}
                position="relative"
                overflow="hidden"
                cursor="pointer"
                transition="all 0.25s ease"
                _hover={{
                    transform: 'translateY(-3px)',
                    boxShadow: `0 20px 40px ${quiz.accentColor}30`,
                }}
            >
                <Box
                    position="absolute"
                    right="-12px"
                    bottom="-12px"
                    fontSize="100px"
                    opacity={0.15}
                    lineHeight={1}
                    userSelect="none"
                    zIndex={0}
                >
                    {quiz.emoji}
                </Box>

                <Flex
                    position="relative"
                    zIndex={1}
                    direction={{base: 'column', sm: 'row'}}
                    justify="space-between"
                    align={{base: 'flex-start', sm: 'center'}}
                    gap={4}
                >
                    <Stack gap={2}>
                        <Badge
                            px={2}
                            py={0.5}
                            borderRadius="full"
                            bg="rgba(255,255,255,0.15)"
                            color="rgba(255,255,255,0.9)"
                            fontSize="10px"
                            fontWeight={700}
                            letterSpacing="0.06em"
                            textTransform="uppercase"
                            w="fit-content"
                        >
                            ⚡ Em Destaque
                        </Badge>
                        <Text fontSize={{base: 'lg', md: 'xl'}} fontWeight={800} color="white" lineHeight={1.2}>
                            {quiz.title}
                        </Text>
                        <Text fontSize="sm" color="rgba(255,255,255,0.78)" lineHeight={1.6} maxW="360px">
                            {quiz.description}
                        </Text>

                        <Flex gap={4} mt={1} wrap="wrap">
                            <Flex align="center" gap={1.5}>
                                <Icon as={LuCircleHelp} boxSize={3.5} color="rgba(255,255,255,0.6)"/>
                                <Text fontSize="xs" color="rgba(255,255,255,0.72)" fontWeight={600}>
                                    {quiz.questionCount} questões
                                </Text>
                            </Flex>
                            <Flex align="center" gap={1.5}>
                                <Icon as={LuClock} boxSize={3.5} color="rgba(255,255,255,0.6)"/>
                                <Text fontSize="xs" color="rgba(255,255,255,0.72)" fontWeight={600}>
                                    {quiz.estimatedTime}
                                </Text>
                            </Flex>
                            <Flex align="center" gap={1.5}>
                                <Box w={2} h={2} borderRadius="full" bg={quiz.difficultyColor}/>
                                <Text fontSize="xs" color="rgba(255,255,255,0.72)" fontWeight={600}>
                                    {quiz.difficulty}
                                </Text>
                            </Flex>
                        </Flex>
                    </Stack>
                    <Flex
                        align="center"
                        gap={1.5}
                        bg="rgba(255,255,255,0.18)"
                        px={4}
                        py={2.5}
                        borderRadius="12px"
                        border="1px solid rgba(255,255,255,0.22)"
                        fontWeight={700}
                        fontSize="sm"
                        color="white"
                        shrink={0}
                        _hover={{bg: 'rgba(255,255,255,0.26)'}}
                        transition="background 0.2s"
                    >
                        Jogar agora
                        <Icon as={LuArrowRight} boxSize={4}/>
                    </Flex>
                </Flex>
            </Box>
        </Link>
    )
}

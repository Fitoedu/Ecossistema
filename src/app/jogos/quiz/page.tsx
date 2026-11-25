'use client'

import {Box, Flex, Grid, GridItem, Image, Icon, SimpleGrid, Stack, Text} from '@chakra-ui/react'
import Link from 'next/link'
import {LuInfo, LuUserRound} from 'react-icons/lu'

import {achievements, categories, featuredQuiz} from './_data'
import {WelcomeCard} from '@/features/jogos/components/WelcomeCard'
import {StatsCard} from '@/features/jogos/components/StatsCard'
import {AchievementsCard} from '@/features/jogos/components/AchievementsCard'
import {FeaturedQuizCard} from '@/features/jogos/components/FeaturedQuizCard'
import {CategoryCard} from '@/features/jogos/components/CategoryCard'
import {RecentHistoryCard} from '@/features/jogos/components/RecentHistoryCard'

import {useAuth} from '@/providers/AuthProvider'
import {useQuizHistory} from '@/features/jogos/hooks/useQuiz'

export default function QuizLobbyPage() {
    const {user} = useAuth()
    const {history, loading: historyLoading} = useQuizHistory(user?.id ?? null)

    return (
        <Box
            minH="100vh"
            bg="linear-gradient(180deg, #f7faef 0%, #f7f9f2 100%)"
            px={{base: 2, md: 3}}
            py={{base: 2, md: 3}}
            color="fg"
            fontFamily="body"
        >
            <Flex
                direction="column"
                maxW="1180px"
                mx="auto"
                minH="calc(100vh - 24px)"
                borderRadius="24px"
                overflow="hidden"
                border="1px solid"
                borderColor="rgba(15, 107, 61, 0.12)"
                bg="rgba(246, 246, 252, 0.94)"
                boxShadow="0 24px 80px rgba(15, 42, 26, 0.12)"
                backdropFilter="blur(10px)"
            >
                <Flex
                    as="header"
                    px={{base: 4, md: 6}}
                    py={3}
                    align="center"
                    justify="space-between"
                    borderBottom="1px solid"
                    borderColor="primary.100"
                    bg="rgba(250, 252, 246, 0.92)"
                >
                    <Flex align="center" gap={2}>
                        <Link href="/jogos" style={{textDecoration: 'none'}}>
                            <Flex align="center" gap={2} _hover={{opacity: 0.75}} transition="opacity 0.2s">
                                <Text fontSize="sm" color="#5c746d">Jogos</Text>
                                <Text fontSize="sm" color="#5c746d">/</Text>
                            </Flex>
                        </Link>
                        <Text fontSize="sm" fontWeight={700} color="primary.700">Quiz</Text>
                    </Flex>

                    <Flex align="center" gap={2}>
                        <Box w={7} h={7} borderRadius="full" overflow="hidden" border="1px solid"
                             borderColor="primary.200">
                            <Image src="/imgs/joaninha_corpo_todo.png" alt="Mascote" w="full" h="full"
                                   objectFit="cover"/>
                        </Box>
                        <Link href="/perfil" aria-label="Perfil" style={{textDecoration: 'none'}}>
                            <Flex w={8} h={8} align="center" justify="center" borderRadius="full" border="1px solid"
                                  borderColor="primary.200" color="primary.600" bg="whiteAlpha.700">
                                <Icon as={LuUserRound} boxSize={4}/>
                            </Flex>
                        </Link>
                        <Link href="/conteudo" aria-label="Ajuda" style={{textDecoration: 'none'}}>
                            <Flex w={8} h={8} align="center" justify="center" borderRadius="full" border="1px solid"
                                  borderColor="primary.200" color="primary.600" bg="whiteAlpha.700">
                                <Icon as={LuInfo} boxSize={4}/>
                            </Flex>
                        </Link>
                    </Flex>
                </Flex>

                <Box px={{base: 4, md: 6, lg: 7}} py={{base: 5, md: 6}} flex={1}>
                    <Stack gap={6}>
                        <WelcomeCard/>

                        <Grid templateColumns={{base: '1fr', lg: '300px 1fr'}} gap={5}>
                            <GridItem>
                                <Stack gap={5}>
                                    <StatsCard history={history}/>
                                    <AchievementsCard achievements={achievements} unlockedIds={[]}/>
                                </Stack>
                            </GridItem>

                            <GridItem>
                                <Stack gap={5}>
                                    <Box>
                                        <Text fontSize="xs" fontWeight={700} color="#5c746d" letterSpacing="0.08em"
                                              textTransform="uppercase" mb={3}>
                                            Em Destaque
                                        </Text>
                                        <FeaturedQuizCard quiz={featuredQuiz}/>
                                    </Box>

                                    <Box>
                                        <Text fontSize="xs" fontWeight={700} color="#5c746d" letterSpacing="0.08em"
                                              textTransform="uppercase" mb={3}>
                                            Categorias
                                        </Text>
                                        <SimpleGrid columns={{base: 1, sm: 2}} gap={3}>
                                            {categories.map((cat) => (
                                                <CategoryCard key={cat.id} category={cat}/>
                                            ))}
                                        </SimpleGrid>
                                    </Box>

                                    <RecentHistoryCard history={history} loading={historyLoading}/>
                                </Stack>
                            </GridItem>
                        </Grid>
                    </Stack>
                </Box>

                <Flex
                    px={{base: 4, md: 6, lg: 7}}
                    py={4}
                    align="center"
                    justify="space-between"
                    borderTop="1px solid"
                    borderColor="primary.100"
                    color="#5c746d"
                    fontSize="xs"
                    gap={3}
                    wrap="wrap"
                >
                    <Text fontWeight={700} color="primary.600">
                        © 2026 EducaFito - Educação Fitossanitária Regional.
                    </Text>
                    <Flex align="center" gap={3} wrap="wrap" justify="flex-end">
                        <Text>Parceiros institucionais</Text>
                        <Text>•</Text>
                        <Text>Termos de Uso</Text>
                        <Text>•</Text>
                        <Text>Privacidade</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
}

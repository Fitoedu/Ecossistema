'use client'

import {Box, Flex, Icon, Image, Text} from '@chakra-ui/react'
import Link from 'next/link'
import {useParams} from 'next/navigation'
import {Info, UserRound} from 'lucide-react'

import {categories, featuredQuiz} from '../_data'
import {quizQuestionsByCategory, type QuizCategoryId} from '../questions'
import {QuizGame} from '@/components/jogos/quiz/QuizGame'

export default function QuizPage() {
    const {categoria} = useParams<{categoria: string}>()
    const quizId = categoria as QuizCategoryId
    const category = categories.find(({id}) => id === categoria)
    const questions = quizQuestionsByCategory[quizId]
    const title = category?.label ?? (categoria === 'pragas-do-solo' ? featuredQuiz.title : 'Quiz')

    return (
        <Box minH="100vh" bg="linear-gradient(180deg, #f7faef 0%, #f7f9f2 100%)" px={{base: 2, md: 3}} py={{base: 2, md: 3}} color="fg" fontFamily="body">
            <Flex direction="column" maxW="860px" mx="auto" minH="calc(100vh - 24px)" borderRadius="24px" overflow="hidden" border="1px solid" borderColor="rgba(15, 107, 61, 0.12)" bg="rgba(246, 246, 252, 0.94)" boxShadow="0 24px 80px rgba(15, 42, 26, 0.12)">
                <Flex as="header" px={{base: 4, md: 6}} py={3} align="center" justify="space-between" borderBottom="1px solid" borderColor="brand.100" bg="rgba(250, 252, 246, 0.92)">
                    <Flex align="center" gap={2}>
                        <Link href="/jogos" style={{textDecoration: 'none'}}><Text fontSize="sm" color="#5c746d">Jogos</Text></Link>
                        <Text fontSize="sm" color="#5c746d">/</Text>
                        <Link href="/jogos/quiz" style={{textDecoration: 'none'}}><Text fontSize="sm" color="#5c746d">Quiz</Text></Link>
                        <Text fontSize="sm" color="#5c746d">/</Text>
                        <Text fontSize="sm" fontWeight={700} color="brand.700">{title}</Text>
                    </Flex>
                    <Flex align="center" gap={2}>
                        <Box w={7} h={7} borderRadius="full" overflow="hidden" border="1px solid" borderColor="brand.200"><Image src="/imgs/joaninha_corpo_todo.png" alt="Mascote" w="full" h="full" objectFit="cover"/></Box>
                        <Link href="/perfil" aria-label="Perfil"><Flex w={8} h={8} align="center" justify="center" borderRadius="full" border="1px solid" borderColor="brand.200" color="brand.600"><Icon as={UserRound} boxSize={4}/></Flex></Link>
                        <Link href="/conteudo" aria-label="Ajuda"><Flex w={8} h={8} align="center" justify="center" borderRadius="full" border="1px solid" borderColor="brand.200" color="brand.600"><Icon as={Info} boxSize={4}/></Flex></Link>
                    </Flex>
                </Flex>
                <Box flex={1} px={{base: 4, md: 7}} py={{base: 5, md: 7}}>
                    <QuizGame title={title} questions={questions}/>
                </Box>
            </Flex>
        </Box>
    )
}

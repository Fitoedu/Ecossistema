'use client'

import {useState} from 'react'
import {Box, Button, Flex, Icon, Progress, Stack, Text} from '@chakra-ui/react'
import Link from 'next/link'
import {ArrowLeft, Check, RotateCcw, Sprout} from 'lucide-react'

import type {QuizQuestion} from '@/app/jogos/quiz/questions'

interface QuizGameProps {
    title: string
    questions: QuizQuestion[]
}

export function QuizGame({title, questions}: QuizGameProps) {
    const totalQuestions = questions.length
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answers, setAnswers] = useState<(string | null)[]>(() => Array(totalQuestions).fill(null))
    const [finished, setFinished] = useState(false)

    const question = questions[currentQuestion]
    const selectedAnswer = answers[currentQuestion]
    const answeredCount = answers.filter(Boolean).length
    const score = answers.reduce((total, answer, index) => (
        answer === questions[index].correctId ? total + 1 : total
    ), 0)
    const percentage = Math.round((score / totalQuestions) * 100)

    const selectAnswer = (optionId: string) => {
        setAnswers((previousAnswers) => {
            const nextAnswers = [...previousAnswers]
            nextAnswers[currentQuestion] = optionId
            return nextAnswers
        })

        if (currentQuestion < totalQuestions - 1) {
            setCurrentQuestion((index) => index + 1)
        }
    }

    const restart = () => {
        setCurrentQuestion(0)
        setAnswers(Array(totalQuestions).fill(null))
        setFinished(false)
    }

    if (finished) {
        return (
            <Stack align="center" textAlign="center" gap={5} py={{base: 6, md: 10}}>
                <Flex w={20} h={20} borderRadius="full" bg="#e6f9ee" color="brand.700" align="center" justify="center">
                    <Icon as={Check} boxSize={10}/>
                </Flex>
                <Stack gap={1}>
                    <Text fontSize={{base: '2xl', md: '3xl'}} fontWeight={800} color="#1b3327">
                        Missão cumprida
                    </Text>
                    <Text color="#5c746d">Você concluiu o quiz {title}.</Text>
                </Stack>
                <Box bg="white" border="1px solid" borderColor="brand.100" borderRadius="20px" px={8} py={6} minW="min(100%, 280px)">
                    <Text fontSize="3xl" fontWeight={800} color="brand.700">{score}/{totalQuestions}</Text>
                    <Text fontSize="sm" fontWeight={700} color="#4a6358">acertos</Text>
                    <Text mt={3} fontSize="lg" fontWeight={800} color="#1b3327">{percentage}% de desempenho</Text>
                </Box>
                <Flex direction={{base: 'column', sm: 'row'}} gap={3} w={{base: 'full', sm: 'auto'}}>
                    <Button onClick={restart} colorPalette="green" variant="outline" borderRadius="12px" px={5}>
                        <Icon as={RotateCcw} mr={2}/>
                        Tentar novamente
                    </Button>
                    <Button asChild colorPalette="green" borderRadius="12px" px={5}>
                        <Link href="/jogos/quiz">
                            <Icon as={Sprout} mr={2}/>
                            Aprender mais sobre as pragas
                        </Link>
                    </Button>
                </Flex>
            </Stack>
        )
    }

    return (
        <Stack gap={5}>
            <Stack gap={2}>
                <Flex justify="space-between" gap={3} align="center">
                    <Text fontSize="sm" fontWeight={700} color="brand.700">Pergunta {currentQuestion + 1} de {totalQuestions}</Text>
                    <Text fontSize="xs" color="#5c746d">{answeredCount}/{totalQuestions} respondidas</Text>
                </Flex>
                <Progress.Root value={(answeredCount / totalQuestions) * 100} size="sm">
                    <Progress.Track borderRadius="full" bg="brand.100">
                        <Progress.Range bg="brand.600" borderRadius="full"/>
                    </Progress.Track>
                </Progress.Root>
            </Stack>

            <Box bg="white" border="1px solid" borderColor="brand.100" borderRadius={{base: '16px', md: '20px'}} p={{base: 5, md: 7}} boxShadow="0 12px 28px rgba(15, 42, 26, 0.08)">
                <Text fontSize="xs" fontWeight={700} color="#5c746d" textTransform="uppercase" letterSpacing="0.08em" mb={2}>
                    {title}
                </Text>
                <Text fontSize={{base: 'lg', md: 'xl'}} fontWeight={800} color="#1b3327" lineHeight={1.4} mb={6}>
                    {question.text}
                </Text>
                <Stack gap={3}>
                    {question.options.map((option, index) => {
                        const isSelected = selectedAnswer === option.id
                        return (
                            <Button
                                key={option.id}
                                onClick={() => selectAnswer(option.id)}
                                aria-pressed={isSelected}
                                justifyContent="flex-start"
                                h="auto"
                                minH="58px"
                                whiteSpace="normal"
                                textAlign="left"
                                px={4}
                                py={3}
                                borderRadius="12px"
                                border="1.5px solid"
                                borderColor={isSelected ? 'brand.600' : 'brand.100'}
                                bg={isSelected ? '#e6f9ee' : '#fbfdf9'}
                                color="#1b3327"
                                _hover={{borderColor: 'brand.500', bg: '#f1faf3'}}
                            >
                                <Flex w={7} h={7} mr={3} shrink={0} borderRadius="full" bg={isSelected ? 'brand.600' : 'brand.100'} color={isSelected ? 'white' : 'brand.700'} align="center" justify="center" fontSize="xs" fontWeight={800}>
                                    {String.fromCharCode(65 + index)}
                                </Flex>
                                {option.text}
                            </Button>
                        )
                    })}
                </Stack>
            </Box>

            <Flex justify="space-between" gap={3} wrap="wrap">
                <Button
                    onClick={() => setCurrentQuestion((index) => index - 1)}
                    disabled={currentQuestion === 0}
                    variant="ghost"
                    color="brand.700"
                >
                    <Icon as={ArrowLeft} mr={2}/>
                    Voltar
                </Button>
                {currentQuestion === totalQuestions - 1 && (
                    <Button
                        onClick={() => setFinished(true)}
                        disabled={answeredCount !== totalQuestions}
                        colorPalette="green"
                        borderRadius="12px"
                    >
                        Finalizar quiz
                    </Button>
                )}
            </Flex>
        </Stack>
    )
}

'use client'

import {Box, Flex, Icon, Stack, Text} from '@chakra-ui/react'
import type {IconType} from 'react-icons'
import {LuCircleHelp, LuRefreshCw, LuZap} from 'react-icons/lu'

function QuickAccessButton({
                               icon,
                               label,
                               disabled,
                           }: {
    icon: IconType
    label: string
    disabled?: boolean
}) {
    return (
        <Flex
            align="center"
            gap={2}
            bg={disabled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.2)'}
            border="1px solid"
            borderColor="rgba(255,255,255,0.18)"
            borderRadius="10px"
            px={3}
            py={2}
            cursor={disabled ? 'not-allowed' : 'pointer'}
            opacity={disabled ? 0.55 : 1}
            transition="all 0.2s"
            _hover={disabled ? {} : {bg: 'rgba(255,255,255,0.28)'}}
        >
            <Icon as={icon} boxSize={3.5} color="white"/>
            <Text fontSize="xs" fontWeight={600} color="white" whiteSpace="nowrap">
                {label}
            </Text>
        </Flex>
    )
}

export function WelcomeCard() {
    return (
        <Box
            bg="linear-gradient(135deg, #0f6b3d 0%, #1a8a50 60%, #f4b000 100%)"
            borderRadius="20px"
            p={{base: 5, md: 6}}
            position="relative"
            overflow="hidden"
        >
            <Box
                position="absolute"
                inset={0}
                bg="radial-gradient(circle at 90% 10%, rgba(255,255,255,0.1), transparent 40%), radial-gradient(circle at 10% 90%, rgba(244,176,0,0.15), transparent 35%)"
                zIndex={0}
            />
            <Box
                position="absolute"
                right={{base: '-10px', md: '24px'}}
                top="50%"
                transform="translateY(-50%)"
                fontSize={{base: '90px', md: '120px'}}
                opacity={0.12}
                zIndex={0}
                userSelect="none"
                lineHeight={1}
            >
                🧠
            </Box>

            <Flex
                position="relative"
                zIndex={1}
                direction={{base: 'column', sm: 'row'}}
                align={{base: 'flex-start', sm: 'center'}}
                justify="space-between"
                gap={4}
            >
                <Stack gap={1.5}>
                    <Flex align="center" gap={2}>
                        <Box fontSize="20px">👋</Box>
                        <Text
                            fontSize="xs"
                            fontWeight={700}
                            color="rgba(255,255,255,0.72)"
                            letterSpacing="0.08em"
                            textTransform="uppercase"
                        >
                            Bem-vindo de volta
                        </Text>
                    </Flex>
                    <Text fontSize={{base: 'xl', md: '2xl'}} fontWeight={800} color="white" lineHeight={1.2}>
                        Olá, Cientista!
                    </Text>
                    <Text color="rgba(255,255,255,0.82)" fontSize="sm" lineHeight={1.65} maxW="420px">
                        Pronto para mais uma descoberta hoje? Escolha uma categoria e teste seus conhecimentos.
                    </Text>
                </Stack>

                <Flex gap={2} shrink={0} wrap="wrap">
                    <QuickAccessButton icon={LuZap} label="Desafio do Dia" disabled/>
                    <QuickAccessButton icon={LuRefreshCw} label="Repetir último" disabled/>
                    <QuickAccessButton icon={LuCircleHelp} label="Como jogar" disabled/>
                </Flex>
            </Flex>
        </Box>
    )
}

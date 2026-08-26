import {Flex, Text} from '@chakra-ui/react'

interface EmptyStateProps {
    emoji: string
    title: string
    subtitle?: string
}

export function EmptyState({emoji, title, subtitle}: EmptyStateProps) {
    return (
        <Flex direction="column" align="center" py={8} gap={2}>
            <Text fontSize="3xl">{emoji}</Text>
            <Text fontWeight={700} fontSize="sm" color="#1b3327">
                {title}
            </Text>
            {subtitle && (
                <Text fontSize="xs" color="#5c746d" textAlign="center" maxW="240px" lineHeight={1.6}>
                    {subtitle}
                </Text>
            )}
        </Flex>
    )
}

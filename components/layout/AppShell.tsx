import { Box, Flex, Heading, Stack, Text } from '@chakra-ui/react'
import { Sidebar, MOBILE_NAV_HEIGHT } from './Sidebar'

interface AppShellProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <Box minH="100vh" bg="bg" color="fg">
      <Flex minH="100vh">
        <Box
          w={{ base: 0, md: '280px' }}
          flexShrink={0}
          p={{ base: 0, md: 4 }}
        >
          <Sidebar />
        </Box>

        <Box flex={1} minW={0}>
          <Box
            px={{ base: 6, md: 8, lg: 10 }}
            py={{ base: 6, md: 8 }}
            pb={{ base: MOBILE_NAV_HEIGHT, md: 8 }}
          >
            {(title || description) && (
              <Stack as="header" gap={2} mb={6}>
                {title && (
                  <Heading as="h1" size="lg" lineHeight={1.2}>
                    {title}
                  </Heading>
                )}
                {description && (
                  <Text color="muted" fontSize="sm" maxW="70ch">
                    {description}
                  </Text>
                )}
              </Stack>
            )}
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
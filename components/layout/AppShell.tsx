import { Box, Flex } from '@chakra-ui/react'
import { Sidebar, MOBILE_NAV_HEIGHT } from './Sidebar'

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <Box minH="100vh" bg="bg" color="fg">
      <Flex minH="100vh">
        <Box
          w={{ base: 0, md: '280px' }}
          flexShrink={0}
          p={{ base: 0, md: 4 }}
          position={{ base: 'static', md: 'sticky' }}
          top={{ md: 0 }}
          h={{ md: '100vh' }}
          alignSelf={{ md: 'flex-start' }}
        >
          <Sidebar />
        </Box>

        <Box flex={1} minW={0}>
          <Box
            px={{ base: 6, md: 8, lg: 10 }}
            py={{ base: 6, md: 8 }}
            pb={{ base: MOBILE_NAV_HEIGHT, md: 8 }}
          >
            {children}
          </Box>
        </Box>
      </Flex>
    </Box>
  )
}
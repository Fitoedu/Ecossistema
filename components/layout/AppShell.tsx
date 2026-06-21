'use client'

import { Box, Flex } from '@chakra-ui/react'
import { BottomNav } from './BottomNav'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'

interface AppShellProps {
  title: string
  description?: string
  children: React.ReactNode
}

export function AppShell({ title, description, children }: AppShellProps) {
  return (
    <Box minH="100vh" bg="bg" color="fg">
      <Flex minH="100vh">
        <Box display={{ base: 'none', lg: 'block' }}>
          <Sidebar />
        </Box>

        <Box flex={1} pb={{ base: 24, lg: 10 }}>
          <TopBar title={title} description={description} />
          <Box px={{ base: 6, md: 8, lg: 10 }} py={{ base: 6, md: 8 }}>
            {children}
          </Box>
        </Box>
      </Flex>

      <Box display={{ base: 'block', lg: 'none' }}>
        <BottomNav />
      </Box>
    </Box>
  )
}

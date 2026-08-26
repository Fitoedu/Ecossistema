'use client'

import { Box, Flex, Heading, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { Activity, BookOpen, Image, MessageSquare, Users } from 'lucide-react'
import Link from 'next/link'
import { AppShell } from '@/components/layout/AppShell'

const adminCards = [
  {
    href: '/admin/educacao',
    icon: BookOpen,
    label: 'Educação',
    description: 'Gerenciar tópicos e aulas do módulo educativo.',
    color: '#2E7D32',
    bg: '#e8f5e9',
  },
  {
    href: '/admin/quiz',
    icon: MessageSquare,
    label: 'Quiz',
    description: 'Criar, editar e excluir perguntas e alternativas.',
    color: '#1565C0',
    bg: '#e3f2fd',
  },
  {
    href: '/admin/midia',
    icon: Image,
    label: 'Mídia',
    description: 'Gerenciar publicações e vídeos da seção de mídia.',
    color: '#E65100',
    bg: '#fff3e0',
  },
  {
    href: '/admin/logs',
    icon: Activity,
    label: 'Logs & Auditoria',
    description: 'Auditoria de eventos, ações de usuários e monitoramento de erros.',
    color: '#6A1B9A',
    bg: '#f3e5f5',
  },
]

export default function AdminPage() {
  return (
    <AppShell>
      <Stack gap={8}>
        <Box
          borderRadius="2xl"
          bg="linear-gradient(135deg, var(--chakra-colors-primary-800) 0%, var(--chakra-colors-primary-600) 100%)"
          px={{ base: 5, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <Flex align="center" gap={3} mb={2}>
            <Users size={20} color="white" />
            <Heading as="h1" fontSize={{ base: 'xl', md: '2xl' }} fontWeight={800} color="white">
              Painel Admin
            </Heading>
          </Flex>
          <Text color="rgba(255,255,255,0.8)" fontSize="sm">
            Gerencie o conteúdo e audite os eventos da plataforma EducaFito.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={5}>
          {adminCards.map(({ href, icon: Icon, label, description, color, bg }) => (
            <Link key={href} href={href} style={{ textDecoration: 'none' }}>
              <Box
                borderRadius="xl"
                border="1.5px solid"
                borderColor="primary.100"
                bg="surface"
                p={6}
                _hover={{ boxShadow: '0 4px 20px rgba(0,0,0,0.10)', transform: 'translateY(-2px)' }}
                transition="all 0.2s"
                cursor="pointer"
              >
                <Flex
                  w={10}
                  h={10}
                  borderRadius="lg"
                  bg={bg}
                  align="center"
                  justify="center"
                  mb={4}
                >
                  <Icon size={20} color={color} />
                </Flex>
                <Heading as="h2" fontSize="md" fontWeight={700} color="fg" mb={1}>
                  {label}
                </Heading>
                <Text fontSize="sm" color="muted">
                  {description}
                </Text>
              </Box>
            </Link>
          ))}
        </SimpleGrid>
      </Stack>
    </AppShell>
  )
}

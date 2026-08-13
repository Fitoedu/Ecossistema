'use client'

import { useState } from 'react'
import {
  Box,
  Badge,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from '@chakra-ui/react'
import {
  BookOpen,
  Bug,
  FlaskConical,
  GraduationCap,
  LayoutGrid,
  Leaf,
  Microscope,
  Sprout,
  TreeDeciduous,
  Trophy,
} from 'lucide-react'
import { AppShell } from '@/components/layout/AppShell'
import { TopicCard } from './components/TopicCard'
import { StatsBar } from './components/StatsBar'
import type { Topic } from './components/TopicCard'

// ── Dados dos temas ──────────────────────────────────────────────────────────

const temas: Topic[] = [
  {
    title: 'Fitopatologia Básica',
    description:
      'Entenda as principais doenças de plantas, seus agentes causadores, sintomas e como identificar corretamente cada tipo de infecção.',
    level: 'Básico',
    category: 'Fitopatologia',
    icon: Microscope,
    color: '#2E7D32',
    duration: '45 min',
    lessons: 8,
    progress: 100,
  },
  {
    title: 'Doenças Fúngicas em Culturas',
    description:
      'Aprofunde-se nos fungos fitopatogênicos mais comuns, seu ciclo de vida e as estratégias de manejo integrado mais eficazes.',
    level: 'Intermediário',
    category: 'Fitopatologia',
    icon: FlaskConical,
    color: '#1565C0',
    duration: '1h 10min',
    lessons: 12,
    progress: 60,
  },
  {
    title: 'Viroses e Bacterioses',
    description:
      'Conheça as principais viroses e bacterioses que afetam culturas regionais, vetores envolvidos e controle preventivo.',
    level: 'Avançado',
    category: 'Fitopatologia',
    icon: Bug,
    color: '#C62828',
    duration: '1h 30min',
    lessons: 15,
    progress: 20,
  },
  {
    title: 'Entomologia Agrícola',
    description:
      'Conheça os principais insetos-praga das culturas, seu comportamento, formas de identificação e estratégias de prevenção.',
    level: 'Básico',
    category: 'Entomologia',
    icon: Bug,
    color: '#E65100',
    duration: '50 min',
    lessons: 10,
    progress: 80,
  },
  {
    title: 'Controle Biológico de Pragas',
    description:
      'Explore as técnicas de controle biológico, organismos benéficos e como integrá-los ao manejo sustentável da lavoura.',
    level: 'Intermediário',
    category: 'Entomologia',
    icon: Leaf,
    color: '#558B2F',
    duration: '55 min',
    lessons: 9,
    progress: 0,
  },
  {
    title: 'Plantas Medicinais',
    description:
      'Explore usos terapêuticos, propriedades farmacológicas e cultivo de plantas medicinais de forma segura e contextualizada.',
    level: 'Básico',
    category: 'Plantas',
    icon: Sprout,
    color: '#00695C',
    duration: '40 min',
    lessons: 7,
    progress: 45,
  },
  {
    title: 'Agroecologia e Sustentabilidade',
    description:
      'Compreenda os princípios da agroecologia, boas práticas agrícolas e como promover a biodiversidade nos sistemas produtivos.',
    level: 'Intermediário',
    category: 'Plantas',
    icon: TreeDeciduous,
    color: '#2E7D32',
    duration: '1h 05min',
    lessons: 11,
    progress: 0,
  },
  {
    title: 'Fitossanidade e Legislação',
    description:
      'Conheça a legislação fitossanitária brasileira, normas de quarentena e o papel dos órgãos reguladores no controle de pragas.',
    level: 'Avançado',
    category: 'Fitopatologia',
    icon: BookOpen,
    color: '#4527A0',
    duration: '1h 20min',
    lessons: 14,
    progress: 0,
  },
]

// ── Tabs ─────────────────────────────────────────────────────────────────────

const tabs = [
  { value: 'todos', label: 'Todos', icon: LayoutGrid },
  { value: 'Fitopatologia', label: 'Fitopatologia', icon: Microscope },
  { value: 'Entomologia', label: 'Entomologia', icon: Bug },
  { value: 'Plantas', label: 'Plantas', icon: Leaf },
]

// ── Estatísticas ──────────────────────────────────────────────────────────────

const statsData = [
  {
    label: 'Módulos',
    value: temas.length,
    icon: BookOpen,
    color: '#2E7D32',
  },
  {
    label: 'Concluídos',
    value: temas.filter((t) => t.progress === 100).length,
    icon: Trophy,
    color: '#FBC02D',
  },
  {
    label: 'Em progresso',
    value: temas.filter((t) => t.progress > 0 && t.progress < 100).length,
    icon: GraduationCap,
    color: '#1565C0',
  },
  {
    label: 'Categorias',
    value: [...new Set(temas.map((t) => t.category))].length,
    icon: LayoutGrid,
    color: '#E65100',
  },
]

// ── Página ────────────────────────────────────────────────────────────────────

export default function ConteudoPage() {
  const [activeTab, setActiveTab] = useState('todos')

  const filtered =
    activeTab === 'todos'
      ? temas
      : temas.filter((t) => t.category === activeTab)

  const featured = temas.find((t) => t.progress > 0 && t.progress < 100) ?? temas[0]

  return (
    <AppShell>
      <Stack gap={8}>
        {/* ── Hero ─────────────────────────────────────────── */}
        <Box
          position="relative"
          overflow="hidden"
          borderRadius="2xl"
          bg="linear-gradient(135deg, var(--chakra-colors-primary-800) 0%, var(--chakra-colors-primary-600) 60%, var(--chakra-colors-primary-400) 100%)"
          px={{ base: 5, md: 8 }}
          py={{ base: 6, md: 8 }}
          boxShadow="0 8px 40px rgba(15,42,26,0.18)"
        >
          {/* Glow decorativo */}
          <Box
            position="absolute"
            top="-40px"
            right="-40px"
            w="200px"
            h="200px"
            borderRadius="full"
            bg="rgba(255,255,255,0.06)"
            pointerEvents="none"
          />
          <Box
            position="absolute"
            bottom="-20px"
            left="30%"
            w="140px"
            h="140px"
            borderRadius="full"
            bg="rgba(255,255,255,0.04)"
            pointerEvents="none"
          />

          <Flex align="center" gap={3} mb={3}>
            <Flex
              w={10}
              h={10}
              borderRadius="xl"
              bg="rgba(255,255,255,0.15)"
              align="center"
              justify="center"
              color="white"
              flexShrink={0}
            >
              <Box as={GraduationCap} size={20} strokeWidth={2} aria-hidden />
            </Flex>
            <Badge
              colorPalette="yellow"
              variant="subtle"
              borderRadius="full"
              px={3}
              py={0.5}
              fontSize="xs"
              fontWeight={600}
            >
              Módulo Educativo
            </Badge>
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '3xl' }}
            fontWeight={800}
            color="white"
            lineHeight={1.15}
            mb={2}
          >
            Conteúdo Educacional
          </Heading>
          <Text
            color="rgba(255,255,255,0.82)"
            fontSize={{ base: 'sm', md: 'md' }}
            maxW="520px"
            lineHeight={1.65}
          >
            Explore os temas organizados por categoria, acompanhe seu progresso
            e aprofunde seus conhecimentos em fitossanidade.
          </Text>
        </Box>

        {/* ── Stats ────────────────────────────────────────── */}
        <StatsBar stats={statsData} />

        {/* ── Destaque ─────────────────────────────────────── */}
        <Box>
          <Flex align="center" gap={2} mb={4}>
            <Box as={Trophy} size={16} color="var(--chakra-colors-accent-500)" strokeWidth={2.5} aria-hidden />
            <Heading as="h2" fontSize="sm" fontWeight={700} color="muted" textTransform="uppercase" letterSpacing="wide">
              Continue de onde parou
            </Heading>
          </Flex>

          <Box
            bg="linear-gradient(135deg, var(--chakra-colors-primary-50) 0%, var(--chakra-colors-surface) 100%)"
            borderRadius="2xl"
            border="2px solid"
            borderColor="primary.200"
            overflow="hidden"
            boxShadow="0 4px 24px rgba(15,42,26,0.10)"
          >
            <TopicCard topic={featured} featured index={0} />
          </Box>
        </Box>

        {/* ── Tabs + Grid ───────────────────────────────────── */}
        <Box>
          <Heading as="h2" fontSize="lg" fontWeight={700} color="fg" mb={5}>
            Todos os módulos
          </Heading>

          <Tabs.Root
            defaultValue="todos"
            value={activeTab}
            onValueChange={(d) => setActiveTab(d.value)}
            variant="enclosed"
            colorPalette="green"
          >
            <Tabs.List
              bg="surface"
              borderRadius="xl"
              border="1.5px solid"
              borderColor="primary.100"
              p={1}
              mb={6}
              overflowX="auto"
              flexWrap="nowrap"
            >
              {tabs.map(({ value, label, icon: Icon }) => (
                <Tabs.Trigger
                  key={value}
                  value={value}
                  borderRadius="lg"
                  fontWeight={600}
                  fontSize="sm"
                  px={4}
                  py={2}
                  gap={1.5}
                  _selected={{
                    bg: 'primary.500',
                    color: 'white',
                    boxShadow: '0 2px 8px rgba(46,125,50,0.25)',
                  }}
                  color="muted"
                  flexShrink={0}
                  transition="all 0.2s ease"
                >
                  <Box as={Icon} size={14} strokeWidth={2} aria-hidden />
                  {label}
                  <Badge
                    colorPalette={activeTab === value ? 'yellow' : 'gray'}
                    variant="subtle"
                    borderRadius="full"
                    fontSize="xs"
                    px={1.5}
                    py={0}
                    ml={0.5}
                  >
                    {value === 'todos'
                      ? temas.length
                      : temas.filter((t) => t.category === value).length}
                  </Badge>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            {/* Conteúdo das Tabs (conteúdo único controlado por estado) */}
            <Tabs.Content value={activeTab}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
                {filtered.map((tema, i) => (
                  <TopicCard key={tema.title} topic={tema} index={i} />
                ))}
              </SimpleGrid>
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Stack>
    </AppShell>
  )
}

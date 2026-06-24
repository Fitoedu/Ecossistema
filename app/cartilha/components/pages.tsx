'use client'

import { Box, Grid, HStack, Text, VStack, SimpleGrid } from '@chakra-ui/react'
import LiftTheFlap from './LiftTheFlap'
import Quiz from './Quiz'
import type {
  PageCoverData,
  PageContentData,
  PageLapbookData,
  PageImpactData,
  PageAlertData,
  PageOrgaosData,
  PageCaseData,
  PageChainData,
  PageQuizData,
  PageClosingData,
  CalloutData,
} from '../data/cartilha-data'

/* ══════════════════════════════════════════════════════
   SHARED PRESENTATIONAL ATOMS
   Nenhum dado embutido — puramente visuais.
══════════════════════════════════════════════════════ */

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="inline-flex" alignItems="center" gap="6px"
      bg="#2E7D32" color="white"
      fontSize="0.7rem" fontWeight="700"
      px="14px" py="5px"
      borderRadius="999px" letterSpacing="0.06em"
      textTransform="uppercase" mb={4}
    >
      {children}
    </Box>
  )
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="h1"
      fontSize="clamp(1.6rem, 4vw, 2.2rem)"
      fontWeight="800" color="#1B5E20"
      lineHeight="1.2" mb={2} letterSpacing="-0.01em"
    >
      {children}
    </Text>
  )
}

function Highlight({ children }: { children: React.ReactNode }) {
  return <Text as="span" color="#F57F17">{children}</Text>
}

function LeadText({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="1rem" color="gray.700" lineHeight="1.75" mb={6}>
      {children}
    </Text>
  )
}

/** Callout exportado — usado também em page.tsx se necessário */
export function Callout({
  variant = 'green', icon, title, children, mt,
}: {
  variant?: CalloutData['variant']
  icon: string
  title: string
  children: React.ReactNode
  mt?: number | string
}) {
  const styles = {
    green:  { bg: '#E8F5E9', border: 'rgba(46,125,50,0.2)',  titleColor: '#1B5E20' },
    yellow: { bg: '#FFF9C4', border: 'rgba(251,192,45,0.4)', titleColor: '#F57F17' },
    red:    { bg: '#FFEBEE', border: 'rgba(198,40,40,0.2)',  titleColor: '#C62828' },
  }
  const s = styles[variant]
  return (
    <HStack
      bg={s.bg} border={`1px solid ${s.border}`}
      borderRadius="16px" p="20px 24px" mt={mt}
      align="flex-start" gap={4}
    >
      <Text fontSize="28px" flexShrink={0} lineHeight="1" mt="2px">{icon}</Text>
      <Box>
        <Text display="block" fontSize="0.95rem" fontWeight="700" mb={1} color={s.titleColor}>{title}</Text>
        <Text fontSize="0.9rem" lineHeight="1.65" color="#212121">{children}</Text>
      </Box>
    </HStack>
  )
}

function Divider() {
  return (
    <Box
      h="1px"
      bg="linear-gradient(90deg, transparent, rgba(46,125,50,0.2), transparent)"
      my={6}
    />
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="0.7rem" textTransform="uppercase" letterSpacing="0.1em"
      fontWeight="700" color="#2E7D32" mb={3}>
      {children}
    </Text>
  )
}

/** Grid reutilizável de icon-cards */
function IconCardsGrid({ cards }: { cards: { emoji: string; label: string }[] }) {
  const cols = Math.min(cards.length, 4)
  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', md: `repeat(${cols}, 1fr)` }}
      gap={4} my={6}
    >
      {cards.map(({ emoji, label }) => (
        <Box
          key={label}
          bg="white" border="1px solid rgba(46,125,50,0.14)"
          borderRadius="16px" p="20px 12px"
          textAlign="center" display="flex" flexDir="column"
          alignItems="center" gap={2} cursor="default"
          _hover={{ transform: 'translateY(-4px)', boxShadow: '0 4px 24px rgba(46,125,50,0.12)', borderColor: '#66BB6A' }}
          transition="all 0.25s ease"
        >
          <Text fontSize="36px" lineHeight="1">{emoji}</Text>
          <Text fontSize="0.75rem" fontWeight="600" color="#2E7D32" lineHeight="1.3" textAlign="center">{label}</Text>
        </Box>
      ))}
    </Grid>
  )
}

/** Renderiza uma lista de callouts com espaçamento correto */
function CalloutList({ callouts, startMt = 0 }: { callouts: CalloutData[]; startMt?: number }) {
  return (
    <>
      {callouts.map((c, i) => (
        <Callout key={i} variant={c.variant} icon={c.icon} title={c.title} mt={i === 0 ? startMt : 4}>
          {c.text}
        </Callout>
      ))}
    </>
  )
}

/** Header verde escuro dos Lapbooks */
function LapbookHeader({ badge, title, subtitle }: { badge: string; title: string; subtitle: string }) {
  return (
    <Box
      bg="linear-gradient(135deg, #1B5E20, #2E7D32)"
      borderRadius="20px" p="28px 24px"
      color="white" mb={6}
      position="relative" overflow="hidden"
    >
      <Box position="absolute" w="180px" h="180px" borderRadius="50%"
        bg="rgba(255,255,255,0.05)" bottom="-60px" right="-40px" aria-hidden="true" />
      <Box
        display="inline-flex" alignItems="center" gap="6px"
        fontSize="0.68rem" textTransform="uppercase" letterSpacing="0.1em"
        fontWeight="700" bg="rgba(255,255,255,0.2)"
        px="14px" py="4px" borderRadius="999px" mb={3}
      >
        {badge}
      </Box>
      <Text as="h1" fontSize="clamp(1.3rem, 3.5vw, 1.9rem)" fontWeight="900"
        lineHeight="1.2" mb={1} letterSpacing="-0.02em">
        {title}
      </Text>
      <Text fontSize="0.85rem" opacity={0.85} lineHeight="1.65">{subtitle}</Text>
    </Box>
  )
}

/* ══════════════════════════════════════════════════════
   LAYOUT COMPONENTS
   Cada um é tipado pelo seu discriminante exclusivo.
   Nenhuma string de conteúdo aqui — tudo vem de `data`.
══════════════════════════════════════════════════════ */

/* ── Capa ──────────────────────────────────────────── */
export function PageCover({ data }: { data: PageCoverData }) {
  const titleLines = data.title.split('\n')

  return (
    <VStack gap={0} textAlign="center" py={2} pb={6}>
      <Box
        display="inline-flex" alignItems="center" gap="6px"
        bg="#E8F5E9" color="#1B5E20"
        fontSize="0.75rem" fontWeight="700"
        px="16px" py="6px" borderRadius="999px"
        letterSpacing="0.06em" textTransform="uppercase"
        border="1px solid rgba(46,125,50,0.2)" mb={6}
      >
        📚 Cartilha Educativa — EducaFito
      </Box>

      {/* Ilustração split */}
      <Box w="full" maxW="480px" mx="auto" mb={8} borderRadius="24px"
        overflow="hidden" boxShadow="0 4px 24px rgba(46,125,50,0.12)" position="relative">
        <Grid templateColumns="1fr 1fr" minH="260px">
          <Box bg="linear-gradient(135deg, #C8E6C9, #A5D6A7)" p="32px 20px"
            display="flex" flexDir="column" alignItems="center" justifyContent="center" gap={2}>
            <Text fontSize="52px" style={{ animation: 'floatIcon 3s ease-in-out infinite' }}>🌿</Text>
            <Text fontSize="0.75rem" fontWeight="700" textTransform="uppercase"
              letterSpacing="0.08em" color="#1B5E20">Planta Saudável</Text>
          </Box>
          <Box bg="linear-gradient(135deg, #FFCDD2, #EF9A9A)" p="32px 20px"
            display="flex" flexDir="column" alignItems="center" justifyContent="center" gap={2}>
            <Text fontSize="52px" style={{ animation: 'floatIcon 3s ease-in-out infinite', animationDelay: '-1.5s' }}>🍂</Text>
            <Text fontSize="0.75rem" fontWeight="700" textTransform="uppercase"
              letterSpacing="0.08em" color="#C62828">Planta Doente</Text>
          </Box>
        </Grid>
        <Box position="absolute" left="50%" top="50%" transform="translate(-50%,-50%)"
          bg="white" borderRadius="50%" w="40px" h="40px"
          display="flex" alignItems="center" justifyContent="center"
          fontSize="12px" fontWeight="800"
          boxShadow="0 2px 12px rgba(0,0,0,0.15)" zIndex={2} aria-hidden="true">
          VS
        </Box>
      </Box>

      {/* Título com highlight */}
      <Text as="h1" fontSize="clamp(2rem, 5vw, 3rem)" fontWeight="900"
        lineHeight="1.1" color="#1B5E20" mb={3} letterSpacing="-0.02em">
        {titleLines.map((line, i) => (
          <span key={i}>
            {line === data.highlight
              ? <Text as="span" bgGradient="to-r" gradientFrom="#F57F17" gradientTo="#FBC02D" bgClip="text">{line}</Text>
              : line}
            {i < titleLines.length - 1 && <br />}
          </span>
        ))}
      </Text>

      <Text fontSize="1rem" color="gray.700" lineHeight="1.6" maxW="440px" mx="auto" mb={5}>
        {data.subtitle}
      </Text>

      <HStack flexWrap="wrap" gap={2} justify="center">
        {data.tags.map(tag => (
          <Box key={tag.label}
            bg="rgba(46,125,50,0.1)" color="#2E7D32"
            border="1px solid rgba(46,125,50,0.2)"
            borderRadius="999px" fontSize="0.72rem" fontWeight="600" px={3} py={1}>
            {tag.label}
          </Box>
        ))}
      </HStack>
    </VStack>
  )
}

/* ── Conteúdo padrão (p01, p02) ────────────────────── */
export function PageContent({ data }: { data: PageContentData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>

      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
        {data.titleSuffix}
      </PageTitle>

      {/* Callout especial que aparece ANTES do lead (ex: "Olá, futuro cientista!") */}
      {data.topCallout && (
        <Callout
          variant={data.topCallout.variant}
          icon={data.topCallout.icon}
          title={data.topCallout.title}
          mt={0}
        >
          {data.topCallout.text}
        </Callout>
      )}

      <LeadText>{data.leadText}</LeadText>

      {data.iconCards && <IconCardsGrid cards={data.iconCards} />}

      {data.midSectionHeading && (
        <>
          <Divider />
          <SectionHeading>{data.midSectionHeading}</SectionHeading>
          {data.midSectionText && <LeadText>{data.midSectionText}</LeadText>}
        </>
      )}

      {data.callouts && <CalloutList callouts={data.callouts} />}
    </Box>
  )
}

/* ── Lapbook interativo (p03, p07) ──────────────────── */
export function PageLapbook({ data }: { data: PageLapbookData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <LapbookHeader
        badge={data.lapbookBadge}
        title={data.lapbookTitle}
        subtitle={data.lapbookSubtitle}
      />
      <LiftTheFlap
        title={data.lapbookTitle}
        flaps={data.flaps}
        columns={data.columns ?? 2}
      />
      {data.callouts && <CalloutList callouts={data.callouts} startMt={5} />}
    </Box>
  )
}

/* ── Impacto com estatísticas (p04) ─────────────────── */
export function PageImpact({ data }: { data: PageImpactData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={4} my={6}>
        {data.statCards.map(card => (
          <Box key={card.stat} bg={card.gradient} borderRadius="18px"
            p="22px 20px" position="relative" overflow="hidden">
            <Box position="absolute" w="80px" h="80px" borderRadius="50%"
              bg="rgba(255,255,255,0.08)" bottom="-20px" right="-20px" aria-hidden="true" />
            <Text fontSize="32px" mb={2}>{card.icon}</Text>
            <Text fontSize="1.8rem" fontWeight="900" lineHeight="1" mb={1} color={card.textColor}>
              {card.stat}
            </Text>
            <Text fontSize="0.78rem" fontWeight="600" opacity={0.9} lineHeight="1.4" color={card.textColor}>
              {card.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <SectionHeading>Principais impactos</SectionHeading>
      <VStack gap={3} align="stretch">
        {data.impacts.map(item => (
          <HStack key={item.title}
            bg="white" border="1px solid rgba(46,125,50,0.14)"
            borderRadius="16px" p="16px 20px" gap={4} align="flex-start"
            _hover={{ borderColor: '#66BB6A', boxShadow: '0 4px 24px rgba(46,125,50,0.12)' }}
            transition="all 0.25s ease">
            <Box w="44px" h="44px" borderRadius="12px"
              bg="linear-gradient(135deg, #2E7D32, #66BB6A)"
              display="flex" alignItems="center" justifyContent="center"
              fontSize="22px" flexShrink={0}>
              {item.icon}
            </Box>
            <Box>
              <Text fontWeight="700" fontSize="0.9rem" color="#1B5E20" mb={1}>{item.title}</Text>
              <Text fontSize="0.78rem" color="gray.600" lineHeight="1.5">{item.desc}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

/* ── Alert + praga-cards (p05) ──────────────────────── */
export function PageAlert({ data }: { data: PageAlertData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      {/* Caixa de alerta vermelha */}
      <Box
        role="alert"
        bg="linear-gradient(135deg, #B71C1C, #C62828)" color="white"
        borderRadius="18px" p={6} my={6}
        display="flex" gap={4} alignItems="flex-start"
        boxShadow="0 8px 24px rgba(198,40,40,0.3)"
        position="relative" overflow="hidden"
      >
        <Box position="absolute" w="200px" h="200px" borderRadius="50%"
          bg="rgba(255,255,255,0.05)" top="-80px" right="-60px" aria-hidden="true" />
        <Text fontSize="36px" flexShrink={0}>{data.alertIcon}</Text>
        <Box>
          <Text fontSize="1rem" fontWeight="800" mb={1}>{data.alertTitle}</Text>
          <Text fontSize="0.85rem" lineHeight="1.65" opacity={0.93}>{data.alertText}</Text>
        </Box>
      </Box>

      {data.callouts && <CalloutList callouts={data.callouts} />}

      {data.pragaCards && (
        <>
          <Divider />
          <SectionHeading>Exemplos no Brasil</SectionHeading>
          <Grid templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }} gap={4} my={4}>
            {data.pragaCards.map(p => (
              <Box key={p.title}
                bg="white" borderRadius="18px" overflow="hidden"
                boxShadow="0 4px 24px rgba(46,125,50,0.12)"
                border="1px solid rgba(46,125,50,0.08)"
                _hover={{ transform: 'translateY(-5px)', boxShadow: '0 12px 32px rgba(46,125,50,0.18)' }}
                transition="all 0.25s ease">
                <Box bg={p.bg} p={5} textAlign="center" fontSize="42px">{p.emoji}</Box>
                <Box p="14px 16px">
                  <Text fontWeight="700" fontSize="0.85rem" color="#1B5E20" mb={1}>{p.title}</Text>
                  <Text fontSize="0.75rem" color="gray.600" lineHeight="1.5">{p.desc}</Text>
                </Box>
              </Box>
            ))}
          </Grid>
        </>
      )}
    </Box>
  )
}

/* ── Lista de órgãos/atores (p06) ───────────────────── */
export function PageOrgaos({ data }: { data: PageOrgaosData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
        {data.titleSuffix}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      <VStack gap={3} align="stretch">
        {data.items.map(o => (
          <HStack key={o.name}
            bg="white" border="1px solid rgba(46,125,50,0.14)"
            borderRadius="16px" p="16px 20px" gap={4} align="flex-start"
            _hover={{ borderColor: '#66BB6A', boxShadow: '0 4px 24px rgba(46,125,50,0.12)' }}
            transition="all 0.25s ease">
            <Box w="44px" h="44px" borderRadius="12px"
              bg="linear-gradient(135deg, #2E7D32, #66BB6A)"
              display="flex" alignItems="center" justifyContent="center"
              fontSize="22px" flexShrink={0}>
              {o.icon}
            </Box>
            <Box>
              <Text fontWeight="700" fontSize="0.9rem" color="#1B5E20" mb={1}>{o.name}</Text>
              <Text fontSize="0.78rem" color="gray.600" lineHeight="1.5">{o.desc}</Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

/* ── Caso real — ficha técnica (p08, p09, p10) ───────── */
export function PageCase({ data }: { data: PageCaseData }) {
  const heroGradients = {
    green: 'linear-gradient(135deg, #2E7D32, #66BB6A)',
    amber: 'linear-gradient(135deg, #E65100, #FF8F00)',
    teal:  'linear-gradient(135deg, #00695C, #26A69A)',
  }

  return (
    <Box>
      <SectionBadge>📍 Caso Real — Amapá</SectionBadge>

      {/* Hero */}
      <Box borderRadius="20px" overflow="hidden" mb={6}>
        <Box
          p={{ base: '28px 20px', md: '40px 32px' }}
          display="flex" alignItems="center" gap={6} flexWrap="wrap"
          bg={heroGradients[data.heroVariant]} color="white"
        >
          <Text
            fontSize={{ base: '52px', md: '72px' }} flexShrink={0}
            style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.2))', animation: 'floatIcon 4s ease-in-out infinite' }}
          >
            {data.heroEmoji}
          </Text>
          <Box flex="1" minW="180px">
            <Text as="h1" fontSize="clamp(1.2rem, 3vw, 1.6rem)" fontWeight="800" mb={1} lineHeight="1.2">
              {data.heroTitle}
            </Text>
            <Text fontSize="0.88rem" lineHeight="1.6" opacity={0.9}>{data.heroSubtitle}</Text>
          </Box>
        </Box>
      </Box>

      {/* Ficha técnica */}
      <Box bg="white" borderRadius="18px" border="1px solid rgba(46,125,50,0.12)" p={6} mb={4}>
        <Text fontSize="0.7rem" textTransform="uppercase" letterSpacing="0.1em"
          fontWeight="700" color="#2E7D32" mb={3}>
          Ficha Técnica
        </Text>
        <VStack gap={3} align="stretch">
          {data.details.map((row, i) => (
            <HStack key={i} gap={3} align="flex-start" fontSize="0.83rem" lineHeight="1.55" color="#212121">
              <Text fontSize="18px" flexShrink={0} mt="1px">{row.icon}</Text>
              <Text>
                <Text as="strong">{row.label}:</Text>{' '}{row.value}
              </Text>
            </HStack>
          ))}
        </VStack>
      </Box>

      <CalloutList callouts={data.callouts} />
    </Box>
  )
}

/* ── Cadeia de impactos (p11) ───────────────────────── */
export function PageChain({ data }: { data: PageChainData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>

      {/* Hero de impacto */}
      <Box
        bg="linear-gradient(135deg, #1B5E20, #2E7D32)"
        borderRadius="24px" p="40px 32px"
        textAlign="center" color="white" mb={6}
        position="relative" overflow="hidden"
      >
        <Box position="absolute" w="300px" h="300px" borderRadius="50%"
          bg="rgba(255,255,255,0.04)" top="-80px" right="-80px" aria-hidden="true" />
        <Box display="inline-block" fontSize="0.72rem" textTransform="uppercase"
          letterSpacing="0.1em" fontWeight="700"
          bg="rgba(255,255,255,0.2)" px="14px" py="5px" borderRadius="999px" mb={4}>
          🌾 Reflexão
        </Box>
        <Text as="h1" fontSize="clamp(1.4rem, 3.5vw, 2rem)" fontWeight="900" lineHeight="1.2" mb={2}>
          {data.heroTitle}
          <Text as="span" color="#FBC02D">{data.heroHighlight}</Text>
          {' '}na mesa
        </Text>
        <Text fontSize="0.9rem" opacity={0.85} lineHeight="1.65" maxW="440px" mx="auto" mt={3}>
          {data.heroSubtitle}
        </Text>
      </Box>

      <SectionHeading>{data.sectionHeading}</SectionHeading>
      <LeadText>{data.leadText}</LeadText>

      {/* Cadeia visual */}
      <VStack gap={0} align="stretch" my={6}>
        {data.chainItems.map((item, idx) => (
          <Box key={idx}>
            <HStack gap={4} py={2} align="center">
              <VStack gap={0} align="center" w="36px" flexShrink={0}>
                <Box w="14px" h="14px" borderRadius="50%" bg="#2E7D32" flexShrink={0} />
                {idx < data.chainItems.length - 1 && (
                  <Box w="2px" h="28px" bg="linear-gradient(to bottom, #2E7D32, #66BB6A)" mx="auto" />
                )}
              </VStack>
              <Text fontSize="28px" flexShrink={0}>{item.icon}</Text>
              <Text fontSize="0.88rem" color="#212121" lineHeight="1.5" fontWeight="500">{item.text}</Text>
            </HStack>
          </Box>
        ))}
      </VStack>

      {data.callouts && <CalloutList callouts={data.callouts} />}
    </Box>
  )
}

/* ── Quiz (p12) — componente autocontido ────────────── */
export function PageQuiz({ data }: { data: PageQuizData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <Quiz />
    </Box>
  )
}

/* ── Encerramento (p13) ─────────────────────────────── */
export function PageClosing({ data }: { data: PageClosingData }) {
  return (
    <Box textAlign="center">
      <SectionBadge>🎓 Encerramento</SectionBadge>

      {/* Hero final */}
      <Box
        bg="linear-gradient(160deg, #1B5E20, #2E7D32, #66BB6A)"
        borderRadius="24px" p="48px 32px" color="white" mb={7}
        position="relative" overflow="hidden"
      >
        <Box position="absolute" borderRadius="50%" bg="rgba(255,255,255,0.04)"
          w="250px" h="250px" top="-80px" right="-60px" aria-hidden="true" />
        <Text fontSize="64px" display="block" mb={4}
          style={{ animation: 'floatIcon 3s ease-in-out infinite' }}>
          {data.heroEmoji}
        </Text>
        <Text as="h1" fontSize="clamp(1.6rem, 4vw, 2.2rem)" fontWeight="900" lineHeight="1.2" mb={3}
          style={{ whiteSpace: 'pre-line' }}>
          {data.heroTitle}
        </Text>
        <Text fontSize="0.9rem" opacity={0.9} lineHeight="1.7" maxW="440px" mx="auto">
          {data.heroSubtitle}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mb={7}>
        {data.pillars.map(p => (
          <Box key={p.label}
            bg="white" borderRadius="16px" p="20px 14px" textAlign="center"
            border="1px solid rgba(46,125,50,0.14)"
            _hover={{ transform: 'translateY(-4px)', boxShadow: '0 4px 24px rgba(46,125,50,0.12)' }}
            transition="all 0.25s ease">
            <Text fontSize="32px" mb={2} display="block">{p.icon}</Text>
            <Text fontSize="0.78rem" fontWeight="700" color="#1B5E20">{p.label}</Text>
            <Text fontSize="0.68rem" color="gray.600" mt={1} lineHeight="1.4">{p.sub}</Text>
          </Box>
        ))}
      </SimpleGrid>

      <Box bg="#FBC02D" borderRadius="18px" p="24px 28px"
        display="flex" flexDir="column" alignItems="center" gap={1} mb={6}>
        <Text fontSize="1rem" fontWeight="800" color="#212121">{data.ctaText}</Text>
        <Text fontSize="0.82rem" color="gray.700">{data.ctaSub}</Text>
      </Box>

      <Callout variant={data.callout.variant} icon={data.callout.icon} title={data.callout.title}>
        {data.callout.text}
      </Callout>

      <Box textAlign="center" mt={8} pb={5}>
        <Text fontSize="40px">🌿🍃🌾🫐🌴</Text>
        <Text fontSize="0.78rem" color="#2E7D32" fontWeight="600" mt={3} letterSpacing="0.05em">
          {data.footerText}
        </Text>
      </Box>
    </Box>
  )
}

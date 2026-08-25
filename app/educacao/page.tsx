"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Badge,
  Button,
  EmptyState,
  Flex,
  Heading,
  Input,
  InputGroup,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
} from "@chakra-ui/react";
import {
  BookMarked,
  GraduationCap,
  PartyPopper,
  Search,
  SearchX,
  Trophy,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopicCard } from "./components/TopicCard";
import { StatsBar } from "./components/StatsBar";
import { GlossarioDrawer } from "./components/GlossarioDrawer";
import { temas, tabs, withLockState, buildStats } from "./_data/educacao";
import { useTopics } from "@/hooks/useTopics";
import { useProgress } from "@/hooks/useProgress";
import { useAuth } from "@/app/context/AuthContext";

export default function ConteudoPage() {
  const { user } = useAuth();
  const { topics: dbTopics, loading: topicsLoading } = useTopics();
  const { getProgressPct } = useProgress(user?.id ?? null);
  const [glossarioOpen, setGlossarioOpen] = useState(false);

  // Mescla dados do banco com dados locais como fallback
  const temasResolvidos = useMemo(() => {
    if (!topicsLoading && dbTopics.length > 0) {
      return dbTopics.map((t) => ({
        slug: t.slug,
        title: t.title,
        description: t.description ?? "",
        level: t.level as "Básico" | "Intermediário" | "Avançado",
        category: t.category,
        icon: t.icon ?? "BookOpen",
        color: t.color ?? "#2E7D32",
        duration: t.duration ?? "—",
        lessons: t.lessons_count,
        progress: getProgressPct(t.id),
      }));
    }
    return temas;
  }, [dbTopics, topicsLoading, getProgressPct]);

  const [activeTab, setActiveTab] = useState("todos");
  const [query, setQuery] = useState("");

  // Trilha sequencial calculada uma vez sobre a lista completa, para que
  // o estado de bloqueio não mude conforme o usuário filtra por aba/busca.
  const topicsWithLock = useMemo(() => withLockState(temasResolvidos), [temasResolvidos]);
  const statsData = useMemo(() => buildStats(topicsWithLock), [topicsWithLock]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return topicsWithLock
      .filter((t) => activeTab === "todos" || t.category === activeTab)
      .filter(
        (t) =>
          q === "" ||
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q),
      );
  }, [topicsWithLock, activeTab, query]);

  const allCompleted =
    topicsWithLock.length > 0 &&
    topicsWithLock.every((t) => t.progress === 100);

  const featured =
    topicsWithLock.find(
      (t) => !t.locked && t.progress > 0 && t.progress < 100,
    ) ??
    topicsWithLock.find((t) => !t.locked && t.progress === 0) ??
    topicsWithLock.find((t) => !t.locked) ??
    topicsWithLock[0];

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
              <GraduationCap size={20} strokeWidth={2} aria-hidden />
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
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight={800}
            color="white"
            lineHeight={1.15}
            mb={2}
          >
            Conteúdo Educacional
          </Heading>
          <Text
            color="rgba(255,255,255,0.82)"
            fontSize={{ base: "sm", md: "md" }}
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
        {allCompleted ? (
          <Box>
            <Flex align="center" gap={2} mb={4}>
              <Trophy
                size={16}
                color="var(--chakra-colors-accent-500)"
                strokeWidth={2.5}
                aria-hidden
              />
              <Heading
                as="h2"
                fontSize="sm"
                fontWeight={700}
                color="muted"
                textTransform="uppercase"
                letterSpacing="wide"
              >
                Continue de onde parou
              </Heading>
            </Flex>

            <Flex
              direction="column"
              align="center"
              textAlign="center"
              gap={3}
              bg="linear-gradient(135deg, var(--chakra-colors-primary-50) 0%, var(--chakra-colors-surface) 100%)"
              borderRadius="2xl"
              border="2px solid"
              borderColor="primary.200"
              boxShadow="0 4px 24px rgba(15,42,26,0.10)"
              px={6}
              py={10}
            >
              <Flex
                w={14}
                h={14}
                borderRadius="full"
                bg="accent.100"
                align="center"
                justify="center"
                color="accent.600"
              >
                <PartyPopper size={28} strokeWidth={2} aria-hidden />
              </Flex>
              <Heading as="h3" fontSize="lg" fontWeight={800} color="fg">
                Você concluiu todos os módulos! 🎉
              </Heading>
              <Text fontSize="sm" color="muted" maxW="420px" lineHeight={1.65}>
                Parabéns por finalizar toda a trilha disponível. Fique de olho —
                novos conteúdos serão adicionados em breve.
              </Text>
            </Flex>
          </Box>
        ) : (
          featured && (
            <Box>
              <Flex align="center" gap={2} mb={4}>
                <Trophy
                  size={16}
                  color="accent.500"
                  strokeWidth={2.5}
                  aria-hidden
                />
                <Heading
                  as="h2"
                  fontSize="sm"
                  fontWeight={700}
                  color="muted"
                  textTransform="uppercase"
                  letterSpacing="wide"
                >
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
                <TopicCard
                  topic={featured}
                  featured
                  index={0}
                  locked={featured.locked}
                />
              </Box>
            </Box>
          )
        )}

        {/* ── Tabs + Busca + Grid ──────────────────────────── */}
        <Box>
          <Flex
            align={{ base: "stretch", sm: "center" }}
            justify="space-between"
            gap={4}
            mb={5}
            direction={{ base: "column", sm: "row" }}
          >
            <Heading as="h2" fontSize="lg" fontWeight={700} color="fg">
              Todos os módulos
            </Heading>

            <Flex align="center" gap={2} wrap="wrap">
              <Button
                size="sm"
                variant="outline"
                colorPalette="green"
                borderRadius="lg"
                onClick={() => setGlossarioOpen(true)}
                gap={1.5}
              >
                <BookMarked size={14} />
                Glossário Fitossanitário
              </Button>

              <InputGroup
                maxW={{ base: "full", sm: "240px" }}
                startElement={<Search size={16} color="muted" aria-hidden />}
              >
                <Input
                  placeholder="Buscar módulos..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  size="sm"
                  borderRadius="lg"
                  bg="surface"
                  aria-label="Buscar módulos por título ou descrição"
                />
              </InputGroup>
            </Flex>
          </Flex>

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
                    bg: "primary.500",
                    color: "white",
                    boxShadow: "0 2px 8px rgba(46,125,50,0.25)",
                  }}
                  color="muted"
                  flexShrink={0}
                  transition="all 0.2s ease"
                >
                  <Icon size={14} strokeWidth={2} aria-hidden />
                  {label}
                  <Badge
                    colorPalette={activeTab === value ? "yellow" : "gray"}
                    variant="subtle"
                    borderRadius="full"
                    fontSize="xs"
                    px={1.5}
                    py={0}
                    ml={0.5}
                  >
                    {value === "todos"
                      ? temas.length
                      : temas.filter((t) => t.category === value).length}
                  </Badge>
                </Tabs.Trigger>
              ))}
            </Tabs.List>

            <Tabs.Content value={activeTab}>
              {filtered.length > 0 ? (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
                  {filtered.map((tema, i) => (
                    <TopicCard
                      key={tema.title}
                      topic={tema}
                      index={i}
                      locked={tema.locked}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <EmptyState.Root size="md" py={12}>
                  <EmptyState.Content>
                    <EmptyState.Indicator>
                      <SearchX
                        size={32}
                        color="var(--colors-gray-400)"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </EmptyState.Indicator>
                    <EmptyState.Title>
                      Nenhum módulo encontrado
                    </EmptyState.Title>
                    <EmptyState.Description>
                      {query
                        ? `Não encontramos módulos para "${query}" nesta categoria.`
                        : "Não há módulos cadastrados nesta categoria ainda."}
                    </EmptyState.Description>
                  </EmptyState.Content>
                </EmptyState.Root>
              )}
            </Tabs.Content>
          </Tabs.Root>
        </Box>
      </Stack>

      <GlossarioDrawer
        open={glossarioOpen}
        onOpenChange={setGlossarioOpen}
      />
    </AppShell>
  );
}

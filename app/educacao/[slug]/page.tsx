import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  Lock,
  PlayCircle,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { TopicCard } from "../components/TopicCard";
import {
  buildLessons,
  getAllSlugs,
  getTopicBySlug,
  iconMap,
  temas,
  withLockState,
} from "../_data/educacao";

// `params` é Promise no Next.js 15+ (async params). Se seu projeto estiver
// no Next.js 13/14, troque para `params: { slug: string }` (sem Promise) —
// o `await params` abaixo continua funcionando em ambos os casos, mas o tipo
// declarado aqui precisa bater com a versão instalada para o build passar.
interface PageProps {
  params: Promise<{ slug: string }>;
}

const levelColorPalette: Record<string, string> = {
  Básico: "green",
  Intermediário: "orange",
  Avançado: "red",
};

// Pré-renderiza uma rota estática para cada tópico existente em _data/educacao.ts.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);
  if (!topic) return {};
  return {
    title: `${topic.title} · Conteúdo Educacional`,
    description: topic.description,
  };
}

export default async function TopicDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopicBySlug(slug);

  // Slug inexistente → 404 padrão do Next.
  if (!topic) notFound();

  const IconComp = iconMap[topic.icon] ?? BookOpen;
  const lessons = buildLessons(topic);
  const completedLessons = lessons.filter((l) => l.completed).length;
  const palette = levelColorPalette[topic.level] ?? "gray";

  const related = withLockState(temas)
    .filter((t) => t.category === topic.category && t.slug !== topic.slug)
    .slice(0, 3);

  return (
    <AppShell>

      <Stack gap={6}>
        {/* ── Breadcrumb ───────────────────────────────────── */}
        <Link href="/educacao">
          <Flex
            align="center"
            gap={1.5}
            color="muted"
            fontSize="sm"
            fontWeight={600}
            w="fit-content"
            _hover={{ color: "primary.600" }}
            transition="color 0.15s ease"
          >
            <ArrowLeft size={14} strokeWidth={2.5} aria-hidden />
            Voltar para Conteúdo Educacional
          </Flex>
        </Link>

        {/* ── Acesso bloqueado: alguém chegou direto pela URL ─ */}
        {topic.locked ? (
          <Flex
            direction="column"
            align="center"
            textAlign="center"
            gap={3}
            bg="surface"
            borderRadius="2xl"
            border="2px solid"
            borderColor="border"
            px={6}
            py={12}
          >
            <Flex
              w={14}
              h={14}
              borderRadius="full"
              bg="gray.100"
              align="center"
              justify="center"
              color="gray.400"
            >
              <Lock size={28} strokeWidth={2} aria-hidden />
            </Flex>
            <Heading as="h1" fontSize="lg" fontWeight={800} color="fg">
              Módulo bloqueado
            </Heading>
            <Text fontSize="sm" color="muted" maxW="420px" lineHeight={1.65}>
              Conclua os módulos de nível anterior da categoria{" "}
              <strong>{topic.category}</strong> para desbloquear{" "}
              <strong>{topic.title}</strong>.
            </Text>
            <Button asChild colorPalette="green" borderRadius="lg" mt={2}>
              <Link href="/educacao">Ver todos os módulos</Link>
            </Button>
          </Flex>
        ) : (
          <>
            {/* ── Header do tópico ─────────────────────────── */}
            <Box
              position="relative"
              overflow="hidden"
              borderRadius="2xl"
              bg="surface"
              border="1.5px solid"
              borderColor="primary.100"
              px={{ base: 5, md: 8 }}
              py={{ base: 6, md: 8 }}
              boxShadow="0 4px 24px rgba(15,42,26,0.08)"
            >
              <Flex
                align="flex-start"
                justify="space-between"
                gap={4}
                mb={4}
                wrap="wrap"
              >
                <Flex align="center" gap={3}>
                  <Flex
                    w={12}
                    h={12}
                    borderRadius="xl"
                    bg={`${topic.color}18`}
                    align="center"
                    justify="center"
                    color={topic.color}
                    flexShrink={0}
                  >
                    <IconComp size={24} strokeWidth={2} aria-hidden />
                  </Flex>
                  <Stack gap={1}>
                    <Flex gap={2} wrap="wrap">
                      <Badge
                        colorPalette={palette}
                        size="sm"
                        borderRadius="full"
                        px={2}
                      >
                        {topic.level}
                      </Badge>
                      <Badge
                        colorPalette="gray"
                        variant="subtle"
                        size="sm"
                        borderRadius="full"
                        px={2}
                      >
                        {topic.category}
                      </Badge>
                    </Flex>
                  </Stack>
                </Flex>
              </Flex>

              <Heading
                as="h1"
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight={800}
                color="fg"
                lineHeight={1.2}
                mb={2}
              >
                {topic.title}
              </Heading>
              <Text
                fontSize="sm"
                color="muted"
                maxW="640px"
                lineHeight={1.7}
                mb={5}
              >
                {topic.description}
              </Text>

              <Flex align="center" gap={5} mb={6} wrap="wrap">
                <Flex align="center" gap={1.5} color="muted">
                  <Clock size={14} strokeWidth={2} aria-hidden />
                  <Text fontSize="sm" fontWeight={500}>
                    {topic.duration}
                  </Text>
                </Flex>
                <Flex align="center" gap={1.5} color="muted">
                  <BookOpen size={14} strokeWidth={2} aria-hidden />
                  <Text fontSize="sm" fontWeight={500}>
                    {topic.lessons} lições
                  </Text>
                </Flex>
              </Flex>

              {/* Progresso */}
              <Box mb={6}>
                <Flex justify="space-between" mb={1.5}>
                  <Text fontSize="xs" color="muted" fontWeight={500}>
                    {completedLessons} de {topic.lessons} lições concluídas
                  </Text>
                  <Text fontSize="xs" color="primary.600" fontWeight={700}>
                    {topic.progress}%
                  </Text>
                </Flex>
                <Progress.Root
                  value={topic.progress}
                  size="sm"
                  borderRadius="full"
                >
                  <Progress.Track borderRadius="full" bg={`${topic.color}18`}>
                    <Progress.Range borderRadius="full" bg={topic.color} />
                  </Progress.Track>
                </Progress.Root>
              </Box>

              <Button
                colorPalette="green"
                variant={topic.progress === 100 ? "outline" : "solid"}
                borderRadius="lg"
                fontWeight={600}
                w={{ base: "100%", sm: "auto" }}
              >
                <PlayCircle
                  size={16}
                  strokeWidth={2}
                  aria-hidden
                  style={{ marginRight: 6 }}
                />
                {topic.progress === 100
                  ? "Revisar módulo"
                  : topic.progress > 0
                    ? "Continuar de onde parou"
                    : "Iniciar módulo"}
              </Button>
            </Box>

            {/* ── Lista de lições ──────────────────────────── */}
            <Box>
              <Heading as="h2" fontSize="lg" fontWeight={700} color="fg" mb={4}>
                Conteúdo do módulo
              </Heading>
              <Stack
                gap={0}
                bg="surface"
                borderRadius="2xl"
                border="1.5px solid"
                borderColor="primary.100"
                overflow="hidden"
              >
                {lessons.map((lesson, i) => (
                  <Flex
                    key={lesson.id}
                    align="center"
                    justify="space-between"
                    gap={3}
                    px={5}
                    py={4}
                    borderBottom={
                      i < lessons.length - 1 ? "1px solid" : undefined
                    }
                    borderColor="border"
                    _hover={{ bg: "primary.50" }}
                    transition="background 0.15s ease"
                  >
                    <Flex align="center" gap={3}>
                      {lesson.completed ? (
                        <CheckCircle2
                          size={18}
                          color={topic.color}
                          strokeWidth={2}
                          aria-hidden
                        />
                      ) : (
                        <Circle
                          size={18}
                          color="gray.300"
                          strokeWidth={2}
                          aria-hidden
                        />
                      )}
                      <Text
                        fontSize="sm"
                        fontWeight={500}
                        color={lesson.completed ? "fg" : "muted"}
                      >
                        {lesson.title}
                      </Text>
                    </Flex>
                    <Text fontSize="xs" color="muted" flexShrink={0}>
                      {lesson.duration}
                    </Text>
                  </Flex>
                ))}
              </Stack>
            </Box>

            {/* ── Módulos relacionados ─────────────────────── */}
            {related.length > 0 && (
              <Box>
                <Heading
                  as="h2"
                  fontSize="lg"
                  fontWeight={700}
                  color="fg"
                  mb={4}
                >
                  Continue estudando {topic.category}
                </Heading>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={5}>
                  {related.map((t, i) => (
                    <TopicCard
                      key={t.slug}
                      topic={t}
                      index={i}
                      locked={t.locked}
                    />
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </>
        )}
      </Stack>
    </AppShell>
  );
}

"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Box, Flex, Grid, HStack, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Apple, BadgeCheck, BarChart3, Bug, Coins, Droplets, Leaf, MapPin, ShieldCheck, Sprout, Sun, Telescope, TreePine, Users } from "lucide-react";
import LiftTheFlap from "../ui/LiftTheFlap";
import LapbookFolder, { type PocketCard } from "../ui/LapbookFolder";
import PestModalGallery from "../pages/pests/PestModalGallery";
import Quiz from "../pages/quiz/Quiz";
import { ImageDiscoveryHotspotGrid } from "../ui/ImageDiscoveryHotspot";
import InvasivePlantGallery from "../pages/cases/InvasivePlantGallery";
import AllyGallery from "../pages/allies/AllyGallery";
import BorderInvestigationCases from "../pages/cases/BorderInvestigationCases";
import type {
  PageCoverData,
  PageContentData,
  PageLapbookData,
  PagePestGalleryData,
  PageHotspotData,
  PageImpactData,
  PageAlertData,
  PageOrgaosData,
  PageCaseData,
  PageChainData,
  PageQuizData,
  PageFindTheHeroData,
  PageClosingData,
  CalloutData,
  ImageCardData,
} from "../../data/cartilha-data";
import { Avatar } from "./Avatar";
import BeforeAfterSlider from "../ui/BeforeAfterSlider";
import MascotSpeech from "../ui/MascotSpeech";
import DragAndDropSorter from "../ui/DragAndDropSorter";

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap="6px"
      bg="#2E7D32"
      color="white"
      fontSize="0.7rem"
      fontWeight="700"
      px="14px"
      py="5px"
      borderRadius="999px"
      letterSpacing="0.06em"
      textTransform="uppercase"
      mb={4}
    >
      {children}
    </Box>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <Text
      as="h1"
      fontSize="clamp(1.6rem, 4vw, 2.2rem)"
      fontWeight="800"
      color="#1B5E20"
      lineHeight="1.2"
      mb={2}
      letterSpacing="-0.01em"
    >
      {children}
    </Text>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <Text as="span" color="#F57F17">
      {children}
    </Text>
  );
}

function LeadText({ children }: { children: React.ReactNode }) {
  return (
    <Text fontSize="1rem" color="gray.700" lineHeight="1.75" mb={6}>
      {children}
    </Text>
  );
}

/** Renderiza imageSrc como <img> responsivo dentro de um container fixo */
function IconImg({
  src,
  alt,
  size = 32,
}: {
  src: string;
  alt: string;
  size?: number;
}) {
  return (
    <Box
      w={`${size}px`}
      h={`${size}px`}
      flexShrink={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
      borderRadius="8px"
    >
      <Image
        src={src}
        alt={alt}
        width={size}
        height={size}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
        }}
      />
    </Box>
  );
}

export function Callout({
  variant = "green",
  title,
  children,
  mt,
  titleColor,
  titleFontWeight,
}: {
  variant?: CalloutData["variant"];
  title: string;
  children: React.ReactNode;
  mt?: number | string;
  titleColor?: string;
  titleFontWeight?: string;
}) {
  const styles = {
    green: {
      bg: "#E8F5E9",
      border: "rgba(46,125,50,0.2)",
      titleColor: "#1B5E20",
      src: "/assets/dona_fito_meio_corpo.png"
    },
    yellow: {
      bg: "#FFF9C4",
      border: "rgba(251,192,45,0.4)",
      titleColor: "#F57F17",
      src: "/assets/joaninha_corpo_todo.png"
    },
    red: {
      bg: "#FFEBEE",
      border: "rgba(198,40,40,0.2)",
      titleColor: "#C62828",
      src: "/assets/dona_fito_meio_corpo.png"
    },
  };
  const s = styles[variant];
  return (
    <HStack
      bg={s.bg}
      border={`1px solid ${s.border}`}
      borderRadius="16px"
      p={{ base: '16px 18px', sm: '20px 24px' }}
      mt={mt}
      align="flex-start"
      gap={{ base: 3, sm: 4 }}
    >
      <Box flexShrink={0}>
        <Avatar src={s.src} />
      </Box>
      <Box flex="1" minW={0}>
        <Text
          display="block"
          fontSize={{ base: '0.88rem', sm: '0.95rem' }}
          fontWeight={titleFontWeight ?? "700"}
          mb={1}
          color={titleColor ?? s.titleColor}
        >
          {title}
        </Text>
        <Text fontSize={{ base: '0.85rem', sm: '0.9rem' }} lineHeight="1.65" color="#212121">
          {children}
        </Text>
      </Box>
    </HStack>
  );
}

function Divider() {
  return (
    <Box
      h="1px"
      bg="linear-gradient(90deg, transparent, rgba(46,125,50,0.2), transparent)"
      my={6}
    />
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text
      fontSize="0.7rem"
      textTransform="uppercase"
      letterSpacing="0.1em"
      fontWeight="700"
      color="#2E7D32"
      mb={3}
    >
      {children}
    </Text>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FLIP CARDS — Página 3
───────────────────────────────────────────────────────────────────────── */

const FITOSSANIDADE_CARDS = [
  {
    title: 'Phyton',
    subtitle: 'Origem da Palavra',
    explanation: 'Termo grego para PLANTA. Estuda a saúde e proteção do reino vegetal.',
    bg: 'green.50',
    border: 'green.200',
    accent: 'green.700',
  },
  {
    title: 'Sanitas',
    subtitle: 'Significado de Saúde',
    explanation: 'Termo latim para SAÚDE. Previne a entrada de fungos, vírus e insetos.',
    bg: 'yellow.50',
    border: 'yellow.300',
    accent: 'yellow.700',
  },
  {
    title: 'Segurança Alimentar',
    subtitle: 'Alimento para todos',
    explanation: 'Garante alimentos saudáveis e sem contaminação para a população.',
    bg: 'orange.50',
    border: 'orange.300',
    accent: 'orange.700',
  },
  {
    title: 'Agricultura Familiar',
    subtitle: 'Força da nossa região',
    explanation: 'Protege a renda e a produção dos pequenos agricultores da nossa região.',
    bg: 'teal.50',
    border: 'teal.200',
    accent: 'teal.700',
  },
] as const

function FitossanidadeFlipCard({
  card,
}: {
  card: (typeof FITOSSANIDADE_CARDS)[number]
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const showingBack = isFlipped || isHovered

  return (
    <Box
      h={{ base: '190px', sm: '205px' }}
      cursor="pointer"
      position="relative"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped((current) => !current)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`${card.title}: ${showingBack ? 'explicação' : 'ver explicação'}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setIsFlipped((current) => !current)
        }
      }}
    >
      <motion.div
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        animate={{ rotateY: showingBack ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <Box
          position="absolute"
          inset={0}
          style={{ backfaceVisibility: 'hidden' }}
          bg={card.bg}
          border="1px solid"
          borderColor={card.border}
          borderRadius="16px"
          p={{ base: 4, sm: 5 }}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          boxShadow="0 4px 12px rgba(0,0,0,0.08)"
        >
          <Text fontSize={{ base: '1rem', sm: '1.1rem' }} fontWeight="800" color={card.accent}>
            {card.title}
          </Text>
          <Text mt={2} fontSize="0.72rem" fontWeight="700" color={card.accent} opacity={0.8}>
            {card.subtitle}
          </Text>
        </Box>

        <Box
          position="absolute"
          inset={0}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          bg={card.accent}
          borderRadius="16px"
          p={{ base: 4, sm: 5 }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          boxShadow="0 4px 12px rgba(0,0,0,0.12)"
        >
          <Text fontSize={{ base: '0.8rem', sm: '0.85rem' }} lineHeight="1.55" color="white" fontWeight="600">
            {card.explanation}
          </Text>
        </Box>
      </motion.div>
    </Box>
  )
}

function FitossanidadeFlipCards() {
  return (
    <Box my={6}>
      <Text
        fontSize="0.78rem"
        fontWeight="600"
        color="green.700"
        textAlign="center"
        mb={3}
      >
        Clique em cada cartão para virar e descobrir o significado!
      </Text>
      <SimpleGrid columns={{ base: 2, sm: 2 }} gap={{ base: 3, sm: 4 }}>
        {FITOSSANIDADE_CARDS.map((card) => (
          <FitossanidadeFlipCard key={card.title} card={card} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

const PLANT_PROCESS_STEPS = [
  {
    title: 'Luz Solar',
    label: 'Energia',
    explanation: 'A luz do sol fornece a energia que a planta precisa para começar a produzir seu alimento.',
    icon: Sun,
    bg: 'yellow.50',
    border: 'yellow.300',
    accent: 'orange.600',
  },
  {
    title: 'Água e Solo',
    label: 'Nutrientes',
    explanation: 'As raízes absorvem água e nutrientes do solo para manter a planta forte e saudável.',
    icon: Droplets,
    bg: 'green.50',
    border: 'green.200',
    accent: 'green.700',
  },
  {
    title: 'A Máquina (Folha)',
    label: 'Transformação',
    explanation: 'Nas folhas, a planta transforma luz, água e nutrientes em energia e matéria para crescer.',
    icon: Leaf,
    bg: 'orange.50',
    border: 'orange.300',
    accent: 'orange.700',
  },
  {
    title: 'Produto Final',
    label: 'Alimento Gostoso!',
    explanation: 'O resultado são frutos, sementes, raízes e folhas que chegam à nossa mesa.',
    icon: Apple,
    bg: 'green.50',
    border: 'green.200',
    accent: 'green.800',
  },
] as const

function PlantProcessFlow() {
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  const selectedStep = hoveredStep ?? activeStep

  return (
    <Box my={6}>
      <Text
        fontSize="0.78rem"
        fontWeight="600"
        color="green.700"
        textAlign="center"
        mb={4}
      >
        Clique em cada etapa do processo para ver como a planta fabrica o nosso alimento!
      </Text>
      <Box
        display="flex"
        flexDir={{ base: 'column', md: 'row' }}
        alignItems={{ base: 'stretch', md: 'flex-start' }}
        gap={{ base: 3, md: 2 }}
      >
        {PLANT_PROCESS_STEPS.map((step, index) => {
          const Icon = step.icon
          const isSelected = selectedStep === index
          const isActive = activeStep === index

          return (
            <Box
              key={step.title}
              display="flex"
              flex={{ md: 1 }}
              alignItems="center"
              gap={{ base: 3, md: 2 }}
              flexDir={{ base: 'column', md: 'row' }}
              w="full"
            >
              <Box flex="1" w="full">
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                >
                  <Box
                    bg={step.bg}
                    border="1px solid"
                    borderColor={step.border}
                    borderRadius="16px"
                    p={{ base: 4, md: 3 }}
                    minH={{ base: '125px', md: '145px' }}
                    display="flex"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    cursor="pointer"
                    boxShadow={isSelected ? 'md' : 'sm'}
                    outline={isActive ? '3px solid' : 'none'}
                    outlineColor={step.accent}
                    outlineOffset="2px"
                    transition="box-shadow 0.2s ease"
                    onClick={() => setActiveStep(activeStep === index ? null : index)}
                    onMouseEnter={() => setHoveredStep(index)}
                    onMouseLeave={() => setHoveredStep(null)}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isSelected}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        setActiveStep(activeStep === index ? null : index)
                      }
                    }}
                  >
                    <Box
                      w="42px"
                      h="42px"
                      borderRadius="12px"
                      bg="white"
                      color={step.accent}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      mb={2}
                    >
                      <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
                    </Box>
                    <Text fontSize="0.83rem" fontWeight="800" color={step.accent} lineHeight="1.25">
                      {step.title}
                    </Text>
                    <Text mt={1} fontSize="0.68rem" fontWeight="700" color={step.accent} opacity={0.8}>
                      {step.label}
                    </Text>
                  </Box>
                </motion.div>
              </Box>
              {index < PLANT_PROCESS_STEPS.length - 1 && (
                <Text
                  display={{ base: 'none', md: 'block' }}
                  color="green.500"
                  fontSize="1.4rem"
                  fontWeight="800"
                  aria-hidden="true"
                >
                  →
                </Text>
              )}
            </Box>
          )
        })}
      </Box>

      <Box
        mt={4}
        minH={{ base: '82px', md: '72px' }}
        bg="white"
        border="1px solid"
        borderColor={selectedStep === null ? 'green.200' : PLANT_PROCESS_STEPS[selectedStep].border}
        borderRadius="14px"
        p={4}
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        boxShadow="sm"
        overflow="hidden"
      >
        <motion.div
          key={selectedStep ?? 'hint'}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        >
          <Text fontSize="0.75rem" lineHeight="1.5" color="gray.700">
            {selectedStep === null
              ? 'Selecione uma etapa para descobrir como a planta fabrica o nosso alimento.'
              : PLANT_PROCESS_STEPS[selectedStep].explanation}
          </Text>
        </motion.div>
      </Box>
    </Box>
  )
}

function IconCardsGrid({ cards }: { cards: ImageCardData[] }) {
  const cols = Math.min(cards.length, 4)

  return (
    <Grid
      templateColumns={{ base: 'repeat(2, 1fr)', md: `repeat(${cols}, 1fr)` }}
      gap={{ base: 4, sm: 6 }}
      my={6}
    >
      {cards.map((card) => (
        <Box
          key={card.label}
          bg="white"
          border="1px solid"
          borderColor="rgba(46,125,50,0.14)"
          borderRadius="16px"
          p="16px 12px"
          textAlign="center"
          display="flex"
          flexDir="column"
          alignItems="center"
          gap={2}
          boxShadow="0 4px 12px rgba(0,0,0,0.08)"
        >
          <Image
            src={card.imageSrc}
            alt={card.alt}
            width={card.display === 'full' ? 500 : 52}
            height={card.display === 'full' ? 180 : 52}
            style={{
              objectFit: card.display === 'full' ? 'cover' : 'contain',
              width: card.display === 'full' ? '100%' : '52px',
              height: card.display === 'full' ? '120px' : '52px',
              borderRadius: '12px',
            }}
          />
          <Text fontSize="0.75rem" fontWeight="600" color="#2E7D32" lineHeight="1.3">
            {card.label}
          </Text>
        </Box>
      ))}
    </Grid>
  )
}


function CalloutList({
  callouts,
  startMt = 0,
}: {
  callouts: CalloutData[];
  startMt?: number;
}) {
  return (
    <>
      {callouts.map((c, i) => (
        <Callout
          key={i}
          variant={c.variant}
          title={c.title}
          mt={i === 0 ? startMt : 4}
        >
          {c.text}
        </Callout>
      ))}
    </>
  );
}

function LapbookHeader({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Box
      bg="linear-gradient(135deg, #1B5E20, #2E7D32)"
      borderRadius="20px"
      p={{ base: '20px 18px', sm: '28px 24px' }}
      color="white"
      mb={6}
      position="relative"
      overflow="hidden"
    >
      <Box
        position="absolute"
        w="180px"
        h="180px"
        borderRadius="50%"
        bg="rgba(255,255,255,0.05)"
        bottom="-60px"
        right="-40px"
        aria-hidden="true"
      />
      <Box
        display="inline-flex"
        alignItems="center"
        gap="6px"
        fontSize="0.68rem"
        textTransform="uppercase"
        letterSpacing="0.1em"
        fontWeight="700"
        bg="rgba(255,255,255,0.2)"
        px="14px"
        py="4px"
        borderRadius="999px"
        mb={3}
      >
        {badge}
      </Box>
      <Text
        as="h1"
        fontSize="clamp(1.2rem, 3.5vw, 1.9rem)"
        fontWeight="900"
        lineHeight="1.2"
        mb={1}
        letterSpacing="-0.02em"
      >
        {title}
      </Text>
      <Text fontSize={{ base: '0.8rem', sm: '0.85rem' }} opacity={0.85} lineHeight="1.65">
        {subtitle}
      </Text>
    </Box>
  );
}

/* ─── PlantCard ─────────────────────────────────────── */
interface PlantCardProps {
  variant: "healthy" | "sick";
  emoji: string;
  title: string;
  desc: string;
  gradient: string;
  accentColor: string;
  textColor: string;
  glowColor: string;
  patternA: string;
  patternB: string;
}

function PlantCard({
  variant,
  emoji,
  title,
  desc,
  gradient,
  accentColor,
  textColor,
  glowColor,
  patternA,
  patternB,
}: PlantCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springConfig = { stiffness: 260, damping: 22 };
  const springX = useSpring(rawX, springConfig);
  const springY = useSpring(rawY, springConfig);
  const rotateX = useTransform(springY, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        flex: 1,
        minWidth: "0",
      }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      <Box
        h="full"
        bg={gradient}
        borderRadius="20px"
        overflow="hidden"
        position="relative"
        boxShadow={[
          `0 2px 0 rgba(255,255,255,0.25) inset`,
          `0 -2px 0 rgba(0,0,0,0.08) inset`,
          `0 8px 32px ${glowColor}`,
          `0 2px 8px rgba(0,0,0,0.10)`,
        ].join(", ")}
        border="1.5px solid rgba(255,255,255,0.35)"
        cursor="default"
      >
        {/* Decorative blobs */}
        <Box
          position="absolute"
          w="120px"
          h="120px"
          borderRadius="50%"
          bg={patternA}
          top="-30px"
          right="-30px"
          aria-hidden="true"
        />
        <Box
          position="absolute"
          w="80px"
          h="80px"
          borderRadius="50%"
          bg={patternB}
          bottom="10px"
          left="-20px"
          aria-hidden="true"
        />

        <VStack
          gap={3}
          p={{ base: '20px 16px 18px', sm: '28px 20px 24px' }}
          align="center"
          position="relative"
          zIndex={1}
        >
          {/* Emoji in a raised circle */}
          <Box
            w="72px"
            h="72px"
            borderRadius="50%"
            bg="rgba(255,255,255,0.55)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="0 4px 16px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.8) inset"
            style={{ transform: "translateZ(20px)" }}
          >
            <Text
              fontSize="38px"
              lineHeight="1"
              style={{
                animation: `floatIcon ${variant === "healthy" ? "3s" : "4s"} ease-in-out infinite`,
              }}
            >
              {emoji}
            </Text>
          </Box>

          <Box textAlign="center">
            <Text
              fontSize="0.82rem"
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="0.09em"
              color={textColor}
              mb="6px"
            >
              {title}
            </Text>
            <Text
              fontSize="0.72rem"
              lineHeight="1.55"
              color={textColor}
              opacity={0.82}
            >
              {desc}
            </Text>
          </Box>

          {/* Status badge */}
          <Box
            display="inline-flex"
            alignItems="center"
            gap="4px"
            bg="rgba(255,255,255,0.45)"
            borderRadius="999px"
            px="10px"
            py="4px"
            fontSize="0.65rem"
            fontWeight="700"
            color={accentColor}
            border="1px solid rgba(255,255,255,0.6)"
          >
            <Box
              w="6px"
              h="6px"
              borderRadius="50%"
              bg={accentColor}
              flexShrink={0}
            />
            {variant === "healthy" ? "Status: Saudável" : "Status: Doente"}
          </Box>
        </VStack>
      </Box>
    </motion.div>
  );
}

/* ─── PersonaGreeting ────────────────────────────────── */
function PersonaGreeting() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.6, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", bounce: 0.5, delay: 0.55, duration: 0.8 }}
      style={{ width: "100%" }}
    >
      <Box
        bg="white"
        borderRadius="24px"
        boxShadow={[
          "0 2px 0 rgba(255,255,255,0.9) inset",
          "0 -2px 0 rgba(46,125,50,0.06) inset",
          "0 12px 40px rgba(46,125,50,0.18)",
          "0 4px 12px rgba(0,0,0,0.08)",
        ].join(", ")}
        border="1.5px solid rgba(46,125,50,0.15)"
        p={{ base: '16px', sm: '20px' }}
        display="flex"
        gap={{ base: 3, sm: 4 }}
        alignItems="flex-start"
        position="relative"
        overflow="visible"
      >
        {/* Subtle top-left accent stripe */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="4px"
          bg="linear-gradient(90deg, #2E7D32, #66BB6A, #FBC02D)"
          borderTopRadius="24px"
          aria-hidden="true"
        />

        {/* Avatar */}
        <Box flexShrink={0}>
          <Avatar src="/assets/dona_fito_meio_corpo.png" />
          {/* Name tag below avatar */}
          <Box
            mt={1}
            textAlign="center"
            bg="#E8F5E9"
            borderRadius="999px"
            px={2}
            py={2}
          >
            <Text
              fontSize="0.55rem"
              fontWeight="800"
              color="#1B5E20"
              textTransform="uppercase"
              letterSpacing="0.06em"
              lineHeight="1.3"
            >
              Dona Fito
            </Text>
          </Box>
        </Box>

        {/* Speech bubble area */}
        <Box flex="1" position="relative">
          {/* Small pointer triangle on the left */}
          <Box
            position="absolute"
            left="-12px"
            top="14px"
            w={0}
            h={0}
            borderTop="7px solid transparent"
            borderBottom="7px solid transparent"
            borderRight="12px solid #E8F5E9"
            aria-hidden="true"
          />
          <Box
            bg="#F1F8E9"
            borderRadius="16px"
            p="14px 16px"
            border="1px solid rgba(46,125,50,0.14)"
          >
            <Text
              fontSize="0.82rem"
              fontWeight="600"
              lineHeight="1.7"
              color="#1B5E20"
              letterSpacing="0.01em"
              fontStyle="normal"
            >
              Olá, futuro cientista! Você sabia que as plantas também ficam
              doentes? Vamos descobrir juntos como identificar, prevenir e
              proteger nossas lavouras!
            </Text>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

/* ─── PageCover ──────────────────────────────────────── */
export function PageCover({ data }: { data: PageCoverData }) {
  const titleLines = data.title.split("\n");

  return (
    <VStack gap={0} textAlign="center" py={{ base: 1, sm: 2 }} pb={{ base: 4, sm: 6 }}>
      {/* ── Badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      >
        <Box
          display="inline-flex"
          alignItems="center"
          gap="6px"
          bg="#E8F5E9"
          color="#1B5E20"
          fontSize="0.75rem"
          fontWeight="700"
          px="16px"
          py="6px"
          borderRadius="999px"
          letterSpacing="0.06em"
          textTransform="uppercase"
          border="1px solid rgba(46,125,50,0.2)"
          mb={6}
        >
          📚 Cartilha Educativa — EducaFito
        </Box>
      </motion.div>

      {/* ── BeforeAfterSlider — comparação fotográfica ── */}
      <Box w="full" maxW="480px" mx="auto" mb={8}>
        <BeforeAfterSlider
          beforeImage="https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?q=80&w=800&auto=format&fit=crop"
          afterImage="https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?q=80&w=800&auto=format&fit=crop"
          beforeLabel="Planta Saudável"
          afterLabel="Planta Doente"
          altText="Comparação de plantação saudável versus doente"
        />
      </Box>

      {/* ── Title ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.22 }}
        style={{ width: "100%" }}
      >
        <Text
          as="h1"
          fontSize="clamp(2rem, 5vw, 3rem)"
          fontWeight="900"
          lineHeight="1.1"
          color="#1B5E20"
          mb={3}
          letterSpacing="-0.02em"
        >
          {titleLines.map((line, i) => {
            if (!line.includes(data.highlight)) {
              return (
                <span key={i}>
                  {line}
                  {i < titleLines.length - 1 && <br />}
                </span>
              );
            }
            const parts = line.split(data.highlight);
            return (
              <span key={i}>
                {parts[0]}
                <Text
                  as="span"
                  bgGradient="to-r"
                  gradientFrom="#F57F17"
                  gradientTo="#FBC02D"
                  bgClip="text"
                >
                  {data.highlight}
                </Text>
                {parts[1]}
                {i < titleLines.length - 1 && <br />}
              </span>
            );
          })}
        </Text>
      </motion.div>

      {/* ── Subtitle ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.3 }}
        style={{ width: "100%" }}
      >
        <Text
          fontSize="1rem"
          color="gray.700"
          lineHeight="1.6"
          maxW="440px"
          mx="auto"
          mb={5}
        >
          {data.subtitle}
        </Text>
      </motion.div>

      {/* ── Persona ── */}
      <Box w="full" maxW="480px" mx="auto">
        <PersonaGreeting/>
      </Box>

    </VStack>
  );
}

/* ─── Pilares de aprendizado — grid exclusivo da Página 01 ──────────────────
   Renderiza 4 cards semânticos com badges arredondados e título.
──────────────────────────────────────────────────────────────────────────── */

const PILARES = [
  {
    icon: Leaf,
    label: 'O que é Fitossanidade?',
    desc: 'A ciência que cuida da saúde das plantas e garante colheitas saudáveis.',
  },
  {
    icon: Bug,
    label: 'O que são Pragas Agrícolas?',
    desc: 'Organismos que atacam plantas e causam perdas na produção de alimentos.',
  },
  {
    icon: MapPin,
    label: 'Casos Reais da Região Norte',
    desc: 'Pragas e doenças que já afetaram lavouras do Amapá e da Amazônia.',
  },
  {
    icon: ShieldCheck,
    label: 'Como Proteger e Evitar',
    desc: 'Técnicas e boas práticas para prevenir e controlar pragas com segurança.',
  },
] as const

function PillarGrid({ onGoTo }: { onGoTo: (pageIndex: number) => void }) {
  const pageByLabel: Record<(typeof PILARES)[number]['label'], number> = {
    'O que é Fitossanidade?': 2,
    'O que são Pragas Agrícolas?': 3,
    'Casos Reais da Região Norte': 14,
    'Como Proteger e Evitar': 13,
  }

  return (
    <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} mt={1}>
      {PILARES.map((p, i) => (
        <motion.div
          key={p.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut', delay: 0.12 + i * 0.07 }}
        >
          <Box
            bg="green.50"
            border="1.5px solid"
            borderColor="green.200"
            borderRadius="xl"
            p={4}
            display="flex"
            alignItems="flex-start"
            gap={3}
            h="full"
            cursor="pointer"
            transition="all 0.2s ease"
            _hover={{ bg: 'green.100', borderColor: 'green.400', transform: 'translateY(-2px)', boxShadow: 'sm' }}
            onClick={() => onGoTo(pageByLabel[p.label])}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onGoTo(pageByLabel[p.label])
              }
            }}
          >
            <Box
              w="40px"
              h="40px"
              borderRadius="full"
              bg="green.50"
              color="green.700"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              aria-hidden="true"
            >
              <p.icon size={20} strokeWidth={2.2} />
            </Box>

            <Box flex="1" minW={0}>
              <Text
                fontSize={{ base: '0.8rem', sm: '0.83rem' }}
                fontWeight="700"
                color="#1a2e1a"
                lineHeight="1.35"
                mb="4px"
              >
                {p.label}
              </Text>
              <Text
                fontSize={{ base: '0.74rem', sm: '0.77rem' }}
                color="#555"
                lineHeight="1.55"
              >
                {p.desc}
              </Text>
            </Box>
          </Box>
        </motion.div>
      ))}
    </SimpleGrid>
  )
}

/* ─── PageContent ────────────────────────────────────────────────────────── */

export function PageContent({
  data,
  onGoTo,
}: {
  data: PageContentData
  onGoTo: (pageIndex: number) => void
}) {
  /* Layout especial para a Página 01 — Apresentação */
  if (data.id === 'p01') {
    return (
      <Box>
        <Box mt={2}>
          <SectionBadge>{data.badgeLabel}</SectionBadge>
        </Box>

        {/* Título principal */}
        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
          {data.titleSuffix}
        </PageTitle>

        {/* Único balão da Dona Fito — fala do topCallout */}
        {data.topCallout && (
          <Box mb={5}>
            <MascotSpeech
              speech={data.topCallout.text}
              avatarSide="left"
              variant="default"
              delay={0.15}
            />
          </Box>
        )}

        {/* Texto de introdução */}
        <LeadText>{data.leadText}</LeadText>

        {/* Grid dos 4 pilares do aprendizado */}
        <PillarGrid onGoTo={onGoTo} />
      </Box>
    )
  }

  /* Layout exclusivo para a Página 03 — O que é Fitossanidade? */
  if (data.id === 'p02') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>

        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
          {data.titleSuffix}
        </PageTitle>

        <LeadText>{data.leadText}</LeadText>

        <FitossanidadeFlipCards />

        {data.callouts && <CalloutList callouts={data.callouts} startMt={5} />}
      </Box>
    )
  }

  /* Layout exclusivo para a Página 04 — A fábrica de comida */
  if (data.id === 'p03') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>

        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
          {data.titleSuffix}
        </PageTitle>

        <LeadText>{data.leadText}</LeadText>

        <PlantProcessFlow />

        {data.midSectionHeading && (
          <>
            <Divider />
            <SectionHeading>{data.midSectionHeading}</SectionHeading>
            {data.midSectionText && <LeadText>{data.midSectionText}</LeadText>}
          </>
        )}

        {data.callouts && <CalloutList callouts={data.callouts} startMt={5} />}
      </Box>
    )
  }

  /* Layout exclusivo para a Página 08 — Plantas invasoras */
  if (data.id === 'p07') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>

        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
          {data.titleSuffix}
        </PageTitle>

        <LeadText>{data.leadText}</LeadText>

        {data.invasiveCards && <InvasivePlantGallery items={data.invasiveCards} />}

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

  /* Layout exclusivo para a Página 09 — Aliados da lavoura */
  if (data.id === 'p08') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>

        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
          {data.titleSuffix}
        </PageTitle>

        <LeadText>{data.leadText}</LeadText>

        {data.allyCards && <AllyGallery items={data.allyCards} />}

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

  /* Layout padrão para todas as demais páginas de conteúdo */
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>

      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
        {data.titleSuffix}
      </PageTitle>

      {data.topCallout && (
        <Callout
          variant={data.topCallout.variant}
          title={data.topCallout.title}
          mt={0}
        >
          {data.topCallout.text}
        </Callout>
      )}

      <LeadText>{data.leadText}</LeadText>

      {data.imageCards && <IconCardsGrid cards={data.imageCards} />}

      {data.midSectionHeading && (
        <>
          <Divider />
          <SectionHeading>{data.midSectionHeading}</SectionHeading>
          {data.midSectionText && <LeadText>{data.midSectionText}</LeadText>}
        </>
      )}

      {data.callouts && <CalloutList callouts={data.callouts} />}
    </Box>
  );
}

export function PageLapbook({ data }: { data: PageLapbookData }) {
  /* ── Layout exclusivo da Página 13 — O Escudo Protetor ── */
  if (data.id === 'p13') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>

        {/* Cabeçalho com título e subtítulo da página */}
        <LapbookHeader
          badge={data.lapbookBadge}
          title={data.lapbookTitle}
          subtitle={data.lapbookSubtitle}
        />

        {/* Instrução pedagógica sem repetir a mascote do callout final */}
        <Box mb={5}>
          <HStack
            align="flex-start"
            gap={3}
            bg="yellow.50"
            border="1px solid"
            borderColor="yellow.200"
            borderRadius="16px"
            p={{ base: 4, sm: 5 }}
          >
            <Text fontSize="1.45rem" lineHeight="1" aria-hidden="true">
              💡
            </Text>
            <Box>
              <Text
                fontSize="0.72rem"
                fontWeight="900"
                letterSpacing="0.08em"
                textTransform="uppercase"
                color="orange.800"
                mb={1}
              >
                Reflita · Desafio fitossanitário
              </Text>
              <Text fontSize="0.88rem" color="gray.700" lineHeight="1.65">
                Agora é a sua vez de praticar! Classifique cada ação abaixo em{' '}
                <Text as="strong" color="#2E7D32">
                  Prática Segura
                </Text>{' '}
                ou{' '}
                <Text as="strong" color="#BF360C">
                  Risco Fitossanitário
                </Text>
                . Você pode clicar ou arrastar os cartões!
              </Text>
            </Box>
          </HStack>
        </Box>

        {/* Atividade central de classificação */}
        <DragAndDropSorter
          safeLabel="Práticas Seguras"
          riskLabel="Riscos Fitossanitários"
        />

        {/* Callout final — Dona Fito reforça a mensagem */}
        {data.callouts && (
          <Box mt={5}>
            <CalloutList callouts={data.callouts} />
          </Box>
        )}
      </Box>
    )
  }

  /* ── Layout padrão para todas as demais páginas do tipo lapbook ── */
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
        flaps={data.flaps.map((f) => ({
          id: f.id,
          frontEmoji: "",
          frontText: f.coverTitle,
          backContent: f.content,
          backAccent: f.backAccent,
        }))}
        columns={data.columns ?? 2}
      />
      {data.callouts && <CalloutList callouts={data.callouts} startMt={5} />}
    </Box>
  );
}

/**
 * PAGINA 05 — GALERIA DE PRAGAS COM MODAIS
 *
 * Este componente e intencionalmente "burro" em relacao ao modal:
 * ele apenas renderiza o grid e repassa o callback onSelectItem para cima.
 * O DialogRoot reside em page.tsx, fora do PageTransitionWrapper, para
 * escapar do stacking context criado por filter + transform.
 */
export function PagePestGallery({
  data,
  onSelectItem,
}: {
  data: PagePestGalleryData
  onSelectItem: (item: import('../../data/cartilha-data').PestGalleryItemData, index: number) => void
}) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>

      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
        {data.titleSuffix}
      </PageTitle>

      <LeadText>{data.leadText}</LeadText>

      <PestModalGallery
        items={data.pestGalleryItems}
        onSelectItem={onSelectItem}
      />

      {data.callouts && <CalloutList callouts={data.callouts} />}
    </Box>
  );
}


export function PageHotspot({ data }: { data: PageHotspotData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>

      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
        {data.titleSuffix}
      </PageTitle>

      {/* Banner instrutivo com ícone de lupa */}
      <Box
        bg="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        borderRadius="16px"
        p="14px 20px"
        mb={4}
        display="flex"
        alignItems="center"
        gap={3}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          w="120px"
          h="120px"
          borderRadius="50%"
          bg="rgba(255,255,255,0.05)"
          right="-30px"
          top="-40px"
          aria-hidden="true"
        />
        <Box
          w="36px"
          h="36px"
          borderRadius="50%"
          bg="#FBC02D"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          boxShadow="0 2px 8px rgba(0,0,0,0.25)"
        >
          <Text fontSize="1rem" fontWeight="900" color="#212121" lineHeight={1}>
            🔬
          </Text>
        </Box>
        <Text fontSize="0.82rem" color="white" lineHeight="1.55" fontWeight="500" position="relative" zIndex={1}>
          {data.leadText}
        </Text>
      </Box>

      {/* Grade de Hotspots — 2 colunas */}
      <ImageDiscoveryHotspotGrid items={data.items} />

      {data.callouts && <CalloutList callouts={data.callouts} startMt={4} />}
    </Box>
  );
}

const PRAGA_STAT_CARDS = [
  {
    front: 'Perdas Mundiais (FAO)',
    back: '40% das colheitas perdidas por pragas',
    icon: BarChart3,
    bg: 'green.500',
  },
  {
    front: 'Prejuízo Econômico',
    back: 'R$ Bilhões perdidos anualmente no Brasil',
    icon: Coins,
    bg: 'orange.400',
  },
  {
    front: 'Risco Ambiental',
    back: 'Ameaça ao ecossistema local por espécies invasoras',
    icon: TreePine,
    bg: 'green.800',
  },
] as const

function PragaStatRevealCard({
  card,
}: {
  card: (typeof PRAGA_STAT_CARDS)[number]
}) {
  const [revealed, setRevealed] = useState(false)
  const Icon = card.icon

  return (
    <Box
      h="150px"
      cursor="pointer"
      position="relative"
      style={{ perspective: '1000px' }}
      onClick={() => setRevealed((current) => !current)}
      onMouseEnter={() => setRevealed(true)}
      onMouseLeave={() => setRevealed(false)}
      role="button"
      tabIndex={0}
      aria-label={`${card.front}: ${revealed ? card.back : 'revelar informação'}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setRevealed((current) => !current)
        }
      }}
    >
      <motion.div
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <Box
          position="absolute"
          inset={0}
          style={{ backfaceVisibility: 'hidden' }}
          bg={card.bg}
          color="white"
          borderRadius="18px"
          p={5}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          boxShadow="0 5px 16px rgba(46,125,50,0.18)"
        >
          <Icon size={28} strokeWidth={2.1} aria-hidden="true" />
          <Text mt={3} fontSize="0.9rem" fontWeight="800" lineHeight="1.25">
            {card.front}
          </Text>
        </Box>
        <Box
          position="absolute"
          inset={0}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          bg={card.bg}
          color="white"
          borderRadius="18px"
          p={5}
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          boxShadow="0 5px 16px rgba(46,125,50,0.18)"
        >
          <Text fontSize="0.92rem" fontWeight="800" lineHeight="1.45">
            {card.back}
          </Text>
        </Box>
      </motion.div>
    </Box>
  )
}

const PRAGA_IMPACT_IMAGE_URLS = [
  '/images/agricultura/ghabiru-plantation.webp',
  '/images/agricultura/irrigation.webp',
  '/images/pragas/mosca da carambola/1.webp',
  '/images/agricultura/irrigation2.webp',
] as const

const ATTACK_SYMPTOM_IMAGE_URLS = [
  '/images/sintomas/necrose.webp',
  '/images/sintomas/galhas.webp',
  '/images/sintomas/murcha.webp',
  '/images/encontre_herois/mosaico de virus.webp',
] as const

function PragaImpactImage({
  imageUrl,
  title,
}: {
  imageUrl: string
  title: string
}) {
  const [hasError, setHasError] = useState(false)

  return (
    <Box
      position="relative"
      minH={{ base: '150px', md: '170px' }}
      borderRadius="lg"
      overflow="hidden"
      border="1px solid"
      borderColor="green.200"
      boxShadow="sm"
      bg="green.50"
    >
      {!hasError ? (
        <Image
          src={imageUrl}
          alt={`Fotografia ilustrativa: ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          onError={() => setHasError(true)}
        />
      ) : (
        <Box
          h="full"
          minH={{ base: '150px', md: '170px' }}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={5}
          bgGradient="linear(to-br, green.50, yellow.50)"
        >
          <Text fontSize="2rem" aria-hidden="true">
            🌱
          </Text>
          <Text mt={2} fontSize="0.72rem" fontWeight="700" color="green.800">
            Fotografia de campo em breve
          </Text>
          <Text mt={1} fontSize="0.65rem" color="green.700">
            Imagem ilustrativa do impacto
          </Text>
        </Box>
      )}
    </Box>
  )
}

function PragaImpactAccordion({ impacts }: { impacts: PageImpactData['impacts'] }) {
  const [openImpact, setOpenImpact] = useState<number | null>(null)

  return (
    <VStack gap={3} align="stretch">
      {impacts.map((item, index) => {
        const isOpen = openImpact === index

        return (
          <Box
            key={item.title}
            border="1px solid"
            borderColor={isOpen ? 'green.400' : 'green.100'}
            borderRadius="16px"
            bg={isOpen ? 'green.50' : 'white'}
            overflow="hidden"
            transition="all 0.2s ease"
          >
            <Box
              as="button"
              w="full"
              display="flex"
              alignItems="center"
              gap={{ base: 3, sm: 4 }}
              p={{ base: '14px 16px', sm: '16px 20px' }}
              textAlign="left"
              cursor="pointer"
              onClick={() => setOpenImpact(isOpen ? null : index)}
              aria-expanded={isOpen}
              _hover={{ bg: 'green.50' }}
            >
              <Box
                w="44px"
                h="44px"
                borderRadius="12px"
                bg="green.600"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                fontSize="1.1rem"
                fontWeight="800"
              >
                {index + 1}
              </Box>
              <Text flex="1" fontWeight="700" fontSize="0.9rem" color="green.900">
                {item.title}
              </Text>
              <Text color="green.700" fontSize="1.2rem" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </Text>
            </Box>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <Box px={{ base: 4, sm: 5 }} pb={4} pl={{ base: 4, sm: 5 }}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 3, md: 5 }} alignItems="center">
                      <Text fontSize="0.78rem" color="gray.700" lineHeight="1.55">
                        {item.desc}
                      </Text>
                      <PragaImpactImage
                        imageUrl={PRAGA_IMPACT_IMAGE_URLS[index]}
                        title={item.title}
                      />
                    </SimpleGrid>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        )
      })}
    </VStack>
  )
}

function AttackTypeFlipCard({
  card,
}: {
  card: PageImpactData['statCards'][number]
}) {
  const [revealed, setRevealed] = useState(false)

  return (
    <Box
      h="155px"
      cursor="pointer"
      position="relative"
      style={{ perspective: '1000px' }}
      onClick={() => setRevealed((current) => !current)}
      role="button"
      tabIndex={0}
      aria-label={`${card.stat}: ${revealed ? card.label : 'revelar detalhes'}`}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          setRevealed((current) => !current)
        }
      }}
    >
      <motion.div
        style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d' }}
        animate={{ rotateY: revealed ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      >
        <Box
          position="absolute"
          inset={0}
          style={{ backfaceVisibility: 'hidden' }}
          bg={card.gradient}
          color="white"
          borderRadius="18px"
          p={4}
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          boxShadow="0 5px 16px rgba(46,125,50,0.18)"
        >
          <Text fontSize="1.5rem" fontWeight="900" lineHeight="1">
            {card.stat}
          </Text>
          <Text mt={3} fontSize="0.76rem" fontWeight="700">
            Clique para descobrir como ataca
          </Text>
        </Box>
        <Box
          position="absolute"
          inset={0}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          bg={card.gradient}
          color="white"
          borderRadius="18px"
          p={4}
          display="flex"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          boxShadow="0 5px 16px rgba(46,125,50,0.18)"
        >
          <Text fontSize="0.8rem" fontWeight="700" lineHeight="1.5">
            {card.label}
          </Text>
        </Box>
      </motion.div>
    </Box>
  )
}

function AttackSymptomImage({ imageUrl, title }: { imageUrl: string; title: string }) {
  const [hasError, setHasError] = useState(false)

  return (
    <Box
      position="relative"
      minH={{ base: '150px', md: '180px' }}
      borderRadius="md"
      overflow="hidden"
      border="1px solid"
      borderColor="green.200"
      boxShadow="sm"
      bg="green.50"
    >
      {!hasError ? (
        <Image
          src={imageUrl}
          alt={`Fotografia de campo: ${title}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'cover' }}
          onError={() => setHasError(true)}
        />
      ) : (
        <Box
          minH={{ base: '150px', md: '180px' }}
          h="full"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          px={5}
          bgGradient="linear(to-br, green.50, yellow.50)"
        >
          <Text fontSize="2rem" aria-hidden="true">🌿</Text>
          <Text mt={2} fontSize="0.72rem" fontWeight="700" color="green.800">
            Fotografia de campo em breve
          </Text>
          <Text mt={1} fontSize="0.65rem" color="green.700">
            Imagem ilustrativa do sintoma
          </Text>
        </Box>
      )}
    </Box>
  )
}

function AttackSymptomAccordion({ impacts }: { impacts: PageImpactData['impacts'] }) {
  const [openImpact, setOpenImpact] = useState<number | null>(null)

  return (
    <VStack gap={3} align="stretch">
      {impacts.map((item, index) => {
        const isOpen = openImpact === index

        return (
          <Box
            key={item.title}
            border="1px solid"
            borderColor={isOpen ? 'green.400' : 'green.100'}
            borderRadius="16px"
            bg={isOpen ? 'green.50' : 'white'}
            overflow="hidden"
            transition="all 0.2s ease"
          >
            <Box
              as="button"
              w="full"
              display="flex"
              alignItems="center"
              gap={3}
              p={{ base: '14px 16px', sm: '16px 20px' }}
              textAlign="left"
              cursor="pointer"
              onClick={() => setOpenImpact(isOpen ? null : index)}
              aria-expanded={isOpen}
              _hover={{ bg: 'green.50' }}
            >
              <Box
                w="42px"
                h="42px"
                borderRadius="12px"
                bg="green.600"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
                fontSize="1.1rem"
                fontWeight="800"
              >
                {index + 1}
              </Box>
              <Text flex="1" fontWeight="700" fontSize="0.88rem" color="green.900">
                {item.title}
              </Text>
              <Text color="green.700" fontSize="1.2rem" aria-hidden="true">
                {isOpen ? '−' : '+'}
              </Text>
            </Box>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                >
                  <Box px={{ base: 4, sm: 5 }} pb={4}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 3, md: 5 }} alignItems="center">
                      <Box>
                        <Text fontSize="1.1rem" mb={2} aria-hidden="true">
                          {index === 0 ? '🔎' : index === 1 ? '🌱' : index === 2 ? '💧' : '🦋'}
                        </Text>
                        <Text fontSize="0.8rem" color="gray.700" lineHeight="1.6">
                          {item.desc}
                        </Text>
                      </Box>
                      <AttackSymptomImage
                        imageUrl={ATTACK_SYMPTOM_IMAGE_URLS[index]}
                        title={item.title}
                      />
                    </SimpleGrid>
                  </Box>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        )
      })}
    </VStack>
  )
}

function AttackInteractivePage({ data }: { data: PageImpactData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      <Text fontSize="0.78rem" fontWeight="600" color="green.700" textAlign="center" mb={3}>
        Clique em cada tipo de ataque e sintoma para investigar como as pragas danificam as plantas!
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 3, sm: 4 }} mb={7}>
        {data.statCards.map((card) => (
          <AttackTypeFlipCard key={card.stat} card={card} />
        ))}
      </SimpleGrid>

      <SectionHeading>Principais impactos</SectionHeading>
      <AttackSymptomAccordion impacts={data.impacts} />
    </Box>
  )
}

function PragaAgricolaInteractivePage({ data }: { data: PageImpactData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      <Text
        fontSize="0.78rem"
        fontWeight="600"
        color="green.700"
        textAlign="center"
        mb={3}
      >
        Clique nas estatísticas do topo para revelar os números e selecione os impactos para explorar!
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap={{ base: 3, sm: 4 }} mb={7}>
        {PRAGA_STAT_CARDS.map((card) => (
          <PragaStatRevealCard key={card.front} card={card} />
        ))}
      </SimpleGrid>

      <SectionHeading>Principais impactos</SectionHeading>
      <PragaImpactAccordion impacts={data.impacts} />
    </Box>
  )
}

export function PageImpact({ data }: { data: PageImpactData }) {
  if (data.id === 'p04') {
    return <PragaAgricolaInteractivePage data={data} />
  }
  if (data.id === 'p09') {
    return <AttackInteractivePage data={data} />
  }

  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: 3, sm: 4 }} my={6}>
        {data.statCards.map((card) => (
          <Box
            key={card.stat}
            bg={card.gradient}
            borderRadius="18px"
            p="22px 20px"
            position="relative"
            overflow="hidden"
          >
            <Box
              position="absolute"
              w="80px"
              h="80px"
              borderRadius="50%"
              bg="rgba(255,255,255,0.08)"
              bottom="-20px"
              right="-20px"
              aria-hidden="true"
            />
            <Box w="40px" h="40px" mb={2} mx="auto">
              <Image
                src={card.imageSrc}
                alt={card.label}
                width={40}
                height={40}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </Box>
            <Text
              fontSize="1.8rem"
              fontWeight="900"
              lineHeight="1"
              mb={1}
              color={card.textColor}
            >
              {card.stat}
            </Text>
            <Text
              fontSize="0.78rem"
              fontWeight="600"
              opacity={0.9}
              lineHeight="1.4"
              color={card.textColor}
            >
              {card.label}
            </Text>
          </Box>
        ))}
      </SimpleGrid>

      <SectionHeading>Principais impactos</SectionHeading>
      <VStack gap={3} align="stretch">
        {data.impacts.map((item) => (
          <HStack
            key={item.title}
            bg="white"
            border="1px solid rgba(46,125,50,0.14)"
            borderRadius="16px"
            p={{ base: '14px 16px', sm: '16px 20px' }}
            gap={{ base: 3, sm: 4 }}
            align="flex-start"
            _hover={{
              borderColor: "#66BB6A",
              boxShadow: "0 4px 24px rgba(46,125,50,0.12)",
            }}
            transition="all 0.25s ease"
          >
            <Box
              w="44px"
              h="44px"
              borderRadius="12px"
              bg="linear-gradient(135deg, #2E7D32, #66BB6A)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              p="8px"
            >
              <Image
                src={item.imageSrc}
                alt={item.title}
                width={28}
                height={28}
                style={{
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </Box>
            <Box>
              <Text fontWeight="700" fontSize="0.9rem" color="#1B5E20" mb={1}>
                {item.title}
              </Text>
              <Text fontSize="0.78rem" color="gray.600" lineHeight="1.5">
                {item.desc}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

export function PageAlert({ data }: { data: PageAlertData }) {
  if (data.id === 'p10') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>
        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
        </PageTitle>
        <LeadText>{data.leadText}</LeadText>
        <BorderInvestigationCases data={data} />
      </Box>
    )
  }

  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      <Box
        role="alert"
        bg="linear-gradient(135deg, #B71C1C, #C62828)"
        color="white"
        borderRadius="18px"
        p={{ base: '20px 18px', sm: 6 }}
        my={6}
        display="flex"
        gap={{ base: 3, sm: 4 }}
        alignItems="flex-start"
        boxShadow="0 8px 24px rgba(198,40,40,0.3)"
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          w="200px"
          h="200px"
          borderRadius="50%"
          bg="rgba(255,255,255,0.05)"
          top="-80px"
          right="-60px"
          aria-hidden="true"
        />
        <Box
          w={{ base: '36px', sm: '48px' }}
          h={{ base: '36px', sm: '48px' }}
          flexShrink={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            src={data.alertImageSrc}
            alt={data.alertTitle}
            width={48}
            height={48}
            style={{ objectFit: "contain", filter: "brightness(0) invert(1)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </Box>
        <Box flex="1" minW={0}>
          <Text fontSize={{ base: '0.9rem', sm: '1rem' }} fontWeight="800" mb={1}>
            {data.alertTitle}
          </Text>
          <Text fontSize={{ base: '0.82rem', sm: '0.85rem' }} lineHeight="1.65" opacity={0.93}>
            {data.alertText}
          </Text>
        </Box>
      </Box>

      {data.callouts && <CalloutList callouts={data.callouts} />}

    </Box>
  );
}

type BorderCargo = {
  title: string
  description: string
  imageSrc: string
  correctAction: 'block' | 'allow'
  disease: string
  successFeedback: string
  errorFeedback: string
}

const BORDER_CARGOS: BorderCargo[] = [
  {
    title: 'Carga de Carambolas',
    description: 'Tentando entrar sem certificado sanitário.',
    imageSrc: '/images/pragas/mosca da carambola/1.webp',
    correctAction: 'block',
    disease: 'Mosca-da-carambola',
    successFeedback:
      'Uau! Se essa Mosca-da-carambola entrasse, toda a nossa produção local estaria em risco!',
    errorFeedback:
      'Atenção! Sem certificado sanitário, as frutas podem trazer uma praga perigosa. Vamos bloquear para segurança?',
  },
  {
    title: 'Carregamento de Mudas de Laranja',
    description: 'Mudas trazidas de fora sem comprovação de saúde.',
    imageSrc: '/images/doencas/fitoplasma.webp',
    correctAction: 'block',
    disease: 'Huanglongbing (HLB)',
    successFeedback:
      'Muito bem! Mudas sem comprovação podem espalhar o HLB e destruir pomares inteiros de laranja.',
    errorFeedback:
      'Atenção! Sem o selo de inspeção, essa doença destruiria as laranjeiras. Vamos bloquear para segurança?',
  },
  {
    title: 'Carregamento de Maçãs Certificadas',
    description: 'Frutas com selo de inspeção e nota fiscal.',
    imageSrc: '/images/agricultura/ghabiru-plantation.webp',
    correctAction: 'allow',
    disease: 'Carga regularizada',
    successFeedback:
      'Decisão correta! A documentação confirma que a carga foi inspecionada e pode seguir com segurança.',
    errorFeedback:
      'Atenção! Esta carga tem selo de inspeção e nota fiscal. Com a documentação regularizada, ela pode ser permitida.',
  },
]

function CargoImage({ cargo }: { cargo: BorderCargo }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Box
        h="full"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-br, green.100, orange.100)"
        fontSize="4rem"
        aria-label={`Ilustração de ${cargo.title}`}
      >
        {cargo.correctAction === 'allow' ? '📦' : '🚚'}
      </Box>
    )
  }

  return (
    <Image
      src={cargo.imageSrc}
      alt={`Ilustração da ${cargo.title}`}
      fill
      sizes="(max-width: 640px) 100vw, 520px"
      style={{ objectFit: 'cover' }}
      onError={() => setHasError(true)}
    />
  )
}

export function BorderRadarGame({ data }: { data: PageAlertData }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [inspected, setInspected] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [selectedAction, setSelectedAction] = useState<'block' | 'allow' | null>(null)

  const cargo = BORDER_CARGOS[currentIndex]
  const hasFinished = inspected === BORDER_CARGOS.length
  const isCorrect = selectedAction === cargo?.correctAction

  const handleAction = (action: 'block' | 'allow') => {
    if (selectedAction || hasFinished) return
    setSelectedAction(action)
    setInspected((value) => value + 1)
    if (action === cargo.correctAction) {
      setCorrectAnswers((value) => value + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < BORDER_CARGOS.length - 1) {
      setCurrentIndex((value) => value + 1)
      setSelectedAction(null)
    }
  }

  const restart = () => {
    setCurrentIndex(0)
    setInspected(0)
    setCorrectAnswers(0)
    setSelectedAction(null)
  }

  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>
        {data.title}
        {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
      </PageTitle>
      <LeadText>{data.leadText}</LeadText>

      <Box
        mt={5}
        p={{ base: 3, sm: 5 }}
        borderRadius="24px"
        bgGradient="linear(to-br, green.950, green.800)"
        color="white"
        position="relative"
        overflow="hidden"
        boxShadow="0 12px 34px rgba(27,94,32,0.28)"
      >
        <Box
          position="absolute"
          top="-80px"
          right="-50px"
          w="180px"
          h="180px"
          borderRadius="full"
          bg="rgba(255,152,0,0.12)"
          aria-hidden="true"
        />

        <Flex align="center" justify="space-between" gap={3} position="relative" zIndex={1}>
          <Box>
            <Text fontSize={{ base: '1.05rem', sm: '1.3rem' }} fontWeight="900">
              Radar de Fronteira
            </Text>
            <Text fontSize={{ base: '0.72rem', sm: '0.8rem' }} color="whiteAlpha.800">
              Bloqueie os Invasores!
            </Text>
          </Box>
          <Box
            px={3}
            py={2}
            borderRadius="full"
            bg="orange.400"
            color="orange.950"
            textAlign="center"
            minW="112px"
          >
            <Text fontSize="0.62rem" fontWeight="800">CARGAS INSPECIONADAS</Text>
            <Text fontSize="1.15rem" fontWeight="900" lineHeight="1.1">{inspected}/3</Text>
          </Box>
        </Flex>

        <Box
          mt={4}
          p={{ base: 3, sm: 4 }}
          borderRadius="18px"
          bg="rgba(0,0,0,0.2)"
          border="1px solid"
          borderColor="whiteAlpha.300"
          position="relative"
          zIndex={1}
        >
          {!hasFinished && cargo && (
            <>
              <Flex align="center" gap={2} mb={3}>
                <Text fontSize="1.2rem" aria-hidden="true">🛂</Text>
                <Text fontSize="0.72rem" fontWeight="800" color="orange.200">
                  MESA DE INSPEÇÃO · CASO {currentIndex + 1} DE 3
                </Text>
              </Flex>

              <Box
                h={{ base: '180px', sm: '230px' }}
                position="relative"
                overflow="hidden"
                borderRadius="14px"
                bg="green.100"
                border="3px solid"
                borderColor="orange.300"
              >
                <CargoImage cargo={cargo} />
                <Box
                  position="absolute"
                  top={3}
                  left={3}
                  px={2}
                  py={1}
                  borderRadius="full"
                  bg="red.700"
                  color="white"
                  fontSize="0.6rem"
                  fontWeight="900"
                >
                  CARGA SUSPEITA
                </Box>
              </Box>

              <Text mt={3} fontSize={{ base: '1rem', sm: '1.15rem' }} fontWeight="900">
                {cargo.title}
              </Text>
              <Text mt={1} fontSize="0.78rem" color="whiteAlpha.800" lineHeight="1.5">
                {cargo.description}
              </Text>

              {!selectedAction ? (
                <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3} mt={4}>
                  <Box
                    as="button"
                    onClick={() => handleAction('block')}
                    p={3}
                    borderRadius="12px"
                    bg="red.600"
                    color="white"
                    fontWeight="900"
                    cursor="pointer"
                    _hover={{ bg: 'red.500', transform: 'translateY(-2px)' }}
                    transition="all 0.2s ease"
                  >
                    ⛔ BLOQUEAR
                  </Box>
                  <Box
                    as="button"
                    onClick={() => handleAction('allow')}
                    p={3}
                    borderRadius="12px"
                    bg="green.500"
                    color="white"
                    fontWeight="900"
                    cursor="pointer"
                    _hover={{ bg: 'green.400', transform: 'translateY(-2px)' }}
                    transition="all 0.2s ease"
                  >
                    ✅ PERMITIR
                  </Box>
                </SimpleGrid>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Box
                    mt={4}
                    p={3}
                    borderRadius="12px"
                    bg={isCorrect ? 'green.500' : 'orange.400'}
                    color={isCorrect ? 'white' : 'orange.950'}
                  >
                    <Text fontSize="0.85rem" fontWeight="900">
                      {isCorrect ? '🎉 Decisão correta!' : '⚠️ Vamos aprender com esta decisão'}
                    </Text>
                    <Text mt={1} fontSize="0.78rem" lineHeight="1.55">
                      {isCorrect ? cargo.successFeedback : cargo.errorFeedback}
                    </Text>
                  </Box>
                  {currentIndex < BORDER_CARGOS.length - 1 && (
                    <Box
                      as="button"
                      onClick={handleNext}
                      mt={3}
                      w="full"
                      p={3}
                      borderRadius="12px"
                      bg="orange.300"
                      color="orange.950"
                      fontWeight="900"
                      cursor="pointer"
                      _hover={{ bg: 'orange.200' }}
                    >
                      Próxima carga →
                    </Box>
                  )}
                </motion.div>
              )}
            </>
          )}

          {hasFinished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box textAlign="center" py={{ base: 5, sm: 8 }}>
                <Text fontSize="3rem" aria-hidden="true">🏅</Text>
                <Text mt={2} fontSize="1.35rem" fontWeight="900" color="orange.200">
                  Defensor da Lavoura
                </Text>
                <Text mt={2} fontSize="0.82rem" color="whiteAlpha.900">
                  Você acertou {correctAnswers} de 3 decisões e protegeu a fronteira agrícola!
                </Text>
                <Box
                  as="button"
                  onClick={restart}
                  mt={5}
                  px={5}
                  py={3}
                  borderRadius="12px"
                  bg="white"
                  color="green.800"
                  fontWeight="900"
                  cursor="pointer"
                  _hover={{ bg: 'orange.100' }}
                >
                  Jogar novamente
                </Box>
              </Box>
            </motion.div>
          )}
        </Box>
      </Box>

      {data.callouts && <CalloutList callouts={data.callouts} />}
    </Box>
  )
}

const RESEARCH_STATION_IMAGES = [
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
  'https://images.unsplash.com/photo-1523240795612-9a054b0db644',
  'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
  '/assets/dona-fito/dona-fito-happy.png',
]

const RESEARCH_STATION_IMPACTS = [
  'Ajuda agricultores a produzir mais e com segurança, usando variedades adaptadas ao clima e às pragas da Amazônia.',
  'Forma profissionais e cria conhecimento para resolver problemas fitossanitários específicos de cada comunidade.',
  'Prepara técnicos para reconhecer pragas no campo e aplicar práticas de manejo sustentável.',
  'Protege a biodiversidade do Amapá ao estudar espécies nativas, pragas e aliados naturais.',
  'Entrega diagnósticos confiáveis para que o agricultor escolha o tratamento correto e evite desperdícios.',
  'A curiosidade de hoje pode virar a pesquisa que protegerá a lavoura de amanhã. Ciência também começa na escola!',
]

function StationPhoto({ src, alt, isStudent }: { src: string; alt: string; isStudent: boolean }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Box
        h="full"
        w="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bg={isStudent ? 'yellow.100' : 'green.50'}
        fontSize="3.5rem"
        aria-label={`Ilustração de ${alt}`}
      >
        {isStudent ? '🌱' : '🔬'}
      </Box>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      onError={() => setHasError(true)}
    />
  )
}

function ResearchStations({ data }: { data: PageOrgaosData }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <Box>
      <Text
        mb={4}
        px={3}
        py={2}
        borderRadius="full"
        bg="green.50"
        color="green.800"
        fontSize="0.78rem"
        fontWeight="800"
        textAlign="center"
      >
        🔬 Clique em cada estação científica para descobrir o que os pesquisadores fazem!
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} alignItems="start">
        {data.items.map((station, index) => {
          const isExpanded = expandedIndex === index
          const isStudent = index === data.items.length - 1

          return (
            <Box
              key={station.name}
              as="button"
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              w="100%"
              textAlign="left"
              cursor="pointer"
              overflow="hidden"
              borderRadius="18px"
              border="1px solid"
              borderColor={isExpanded ? 'green.500' : isStudent ? 'yellow.300' : 'green.200'}
              bg={isStudent ? 'yellow.50' : 'white'}
              boxShadow={isExpanded ? '0 8px 24px rgba(46,125,50,0.16)' : 'sm'}
              _hover={{ transform: 'translateY(-3px)', shadow: 'md' }}
              transition="all 0.25s ease"
            >
              <Box h="140px" w="100%" position="relative" overflow="hidden" borderTopRadius="lg" bg={isStudent ? 'yellow.100' : 'green.50'}>
                {!isStudent && (
                  <StationPhoto src={RESEARCH_STATION_IMAGES[index]} alt={station.name} isStudent={false} />
                )}
                {isStudent && (
                  <Box
                    position="absolute"
                    inset="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(255,193,7,0.28)"
                  >
                    <Avatar src="/assets/dona_fito_meio_corpo.webp" />
                  </Box>
                )}
                <Box
                  position="absolute"
                  left={3}
                  bottom={3}
                  px={2}
                  py={1}
                  borderRadius="full"
                  bg={isStudent ? 'yellow.500' : 'green.700'}
                  color={isStudent ? 'yellow.950' : 'white'}
                  fontSize="0.62rem"
                  fontWeight="900"
                >
                  {isStudent ? '🌟 Seu futuro na ciência' : `ESTAÇÃO ${index + 1}`}
                </Box>
              </Box>

              <Box p={{ base: 4, sm: 5 }}>
                <Flex align="center" justify="space-between" gap={3}>
                  <Text fontWeight="800" fontSize="0.95rem" color={isStudent ? 'yellow.900' : 'green.900'}>
                    {station.name}
                  </Text>
                  <Text fontSize="1.1rem" color="green.700" aria-hidden="true">
                    {isExpanded ? '−' : '+'}
                  </Text>
                </Flex>
                {!isExpanded && (
                  <Text mt={2} fontSize="0.78rem" color="gray.600" lineHeight="1.55">
                    {station.desc}
                  </Text>
                )}
                <Text mt={3} fontSize="0.68rem" fontWeight="800" color="green.700">
                  🔬 Clique para explorar a estação
                </Text>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Box mt={4} pt={4} borderTop="1px solid" borderColor="green.100">
                        <Text fontSize="0.7rem" fontWeight="900" color="green.800" textTransform="uppercase">
                          🔬 O que fazem
                        </Text>
                        <Text mt={1} fontSize="0.78rem" color="gray.700" lineHeight="1.55">
                          {station.desc}
                        </Text>
                        <Text mt={3} fontSize="0.7rem" fontWeight="900" color="orange.800" textTransform="uppercase">
                          🌱 Impacto no Amapá / Lavoura
                        </Text>
                        <Text mt={1} fontSize="0.78rem" color="gray.700" lineHeight="1.55">
                          {RESEARCH_STATION_IMPACTS[index]}
                        </Text>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Box>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

const GUARDIAN_IMAGES = [
  'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3',
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d',
  'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8',
  'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5',
  '/assets/dona_fito_meio_corpo.webp',
]

const GUARDIAN_IMPACTS = [
  'Cria regras nacionais e coordena ações que reduzem o risco de entrada e disseminação de pragas no país.',
  'Interrompe cargas ou produtos suspeitos em portos, aeroportos e fronteiras antes que alcancem novas lavouras.',
  'Protege a produção do Amapá, fiscalizando o trânsito de plantas, sementes e frutos vindos de outras regiões.',
  'Garante que sementes e mudas saudáveis cheguem ao produtor, evitando doenças desde o início da lavoura.',
  'Ao identificar e comunicar anomalias, ajuda a interromper rapidamente focos antes que atinjam outras propriedades.',
  'Ao não transportar plantas, frutos ou terra sem autorização, você fecha uma importante porta para as pragas.',
]

function GuardianCards({ data }: { data: PageOrgaosData }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  return (
    <Box>
      <Text
        mb={4}
        px={3}
        py={2}
        borderRadius="full"
        bg="green.50"
        color="green.800"
        fontSize="0.78rem"
        fontWeight="800"
        textAlign="center"
      >
        🔍 Clique em cada guardião para entender como funciona a fiscalização fitossanitária!
      </Text>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} alignItems="start">
        {data.items.map((guardian, index) => {
          const isExpanded = expandedIndex === index
          const isConsumer = index === data.items.length - 1

          return (
            <Box
              key={guardian.name}
              as="button"
              onClick={() => setExpandedIndex(isExpanded ? null : index)}
              w="100%"
              textAlign="left"
              cursor="pointer"
              overflow="hidden"
              borderRadius="18px"
              border="1px solid"
              borderColor={isExpanded ? 'green.500' : isConsumer ? 'yellow.300' : 'green.200'}
              bg={isConsumer ? 'yellow.50' : 'white'}
              boxShadow={isExpanded ? '0 8px 24px rgba(46,125,50,0.16)' : 'sm'}
              _hover={{ transform: 'translateY(-3px)', shadow: 'md' }}
              transition="all 0.25s ease"
            >
              <Box
                h="130px"
                w="100%"
                position="relative"
                overflow="hidden"
                borderTopRadius="lg"
                bg={isConsumer ? 'yellow.100' : 'green.50'}
              >
                {!isConsumer ? (
                  <StationPhoto src={GUARDIAN_IMAGES[index]} alt={guardian.name} isStudent={false} />
                ) : (
                  <Box
                    position="absolute"
                    inset="0"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="rgba(255,193,7,0.28)"
                  >
                    <Avatar src="/assets/dona_fito_meio_corpo.webp" />
                  </Box>
                )}
                <Box
                  position="absolute"
                  left={3}
                  bottom={3}
                  px={2}
                  py={1}
                  borderRadius="full"
                  bg={isConsumer ? 'yellow.500' : 'green.700'}
                  color={isConsumer ? 'yellow.950' : 'white'}
                  fontSize="0.62rem"
                  fontWeight="900"
                >
                  {isConsumer ? '🌟 Faça sua parte' : `GUARDIÃO ${index + 1}`}
                </Box>
              </Box>

              <Box p={{ base: 4, sm: 5 }}>
                <Flex align="center" justify="space-between" gap={3}>
                  <Text fontWeight="800" fontSize="0.95rem" color={isConsumer ? 'yellow.900' : 'green.900'}>
                    {guardian.name}
                  </Text>
                  <Text fontSize="1.1rem" color="green.700" aria-hidden="true">
                    {isExpanded ? '−' : '+'}
                  </Text>
                </Flex>
                {!isExpanded && (
                  <Text mt={2} fontSize="0.78rem" color="gray.600" lineHeight="1.55">
                    {guardian.desc}
                  </Text>
                )}
                <Text mt={3} fontSize="0.68rem" fontWeight="800" color="green.700">
                  🔍 Clique para explorar o guardião
                </Text>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <Box mt={4} pt={4} borderTop="1px solid" borderColor="green.100">
                        <Text fontSize="0.7rem" fontWeight="900" color="green.800" textTransform="uppercase">
                          🛡️ Atuação
                        </Text>
                        <Text mt={1} fontSize="0.78rem" color="gray.700" lineHeight="1.55">
                          {guardian.desc}
                        </Text>
                        <Text mt={3} fontSize="0.7rem" fontWeight="900" color="orange.800" textTransform="uppercase">
                          📍 Impacto
                        </Text>
                        <Text mt={1} fontSize="0.78rem" color="gray.700" lineHeight="1.55">
                          {GUARDIAN_IMPACTS[index]}
                        </Text>
                      </Box>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>
            </Box>
          )
        })}
      </SimpleGrid>
    </Box>
  )
}

export function PageOrgaos({ data }: { data: PageOrgaosData }) {
  if (data.id === 'p11') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>
        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
          {data.titleSuffix}
        </PageTitle>
        <LeadText>{data.leadText}</LeadText>
        <ResearchStations data={data} />
      </Box>
    )
  }

  if (data.id === 'p12') {
    return (
      <Box>
        <SectionBadge>{data.badgeLabel}</SectionBadge>
        <PageTitle>
          {data.title}
          {data.titleHighlight && <Highlight>{data.titleHighlight}</Highlight>}
          {data.titleSuffix}
        </PageTitle>
        <LeadText>{data.leadText}</LeadText>
        <GuardianCards data={data} />
      </Box>
    )
  }

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
        {data.items.map((o) => (
          <HStack
            key={o.name}
            bg="white"
            border="1px solid rgba(46,125,50,0.14)"
            borderRadius="16px"
            p={{ base: '14px 16px', sm: '16px 20px' }}
            gap={{ base: 3, sm: 4 }}
            align="flex-start"
            _hover={{
              borderColor: "#66BB6A",
              boxShadow: "0 4px 24px rgba(46,125,50,0.12)",
            }}
            transition="all 0.25s ease"
          >
            <Box
              w="44px"
              h="44px"
              borderRadius="12px"
              bg="linear-gradient(135deg, #2E7D32, #66BB6A)"
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              p="8px"
            >
              <Image
                src={o.imageSrc}
                alt={o.name}
                width={28}
                height={28}
                style={{
                  objectFit: "contain",
                  filter: "brightness(0) invert(1)",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </Box>
            <Box>
              <Text fontWeight="700" fontSize="0.9rem" color="#1B5E20" mb={1}>
                {o.name}
              </Text>
              <Text fontSize="0.78rem" color="gray.600" lineHeight="1.5">
                {o.desc}
              </Text>
            </Box>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
}

export function PageCase({ data }: { data: PageCaseData }) {
  const heroGradients: Record<typeof data.heroVariant, string> = {
    green: "linear-gradient(135deg, #2E7D32, #66BB6A)",
    amber: "linear-gradient(135deg, #E65100, #FF8F00)",
    teal: "linear-gradient(135deg, #00695C, #26A69A)",
    red: "linear-gradient(135deg, #B71C1C, #C62828)",
    purple: "linear-gradient(135deg, #4A148C, #6A1B9A)",
  };
  const lapbookVariants: Record<
    typeof data.heroVariant,
    PocketCard["variant"]
  > = {
    green: "green",
    amber: "amber",
    teal: "teal",
    red: "red",
    purple: "purple",
  };

  const pocketCards: PocketCard[] = data.details.map((row, i) => ({
    id: `detail-${i}`,
    emoji: "📋",
    title: row.label,
    subtitle: "Clique para ver detalhes",
    variant: lapbookVariants[data.heroVariant],
    details: [{ icon: "📌", label: row.label, value: row.value }],
  }));

  const calloutPockets: PocketCard[] = data.callouts.map((c, i) => ({
    id: `callout-${i}`,
    emoji: c.variant === "red" ? "⚠️" : "💡",
    title: c.title,
    subtitle: c.variant === "red" ? "⚠️ Alerta Importante" : "💡 Saiba mais",
    variant:
      c.variant === "red" ? "red" : c.variant === "yellow" ? "amber" : "green",
    details: [{ icon: "📌", label: c.title, value: c.text }],
    callout: { icon: c.variant === "red" ? "⚠️" : "💡", text: c.text },
  }));

  return (
    <Box>
      <SectionBadge>📍 Caso Real — Amapá</SectionBadge>

      <Box borderRadius="20px" overflow="hidden" mb={6}>
        <Box
          p={{ base: "28px 20px", md: "40px 32px" }}
          display="flex"
          alignItems="center"
          gap={6}
          flexWrap="wrap"
          bg={heroGradients[data.heroVariant]}
          color="white"
        >
          <Box
            w={{ base: "64px", md: "88px" }}
            h={{ base: "64px", md: "88px" }}
            flexShrink={0}
            borderRadius="16px"
            overflow="hidden"
            style={{
              filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.25))",
              animation: "floatIcon 4s ease-in-out infinite",
            }}
          >
            <Image
              src={data.heroImageSrc}
              alt={data.heroTitle}
              width={88}
              height={88}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </Box>
          <Box flex="1" minW="180px">
            <Text
              as="h1"
              fontSize="clamp(1.2rem, 3vw, 1.6rem)"
              fontWeight="800"
              mb={1}
              lineHeight="1.2"
            >
              {data.heroTitle}
            </Text>
            <Text fontSize="0.88rem" lineHeight="1.6" opacity={0.9}>
              {data.heroSubtitle}
            </Text>
          </Box>
        </Box>
      </Box>

      <LapbookFolder
        title="Ficha Técnica — Clique para abrir"
        subtitle="Puxe cada bolso para explorar os detalhes deste caso"
        badge="📋 Caso Real"
        cards={[...pocketCards, ...calloutPockets]}
        footerNote="Fonte: Embrapa Amapá e MAPA — dados para fins educativos."
      />
    </Box>
  );
}

export function PageChain({ data }: { data: PageChainData }) {
  const [revealed, setRevealed] = useState<Record<number, boolean>>({});

  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>

      <Box
        bg="linear-gradient(135deg, #1B5E20, #2E7D32)"
        borderRadius={{ base: '20px', sm: '24px' }}
        p={{ base: '28px 20px', sm: '40px 32px' }}
        textAlign="center"
        color="white"
        mb={6}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          w="300px"
          h="300px"
          borderRadius="50%"
          bg="rgba(255,255,255,0.04)"
          top="-80px"
          right="-80px"
          aria-hidden="true"
        />
        <Text
          as="h1"
          fontSize="clamp(1.4rem, 3.5vw, 2rem)"
          fontWeight="900"
          lineHeight="1.2"
          mb={2}
        >
          {data.heroTitle}
          {data.heroHighlight && (
            <>
              {' '}
              <Text as="span" color="#FBC02D">
                {data.heroHighlight}
              </Text>{' '}
              na mesa
            </>
          )}
        </Text>
        <Text
          fontSize="0.9rem"
          opacity={0.85}
          lineHeight="1.65"
          maxW="440px"
          mx="auto"
          mt={3}
        >
          {data.heroSubtitle}
        </Text>
      </Box>

      <SectionHeading>{data.sectionHeading}</SectionHeading>
      <LeadText>{data.leadText}</LeadText>

      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 3 }}
        gap={4}
        my={6}
        alignItems="start"
      >
        {data.chainItems.map((item, idx) => (
          <Box
            key={idx}
            h="auto"
            bg="white"
            borderWidth="1px"
            borderColor="gray.100"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="sm"
            transition="transform 0.2s, box-shadow 0.2s"
            _hover={{ transform: 'translateY(-3px)', boxShadow: 'md' }}
          >
            <Box
              position="relative"
              h="100px"
              borderTopRadius="md"
              overflow="hidden"
            >
              <Image
                src={item.imageSrc}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
              />
              <Box
                position="absolute"
                top={2}
                left={2}
                px={2}
                py={1}
                borderRadius="full"
                bg="brand.500"
                color="white"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xs"
                fontWeight="bold"
              >
                {String(idx + 1).padStart(2, '0')}
              </Box>
            </Box>
            <Box p={4}>
              <Text
                fontSize="0.9rem"
                color="#212121"
                lineHeight="1.55"
                fontWeight="700"
              >
                {item.text}
              </Text>
              <Box
                as="button"
                onClick={() => setRevealed((current) => ({ ...current, [idx]: !current[idx] }))}
                aria-expanded={Boolean(revealed[idx])}
                mt={3}
                border="0"
                bg="transparent"
                color="brand.500"
                fontSize="0.76rem"
                fontWeight="800"
                cursor="pointer"
                p={0}
                _hover={{ textDecoration: 'underline', color: 'brand.600' }}
                _focusVisible={{ outline: '2px solid', outlineColor: 'brand.500', outlineOffset: '2px' }}
              >
                {revealed[idx] ? 'Ocultar impacto' : 'Descobrir impacto ➔'}
              </Box>
              {revealed[idx] && (
                <Text mt={3} pt={3} borderTop="1px solid" borderColor="gray.100" fontSize="0.8rem" color="gray.600" lineHeight="1.6">
                  {item.studentImpact}
                </Text>
              )}
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {data.callouts && (
        <VStack gap={4} align="stretch">
          {data.callouts.map((callout, index) => (
            <Callout
              key={index}
              variant="green"
              title={callout.title}
              titleColor="orange.600"
              titleFontWeight="extrabold"
            >
              {callout.text}
            </Callout>
          ))}
        </VStack>
      )}
    </Box>
  );
}

export function PageQuiz({ data }: { data: PageQuizData }) {
  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <Quiz />
    </Box>
  );
}

export function PageFindTheHero({ data }: { data: PageFindTheHeroData }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const discoveredCount = Object.values(revealed).filter(Boolean).length;
  const allDiscovered = discoveredCount === data.characters.length;

  return (
    <Box>
      <style>{`
        @keyframes hoverGentle {
          0%, 100% { transform: rotate(-1deg) scale(1); }
          50% { transform: rotate(1deg) scale(1.02); }
        }
      `}</style>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>{data.title}</PageTitle>
      <LeadText>{data.subtitle}</LeadText>

      <Box
        display="inline-flex"
        px={3}
        py={2}
        borderRadius="full"
        bg="gray.100"
        color="gray.700"
        fontSize="0.75rem"
        fontWeight="800"
        mb={4}
      >
        Cards Descobertos: {discoveredCount} / {data.characters.length}
      </Box>

      <SimpleGrid columns={{ base: 2, sm: 3 }} gap={{ base: 3, sm: 4, md: 6 }} my={{ base: 5, sm: 8 }}>
        {data.characters.map((char) => {
          const isRevealed = revealed[char.id];
          const isHero = char.isHero;

          return (
            <motion.div
              key={char.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <Box
                h="full"
                minH={{ base: '190px', sm: '260px' }}
                p={4}
                bg={isRevealed ? (isHero ? 'green.50' : 'red.50') : undefined}
                bgGradient={!isRevealed ? 'linear(to-b, green.50, #EBF5EB)' : undefined}
                borderRadius="xl"
                border="2px solid"
                borderColor={
                  isRevealed
                    ? isHero
                      ? 'green.400'
                      : 'red.400'
                    : 'green.500'
                }
                textAlign="center"
                cursor="pointer"
                onClick={() => setRevealed((prev) => ({ ...prev, [char.id]: true }))}
                transition="all 0.3s ease"
                boxShadow="sm"
                animation={!isRevealed ? 'hoverGentle 2.5s ease-in-out infinite' : undefined}
                _hover={{ transform: 'scale(1.05)', rotate: '0deg', shadow: 'xl', cursor: 'pointer', animation: 'none' }}
                position="relative"
                overflow="hidden"
              >
                {isRevealed ? (
                  <motion.div
                    initial={{ opacity: 0, rotateY: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      src={char.imageSrc}
                      alt={char.name}
                      width={180}
                      height={150}
                      style={{
                        display: 'block',
                        width: '100px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: '2xl',
                        margin: '0 auto',
                        border: '4px solid white',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.18)',
                      }}
                    />
                    <Text
                      mt={3}
                      px={2}
                      py={1}
                      borderRadius="full"
                      bg={isHero ? 'green.100' : 'red.100'}
                      fontSize="0.62rem"
                      fontWeight="extrabold"
                      color={isHero ? 'green.800' : 'red.800'}
                      textTransform="uppercase"
                      letterSpacing="0.04em"
                    >
                      {isHero ? ' HERÓI DA LAVOURA' : ' VILÃO DA LAVOURA'}
                    </Text>
                    <Text mt={1} fontWeight="800" color="gray.800" fontSize={{ base: '0.8rem', sm: '1rem' }}>
                      {char.name}
                    </Text>
                    <Text mt={2}
                      fontSize={{ base: '0.65rem', sm: '0.82rem' }}
                      color={isHero ? 'green.700' : 'red.700'}
                      fontWeight="600"
                    >
                      {char.revealText}
                    </Text>
                  </motion.div>
                ) : (
                  <VStack h="full" justify="space-between" gap={2} py={1}>
                    <Text
                      color="green.800"
                      fontWeight="800"
                      fontSize="lg"
                      letterSpacing="0.08em"
                    >
                      QUEM SOU EU?
                    </Text>
                    <Box
                      w={{ base: '88px', sm: '104px' }}
                      h={{ base: '88px', sm: '104px' }}
                      borderRadius="full"
                      border="4px solid"
                      borderColor="green.500"
                      bg="green.100"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      position="relative"
                      boxShadow="0 4px 12px rgba(46,125,50,0.22)"
                    >
                      <Image
                        src="/assets/dona_fito_meio_corpo.webp"
                        alt="Dona Fito Investigadora"
                        width={70}
                        height={70}
                        style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'contain',
                        }}
                      />
                      <Text position="absolute" top="-3px" left="4px" fontSize="sm" aria-hidden="true">
                        ✦
                      </Text>
                      <Text position="absolute" bottom="0" right="3px" fontSize="sm" aria-hidden="true">
                        🍃
                      </Text>
                    </Box>
                    <Text
                      color="gray.700"
                      fontWeight="600"
                      fontSize="sm"
                      letterSpacing="0.02em"
                    >
                      Clique para descobrir! 
                    </Text>
                  </VStack>
                )}
              </Box>
            </motion.div>
          );
        })}
      </SimpleGrid>

      {allDiscovered && data.callouts && (
        <Box
          bg="green.50"
          border="2px solid"
          borderColor="green.400"
          borderRadius="18px"
          p={{ base: 4, sm: 5 }}
          animation="floatIcon 3s ease-in-out infinite"
        >
          <CalloutList callouts={data.callouts} startMt={0} />
        </Box>
      )}
    </Box>
  );
}

export function PageClosing({ data }: { data: PageClosingData }) {
  const pillarIcons = [Leaf, Sprout, Users, Telescope] as const

  return (
    <Box textAlign="center">
      <SectionBadge>🎓 Encerramento</SectionBadge>

      <Box
        bg="linear-gradient(160deg, #1B5E20, #2E7D32, #66BB6A)"
        borderRadius={{ base: '20px', sm: '24px' }}
        p={{ base: '32px 20px', sm: '48px 32px' }}
        color="white"
        mb={{ base: 5, sm: 7 }}
        position="relative"
        overflow="hidden"
      >
        <Box
          position="absolute"
          borderRadius="50%"
          bg="rgba(255,255,255,0.04)"
          w="250px"
          h="250px"
          top="-80px"
          right="-60px"
          aria-hidden="true"
        />
        <Box
          position="relative"
          w="110px"
          h="110px"
          mb={4}
          mx="auto"
          style={{ animation: "floatIcon 3s ease-in-out infinite" }}
        >
          <Image
            src="/images/dona-fito.webp"
            alt="Dona Fito, Guardiã da Fitossanidade"
            width={96}
            height={96}
            style={{
              objectFit: "contain",
              width: "96px",
              height: "96px",
              display: "block",
              margin: "0 auto",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <Box
            position="absolute"
            right="-4px"
            bottom="2px"
            display="flex"
            alignItems="center"
            gap={1}
            px={2}
            py={1}
            borderRadius="full"
            bg="yellow.300"
            color="green.900"
            fontSize="0.58rem"
            fontWeight="900"
            boxShadow="0 3px 10px rgba(0,0,0,0.2)"
            whiteSpace="nowrap"
          >
            <BadgeCheck size={14} strokeWidth={2.5} />
            Guardião da Fitossanidade
          </Box>
        </Box>
        <Text
          as="h1"
          fontSize="clamp(1.6rem, 4vw, 2.2rem)"
          fontWeight="900"
          lineHeight="1.2"
          mb={3}
          style={{ whiteSpace: "pre-line" }}
        >
          Parabéns, Jovem Cientista! Agora você é um Guardião Oficial da Fitossanidade!
        </Text>
        <Text
          fontSize="0.9rem"
          opacity={0.9}
          lineHeight="1.7"
          maxW="440px"
          mx="auto"
        >
          {data.heroSubtitle}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 2, sm: 2, md: 4 }} gap={{ base: 3, sm: 4 }} mb={{ base: 5, sm: 7 }}>
        {data.pillars.map((p, index) => {
          const PillarIcon = pillarIcons[index] ?? Leaf

          return (
          <Box
            key={p.label}
            bg="green.50"
            border="1.5px solid"
            borderColor="green.200"
            borderRadius="xl"
            p={4}
            textAlign="center"
            _hover={{
              borderColor: "green.400",
              transform: "translateY(-3px)",
              boxShadow: "md",
            }}
            transition="all 0.2s ease"
          >
            <Box
              w="40px"
              h="40px"
              mb={2}
              mx="auto"
              borderRadius="full"
              bg="white"
              color="green.700"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <PillarIcon size={20} strokeWidth={2.2} aria-hidden="true" />
            </Box>
            <Text fontSize="0.78rem" fontWeight="700" color="#1B5E20">
              {p.label}
            </Text>
            <Text fontSize="0.68rem" color="gray.600" mt={1} lineHeight="1.4">
              {p.sub}
            </Text>
          </Box>
          )
        })}
      </SimpleGrid>

      <Box
        bg="#FBC02D"
        borderRadius="18px"
        p="24px 28px"
        display="flex"
        flexDir="column"
        alignItems="center"
        gap={1}
        mb={6}
      >
        <Text fontSize="1rem" fontWeight="800" color="#212121">
          {data.ctaText}
        </Text>
        <Text fontSize="0.82rem" color="gray.700">
          {data.ctaSub}
        </Text>
      </Box>

      <Callout
        variant={data.callout.variant}
        title={data.callout.title}
      >
        {data.callout.text}
      </Callout>

      <Box textAlign="center" mt={8} pb={5}>
        <Box w="80px" h="2px" bg="green.200" mx="auto" borderRadius="full" />
        <Text
          fontSize="0.78rem"
          color="#2E7D32"
          fontWeight="600"
          mt={4}
          letterSpacing="0.05em"
        >
          {data.footerText}
        </Text>
      </Box>
    </Box>
  );
}

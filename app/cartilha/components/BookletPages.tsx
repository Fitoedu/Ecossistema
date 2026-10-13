"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Box, Grid, HStack, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Apple, BarChart3, Coins, Droplets, Leaf, Sun, TreePine } from "lucide-react";
import LiftTheFlap from "./LiftTheFlap";
import LapbookFolder, { type PocketCard } from "./LapbookFolder";
import { PestCardGrid } from "./PestCard";
import PestModalGallery from "./PestModalGallery";
import Quiz from "./Quiz";
import { ImageDiscoveryHotspotGrid } from "./ImageDiscoveryHotspot";
import InvasivePlantGallery from "./InvasivePlantGallery";
import AllyGallery from "./AllyGallery";
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
} from "../data/cartilha-data";
import { Avatar } from "./Avatar";
import BeforeAfterSlider from "./BeforeAfterSlider";
import MascotSpeech from "./MascotSpeech";
import DragAndDropSorter from "./DragAndDropSorter";

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
}: {
  variant?: CalloutData["variant"];
  title: string;
  children: React.ReactNode;
  mt?: number | string;
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
          fontWeight="700"
          mb={1}
          color={s.titleColor}
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
   Renderiza 4 cards semânticos com ícone textual, título e fundo suave.
   Sem emojis inline — os ícones são renderizados como texto tipográfico
   dentro de um Box com fundo de acento, mantendo o visual académico.
──────────────────────────────────────────────────────────────────────────── */

const PILARES = [
  {
    symbol: '\u03A6',  // Φ — representa Fito / ciência vegetal
    label: 'O que é Fitossanidade?',
    desc: 'A ciência que cuida da saúde das plantas e garante colheitas saudáveis.',
    accentBg: '#E8F5E9',
    accentColor: '#2E7D32',
    borderColor: 'rgba(46,125,50,0.18)',
  },
  {
    symbol: '\u25B2',  // ▲ — triângulo de alerta/atenção
    label: 'O que são Pragas Agrícolas?',
    desc: 'Organismos que atacam plantas e causam perdas na produção de alimentos.',
    accentBg: '#FFF3E0',
    accentColor: '#E65100',
    borderColor: 'rgba(230,81,0,0.18)',
  },
  {
    symbol: '\u25CE',  // ◎ — alvo/localização
    label: 'Casos Reais da Região Norte',
    desc: 'Pragas e doenças que já afetaram lavouras do Amapá e da Amazônia.',
    accentBg: '#E3F2FD',
    accentColor: '#1565C0',
    borderColor: 'rgba(21,101,192,0.18)',
  },
  {
    symbol: '\u25A0',  // ■ — bloco/proteção/escudo
    label: 'Como Proteger e Evitar',
    desc: 'Técnicas e boas práticas para prevenir e controlar pragas com segurança.',
    accentBg: '#F3E5F5',
    accentColor: '#6A1B9A',
    borderColor: 'rgba(106,27,154,0.18)',
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
            bg="white"
            border={`1.5px solid ${p.borderColor}`}
            borderRadius="16px"
            p={{ base: '14px 16px', sm: '16px 18px' }}
            display="flex"
            alignItems="flex-start"
            gap={3}
            boxShadow="0 2px 8px rgba(0,0,0,0.05)"
            h="full"
            cursor="pointer"
            transition="transform 0.2s ease, box-shadow 0.2s ease"
            _hover={{ transform: 'translateY(-3px)', shadow: 'md' }}
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
            {/* Símbolo tipográfico como ícone */}
            <Box
              w="36px"
              h="36px"
              borderRadius="10px"
              bg={p.accentBg}
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexShrink={0}
              aria-hidden="true"
            >
              <Text
                fontSize="1.1rem"
                fontWeight="800"
                color={p.accentColor}
                lineHeight="1"
                userSelect="none"
              >
                {p.symbol}
              </Text>
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
        <SectionBadge>{data.badgeLabel}</SectionBadge>

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

        {/* Prompt pedagógico — Dona Fito introduz a atividade */}
        <Box mb={5}>
          <MascotSpeech
            speech={
              <>
                Agora é a sua vez de praticar! Classifique cada ação
                abaixo em{' '}
                <Text as="strong" color="#2E7D32">
                  Prática Segura
                </Text>{' '}
                ou{' '}
                <Text as="strong" color="#BF360C">
                  Risco Fitossanitário
                </Text>
                . Você pode clicar ou arrastar os cartões!
              </>
            }
            variant="question"
            delay={0.1}
          />
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
  onSelectItem: (item: import('../data/cartilha-data').PestGalleryItemData, index: number) => void
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
  '/imagens/impactos/reducao-producao.jpg',
  '/imagens/impactos/aumento-custos.jpg',
  '/imagens/impactos/bloqueio-exportacoes.jpg',
  '/imagens/impactos/mudancas-climaticas.jpg',
] as const

const ATTACK_SYMPTOM_IMAGE_URLS = [
  '/imagens/sintomas/mancha.jpg',
  '/imagens/sintomas/galha.jpg',
  '/imagens/sintomas/murcha.jpg',
  '/imagens/sintomas/transmissao-virus.jpg',
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
  const pestCards = data.pragaCards?.map((p) => ({
    emoji: "🚨",
    name: p.title,
    severity: "Praga Quarentenária" as const,
    description: p.desc,
    variant: "red" as const,
    impact: {
      headline: "Ameaça à Agricultura",
      items: [
        { icon: "⚠️", text: p.desc },
        { icon: "🌾", text: "Controle oficial obrigatório pelo MAPA." },
        { icon: "🚫", text: "Pode bloquear exportações de frutas e vegetais." },
      ],
    },
  }));

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

      {pestCards && pestCards.length > 0 && (
        <>
          <Divider />
          <SectionHeading>
            Exemplos no Brasil — clique para ver o impacto!
          </SectionHeading>
          <PestCardGrid cards={pestCards} />
        </>
      )}
    </Box>
  );
}

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
        <Box
          display="inline-block"
          fontSize="0.72rem"
          textTransform="uppercase"
          letterSpacing="0.1em"
          fontWeight="700"
          bg="rgba(255,255,255,0.2)"
          px="14px"
          py="5px"
          borderRadius="999px"
          mb={4}
        >
          🌾 Reflexão
        </Box>
        <Text
          as="h1"
          fontSize="clamp(1.4rem, 3.5vw, 2rem)"
          fontWeight="900"
          lineHeight="1.2"
          mb={2}
        >
          {data.heroTitle}
          <Text as="span" color="#FBC02D">
            {data.heroHighlight}
          </Text>{" "}
          na mesa
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

      <VStack gap={0} align="stretch" my={6}>
        {data.chainItems.map((item, idx) => (
          <Box key={idx}>
            <HStack gap={4} py={2} align="center">
              <VStack gap={0} align="center" w="36px" flexShrink={0}>
                <Box
                  w="14px"
                  h="14px"
                  borderRadius="50%"
                  bg="#2E7D32"
                  flexShrink={0}
                />
                {idx < data.chainItems.length - 1 && (
                  <Box
                    w="2px"
                    h="28px"
                    bg="linear-gradient(to bottom, #2E7D32, #66BB6A)"
                    mx="auto"
                  />
                )}
              </VStack>
              <Box w="32px" h="32px" flexShrink={0}>
                <Image
                  src={item.imageSrc}
                  alt={item.text.slice(0, 30)}
                  width={32}
                  height={32}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </Box>
              <Text
                fontSize="0.88rem"
                color="#212121"
                lineHeight="1.5"
                fontWeight="500"
              >
                {item.text}
              </Text>
            </HStack>
          </Box>
        ))}
      </VStack>

      {data.callouts && <CalloutList callouts={data.callouts} />}
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

  const handleReveal = (id: string) => {
    setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box>
      <SectionBadge>{data.badgeLabel}</SectionBadge>
      <PageTitle>{data.title}</PageTitle>
      <LeadText>{data.subtitle}</LeadText>

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
                p={{ base: 3, sm: 4 }}
                bg={isRevealed ? (isHero ? 'green.50' : 'red.50') : 'white'}
                borderRadius={{ base: '16px', sm: '20px' }}
                border="2px solid"
                borderColor={
                  isRevealed
                    ? isHero
                      ? 'green.200'
                      : 'red.200'
                    : 'gray.200'
                }
                textAlign="center"
                cursor="pointer"
                onClick={() => handleReveal(char.id)}
                transition="all 0.3s ease"
                boxShadow={
                  isRevealed
                    ? `0 10px 25px -5px ${
                        isHero ? 'rgba(67, 160, 71, 0.2)' : 'rgba(229, 57, 53, 0.2)'
                      }`
                    : 'sm'
                }
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: 'xl',
                }}
                position="relative"
                overflow="hidden"
              >
                <motion.div
                  animate={{ scale: isRevealed ? 1.1 : 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <Image
                    src={char.imageSrc}
                    alt={char.name}
                    width={100}
                    height={100}
                    style={{
                      margin: '0 auto',
                      borderRadius: '50%',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                      border: `4px solid ${
                        isRevealed
                          ? isHero
                            ? '#4CAF50'
                            : '#F44336'
                          : 'white'
                      }`,
                      width: '100%',
                      maxWidth: '100px',
                      height: 'auto',
                    }}
                  />
                </motion.div>
                <Text fontWeight="700" mt={3} fontSize={{ base: '0.78rem', sm: '1rem' }} color="gray.800">
                  {char.name}
                </Text>
                {isRevealed && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Título herói/vilão */}
                    <Text
                      fontSize={{ base: '0.7rem', sm: 'md' }}
                      color={isHero ? 'green.800' : 'red.800'}
                      fontWeight="black"
                      textTransform="uppercase"
                      mt={2}
                      mb={1}
                    >
                      {isHero ? 'HERÓI!' : 'VILÃO!'}
                    </Text>

                    {/* Texto de revelação */}
                    <Text
                      fontSize={{ base: '0.65rem', sm: 'sm' }}
                      color={isHero ? 'green.700' : 'red.700'}
                      fontWeight="medium"
                    >
                      {char.revealText}
                    </Text>
                  </motion.div>
                )}
              </Box>
            </motion.div>
          );
        })}
      </SimpleGrid>

      {data.callouts && <CalloutList callouts={data.callouts} startMt={4} />}
    </Box>
  );
}

export function PageClosing({ data }: { data: PageClosingData }) {
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
          w="80px"
          h="80px"
          mb={4}
          mx="auto"
          borderRadius="20px"
          overflow="hidden"
          style={{ animation: "floatIcon 3s ease-in-out infinite" }}
        >
          <Image
            src={data.heroImageSrc}
            alt={data.heroTitle}
            width={80}
            height={80}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </Box>
        <Text
          as="h1"
          fontSize="clamp(1.6rem, 4vw, 2.2rem)"
          fontWeight="900"
          lineHeight="1.2"
          mb={3}
          style={{ whiteSpace: "pre-line" }}
        >
          {data.heroTitle}
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
        {data.pillars.map((p) => (
          <Box
            key={p.label}
            bg="white"
            borderRadius="16px"
            p="20px 14px"
            textAlign="center"
            border="1px solid rgba(46,125,50,0.14)"
            _hover={{
              transform: "translateY(-4px)",
              boxShadow: "0 4px 24px rgba(46,125,50,0.12)",
            }}
            transition="all 0.25s ease"
          >
            <Box
              w="40px"
              h="40px"
              mb={2}
              mx="auto"
              borderRadius="10px"
              overflow="hidden"
            >
              <Image
                src={p.imageSrc}
                alt={p.label}
                width={40}
                height={40}
                style={{ objectFit: "contain", width: "100%", height: "100%" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </Box>
            <Text fontSize="0.78rem" fontWeight="700" color="#1B5E20">
              {p.label}
            </Text>
            <Text fontSize="0.68rem" color="gray.600" mt={1} lineHeight="1.4">
              {p.sub}
            </Text>
          </Box>
        ))}
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
        <Text fontSize="40px">🌿🍃🌾🫐🌴</Text>
        <Text
          fontSize="0.78rem"
          color="#2E7D32"
          fontWeight="600"
          mt={3}
          letterSpacing="0.05em"
        >
          {data.footerText}
        </Text>
      </Box>
    </Box>
  );
}

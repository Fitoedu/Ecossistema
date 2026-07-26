"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Box, Grid, HStack, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaHandPointer } from 'react-icons/fa';
import LiftTheFlap from "./LiftTheFlap";
import LapbookFolder, { type PocketCard } from "./LapbookFolder";
import { PestCardGrid } from "./PestCard";
import Quiz from "./Quiz";
import { ImageDiscoveryHotspotGrid } from "./ImageDiscoveryHotspot";
import type {
  PageCoverData,
  PageContentData,
  PageLapbookData,
  PageHotspotData,
  PageImpactData,
  PageAlertData,
  PageOrgaosData,
  PageCaseData,
  PageChainData,
  PageQuizData,
  PageClosingData,
  CalloutData,
  ImageCardData,
} from "../data/cartilha-data";
import { Avatar } from "./Avatar";

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
  imageSrc,
  title,
  children,
  mt,
}: {
  variant?: CalloutData["variant"];
  imageSrc: string;
  title: string;
  children: React.ReactNode;
  mt?: number | string;
}) {
  const styles = {
    green: {
      bg: "#E8F5E9",
      border: "rgba(46,125,50,0.2)",
      titleColor: "#1B5E20",
    },
    yellow: {
      bg: "#FFF9C4",
      border: "rgba(251,192,45,0.4)",
      titleColor: "#F57F17",
    },
    red: {
      bg: "#FFEBEE",
      border: "rgba(198,40,40,0.2)",
      titleColor: "#C62828",
    },
  };
  const s = styles[variant];
  return (
    <HStack
      bg={s.bg}
      border={`1px solid ${s.border}`}
      borderRadius="16px"
      p="20px 24px"
      mt={mt}
      align="flex-start"
      gap={4}
    >
      <IconImg src={imageSrc} alt={title} size={36} />
      <Box>
        <Text
          display="block"
          fontSize="0.95rem"
          fontWeight="700"
          mb={1}
          color={s.titleColor}
        >
          {title}
        </Text>
        <Text fontSize="0.9rem" lineHeight="1.65" color="#212121">
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
   FLIP CARD COMPONENT
───────────────────────────────────────────────────────────────────────── */

interface FlipCardProps {
  card: ImageCardData;
}

function FlipCard({ card }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(true);
  const { imageSrc, label, alt, display } = card;

  // Ensure the card has enough height for the back content, especially for 'full' display
  const cardHeight = display === "full" ? "280px" : "150px";

  return (
    <Box
      style={{ perspective: "1000px" }}
      h={cardHeight}
      cursor="pointer"
      onClick={() => setIsFlipped((prev) => !prev)}
      position="relative" // Main container for the card, used for icon positioning
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Card Front */}
        <Box
          position="absolute"
          inset={0}
          style={{ backfaceVisibility: "hidden" }}
          bg="white"
          border="1px solid"
          borderColor="rgba(46,125,50,0.14)"
          borderRadius="16px"
          p="20px 12px"
          textAlign="center"
          display="flex"
          flexDir="column"
          alignItems="center"
          gap={2}
          boxShadow="0 4px 12px rgba(0,0,0,0.08)"
        >
          <Box
            w={display === "full" ? "full" : "52px"}
            h={display === "full" ? "180px" : "52px"}
            borderRadius="12px"
            overflow="hidden"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
          >
            <Image
              src={imageSrc}
              alt={alt}
              width={display === "full" ? 500 : 52}
              height={display === "full" ? 180 : 52}
              style={{
                objectFit: display === "full" ? "cover" : "contain",
                width: "100%",
                height: "100%",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </Box>
          {display === "full" && (
            <Box w="80%" h="1px" bg="rgba(46,125,50,0.2)" my={2} />
          )}
          <Text
            fontSize="0.75rem"
            fontWeight="600"
            color="#2E7D32"
            lineHeight="1.3"
            textAlign="center"
          >
            {label}
          </Text>
        </Box>

        {/* Card Back */}
        <Box
          position="absolute"
          inset={0}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          bg="#E8F5E9"
          border="1px solid"
          borderColor="rgba(46,125,50,0.2)"
          borderRadius="16px"
          p="20px"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          boxShadow="0 4px 12px rgba(0,0,0,0.08)"
          overflow="visible" // Ensure icon can spill out
        >
          {/* Hand Icon - moved to the back face */}
          {isFlipped && ( // Only show icon when back face is visible
            <motion.div
              animate={{ y: [0, -8, 0], x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                top: -8,
                right: -8,
                zIndex: 10,
                filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.3))',
                color: 'white',
                fontSize: '1.8rem',
                pointerEvents: 'none',
                transform: 'rotateY(180deg)', // Un-flip the icon so it's not mirrored
              }}
            >
              <FaHandPointer />
            </motion.div>
          )}
          <Text fontSize="0.9rem" color="#1B5E20" fontWeight="500">
            Aqui vai a explicação sobre este tópico...
          </Text>
        </Box>
      </motion.div>
    </Box>
  );
}

function IconCardsGrid({ cards }: { cards: ImageCardData[] }) {
  const cols = Math.min(cards.length, 4);
  return (
    <Grid
      templateColumns={{ base: "repeat(2, 1fr)", md: `repeat(${cols}, 1fr)` }}
      gap={6} // Increased gap for better 3D spacing
      my={6}
    >
      {cards.map((card) => (
        <FlipCard key={card.label} card={card} />
      ))}
    </Grid>
  );
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
          imageSrc={c.imageSrc}
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
      p="28px 24px"
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
        fontSize="clamp(1.3rem, 3.5vw, 1.9rem)"
        fontWeight="900"
        lineHeight="1.2"
        mb={1}
        letterSpacing="-0.02em"
      >
        {title}
      </Text>
      <Text fontSize="0.85rem" opacity={0.85} lineHeight="1.65">
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
          p="28px 20px 24px"
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
        p="20px"
        display="flex"
        gap={4}
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
          <Box
            w="60px"
            h="60px"
            borderRadius="50%"
            position="relative"
            overflow="hidden"
            bg="linear-gradient(135deg, #A5D6A7, #2E7D32)"
            boxShadow={[
              "0 1px 0 rgba(255,255,255,0.5) inset",
              "0 6px 20px rgba(46,125,50,0.30)",
              "0 2px 6px rgba(0,0,0,0.12)",
            ].join(", ")}
            border="3px solid white"
            role="img"
            aria-label="Dona Fito — mascote do EducaFito"
          >
            <Image
              src="/assets/dona_fito_meio_corpo.png"
              alt="Dona Fito"
              fill
              sizes="60px"
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
            />
          </Box>
          {/* Name tag below avatar */}
          <Box
            mt={1}
            textAlign="center"
            bg="#E8F5E9"
            borderRadius="999px"
            px={2}
            py="2px"
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
              Olá, pequeno cientista!{" "}
              <Text as="span" fontWeight="800" color="#2E7D32">
                Estão prontos
              </Text>{" "}
              para levantar as folhas e descobrir os segredos da{" "}
              <Text
                as="span"
                fontWeight="800"
                bgGradient="to-r"
                gradientFrom="#F57F17"
                gradientTo="#FBC02D"
                bgClip="text"
              >
                fitossanidade
              </Text>
              ? 🔬🌿
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
    <VStack gap={0} textAlign="center" py={2} pb={6}>
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

      {/* ── Plant Cards ── */}
      <Box w="full" maxW="480px" mx="auto" mb={8} position="relative">
        {/* VS badge centred between the two cards */}
        <Box
          position="absolute"
          left="50%"
          top="50%"
          transform="translate(-50%, -50%)"
          bg="white"
          borderRadius="50%"
          w="38px"
          h="38px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="11px"
          fontWeight="800"
          color="#1B5E20"
          boxShadow={[
            "0 1px 0 rgba(255,255,255,0.9) inset",
            "0 4px 12px rgba(46,125,50,0.20)",
            "0 2px 4px rgba(0,0,0,0.10)",
          ].join(", ")}
          border="2px solid rgba(46,125,50,0.18)"
          zIndex={10}
          aria-hidden="true"
        >
          VS
        </Box>

        <HStack gap={3} align="stretch">
          <motion.div
            style={{ flex: 1, minWidth: 0, display: "flex" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          >
            <PlantCard
              variant="healthy"
              emoji="🌿"
              title="Planta Saudável"
              desc="Folhas verdes e viçosas, crescimento forte e colheita abundante."
              gradient="linear-gradient(145deg, #C8E6C9 0%, #A5D6A7 60%, #81C784 100%)"
              accentColor="#2E7D32"
              textColor="#1B5E20"
              glowColor="rgba(46,125,50,0.20)"
              patternA="rgba(255,255,255,0.18)"
              patternB="rgba(255,255,255,0.12)"
            />
          </motion.div>

          <motion.div
            style={{ flex: 1, minWidth: 0, display: "flex" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
          >
            <PlantCard
              variant="sick"
              emoji="🍂"
              title="Planta Doente"
              desc="Manchas, folhas murchas e frutos danificados por pragas e doenças."
              gradient="linear-gradient(145deg, #FFCDD2 0%, #EF9A9A 60%, #E57373 100%)"
              accentColor="#C62828"
              textColor="#7F1D1D"
              glowColor="rgba(198,40,40,0.18)"
              patternA="rgba(255,255,255,0.16)"
              patternB="rgba(255,255,255,0.10)"
            />
          </motion.div>
        </HStack>
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

      {/* ── Tags ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut", delay: 0.36 }}
      >
        <HStack flexWrap="wrap" gap={2} justify="center" mb={8}>
          {data.tags.map((tag) => (
            <Box
              key={tag.label}
              bg="rgba(46,125,50,0.1)"
              color="#2E7D32"
              border="1px solid rgba(46,125,50,0.2)"
              borderRadius="999px"
              fontSize="0.72rem"
              fontWeight="600"
              px={3}
              py={1}
            >
              {tag.label}
            </Box>
          ))}
        </HStack>
      </motion.div>

      {/* ── Persona ── */}
      <Box w="full" maxW="480px" mx="auto">
        <Avatar/>
      </Box>
    </VStack>
  );
}

export function PageContent({ data }: { data: PageContentData }) {
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
          imageSrc={data.topCallout.imageSrc}
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
            p="16px 20px"
            gap={4}
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
        p={6}
        my={6}
        display="flex"
        gap={4}
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
          w="48px"
          h="48px"
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
        <Box>
          <Text fontSize="1rem" fontWeight="800" mb={1}>
            {data.alertTitle}
          </Text>
          <Text fontSize="0.85rem" lineHeight="1.65" opacity={0.93}>
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
            p="16px 20px"
            gap={4}
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
        borderRadius="24px"
        p="40px 32px"
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

export function PageClosing({ data }: { data: PageClosingData }) {
  return (
    <Box textAlign="center">
      <SectionBadge>🎓 Encerramento</SectionBadge>

      <Box
        bg="linear-gradient(160deg, #1B5E20, #2E7D32, #66BB6A)"
        borderRadius="24px"
        p="48px 32px"
        color="white"
        mb={7}
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

      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4} mb={7}>
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
        imageSrc={data.callout.imageSrc}
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

'use client'

/**
 * AmapaDossierModal.tsx — EducaFito
 * Modal de Dossiê Investigativo com 3 abas — Paleta Botânica Clara (Light Mode).
 * Usa Portal do Chakra UI v3 para z-index perfeito.
 * Todas as interações mantidas; tema escuro completamente removido.
 */

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Box,
  Text,
  Portal,
  DialogRoot,
  DialogBackdrop,
  DialogPositioner,
  DialogContent,
  DialogCloseTrigger,
  VStack,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react'
import {
  Bug,
  Microscope,
  ShieldAlert,
  X,
  AlertTriangle,
  Leaf,
  MapPin,
  CheckCircle2,
  Image as ImageIcon,
  Info,
  FileText,
} from 'lucide-react'
import type { AmapaCaseData, SymptomItem, CombatAction } from '../../../data/amapa-cases-data'
import { getThreatLabel, getThreatColors } from '../../../data/amapa-cases-data'

/* ─── Tipos ───────────────────────────────────────────────────────────────── */

type TabId = 'invasor' | 'diagnostico' | 'combate'

interface TabConfig {
  id: TabId
  label: string
  Icon: React.ElementType
}

const TABS: TabConfig[] = [
  { id: 'invasor', label: 'O Invasor', Icon: Bug },
  { id: 'diagnostico', label: 'Diagnóstico & Sintomas', Icon: Microscope },
  { id: 'combate', label: 'Ações de Combate', Icon: ShieldAlert },
]

/* ─── Paleta light por nível de ameaça ────────────────────────────────────── */

function getModalColors(level: AmapaCaseData['threatLevel']) {
  if (level === 'quarentenaria') {
    return {
      headerBg: 'linear-gradient(135deg, #B91C1C, #DC2626)',
      badgeBg: '#FEF2F2',
      badgeBorder: '#FECACA',
      badgeText: '#B91C1C',
      tabActive: '#DC2626',
      tabActiveBg: '#FEF2F2',
      tabActiveBorder: '#FECACA',
      sectionBg: '#FEF2F2',
      sectionBorder: '#FECACA',
      sectionText: '#991B1B',
      indicatorGrad: 'linear-gradient(90deg, #DC2626, #EF4444)',
      iconBg: '#DC2626',
    }
  }
  if (level === 'alerta-critico') {
    return {
      headerBg: 'linear-gradient(135deg, #C2410C, #EA580C)',
      badgeBg: '#FFF7ED',
      badgeBorder: '#FED7AA',
      badgeText: '#C2410C',
      tabActive: '#EA580C',
      tabActiveBg: '#FFF7ED',
      tabActiveBorder: '#FED7AA',
      sectionBg: '#FFF7ED',
      sectionBorder: '#FED7AA',
      sectionText: '#9A3412',
      indicatorGrad: 'linear-gradient(90deg, #EA580C, #F97316)',
      iconBg: '#EA580C',
    }
  }
  return {
    headerBg: 'linear-gradient(135deg, #15803D, #16A34A)',
    badgeBg: '#F0FDF4',
    badgeBorder: '#BBF7D0',
    badgeText: '#15803D',
    tabActive: '#16A34A',
    tabActiveBg: '#F0FDF4',
    tabActiveBorder: '#BBF7D0',
    sectionBg: '#F0FDF4',
    sectionBorder: '#BBF7D0',
    sectionText: '#14532D',
    indicatorGrad: 'linear-gradient(90deg, #16A34A, #22C55E)',
    iconBg: '#16A34A',
  }
}

/* ─── Mapa de ícones de sintoma ───────────────────────────────────────────── */

const SYMPTOM_ICON_MAP: Record<SymptomItem['iconName'], React.ElementType> = {
  AlertTriangle,
  Leaf,
  Bug,
  Microscope,
  Image: ImageIcon,
  MapPin,
  ShieldAlert,
}

/* ─── Subcomponentes ─────────────────────────────────────────────────────── */

/** Imagem com fallback — usada no header e aba 1 */
function DossierImage({ src, alt, light = false }: { src: string; alt: string; light?: boolean }) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <Box
        w="full"
        h="full"
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        gap={2}
        bg={light ? 'gray.100' : 'gray.200'}
      >
        <ImageIcon size={36} color="#9CA3AF" aria-hidden="true" />
        <Text fontSize="0.7rem" color="gray.500">
          Imagem não disponível
        </Text>
      </Box>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 700px"
      style={{ objectFit: 'cover' }}
      onError={() => setHasError(true)}
    />
  )
}

/** Imagem de detalhe do sintoma */
function SymptomDetailImage({ src, alt }: { src: string; alt: string }) {
  const [hasError, setHasError] = useState(false)
  if (hasError || !src) return null

  return (
    <Box
      position="relative"
      w="full"
      h="130px"
      mt={2.5}
      borderRadius="10px"
      overflow="hidden"
      bg="gray.100"
      border="1px solid"
      borderColor="gray.200"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, 340px"
        style={{ objectFit: 'cover' }}
        onError={() => setHasError(true)}
      />
    </Box>
  )
}

/* ─── Aba 1: O Invasor ─────────────────────────────────────────────────────── */

function TabInvasor({ item, mc }: { item: AmapaCaseData; mc: ReturnType<typeof getModalColors> }) {
  return (
    <VStack align="stretch" gap={4}>
      {/* Imagem ampliada com moldura */}
      <Box
        position="relative"
        h={{ base: '200px', sm: '255px' }}
        w="full"
        borderRadius="16px"
        overflow="hidden"
        border="2px solid"
        borderColor={mc.badgeBorder}
        boxShadow={`0 4px 20px ${mc.badgeBorder}`}
        bg="gray.100"
      >
        <DossierImage src={item.invasorImageSrc} alt={item.invasorImageAlt} light />
        {/* Badge sobreposto */}
        <Box
          position="absolute"
          bottom={3}
          left={3}
          display="flex"
          alignItems="center"
          gap="5px"
          px={2.5}
          py={1}
          borderRadius="full"
          bg="rgba(255,255,255,0.92)"
          border="1px solid"
          borderColor={mc.badgeBorder}
          color={mc.badgeText}
          fontSize="0.6rem"
          fontWeight="800"
          letterSpacing="0.07em"
          boxShadow="0 1px 6px rgba(0,0,0,0.1)"
        >
          <MapPin size={9} aria-hidden="true" />
          {getThreatLabel(item.threatLevel)} — Amapá
        </Box>
      </Box>

      {/* Headline */}
      <Box>
        <Text
          fontSize={{ base: '1rem', sm: '1.12rem' }}
          fontWeight="900"
          color="gray.800"
          lineHeight="1.3"
          mb={2}
        >
          {item.invasorHeadline}
        </Text>
        <Text
          fontSize={{ base: '0.83rem', sm: '0.88rem' }}
          color="gray.900"
          fontWeight="500"
          lineHeight="1.6"
        >
          {item.invasorDescription}
        </Text>
      </Box>

      {/* Box de contexto regional */}
      <Box
        p={4}
        borderRadius="14px"
        bg={mc.sectionBg}
        border="1px solid"
        borderColor={mc.sectionBorder}
      >
        <HStack align="flex-start" gap={3} mb={2}>
          <Box
            w="28px"
            h="28px"
            borderRadius="8px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexShrink={0}
            style={{ background: mc.iconBg }}
          >
            <MapPin size={14} color="white" aria-hidden="true" />
          </Box>
          <Text
            fontSize="0.7rem"
            fontWeight="900"
            color={mc.sectionText}
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            Situação na Região Norte / Amapá
          </Text>
        </HStack>
        <Text fontSize="0.82rem" color="gray.900" fontWeight="500" lineHeight="1.6">
          {item.invasorRegionText}
        </Text>
      </Box>
    </VStack>
  )
}

/* ─── Aba 2: Diagnóstico & Sintomas ─────────────────────────────────────── */

function TabDiagnostico({ item, mc }: { item: AmapaCaseData; mc: ReturnType<typeof getModalColors> }) {
  return (
    <VStack align="stretch" gap={3}>
      <Text
        fontSize="0.7rem"
        color="gray.700"
        fontWeight="bold"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        Identifique os danos causados às plantas
      </Text>

      {item.symptoms.map((symptom, idx) => {
        const SymptomIcon = SYMPTOM_ICON_MAP[symptom.iconName]
        return (
          <motion.div
            key={`${item.id}-symptom-${idx}`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.28, delay: idx * 0.07 }}
          >
            <Box
              p={4}
              borderRadius="14px"
              bg="white"
              border="1px solid"
              borderColor="gray.200"
              boxShadow="0 1px 4px rgba(0,0,0,0.04)"
            >
              <HStack align="flex-start" gap={3} mb={symptom.imageSrc ? 2 : 0}>
                {/* Ícone */}
                <Box
                  w="34px"
                  h="34px"
                  borderRadius="10px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexShrink={0}
                  style={{ background: mc.iconBg }}
                >
                  <SymptomIcon size={16} color="white" aria-hidden="true" />
                </Box>
                <Box flex={1}>
                  <Text fontSize="0.85rem" fontWeight="800" color="gray.800" mb={0.5} lineHeight="1.3">
                    {symptom.title}
                  </Text>
                  <Text fontSize="0.78rem" color="gray.900" fontWeight="500" lineHeight="1.6">
                    {symptom.description}
                  </Text>
                </Box>
              </HStack>
              {symptom.imageSrc && (
                <SymptomDetailImage src={symptom.imageSrc} alt={symptom.imageAlt ?? ''} />
              )}
            </Box>
          </motion.div>
        )
      })}

      {/* Nota sobre imagens oficiais */}
      <Box
        p={3}
        borderRadius="10px"
        bg="amber.50"
        border="1px dashed"
        borderColor="amber.200"
        display="flex"
        alignItems="flex-start"
        gap={2}
      >
        <Info size={14} color="#B45309" aria-hidden="true" />
        <Text fontSize="0.68rem" color="amber.800" lineHeight="1.55">
          Fotos de detalhe dos sintomas serão adicionadas quando as imagens
          oficiais estiverem disponíveis.
        </Text>
      </Box>
    </VStack>
  )
}

/* ─── Aba 3: Ações de Combate ──────────────────────────────────────────── */

function CombatActorCard({
  actor,
}: {
  actor: CombatAction
}) {
  const roleStyles: Record<
    CombatAction['role'],
    { Icon: React.ElementType; iconBg: string; iconColor: string; cardBg: string; cardBorder: string; textColor: string }
  > = {
    orgao: {
      Icon: ShieldAlert,
      iconBg: '#EFF6FF',
      iconColor: '#2563EB',
      cardBg: '#F8FAFF',
      cardBorder: '#DBEAFE',
      textColor: '#1E40AF',
    },
    agricultor: {
      Icon: Leaf,
      iconBg: '#F0FDF4',
      iconColor: '#16A34A',
      cardBg: '#F9FFF9',
      cardBorder: '#BBF7D0',
      textColor: '#15803D',
    },
    cidadao: {
      Icon: CheckCircle2,
      iconBg: '#FFFBEB',
      iconColor: '#D97706',
      cardBg: '#FFFDF5',
      cardBorder: '#FDE68A',
      textColor: '#92400E',
    },
  }

  const rs = roleStyles[actor.role]

  return (
    <Box
      p={4}
      borderRadius="14px"
      bg={rs.cardBg}
      border="1px solid"
      borderColor={rs.cardBorder}
    >
      <HStack align="center" gap={2.5} mb={3}>
        <Box
          w="30px"
          h="30px"
          borderRadius="8px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          bg={rs.iconBg}
          border="1px solid"
          borderColor={rs.cardBorder}
        >
          <rs.Icon size={15} color={rs.iconColor} aria-hidden="true" />
        </Box>
        <Text fontSize="0.78rem" fontWeight="900" color="gray.800" lineHeight="1.2">
          {actor.actor}
        </Text>
      </HStack>

      <VStack align="stretch" gap={2.5}>
        {actor.actions.map((action, idx) => (
          <HStack key={idx} align="flex-start" gap={2}>
            <Box
              w="5px"
              h="5px"
              borderRadius="full"
              flexShrink={0}
              mt="7px"
              bg={rs.iconColor}
              aria-hidden="true"
            />
            <Text fontSize="0.78rem" color="gray.900" fontWeight="500" lineHeight="1.6">
              {action}
            </Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  )
}

function TabCombate({ item }: { item: AmapaCaseData }) {
  return (
    <VStack align="stretch" gap={3}>
      <Text
        fontSize="0.7rem"
        color="gray.700"
        fontWeight="bold"
        letterSpacing="0.08em"
        textTransform="uppercase"
      >
        Quem age e como agir
      </Text>

      {item.combatActions.map((actor, idx) => (
        <motion.div
          key={`${item.id}-actor-${idx}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28, delay: idx * 0.07 }}
        >
          <CombatActorCard actor={actor} />
        </motion.div>
      ))}

      {/* Dica do cidadão */}
      <Box
        p={4}
        borderRadius="14px"
        bg="amber.50"
        border="1px solid"
        borderColor="amber.200"
        display="flex"
        alignItems="flex-start"
        gap={3}
      >
        <Box flexShrink={0} mt={0.5}>
          <AlertTriangle size={18} color="#D97706" aria-hidden="true" />
        </Box>
        <Box>
          <Text
            fontSize="0.72rem"
            fontWeight="900"
            color="amber.800"
            textTransform="uppercase"
            letterSpacing="0.07em"
            mb={1}
          >
            Lembre-se!
          </Text>
          <Text fontSize="0.8rem" color="amber.900" lineHeight="1.75">
            {item.citizenTip}
          </Text>
        </Box>
      </Box>
    </VStack>
  )
}

/* ─── Modal Principal ────────────────────────────────────────────────────── */

interface AmapaDossierModalProps {
  item: AmapaCaseData | null
  onClose: () => void
}

export default function AmapaDossierModal({ item, onClose }: AmapaDossierModalProps) {
  const [activeTab, setActiveTab] = useState<TabId>('invasor')

  function handleOpenChange(details: { open: boolean }) {
    if (!details.open) {
      onClose()
      setTimeout(() => setActiveTab('invasor'), 300)
    }
  }

  const mc = item ? getModalColors(item.threatLevel) : null

  return (
    <Portal>
      <DialogRoot
        open={Boolean(item)}
        onOpenChange={handleOpenChange}
        placement="center"
        motionPreset="slide-in-bottom"
        scrollBehavior="inside"
      >
        {/* Backdrop com blur suave sobre fundo branco */}
        <DialogBackdrop
          style={{
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        />

        <DialogPositioner>
          <DialogContent
            mx={{ base: 3, sm: 'auto' }}
            maxW={{ base: '100%', sm: '680px' }}
            w="full"
            maxH={{ base: '92vh', sm: '90vh' }}
            borderRadius={{ base: '20px', sm: '26px' }}
            overflow="hidden"
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            boxShadow="0 32px 80px rgba(0,0,0,0.18), 0 8px 24px rgba(0,0,0,0.08)"
          >
            {item && mc && (
              <>
                {/* ── Cabeçalho com imagem e gradiente botânico ── */}
                <Box
                  position="relative"
                  h={{ base: '170px', sm: '215px' }}
                  flexShrink={0}
                  overflow="hidden"
                >
                  {/* Imagem de fundo */}
                  <Box position="absolute" inset={0} bg="gray.200">
                    <DossierImage src={item.cardImageSrc} alt={item.cardImageAlt} light />
                  </Box>

                  {/* Gradiente de legibilidade */}
                  <Box
                    position="absolute"
                    inset={0}
                    style={{
                      background: `linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)`,
                    }}
                    pointerEvents="none"
                  />

                  {/* Faixa colorida no topo */}
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="4px"
                    style={{ background: mc.indicatorGrad }}
                    aria-hidden="true"
                  />

                  {/* Etiqueta de dossiê */}
                  <Box
                    position="absolute"
                    top={4}
                    left={4}
                    display="flex"
                    alignItems="center"
                    gap={1.5}
                    px={2.5}
                    py={1}
                    borderRadius="8px"
                    bg="rgba(255,255,255,0.88)"
                    border="1px solid rgba(0,0,0,0.07)"
                    color="gray.700"
                    fontSize="0.58rem"
                    fontWeight="800"
                    letterSpacing="0.1em"
                    textTransform="uppercase"
                    boxShadow="0 1px 4px rgba(0,0,0,0.1)"
                  >
                    <ShieldAlert size={9} color={mc.tabActive} aria-hidden="true" />
                    Dossiê Fitossanitário — Amapá
                  </Box>

                  {/* Botão Fechar */}
                  <DialogCloseTrigger asChild position="absolute" top={3} right={3} zIndex={10}>
                    <Box
                      as="button"
                      w="34px"
                      h="34px"
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      bg="rgba(255,255,255,0.9)"
                      border="1px solid rgba(0,0,0,0.1)"
                      color="gray.700"
                      cursor="pointer"
                      _hover={{ bg: 'white', boxShadow: 'sm' }}
                      _focusVisible={{ outline: '2px solid', outlineColor: 'gray.400', outlineOffset: '2px' }}
                      aria-label="Fechar dossiê"
                      boxShadow="0 1px 6px rgba(0,0,0,0.12)"
                      transition="all 0.15s ease"
                    >
                      <X size={16} aria-hidden="true" />
                    </Box>
                  </DialogCloseTrigger>

                  {/* Nome e nome científico */}
                  <Box position="absolute" bottom={4} left={4} right={12} pointerEvents="none">
                    <Text
                      fontSize="clamp(1.1rem, 3.5vw, 1.5rem)"
                      fontWeight="900"
                      color="white"
                      lineHeight="1.15"
                      letterSpacing="-0.02em"
                      style={{ textShadow: '0 1px 6px rgba(0,0,0,0.5)' }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      fontSize="0.75rem"
                      color="rgba(255,255,255,0.82)"
                      fontStyle="italic"
                      style={{ textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}
                    >
                      {item.scientificName}
                    </Text>
                  </Box>
                </Box>

                {/* ── Navegação por Abas ── */}
                <Box
                  px={{ base: 3, sm: 4 }}
                  pt={3}
                  pb={2}
                  bg="white"
                  borderBottom="1px solid"
                  borderColor="gray.200"
                  flexShrink={0}
                >
                  <SimpleGrid columns={3} gap={2}>
                    {TABS.map((tab) => {
                      const TabIcon = tab.Icon
                      const isActive = activeTab === tab.id
                      return (
                        <Box
                          key={tab.id}
                          as="button"
                          onClick={() => setActiveTab(tab.id)}
                          display="flex"
                          flexDir="column"
                          alignItems="center"
                          gap={1}
                          py={2.5}
                          px={1}
                          borderRadius="12px"
                          cursor="pointer"
                          position="relative"
                          border="1px solid"
                          borderColor={isActive ? mc.tabActiveBorder : 'gray.200'}
                          bg={isActive ? mc.tabActiveBg : 'gray.50'}
                          style={{ transition: 'all 0.18s ease' }}
                          _hover={{ bg: isActive ? mc.tabActiveBg : 'gray.100' }}
                          _focusVisible={{
                            outline: '2px solid',
                            outlineColor: mc.tabActive,
                            outlineOffset: '2px',
                          }}
                          aria-selected={isActive}
                          aria-label={tab.label}
                        >
                          <TabIcon
                            size={16}
                            color={isActive ? mc.tabActive : '#9CA3AF'}
                            aria-hidden="true"
                          />
                          <Text
                            fontSize={{ base: '0.58rem', sm: '0.65rem' }}
                            fontWeight="800"
                            color={isActive ? mc.sectionText : 'gray.500'}
                            textAlign="center"
                            lineHeight="1.2"
                          >
                            {tab.label}
                          </Text>
                          {/* Indicador de aba ativa */}
                          {isActive && (
                            <motion.div
                              layoutId="activeTabIndicatorLight"
                              style={{
                                position: 'absolute',
                                bottom: 0,
                                left: '18%',
                                right: '18%',
                                height: '2.5px',
                                borderRadius: '2px',
                                background: mc.indicatorGrad,
                              }}
                            />
                          )}
                        </Box>
                      )
                    })}
                  </SimpleGrid>
                </Box>

                {/* ── Conteúdo da aba ativa ── */}
                <Box
                  overflowY="auto"
                  px={{ base: 4, sm: 5 }}
                  py={{ base: 5, sm: 6 }}
                  bg="gray.50"
                  flex={1}
                  css={{
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-track': { background: '#F9FAFB' },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#D1D5DB',
                      borderRadius: '4px',
                    },
                  }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                      {activeTab === 'invasor' && <TabInvasor item={item} mc={mc} />}
                      {activeTab === 'diagnostico' && <TabDiagnostico item={item} mc={mc} />}
                      {activeTab === 'combate' && <TabCombate item={item} />}
                    </motion.div>
                  </AnimatePresence>

                  {/* ── Rodapé de fontes científicas ── */}
                  <Box
                    mt={6}
                    pt={4}
                    borderTop="1px solid"
                    borderColor="gray.200"
                    display="flex"
                    alignItems="flex-start"
                    gap={2.5}
                  >
                    <Box
                      w="30px"
                      h="30px"
                      borderRadius="8px"
                      bg="green.50"
                      border="1px solid"
                      borderColor="green.200"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      flexShrink={0}
                    >
                      <FileText size={14} color="#2E7D32" aria-hidden="true" />
                    </Box>
                    <Box>
                      <Text fontSize="0.65rem" fontWeight="800" color="green.800" mb={0.5}>
                        Fontes Científicas e Institucionais
                      </Text>
                      <Text fontSize="0.65rem" color="gray.700" fontWeight="500" lineHeight="1.6">
                        Dados baseados em informações do MAPA, Embrapa Amapá, DIAGRO
                        (Agência de Defesa Agropecuária do Amapá) e literatura científica
                        revisada por pares. Região Norte — Brasil.
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </>
            )}
          </DialogContent>
        </DialogPositioner>
      </DialogRoot>
    </Portal>
  )
}

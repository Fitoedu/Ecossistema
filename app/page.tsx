'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react'

export default function SplashScreen() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 100)
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200)
    const redirectTimer = setTimeout(() => {
      router.replace('/home')
    }, 2800)

    return () => {
      clearTimeout(showTimer)
      clearTimeout(fadeTimer)
      clearTimeout(redirectTimer)
    }
  }, [router])

  return (
    <Box
      position="fixed"
      inset={0}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg"
      opacity={fadeOut ? 0 : visible ? 1 : 0}
      transition={fadeOut ? 'opacity 0.65s ease-out' : 'opacity 0.55s ease-in'}
      zIndex={9999}
      overflow="hidden"
      css={{
        backgroundImage:
          'radial-gradient(circle at top left, rgba(78, 165, 109, 0.18), transparent 34%), radial-gradient(circle at 80% 18%, rgba(0, 78, 161, 0.12), transparent 28%), radial-gradient(circle at 20% 85%, rgba(244, 176, 0, 0.14), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.55), rgba(255,255,255,0))',
        backgroundBlendMode: 'screen',
        '@keyframes drift': {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(0, -14px, 0) scale(1.03)' },
        },
        '@keyframes glowPulse': {
          '0%, 100%': { opacity: 0.65, transform: 'scale(0.98)' },
          '50%': { opacity: 1, transform: 'scale(1.05)' },
        },
        '@keyframes orbSpin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        '@keyframes dotPulse': {
          '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: 0.3 },
          '40%': { transform: 'scale(1.2)', opacity: 1 },
        },
        '@keyframes progress': {
          '0%': { transform: 'translateX(-45%)' },
          '50%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(45%)' },
        },
      }}
    >
      <Box
        position="absolute"
        inset={0}
        opacity={0.35}
        bgImage="linear-gradient(rgba(15, 107, 61, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 107, 61, 0.08) 1px, transparent 1px)"
        bgSize="64px 64px"
        maskImage="radial-gradient(circle at center, black 30%, transparent 100%)"
      />

      <Box
        position="absolute"
        w="520px"
        h="520px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(15,107,61,0.22) 0%, rgba(15,107,61,0.08) 36%, transparent 72%)"
        top="-120px"
        right="-140px"
        animation="drift 7s ease-in-out infinite"
      />
      <Box
        position="absolute"
        w="440px"
        h="440px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(244,176,0,0.22) 0%, rgba(244,176,0,0.08) 38%, transparent 72%)"
        bottom="-120px"
        left="-120px"
        animation="drift 8s ease-in-out infinite 1.2s"
      />

      <Box
        position="absolute"
        w="340px"
        h="340px"
        borderRadius="full"
        border="1px solid rgba(255,255,255,0.42)"
        backdropFilter="blur(10px)"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        opacity={0.45}
      />

      <Stack
        align="center"
        gap={6}
        maxW="min(88vw, 560px)"
        px={{ base: 5, md: 8 }}
        py={{ base: 8, md: 10 }}
        borderRadius="32px"
        bg="rgba(255, 255, 255, 0.56)"
        border="1px solid rgba(255, 255, 255, 0.72)"
        boxShadow="0 24px 80px rgba(6, 45, 27, 0.16)"
        backdropFilter="blur(18px)"
        transform={visible && !fadeOut ? 'translateY(0)' : 'translateY(18px)'}
        transition="transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.7s ease"
      >
        <Text
          px={3}
          py={1.5}
          borderRadius="full"
          border="1px solid rgba(15, 107, 61, 0.14)"
          bg="rgba(255,255,255,0.65)"
          color="brand.700"
          fontSize="0.72rem"
          fontWeight={700}
          letterSpacing="0.18em"
          textTransform="uppercase"
        >
          Educação viva
        </Text>

        <Flex
          position="relative"
          w={{ base: '108px', md: '124px' }}
          h={{ base: '108px', md: '124px' }}
          borderRadius="36px"
          align="center"
          justify="center"
          bgGradient="linear(145deg, rgba(15,107,61,0.98) 0%, rgba(0,78,161,0.94) 58%, rgba(244,176,0,0.96) 100%)"
          boxShadow="0 16px 36px rgba(15, 107, 61, 0.28), 0 30px 70px rgba(0, 0, 0, 0.18)"
          animation="glowPulse 4s ease-in-out infinite"
          overflow="hidden"
        >
          <Box
            position="absolute"
            inset="10px"
            borderRadius="28px"
            border="1px solid rgba(255,255,255,0.22)"
          />
          <Box
            position="absolute"
            inset="-30%"
            bgGradient="conic(from 180deg, rgba(255,255,255,0.28), rgba(255,255,255,0) 28%, rgba(255,255,255,0.2) 56%, rgba(255,255,255,0) 84%, rgba(255,255,255,0.28))"
            animation="orbSpin 10s linear infinite"
            opacity={0.9}
          />
          <Box
            position="absolute"
            inset="22%"
            borderRadius="26px"
            bg="rgba(255,255,255,0.14)"
            backdropFilter="blur(8px)"
          />
          <Flex
            w={{ base: '66px', md: '72px' }}
            h={{ base: '66px', md: '72px' }}
            borderRadius="24px"
            bg="rgba(255,255,255,0.18)"
            align="center"
            justify="center"
            fontSize={{ base: '2.25rem', md: '2.6rem' }}
            position="relative"
          >
            🌿
          </Flex>
        </Flex>

        <Stack gap={2} align="center" textAlign="center" maxW="34rem">
          <Text
            fontFamily="heading"
            fontSize={{ base: '2.2rem', sm: '2.8rem', md: '4rem' }}
            fontWeight={800}
            letterSpacing="-0.04em"
            lineHeight={0.95}
            bgGradient="linear(135deg, #0f6b3d 0%, #004ea1 54%, #f4b000 100%)"
            bgClip="text"
          >
            FitoEdu
          </Text>

          <Text
            fontSize={{ base: '0.98rem', md: '1.12rem' }}
            lineHeight={1.7}
            color="fg"
            maxW="30rem"
            m={0}
          >
            Aprendendo com a natureza, com uma experiência mais leve, clara e envolvente desde o primeiro segundo.
          </Text>
        </Stack>

        <HStack gap={2} flexWrap="wrap" justify="center">
          {['Naturais', 'Interativa', 'Didática'].map((label) => (
            <Box
              key={label}
              px={4}
              py={2}
              borderRadius="full"
              bg="rgba(255,255,255,0.72)"
              border="1px solid rgba(15, 107, 61, 0.12)"
              color="brand.700"
              fontSize="0.85rem"
              fontWeight={600}
              boxShadow="0 10px 24px rgba(6, 45, 27, 0.08)"
            >
              {label}
            </Box>
          ))}
        </HStack>

        <Stack gap={3} w="full" maxW="26rem" align="center">
          <Box w="full" h="4px" borderRadius="full" bg="rgba(15, 107, 61, 0.12)" overflow="hidden">
            <Box
              w="42%"
              h="full"
              borderRadius="full"
              bgGradient="linear(90deg, #0f6b3d 0%, #004ea1 52%, #f4b000 100%)"
              animation="progress 1.8s ease-in-out infinite"
              boxShadow="0 0 24px rgba(15, 107, 61, 0.35)"
            />
          </Box>

          <Text fontSize="0.82rem" letterSpacing="0.14em" textTransform="uppercase" color="muted">
            Preparando a experiência
          </Text>
        </Stack>

        <Flex gap={2} align="center" opacity={0.85}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              w="7px"
              h="7px"
              borderRadius="full"
              bg="brand.500"
              animation={`dotPulse 1.2s ease-in-out infinite ${i * 0.18}s`}
            />
          ))}
        </Flex>
      </Stack>
    </Box>
  )
}
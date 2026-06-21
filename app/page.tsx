'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, Flex, Stack, Text } from '@chakra-ui/react'

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
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(135deg, #f8fcf9 0%, #eaf7ef 45%, #fef8e6 100%)"
      opacity={fadeOut ? 0 : visible ? 1 : 0}
      transition={fadeOut ? 'opacity 0.6s ease-out' : 'opacity 0.5s ease-in'}
      zIndex={9999}
      overflow="hidden"
      css={{
        '@keyframes pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.05)', opacity: 0.7 },
        },
        '@keyframes floatLogo': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        '@keyframes dotPulse': {
          '0%, 80%, 100%': { transform: 'scale(0.8)', opacity: 0.3 },
          '40%': { transform: 'scale(1.2)', opacity: 1 },
        },
      }}
    >
      <Box
        position="absolute"
        w="500px"
        h="500px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(15,107,61,0.15) 0%, transparent 70%)"
        top="-100px"
        right="-100px"
        animation="pulse 3s ease-in-out infinite"
      />
      <Box
        position="absolute"
        w="400px"
        h="400px"
        borderRadius="full"
        bgGradient="radial(circle, rgba(244,176,0,0.18) 0%, transparent 70%)"
        bottom="-80px"
        left="-80px"
        animation="pulse 3s ease-in-out infinite 1.5s"
      />

      <Stack align="center" gap={5} transform={visible && !fadeOut ? 'translateY(0)' : 'translateY(16px)'} transition="transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)">
        <Flex
          w="96px"
          h="96px"
          borderRadius="28px"
          bgGradient="linear(135deg, #0f6b3d 0%, #004ea1 55%, #f4b000 100%)"
          align="center"
          justify="center"
          boxShadow="0 0 40px rgba(15,107,61,0.25), 0 20px 60px rgba(0,0,0,0.15)"
          fontSize="48px"
          animation="floatLogo 3s ease-in-out infinite"
        >
          🌿
        </Flex>

        <Text
          fontFamily="heading"
          fontSize={{ base: '2rem', md: '3.5rem' }}
          fontWeight={800}
          letterSpacing="-0.02em"
          bgGradient="linear(135deg, #0f6b3d 0%, #004ea1 50%, #f4b000 100%)"
          bgClip="text"
          lineHeight={1.1}
          textAlign="center"
        >
          FitoEdu
        </Text>

        <Box
          w={visible && !fadeOut ? '120px' : '0px'}
          h="2px"
          bgGradient="linear(90deg, transparent, #0f6b3d, transparent)"
          borderRadius="full"
          transition="width 0.8s ease 0.4s"
        />

        <Text
          fontFamily="body"
          fontSize={{ base: '0.9rem', md: '1.1rem' }}
          fontWeight={400}
          color="rgba(27, 51, 39, 0.78)"
          letterSpacing="0.05em"
          textAlign="center"
          maxW="320px"
          lineHeight={1.6}
          m={0}
        >
          Aprendendo com a natureza,
          <br />
          <Text as="span" color="#34d399" fontWeight={600}>
            crescendo com o conhecimento.
          </Text>
        </Text>
      </Stack>

      <Flex position="absolute" bottom="48px" gap={2} align="center">
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            w="6px"
            h="6px"
            borderRadius="full"
            bg="#0f6b3d"
            opacity={0.4}
            animation={`dotPulse 1.2s ease-in-out infinite ${i * 0.2}s`}
          />
        ))}
      </Flex>
    </Box>
  )
}
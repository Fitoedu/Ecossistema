'use client'

import {
  Badge,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import {
  ArrowLeft,
  Check,
  Eye,
  Lightbulb,
  RotateCcw,
  Shuffle,
  Sparkles,
  Trophy,
  Volume2,
} from 'lucide-react'

import { useBingoGame } from './useBingoGame'

export function BingoGame() {
  const {
    board,
    markedIndices,
    winningLine,
    isWon,
    currentCall,
    calledHistory,
    drawnCount,
    totalCalls,
    markedCount,
    mistakes,
    wrongCellIndex,
    callMode,
    feedback,
    selectCell,
    drawNext,
    skipNotInBoard,
    restartGame,
    toggleCallMode,
  } = useBingoGame()

  const winningSet = new Set<number>(winningLine ?? [])

  if (isWon) {
    return (
      <Stack align="center" textAlign="center" gap={6} py={{ base: 6, md: 8 }}>
        <Flex
          w={24}
          h={24}
          borderRadius="full"
          bg="linear-gradient(135deg, #fef3c7 0%, #fcd34d 100%)"
          color="#b45309"
          align="center"
          justify="center"
          boxShadow="0 16px 36px rgba(244, 176, 0, 0.35)"
        >
          <Icon as={Trophy} boxSize={12} />
        </Flex>

        <Stack gap={1.5}>
          <Badge
            alignSelf="center"
            px={3}
            py={1}
            borderRadius="full"
            bg="#dcfce7"
            color="brand.700"
            fontSize="xs"
            fontWeight={800}
            textTransform="uppercase"
            letterSpacing="0.08em"
          >
            🎉 Bingo Fitossanitário!
          </Badge>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} fontWeight={800} color="#1b3327">
            Parabéns, Guardião da Lavoura!
          </Heading>
          <Text color="#5c746d" maxW="460px" fontSize={{ base: 'sm', md: 'md' }}>
            Você completou uma linha inteira identificando corretamente as pragas agrícolas da Região Norte!
          </Text>
        </Stack>

        <SimpleGrid columns={3} gap={2.5} maxW="320px" w="full">
          {board.map((pest, index) => {
            const isWinCell = winningSet.has(index)
            const isMarked = markedIndices.has(index)
            return (
              <Flex
                key={pest.id}
                direction="column"
                align="center"
                justify="center"
                p={3}
                borderRadius="16px"
                border="2px solid"
                borderColor={isWinCell ? '#f4b000' : isMarked ? 'brand.500' : 'brand.100'}
                bg={isWinCell ? '#fef3c7' : isMarked ? 'green.200' : 'white'}
                boxShadow={isWinCell ? '0 8px 20px rgba(244, 176, 0, 0.28)' : 'none'}
              >
                <Text fontSize="2xl" lineHeight={1}>
                  {pest.emoji}
                </Text>
                <Text
                  mt={1}
                  fontSize="2xs"
                  fontWeight={700}
                  color="#1b3327"
                  lineClamp={1}
                >
                  {pest.name}
                </Text>
              </Flex>
            )
          })}
        </SimpleGrid>

        <SimpleGrid columns={{ base: 3 }} gap={3} w="full" maxW="420px">
          <Box
            bg="white"
            border="1px solid"
            borderColor="brand.100"
            borderRadius="16px"
            p={4}
          >
            <Text fontSize="2xl" fontWeight={800} color="brand.700">
              {markedCount}
            </Text>
            <Text fontSize="xs" fontWeight={700} color="#5c746d">
              Marcadas
            </Text>
          </Box>
          <Box
            bg="white"
            border="1px solid"
            borderColor="brand.100"
            borderRadius="16px"
            p={4}
          >
            <Text fontSize="2xl" fontWeight={800} color="#c2410c">
              {drawnCount}
            </Text>
            <Text fontSize="xs" fontWeight={700} color="#5c746d">
              Sorteios
            </Text>
          </Box>
          <Box
            bg="white"
            border="1px solid"
            borderColor="brand.100"
            borderRadius="16px"
            p={4}
          >
            <Text fontSize="2xl" fontWeight={800} color="#7c3aed">
              {mistakes}
            </Text>
            <Text fontSize="xs" fontWeight={700} color="#5c746d">
              Erros
            </Text>
          </Box>
        </SimpleGrid>

        <Flex direction={{ base: 'column', sm: 'row' }} gap={3} w={{ base: 'full', sm: 'auto' }}>
          <Button
            onClick={restartGame}
            colorPalette="green"
            borderRadius="14px"
            px={6}
            size="lg"
            fontWeight={800}
          >
            <Icon as={RotateCcw} mr={2} />
            Jogar Novamente
          </Button>
          <Button
            asChild
            variant="outline"
            colorPalette="green"
            borderRadius="14px"
            px={6}
            size="lg"
            fontWeight={700}
          >
            <Link href="/jogos">
              <Icon as={ArrowLeft} mr={2} />
              Voltar aos Jogos
            </Link>
          </Button>
        </Flex>
      </Stack>
    )
  }

  return (
    <Stack gap={5}>
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        gap={3}
        bg="white"
        px={4}
        py={3}
        borderRadius="16px"
        border="1px solid"
        borderColor="brand.100"
      >
        <Flex align="center" gap={3} wrap="wrap">
          <Badge
            px={3}
            py={1}
            borderRadius="full"
            bg="#fff3e6"
            color="#c2410c"
            fontWeight={800}
            fontSize="xs"
          >
            🎱 Pedra {drawnCount} de {totalCalls}
          </Badge>
          <Badge
            px={3}
            py={1}
            borderRadius="full"
            bg="#e6f9ee"
            color="brand.700"
            fontWeight={800}
            fontSize="xs"
          >
            ✓ {markedCount}/9 na cartela
          </Badge>
        </Flex>

        <Flex align="center" gap={1.5}>
          <Button
            size="xs"
            borderRadius="full"
            variant={callMode === 'clue' ? 'solid' : 'ghost'}
            colorPalette="orange"
            onClick={() => toggleCallMode('clue')}
            fontWeight={700}
          >
            <Icon as={Lightbulb} boxSize={3.5} mr={1} />
            Cantar Dica
          </Button>
          <Button
            size="xs"
            borderRadius="full"
            variant={callMode === 'name' ? 'solid' : 'ghost'}
            colorPalette="green"
            onClick={() => toggleCallMode('name')}
            fontWeight={700}
          >
            <Icon as={Eye} boxSize={3.5} mr={1} />
            Cantar Nome
          </Button>
        </Flex>
      </Flex>

      {currentCall && (
        <Box
          bg="linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)"
          border="2px solid"
          borderColor="#fdba74"
          borderRadius="20px"
          p={{ base: 4, md: 6 }}
          boxShadow="0 14px 32px rgba(234, 88, 12, 0.12)"
          position="relative"
          overflow="hidden"
        >
          <Stack gap={3}>
            <Flex justify="space-between" align="center" wrap="wrap" gap={2}>
              <Flex align="center" gap={2}>
                <Flex
                  w={8}
                  h={8}
                  borderRadius="10px"
                  bg="#ea580c"
                  color="white"
                  align="center"
                  justify="center"
                >
                  <Icon as={Volume2} boxSize={4} />
                </Flex>
                <Text
                  fontSize="xs"
                  fontWeight={800}
                  color="#9a3412"
                  textTransform="uppercase"
                  letterSpacing="0.08em"
                >
                  {callMode === 'clue' ? 'Dica Sorteada — Quem sou eu?' : 'Praga Sorteada'}
                </Text>
              </Flex>

              <Badge
                px={2.5}
                py={1}
                borderRadius="full"
                bg="whiteAlpha.900"
                color="#9a3412"
                fontSize="xs"
                fontWeight={700}
              >
                {currentCall.cropEmoji} Ataca: {currentCall.crop}
              </Badge>
            </Flex>

            {callMode === 'clue' ? (
              <Box
                bg="whiteAlpha.900"
                borderRadius="14px"
                p={{ base: 3.5, md: 4 }}
                border="1px dashed"
                borderColor="#fb923c"
              >
                <Text
                  fontSize={{ base: 'md', md: 'lg' }}
                  fontWeight={800}
                  color="#1b3327"
                  lineHeight={1.45}
                >
                  “{currentCall.clue}”
                </Text>
              </Box>
            ) : (
              <Flex
                bg="whiteAlpha.900"
                borderRadius="14px"
                p={{ base: 3.5, md: 4 }}
                border="1px solid"
                borderColor="#fed7aa"
                align="center"
                gap={4}
              >
                <Text fontSize={{ base: '3xl', md: '4xl' }} lineHeight={1}>
                  {currentCall.emoji}
                </Text>
                <Box>
                  <Heading as="h3" fontSize={{ base: 'lg', md: 'xl' }} fontWeight={800} color="#1b3327">
                    {currentCall.name}
                  </Heading>
                  <Text fontSize="xs" fontStyle="italic" color="#5c746d">
                    {currentCall.scientificName}
                  </Text>
                </Box>
              </Flex>
            )}

            <Flex justify="space-between" align="center" wrap="wrap" gap={2} pt={1}>
              <Text fontSize="xs" fontWeight={600} color="#9a3412">
                👇 Procure e toque na praga correspondente na sua cartela abaixo:
              </Text>
              <Flex gap={2} wrap="wrap">
                <Button
                  size="sm"
                  variant="surface"
                  colorPalette="orange"
                  borderRadius="10px"
                  onClick={skipNotInBoard}
                  fontWeight={700}
                >
                  Não está na minha cartela
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  colorPalette="orange"
                  borderRadius="10px"
                  onClick={drawNext}
                  fontWeight={700}
                >
                  <Icon as={Shuffle} boxSize={3.5} mr={1} />
                  Próxima pedra
                </Button>
              </Flex>
            </Flex>
          </Stack>
        </Box>
      )}

      {feedback && (
        <Box
          px={4}
          py={3}
          borderRadius="14px"
          border="1.5px solid"
          borderColor={
            feedback.type === 'hit'
              ? 'green.400'
              : feedback.type === 'miss'
                ? 'red.300'
                : 'orange.300'
          }
          bg={
            feedback.type === 'hit'
              ? 'green.50'
              : feedback.type === 'miss'
                ? 'red.50'
                : 'orange.50'
          }
        >
          <Flex align="flex-start" gap={2.5}>
            <Icon
              as={feedback.type === 'hit' ? Sparkles : Lightbulb}
              color={
                feedback.type === 'hit'
                  ? 'green.700'
                  : feedback.type === 'miss'
                    ? 'red.600'
                    : 'orange.700'
              }
              boxSize={5}
              mt={0.5}
              flexShrink={0}
            />
            <Stack gap={0.5}>
              <Text
                fontSize="sm"
                fontWeight={800}
                color={
                  feedback.type === 'hit'
                    ? 'green.900'
                    : feedback.type === 'miss'
                      ? 'red.800'
                      : 'orange.900'
                }
              >
                {feedback.message}
              </Text>
              {feedback.pest && (
                <Text fontSize="xs" color="#4a6358">
                  💡 <strong>Curiosidade:</strong> {feedback.pest.curiosity}
                </Text>
              )}
            </Stack>
          </Flex>
        </Box>
      )}

      <Box
        bg="white"
        border="1px solid"
        borderColor="brand.100"
        borderRadius="20px"
        p={{ base: 4, md: 6 }}
        boxShadow="0 12px 28px rgba(15, 42, 26, 0.06)"
      >
        <Flex justify="space-between" align="center" mb={4} wrap="wrap" gap={2}>
          <Box>
            <Heading as="h2" fontSize={{ base: 'md', md: 'lg' }} fontWeight={800} color="#1b3327">
              Sua Cartela Fitossanitária (3×3)
            </Heading>
            <Text fontSize="xs" color="#5c746d">
              Complete 1 linha horizontal, vertical ou diagonal para fazer BINGO!
            </Text>
          </Box>
          <Button
            size="xs"
            variant="ghost"
            color="brand.700"
            onClick={restartGame}
            fontWeight={700}
          >
            <Icon as={RotateCcw} boxSize={3.5} mr={1} />
            Nova Cartela
          </Button>
        </Flex>

        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={{ base: 2.5, sm: 3.5 }}
          role="grid"
          aria-label="Cartela do Bingo Fitossanitário"
        >
          {board.map((pest, index) => {
            const isMarked = markedIndices.has(index)
            const isWrong = wrongCellIndex === index

            return (
              <Button
                key={pest.id}
                onClick={() => selectCell(index)}
                aria-pressed={isMarked}
                aria-label={`${pest.name}, ataca ${pest.crop}${isMarked ? ', marcado' : ''}`}
                h="auto"
                minH={{ base: '112px', sm: '128px' }}
                p={{ base: 2.5, sm: 3.5 }}
                borderRadius="16px"
                border="2px solid"
                borderColor={
                  isMarked
                    ? 'green.600'
                    : isWrong
                      ? 'red.400'
                      : 'brand.100'
                }
                bg={
                  isMarked
                    ? 'green.200'
                    : isWrong
                      ? 'red.50'
                      : '#fbfdf9'
                }
                color="#1b3327"
                whiteSpace="normal"
                position="relative"
                transition="all 0.2s ease"
                _hover={{
                  transform: 'translateY(-2px)',
                  borderColor: isMarked ? 'green.600' : 'brand.400',
                  bg: isMarked ? 'green.200' : '#f1faf3',
                }}
              >
                {isMarked && (
                  <Flex
                    position="absolute"
                    top={2}
                    right={2}
                    w={6}
                    h={6}
                    borderRadius="full"
                    bg="green.600"
                    color="white"
                    align="center"
                    justify="center"
                  >
                    <Icon as={Check} boxSize={3.5} />
                  </Flex>
                )}

                <Stack align="center" justify="center" gap={1.5} w="full">
                  <Text fontSize={{ base: '3xl', sm: '4xl' }} lineHeight={1}>
                    {pest.emoji}
                  </Text>
                  <Text
                    fontSize={{ base: 'xs', sm: 'sm' }}
                    fontWeight={800}
                    color="#1b3327"
                    lineHeight={1.2}
                    textAlign="center"
                  >
                    {pest.name}
                  </Text>
                  <Badge
                    px={2}
                    py={0.5}
                    borderRadius="full"
                    bg={isMarked ? 'whiteAlpha.800' : 'brand.50'}
                    color="brand.700"
                    fontSize="2xs"
                    fontWeight={700}
                  >
                    {pest.cropEmoji} {pest.crop}
                  </Badge>
                </Stack>
              </Button>
            )
          })}
        </Grid>
      </Box>

      <Box
        bg="white"
        border="1px solid"
        borderColor="brand.100"
        borderRadius="16px"
        p={4}
      >
        <Text
          fontSize="xs"
          fontWeight={800}
          color="#5c746d"
          textTransform="uppercase"
          letterSpacing="0.06em"
          mb={2.5}
        >
          Pedras já cantadas ({calledHistory.length})
        </Text>
        <Flex gap={2} wrap="wrap">
          {calledHistory.map((pest, idx) => (
            <Badge
              key={pest.id}
              px={2.5}
              py={1}
              borderRadius="full"
              bg={idx === calledHistory.length - 1 ? '#ffedd5' : 'brand.50'}
              color={idx === calledHistory.length - 1 ? '#c2410c' : 'brand.700'}
              fontSize="xs"
              fontWeight={700}
            >
              {pest.emoji} #{idx + 1} { callMode === 'name' || markedIndices.has(board.findIndex((b) => b.id === pest.id)) ? pest.name : `Dica (${pest.crop})` }
            </Badge>
          ))}
        </Flex>
      </Box>
    </Stack>
  )
}

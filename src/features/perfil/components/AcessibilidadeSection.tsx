'use client'

import { Badge, Box, Flex, Separator, Slider, Stack, Text } from '@chakra-ui/react'
import { Accessibility } from 'lucide-react'
import { SettingsCard } from './SettingsCard'
import { ToggleRow } from './ToggleRow'

interface AcessibilidadeSectionProps {
  tamanhoTexto: number[]
  tamanhoLabel: string
  altoContraste: boolean
  onTamanhoChange: (val: number[]) => void
  onAltoContrasteChange: (val: boolean) => void
}

export function AcessibilidadeSection({
  tamanhoTexto,
  tamanhoLabel,
  altoContraste,
  onTamanhoChange,
  onAltoContrasteChange,
}: AcessibilidadeSectionProps) {
  return (
    <SettingsCard
      icon={Accessibility}
      iconBg="tertiary.500"
      iconColor="white"
      title="Acessibilidade"
    >
      <Stack gap={5}>
        <Box>
          <Flex align="center" justify="space-between" mb={3}>
            <Text fontSize="sm" fontWeight={700} color="fg">
              Tamanho do Texto
            </Text>
            <Badge bg="bg" color="fg" borderRadius="full" px={3} py={1} fontWeight={600}>
              {tamanhoLabel}
            </Badge>
          </Flex>
          <Flex align="center" gap={3}>
            <Text fontSize="sm" color="muted">
              A
            </Text>
            <Slider.Root
              value={tamanhoTexto}
              onValueChange={(details) => onTamanhoChange(details.value)}
              min={0}
              max={2}
              step={1}
              flex={1}
            >
              <Slider.Control>
                <Slider.Track bg="primary.100">
                  <Slider.Range bg="primary.500" />
                </Slider.Track>
                <Slider.Thumbs
                  boxSize={4}
                  bg="primary.600"
                  borderWidth="2px"
                  borderColor="white"
                  boxShadow="0 1px 4px rgba(15,42,26,0.3)"
                />
              </Slider.Control>
            </Slider.Root>
            <Text fontSize="lg" fontWeight={700} color="fg">
              A
            </Text>
          </Flex>
        </Box>

        <Separator borderColor="primary.100" />

        <ToggleRow
          icon={Accessibility}
          label="Alto Contraste"
          description="Melhora a legibilidade com cores mais fortes."
          checked={altoContraste}
          onChange={onAltoContrasteChange}
        />
      </Stack>
    </SettingsCard>
  )
}
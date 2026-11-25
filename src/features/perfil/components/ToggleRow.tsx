'use client'

import { Box, Flex, Switch, Text } from '@chakra-ui/react'
import { Check } from 'lucide-react'

export interface ToggleRowProps {
  icon: React.ElementType
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function ToggleRow({
  icon: Icon,
  label,
  description,
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <Flex align="flex-start" justify="space-between" gap={4}>
      <Flex align="flex-start" gap={3} flex={1}>
        <Box color="muted" mt="2px" flexShrink={0}>
          <Icon size={18} />
        </Box>
        <Box>
          <Text fontWeight={700} fontSize="sm" color="fg">
            {label}
          </Text>
          <Text fontSize="sm" color="muted" mt={0.5}>
            {description}
          </Text>
        </Box>
      </Flex>

      <Switch.Root
        checked={checked}
        onCheckedChange={(details) => onChange(!!details.checked)}
        colorPalette="primary"
        flexShrink={0}
      >
        <Switch.HiddenInput />
        <Switch.Control>
          <Switch.Thumb>
            {checked && (
              <Switch.ThumbIndicator>
                <Check
                  size={11}
                  color="var(--chakra-colors-primary-600)"
                  strokeWidth={3}
                />
              </Switch.ThumbIndicator>
            )}
          </Switch.Thumb>
        </Switch.Control>
      </Switch.Root>
    </Flex>
  )
}
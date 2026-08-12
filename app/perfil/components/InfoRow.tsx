'use client'

import Link from 'next/link'
import { Flex, Text } from '@chakra-ui/react'
import { ChevronRight } from 'lucide-react'

export interface InfoRowProps {
  label: string
  href?: string
  trailing?: React.ReactNode
}

export function InfoRow({ label, href, trailing }: InfoRowProps) {
  const content = (
    <Flex align="center" justify="space-between" py={4}>
      <Text fontSize="sm" fontWeight={600} color="fg">
        {label}
      </Text>
      {trailing ?? (href && <ChevronRight size={18} color="var(--chakra-colors-muted)" />)}
    </Flex>
  )

  if (href) {
    return (
      <Link href={href} style={{ textDecoration: 'none', color: 'inherit' }}>
        {content}
      </Link>
    )
  }

  return content
}
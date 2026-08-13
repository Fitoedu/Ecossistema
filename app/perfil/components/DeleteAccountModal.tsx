'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Box,
  Button,
  Dialog,
  Flex,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react'
import { AlertTriangle, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface DeleteAccountModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DeleteAccountModal({ isOpen, onClose }: DeleteAccountModalProps) {
  const [confirmText, setConfirmText] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  //const supabase = createClient()

  // O botão só fica ativo se o usuário digitar "EXCLUIR"
  const isConfirmed = confirmText.trim() === 'EXCLUIR'

  const handleClose = () => {
    setConfirmText('')
    onClose()
  }

  async function handleDeleteAccount() {
    if (!isConfirmed) return
    setLoading(true)

    // Encerra a sessão no Supabase
    //await supabase.auth.signOut()

    setLoading(false)
    handleClose()
    router.push('/login')
  }

  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && handleClose()}>
      <Dialog.Backdrop bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <Dialog.Positioner>
        <Dialog.Content
          bg="surface"
          p={{ base: 6, md: 8 }}
          borderRadius="3xl"
          maxW="md"
          borderWidth="1px"
          borderColor="red.200"
          boxShadow="xl"
          position="relative"
        >
          <Stack gap={5} align="center" textAlign="center">
            {/* Ícone de alerta destacado */}
            <Flex
              w="56px"
              h="56px"
              borderRadius="full"
              bg="red.100"
              color="red.600"
              align="center"
              justify="center"
              flexShrink={0}
            >
              <AlertTriangle size={28} />
            </Flex>

            <Stack gap={1}>
              <Dialog.Title fontWeight={700} fontSize="xl" color="red.600">
                Excluir Conta
              </Dialog.Title>
              <Text fontSize="sm" color="muted">
                Esta ação é irreversível. Todos os seus dados de progresso e conquistas no EducaFito serão apagados permanentemente.
              </Text>
            </Stack>

            {/* Trava de segurança por digitação */}
            <Box w="full" textAlign="left" pt={2}>
              <Text fontSize="xs" fontWeight={700} color="fg" mb={2}>
                Para confirmar, digite <Text as="span" color="red.600">EXCLUIR</Text> abaixo:
              </Text>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Digite EXCLUIR"
                borderColor="red.200"
                _focusVisible={{ borderColor: 'red.500', boxShadow: '0 0 0 1px var(--chakra-colors-red-500)' }}
              />
            </Box>

            <Flex gap={3} w="full" pt={2}>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                borderColor="primary.100"
                flex={1}
              >
                Cancelar
              </Button>
              <Button
                bg="red.600"
                color="white"
                _hover={{ bg: 'red.700' }}
                disabled={!isConfirmed || loading}
                loading={loading}
                loadingText="Excluindo..."
                onClick={handleDeleteAccount}
                flex={1}
              >
                Sim, excluir conta
              </Button>
            </Flex>
          </Stack>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  )
}
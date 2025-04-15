import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Circle,
  Image,
  Text,
  useColorModeValue
} from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import request from 'superagent'

const avatars = [
  {
    id: 1,
    name: 'Mike',
    image: '/images/avatars/mike.WebP',
  },
  {
    id: 2,
    name: 'Mandy',
    image: '/images/avatars/mandy.WebP',
  },
  {
    id: 3,
    name: 'Slappy',
    image: '/images/avatars/slappy-the-seal.WebP',
  },
]

interface AvatarDrawerProps {
  isOpen: boolean
  onClose: () => void
  setSelectedAvatarId: (id: number | null) => void
  userId: number
}

export default function PickAvatar({
  isOpen,
  onClose,
  setSelectedAvatarId,
  userId,
}: AvatarDrawerProps) {
  const queryClient = useQueryClient()

  const updateAvatar = useMutation({
    mutationFn: (avatarId: number) =>
      request.patch(`/api/v1/users/${userId}`).send({ avatar_id: avatarId }),
    onSuccess: () => {
      console.log('i made it to the queryKeys')
      queryClient.invalidateQueries({ queryKey: ['avatars'] })
      queryClient.invalidateQueries({ queryKey: ['users', userId] })
    },
  })

  const handleAvatarClick = (id: number) => {
    setSelectedAvatarId(id)
    updateAvatar.mutate(id)
    onClose()
  }

  const drawerBg = useColorModeValue('#fff8e1', 'gray.800') // Cat cream
  const hoverBorder = useColorModeValue('#66bb6a', '#81c784') // Pet green
  const textColor = useColorModeValue('gray.800', 'gray.100')

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size="md" placement="right">
      <DrawerOverlay />
      <DrawerContent bg={drawerBg}>
        <DrawerCloseButton />
        <DrawerHeader fontSize="2xl" fontWeight="bold" color={textColor}>
          Select Your Avatar
        </DrawerHeader>
        <DrawerBody>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="center"
            gap={6}
            py={4}
          >
            {avatars.map((avatar) => (
              <Box
                key={avatar.id}
                onClick={() => handleAvatarClick(avatar.id)}
                cursor="pointer"
                textAlign="center"
                _hover={{
                  transform: 'scale(1.05)',
                  boxShadow: `0 0 0 3px ${hoverBorder}`,
                  transition: 'all 0.2s ease-in-out',
                }}
                p={12}
                borderRadius="xl"
                bg="white"
                boxShadow="md"
                transition="all 0.2s ease-in-out"
              >
                <Image
                  src={avatar.image}
                  alt={avatar.name}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
                <Text
                  mt={3}
                  fontWeight="semibold"
                  fontSize="md"
                  color={textColor}
                >
                  {avatar.name}
                </Text>
              </Box>
            ))}
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

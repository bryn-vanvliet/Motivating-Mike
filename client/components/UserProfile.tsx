import useUserData from '../apis/use-user-data'
import useAvatarData from '../apis/use-avatar-data'
import { Box, Skeleton, Text, Heading, Image } from '@chakra-ui/react'

interface UserProfileProps {
  selectedAvatarId: number | null | undefined
  userId: number | null | undefined
}

export default function UserProfile({
  selectedAvatarId,
  userId,
}: UserProfileProps) {
  const {
    data: user,
    isPending: userIsPending,
    error: userError,
  } = useUserData(Number(userId))

  const avatarId =
    selectedAvatarId !== null ? selectedAvatarId : user ? user.avatarId : null
  const {
    data: avatar,
    isPending: avatarIsPending,
    error: avatarError,
  } = useAvatarData(Number(avatarId))

  if (userIsPending || avatarIsPending) {
    return <Skeleton height="300px" borderRadius="lg" />
  }

  if (userError) {
    return <Text color="red.500">Whoops! Error fetching user data 🐾</Text>
  }

  if (avatarError) {
    return <Text color="red.500">Oops! Avatar is being shy today 🐶</Text>
  }

  if (!user) return <Text>User not found</Text>
  if (!avatar) return <Text>Avatar not found</Text>

  const altImage = avatar.image.replace('-', ' ').replace('.webp', '')

  return (
    <>
      <Box
        width="330px"
        mx="auto"
        boxShadow="lg"
        borderRadius="lg"
        bg="#FAF9F6"
        textAlign="center"
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100px"
      >
        <Heading mb={0} fontSize="2xl" textAlign="center">
          {user.name}
        </Heading>
      </Box>

      <Box
        width="330px"
        mx="auto"
        p={6}
        boxShadow="lg"
        borderRadius="lg"
        bg="#FAF9F6"
        textAlign="center"
        transition="all 0.3s ease"
        _hover={{ transform: 'scale(1.02)' }}
      >
        <Image
          src={avatar.image}
          alt={altImage}
          borderRadius="full"
          boxSize="150px"
          mx="auto"
          mb={4}
          border="4px solid #4fc3f7"
        />

        <Text fontSize="md" color="gray.600" mb={2}>
          Avatar: <strong>{avatar.name}</strong>
        </Text>
      </Box>
    </>
  )
}

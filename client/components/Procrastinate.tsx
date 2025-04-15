import { Box, Spinner } from '@chakra-ui/react'
import useUserDataAuth from '../apis/use-user-data-auth'
import useUserTodos from '../apis/use-user-todos'
import { useNavigate } from 'react-router-dom'
import OneHeckle from './OneHeckle'
import HomePageAvatar from './HomePageAvatar'

interface Props {
  userId: number
}

export default function Procrastinate({ userId }: Props) {
  const navigate = useNavigate()
  const { data: userData, isPending, error } = useUserDataAuth()
  const {
    data: todos,
    isPending: todosPending,
    error: todosError,
  } = useUserTodos(userId)

  if (isPending || todosPending) {
    return (
      <Box
        height="100vh"
        flex="1"
        flexDir="column"
        backgroundColor="#B1CFB7"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <h2>Loading profile</h2>
        <Spinner />
      </Box>
    )
  }

  if (error || todosError || !userData) {
    return (
      <Box
        height="100vh"
        flex="1"
        flexDir="column"
        backgroundColor="#B1CFB7"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <h2>{todosError?.message || 'No user data found'}</h2>
      </Box>
    )
  }

  return (
    <>
      <Box position="relative" transform="translateX(40%)" mb={2}>
        <OneHeckle
          userId={userData.id}
          avatarId={userData.avatarId}
          urgency={4}
        />
      </Box>
      <Box position="relative" display="inline-block">
        <Box boxSize="200px" borderRadius="full" overflow="hidden">
          <HomePageAvatar avatarId={userData.avatarId} />
        </Box>
      </Box>
    </>
  )
}

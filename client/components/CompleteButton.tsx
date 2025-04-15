import useUserTodos from '../apis/use-user-todos'
import useUserDataAuth from '../apis/use-user-data-auth'
import { Box, Spinner } from '@chakra-ui/react'
import OneHeckle from './OneHeckle'

interface Props {
  userId: number
}

export default function Complete({ userId }: Props) {
  const {
    data: userData,
    isPending: isUserPending,
    error: userError,
  } = useUserDataAuth()
  const {
    data: todos,
    isPending: isTodosPending,
    error: todosError,
  } = useUserTodos(userId)

  if (isUserPending || isTodosPending) {
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
        <h2>Loading...</h2>
        <Spinner />
      </Box>
    )
  }

  // Handle error state
  if (userError || todosError || !userData || !todos) {
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
      <OneHeckle
        userId={userData.id}
        avatarId={userData.avatarId}
        urgency={0}
      />
    </>
  )
}

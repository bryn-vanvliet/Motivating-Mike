import useUserTodos from '../apis/use-user-todos'
import useUserDataAuth from '../apis/use-user-data-auth'
import { Box, List, Spinner, Text } from '@chakra-ui/react'
import OneHeckle from './OneHeckle'
import { useNavigate } from 'react-router-dom'
import HomePageAvatar from './HomePageAvatar'

interface Props {
  userId: number
}

export default function OneTodo({ userId }: Props) {
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

  const maxUrgency = Math.max(
    ...todos.filter((todo) => todo.urgency > 0).map((todo) => todo.urgency),
  )
  const filteredTodos = todos.filter((todo) => todo.urgency === maxUrgency)
  const randomTodo =
    filteredTodos.length > 0
      ? filteredTodos[Math.floor(Math.random() * filteredTodos.length)]
      : null

  return (
    <>
      {randomTodo ? (
        <>
          <Box position="relative" transform="translateX(40%)" mb={2}>
            <OneHeckle
              userId={userData.id}
              avatarId={userData.avatarId}
              urgency={randomTodo?.urgency}
            />
          </Box>

          <Box position="relative" display="inline-block">
            <Box boxSize="200px" borderRadius="full" overflow="hidden">
              <HomePageAvatar avatarId={userData.avatarId} />
            </Box>
          </Box>

          {/* Notepad Ticket Style Todo */}
          <Box
            backgroundColor="#F8F3E6"
            border="1.5px dashed #D1BEB0"
            borderRadius="6px"
            minW="360px" // Optimal width for content
            maxW="90vw"
            p={5}
            minH="auto"
            textAlign="left"
            fontFamily="'Homemade Apple', cursive"
            color="#6D5C54"
            boxShadow="0 3px 10px rgba(0,0,0,0.08)" // Softer shadow
            lineHeight="1.7" // Better readability
            position="relative"
            mx="auto" // Center horizontally
            _before={{
              content: '""',
              position: 'absolute',
              left: '-14px',
              top: '10px',
              bottom: '10px',
              width: '28px',
              background: `
      repeating-linear-gradient(
        to bottom,
        #F8F3E6,
        #F8F3E6 7px,
        transparent 7px,
        transparent 14px
      )
    `,
              clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)',
              borderLeft: '2px dashed #D1BEB0',
              opacity: 0.9,
            }}
            _after={{
              content: '""',
              position: 'absolute',
              right: '-14px',
              top: '10px',
              bottom: '10px',
              width: '28px',
              background: `
      repeating-linear-gradient(
        to bottom,
        #F8F3E6,
        #F8F3E6 7px,
        transparent 7px,
        transparent 14px
      )
    `,
              clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)',
              borderRight: '2px dashed #D1BEB0',
              opacity: 0.9,
            }}
          >
            {/* Header with decorative underline */}
            <Text
              fontSize="xl"
              fontWeight="bold"
              mb={5}
              borderBottom="1.5px dashed #D1BEB0"
              pb={2}
              letterSpacing="0.05em"
            >
              Current Todo
            </Text>

            {/* Main task with prominent styling */}
            <Text
              fontSize="2xl"
              mb={7}
              pl={5}
              position="relative"
              minH="90px"
              lineHeight="1.8"
            >
              <Box
                as="span"
                position="absolute"
                left={1}
                top="22px"
                w="12px"
                h="12px"
                bg="#D1BEB0"
                borderRadius="50%"
                opacity={0.8}
              />
              {randomTodo.task}
            </Text>

            {/* Footer with faded signature */}
            <Text
              fontSize="sm"
              mt={5}
              textAlign="right"
              opacity={0.6}
              fontStyle="italic"
              letterSpacing="0.1em"
            >
              ~ Motivating Mike ~
            </Text>
          </Box>
        </>
      ) : (
        <>
          <h4>You&apos;re all caught up!</h4>
          <button onClick={() => navigate(`/todo-list`)}>Add Todo</button>
        </>
      )}
    </>
  )
}

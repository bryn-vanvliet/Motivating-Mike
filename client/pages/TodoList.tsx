import { Link } from 'react-router-dom'
import AddTodo from '../components/AddTodo'
import DeleteSingleTodo from '../components/DeleteSingleTodo'
import EditTodo from '../components/EditTodo'
import {
  IfAuthenticated,
} from '../components/Authenticated'

import { useEffect, useState } from 'react'
import useUserTodos from '../apis/use-user-todos'
import useUserDataAuth from '../apis/use-user-data-auth'

import {
  Box,
  Flex,
  Heading,
  List,
  ListItem,
  Text,
  VStack,
  Button,
  Spinner,
  Badge,
} from '@chakra-ui/react'
import { useAuth0 } from '@auth0/auth0-react'

export default function TodoList() {
  const { data: userData, isPending, error } = useUserDataAuth()
  const {
    data: todos,
    isPending: todoPending,
    error: todosError,
  } = useUserTodos(userData?.id)
  const { loginWithRedirect, isAuthenticated } = useAuth0()
  const [editId, setEditId] = useState(0)
  const [stopLoading, setStopLoading] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStopLoading(true)
    }, 1500)

    return () => clearTimeout(timeout)
  }, [])

  const handleSignIn = () => {
    loginWithRedirect()
  }

  const handleClick = (id: number) => {
    setEditId(id)
  }

  if ((isPending || todoPending) && !stopLoading) {
    return (
      <Box height="100vh" backgroundColor="#B1CFB7">
        <Flex height="100%" align="center" justify="center">
          <VStack>
            <h2>Loading profile</h2>
            <Spinner />
          </VStack>
        </Flex>
      </Box>
    )
  }
  // -- IfNotAuthenticated Path -- //
  if (!isAuthenticated && stopLoading) {
    return (
      <Box height="100vh" backgroundColor="#B1CFB7">
        <Flex height="100%" align="center" justify="center">
          <VStack>
            <Button onClick={handleSignIn}>Sign In</Button>
            <p>Sign in to see your data</p>
          </VStack>
        </Flex>
      </Box>
    )
  }
  if (error || todosError) {
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
        <p>Error loading todos, take it as a sign to take a break</p>
      </Box>
    )
  }

  return (
    <>
      <IfAuthenticated>
        <Flex height="100vh">
          <Box
            flex="1"
            backgroundColor="#EFD9AA"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <AddTodo userId={userData?.id} />
          </Box>

          <Box
            flex="1"
            backgroundColor="#B1CFB7"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <VStack>
              <Box justifyContent="left">
                <Heading as="h3" fontFamily="Bangers">
                  <Text
                    fontFamily="'Indie Flower', cursive"
                    bg="yellow.50"
                    border="1px solid #ccc"
                    borderRadius="md"
                    boxShadow="md"
                  >
                    Todos:
                  </Text>
                </Heading>
              </Box>

              {editId === 0 ? (
                <Box
                  bg="yellow.50"
                  border="1px solid #ccc"
                  borderRadius="md"
                  px={4}
                  py={2}
                  boxShadow="md"
                  // fontFamily="'Indie Flower', cursive"
                  backgroundSize="100% 30px"
                  whiteSpace="pre-wrap"
                  width="100%"
                  maxHeight="60vh"
                  backgroundAttachment="local"
                  overflow="auto"
                >
                  <List
                    spacing={0}
                    fontSize="md"
                    lineHeight="30px"
                    fontFamily="'Courier New', monospace"
                    width="auto"
                    height="auto"
                  >
                    {todos
                      .filter((todo) => !todo.completed)
                      .map((todo) => (
                        <Flex key={todo.id}>
                          <ListItem
                            borderBottom="1px solid #ccc"
                            pb={2}
                            mb={2}
                            onDoubleClick={() => handleClick(todo.id)} // Set editId on double-click
                          >
                            <Flex w="25vw" alignItems="center">
                              {todo.task}
                              <Badge
                                ml={2}
                                colorScheme={
                                  todo.urgency === 3
                                    ? 'red'
                                    : todo.urgency === 2
                                      ? 'yellow'
                                      : 'green'
                                }
                              >
                                {todo.urgency === 3
                                  ? 'Severe'
                                  : todo.urgency === 2
                                    ? 'Should do'
                                    : 'Chill'}
                              </Badge>
                            </Flex>
                          </ListItem>
                          <DeleteSingleTodo todoId={todo.id} />
                        </Flex>
                      ))}
                  </List>
                </Box>
              ) : (
                todos
                  .filter((todo) => todo.id === editId)
                  .map((todo) => (
                    <EditTodo
                      key={todo.id}
                      todo={todo}
                      editId={editId}
                      onSave={() => setEditId(0)} // After save, reset editId to 0 to show the list again
                    />
                  ))
              )}

              <Box pt={4}>
                <Link to="/">
                  <Button color="#123456" bgColor="#B3D9E1">Lesh go!</Button>
                </Link>
              </Box>
            </VStack>
          </Box>
        </Flex>
      </IfAuthenticated>

    </>
  )
}

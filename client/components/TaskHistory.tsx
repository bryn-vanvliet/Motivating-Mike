import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  Icon,
  List,
  ListItem,
  Text,
  VStack,
} from '@chakra-ui/react'
import useTodos from '../apis/use-todos'
import { FaCheckCircle, FaRegCalendarAlt, FaRegClock } from 'react-icons/fa'
import DeleteSingleTodo from './DeleteSingleTodo'
import InComplete from './InCompleteButton'

interface Props {
  userId: number | null | undefined
}

export default function TaskHistory({ userId }: Props) {
  const { data: todos, isPending, error } = useTodos()

  const history = todos
    ? todos.filter((todo) => todo.userId === userId && todo.completed !== null)
    : []

  if (isPending) {
    return <Text>Fetching history...</Text>
  }

  if (error) {
    return <Text>Whoops! There was a problem fetching history.</Text>
  }

  if (history.length === 0) {
    return <Text>No completed tasks found for this user.</Text>
  }

  return (
    <Box
      bg="yellow.50"
      border="1px solid #ccc"
      borderRadius="md"
      px={4}
      py={2}
      boxShadow="md"
      whiteSpace="pre-wrap"
      width="100%"
      maxHeight="60vh"
      overflow="auto"
    >
      <Heading
        p={2}
        fontSize="25"
        lineHeight="30px"
        fontFamily="'Courier New', monospace"
        textAlign="center"
      >
        Task History
      </Heading>

      <VStack align="stretch" spacing={6}>
        <List
          spacing={0}
          fontSize="md"
          lineHeight="30px"
          fontFamily="'Courier New', monospace"
          width="full"
        >
          <ListItem borderBottom="1px solid #ccc" pb={2} mb={2}>
            <Flex>
              <Flex direction={'row'} w="full">
                <Box fontWeight="bold" flexBasis={'33%'} display="flex">
                  Task
                </Box>
                <Box
                  fontWeight="bold"
                  flexBasis={'33%'}
                  display="flex"
                  justifyContent="center"
                >
                  Date / Time
                </Box>
                <Box
                  fontWeight="bold"
                  flexBasis={'33%'}
                  display="flex"
                  justifyContent="end"
                >
                  Remove
                </Box>
              </Flex>
            </Flex>
          </ListItem>
          {history.map((todo) => (
            <ListItem key={todo.id} borderBottom="1px solid #ccc" pb={2} mb={2}>
              <Flex>
                <Flex direction={'row'} w="full">
                  <Box flexBasis={'33%'} display="flex">
                    {todo.task}
                  </Box>
                  <Box flexBasis={'33%'} display="flex" justifyContent="center">
                    {todo.completed}
                  </Box>
                  <Box flexBasis={'33%'} display="flex" justifyContent="end">
                    <Badge ml={2} colorScheme={'green'}>
                      Complete
                    </Badge>
                    <InComplete todoId={todo.id} />
                    <DeleteSingleTodo todoId={todo.id} />
                  </Box>
                </Flex>
              </Flex>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  )
}

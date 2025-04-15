import {
  Text,
  Button,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  VStack,
  FormLabel,
  FormControl,
  Box,
  Heading,
} from '@chakra-ui/react'
import { useAddTodo } from '../apis/use-add-todo'
import { useState } from 'react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const initialState = { task: '', urgency: '' }

interface Props {
  userId: number
}

function AddTodo({ userId }: Props) {
  const [formState, setFormState] = useState(initialState)
  const [dueDate, setDueDate] = useState<Date | null>(null)

  const addTodoMutation = useAddTodo()

  const urgencyMap: Record<string, number> = {
    Chill: 1,
    'Probably should start': 2,
    'Severe(whoops)': 3,
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    addTodoMutation.mutate({
      userId: userId,
      task: formState.task,
      urgency: urgencyMap[formState.urgency] || 0,
      due: dueDate ? dueDate.toISOString() : '',
    })
    setFormState(initialState)
    setDueDate(null)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value
    setFormState({ ...formState, [event.target.name as string]: inputText })
  }

  return (
    <Box
      width="330px"
      mx="auto"
      mt={10}
      p={6}
      boxShadow="lg"
      borderRadius="lg"
      bg="#FAF9F6"
    >
      <Heading mb={6} fontSize="2xl" textAlign="center">
        New Todo
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl>
            <FormLabel htmlFor="task">
              <Text fontWeight="bold">Task</Text>
            </FormLabel>
            <Input
              placeholder="e.g. Do dishes"
              type="text"
              name="task"
              id="task"
              value={formState.task}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="urgency">
              <Text fontWeight="bold">Urgency</Text>
            </FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                px={4}
                py={2}
                transition="all 0.2s"
                borderRadius="md"
                borderWidth="1px"
                _hover={{ bg: 'gray.400' }}
                _expanded={{ bg: 'blue.400' }}
                _focus={{ boxShadow: 'outline' }}
              >
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <strong>Urgency:</strong>
                  {formState.urgency || '...'}
                  <ChevronDownIcon />
                </span>
              </MenuButton>
              <MenuList>
                <MenuItem
                  onClick={() =>
                    setFormState({ ...formState, urgency: 'Chill' })
                  }
                >
                  Chill
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() =>
                    setFormState({
                      ...formState,
                      urgency: 'Probably should start',
                    })
                  }
                >
                  Probably should start
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() =>
                    setFormState({ ...formState, urgency: 'Severe(whoops)' })
                  }
                >
                  Severe(whoops)
                </MenuItem>
              </MenuList>
            </Menu>
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="due date">
              <Text fontWeight="bold">Due Date</Text>
            </FormLabel>
            <Box
              as="div"
              width="100%"
              p="8px 12px"
              borderRadius="8px"
              border="1px solid #CBD5E0"
              boxShadow="0 1px 3px rgba(0, 0, 0, 0.1)"
            >
              <ReactDatePicker
                selected={dueDate}
                onChange={(date: Date | null) => setDueDate(date)} // Ensure the date passed is Date or null
                dateFormat="MMMM d, yyyy"
                placeholderText="Select a due date"
                className="chakra-input"
              />
            </Box>
          </FormControl>

          <Button colorScheme="blue" type="submit">
            Add Todo
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default AddTodo

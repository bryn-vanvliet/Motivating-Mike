import { useEditTodo } from '../apis/use-edit-todo'
import { useState } from 'react'
import { Todo } from '../models/todos'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  VStack,
  Heading,
  Input,
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const initialState = { task: '', urgency: 0 }

export interface Props {
  todo: Todo
  editId: number
  onSave: () => void
}

const urgencyMap: Record<string, number> = {
  Complete: 0,

  Chill: 1,
  'Probably should start': 2,
  'Severe(whoops)': 3,
}

const reverseUrgencyMap: Record<number, string> = {
  0: 'Complete',
  1: 'Chill',
  2: 'Probably should start',
  3: 'Severe(whoops)',
}
function EditTodo({ todo, onSave, editId }: Props) {
  const [formState, setFormState] = useState({
    task: todo.task,
    urgency: todo.urgency,
  })

  const [dueDate, setDueDate] = useState(todo.due ? new Date(todo.due) : null)

  const editTodoMutation = useEditTodo(todo.id)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    editTodoMutation.mutate(
      {
        task: formState.task,
        urgency: formState.urgency,
        due: dueDate ? dueDate.toISOString() : null,
      },
      {
        onSuccess: () => {
          setFormState(initialState)
          if (editId === todo.id) {
            onSave()
          }
        },
      },
    )
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [event.target.name]: event.target.value })
  }

  const handleUrgencyChange = (urgencyLabel: string) => {
    const urgencyValue = urgencyMap[urgencyLabel]
    setFormState({ ...formState, urgency: urgencyValue })
  }

  const handleBlur = (event: React.FormEvent<HTMLFormElement>) => {
    if (formState.task !== todo.task) {
      handleSubmit(event)
    }
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
        Update Todo
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl width="100%" height="100%">
            <FormLabel htmlFor="task">
              <Text fontWeight="bold">Task</Text>
            </FormLabel>
            <Input
              type="text"
              name="task"
              id="task"
              value={formState.task}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="urgency">
              <Text fontWeight="bold">Urgency</Text>
            </FormLabel>
            <Menu>
              <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                {reverseUrgencyMap[formState.urgency] || 'Select urgency'}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleUrgencyChange('Chill')}>
                  Chill
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  onClick={() => handleUrgencyChange('Probably should start')}
                >
                  Probably should start
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={() => handleUrgencyChange('Severe(whoops)')}>
                  Severe(whoops)
                </MenuItem>
              </MenuList>
            </Menu>
          </FormControl>

          <FormControl>
            <FormLabel>
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
                onChange={(date: Date | null) => setDueDate(date)}
                dateFormat="MMMM d, yyyy"
                className="chakra-input"
              />
            </Box>
          </FormControl>

          <Button type="submit" colorScheme="blue">
            Update Todo
          </Button>
        </VStack>
      </form>
    </Box>

  )
}

export default EditTodo

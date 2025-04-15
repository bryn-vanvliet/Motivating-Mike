import { useDeleteTodo } from '../apis/use-delete-todo'
import { Box, DeleteIcon } from '@chakra-ui/icons'

interface Props {
  todoId: number
}
export default function DeleteSingleTodo(props: Props) {
  const deleteTodo = useDeleteTodo()

  const handleDelete = async () => {
    await deleteTodo.mutateAsync(props.todoId)
  }

  return (
    <Box>
      <DeleteIcon
        marginLeft={2}
        color="black"
        onClick={handleDelete}
        cursor="pointer"
      />
    </Box>
  )
}

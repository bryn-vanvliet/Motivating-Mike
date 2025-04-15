import { useDeleteTodo } from '../apis/use-delete-todo'
import { DeleteIcon } from '@chakra-ui/icons'

interface Props {
  todoId: number
}
export default function DeleteSingleTodo(props: Props) {
  const deleteTodo = useDeleteTodo()

  const handleDelete = async () => {
    await deleteTodo.mutateAsync(props.todoId)
  }

  return (
    <DeleteIcon
      marginLeft={4}
      color="black"
      onClick={handleDelete}
      cursor="pointer"
    />
  )
}

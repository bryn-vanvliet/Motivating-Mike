import { Icon } from '@chakra-ui/react'
import { CheckIcon, CloseIcon } from '@chakra-ui/icons'
import useUpdateIncomplete from '../apis/use-update-incomplete'

interface Props {
  todoId: number
}

export default function InComplete({ todoId }: Props) {
  const updateStatus = useUpdateIncomplete()

  const handleIncomplete = async () => {
    await updateStatus.mutateAsync(todoId)
  }

  return <Icon as={CloseIcon} color="#EFBA93" onClick={handleIncomplete} />
}

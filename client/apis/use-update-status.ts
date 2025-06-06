import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateTodoStatus = () => {
  const queryClient = useQueryClient()

  const updateStatus = async (id: number) => {
    const response = await fetch(`/api/v1/todostatus/complete/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to update todo status')
    }

    return response.json()
  }

  return useMutation({
    mutationFn: updateStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
    },
  })
}

export default useUpdateTodoStatus

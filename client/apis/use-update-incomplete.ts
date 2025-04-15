import { useMutation, useQueryClient } from '@tanstack/react-query'

const useUpdateIncomplete = () => {
  const queryClient = useQueryClient()

  const updateStatus = async (id: number) => {
    const response = await fetch(`/api/v1/todostatus/incomplete/${id}`, {
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

export default useUpdateIncomplete

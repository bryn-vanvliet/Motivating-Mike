import db from './../connection.ts'

// This is where the functions for

// updateStatusById
export default function formatDate(newDate: number) {
  const date = new Date(newDate)

  if (isNaN(date.getTime())) {
    return 'Invalid Date'
  }

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export async function updateCompleteById(Id: number) {
  const todoList = await db('todos')
    .where('todos.id', Id)
    .update({ completed: formatDate(Date.now()), urgency: 0 })

  return todoList
}

export async function updateIncompleteById(Id: number) {
  const todoList = await db('todos')
    .where('todos.id', Id)
    .update({ completed: null, urgency: 3 })

  return todoList
}

// updateUrgencyById

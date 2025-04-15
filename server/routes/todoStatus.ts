import express from 'express'
import * as db from '../db/functions/todoStatus'

const router = express.Router()

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const todos = await db.updateStatusById(id)
    res.json(todos)
  } catch (err) {
    console.error(err)
    res.sendStatus(500)
  }
})

export default router

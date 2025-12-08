import express from 'express'
import cors from 'cors'
import pkg from '@prisma/client'

const { PrismaClient } = pkg

const app = express()
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// GET /api/sessions  -> list sessions
app.get('/api/sessions', async (req, res) => {
  try {
    const sessions = await prisma.workoutSession.findMany({
      orderBy: { date: 'desc' },
    })
    res.json(sessions)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch sessions' })
  }
})

// POST /api/sessions  -> create a new session
app.post('/api/sessions', async (req, res) => {
  try {
    const { title, notes, completed } = req.body

    if (!title || typeof title !== 'string') {
      return res.status(400).json({ error: 'title is required' })
    }

    const session = await prisma.workoutSession.create({
      data: {
        title,
        notes: notes ?? null,
        completed: Boolean(completed),
      },
    })

    res.status(201).json(session)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create session' })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})

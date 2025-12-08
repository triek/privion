import { defineStore } from 'pinia'

import type { WorkoutExercise, WorkoutExercisePayload } from '@/types/workout'

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const SESSIONS_ENDPOINT = `${apiBaseUrl}/api/sessions`

const ensureJsonResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('content-type')

  if (!contentType?.includes('application/json')) {
    const bodyPreview = await response.text()
    const previewMessage = bodyPreview ? ` Response preview: ${bodyPreview.slice(0, 120)}` : ''
    throw new Error(
      `Server returned a non-JSON response${contentType ? ` (${contentType})` : ''}.${previewMessage}`.trim(),
    )
  }

  try {
    return (await response.json()) as T
  } catch (error) {
    throw new Error('Received malformed JSON from the server')
  }
}

export const useSessionStore = defineStore('sessionStore', {
  state: () => ({
    exercises: [] as WorkoutExercise[],
    loading: false,
    error: null as string | null,
  }),
  actions: {
    async fetchExercises() {
      this.loading = true
      this.error = null

      try {
        const response = await fetch(SESSIONS_ENDPOINT)
        if (!response.ok) {
          throw new Error('Failed to load workout sessions')
        }

        const data = await ensureJsonResponse<WorkoutExercise[]>(response)
        this.exercises = data
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unexpected error while loading exercises'
      } finally {
        this.loading = false
      }
    },
    async createExercise(payload: WorkoutExercisePayload) {
      this.error = null

      try {
        const response = await fetch(SESSIONS_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        })

        if (!response.ok) {
          throw new Error('Failed to create workout session')
        }

        const createdExercise = await ensureJsonResponse<WorkoutExercise>(response)
        this.exercises = [...this.exercises, createdExercise]

        return createdExercise
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unexpected error while creating exercise'
        throw error
      }
    },
  },
})

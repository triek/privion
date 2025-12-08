import { defineStore } from 'pinia'

import { workoutExercises } from '@/data/workoutExcercise'
import type { WorkoutExercise, WorkoutExercisePayload } from '@/types/workout'

const getCodespaceBackendUrl = () => {
  if (typeof window === 'undefined') return null

  const codespaceMatch = window.location.hostname.match(/^(.*)-\d+\.app\.github\.dev$/)

  if (codespaceMatch) {
    const [, baseHost] = codespaceMatch

    return `${window.location.protocol}//${baseHost}-3000.app.github.dev`
  }

  return null
}

const getDefaultApiBaseUrl = () => {
  const codespaceBackend = getCodespaceBackendUrl()

  if (codespaceBackend) {
    return codespaceBackend
  }

  if (import.meta.env.DEV) {
    return 'http://localhost:3000'
  }

  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  throw new Error('Unable to determine API base URL')
}

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || getDefaultApiBaseUrl()).replace(/\/$/, '')
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

const buildExerciseLoadError = (error: unknown): string => {
  if (error instanceof Error) {
    const previewLooksLikeHtml = error.message.includes('text/html') || error.message.includes('<!doctype html>')

    if (previewLooksLikeHtml) {
      return `${error.message}. Using built-in exercises instead. Check that the API is running at ${SESSIONS_ENDPOINT} or set VITE_API_BASE_URL to your backend.`
    }

    return `${error.message}. Loaded built-in exercises instead.`
  }

  return 'Unexpected error while loading exercises. Loaded built-in exercises instead.'
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
        console.error('Failed to fetch exercises from API, falling back to bundled data.', error)
        this.exercises = workoutExercises
        this.error = buildExerciseLoadError(error)
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
        console.error('Failed to persist exercise to API, storing locally instead.', error)
        const fallbackExercise: WorkoutExercise = {
          ...payload,
          id: crypto.randomUUID ? crypto.randomUUID() : `local-${Date.now()}`,
        }

        this.exercises = [...this.exercises, fallbackExercise]

        this.error =
          error instanceof Error
            ? `${error.message}. Saved locally only.`
            : 'Unexpected error while creating exercise. Saved locally only.'

        return fallbackExercise
      }
    },
  },
})

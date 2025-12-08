import { defineStore } from 'pinia'

import type { WorkoutExercise, WorkoutExercisePayload } from '@/types/workout'

const SESSIONS_ENDPOINT = '/api/sessions'

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

        const data: WorkoutExercise[] = await response.json()
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

        const createdExercise: WorkoutExercise = await response.json()
        this.exercises = [...this.exercises, createdExercise]

        return createdExercise
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'Unexpected error while creating exercise'
        throw error
      }
    },
  },
})

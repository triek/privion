import { defineStore } from 'pinia'

import { workoutHistory, type SessionRecord } from '@/data/workoutHistory'

// Store managing the history of workout sessions.
export const useSessionHistoryStore = defineStore('sessionHistory', {
  // Initializes state with existing workout history data.
  state: () => ({
    records: [...workoutHistory] as SessionRecord[],
    workoutClearedThrough: 0,
  }),
  getters: {
    // Counts total number of session records.
    totalEntries: (state) => state.records.length,
    // Sums exercises across all session records.
    totalExercises: (state) => state.records.reduce((total, record) => total + record.exercises.length, 0),
  },
  actions: {
    // Adds a new session record to the history.
    addRecord(record: SessionRecord) {
      this.records = [...this.records, record]
    },
    // Clears all session history records.
    clearHistory() {
      this.records = []
      this.workoutClearedThrough = 0
    },
    // Marks workouts as cleared through current record count.
    clearWorkoutViewHistory() {
      this.workoutClearedThrough = this.records.length
    },
  },
})

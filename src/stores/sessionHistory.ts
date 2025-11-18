import { defineStore } from 'pinia'

import { workoutHistory, type SessionRecord } from '@/data/workoutHistory'

export const useSessionHistoryStore = defineStore('sessionHistory', {
  state: () => ({
    records: [...workoutHistory] as SessionRecord[],
  }),
  getters: {
    totalEntries: (state) => state.records.length,
    totalExercises: (state) => state.records.reduce((total, record) => total + record.exercises.length, 0),
  },
  actions: {
    addRecord(record: SessionRecord) {
      this.records = [...this.records, record]
    },
    clearHistory() {
      this.records = []
    },
  },
})

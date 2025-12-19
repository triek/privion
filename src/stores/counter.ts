import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

// Store tracking a simple counter example.
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  // Computes a derived count value doubled.
  const doubleCount = computed(() => count.value * 2)
  // Increments the counter by one.
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

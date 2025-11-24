<template>
  <div class="space-y-8">
    <!-- Navigation buttons -->
    <div class="flex justify-between items-center">
      <RouterLink
        to="/workout"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        ← Back to workout
      </RouterLink>
      <RouterLink
        to="/workout-routine"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        Workout routine
      </RouterLink>
    </div>

    <!-- Header -->
    <header class="space-y-3 mx-2">
      <h1 class="text-3xl font-bold text-white">Session history book</h1>
      <p class="max-w-2xl text-sm text-slate-400">
        Filter every tracked workout just like the exercise and recipe books. Toggle the focus to
        quickly review Push, Pull, or Leg days and spot trends in your training log.
      </p>
    </header>

    <section
      class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30"
    >
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Session filter</h2>
          <p class="text-xs uppercase tracking-wide text-emerald-200">
            {{ filteredHistory.length }} sessions · {{ totalExercisesTracked }} exercises
          </p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in planFilters"
            :key="filter.value"
            type="button"
            class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition"
            :class="
              selectedPlan === filter.value
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                : 'border-white/15 bg-slate-950/60 text-slate-300 hover:border-white/30 hover:text-white'
            "
            @click="selectedPlan = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <section class="space-y-6">
      <div v-if="filteredHistory.length" class="space-y-4">
        <article
          v-for="record in filteredHistory"
          :key="record.session"
          class="card-surface space-y-4 p-5"
        >
          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <h3 class="text-lg font-semibold text-white">{{ record.session }}</h3>
            <span class="text-xs font-semibold uppercase tracking-wide text-emerald-300"
              >{{ record.exercises.length }} exercises</span
            >
          </div>

          <ul class="space-y-3 text-sm text-slate-200">
            <li
              v-for="(exercise, exerciseIndex) in record.exercises"
              :key="`${record.session}-${exercise.name}-${exerciseIndex}`"
              class="space-y-1"
            >
              <div
                class="text-sm text-slate-200 grid gap-1 sm:grid-cols-[5fr_3fr_2fr] sm:items-center sm:w-full"
              >
                <div class="flex items-center justify-start">
                  <span class="font-semibold text-white">{{ exercise.name }}</span>
                </div>

                <div class="flex items-center justify-between sm:contents">
                  <div class="flex items-center sm:justify-center gap-2">
                    <span>{{ formatHistorySets(exercise) }}</span>
                    <span class="text-slate-500">·</span>
                    <span>{{ exercise.reps }} reps</span>
                  </div>

                  <div class="flex items-center sm:justify-end">
                    <span
                      class="flex justify-center font-semibold text-emerald-200 sm:font-medium sm:text-slate-200 sm:normal-case"
                    >
                      {{ exercise.weight }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </article>
      </div>
      <div
        v-else
        class="rounded-2xl border border-dashed border-white/15 bg-slate-950/70 p-6 text-center text-sm text-slate-400"
      >
        No sessions match this filter yet. Run a workout to add a new entry.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { Plan } from '@/data/workoutRoutine'
import { workoutPlans } from '@/data/workoutRoutine'
import type { SessionRecord } from '@/data/workoutHistory'
import { useSessionHistoryStore } from '@/stores/sessionHistory'

type PlanFilter = 'all' | Plan['id']

const sessionHistoryStore = useSessionHistoryStore()
const planFilters = [
  { label: 'All sessions', value: 'all' },
  ...workoutPlans.map((plan) => ({ label: `${plan.label} Day`, value: plan.id })),
]

const selectedPlan = ref<PlanFilter>('all')

const filteredHistory = computed<SessionRecord[]>(() => {
  if (selectedPlan.value === 'all') {
    return sessionHistoryStore.records
  }

  return sessionHistoryStore.records.filter((record) => record.planId === selectedPlan.value)
})

const totalExercisesTracked = computed(() =>
  filteredHistory.value.reduce((total, record) => total + record.exercises.length, 0),
)

function formatHistorySets(exercise: SessionRecord['exercises'][number]) {
  if (exercise.setsCompleted === exercise.setsPlanned) {
    return `${exercise.setsCompleted} sets`
  }

  return `${exercise.setsCompleted} / ${exercise.setsPlanned} sets`
}
</script>

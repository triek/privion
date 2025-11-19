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
        Routine book
      </RouterLink>
    </div>

    <!-- Header -->
    <header class="space-y-3 mx-2">
      <h1 class="text-3xl font-bold text-white">Hypertrophy exercise book</h1>
      <p class="max-w-2xl text-sm text-slate-400">
        Filter the complete hypertrophy catalog by primary muscle group to find the perfect movement for the next training
        block.
      </p>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="space-y-2">
          <!-- Filter -->
          <h2 class="text-lg font-semibold text-white">Exercise filter</h2>
          <p class="max-w-xl text-sm text-slate-400">
            Each movement is selected for hypertrophy-focused training with controlled tempos, defined end ranges, and simple
            coaching cues. Use the filter to lock in the area you want to bring up.
          </p>
          <p class="text-xs uppercase tracking-wide text-emerald-200">{{ filteredExercises.length }} movements available</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="filter in muscleFilters"
            :key="filter.value"
            type="button"
            class="rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wide transition"
            :class="
              selectedMuscle === filter.value
                ? 'border-emerald-400 bg-emerald-500/20 text-emerald-100'
                : 'border-white/15 bg-slate-950/60 text-slate-300 hover:border-white/30 hover:text-white'
            "
            @click="selectedMuscle = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>

      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <!-- Exercises -->
        <article
          v-for="exercise in filteredExercises"
          :key="exercise.name"
          class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300"
        >
          <header class="space-y-2">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ exercise.muscle }}</p>
            <h3 class="text-lg font-semibold text-white">{{ exercise.name }}</h3>
            <p class="text-xs uppercase tracking-wide text-slate-500">Equipment: {{ exercise.equipment }}</p>
          </header>
          <p class="text-slate-400">{{ exercise.description }}</p>
          <ul class="space-y-1 text-xs text-slate-400">
            <li v-for="cue in exercise.cues" :key="cue" class="flex items-start gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>{{ cue }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

import { hypertrophyExercises } from '@/data/hypertrophyExercises'
import type { MuscleGroup } from '@/data/hypertrophyExercises'

type FilterOption = 'All' | MuscleGroup

const muscleFilters: { label: string; value: FilterOption }[] = [
  { label: 'All muscles', value: 'All' },
  { label: 'Biceps', value: 'Biceps' },
  { label: 'Triceps', value: 'Triceps' },
  { label: 'Chest', value: 'Chest' },
  { label: 'Back', value: 'Back' },
  { label: 'Shoulders', value: 'Shoulders' },
  { label: 'Lats', value: 'Lats' },
  { label: 'Erectors', value: 'Erectors' },
  { label: 'Abs', value: 'Abs' },
  { label: 'Hips', value: 'Hips' },
  { label: 'Quads', value: 'Quads' },
  { label: 'Hamstrings', value: 'Hamstrings' },
]

const exercises = hypertrophyExercises

const selectedMuscle = ref<FilterOption>('All')

const filteredExercises = computed(() =>
  selectedMuscle.value === 'All'
    ? exercises
    : exercises.filter((exercise) => exercise.muscle === selectedMuscle.value)
)
</script>

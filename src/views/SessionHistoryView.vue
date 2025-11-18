<template>
  <div class="space-y-10">
    <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-white">Session history</h1>
        <p class="text-sm text-slate-300">A permanent log of every workout you've tracked.</p>
      </div>
    </section>

    <section class="space-y-6">
      <div class="flex flex-col gap-3 mx-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-white">History archive</h2>
          <p class="text-sm text-slate-400">Review every past session in one place.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ fullHistory.length }} entries</span>
          <RouterLink
            class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/60 hover:text-white"
            to="/workout"
          >
            Back to workout
          </RouterLink>
        </div>
      </div>

      <div class="space-y-4">
        <article
          v-for="record in fullHistory"
          :key="record.session"
          class="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5"
        >
          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <h3 class="text-lg font-semibold text-white">{{ record.session }}</h3>
            <span class="text-xs font-semibold uppercase tracking-wide text-emerald-300">{{ record.exercises.length }} exercises</span>
          </div>

          <ul class="space-y-3 text-sm text-slate-200">
            <li
              v-for="(exercise, exerciseIndex) in record.exercises"
              :key="`${record.session}-${exercise.name}-${exerciseIndex}`"
              class="space-y-1"
            >
              <div class="text-sm text-slate-200 grid gap-1 sm:grid-cols-[5fr_3fr_2fr] sm:items-center sm:w-full">
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
                    <span class="flex justify-center font-semibold text-emerald-200 sm:font-medium sm:text-slate-200 sm:normal-case">
                      {{ exercise.weight }}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { SessionRecord } from '@/data/workoutHistory'
import { workoutHistory } from '@/data/workoutHistory'

const fullHistory: SessionRecord[] = workoutHistory

function formatHistorySets(exercise: SessionRecord['exercises'][number]) {
  if (exercise.setsCompleted === exercise.setsPlanned) {
    return `${exercise.setsCompleted} sets`
  }

  return `${exercise.setsCompleted} / ${exercise.setsPlanned} sets`
}
</script>

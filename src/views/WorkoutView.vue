<template>
  <div class="space-y-10">
    <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-white">Workout</h1>
        <p v-if="hasPlanner" class="text-sm text-slate-400">Week {{ planner.week }} · Day {{ planner.day }}</p>
      </div>

      <p class="mt-6 text-sm text-slate-300">
        Lock in today’s intent, review your recent efforts, and be ready to launch the next session when you’re set.
      </p>
    </section>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-white">Session history</h2>
          <p class="text-sm text-slate-400">Latest tracked workouts with weights, sets, and reps.</p>
        </div>
        <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ historySessions.length }} entries</span>
      </div>

      <ul class="space-y-4">
        <li v-for="record in historySessions" :key="record.session">
          <article class="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
            <h3 class="text-lg font-semibold text-white">{{ record.session }}</h3>
            <ul class="space-y-2 text-sm text-slate-300">
              <li v-for="exercise in record.exercises" :key="`${record.session}-${exercise}`">{{ exercise }}</li>
            </ul>
          </article>
        </li>
      </ul>
    </section>

    <section
      v-if="sessionActive && activePlan"
      class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30"
    >
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-white">{{ activePlan.title }}</h2>
          <p class="text-sm text-slate-400">Stay present, finish strong.</p>
        </div>
        <button
          class="inline-flex items-center justify-center rounded-full border border-emerald-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
          type="button"
          @click="finishSession"
        >
          Finish session
        </button>
      </div>

      <div class="space-y-5">
        <article
          v-for="(exercise, index) in sessionExercises"
          :key="`${exercise.name}-${index}`"
          class="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5"
        >
          <div class="flex flex-col gap-1">
            <h3 class="text-lg font-semibold text-white">{{ exercise.name }}</h3>
            <p class="text-sm text-slate-300">{{ exercise.sets }} × {{ exercise.reps }}</p>
            <p v-if="exercise.notes" class="text-xs text-slate-400">{{ exercise.notes }}</p>
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="(checked, setIndex) in exercise.completion"
              :key="`set-${index}-${setIndex}`"
              :aria-pressed="checked"
              class="flex h-10 w-10 items-center justify-center rounded-xl border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              :class="checked
                ? 'border-transparent bg-emerald-400 text-slate-900 hover:bg-emerald-300'
                : 'border-white/15 bg-transparent text-slate-300 hover:border-emerald-300/60 hover:text-white'
              "
              type="button"
              @click="toggleSet(index, setIndex)"
            >
              {{ setIndex + 1 }}
            </button>
          </div>
        </article>
      </div>
    </section>

    <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <h2 class="text-2xl font-semibold text-white">Ready for the next one?</h2>
          <p class="text-sm text-slate-400">Kick off your planned session or pick a different focus.</p>
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <button
            class="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-900 shadow shadow-emerald-500/40 transition hover:-translate-y-0.5 hover:bg-emerald-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            type="button"
            @click="startTodayPlan"
          >
            Start {{ recommendedPlanLabel }}
          </button>
          <button
            class="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            type="button"
            @click="showPlanPicker = true"
          >
            Start…
          </button>
        </div>
      </div>
    </section>

    <div ref="pageEndRef"></div>

    <transition name="fade">
      <div
        v-if="showPlanPicker"
        class="fixed inset-0 z-40 flex items-end justify-center"
      >
        <div class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" @click="closePlanPicker"></div>
        <div class="relative w-full max-w-lg rounded-t-3xl border border-white/10 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/40">
          <div class="mb-5 flex items-center justify-between">
            <h3 class="text-lg font-semibold text-white">Pick a plan</h3>
            <button
              class="text-xs font-semibold uppercase tracking-wide text-slate-400 transition hover:text-white"
              type="button"
              @click="closePlanPicker"
            >
              Close
            </button>
          </div>

          <ul class="space-y-3">
            <li
              v-for="plan in weeklyPlan"
              :key="plan.id"
            >
              <button
                class="flex w-full flex-col items-start rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-slate-900"
                type="button"
                @click="startSession(plan)"
              >
                <span class="text-sm font-semibold uppercase tracking-wide text-emerald-300">{{ plan.label }} Day</span>
                <span class="mt-1 text-lg font-semibold text-white">{{ plan.title }}</span>
                <span class="mt-1 text-xs text-slate-400">{{ plan.exercises.length }} exercises · {{ plan.week ? `Week ${plan.week}` : 'Custom' }}</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref } from 'vue'
import type { Exercise, Plan } from '@/data/workoutPlans'
import { workoutPlans } from '@/data/workoutPlans'
import type { SessionRecord } from '@/data/workoutHistory'
import { workoutHistory } from '@/data/workoutHistory'

type SessionExercise = Exercise & {
  completion: boolean[]
}

const hasPlanner = true
const planner = reactive({
  week: 4,
  day: 2,
})

const weeklyPlan: Plan[] = workoutPlans

const showPlanPicker = ref(false)
const sessionActive = ref(false)
const activePlan = ref<Plan | null>(null)
const sessionExercises = ref<SessionExercise[]>([])
const historySessions = ref<SessionRecord[]>([...workoutHistory])
const pageEndRef = ref<HTMLElement | null>(null)

const rotationOrder: Plan['id'][] = ['push', 'pull', 'legs']

const recommendedPlan = computed<Plan | null>(() => {
  if (weeklyPlan.length === 0) {
    return null
  }

  const lastPlanId = historySessions.value[0]?.planId
  if (!lastPlanId) {
    return weeklyPlan[0]
  }

  const currentIndex = rotationOrder.indexOf(lastPlanId)
  const nextPlanId = currentIndex === -1 ? rotationOrder[0] : rotationOrder[(currentIndex + 1) % rotationOrder.length]

  return weeklyPlan.find((plan) => plan.id === nextPlanId) ?? weeklyPlan[0]
})

const recommendedPlanLabel = computed(() => {
  if (recommendedPlan.value) {
    return `${recommendedPlan.value.label} Day`
  }
  return 'Session'
})

onMounted(() => {
  nextTick(() => {
    pageEndRef.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  })
})

function startSession(plan: Plan) {
  activePlan.value = plan
  sessionExercises.value = plan.exercises.map((exercise) => ({
    ...exercise,
    completion: Array.from({ length: exercise.sets }, () => false),
  }))
  sessionActive.value = true
  showPlanPicker.value = false
}

function startTodayPlan() {
  if (!recommendedPlan.value) {
    return
  }
  startSession(recommendedPlan.value)
}

function toggleSet(exerciseIndex: number, setIndex: number) {
  const exercise = sessionExercises.value[exerciseIndex]
  if (!exercise) {
    return
  }

  exercise.completion[setIndex] = !exercise.completion[setIndex]
}

function finishSession() {
  if (!activePlan.value) {
    return
  }

  const completedPlan = activePlan.value
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const completedExercises = sessionExercises.value.map((exercise) => `${exercise.name} ${exercise.sets} × ${exercise.reps}`)

  const newRecord: SessionRecord = {
    session: `${month}/${day} - ${completedPlan.label} Day`,
    planId: completedPlan.id,
    exercises: completedExercises,
  }

  historySessions.value = [newRecord, ...historySessions.value]

  sessionActive.value = false
  activePlan.value = null
  sessionExercises.value = []
}

function closePlanPicker() {
  showPlanPicker.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

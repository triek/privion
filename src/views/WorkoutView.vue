<template>
  <div class="space-y-10">
    <!-- Workout banner -->
    <section
      class="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30"
    >
      <div class="space-y-2">
        <h1 class="text-3xl font-bold text-white">Workout</h1>
        <p v-if="hasPlanner" class="text-sm text-slate-400">
          Week {{ planner.week }} · Day {{ planner.day }}
        </p>
      </div>

      <p class="mt-6 text-sm text-slate-300">
        Lock in today's intent, review your recent efforts, and be ready to launch the next session
        when you're set.
      </p>
    </section>

    <!-- Session history -->
    <section class="space-y-6">
      <div class="flex flex-col gap-2 mx-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-2xl font-semibold text-white">Session history</h2>
          <p class="text-sm text-slate-400">
            Latest tracked workouts with weights, sets, and reps.
          </p>
        </div>
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-semibold uppercase tracking-wide text-slate-500"
            >{{ visibleHistory.length }} entries</span
          >
          <button
            class="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-100 transition hover:-translate-y-0.5 hover:border-emerald-300/60 hover:text-white"
            type="button"
            @click="clearSessionHistory"
          >
            Clear session history
          </button>
          <button
            class="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:text-emerald-100"
            type="button"
            @click="goToSessionHistory"
          >
            View all history
          </button>
        </div>
      </div>

      <div ref="historyContainerRef" class="history-scroll overflow-y-auto pr-1">
        <ul class="space-y-4 pb-1">
          <li v-for="record in visibleHistory" :key="record.session">
            <article class="space-y-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5">
              <div class="flex items-baseline justify-between gap-3">
                <h3 class="text-lg font-semibold text-white">{{ record.session }}</h3>
                <span class="text-xs font-semibold uppercase tracking-wide text-emerald-300"
                  >{{ record.exercises.length }} exercises</span
                >
              </div>

              <!-- Session list -->
              <ul class="space-y-3 text-sm text-slate-200">
                <li
                  v-for="(exercise, exerciseIndex) in record.exercises"
                  :key="`${record.session}-${exercise.name}-${exerciseIndex}`"
                  class="space-y-1"
                >
                  <div
                    class="text-sm text-slate-200 grid gap-1 sm:grid-cols-[5fr_3fr_2fr] sm:items-center sm:w-full"
                  >
                    <!-- Name -->
                    <div class="flex items-center justify-start">
                      <span class="font-semibold text-white">{{ exercise.name }}</span>
                    </div>

                    <div class="flex items-center justify-between sm:contents">
                      <!-- Sets and reps -->
                      <div class="flex items-center sm:justify-center gap-2">
                        <span>{{ formatHistorySets(exercise) }}</span>
                        <span class="text-slate-500">·</span>
                        <span>{{ exercise.reps }} reps</span>
                      </div>

                      <!-- Weight -->
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
          </li>
        </ul>
      </div>
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
          <div class="flex flex-col gap-3">
            <div class="flex flex-col gap-1">
              <h3 class="text-lg font-semibold text-white">{{ exercise.name }}</h3>
              <div class="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                <!-- Sets -->
                <label :for="`sets-${index}`" class="flex items-center gap-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >Sets</span
                  >
                  <input
                    :id="`sets-${index}`"
                    v-model.number="exercise.sets"
                    class="h-9 w-12 rounded-lg border border-white/10 bg-slate-900/70 px-2 py-1 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    min="1"
                    step="1"
                    type="number"
                    inputmode="numeric"
                    @change="normalizeSets(index)"
                  />
                </label>
                <span class="hidden text-slate-500 sm:inline">·</span>

                <!-- Reps -->
                <label :for="`reps-${index}`" class="flex items-center gap-2">
                  <span class="text-xs font-semibold uppercase tracking-wide text-slate-400"
                    >Reps</span
                  >
                  <input
                    :id="`reps-${index}`"
                    v-model.number="exercise.reps"
                    class="h-9 w-14 rounded-lg border border-white/10 bg-slate-900/70 px-2 py-1 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    min="1"
                    step="1"
                    type="number"
                    inputmode="numeric"
                    @change="normalizeReps(index)"
                  />
                </label>
              </div>
            </div>

            <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <!-- Weight used -->
              <div class="flex w-full max-w-xs flex-col gap-1">
                <label
                  :for="`weight-${index}`"
                  class="text-xs font-semibold uppercase tracking-wide text-slate-400"
                  >Weight used</label
                >
                <div class="flex items-center gap-2">
                  <input
                    :id="`weight-${index}`"
                    v-model="exercise.weight"
                    class="w-20 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    placeholder="Body Wg"
                    type="text"
                    inputmode="decimal"
                  />
                  <span class="text-sm font-medium text-slate-400">kg</span>
                </div>
              </div>

              <!-- Sets check -->
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="(checked, setIndex) in exercise.completion"
                  :key="`set-${index}-${setIndex}`"
                  :aria-pressed="checked"
                  class="flex h-10 w-10 items-center justify-center rounded-full border text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                  :class="
                    checked
                      ? 'border-transparent bg-emerald-400 text-slate-900 hover:bg-emerald-300'
                      : 'border-white/15 bg-transparent text-slate-300 hover:border-emerald-300/60 hover:text-white'
                  "
                  type="button"
                  @click="toggleSet(index, setIndex)"
                >
                  {{ setIndex + 1 }}
                </button>
              </div>
            </div>

            <!-- Notes -->
            <p v-if="exercise.notes" class="text-xs text-slate-400">{{ exercise.notes }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- Session creation -->
    <section
      class="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30"
    >
      <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <h2 class="text-2xl font-semibold text-white">Ready for the next one?</h2>
          <p class="text-sm text-slate-400">
            Kick off your planned session or pick a different focus.
          </p>
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
      <div v-if="showPlanPicker" class="fixed inset-0 z-40 flex items-end justify-center">
        <div
          class="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
          @click="closePlanPicker"
        ></div>
        <div
          class="relative w-full max-w-lg rounded-t-3xl border border-white/10 bg-slate-900/95 p-6 shadow-xl shadow-slate-950/40"
        >
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
            <li v-for="plan in weeklyPlan" :key="plan.id">
              <button
                class="flex w-full flex-col items-start rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-slate-900"
                type="button"
                @click="startSession(plan)"
              >
                <span class="text-sm font-semibold uppercase tracking-wide text-emerald-300"
                  >{{ plan.label }} Day</span
                >
                <span class="mt-1 text-lg font-semibold text-white">{{ plan.title }}</span>
                <span class="mt-1 text-xs text-slate-400"
                  >{{ plan.exercises.length }} exercises ·
                  {{ plan.week ? `Week ${plan.week}` : 'Custom' }}</span
                >
              </button>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import type { Plan } from '@/data/workoutPlans'
import { workoutPlans } from '@/data/workoutPlans'
import type { SessionRecord } from '@/data/workoutHistory'
import { useSessionHistoryStore } from '@/stores/sessionHistory'

type SessionExercise = {
  name: string
  notes?: string
  sets: number
  reps: number
  completion: boolean[]
  weight: string
  planRepsLabel: string
  planSets: number
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
const sessionHistoryStore = useSessionHistoryStore()
const clearedIndex = ref(0)
const historySessions = computed<SessionRecord[]>(() => sessionHistoryStore.records)
const visibleHistory = computed<SessionRecord[]>(() =>
  sessionHistoryStore.records.slice(clearedIndex.value),
)
const historyContainerRef = ref<HTMLElement | null>(null)
const pageEndRef = ref<HTMLElement | null>(null)

const rotationOrder: Plan['id'][] = ['push', 'pull', 'legs']

function formatHistorySets(exercise: SessionRecord['exercises'][number]) {
  if (exercise.setsCompleted === exercise.setsPlanned) {
    return `${exercise.setsCompleted} sets`
  }

  return `${exercise.setsCompleted} / ${exercise.setsPlanned} sets`
}

const recommendedPlan = computed<Plan | null>(() => {
  if (weeklyPlan.length === 0) {
    return null
  }

  const lastRecordIndex = historySessions.value.length - 1
  const lastPlanId =
    lastRecordIndex >= 0 ? historySessions.value[lastRecordIndex]?.planId : undefined
  if (!lastPlanId) {
    return weeklyPlan[0] ?? null
  }

  const currentIndex = rotationOrder.indexOf(lastPlanId)
  const nextPlanId =
    currentIndex === -1
      ? rotationOrder[0]
      : rotationOrder[(currentIndex + 1) % rotationOrder.length]

  const nextPlan = weeklyPlan.find((plan) => plan.id === nextPlanId)
  return nextPlan ?? weeklyPlan[0] ?? null
})

const recommendedPlanLabel = computed(() => {
  if (recommendedPlan.value) {
    return `${recommendedPlan.value.label} Day`
  }
  return 'Session'
})

onMounted(() => {
  scrollHistoryToBottom()
  nextTick(() => {
    pageEndRef.value?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  })
})

watch(
  () => visibleHistory.value.length,
  () => {
    scrollHistoryToBottom()
  },
)

function scrollHistoryToBottom() {
  nextTick(() => {
    const container = historyContainerRef.value
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  })
}

function clearSessionHistory() {
  clearedIndex.value = sessionHistoryStore.records.length
}

function goToSessionHistory() {
  router.push({ name: 'session-history' })
}

function startSession(plan: Plan) {
  const previousRecord = findLatestRecordForPlan(plan.id)

  activePlan.value = plan

  sessionExercises.value = plan.exercises.map((exercise) => {
    const previousExercise = previousRecord?.exercises.find((item) => item.name === exercise.name)

    const derivedSets = sanitizePositiveInteger(previousExercise?.setsPlanned ?? exercise.sets)
    const derivedReps = sanitizePositiveInteger(
      parseNumericFromString(previousExercise?.reps) ??
        parseNumericFromString(exercise.reps) ??
        exercise.sets,
    )
    const normalizedWeight = normalizeWeightInput(previousExercise?.weight)

    return {
      name: exercise.name,
      notes: exercise.notes,
      sets: derivedSets,
      reps: derivedReps,
      completion: Array.from({ length: derivedSets }, () => false),
      weight: normalizedWeight,
      planRepsLabel: exercise.reps,
      planSets: exercise.sets,
    }
  })

  sessionExercises.value.forEach((_, index) => {
    normalizeSets(index)
    normalizeReps(index)
  })

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

  if (setIndex >= exercise.completion.length) {
    return
  }

  const highestCompletedIndex = exercise.completion.lastIndexOf(true)

  if (exercise.completion[setIndex] && highestCompletedIndex === setIndex) {
    for (let i = 0; i <= setIndex; i += 1) {
      exercise.completion[i] = false
    }
    return
  }

  for (let i = 0; i < exercise.completion.length; i += 1) {
    exercise.completion[i] = i <= setIndex
  }
}

function finishSession() {
  if (!activePlan.value) {
    return
  }

  const completedPlan = activePlan.value
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')

  const completedExercises: SessionRecord['exercises'] = sessionExercises.value.map((exercise) => {
    const completedSets = Math.min(exercise.sets, exercise.completion.filter(Boolean).length)
    return {
      name: exercise.name,
      weight: formatWeightForHistory(exercise.weight),
      setsCompleted: completedSets,
      setsPlanned: exercise.sets,
      reps: String(exercise.reps),
    }
  })

  const newRecord: SessionRecord = {
    session: `${month}/${day} - ${completedPlan.label} Day`,
    planId: completedPlan.id,
    exercises: completedExercises,
  }

  sessionHistoryStore.addRecord(newRecord)

  sessionActive.value = false
  activePlan.value = null
  sessionExercises.value = []
}

function closePlanPicker() {
  showPlanPicker.value = false
}

function findLatestRecordForPlan(planId: Plan['id']) {
  for (let index = historySessions.value.length - 1; index >= 0; index -= 1) {
    const record = historySessions.value[index]
    if (!record) {
      continue
    }
    if (record.planId === planId) {
      return record
    }
  }
  return null
}

function parseNumericFromString(value?: string | number) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (!value) {
    return undefined
  }

  const match = String(value).match(/\d+(?:\.\d+)?/)
  return match ? Number(match[0]) : undefined
}

function sanitizePositiveInteger(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return 1
  }
  return Math.max(1, Math.round(value))
}

function normalizeSets(exerciseIndex: number) {
  const exercise = sessionExercises.value[exerciseIndex]
  if (!exercise) {
    return
  }

  const sanitizedSets = sanitizePositiveInteger(exercise.sets)
  if (exercise.sets !== sanitizedSets) {
    exercise.sets = sanitizedSets
  }

  const nextCompletion = Array.from(
    { length: exercise.sets },
    (_, index) => exercise.completion[index] ?? false,
  )
  exercise.completion = nextCompletion
}

function normalizeReps(exerciseIndex: number) {
  const exercise = sessionExercises.value[exerciseIndex]
  if (!exercise) {
    return
  }

  const sanitizedReps = sanitizePositiveInteger(exercise.reps)
  if (exercise.reps !== sanitizedReps) {
    exercise.reps = sanitizedReps
  }
}

function normalizeWeightInput(weight?: string) {
  if (!weight) {
    return ''
  }

  const trimmed = weight.trim()

  if (!trimmed) {
    return ''
  }

  if (/^bodyweight$/i.test(trimmed)) {
    return 'Bodyweight'
  }

  return trimmed.replace(/\s*kg$/i, '')
}

function formatWeightForHistory(weightInput: string) {
  const trimmed = weightInput.trim()

  if (!trimmed) {
    return 'Bodyweight'
  }

  if (/^bodyweight$/i.test(trimmed)) {
    return 'Bodyweight'
  }

  if (/kg$/i.test(trimmed)) {
    return trimmed
  }

  if (/^[\d.,]+$/.test(trimmed)) {
    return `${trimmed}kg`
  }

  if (/^\d+\s*[×x]\s*\d+$/.test(trimmed)) {
    return `${trimmed.replace(/\s+/g, '')}kg`
  }

  return trimmed
}
</script>

<style scoped>
.history-scroll {
  max-height: calc(3 * 12.5rem + 2rem);
}

@media (min-width: 768px) {
  .history-scroll {
    max-height: calc(3 * 13.75rem + 2rem);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

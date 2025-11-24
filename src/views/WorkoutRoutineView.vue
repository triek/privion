<template>
  <div class="space-y-4">
    <!-- Navigation buttons -->
    <div class="flex justify-between items-center">
      <RouterLink
        to="/workout"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        ← Back to workout
      </RouterLink>
      <RouterLink
        to="/workout-exercises"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        Exercises book
      </RouterLink>
    </div>

    <!-- Header -->
    <header class="space-y-3 mx-2">
      <h1 class="text-3xl font-bold text-white">Workout routines</h1>
      <p class="max-w-2xl text-sm text-slate-400">
        Keep your favorite training playlists tidy, switch what the log is using, and build new
        templates with the exact sets, reps, and weights you need.
      </p>
    </header>

    <section class="panel-surface space-y-4">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-wide text-emerald-200">
            Active routine set
          </p>
          <h2 class="text-xl font-semibold text-white">
            {{ activeRoutine?.setName ?? 'No routine selected' }}
          </h2>
        </div>
        <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div class="text-xs text-slate-400">
            <span
              >This split has {{ activeRoutineSetRoutines.length }} routine{{
                activeRoutineSetRoutines.length === 1 ? '' : 's'
              }}</span
            >
          </div>
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
            @click="showSwitchModal = true"
          >
            Switch routine set
          </button>
        </div>
      </div>

      <div v-if="activeRoutine" class="space-y-4">
        <div v-if="activeRoutine" class="space-y-4">
          <ul class="mt-3 space-y-2">
            <li
              v-for="routine in activeRoutineSetRoutines"
              :key="routine.id"
              class="flex items-center justify-between rounded-2xl border border-white/20 bg-slate-950/70 p-3"
            >
              <p class="text-sm font-semibold text-white">{{ routine.name }}</p>
              <span
                v-if="routine.id === activeRoutineId"
                class="rounded-full border border-emerald-400/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-200"
              >
                Active
              </span>
            </li>
          </ul>
        </div>
        <p v-else class="text-sm text-slate-400">No active routine. Select one from the builder below and switch it on.</p>
      </div>
      <p v-else class="text-sm text-slate-400">
        No active routine. Select one from the builder below and switch it on.
      </p>
    </section>

    <section>
      <article
        class="panel-surface space-y-6"
      >
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-200">
              Routine builder
            </p>
            <h2 class="text-lg font-semibold text-white">
              Edit an existing routine or start a new one
            </h2>
          </div>
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-3">
              <label
                class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400"
              >
                Routine
                <select
                  v-model="selectedRoutineId"
                  class="rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                >
                  <option :value="NEW_ROUTINE_ID">New routine</option>
                  <option v-for="routine in routines" :key="routine.id" :value="routine.id">
                    {{ routine.name }}
                  </option>
                </select>
              </label>
              <button
                type="button"
                class="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:text-emerald-100"
                @click="saveRoutine"
              >
                Save
              </button>
            </div>
            <p class="text-[11px] font-semibold tracking-wide text-slate-400">
              {{ lastSavedMessage }}
            </p>
          </div>
        </div>

        <div v-if="selectedRoutine" class="space-y-6">
          <label
            class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            Routine name
            <input
              v-model="selectedRoutine.name"
              class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              type="text"
            />
          </label>

          <label
            class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400"
          >
            Routine set name
            <input
              v-model="selectedRoutine.setName"
              class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              type="text"
              placeholder="e.g. Push / Pull / Legs or Upper / Lower"
            />
          </label>

          <div class="space-y-3">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h3 class="text-sm font-semibold text-white">Exercises</h3>
                <p class="text-xs text-slate-400">
                  Drop cards here. Use the handle to drag and rearrange.
                </p>
              </div>
              <span class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {{ selectedRoutine.exercises.length }} added
              </span>
            </div>

            <div
              class="grid min-h-[140px] gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-slate-950/60 p-3 lg:grid-cols-2"
              :class="
                selectedRoutine.exercises.length ? 'border-emerald-400/40 bg-emerald-500/5' : ''
              "
            >
              <p
                v-if="!selectedRoutine.exercises.length"
                class="text-center text-xs uppercase tracking-wide text-slate-500 lg:col-span-2"
              >
                Add exercises from the library below.
              </p>

              <!-- Added exercises -->
              <article
                v-for="(exercise, index) in selectedRoutine.exercises"
                :key="exercise.id"
                class="group grid grid-cols-[auto,1fr] items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/80 p-4"
                draggable="true"
                @dragstart="startDrag(index)"
                @dragover.prevent
                @drop="handleDrop(index)"
              >
                <div class="flex items-center gap-5">
                  <!-- Draggable icon -->
                  <span
                    class="flex text-3xl text-slate-300 opacity-80"
                    aria-label="Drag to reorder"
                    title="Drag to reorder"
                  >
                    ⋮⋮
                  </span>

                  <div class="space-y-3">
                    <div class="flex items-start justify-between gap-3">
                      <div class="flex gap-2">
                        <!-- Exxercise number -->
                        <div
                          class="flex h-9 w-9 items-center justify-center text-2xl font-semibold text-white"
                        >
                          {{ index + 1 }}
                        </div>
                        <!-- Exercise name -->
                        <div>
                          <p
                            class="text-[11px] font-semibold uppercase tracking-wide text-emerald-200"
                          >
                            {{ exercise.muscle }}
                          </p>
                          <p class="text-sm font-semibold text-white">{{ exercise.name }}</p>
                        </div>
                      </div>

                      <!-- Delete button -->
                      <button
                        type="button"
                        class="text-[11px] uppercase tracking-wide text-rose-300 transition hover:text-rose-200"
                        @click="removeExercise(index)"
                      >
                        Delete
                      </button>
                    </div>

                    <!-- Sets, reps, weight -->
                    <div class="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                      <label
                        class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                      >
                        <div class="mx-2">Sets</div>
                        <input
                          v-model.number="exercise.sets"
                          class="h-9 w-12 rounded-lg border border-white/10 bg-slate-900/70 px-2 py-1 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                          min="1"
                          type="number"
                        />
                      </label>

                      <label
                        class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                      >
                        <div class="mx-2">Reps</div>
                        <input
                          v-model.number="exercise.reps"
                          class="h-9 w-14 rounded-lg border border-white/10 bg-slate-900/70 px-2 py-1 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                          min="1"
                          type="number"
                        />
                      </label>

                      <label
                        class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400"
                      >
                        <div class="mx-2">Weight (lbs)</div>
                        <input
                          v-model.number="exercise.weight"
                        class="w-20 rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                          min="0"
                          step="5"
                          type="number"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div class="space-y-5">
            <div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 class="text-sm font-semibold text-white">Exercise library</h3>
                <p class="text-xs text-slate-400">Filter by name or muscle group to find exercises.</p>
              </div>
              <div class="grid gap-2 sm:grid-cols-2">
                <label class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Search
                  <input
                    v-model="exerciseSearch"
                    type="text"
                    class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                    placeholder="e.g. squat"
                  />
                </label>
                <label class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                  Muscle group
                  <select
                    v-model="exerciseMuscleFilter"
                    class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                  >
                    <option value="all">All muscles</option>
                    <option v-for="muscle in muscleGroups" :key="muscle" :value="muscle">
                      {{ muscle }}
                    </option>
                  </select>
                </label>
              </div>
            </div>

            <div class="grid gap-2 md:grid-cols-2 max-h-82 overflow-y-auto pr-1">
              <button
                v-for="exercise in filteredExercises"
                :key="exercise.id"
                type="button"
                class="tile-surface flex flex-col gap-2 p-4 text-left text-sm text-slate-300 transition hover:border-emerald-300/60 hover:text-emerald-100"
                @click="addExerciseFromLibrary(exercise)"
              >
                <div class="flex items-center justify-between gap-2">
                  <p class="font-semibold text-white">{{ exercise.name }}</p>
                  <span class="text-[11px] uppercase tracking-wide text-emerald-200">{{
                    exercise.muscle
                  }}</span>
                </div>
                <p class="text-xs text-slate-400">
                  {{ exercise.defaultSets }} × {{ exercise.defaultReps }} ·
                  {{ exercise.defaultWeight }} lb starting point
                </p>
              </button>
              <p v-if="!filteredExercises.length" class="text-xs text-slate-400">
                No exercises match your filters.
              </p>
            </div>
          </div>
        </div>
        <div
          v-else
          class="rounded-2xl border border-dashed border-white/20 bg-slate-950/70 p-4 text-sm text-slate-400"
        >
          Add a routine to start editing the exercise list.
        </div>
      </article>
    </section>

    <div
      v-if="showSwitchModal"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div
        class="w-full max-w-lg space-y-4 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl shadow-black/40"
      >
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-200">
              Switch routine set
            </p>
            <h3 class="text-lg font-semibold text-white">Choose a split to activate</h3>
          </div>
          <button
            type="button"
            class="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-white/30 hover:text-white"
            @click="showSwitchModal = false"
          >
            Close
          </button>
        </div>

        <ul class="space-y-3">
          <li v-for="routineSet in routineSets" :key="routineSet.setName">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              :class="
                routineSet.setName === activeRoutine?.setName
                  ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100'
                  : 'border-white/10 bg-slate-950/70 text-slate-200 hover:border-white/20'
              "
              @click="setActiveRoutineSet(routineSet.setName)"
            >
              <div class="space-y-1">
                <p class="text-sm font-semibold text-white">{{ routineSet.setName }}</p>
                <p class="text-xs text-slate-400">
                  Includes {{ routineSet.routines.length }} routine{{
                    routineSet.routines.length === 1 ? '' : 's'
                  }}
                </p>
              </div>
              <span
                v-if="routineSet.setName === activeRoutine?.setName"
                class="rounded-full border border-emerald-400/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-emerald-200"
              >
                Active
              </span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { workoutExercises, type WorkoutExercise } from '@/data/workoutExcercise'
import { workoutRoutineSets } from '@/data/workoutRoutine'

type RoutineExerciseForm = {
  id: string
  exerciseId: string
  muscle: string
  name: string
  sets: number
  reps: number
  weight: number
}

type RoutineForm = {
  id: string
  name: string
  setId: string
  setName: string
  exercises: RoutineExerciseForm[]
}

const NEW_ROUTINE_ID = 'new-routine'

const exerciseLookup = workoutExercises.reduce<Record<string, WorkoutExercise>>((map, exercise) => {
  map[exercise.id] = exercise
  return map
}, {})

const exerciseLibrary = workoutExercises
const muscleGroups = Array.from(new Set(exerciseLibrary.map((exercise) => exercise.muscle)))

const createEmptyRoutine = (): RoutineForm => ({
  id: NEW_ROUTINE_ID,
  name: 'New routine',
  setId: workoutRoutineSets[0]?.id ?? 'custom-split',
  setName: workoutRoutineSets[0]?.name ?? 'Custom split',
  exercises: [],
})

function resolveExercise(
  routineExercise: { exerciseId: string; sets?: number; reps?: number; weight?: number },
  routineId: string,
  index: number,
): RoutineExerciseForm | null {
  const baseExercise = exerciseLookup[routineExercise.exerciseId]
  if (!baseExercise) return null

  return {
    id: `${routineId}-${routineExercise.exerciseId}-${index + 1}`,
    exerciseId: routineExercise.exerciseId,
    muscle: baseExercise.muscle,
    name: baseExercise.name,
    sets: routineExercise.sets ?? baseExercise.defaultSets,
    reps: routineExercise.reps ?? baseExercise.defaultReps,
    weight: routineExercise.weight ?? baseExercise.defaultWeight,
  }
}

const routines = ref<RoutineForm[]>(
  workoutRoutineSets.flatMap((set) =>
    set.routines.map((routine) => ({
      id: routine.id,
      name: routine.name,
      setId: set.id,
      setName: set.name,
      exercises: routine.exercises
        .map((exercise, index) => resolveExercise(exercise, routine.id, index))
        .filter((exercise): exercise is RoutineExerciseForm => Boolean(exercise)),
    })),
  ),
)
const routineDraft = ref<RoutineForm>(createEmptyRoutine())

const activeRoutineId = ref(routines.value[0]?.id ?? '')
const selectedRoutineId = ref<string>(NEW_ROUTINE_ID)
const draggingIndex = ref<number | null>(null)
const exerciseSearch = ref('')
const exerciseMuscleFilter = ref<'all' | string>('all')
const showSwitchModal = ref(false)
const lastSavedAt = ref<string | null>(null)

const activeRoutine = computed(() => routines.value.find((routine) => routine.id === activeRoutineId.value) ?? null)
const selectedRoutine = computed(() => {
  if (selectedRoutineId.value === NEW_ROUTINE_ID) {
    return routineDraft.value
  }
  return routines.value.find((routine) => routine.id === selectedRoutineId.value) ?? null
})
const routineSets = computed(() => {
  const grouped: Record<string, RoutineForm[]> = {}
  routines.value.forEach((routine) => {
    const key = routine.setName || 'Custom split'
    grouped[key] = grouped[key] ? [...grouped[key], routine] : [routine]
  })
  return Object.entries(grouped).map(([setName, setRoutines]) => ({
    setName,
    routines: setRoutines,
  }))
})
const activeRoutineSetRoutines = computed(() => {
  const setName = activeRoutine.value?.setName
  if (!setName) return []
  return routines.value.filter((routine) => routine.setName === setName)
})

const filteredExercises = computed(() => {
  const searchTerm = exerciseSearch.value.trim().toLowerCase()
  return exerciseLibrary.filter((exercise) => {
    const matchesMuscle =
      exerciseMuscleFilter.value === 'all' || exercise.muscle === exerciseMuscleFilter.value
    const matchesSearch = !searchTerm || exercise.name.toLowerCase().includes(searchTerm)
    return matchesMuscle && matchesSearch
  })
})

const lastSavedMessage = computed(() =>
  lastSavedAt.value
    ? `Last saved ${lastSavedAt.value}`
    : 'Edits are unsaved. Save to update the routine.',
)

watch(
  () => selectedRoutineId.value,
  (newId) => {
    if (newId === NEW_ROUTINE_ID) {
      routineDraft.value = createEmptyRoutine()
      lastSavedAt.value = null
    }
  },
)

function setActiveRoutine(id: string) {
  activeRoutineId.value = id
  selectedRoutineId.value = id
  showSwitchModal.value = false
}

function setActiveRoutineSet(setName: string) {
  const routine = routines.value.find((entry) => entry.setName === setName)
  if (!routine) return
  setActiveRoutine(routine.id)
}

function addExerciseFromLibrary(exercise: WorkoutExercise) {
  const routine = selectedRoutine.value
  if (!routine) return
  const newExercise: RoutineExerciseForm = {
    id: `${routine.id}-${Date.now()}`,
    exerciseId: exercise.id,
    muscle: exercise.muscle,
    name: exercise.name,
    sets: exercise.defaultSets,
    reps: exercise.defaultReps,
    weight: exercise.defaultWeight,
  }
  routine.exercises.push(newExercise)
}

function removeExercise(index: number) {
  const routine = selectedRoutine.value
  if (!routine) return
  routine.exercises.splice(index, 1)
}

function startDrag(index: number) {
  draggingIndex.value = index
}

function handleDrop(targetIndex: number) {
  const routine = selectedRoutine.value
  if (!routine || draggingIndex.value === null) return
  const [moved] = routine.exercises.splice(draggingIndex.value, 1)
  if (!moved) return
  routine.exercises.splice(targetIndex, 0, moved)
  draggingIndex.value = null
}

function saveRoutine() {
  const routine = selectedRoutine.value
  if (!routine) return

  if (selectedRoutineId.value === NEW_ROUTINE_ID) {
    const idTimestamp = Date.now()
    const newId = `routine-${idTimestamp}`
    const exercisesWithIds = routine.exercises.map((exercise, index) => ({
      ...exercise,
      id: `${newId}-${index + 1}-${idTimestamp + index}`,
    }))

    const newRoutine: RoutineForm = {
      ...routine,
      id: newId,
      exercises: exercisesWithIds,
    }

    routines.value.unshift(newRoutine)
    selectedRoutineId.value = newId
  }

  const timestamp = new Date()
  lastSavedAt.value = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>


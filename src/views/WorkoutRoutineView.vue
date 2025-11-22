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
        Keep your favorite training playlists tidy, switch what the log is using, and build new templates with the exact sets,
        reps, and weights you need.
      </p>
    </header>

    <section class="space-y-4 rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/30">
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div class="space-y-2">
          <p class="text-xs font-semibold uppercase tracking-wide text-emerald-200">Active routine set</p>
          <h2 class="text-xl font-semibold text-white">{{ activeRoutine?.setName ?? 'No routine selected' }}</h2>
        </div>
        <div class="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
            @click="showSwitchModal = true"
          >
            Switch routine
          </button>
        </div>
      </div>

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
    </section>

    <section>
      <article class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-4 shadow-lg shadow-slate-950/30">
        <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div class="space-y-1">
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-200">Routine builder</p>
            <h2 class="text-lg font-semibold text-white">Edit an existing routine or start a new one</h2>
            <p class="text-sm text-slate-400">Pick a routine from the dropdown to update its name, exercises, and ordering.</p>
          </div>
          <div class="flex items-center gap-3">
            <label class="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
              Routine
              <select
                v-model="selectedRoutineId"
                class="rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              >
                <option v-for="routine in routines" :key="routine.id" :value="routine.id">{{ routine.name }}</option>
              </select>
            </label>
            <button
              type="button"
              class="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:text-emerald-100"
              @click="addRoutine"
            >
              Add routine
            </button>
          </div>
        </div>

        <div v-if="selectedRoutine" class="space-y-6">
          <label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
            Routine name
            <input
              v-model="selectedRoutine.name"
              class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
              type="text"
            />
          </label>

          <label class="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
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
                <p class="text-xs text-slate-400">Drop cards here. Use the handle to drag and rearrange.</p>
              </div>
              <span class="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                {{ selectedRoutine.exercises.length }} added
              </span>
            </div>

            <div
              class="grid min-h-[140px] gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-slate-950/60 p-3 lg:grid-cols-2"
              :class="selectedRoutine.exercises.length ? 'border-emerald-400/40 bg-emerald-500/5' : ''"
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
                      <div class="flex h-9 w-9 items-center justify-center text-2xl font-semibold text-white">
                        {{ index + 1 }}
                      </div>
                      <!-- Exercise name -->
                      <div>
                        <p class="text-[11px] font-semibold uppercase tracking-wide text-emerald-200">{{ exercise.muscle }}</p>
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
                  <div class="grid gap-3 sm:grid-cols-3">
                    <label class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <div class="mx-2">
                        Sets
                      </div>
                      <input
                        v-model.number="exercise.sets"
                        class="h-10 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                        min="1"
                        type="number"
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <div class="mx-2">
                        Reps
                      </div>
                      <input
                        v-model.number="exercise.reps"
                        class="h-10 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                        min="1"
                        type="number"
                      />
                    </label>
                    <label class="flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      <div class="mx-2">
                        Weight (lbs)
                      </div>
                      <input
                        v-model.number="exercise.weight"
                        class="h-10 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
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

          <div class="space-y-3">
            <h3 class="text-sm font-semibold text-white">Exercise library</h3>
            <div class="grid gap-3 md:grid-cols-2">
              <button
                v-for="exercise in exerciseLibrary"
                :key="exercise.id"
                type="button"
                class="flex flex-col gap-2 rounded-xl border border-white/10 bg-slate-950/70 p-4 text-left text-sm text-slate-300 transition hover:border-emerald-300/60 hover:text-emerald-100"
                @click="addExerciseFromLibrary(exercise)"
              >
                <div class="flex items-center justify-between gap-2">
                  <p class="font-semibold text-white">{{ exercise.name }}</p>
                  <span class="text-[11px] uppercase tracking-wide text-emerald-200">{{ exercise.muscle }}</span>
                </div>
                <p class="text-xs text-slate-400">
                  {{ exercise.defaultSets }} × {{ exercise.defaultReps }} · {{ exercise.defaultWeight }} lb starting point
                </p>
              </button>
            </div>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p class="text-xs text-slate-400">
              {{ lastSavedMessage }}
            </p>
            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
              @click="saveRoutine"
            >
              Save routine
            </button>
          </div>
        </div>
        <div v-else class="rounded-2xl border border-dashed border-white/20 bg-slate-950/70 p-4 text-sm text-slate-400">
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
      <div class="w-full max-w-lg space-y-4 rounded-2xl border border-white/10 bg-slate-900/90 p-4 shadow-xl shadow-black/40">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-wide text-emerald-200">Switch routine</p>
            <h3 class="text-lg font-semibold text-white">Choose a saved routine to activate</h3>
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
          <li v-for="routine in routines" :key="routine.id">
            <button
              type="button"
              class="flex w-full items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              :class="
                routine.id === activeRoutineId
                  ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100'
                  : 'border-white/10 bg-slate-950/70 text-slate-200 hover:border-white/20'
              "
            @click="setActiveRoutine(routine.id)"
          >
            <div class="space-y-1">
              <p class="text-sm font-semibold text-white">{{ routine.name }}</p>
              <p class="text-xs text-slate-400">{{ routine.setName }}</p>
            </div>
            <span
              v-if="routine.id === activeRoutineId"
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
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

type RoutineExercise = {
  id: string
  muscle: string
  name: string
  sets: number
  reps: number
  weight: number
}

type Routine = {
  id: string
  name: string
  setName: string
  exercises: RoutineExercise[]
}

type LibraryExercise = {
  id: string
  name: string
  muscle: string
  defaultSets: number
  defaultReps: number
  defaultWeight: number
}

const exerciseLibrary: LibraryExercise[] = [
  { id: 'flat-bench', name: 'Flat Bench Press', muscle: 'Chest', defaultSets: 4, defaultReps: 8, defaultWeight: 155 },
  { id: 'incline-press', name: 'Incline Dumbbell Press', muscle: 'Chest', defaultSets: 3, defaultReps: 10, defaultWeight: 45 },
  { id: 'bent-row', name: 'Bent-over Row', muscle: 'Back', defaultSets: 4, defaultReps: 8, defaultWeight: 135 },
  { id: 'lat-pulldown', name: 'Lat Pulldown', muscle: 'Lats', defaultSets: 3, defaultReps: 12, defaultWeight: 110 },
  { id: 'back-squat', name: 'Back Squat', muscle: 'Quads', defaultSets: 4, defaultReps: 6, defaultWeight: 205 },
  { id: 'romanian-deadlift', name: 'Romanian Deadlift', muscle: 'Hamstrings', defaultSets: 3, defaultReps: 10, defaultWeight: 185 },
  { id: 'overhead-press', name: 'Standing Overhead Press', muscle: 'Shoulders', defaultSets: 3, defaultReps: 8, defaultWeight: 85 },
  { id: 'hammer-curl', name: 'Hammer Curl', muscle: 'Biceps', defaultSets: 3, defaultReps: 12, defaultWeight: 25 },
]

const routines = ref<Routine[]>([
  {
    id: 'push-power',
    name: 'Push Power',
    setName: 'Push / Pull / Legs',
    exercises: [
      { id: 'push-power-1', muscle: 'Chest', name: 'Barbell Bench Press', sets: 4, reps: 6, weight: 185 },
      { id: 'push-power-2', muscle: 'Shoulders', name: 'Standing Overhead Press', sets: 3, reps: 8, weight: 95 },
      { id: 'push-power-3', muscle: 'Triceps', name: 'Close-grip Bench Press', sets: 3, reps: 10, weight: 135 },
      { id: 'push-power-4', muscle: 'Chest', name: 'Cable Fly', sets: 3, reps: 15, weight: 40 },
    ],
  },
  {
    id: 'pull-strength',
    name: 'Pull Strength',
    setName: 'Push / Pull / Legs',
    exercises: [
      { id: 'pull-strength-1', muscle: 'Back', name: 'Weighted Pull-up', sets: 4, reps: 5, weight: 25 },
      { id: 'pull-strength-2', muscle: 'Back', name: 'Bent-over Row', sets: 4, reps: 8, weight: 145 },
      { id: 'pull-strength-3', muscle: 'Rear Delts', name: 'Face Pull', sets: 3, reps: 15, weight: 35 },
      { id: 'pull-strength-4', muscle: 'Biceps', name: 'Alternating Hammer Curl', sets: 3, reps: 12, weight: 25 },
    ],
  },
  {
    id: 'lower-capacity',
    name: 'Lower Capacity',
    setName: 'Push / Pull / Legs',
    exercises: [
      { id: 'lower-capacity-1', muscle: 'Quads', name: 'Back Squat', sets: 4, reps: 6, weight: 225 },
      { id: 'lower-capacity-2', muscle: 'Hamstrings', name: 'Romanian Deadlift', sets: 3, reps: 10, weight: 185 },
      { id: 'lower-capacity-3', muscle: 'Glutes', name: 'Walking Lunge', sets: 3, reps: 12, weight: 40 },
      { id: 'lower-capacity-4', muscle: 'Calves', name: 'Standing Calf Raise', sets: 4, reps: 15, weight: 55 },
    ],
  },
])

const activeRoutineId = ref(routines.value[0]?.id ?? '')
const selectedRoutineId = ref(routines.value[0]?.id ?? '')
const draggingIndex = ref<number | null>(null)
const lastSavedAt = ref<string | null>(null)
const showSwitchModal = ref(false)

const activeRoutine = computed(() => routines.value.find((routine) => routine.id === activeRoutineId.value) ?? null)
const selectedRoutine = computed(() => routines.value.find((routine) => routine.id === selectedRoutineId.value) ?? null)
const activeRoutineSetRoutines = computed(() => {
  const setName = activeRoutine.value?.setName
  if (!setName) return []
  return routines.value.filter((routine) => routine.setName === setName)
})

const lastSavedMessage = computed(() =>
  lastSavedAt.value ? `Last saved ${lastSavedAt.value}` : 'Edits are unsaved. Save to update the routine.'
)

function addRoutine() {
  const newId = `routine-${Date.now()}`
  const newRoutine: Routine = {
    id: newId,
    name: 'New routine',
    setName: 'Custom split',
    exercises: [],
  }
  routines.value.unshift(newRoutine)
  selectedRoutineId.value = newId
}

function setActiveRoutine(id: string) {
  activeRoutineId.value = id
  selectedRoutineId.value = id
  showSwitchModal.value = false
}

function addExerciseFromLibrary(exercise: LibraryExercise) {
  const routine = selectedRoutine.value
  if (!routine) return
  const newExercise: RoutineExercise = {
    id: `${routine.id}-${Date.now()}`,
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
  const timestamp = new Date()
  lastSavedAt.value = timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}
</script>

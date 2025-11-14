<template>
  <div class="space-y-12">
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-3">
        <RouterLink
          to="/workout"
          class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
        >
          ← Back to workout
        </RouterLink>
        <h1 class="text-3xl font-bold text-white">Workout routine</h1>
        <p class="max-w-2xl text-sm text-slate-400">
          Shape the week, see how every day fits together, and keep your go-to exercise playlists ready to launch when it&apos;s
          time to train.
        </p>
      </div>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-white">Weekly structure settings</h2>
          <p class="text-sm text-slate-400">Choose the split that matches your schedule and map the intent for each day.</p>
        </div>
        <span class="text-xs font-semibold uppercase tracking-wide text-emerald-200">
          {{ trainingDayCount }} / 7 training days
        </span>
      </div>

      <div class="flex flex-wrap gap-3">
        <button
          v-for="option in splitOptions"
          :key="option.id"
          type="button"
          class="rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
          :class="
            option.id === selectedSplit
              ? 'border-emerald-400/60 bg-emerald-400/10 text-emerald-100 shadow-inner shadow-emerald-500/20'
              : 'border-white/10 bg-slate-950/60 text-slate-200 hover:border-white/20'
          "
          @click="handleSplitSelection(option.id)"
        >
          <p class="text-sm font-semibold">{{ option.name }}</p>
          <p class="mt-1 text-xs text-slate-400">{{ option.description }}</p>
        </button>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="assignment in weeklyAssignments"
          :key="`${assignment.day}-${assignment.routineId}`"
          class="rounded-full border border-white/10 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-slate-300"
        >
          {{ assignment.day.slice(0, 3) }} · {{ resolveRoutineName(assignment.routineId) }}
        </span>
      </div>

      <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="assignment in weeklyAssignments"
          :key="assignment.day"
          class="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4"
        >
          <div class="flex items-center justify-between gap-3">
            <h3 class="text-sm font-semibold text-white">{{ assignment.day }}</h3>
            <span
              class="rounded-full border border-white/10 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide"
              :class="assignment.routineId === 'rest' ? 'text-slate-400' : 'text-emerald-200 border-emerald-400/40'"
            >
              {{ assignment.routineId === 'rest' ? 'Recovery' : 'Training' }}
            </span>
          </div>

          <label class="flex flex-col gap-2 text-xs text-slate-400">
            <span>Assigned routine</span>
            <select
              v-model="assignment.routineId"
              class="h-10 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/40"
            >
              <option value="rest">Rest / Recovery</option>
              <option
                v-for="routine in activeRoutines"
                :key="routine.id"
                :value="routine.id"
              >
                {{ routine.name }}
              </option>
            </select>
          </label>

          <p class="text-xs text-slate-500">
            {{ resolveRoutineFocus(assignment.routineId) }}
          </p>
        </article>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <article class="space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
        <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 class="text-lg font-semibold text-white">Routines list</h2>
            <p class="text-sm text-slate-400">Tap a playlist to review which exercises roll with that day.</p>
          </div>
          <span class="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {{ activeRoutines.length }} active routines
          </span>
        </div>

        <ul class="space-y-3">
          <li v-for="routine in activeRoutines" :key="routine.id">
            <button
              type="button"
              class="flex w-full flex-col gap-3 rounded-2xl border px-4 py-3 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              :class="
                routine.id === selectedRoutineId
                  ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-100'
                  : 'border-white/10 bg-slate-950/70 text-slate-200 hover:border-white/20'
              "
              @click="selectedRoutineId = routine.id"
            >
              <div class="flex flex-col gap-1">
                <p class="text-sm font-semibold text-white">{{ routine.name }}</p>
                <p class="text-xs text-slate-400">{{ routine.focus }}</p>
              </div>
              <div class="flex flex-col gap-2 text-xs text-slate-400">
                <span class="font-semibold text-emerald-200">{{ routine.exercises.length }} exercises</span>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="exercise in routine.exercises.slice(0, 4)"
                    :key="exercise.id"
                    class="rounded-full bg-slate-900/80 px-3 py-1 text-[11px] text-slate-300"
                  >
                    {{ exercise.name }}
                  </span>
                  <span v-if="routine.exercises.length > 4" class="text-[11px] text-slate-500">+ {{ routine.exercises.length - 4 }} more</span>
                </div>
              </div>
            </button>
          </li>
        </ul>
      </article>

      <article class="space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Edit routine</h2>
          <p class="text-sm text-slate-400">Reorder movements, fine-tune default sets and reps, and leave yourself cues.</p>
        </div>

        <div v-if="currentRoutine" class="space-y-5">
          <header class="space-y-2">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ currentRoutine.focus }}</p>
            <h3 class="text-xl font-semibold text-white">{{ currentRoutine.name }}</h3>
            <p class="text-xs text-slate-500">
              Appears on
              <span class="font-semibold text-slate-300">
                {{ assignmentFrequency(currentRoutine.id) }}
              </span>
              this week
            </p>
          </header>

          <ul class="space-y-4">
            <li
              v-for="(exercise, index) in currentRoutine.exercises"
              :key="exercise.id"
              class="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4"
            >
              <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div class="flex-1 space-y-2">
                  <label class="flex flex-col gap-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Exercise name
                    <input
                      v-model="exercise.name"
                      class="rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                      type="text"
                    />
                  </label>

                  <div class="flex flex-wrap gap-4 text-xs uppercase tracking-wide text-slate-400">
                    <label class="flex items-center gap-2">
                      Sets
                      <input
                        v-model.number="exercise.sets"
                        class="h-10 w-16 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                        min="1"
                        type="number"
                      />
                    </label>
                    <label class="flex items-center gap-2">
                      Reps
                      <input
                        v-model="exercise.reps"
                        class="h-10 w-20 rounded-xl border border-white/10 bg-slate-900/70 px-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                        type="text"
                      />
                    </label>
                  </div>
                </div>

                <div class="flex flex-col items-stretch gap-2 md:w-24">
                  <button
                    type="button"
                    class="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-white/30"
                    :disabled="index === 0"
                    :class="index === 0 ? 'opacity-40' : ''"
                    @click="moveExercise(index, -1)"
                  >
                    Move up
                  </button>
                  <button
                    type="button"
                    class="rounded-full border border-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300 transition hover:border-white/30"
                    :disabled="index === currentRoutine.exercises.length - 1"
                    :class="index === currentRoutine.exercises.length - 1 ? 'opacity-40' : ''"
                    @click="moveExercise(index, 1)"
                  >
                    Move down
                  </button>
                </div>
              </div>

              <label class="flex flex-col gap-2 text-xs text-slate-400">
                Notes (optional)
                <textarea
                  v-model="exercise.notes"
                  class="min-h-[72px] rounded-xl border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50"
                  placeholder="Focus on form, setup reminders, warm-up cues..."
                />
              </label>

              <div class="flex justify-end">
                <button
                  type="button"
                  class="text-xs font-semibold uppercase tracking-wide text-rose-300 transition hover:text-rose-200"
                  @click="removeExercise(index)"
                >
                  Remove exercise
                </button>
              </div>
            </li>
          </ul>

          <button
            type="button"
            class="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
            @click="addExercise"
          >
            Add exercise
          </button>
        </div>
        <div v-else class="rounded-2xl border border-dashed border-white/20 bg-slate-950/70 p-6 text-sm text-slate-400">
          Select a routine on the left to begin editing the exercise order, defaults, and notes.
        </div>
      </article>
    </section>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="text-lg font-semibold text-white">Save presets</h2>
          <p class="text-sm text-slate-400">
            Capture the entire weekly plan so you can swap between strength, hypertrophy, or deload templates instantly.
          </p>
        </div>
        <form class="flex flex-col gap-2 sm:flex-row sm:items-center" @submit.prevent="saveCurrentPreset">
          <input
            v-model="newPresetName"
            class="h-10 w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 text-sm text-white focus:border-emerald-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 sm:w-56"
            placeholder="Name this plan"
            type="text"
          />
          <button
            type="submit"
            class="rounded-full border border-emerald-400/60 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-emerald-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70"
          >
            Save preset
          </button>
        </form>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <article
          v-for="preset in savedPresets"
          :key="preset.name"
          class="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4"
        >
          <div class="flex items-start justify-between gap-3">
            <div class="space-y-1">
              <h3 class="text-base font-semibold text-white">{{ preset.name }}</h3>
              <p class="text-xs text-slate-400">{{ splitLabel[preset.split] }} · {{ presetTrainingCount(preset) }} training days</p>
            </div>
            <span class="text-[11px] font-semibold uppercase tracking-wide text-emerald-200">Preset</span>
          </div>

          <p class="text-xs text-slate-400">
            {{ presetScheduleSummary(preset) }}
          </p>

          <button
            type="button"
            class="w-full rounded-full border border-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-200 transition hover:-translate-y-0.5 hover:border-emerald-300/70 hover:text-emerald-100"
            @click="applyPreset(preset)"
          >
            Switch to this plan
          </button>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { Plan } from '@/data/workoutPlans'
import { workoutPlans } from '@/data/workoutPlans'

type SplitId = 'ppl' | 'upperLower' | 'fullbody'

type RoutineExercise = {
  id: string
  name: string
  sets: number
  reps: string
  notes: string
}

type Routine = {
  id: string
  name: string
  focus: string
  exercises: RoutineExercise[]
}

type WeeklyAssignment = {
  day: string
  routineId: string
}

type SplitOption = {
  id: SplitId
  name: string
  description: string
}

type SavedPreset = {
  name: string
  split: SplitId
  assignments: WeeklyAssignment[]
  routines: Routine[]
}

const splitLabel: Record<SplitId, string> = {
  ppl: 'Push / Pull / Legs',
  upperLower: 'Upper / Lower',
  fullbody: 'Full Body',
}

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const focusLabels: Record<string, string> = {
  push: 'Chest · Shoulders · Triceps',
  pull: 'Back · Lats · Biceps',
  legs: 'Squat · Hinge · Posterior chain',
}

function createRoutineFromPlan(plan: Plan): Routine {
  const baseName = plan.title.split('·')[0]?.trim() ?? plan.title
  return {
    id: plan.id,
    name: baseName,
    focus: focusLabels[plan.id] ?? `${plan.label} emphasis`,
    exercises: plan.exercises.map((exercise, index) => ({
      id: `${plan.id}-${index}`,
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      notes: exercise.notes ?? '',
    })),
  }
}

const routineLibrary = reactive<Record<SplitId, Routine[]>>({
  ppl: workoutPlans.map((plan: Plan) => createRoutineFromPlan(plan)),
  upperLower: [
    {
      id: 'upper-a',
      name: 'Upper · Power',
      focus: 'Pressing strength and heavy horizontal pulls',
      exercises: [
        { id: 'upper-a-1', name: 'Barbell Bench Press', sets: 4, reps: '5', notes: 'Pause for 1 second on the chest.' },
        { id: 'upper-a-2', name: 'Weighted Chin-up', sets: 4, reps: '6', notes: 'Explosive concentric, controlled descent.' },
        { id: 'upper-a-3', name: 'Seated Cable Row', sets: 3, reps: '10', notes: 'Squeeze shoulder blades for a full second.' },
        { id: 'upper-a-4', name: 'Standing Overhead Press', sets: 3, reps: '8', notes: 'Brace hard and keep ribs stacked.' },
        { id: 'upper-a-5', name: 'Face Pull', sets: 3, reps: '15', notes: 'Finish with external rotation to hit rear delts.' },
      ],
    },
    {
      id: 'lower-a',
      name: 'Lower · Power',
      focus: 'Squat pattern + posterior chain strength',
      exercises: [
        { id: 'lower-a-1', name: 'Back Squat', sets: 4, reps: '5', notes: 'Control the descent and stay tight at the bottom.' },
        { id: 'lower-a-2', name: 'Romanian Deadlift', sets: 4, reps: '8', notes: 'Hips back, keep lats tight throughout the set.' },
        { id: 'lower-a-3', name: 'Leg Press', sets: 3, reps: '12', notes: 'Full range—knees track over toes.' },
        { id: 'lower-a-4', name: 'Walking Lunge', sets: 3, reps: '12/leg', notes: 'Drive through the front heel and stay tall.' },
        { id: 'lower-a-5', name: 'Hanging Leg Raise', sets: 3, reps: '12', notes: 'Posterior pelvic tilt at the top of every rep.' },
      ],
    },
    {
      id: 'upper-b',
      name: 'Upper · Volume',
      focus: 'Hypertrophy work with higher rep accessories',
      exercises: [
        { id: 'upper-b-1', name: 'Incline Dumbbell Press', sets: 3, reps: '10', notes: 'Pause at the top and bottom for control.' },
        { id: 'upper-b-2', name: 'Lat Pulldown', sets: 3, reps: '12', notes: 'Drive elbows to hips, stay tall through the torso.' },
        { id: 'upper-b-3', name: 'Cable Fly', sets: 3, reps: '15', notes: 'Slow eccentric, keep tension through midline.' },
        { id: 'upper-b-4', name: 'Lateral Raise', sets: 3, reps: '15', notes: 'Soft elbow, lift to just above shoulder height.' },
        { id: 'upper-b-5', name: 'Skull Crusher', sets: 3, reps: '12', notes: 'Keep elbows tucked and drive up hard.' },
        { id: 'upper-b-6', name: 'Alternating Hammer Curl', sets: 3, reps: '12 (total)', notes: 'Controlled tempo with a full squeeze at the top.' },
      ],
    },
    {
      id: 'lower-b',
      name: 'Lower · Volume',
      focus: 'Glute and quad focused accessories with intent',
      exercises: [
        { id: 'lower-b-1', name: 'Front Squat', sets: 3, reps: '8', notes: 'Elbows high, stay tall through the movement.' },
        { id: 'lower-b-2', name: 'Barbell Hip Thrust', sets: 4, reps: '10', notes: 'Full hip lockout with a 2-second pause.' },
        { id: 'lower-b-3', name: 'Leg Curl', sets: 3, reps: '15', notes: 'Add a slow eccentric to feel hamstrings work.' },
        { id: 'lower-b-4', name: 'Bulgarian Split Squat', sets: 3, reps: '12/leg', notes: 'Torso slightly forward to load the front quad.' },
        { id: 'lower-b-5', name: 'Standing Calf Raise', sets: 4, reps: '15', notes: 'Pause at stretch and squeeze hard at the top.' },
      ],
    },
  ],
  fullbody: [
    {
      id: 'full-a',
      name: 'Full Body A',
      focus: 'Heavy squat + push + horizontal pull',
      exercises: [
        { id: 'full-a-1', name: 'Back Squat', sets: 4, reps: '5', notes: 'Brace before each rep and drive through the floor.' },
        { id: 'full-a-2', name: 'Flat Bench Press', sets: 3, reps: '6', notes: 'Strong leg drive with a brief pause on the chest.' },
        { id: 'full-a-3', name: 'Barbell Row', sets: 3, reps: '8', notes: 'Keep torso set—no bounce out of the bottom.' },
        { id: 'full-a-4', name: 'Split Squat', sets: 3, reps: '10/leg', notes: 'Long stride and smooth tempo.' },
        { id: 'full-a-5', name: 'Hanging Knee Raise', sets: 3, reps: '12', notes: 'Control the swing and tuck pelvis under.' },
      ],
    },
    {
      id: 'full-b',
      name: 'Full Body B',
      focus: 'Deadlift emphasis with vertical press and pull',
      exercises: [
        { id: 'full-b-1', name: 'Deadlift', sets: 4, reps: '4', notes: 'Reset at the floor each rep—no touch and go.' },
        { id: 'full-b-2', name: 'Standing Overhead Press', sets: 3, reps: '8', notes: 'Glutes tight, finish with biceps by ears.' },
        { id: 'full-b-3', name: 'Pull-up', sets: 3, reps: 'Max quality', notes: 'Leave 1 rep in the tank each set.' },
        { id: 'full-b-4', name: 'Romanian Deadlift', sets: 3, reps: '10', notes: 'Feel hamstrings load—hips back, lats engaged.' },
        { id: 'full-b-5', name: 'Single-arm Dumbbell Row', sets: 3, reps: '12/side', notes: 'Pause on top to lock lats in.' },
        { id: 'full-b-6', name: 'Farmer Carry', sets: 4, reps: '40m', notes: 'Braced walk with smooth, controlled breathing.' },
      ],
    },
    {
      id: 'full-c',
      name: 'Full Body C',
      focus: 'Speed work, unilateral accessories, and core finishers',
      exercises: [
        { id: 'full-c-1', name: 'Front Squat', sets: 3, reps: '6', notes: 'Fast out of the hole with solid rack position.' },
        { id: 'full-c-2', name: 'Dumbbell Incline Press', sets: 3, reps: '10', notes: 'Neutral grip, control the stretch.' },
        { id: 'full-c-3', name: 'Trap Bar Deadlift', sets: 3, reps: '8', notes: 'Drive with legs, keep shoulders stacked over hips.' },
        { id: 'full-c-4', name: 'Chest-supported Row', sets: 3, reps: '12', notes: 'Smooth squeeze and full reach at the bottom.' },
        { id: 'full-c-5', name: 'Walking Lunge', sets: 3, reps: '14/leg', notes: 'Stay tall and let the knee travel forward.' },
        { id: 'full-c-6', name: 'Side Plank', sets: 3, reps: '45s/side', notes: 'Straight line from ear to ankle—no sagging hips.' },
      ],
    },
  ],
})

const defaultSchedules: Record<SplitId, string[]> = {
  ppl: ['push', 'pull', 'rest', 'legs', 'push', 'rest', 'pull'],
  upperLower: ['upper-a', 'lower-a', 'rest', 'upper-b', 'lower-b', 'rest', 'rest'],
  fullbody: ['full-a', 'rest', 'full-b', 'rest', 'full-c', 'rest', 'rest'],
}

const splitOptions: SplitOption[] = [
  {
    id: 'ppl',
    name: splitLabel.ppl,
    description: 'Classic three-day rotation that hits every muscle group twice across the week.',
  },
  {
    id: 'upperLower',
    name: splitLabel.upperLower,
    description: 'Four-day cadence alternating upper and lower priorities with accessories dialed in.',
  },
  {
    id: 'fullbody',
    name: splitLabel.fullbody,
    description: 'Balanced full-body setup with three priority days and recovery buffers built in.',
  },
]

function createDefaultAssignments(split: SplitId): WeeklyAssignment[] {
  const template = defaultSchedules[split]
  return daysOfWeek.map((day, index) => ({
    day,
    routineId: template[index] ?? 'rest',
  }))
}

const selectedSplit = ref<SplitId>('ppl')
const weeklyAssignments = ref<WeeklyAssignment[]>(createDefaultAssignments(selectedSplit.value))
const selectedRoutineId = ref<string>(routineLibrary[selectedSplit.value][0]?.id ?? '')

const activeRoutines = computed(() => routineLibrary[selectedSplit.value])
const routineMap = computed<Record<string, Routine>>(() => {
  const map: Record<string, Routine> = {}
  activeRoutines.value.forEach((routine) => {
    map[routine.id] = routine
  })
  return map
})
const currentRoutine = computed(() => routineMap.value[selectedRoutineId.value])

const trainingDayCount = computed(() => weeklyAssignments.value.filter((assignment) => assignment.routineId !== 'rest').length)

watch(
  activeRoutines,
  (newRoutines) => {
    if (!newRoutines.length) {
      selectedRoutineId.value = ''
      return
    }

    if (!newRoutines.some((routine) => routine.id === selectedRoutineId.value)) {
      selectedRoutineId.value = newRoutines[0]?.id ?? ''
    }

    weeklyAssignments.value = weeklyAssignments.value.map((assignment) => {
      if (assignment.routineId === 'rest') {
        return assignment
      }
      return newRoutines.some((routine) => routine.id === assignment.routineId)
        ? assignment
        : { ...assignment, routineId: 'rest' }
    })
  },
  { deep: true }
)

function handleSplitSelection(splitId: SplitId) {
  if (splitId === selectedSplit.value) {
    return
  }
  selectedSplit.value = splitId
  weeklyAssignments.value = createDefaultAssignments(splitId)
  selectedRoutineId.value = routineLibrary[splitId][0]?.id ?? ''
}

function resolveRoutineName(id: string): string {
  if (id === 'rest') {
    return 'Rest / Recovery'
  }
  return routineMap.value[id]?.name ?? 'Unassigned'
}

function resolveRoutineFocus(id: string): string {
  if (id === 'rest') {
    return 'Use the day for recovery work, sleep, and easy movement.'
  }
  return routineMap.value[id]?.focus ?? 'Assign a routine to give this day a purpose.'
}

function assignmentFrequency(routineId: string): string {
  const count = weeklyAssignments.value.filter((assignment) => assignment.routineId === routineId).length
  if (count === 0) {
    return 'no days'
  }
  if (count === 1) {
    return '1 day'
  }
  return `${count} days`
}

function addExercise() {
  const routine = currentRoutine.value
  if (!routine) {
    return
  }
  const newExercise: RoutineExercise = {
    id: `${routine.id}-${Date.now()}`,
    name: 'New exercise',
    sets: 3,
    reps: '10',
    notes: '',
  }
  routine.exercises.push(newExercise)
}

function removeExercise(index: number) {
  const routine = currentRoutine.value
  if (!routine) {
    return
  }
  routine.exercises.splice(index, 1)
}

function moveExercise(index: number, direction: number) {
  const routine = currentRoutine.value
  if (!routine) {
    return
  }
  const targetIndex = index + direction
  if (targetIndex < 0 || targetIndex >= routine.exercises.length) {
    return
  }
  const [moved] = routine.exercises.splice(index, 1)
  if (!moved) {
    return
  }
  routine.exercises.splice(targetIndex, 0, moved)
}

function cloneRoutines(routines: Routine[]): Routine[] {
  return routines.map((routine) => ({
    ...routine,
    exercises: routine.exercises.map((exercise) => ({ ...exercise })),
  }))
}

const savedPresets = ref<SavedPreset[]>([
  {
    name: 'Strength 1.0',
    split: 'ppl',
    assignments: createDefaultAssignments('ppl'),
    routines: cloneRoutines(routineLibrary.ppl),
  },
  {
    name: 'Hypertrophy Simple',
    split: 'upperLower',
    assignments: createDefaultAssignments('upperLower'),
    routines: cloneRoutines(routineLibrary.upperLower),
  },
])

const newPresetName = ref('')

function saveCurrentPreset() {
  const trimmedName = newPresetName.value.trim()
  if (!trimmedName) {
    return
  }
  const preset: SavedPreset = {
    name: trimmedName,
    split: selectedSplit.value,
    assignments: weeklyAssignments.value.map((assignment) => ({ ...assignment })),
    routines: cloneRoutines(activeRoutines.value),
  }
  const existingIndex = savedPresets.value.findIndex((item) => item.name.toLowerCase() === trimmedName.toLowerCase())
  if (existingIndex >= 0) {
    savedPresets.value.splice(existingIndex, 1, preset)
  } else {
    savedPresets.value.push(preset)
  }
  newPresetName.value = ''
}

function applyPreset(preset: SavedPreset) {
  routineLibrary[preset.split] = cloneRoutines(preset.routines)
  selectedSplit.value = preset.split
  weeklyAssignments.value = preset.assignments.map((assignment) => ({ ...assignment }))
  selectedRoutineId.value = routineLibrary[preset.split][0]?.id ?? ''
}

function presetTrainingCount(preset: SavedPreset): number {
  return preset.assignments.filter((assignment) => assignment.routineId !== 'rest').length
}

function presetScheduleSummary(preset: SavedPreset): string {
  const routineLookup: Record<string, string> = {}
  preset.routines.forEach((routine) => {
    routineLookup[routine.id] = routine.name
  })
  return preset.assignments
    .map((assignment) => {
      const label = assignment.routineId === 'rest' ? 'Rest' : routineLookup[assignment.routineId] ?? 'Unassigned'
      return `${assignment.day.slice(0, 3)} ${label}`
    })
    .join(' · ')
}
</script>

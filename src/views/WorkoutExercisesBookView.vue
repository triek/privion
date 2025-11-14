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
        <h1 class="text-3xl font-bold text-white">Hypertrophy exercise book</h1>
        <p class="max-w-2xl text-sm text-slate-400">
          Filter the complete hypertrophy catalog by primary muscle group to find the perfect movement for the next training
          block.
        </p>
      </div>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-start justify-between gap-6">
        <div class="space-y-2">
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

type MuscleGroup =
  | 'Biceps'
  | 'Triceps'
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Lats'
  | 'Erectors'
  | 'Abs'
  | 'Hips'
  | 'Quads'
  | 'Hamstrings'

type HypertrophyExercise = {
  name: string
  muscle: MuscleGroup
  equipment: string
  description: string
  cues: string[]
}

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

const exercises: HypertrophyExercise[] = [
  {
    name: 'Incline dumbbell curl',
    muscle: 'Biceps',
    equipment: 'Adjustable bench, dumbbells',
    description: 'Fully lengthen the biceps with a deep shoulder extension and squeeze hard at the top for maximal tension.',
    cues: [
      'Let the shoulders fall back into the pad to keep elbows in place',
      'Supinate aggressively as you approach the top half of the curl',
      'Keep tempo 3-1-2 for controlled eccentric loading',
    ],
  },
  {
    name: 'Cable bayesian curl',
    muscle: 'Biceps',
    equipment: 'Low cable, single handle',
    description: 'A standing curl variation that maintains tension across the full range by positioning the body slightly ahead of the cable stack.',
    cues: [
      'Step forward so the shoulder is slightly extended at the start',
      'Keep the wrist tall as you drive the handle toward the shoulder',
      'Finish with a brief isometric squeeze before lowering',
    ],
  },
  {
    name: 'EZ-bar preacher curl',
    muscle: 'Biceps',
    equipment: 'Preacher bench, EZ-bar',
    description: 'Locks the upper arm in place to isolate elbow flexion for consistent, repeatable reps.',
    cues: [
      'Set the upper arm flush with the pad to remove shoulder assistance',
      'Control the eccentric down to 1 inch before lockout',
      'Drive elbows into the pad while flexing through the forearms',
    ],
  },
  {
    name: 'Overhead rope extension',
    muscle: 'Triceps',
    equipment: 'Cable machine, rope attachment',
    description: 'Overhead positioning stretches the long head of the triceps for a strong lengthened stimulus.',
    cues: [
      'Walk out and hinge forward so elbows stay slightly in front of ears',
      'Let the rope separate at lockout without losing rib position',
      'Use a 2-second pause in the stretch position each rep',
    ],
  },
  {
    name: 'Cross-body cable extension',
    muscle: 'Triceps',
    equipment: 'Cable machine, single handle',
    description: 'Targets the lateral and medial heads with constant tension through the range of motion.',
    cues: [
      'Anchor the elbow against the ribcage for stability',
      'Extend across the body to finish with a full triceps contraction',
      'Stay tall with a slight forward lean to match the cable path',
    ],
  },
  {
    name: 'Close-grip bench press',
    muscle: 'Triceps',
    equipment: 'Barbell, flat bench',
    description: 'Pressing with a shoulder-width grip overloads elbow extension while still training the chest and anterior delts.',
    cues: [
      'Tuck elbows to a 45° path on the eccentric',
      'Drive the bar toward the lower chest to maintain tension',
      'Lock out fully while squeezing triceps at the top',
    ],
  },
  {
    name: 'Low incline dumbbell press',
    muscle: 'Chest',
    equipment: 'Adjustable bench, dumbbells',
    description: 'Slight incline bias hits the upper pec fibers without overloading the shoulders.',
    cues: [
      'Keep shoulder blades retracted and ribs stacked',
      'Lower with a 3-count eccentric to a deep stretch',
      'Press up and in to finish with a strong pec contraction',
    ],
  },
  {
    name: 'Cable fly from low anchor',
    muscle: 'Chest',
    equipment: 'Dual cable machine',
    description: 'Provides a long-lever stretch and smooth resistance curve perfect for finishing pec work.',
    cues: [
      'Step forward to create continuous tension at the start',
      'Slightly bend elbows and keep them fixed throughout',
      'Pause for 1 second in the shortened position before releasing',
    ],
  },
  {
    name: 'Machine chest press',
    muscle: 'Chest',
    equipment: 'Selectorized chest press',
    description: 'Stable pressing pattern to drive mechanical tension with minimal setup time.',
    cues: [
      'Adjust the seat so handles line up with mid-chest',
      'Maintain a slight arch without flaring ribs',
      'Control the tempo and avoid slamming the stack',
    ],
  },
  {
    name: 'Chest-supported row',
    muscle: 'Back',
    equipment: 'Incline bench, dumbbells',
    description: 'Removes lower-back demand to focus on mid-back thickness and scapular retraction.',
    cues: [
      'Pull elbows 30° out from the body to hit mid traps and rhomboids',
      'Keep chest glued to the pad to eliminate momentum',
      'Squeeze shoulder blades together for a 1-count each rep',
    ],
  },
  {
    name: 'Seated cable row with neutral grip',
    muscle: 'Back',
    equipment: 'Cable row station, neutral handle',
    description: 'A staple horizontal pull for balanced back development and consistent progression.',
    cues: [
      'Stay tall with a slight forward lean at the stretch',
      'Lead with the elbows and finish with forearms parallel to the floor',
      'Control the return until the shoulder blades protract fully',
    ],
  },
  {
    name: 'Reverse pec deck fly',
    muscle: 'Back',
    equipment: 'Reverse pec deck machine',
    description: 'Isolates rear delts and upper back with guided path and constant tension.',
    cues: [
      'Set chest pad height so arms are in line with shoulders',
      'Focus on driving the backs of the hands wide',
      'Pause in the contracted position without shrugging',
    ],
  },
  {
    name: 'Seated dumbbell lateral raise',
    muscle: 'Shoulders',
    equipment: 'Dumbbells, flat bench',
    description: 'Strict lateral raise to pile up high-quality volume for the medial delts.',
    cues: [
      'Keep thumbs slightly down to bias the lateral fibers',
      'Initiate the raise by pushing the dumbbells out, not up',
      'Stop shy of 90° and lower under control for a 3-count',
    ],
  },
  {
    name: 'Cable Y-raise',
    muscle: 'Shoulders',
    equipment: 'Dual cable machine',
    description: 'Targets the upper traps and rotator cuff with a smooth resistance profile.',
    cues: [
      'Cross cables and step forward so they line up with the arms',
      'Lift into a Y-shape without shrugging the shoulders',
      'Hold the top position for a breath before descending',
    ],
  },
  {
    name: 'Machine shoulder press',
    muscle: 'Shoulders',
    equipment: 'Selectorized shoulder press',
    description: 'Provides stability for heavy sets while keeping attention on the deltoids.',
    cues: [
      'Set seat height so wrists stack over elbows',
      'Keep low back lightly braced against the pad',
      'Drive evenly through both arms to lock out without leaning',
    ],
  },
  {
    name: 'Straight-arm pulldown',
    muscle: 'Lats',
    equipment: 'Cable machine, straight bar or rope',
    description: 'Emphasizes shoulder extension to light up the lats through the lengthened range.',
    cues: [
      'Hinge slightly and keep ribs tucked throughout',
      'Pull the bar toward the hips while keeping elbows long',
      'Pause in the stretched position for 1 second before initiating',
    ],
  },
  {
    name: 'One-arm lat prayer',
    muscle: 'Lats',
    equipment: 'Cable machine, single handle',
    description: 'Creates a deep overhead stretch with unilateral control for even lat development.',
    cues: [
      'Kneel facing away from the stack with the arm overhead',
      'Drive the elbow in toward the hip without rotating the torso',
      'Match breathing to the tempo—exhale as the cable comes down',
    ],
  },
  {
    name: 'Weighted pull-up with neutral grip',
    muscle: 'Lats',
    equipment: 'Pull-up bar, dip belt',
    description: 'Heavy vertical pulling that loads the lats and upper back through a long range of motion.',
    cues: [
      'Start from a dead hang with scapulas depressed',
      'Drive elbows down and in toward the ribs',
      'Control the descent for 2–3 seconds',
    ],
  },
  {
    name: '45° back extension',
    muscle: 'Erectors',
    equipment: '45° hyperextension bench',
    description: 'Targets spinal erectors and glutes with a hinge-focused movement pattern.',
    cues: [
      'Round slightly at the upper back to focus tension on erectors',
      'Drive through the heels and squeeze glutes at the top',
      'Lower until you feel a strong hamstring and low-back stretch',
    ],
  },
  {
    name: 'Barbell Romanian deadlift',
    muscle: 'Erectors',
    equipment: 'Barbell, plates',
    description: 'Loads the posterior chain heavily in the lengthened position for strength and hypertrophy.',
    cues: [
      'Keep a soft knee bend and hinge hips back',
      'Maintain a neutral spine with lats engaged',
      'Slide the bar along the legs and stand tall with intent',
    ],
  },
  {
    name: 'Good morning with safety bar',
    muscle: 'Erectors',
    equipment: 'Safety squat bar, rack',
    description: 'Allows a comfortable hand position while placing consistent tension on the spinal erectors and glutes.',
    cues: [
      'Set feet hip-width and brace before unlocking the hips',
      'Hinge until torso is roughly 45° to the floor',
      'Drive hips forward to stand while maintaining brace',
    ],
  },
  {
    name: 'Weighted cable crunch',
    muscle: 'Abs',
    equipment: 'Cable machine, rope attachment',
    description: 'Directly loads trunk flexion with a full range of motion for the rectus abdominis.',
    cues: [
      'Kneel a step back to keep tension at the top',
      'Round through the spine segment by segment',
      'Exhale completely at the bottom before rising',
    ],
  },
  {
    name: 'Hanging leg raise with hip tuck',
    muscle: 'Abs',
    equipment: 'Pull-up bar',
    description: 'Combines hip flexion and posterior pelvic tilt to train the abs and lower obliques.',
    cues: [
      'Start from a hollow hang with ribs pulled down',
      'Lift knees toward the chest and finish by tucking the pelvis',
      'Lower slowly to avoid swinging',
    ],
  },
  {
    name: 'Cable pallof press ISO',
    muscle: 'Abs',
    equipment: 'Cable machine',
    description: 'Anti-rotation hold that challenges core stability and tension management.',
    cues: [
      'Set cable at sternum height and stand perpendicular to stack',
      'Press the handle out and hold without letting torso rotate',
      'Breathe behind the brace for the full interval',
    ],
  },
  {
    name: 'Seated hip abduction machine',
    muscle: 'Hips',
    equipment: 'Hip abduction machine',
    description: 'Locks the torso in place so the glute medius and minimus drive the movement.',
    cues: [
      'Sit tall and grip the seat to eliminate momentum',
      'Push knees out with a 2-second squeeze at end range',
      'Control the eccentric without letting weight slam down',
    ],
  },
  {
    name: 'Barbell hip thrust',
    muscle: 'Hips',
    equipment: 'Barbell, bench, padding',
    description: 'Maximally loads hip extension in the shortened position for glute growth.',
    cues: [
      'Line shoulder blades on the bench and keep chin tucked',
      'Drive through mid-foot while locking ribs to pelvis',
      'Pause for a 2-count at the top with glutes squeezed',
    ],
  },
  {
    name: 'Cable pull-through',
    muscle: 'Hips',
    equipment: 'Cable machine, rope attachment',
    description: 'A hinge-based pattern that keeps tension on the glutes and hamstrings through the lockout.',
    cues: [
      'Face away from the stack and take a few steps forward',
      'Hinge back until you feel a deep stretch without losing brace',
      'Drive hips forward and finish tall without hyperextending',
    ],
  },
  {
    name: 'Machine leg extension',
    muscle: 'Quads',
    equipment: 'Leg extension machine',
    description: 'Isolates the quads in their shortened range with predictable progressive overload.',
    cues: [
      'Set the pad just above the ankle and align the knee with the axis',
      'Use a 2-second squeeze at lockout for full quad contraction',
      'Lower with a 3-count to protect the joint',
    ],
  },
  {
    name: 'Heels-elevated hack squat',
    muscle: 'Quads',
    equipment: 'Hack squat machine, plates',
    description: 'Keeps the torso upright and knees forward to bias the quads in the lengthened position.',
    cues: [
      'Keep hips tucked and lower until hamstrings cover calves',
      'Drive knees over toes while maintaining heel contact',
      'Pause briefly in the bottom before ascending',
    ],
  },
  {
    name: 'Pendulum squat',
    muscle: 'Quads',
    equipment: 'Pendulum squat machine',
    description: 'Delivers deep knee flexion with a smooth resistance curve and stable setup.',
    cues: [
      'Brace hard into the pad and keep chest tall',
      'Let knees travel forward to maximize quad stretch',
      'Control the descent and explode up without locking knees',
    ],
  },
  {
    name: 'Seated leg curl',
    muscle: 'Hamstrings',
    equipment: 'Seated leg curl machine',
    description: 'Targets the hamstrings in the lengthened position with hips flexed for maximal fiber recruitment.',
    cues: [
      'Adjust pad so knees align with machine axis',
      'Drive heels down while squeezing hamstrings hard',
      'Release slowly until legs are nearly straight',
    ],
  },
  {
    name: 'Nordic hamstring curl',
    muscle: 'Hamstrings',
    equipment: 'Nordic bench or partner hold',
    description: 'Bodyweight eccentric overload that builds bulletproof hamstrings and posterior chain resilience.',
    cues: [
      'Keep a straight line from knees to shoulders',
      'Control the descent as far as possible before catching',
      'Push the floor away to return with assistance as needed',
    ],
  },
  {
    name: 'Glute-ham raise',
    muscle: 'Hamstrings',
    equipment: 'GHD machine',
    description: 'Combines knee flexion and hip extension for complete hamstring development.',
    cues: [
      'Start with hips slightly flexed and torso parallel to the floor',
      'Curl the body up by pulling with hamstrings first',
      'Finish by squeezing glutes at the top before lowering',
    ],
  },
]

const selectedMuscle = ref<FilterOption>('All')

const filteredExercises = computed(() =>
  selectedMuscle.value === 'All'
    ? exercises
    : exercises.filter((exercise) => exercise.muscle === selectedMuscle.value)
)
</script>

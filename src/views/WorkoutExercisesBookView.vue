<template>
  <div class="space-y-12">
    <header class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="space-y-3">
        <p class="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-300">Movement library</p>
        <h1 class="text-3xl font-bold text-white">Workout exercises book</h1>
        <p class="max-w-2xl text-sm text-slate-400">
          Browse the current push / pull / legs rotation, preview accessory priorities, and grab quick primers or finishers that
          match the day&apos;s focus.
        </p>
      </div>
      <RouterLink
        to="/workout"
        class="inline-flex items-center gap-2 self-start rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:-translate-y-0.5 hover:border-white/40"
      >
        Back to workout
      </RouterLink>
    </header>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-white">Weekly rotation</h2>
          <p class="text-sm text-slate-400">See every movement, set target, and coaching note for the current block.</p>
        </div>
        <span class="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-100">
          {{ plans.length }} sessions
        </span>
      </div>
      <div class="grid gap-5 lg:grid-cols-3">
        <article
          v-for="plan in plans"
          :key="plan.id"
          class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-950/70 p-5 text-sm text-slate-300"
        >
          <header class="space-y-1">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ plan.label }} day · Week {{ plan.week }}</p>
            <h3 class="text-lg font-semibold text-white">{{ plan.title }}</h3>
          </header>
          <ul class="space-y-3 text-sm">
            <li
              v-for="exercise in plan.exercises"
              :key="exercise.name"
              class="rounded-xl border border-white/10 bg-slate-900/70 p-3"
            >
              <div class="flex items-start justify-between gap-3">
                <div>
                  <p class="font-semibold text-white">{{ exercise.name }}</p>
                  <p class="text-xs uppercase tracking-wide text-emerald-200">{{ exercise.sets }} sets · {{ exercise.reps }} reps</p>
                </div>
                <span v-if="exercise.notes" class="text-[0.7rem] uppercase tracking-wide text-slate-500">Coach note</span>
              </div>
              <p v-if="exercise.notes" class="mt-2 text-xs text-slate-400">{{ exercise.notes }}</p>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article class="space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Activation primers</h2>
          <p class="text-sm text-slate-400">Pair these before the main lifts to groove positions and wake up the right tissues.</p>
        </div>
        <ul class="space-y-3">
          <li
            v-for="primer in primers"
            :key="primer.name"
            class="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-wide text-emerald-300">{{ primer.focus }}</p>
                <h3 class="text-base font-semibold text-white">{{ primer.name }}</h3>
              </div>
              <span class="text-xs uppercase tracking-wide text-slate-500">{{ primer.duration }}</span>
            </div>
            <ul class="mt-3 space-y-1 text-xs text-slate-400">
              <li v-for="cue in primer.cues" :key="cue" class="flex items-start gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span>{{ cue }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </article>

      <article class="space-y-5 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
        <div class="space-y-2">
          <h2 class="text-lg font-semibold text-white">Accessory circuits</h2>
          <p class="text-sm text-slate-400">Quick stacks to plug into open slots or cooldown windows.</p>
        </div>
        <ul class="space-y-3">
          <li
            v-for="circuit in accessoryCircuits"
            :key="circuit.name"
            class="rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
          >
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-xs uppercase tracking-wide text-emerald-300">{{ circuit.intent }}</p>
                <h3 class="text-base font-semibold text-white">{{ circuit.name }}</h3>
              </div>
              <span class="text-xs uppercase tracking-wide text-slate-500">{{ circuit.time }}</span>
            </div>
            <p class="mt-2 text-xs text-slate-400">{{ circuit.description }}</p>
            <ul class="mt-3 grid gap-2 text-xs text-slate-400">
              <li v-for="detail in circuit.details" :key="detail" class="flex items-start gap-2">
                <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                <span>{{ detail }}</span>
              </li>
            </ul>
          </li>
        </ul>
      </article>
    </section>

    <section class="space-y-6 rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-lg shadow-slate-950/30">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-white">Finisher menu</h2>
          <p class="text-sm text-slate-400">Select a quick metabolic punch or movement challenge to close the session strong.</p>
        </div>
        <span class="text-xs uppercase tracking-wide text-slate-400">Rotate weekly</span>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <article
          v-for="finisher in finishers"
          :key="finisher.name"
          class="space-y-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4 text-sm text-slate-300"
        >
          <div class="space-y-1">
            <p class="text-xs uppercase tracking-wide text-emerald-300">{{ finisher.focus }}</p>
            <h3 class="text-base font-semibold text-white">{{ finisher.name }}</h3>
          </div>
          <p class="text-slate-400">{{ finisher.description }}</p>
          <ul class="space-y-1 text-xs text-slate-400">
            <li v-for="note in finisher.notes" :key="note" class="flex items-start gap-2">
              <span class="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              <span>{{ note }}</span>
            </li>
          </ul>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { Plan } from '@/data/workoutPlans'
import { workoutPlans } from '@/data/workoutPlans'
import { RouterLink } from 'vue-router'

type Primer = {
  name: string
  focus: string
  duration: string
  cues: string[]
}

type AccessoryCircuit = {
  name: string
  intent: string
  time: string
  description: string
  details: string[]
}

type Finisher = {
  name: string
  focus: string
  description: string
  notes: string[]
}

const plans: Plan[] = workoutPlans

const primers: Primer[] = [
  {
    name: 'Scap wall slides + band pull-aparts',
    focus: 'Upper push / pull',
    duration: '6 minutes',
    cues: [
      'Keep ribs tucked while sliding arms overhead',
      'Pause 1 second at the top of each pull-apart',
      'Finish with light band no-money drill for rotator cuff engagement',
    ],
  },
  {
    name: '90/90 breathing with hip lift',
    focus: 'Lower body',
    duration: '4 minutes',
    cues: [
      'Press heels gently into the wall to light up hamstrings',
      'Exhale fully and feel ribs melt down',
      'Hold the hip lift for 3 breaths before resetting',
    ],
  },
  {
    name: 'Copenhagen plank ladder',
    focus: 'Frontal plane stability',
    duration: '5 minutes',
    cues: [
      'Start with knee supported before progressing to foot support',
      'Keep hips stacked and squeeze bottom glute',
      'Alternate sides every 20 seconds for three total rounds',
    ],
  },
]

const accessoryCircuits: AccessoryCircuit[] = [
  {
    name: 'Shoulder stability trio',
    intent: 'Push support',
    time: '8 minutes',
    description: 'Run through controlled articular rotations, kettlebell bottoms-up presses, and plank shoulder taps.',
    details: [
      '1×8 shoulder CARs per direction',
      '3×10 bottoms-up press per arm',
      '3×12 slow shoulder taps focusing on rib control',
    ],
  },
  {
    name: 'Posterior chain reset',
    intent: 'Pull support',
    time: '10 minutes',
    description: 'Blend hinging, posterior cuff, and trunk work to reinforce the main lifts.',
    details: [
      '3×12 hip hinge band good mornings',
      '3×15 reverse fly on incline bench',
      '3×30s dead bug with reach',
    ],
  },
  {
    name: 'Quad finisher ladder',
    intent: 'Lower body',
    time: '7 minutes',
    description: 'Cycle constant tension sissy squats, split squats, and wall sits for a brutal pump.',
    details: [
      '3×12 tempo sissy squats holding support',
      '3×10 front-foot elevated split squats per leg',
      '3×40s wall sit with heels slightly in front of knees',
    ],
  },
]

const finishers: Finisher[] = [
  {
    name: 'Row & burpee waves',
    focus: 'Conditioning',
    description: 'Alternate 250m rows with 8 burpees for five total waves, resting only the walk between stations.',
    notes: [
      'Aim to hold negative split pacing on the rower',
      'Keep burpees smooth rather than sprinted',
      'Finish with nasal-only breathing on last round to downshift',
    ],
  },
  {
    name: 'Heavy sled push cascades',
    focus: 'Power endurance',
    description: 'Push a heavy sled 20m, strip weight, and immediately go 20m more. Repeat for four descending tiers.',
    notes: [
      'Keep torso angle low with arms locked',
      'Rest 60 seconds between cascades',
      'Pair with farmer carry back to start for extra grip work',
    ],
  },
  {
    name: 'Core density medley',
    focus: 'Trunk resilience',
    description: 'Perform hanging knee raises, pallof presses, and hollow rocks in a circuit for 3–4 rounds.',
    notes: [
      'Accumulate 10–12 smooth knee raises per round',
      'Anchor pallof presses with a slight forward lean',
      'Hold hollow rock for 20 seconds, focusing on rib-to-pelvis connection',
    ],
  },
  {
    name: 'Bike sprint ladder',
    focus: 'Anaerobic capacity',
    description: 'Sprints of 10/15/20 seconds with equal rest, then descend. Repeat twice.',
    notes: [
      'Stay seated and drive through the mid-foot',
      'Track max watt drop-off to monitor fatigue',
      'Cool down with 3 minutes easy pedaling',
    ],
  },
  {
    name: 'Battle rope flow',
    focus: 'Upper body conditioning',
    description: 'Alternate double slams, lateral waves, and reverse lunges with rope pulls for a continuous flow.',
    notes: [
      'Keep knees softly bent and ribs stacked',
      'Move through 45 seconds on / 15 seconds off for 4 total minutes',
      'Finish with a slow drag to reinforce posture',
    ],
  },
  {
    name: 'Carry complex',
    focus: 'Grip & posture',
    description: 'Farmer carry, front rack carry, and suitcase carry for 20m each before resting.',
    notes: [
      'Keep pace deliberate and breathe through the nose',
      'Switch suitcase side every trip',
      'Complete 3 rounds building load each time',
    ],
  },
]
</script>

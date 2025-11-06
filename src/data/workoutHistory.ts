import type { Plan } from './workoutPlans'

export type HistoryExercise = {
  name: string
  weight: string
  setsCompleted: number
  setsPlanned: number
  reps: string
}

export type SessionRecord = {
  session: string
  planId: Plan['id']
  exercises: HistoryExercise[]
}

export const workoutHistory: SessionRecord[] = [
  {
    session: '05/11 - Push Day',
    planId: 'push',
    exercises: [
      {
        name: 'Barbell Bench Press',
        weight: '40kg',
        setsCompleted: 4,
        setsPlanned: 4,
        reps: '10',
      },
      {
        name: 'Incline Dumbbell Press',
        weight: '2×20kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '8',
      },
      {
        name: 'Seated Dumbbell Shoulder Press',
        weight: '2×12.5kg',
        setsCompleted: 4,
        setsPlanned: 4,
        reps: '10',
      },
      {
        name: 'Cable Lateral Raise',
        weight: '12.5kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '15',
      },
      {
        name: 'Triceps Rope Pushdown',
        weight: '25kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '12',
      },
    ],
  },
  {
    session: '07/11 - Pull Day',
    planId: 'pull',
    exercises: [
      {
        name: 'Weighted Pull-up',
        weight: '10kg',
        setsCompleted: 4,
        setsPlanned: 4,
        reps: '6',
      },
      {
        name: 'Bent-over Row',
        weight: '50kg',
        setsCompleted: 4,
        setsPlanned: 4,
        reps: '10',
      },
      {
        name: 'Single-arm Cable Row',
        weight: '20kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '12',
      },
      {
        name: 'Face Pull',
        weight: '15kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '15',
      },
      {
        name: 'Alternating Hammer Curl',
        weight: '2×10kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '12',
      },
    ],
  },
  {
    session: '09/11 - Leg Day',
    planId: 'legs',
    exercises: [
      {
        name: 'Back Squat',
        weight: '80kg',
        setsCompleted: 5,
        setsPlanned: 5,
        reps: '5',
      },
      {
        name: 'Romanian Deadlift',
        weight: '70kg',
        setsCompleted: 4,
        setsPlanned: 4,
        reps: '8',
      },
      {
        name: 'Walking Lunge',
        weight: '2×15kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '12/leg',
      },
      {
        name: 'Leg Curl',
        weight: '35kg',
        setsCompleted: 3,
        setsPlanned: 3,
        reps: '12',
      },
      {
        name: 'Seated Calf Raise',
        weight: '40kg',
        setsCompleted: 4,
        setsPlanned: 4,
        reps: '15',
      },
    ],
  },
]

export type Exercise = {
  name: string
  sets: number
  reps: string
  notes?: string
}

export type Plan = {
  id: string
  label: string
  title: string
  week: number
  exercises: Exercise[]
}

export const workoutPlans: Plan[] = [
  {
    id: 'push',
    label: 'Push',
    title: 'Push Day · Week 4',
    week: 4,
    exercises: [
      {
        name: 'Barbell Bench Press',
        sets: 4,
        reps: '4–6',
        notes: 'Tempo 2-1-2. Focus on leg drive.',
      },
      {
        name: 'Incline Dumbbell Press',
        sets: 3,
        reps: '10',
        notes: 'Keep shoulders packed and pause at the top.',
      },
      {
        name: 'Dips',
        sets: 3,
        reps: '8–10',
        notes: 'Keep torso forward, stop 1 rep shy of failure.',
      },
      {
        name: 'Cable Lateral Raise',
        sets: 3,
        reps: '15',
        notes: 'Slow eccentric and full range of motion.',
      },
      {
        name: 'Seated Dumbbell Shoulder Press',
        sets: 3,
        reps: '8–10',
        notes: 'Drive elbows under wrists and finish with biceps by ears.',
      },
      {
        name: 'Triceps Rope Pushdown',
        sets: 3,
        reps: '12–15',
        notes: 'Flare the rope at the bottom and control the return.',
      },
    ],
  },
  {
    id: 'pull',
    label: 'Pull',
    title: 'Pull Day · Week 4',
    week: 4,
    exercises: [
      {
        name: 'Weighted Pull-up',
        sets: 4,
        reps: '5',
        notes: 'Neutral grip, focus on controlled descent.',
      },
      {
        name: 'Bent-over Row',
        sets: 4,
        reps: '8',
        notes: 'Keep spine neutral and squeeze at the top.',
      },
      {
        name: 'Single-arm Cable Row',
        sets: 3,
        reps: '12',
      },
      {
        name: 'Face Pull',
        sets: 3,
        reps: '15',
        notes: 'Drive elbows high to hit rear delts.',
      },
      {
        name: 'Chest-supported Row',
        sets: 3,
        reps: '10',
        notes: 'Let scapulae protract at the bottom before pulling.',
      },
      {
        name: 'Alternating Hammer Curl',
        sets: 3,
        reps: '12 (total)',
        notes: 'Squeeze at the top and lower for a 3 count.',
      },
    ],
  },
  {
    id: 'legs',
    label: 'Leg',
    title: 'Leg Day · Week 4',
    week: 4,
    exercises: [
      {
        name: 'Back Squat',
        sets: 5,
        reps: '3–5',
        notes: 'Brace hard and control the descent.',
      },
      {
        name: 'Romanian Deadlift',
        sets: 4,
        reps: '8',
      },
      {
        name: 'Walking Lunge',
        sets: 3,
        reps: '12/leg',
      },
      {
        name: 'Leg Curl',
        sets: 3,
        reps: '12',
        notes: 'Add a 2 sec squeeze at full contraction.',
      },
      {
        name: 'Front-foot Elevated Split Squat',
        sets: 3,
        reps: '10/leg',
        notes: 'Drive knee forward to feel the quad stretch at the bottom.',
      },
      {
        name: 'Seated Calf Raise',
        sets: 4,
        reps: '15',
        notes: 'Pause at the top and bottom for a full 1 second.',
      },
    ],
  },
]

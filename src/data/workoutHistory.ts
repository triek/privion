export type SessionRecord = {
  session: string
  exercises: string[]
}

export const workoutHistory: SessionRecord[] = [
  {
    session: '05/11 - Push Day',
    exercises: [
      'Barbell bench press 40kg 4x10',
      'Incline dumbbell press 2x20kg 3x8',
      'Seated dumbbell shoulder press 2x12.5kg 4x10',
      'Cable lateral raise 12.5kg 3x15',
      'Triceps rope pushdown 25kg 3x12'
    ],
  },
  {
    session: '07/11 - Pull Day',
    exercises: [
      'Weighted pull-up 10kg 4x6',
      'Bent-over row 50kg 4x10',
      'Single-arm cable row 20kg 3x12',
      'Face pull 15kg 3x15',
      'Alternating hammer curl 2x10kg 3x12'
    ],
  },
  {
    session: '09/11 - Leg Day',
    exercises: [
      'Back squat 80kg 5x5',
      'Romanian deadlift 70kg 4x8',
      'Walking lunge 2x15kg 3x12/leg',
      'Leg curl 35kg 3x12',
      'Seated calf raise 40kg 4x15'
    ],
  },
]

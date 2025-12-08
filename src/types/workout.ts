export type MuscleGroup =
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
  | 'Glutes'
  | 'Calves'
  | 'Rear Delts'

export type WorkoutExercise = {
  id: string
  name: string
  muscle: MuscleGroup
  equipment: string
  description: string
  cues: string[]
  defaultSets: number
  defaultReps: number
  defaultWeight: number
}

export type WorkoutExercisePayload = Omit<WorkoutExercise, 'id'>

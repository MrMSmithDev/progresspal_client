export interface ExerciseSet {
  id?: string; // To support field sets in creation
  weight: number;
  reps: number;
}

export interface Exercise {
  id?: string; // To support removal in creation
  type: 'strength' | 'cardio';
  name: string;
  distance?: number;
  time?: number;
  sets?: ExerciseSet[];
}

export default interface Workout {
  _id: string;
  userId: string;
  unit: 'met' | 'imp';
  date: string;
  length: number;
  exercises: Exercise[];
}

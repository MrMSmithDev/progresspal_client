export interface Set {
    weight: number;
    reps: number;
}

export interface Exercise {
  type: 'strength' | 'cardio';
  name: string;
  distance?: number;
  sets?: Set[];
}

export default interface Workout {
  _id: string;
  userId: string;
  unit: 'met' | 'imp';
  date: string;
  length: number;
  exercises: Exercise[];
}

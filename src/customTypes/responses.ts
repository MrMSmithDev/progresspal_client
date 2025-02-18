import { Exercise } from "./workout";

export type CreateWeightResponse = {
  _id?: string;
  userId?: string;
  date?: string;
  unit?: 'met' | 'imp';
  weight?: string;
  error?: string;
};

export type CreateWorkoutResponse = {
  _id?: string;
  userId?: string;
  date?: string;
  length?: string;
  exercises?: Exercise[];
  error?: string;
};

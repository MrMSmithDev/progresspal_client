import { Exercise } from './workout';

export type CreateWeightResponse = {
  _id?: string;
  data?: {
    userId: string;
    date: string;
    unit: 'met' | 'imp';
    weight: string;
  };
  message?: string;
  error?: string;
};

export type CreateWorkoutResponse = {
  id?: string;
  data?: {
    _id: string;
    userId: string;
    date: string;
    length: string;
    exercises: Exercise[];
  };
  message?: string;
  error?: string;
};

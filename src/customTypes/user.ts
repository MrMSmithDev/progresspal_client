export default interface User {
  _id: string;
  email: string;
  createdAt: string;
  target: number;
  workouts: string[];
  weightTracker: string[];
}

export default interface Weight {
  _id: string;
  userId: string;
  date: string;
  unit: 'met' | 'imp';
  weight: number;
}

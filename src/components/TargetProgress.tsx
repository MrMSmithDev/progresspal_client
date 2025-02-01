import React, { useMemo } from 'react';
import { Workout } from 'src/customTypes';

interface TargetProgressProps {
  workouts: Workout[];
}

const TargetProgress: React.FC<TargetProgressProps> = ({ workouts }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthsWorkoutCount = useMemo(() => {
    return workouts.filter((workout) => {
      const workoutDate = new Date(workout.date);
      return (
        workoutDate.getMonth() == currentMonth &&
        workoutDate.getFullYear() == currentYear
      );
    }).length;
  }, [workouts]);

  return <div>Target progress this month: {monthsWorkoutCount}</div>;
};

export default TargetProgress;

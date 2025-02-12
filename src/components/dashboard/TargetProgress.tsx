import ProgressCircle from '@components/analysis/ProgressCircle';
import React, { useEffect, useMemo, useState } from 'react';
import { Workout } from 'src/customTypes';

interface TargetProgressProps {
  target?: number;
  workouts: Workout[];
}

const TargetProgress: React.FC<TargetProgressProps> = ({
  target = 20,
  workouts = [],
}) => {
  const [targetProgress, setTargetProgress] = useState<number>(0);

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

  useEffect(() => {
    setTargetProgress((monthsWorkoutCount / target) * 100);
  }, [monthsWorkoutCount, target]);

  return (
    <div className="flex flex-col items-center bg-background dark:bg-background-dark p-5 rounded-xl text-gray-700 dark:text-gray-100">
      <h2 className="font-bold">Target Progress</h2>
      <ProgressCircle progress={targetProgress} />
      <p className="text-center md:text-xl">
        <span className={`font-bold !text-${targetProgress}`}>
          {monthsWorkoutCount}
        </span>
        <span> out of </span>
        <span className={`font-bold`}>{target}</span>
      </p>
    </div>
  );
};

export default TargetProgress;

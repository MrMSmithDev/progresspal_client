import Loader from '@components/Loader/Loader';
import React, { useEffect, useMemo, useState } from 'react';
import { Workout } from 'src/customTypes';
import formatDate from '@utils/formatDate';
import ExerciseTable from '@components/utils/ExerciseTable';

type weeksWorkout = { day: number; workoutOnDay: boolean };

interface RecentWorkoutsProps {
  workouts: Workout[];
}

const RecentWorkouts: React.FC<RecentWorkoutsProps> = ({ workouts }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const fiveMostRecent: Workout[] = useMemo(() => {
    if (workouts.length <= 0) return [];

    return [...workouts]
      .sort(
        (a: Workout, b: Workout) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 5);
  }, [workouts]);

  const workoutsThisWeek: weeksWorkout[] = useMemo(() => {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // filter workouts to last seven days
    const filteredWorkouts = workouts.filter(
      (workout: Workout) => new Date(workout.date) >= sevenDaysAgo
    );

    const streakArr: weeksWorkout[] = Array.from({ length: 7 }, (_, i) => {
      const currentDate = new Date(Date.now() - i * 24 * 60 * 60 * 1000);

      const workoutOnDay = filteredWorkouts.some((workout) => {
        const workoutDate = new Date(workout.date);
        return (
          workoutDate.getUTCDate() === currentDate.getUTCDate() &&
          workoutDate.getUTCMonth() === currentDate.getUTCMonth() &&
          workoutDate.getUTCFullYear() === currentDate.getUTCFullYear()
        );
      });

      return { day: currentDate.getDay(), workoutOnDay };
    });

    return streakArr.reverse();
  }, [workouts]);

  useEffect(() => {
    if (workoutsThisWeek) setLoading(false);
  }, [workoutsThisWeek]);

  if (loading)
    return (
      <div className="flex flex-col h-full items-center bg-background dark:bg-background-dark p-5 rounded-xl text-gray-700 dark:text-gray-100">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col h-full items-center bg-background dark:bg-background-dark p-5 rounded-xl text-gray-700 dark:text-gray-100">
      <div className="flex flex-col items-center w-full">
        <h2 className="font-bold mb-2">LAST SEVEN DAYS</h2>
        <div className="mb-3 flex w-full">
          {workoutsThisWeek.map((workout) => (
            <div
              className={`${workout.workoutOnDay ? 'bg-primary' : 'bg-gray-500'} h-5 flex-grow first:rounded-tl-lg first:rounded-bl-lg last:rounded-tr-lg last:rounded-br-lg`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="font-bold mb-2">RECENT WORKOUTS</h2>
        {fiveMostRecent.length ? (
          fiveMostRecent.map((workout, i) => (
            <div className="flex flex-col items-center border-b-primary border-b-2 border-b-solid mb-3 rounded max-h-[150px] overflow-hidden">
              <h3 className="italic mb-3 tracking-wide">
                Workout {formatDate(workout.date)} ({workout.exercises.length}{' '}
                exercise{workout.exercises.length > 1 ? 's' : ''})
              </h3>
              {workout.exercises.map((exercise) => (
                <ExerciseTable exercise={exercise} />
              ))}
            </div>
          ))
        ) : (
          <div>No Workouts recorded yet</div>
        )}
      </div>
    </div>
  );
};

export default RecentWorkouts;

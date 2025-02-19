import Loader from '@components/Loader/Loader';
import React, { useEffect, useMemo, useState } from 'react';
import { Workout } from 'src/customTypes';
import formatDate from '@utils/formatDate';
import ExerciseTable from '@components/utils/ExerciseTable';
import useUnits from '@hooks/useUnits';
import { convertDistanceUnits, convertWeightUnits } from '@utils/convertUnits';

type weeksWorkout = { day: number; workoutOnDay: boolean };

interface RecentWorkoutsProps {
  workouts: Workout[];
}

const RecentWorkouts: React.FC<RecentWorkoutsProps> = ({ workouts }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [units] = useUnits();

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

  const fiveMostRecent: Workout[] = useMemo(() => {
    if (workouts.length <= 0) return [];

    const sortedArr = [...workouts]
      .sort(
        (a: Workout, b: Workout) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      .slice(0, 5);

    const convertedArr = sortedArr.map((workout) => ({
      ...workout,
      exercises: workout.exercises.map((exercise) => {
        return exercise.type === 'cardio'
          ? {
              name: exercise.name,
              time: exercise.time,
              distance:
                workout.unit === units
                  ? exercise.distance
                  : convertDistanceUnits(exercise.distance, workout.unit),
            }
          : {
              name: exercise.name,
              sets: exercise.sets.map((set) => ({
                reps: set.reps,
                weight:
                  workout.unit === units
                    ? set.weight
                    : convertWeightUnits(set.weight, workout.unit),
              })),
            };
      }),
    }));

    return sortedArr;
  }, [workouts, units]);

  useEffect(() => {
    if (workoutsThisWeek && fiveMostRecent) setLoading(false);
  }, [workoutsThisWeek, fiveMostRecent]);

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
          {workoutsThisWeek.map((workout, i) => (
            <div
              key={i}
              className={`${workout.workoutOnDay ? 'bg-primary' : 'bg-gray-500'} h-5 flex-grow first:rounded-tl-lg border-x-2 border-x-solid border-x-gray-900 first:border-l-0 first:rounded-bl-lg last:border-r-0 last:rounded-tr-lg last:rounded-br-lg`}
            ></div>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="font-bold mb-2">RECENT WORKOUTS</h2>
        {fiveMostRecent.length ? (
          fiveMostRecent.map((workout, i) => (
            <div
              key={`${workout.date}-${i}`}
              className="relative flex flex-col items-center border-b-primary border-b-2 border-b-solid mb-3 rounded max-h-[150px] overflow-hidden after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/4 after:bg-gradient-to-t after:from-background dark:after:from-background-dark after:to-transparent"
            >
              <h3 className="italic mb-3 tracking-wide">
                Workout {formatDate(workout.date)} ({workout.exercises.length}{' '}
                exercise{workout.exercises.length > 1 ? 's' : ''})
              </h3>
              {workout.exercises.map((exercise, i) => (
                <ExerciseTable
                  key={`${workout.date}-${exercise.name}-${i}`}
                  exercise={exercise}
                />
              ))}
              <span>See all workouts</span>
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

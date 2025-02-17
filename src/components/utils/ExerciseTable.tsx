import useUnits from '@hooks/useUnits';
import React from 'react';
import { Exercise } from 'src/customTypes/workout';

interface ExerciseTableProps {
  exercise: Exercise;
}

const ExerciseTable: React.FC<ExerciseTableProps> = ({ exercise }) => {
  const [units] = useUnits();

  return (
    <div className="flex w-full py-2">
      <h3 className="mr-auto w-1/2">{exercise.name}</h3>
      {exercise.type === 'strength' ? (
        <table className="table-fixed text-gray-700 dark:text-gray-100 w-1/2 mb-3 overflow-hidden">
          <thead>
            <tr>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/3 p-1 align-bottom">
                Set
              </th>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/3 p-1 align-bottom">
                Weight ({units === 'met' ? 'kg' : 'lb'})
              </th>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/3 p-1 align-bottom">
                Reps
              </th>
            </tr>
          </thead>
          <tbody>
            {exercise.sets.map((set, i) => (
              <tr key={i}>
                <td className="text-sm text-gray-700 dark:text-gray-100 text-center p-1">
                  {i + 1}
                </td>
                <td className="text-sm text-gray-700 dark:text-gray-100 text-center p-1">
                  {set.weight}
                </td>
                <td className="text-sm text-gray-700 dark:text-gray-100 text-center p-1">
                  {set.reps}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="table-fixed text-gray-700 dark:text-gray-100 w-1/2 mb-3">
          <thead>
            <tr>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/2 align-bottom">
                Time
              </th>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/2 align-bottom">
                Distance ({units === 'met' ? 'km' : 'miles'})
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-sm text-gray-700 dark:text-gray-100 text-center p-1 w-1/2">
                {exercise.time}
              </td>
              <td className="text-sm text-gray-700 dark:text-gray-100 text-center p-1 w-1/2">
                {exercise.distance}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExerciseTable;

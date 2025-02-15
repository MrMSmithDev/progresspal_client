import { DeleteFieldButton } from '@components/buttons';
import useUnits from '@hooks/useUnits';
import React from 'react';
import { Exercise } from 'src/customTypes/workout';

interface ExerciseDisplayProps {
  exercises: Exercise[];
  removeExFunc: (id: string) => void;
}

const ExerciseDisplay: React.FC<ExerciseDisplayProps> = ({
  exercises = [],
  removeExFunc,
}) => {
  const [units] = useUnits();

  function removeFieldFunc(id: string) {
    removeExFunc(id);
  }

  return exercises.map((exercise) => (
    <li
      key={exercise.id}
      className="flex gap-5 border-l-primary border-l-solid rounded border-l-3 p-5 w-full"
    >
      <div className="w-1/2">
        <h3 className="font-bold text-gray-700 dark:text-gray-100 ">
          {exercise.name}
        </h3>
        <h3 className="text-sm text-gray-700 dark:text-gray-100 italic">
          {exercise.type}
        </h3>
      </div>
      {exercise.type === 'strength' ? (
        <table className="table-fixed text-gray-700 dark:text-gray-100 w-1/2">
          <thead>
            <tr>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/3">
                Set
              </th>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/3">
                Weight ({units === 'met' ? 'kg' : 'lb'})
              </th>
              <th className="text-sm text-gray-700 dark:text-gray-100 text-center font-bold w-1/3">
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
        <table className="table-auto">
          <thead>
            <tr>
              <th className="text-sm text-gray-700 dark:text-gray-100 font-bold">
                Time
              </th>
              <th className="text-sm text-gray-700 dark:text-gray-100 font-bold">
                Distance ({units === 'met' ? 'km' : 'miles'})
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="flex gap-3">
              <td className="text-sm text-gray-700 dark:text-gray-100 w-full">
                {exercise.time}
              </td>
              <td className="text-sm text-gray-700 dark:text-gray-100 w-full">
                {exercise.distance}
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <DeleteFieldButton
        className="hover:animate-bounce-left"
        removeFieldFunc={() => {
          removeFieldFunc(exercise.id);
        }}
      />
    </li>
  ));
};

export default ExerciseDisplay;

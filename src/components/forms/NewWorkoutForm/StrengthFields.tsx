import {
  DeleteFieldButton,
  GenericButton,
  SubmitButton,
} from '@components/buttons';
import useUnits from '@hooks/useUnits';
import React, { useState } from 'react';
import { Exercise, ExerciseSet } from 'src/customTypes/workout';
import { v4 as uuidV4 } from 'uuid';

interface StrengthFieldsProps {
  applyExercise: (obj: Exercise) => void;
}

const StrengthFields: React.FC<StrengthFieldsProps> = ({ applyExercise }) => {
  const [units] = useUnits();
  const [exName, setExName] = useState<string>('');
  const [sets, setSets] = useState<ExerciseSet[]>([
    { id: uuidV4(), weight: 0, reps: 0 },
  ]);

  function handleExNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExName(e.currentTarget.value);
  }

  function handleSetChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    field: string
  ) {
    const newValue = e.target.value === '' ? '' : Number(e.target.value); // Convert to number but allow empty input

    setSets((prevSets) =>
      prevSets.map((set) =>
        set.id === id ? { ...set, [field]: newValue } : set
      )
    );
  }

  function addSet(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setSets((prevSets) => [...prevSets, { id: uuidV4(), weight: 0, reps: 0 }]);
  }

  function removeFieldFunc(id: string) {
    setSets((prevSets) => prevSets.filter((s) => s.id !== id));
  }

  function submitExercise(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const exObj = {
      id: uuidV4(),
      type: 'strength',
      name: exName,
      sets: sets.map((s) => ({ weight: s.weight, reps: s.reps })),
    } as Exercise;

    applyExercise(exObj);

    // Set states to default
    setExName('');
    setSets([{ id: uuidV4(), weight: 0, reps: 0 }]);
  }

  return (
    <div className="flex flex-col">
      <label
        className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
        htmlFor="ex-name"
      >
        Name of exercise
      </label>
      <input
        className="max-w-50 text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline mb-3"
        id="ex-name"
        type="text"
        onChange={handleExNameChange}
        placeholder="Name"
        value={exName}
      />

      {sets.map(
        (set, index): React.ReactNode => (
          <div key={set.id} className="flex gap-3">
            <div>
              <label
                className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
                htmlFor={`weight-${set.id}`}
              >
                Weight in {units === 'met' ? 'kg' : 'lb'}
              </label>
              <input
                className="max-w-50 text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline mb-3"
                id={`weight-${set.id}`}
                type="number"
                onChange={(e) => handleSetChange(e, set.id, 'weight')}
                value={set.weight}
                min="0"
                max="1000"
                required
              />
            </div>
            <div>
              <label
                className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
                htmlFor={`reps-${set.id}`}
              >
                Reps
              </label>
              <input
                className="max-w-50 text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline mb-3"
                id={`reps-${set.id}`}
                type="number"
                onChange={(e) => handleSetChange(e, set.id, 'reps')}
                value={set.reps}
                min="0"
                max="500"
                required
              />
            </div>
            {index > 0 ? (
              <DeleteFieldButton
                className="hover:animate-bounce-left"
                removeFieldFunc={() => removeFieldFunc(set.id)}
              />
            ) : null}
          </div>
        )
      )}

      <div className="flex my-3">
        <GenericButton func={addSet} text="Add set" />
      </div>

      <SubmitButton
        func={submitExercise}
        text="Apply exercise"
        className="w-max px-2 mx-auto"
      />
    </div>
  );
};

export default StrengthFields;

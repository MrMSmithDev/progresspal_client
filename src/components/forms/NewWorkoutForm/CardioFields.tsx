import { SubmitButton } from '@components/buttons';
import useUnits from '@hooks/useUnits';
import React, { useState } from 'react';
import { Exercise } from 'src/customTypes/workout';
import { v4 as uuidV4 } from 'uuid';

interface CardioFieldsProps {
  applyExercise: (exObj: Exercise) => void;
}

const CardioFields: React.FC<CardioFieldsProps> = ({ applyExercise }) => {
  const [exName, setExName] = useState<string>('');
  const [currentDistanceInput, setCurrentDistanceInput] = useState<number | ''>(
    0
  );
  const [currentTimeInput, setCurrentTimeInput] = useState<number | ''>(0);
  const [units] = useUnits();

  function handleExNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setExName(e.currentTarget.value);
  }

  function handleDistanceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value === '' ? '' : Number(e.target.value);
    setCurrentDistanceInput(newValue);
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value === '' ? '' : Number(e.target.value);
    setCurrentTimeInput(newValue);
  }

  function submitExercise(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const exObj = {
      id: uuidV4(),
      type: 'cardio',
      name: exName,
      distance: currentDistanceInput,
      time: currentTimeInput,
    } as Exercise;

    applyExercise(exObj);

    // set states to default
    setExName('');
    setCurrentDistanceInput(0);
    setCurrentTimeInput(0);
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
      />
      <label
        className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
        htmlFor="distance"
      >
        Distance in {units === 'met' ? 'km' : 'miles'}
      </label>
      <input
        className="max-w-50 text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline mb-3"
        id="distance"
        type="number"
        onChange={handleDistanceChange}
        min="0"
        max="600"
        value={currentDistanceInput}
        required
      />
      <label
        className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
        htmlFor="time"
      >
        Time
      </label>
      <input
        className="max-w-50 text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline mb-3"
        id="time"
        type="number"
        step="0.01"
        onChange={handleTimeChange}
        min="0"
        max="600"
        placeholder="0"
        value={currentTimeInput}
        required
      />

      <SubmitButton
        func={submitExercise}
        text="Apply exercise"
        className="w-max px-2 mx-auto"
      />
    </div>
  );
};

export default CardioFields;

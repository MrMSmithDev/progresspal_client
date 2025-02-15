import { SubmitButton } from '@components/buttons';
import useUnits from '@hooks/useUnits';
import React from 'react';

interface CardioFieldsProps {
  applyExercise: () => void;
  handleDistanceChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleExNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CardioFields: React.FC<CardioFieldsProps> = ({
  applyExercise,
  handleDistanceChange,
  handleExNameChange,
}) => {
  const [units] = useUnits();

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
        placeholder="0"
      />

      <SubmitButton
        func={applyExercise}
        text="Apply exercise"
        className="w-max px-2 mx-auto"
      />
    </div>
  );
};

export default CardioFields;

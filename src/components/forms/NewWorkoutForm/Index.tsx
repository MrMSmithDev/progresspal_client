import { SubmitButton } from '@components/buttons';
import React, { useEffect, useRef, useState } from 'react';
import { Exercise } from 'src/customTypes/workout';
import CardioFields from './CardioFields';
import StrengthFields from './StrengthFields';
import useUnits from '@hooks/useUnits';
import { useAuth } from '@hooks/useAuth';
import { fetchData } from '@utils/api';
import { type CreateWorkoutResponse } from 'src/customTypes/responses';
import ExerciseDisplay from './ExerciseDisplay';
import { useModal } from '@hooks/useModal';

interface NewWorkoutFormProps {
  closeForm: () => void;
}

const NewWorkoutForm: React.FC<NewWorkoutFormProps> = ({ closeForm }) => {
  const [currentDateInput, setCurrentDateInput] = useState<string>('');
  const [currentLengthInput, setCurrentLengthInput] = useState<number>(0);

  const { openModal } = useModal();
  const [units] = useUnits();
  const { token } = useAuth();

  // exercises
  const [currentExArr, setCurrentExArr] = useState<Exercise[]>([]);
  const [currentExType, setCurrentExType] = useState<
    'strength' | 'cardio' | string
  >('strength');

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentDateInput(e.currentTarget.value);
  }

  function handleLengthChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentLengthInput(parseInt(e.currentTarget.value));
  }

  function handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.checked) setCurrentExType(e.currentTarget.value);
  }

  // Submit funcs
  function applyExercise(exObject: Exercise) {
    setCurrentExArr((prevExArr) => [...prevExArr, exObject]);
  }

  function removeExFromArr(id: string) {
    setCurrentExArr((prevExs) => prevExs.filter((e) => e.id !== id));
  }

  async function submitForm(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();

    const workoutObject = {
      date: currentDateInput,
      unit: units,
      length: currentLengthInput,
      exercises: currentExArr,
    };

    const reqOptions = {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(workoutObject),
    };

    try {
      const data = (await fetchData(
        '/workout',
        reqOptions
      )) as CreateWorkoutResponse;

      if (data.error) {
        return openModal(<span>Error: {data.error}</span>);
      }

      console.log(data.data);

      openModal(<span>Workout successfully added</span>);
      return closeForm();
    } catch (err) {
      openModal(<span>Error creating workout data</span>);
    }
  }

  const exerciseFieldComponents = {
    cardio: <CardioFields applyExercise={applyExercise} />,
    strength: <StrengthFields applyExercise={applyExercise} />,
  };

  const dateSelector = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (dateSelector.current) {
      const currentDate = new Date();

      let day: string | number = currentDate.getDate();
      let month: string | number = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();

      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;

      dateSelector.current.value = `${year}-${month}-${day}`;
      setCurrentDateInput(`${year}-${month}-${day}`);
    }
  }, [dateSelector]);

  const maxDate = new Date().toISOString().split('T')[0];

  return (
    <form className="flex flex-col items-center pt-6 pb-4 w-full">
      <h1 className="text-gray-700 dark:text-gray-100 font-bold">
        Create new workout
      </h1>
      <div className="mb-3 inline-block w-full">
        <label
          className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
          htmlFor="date"
        >
          Date
        </label>
        <input
          ref={dateSelector}
          className="max-w-50 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline"
          id="date"
          type="date"
          onChange={handleDateChange}
          placeholder={maxDate}
          required
        />
      </div>

      <div className="mb-3 inline-block w-full">
        <label
          className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
          htmlFor="length"
        >
          Length in minutes
        </label>
        <input
          className="max-w-50 text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline"
          id="length"
          type="number"
          onChange={handleLengthChange}
          min="0"
          max="600"
          placeholder="0"
          required
        />
      </div>
      <fieldset className="border-2 border-gray-700 dark:border-gray-100 w-full p-3 rounded my-5">
        <legend className="px-2 text-gray-700 dark:text-gray-100 font-bold">
          Add Exercise
        </legend>

        <div className="pb-3 inline-block w-full">
          <span className="mb-3 block text-gray-700 dark:text-gray-100 text-sm font-bold">
            Type of exercise
          </span>
          <div className="flex gap-2">
            <input
              type="radio"
              name="type"
              id="strength"
              value="strength"
              onChange={handleTypeChange}
              defaultChecked
            />
            <label
              className="block text-gray-700 dark:text-gray-100 text-sm font-bold mr-2"
              htmlFor="strength"
            >
              Strength
            </label>
            <input
              type="radio"
              name="type"
              id="cardio"
              value="cardio"
              onChange={handleTypeChange}
            />
            <label
              className="block text-gray-700 dark:text-gray-100 text-sm font-bold"
              htmlFor="cardio"
            >
              Cardio
            </label>
          </div>
        </div>

        {exerciseFieldComponents[currentExType] ||
          exerciseFieldComponents.cardio}
      </fieldset>
      <div className="w-full mb-3">
        <h2 className="px-2 text-center text-gray-700 dark:text-gray-100 font-bold mb-3">
          Exercises
        </h2>
        <ul className="flex flex-col gap-3 w-full">
          <ExerciseDisplay
            exercises={currentExArr}
            removeExFunc={removeExFromArr}
          />
        </ul>
      </div>
      <SubmitButton func={submitForm} text="Add workout" />
    </form>
  );
};

export default NewWorkoutForm;

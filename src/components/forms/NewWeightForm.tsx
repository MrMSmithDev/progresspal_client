import { SubmitButton } from '@components/buttons';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/useModal';
import useUnits from '@hooks/useUnits';
import { fetchData } from '@utils/api';
import isDateValid from '@utils/isdateValid';
import React, { useEffect, useRef, useState } from 'react';
import { CreateWeightResponse } from 'src/customTypes';

interface NewWeightFormProps {
  closeForm: () => void;
}

const NewWeightForm: React.FC<NewWeightFormProps> = ({ closeForm }) => {
  const [currentDateInput, setCurrentDateInput] = useState<string>('');
  const [currentWeightInput, setCurrentWeightInput] = useState<number | ''>(0);
  const [inputError, setInputError] = useState<string | null>(null);

  const {token} = useAuth()
  const { openModal } = useModal();
  const [units] = useUnits();

  function handleWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newValue = e.target.value === '' ? '' : parseFloat(e.target.value);
    setCurrentWeightInput(newValue);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCurrentDateInput(e.currentTarget.value);
  }

  async function submitForm(e: React.FormEvent<HTMLButtonElement>) {
    console.log('submitting');
    e.preventDefault();

    if (!currentDateInput) return setInputError('Please input a valid date');

    if (!isDateValid(currentDateInput))
      return setInputError('Input a valid date up to todays date');

    if (typeof currentWeightInput !== 'number')
      return setInputError('Input a valid number for weight');

    setInputError(null);

    try {
      const reqOptions = {
        method: 'POST',
        headers: { authorization: `Bearer ${token}`},
        body: JSON.stringify({
          date: currentDateInput,
          weight: currentWeightInput,
          unit: units,
        }),
      };
      console.log('fetching');

      const data = (await fetchData(
        '/weight',
        reqOptions
      )) as CreateWeightResponse;
      console.log(data);
      if (data.error) {
        openModal(<span>{data.error}</span>);
      } else {
        console.log(data);
        openModal(<span>Weight successfully added</span>);
        closeForm();
      }
    } catch (err) {
      openModal(<span>Error creating weight data</span>);
    }
  }

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
          min="2010-01-01"
          max={maxDate}
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
          Weight in {units === 'met' ? 'kg' : 'lb'}
        </label>
        <input
          className="max-w-50 text-right shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-input-dark leading-tight focus:outline-none focus:shadow-outline"
          id="length"
          type="number"
          onChange={handleWeightChange}
          step="0.1"
          min="0"
          max="600"
          placeholder="0"
          required
        />
      </div>
      {inputError && (
        <span className="italic text-sm my-2 text-low">{inputError}</span>
      )}
      <SubmitButton func={submitForm} text="Add workout" />
    </form>
  );
};

export default NewWeightForm;

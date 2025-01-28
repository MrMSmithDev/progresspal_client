import useUnits from '@hooks/useUnits';
import React from 'react';

interface UnitSelectorProps {}

const UnitSelectorButtons: React.FC<UnitSelectorProps> = ({}) => {
  const [units, toggleUnits] = useUnits();

  function changeToMet(e: React.MouseEvent<HTMLButtonElement>) {
    if (units !== 'met') toggleUnits();
  }

  function changeToImp(e: React.MouseEvent<HTMLButtonElement>) {
    if (units !== 'imp') toggleUnits();
  }

  return (
    <div className="grid grid-cols-2 w-full p-4 gap-2">
      <button
        className={`${'met' === units ? 'border-2 border-primary border-solid' : ''} flex flex-col flex-grow items-center cursor-pointer p-2 box-border`}
        onClick={changeToMet}
        value="met"
      >
        <p className="block text-gray-700 dark:text-gray-100 text-xs md:text-sm font-bold">
          Metric
        </p>
        <p className="block text-gray-700 dark:text-gray-100 text-xs font-thin">
          kilograms / kilometers
        </p>
      </button>
      <button
        className={`${'imp' === units ? 'border-2 border-primary border-solid' : ''} flex flex-col flex-grow items-center cursor-pointer p-2 box-border`}
        onClick={changeToImp}
        value="imp"
      >
        <p className="block text-gray-700 dark:text-gray-100 text-xs md:text-sm font-bold">
          Imperial
        </p>
        <p className="block text-gray-700 dark:text-gray-100 text-xs font-thin">pounds / miles</p>
      </button>
    </div>
  );
};

export default UnitSelectorButtons;

import React from 'react';

const NewWeightButton: React.FC = () => {
  function OpenWeightForm() {}

  return (
    <button onClick={OpenWeightForm} className="flex flex-grow items-center justify-center bg-background-dark dark:bg-background text-center text-lg rounded text-gray-100 dark:text-gray-700 py-1 px-3 cursor-pointer">
      <span className="bg-red-500 rounded-full h-5 w-5 inline-block m-2 animate-pulse"></span> <span className="font-bold">Record new weight</span>
    </button>
  );
};

export default NewWeightButton;
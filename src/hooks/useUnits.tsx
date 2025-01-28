import { useEffect, useState } from 'react';

type Units = 'met' | 'imp';

const useUnits = (): [string, () => void] => {
  const [units, setUnits] = useState<'met' | 'imp'>('met');

  useEffect(() => {
    const storedUnits = localStorage.getItem('units') as Units;
    setUnits(storedUnits || 'met');
  }, []);

  function toggleUnits() {
    const newUnits = units === 'met' ? 'imp' : 'met';

    setUnits(newUnits);
    localStorage.setItem('units', newUnits);
  }

  return [units, toggleUnits];
};

export default useUnits;

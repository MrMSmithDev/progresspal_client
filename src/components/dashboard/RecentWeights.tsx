import WeightLineChart from '@components/analysis/WeightLineChart';
import useUnits from '@hooks/useUnits';
import React, { useMemo } from 'react';
import { Weight } from 'src/customTypes';

interface RecentWeightsProps {
  weightData: Weight[];
}

const RecentWeights: React.FC<RecentWeightsProps> = ({ weightData }) => {
  const [units] = useUnits();

  return (
    <div className="flex flex-col h-full items-center bg-background dark:bg-background-dark p-5 rounded-xl text-gray-700 dark:text-gray-100">
      <h2 className="font-bold mb-2">
        Recent Weight Updates in {units === 'met' ? 'kg' : 'lb'}
      </h2>
      <WeightLineChart weightData={weightData} />
    </div>
  );
};

export default RecentWeights;

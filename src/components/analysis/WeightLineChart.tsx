import React, { useEffect, useState } from 'react';
import { Weight } from 'src/customTypes';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
} from 'recharts';
import useUnits from '@hooks/useUnits';
import findWeekStartDate from '@utils/findWeekStartDate';
import convertUnits from '@utils/convertUnits';
import Loader from '@components/Loader/Loader';

interface WeightLineChartProps {
  weightData: Weight[];
  weeksLength?: number;
}

const WeightLineChart: React.FC<WeightLineChartProps> = ({
  weightData,
  weeksLength = 5,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [parsedData, setParsedData] = useState<
    { week: string; avgWeight: number }[]
  >([]);
  const [units] = useUnits();

  console.log(weightData.length);

  useEffect(() => {
    const now = new Date();

    const pastFiveWeeks = Array.from({ length: weeksLength })
      .map((_, i) => {
        const date = new Date();
        date.setDate(now.getDate() - i * 7);
        return findWeekStartDate(date);
      })
      .reverse();

    // Group data by week
    const weeklyDataMap: Record<string, number[]> = {};
    weightData.forEach((entry) => {
      const weekStart = findWeekStartDate(new Date(entry.date));
      const weight: number =
        entry.unit === units
          ? parseFloat(entry.weight)
          : convertUnits(parseFloat(entry.weight), entry.unit); // Check unit type matches users preference and convert if not
      if (!weeklyDataMap[weekStart]) {
        weeklyDataMap[weekStart] = [];
      }
      weeklyDataMap[weekStart].push(weight);
    });

    // Calculate average per week
    const chartData = pastFiveWeeks.map((week) => {
      const weights = weeklyDataMap[week] || [];
      const avgWeight =
        weights.length > 0
          ? weights.reduce((total, nextWeight) => total + nextWeight, 0) /
            weights.length
          : undefined;
      return { week: week.slice(5), avgWeight };
    });

    console.log(chartData);

    setParsedData(chartData);
    setLoading(false);
  }, [weightData]);

  if (loading) return <Loader />;

  return (
    <ResponsiveContainer minHeight="200px" height="100%" width="100%">
      <LineChart
        data={parsedData}
        margin={{ left: -10, right: 0, top: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="10 10" />
        <XAxis dataKey="week" />
        <YAxis />
        <Line
          type="monotone"
          dataKey="avgWeight"
          stroke="#10d0a3"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default WeightLineChart;

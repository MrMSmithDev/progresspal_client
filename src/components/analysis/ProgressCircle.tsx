import React, { useEffect, useState } from 'react';

interface ProgressCircleProps {
  progress: number;
  size?: number;
  strokeWidth?: number;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  progress = 0,
  size = 160,
  strokeWidth = 20,
}) => {
  const [animatedProgress, setAnimatedProgress] = useState<number>(0);
  const [strokeColor, setStrokeColor] = useState<'low' | 'middle' | 'primary'>(
    'low'
  );

  if (progress > 100) progress = 100;

  const strokeColors = {
    low: 'stroke-[#e64a19]',
    middle: 'stroke-[#f7ec79]',
    primary: 'stroke-[#10d0a3]',
  };

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;

  useEffect(() => {
    if (progress < 40) return setStrokeColor('low');
    if (progress < 80) return setStrokeColor('middle');
    setStrokeColor('primary');
  }, [progress]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);

    return () => clearTimeout(timeout);
  }, [progress]);

  return (
    <svg
      className="m-3"
      height={size}
      width={size}
      viewBox={`0 0 ${size} ${size}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        className={`fill-none stroke-[#ddd]`}
      ></circle>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={
          circumference - (animatedProgress / 100) * circumference
        }
        style={{
          transition: `stroke-dashoffset 200ms ease-in-out`,
        }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className={`fill-none ${strokeColors[strokeColor]}`}
      ></circle>
    </svg>
  );
};

export default ProgressCircle;

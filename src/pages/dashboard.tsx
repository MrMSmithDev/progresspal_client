import RecentWeights from '@components/dashboard/RecentWeights';
import RecentWorkouts from '@components/dashboard/RecentWorkouts';
import TargetProgress from '@components/dashboard/TargetProgress';
import { Header } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
import React, { useEffect, useState } from 'react';
import { type Weight, type Workout } from 'src/customTypes/index';

const DashboardPage: React.FC = () => {
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
  const [recentWeightData, setRecentWeightData] = useState<Weight[]>([]);

  const { token } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    async function updateWorkoutData() {
      const reqOptions: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      };
      const data = await fetchData('/workout', reqOptions);
      if (data.error) {
        openModal('Unable to retrieve Workouts, please try again later');
      } else {
        setRecentWorkouts(data as Workout[]);
      }
    }

    async function updateWeightData() {
      const reqOptions: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        credentials: 'include',
      };
      const data = await fetchData('/weight', reqOptions);
      if (data.error) {
        openModal('Unable to retrieve Weight data, please try again later');
      } else {
        setRecentWeightData(data as Weight[]);
      }
    }

    if (token) {
      void updateWorkoutData();
      void updateWeightData();
    }
  }, [token]);

  // normalize data

  return (
    <>
      <Header />
      <main className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 mt-[58px] mx-auto md:max-w-200 p-10">
        <div>
          <TargetProgress workouts={recentWorkouts} />
        </div>
        <div>
          <RecentWorkouts workouts={recentWorkouts} />
          <RecentWeights weightData={recentWeightData} />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;

// TODO add workout / weight data

// TODO workout streak - weeks hitting three in a row

// TODO five most recent workouts - three for sm vw

// TODO progress towards current monthly target

// TODO Graph showing trend of last five weight updates

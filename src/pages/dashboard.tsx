import { NewWeightButton, NewWorkoutButton } from '@components/buttons';
import { RecentWeights, TargetProgress } from '@components/dashboard';
import { Header } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
import { redirect } from 'next/navigation';
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { type Weight, type Workout } from 'src/customTypes/index';

const DashboardPage: React.FC = () => {
  const [recentWorkouts, setRecentWorkouts] = useState<Workout[]>([]);
  const [recentWeightData, setRecentWeightData] = useState<Weight[]>([]);

  const { token, authLoading } = useAuth();
  const { openModal } = useModal();
  const router = useRouter();

  useEffect(() => {
    if (!token && !authLoading) router.push('/');
  }, [token, authLoading]);

  useEffect(() => {
    if (authLoading || !token) return;

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

    if (token && !authLoading) {
      void updateWorkoutData();
      void updateWeightData();
    }
  }, [token, authLoading]);

  // normalize data

  return (
    <>
      <Header />
      <main className="flex flex-col gap-3 md:gap-6 sm:grid sm:grid-cols-2 md:grid-cols-3 mt-[58px] mx-auto md:max-w-200 p-10">
        <div className="flex flex-col md:flex-row gap-3 md:col-span-3">
          <NewWorkoutButton />
          <NewWeightButton />
        </div>
        <TargetProgress workouts={recentWorkouts} />
        <div className="col-span-2">
          <RecentWeights weightData={recentWeightData} />
        </div>
      </main>
      <div id="modal_root"></div>
    </>
  );
};

export default DashboardPage;

// TODO add workout / weight data

// TODO workout streak - weeks hitting three in a row

// TODO five most recent workouts - three for sm vw

// TODO progress towards current monthly target

// TODO Graph showing trend of last five weight updates

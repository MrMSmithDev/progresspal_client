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

  return (
    <>
      <div className="home-background-img fixed top-0 left-0 right-0 bottom-0"></div>
      <Header />
      <main>MAIN</main>
    </>
  );
};

export default DashboardPage;

// TODO add workout / weight data

// TODO workout streak - weeks hitting three in a row

// TODO five most recent workouts - three for sm vw

// TODO progress towards current monthly target

// TODO Graph showing trend of last five weight updates

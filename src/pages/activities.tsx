import { Activity, Header, Loader } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import { useModal } from '@hooks/useModal';
import { fetchData } from '@utils/api';
import React, { useEffect, useState } from 'react';
import { Workout } from 'src/customTypes';

const Activities: React.FC = () => {
  const [currentActivities, setCurrentActivities] = useState<Workout[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const limit = 20;

  const { token } = useAuth();
  const { openModal } = useModal();

  useEffect(() => {
    async function loadData() {
      const reqOptions = {
        headers: { Authorization: `bearer ${token}` },
      };

      try {
        const data = await fetchData(
          `/workout/?limit=${limit}&skip=${skip}`,
          reqOptions
        );
        setCurrentActivities(data);
      } catch (err) {
        openModal(<span>Error retrieving activities</span>);
      }
    }
    if (token) {
      void loadData();
    }
  }, [token]);

  return (
    <>
      <Header />
      <main className="flex flex-col justify-center md:max-w-200 mt-[58px] p-10 mx-auto">
        <div className="text-gray-700 dark:text-gray-100 text-xl tracking-wide font-bold text-center mb-3">
          <h1>Activities</h1>
        </div>
        <div className="flex flex-col gap-3">
          {currentActivities.map((workout) => (
            <Activity key={workout._id} workout={workout} />
          ))}
          {isLoading ? <Loader /> : null}
        </div>
      </main>
      <div id="modal_root" />
    </>
  );
};

export default Activities;

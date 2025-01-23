import { Header, Footer } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import React from 'react';

const Dashboard: React.FC = () => {
  const { username } = useAuth();

  return <>
    <Header />

    <Footer />
  </>
};

export default Dashboard;

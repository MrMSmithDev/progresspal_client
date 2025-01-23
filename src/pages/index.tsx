import React, { useEffect } from 'react';
import { Header } from '@components/index';
import { useAuth } from '@hooks/useAuth';
import { useRouter } from 'next/router';
import { SignupForm } from '@components/forms';

const IndexPage: React.FC = () => {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (token) router.push('/dashboard');
  }, [token]);

  return (
    <main>
        <SignupForm />
    </main>
  )
};

export default IndexPage;

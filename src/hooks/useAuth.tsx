import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

import { jwtDecode } from 'jwt-decode';
import { fetchData } from '@utils/api';

interface AuthContextType {
  token: string | null;
  username: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  signout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

function isTokenExpired(token: string): boolean {
  if (!token) return true;
  try {
    const { exp }: { exp: number } = jwtDecode(token);
    return Date.now() >= exp * 1000;
  } catch (err) {
    console.log(err);
    return true;
  }
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');

    setToken(storedToken);
    setUsername(storedUsername);

    if (storedToken && isTokenExpired(storedToken)) {
      refreshToken();
    }
  }, []);

  async function refreshToken(): Promise<string | null> {
    try {
      const data = await fetchData(`/user/refresh`, {
        method: 'POST',
        credentials: 'include',
      });

      const newToken = data.token;

      localStorage.setItem('token', newToken);
      setToken(newToken);

      setUsername((data.user?.username as string) || username);
      return newToken;
    } catch (err) {
      console.log(`Error refreshing user token: ${err}`);
      signout();
      return null;
    }
  }

  function signout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{ token, setToken, username, setUsername, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');

  return context;
}

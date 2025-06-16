import { createContext, useContext, useState } from 'react';
import { useLoading } from '../context/LoadingContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const { setLoading } = useLoading();

  const loginUser = async (userData) => {
    setLoading(true);
    await delay(1000);
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    setLoading(false);
  };

  const logoutUser = async() => {
    setLoading(true);
    await delay(1000);
    setUser(null);
    localStorage.removeItem('user');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

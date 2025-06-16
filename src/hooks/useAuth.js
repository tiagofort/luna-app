// src/hooks/useAuth.js
import { useState } from 'react';
import { login } from '../services/auth';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const { user, loginUser, logoutUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginWithEmail = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      await loginUser(data);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loginWithEmail,
    logout: logoutUser,
    loading,
    error,
    user,
    isAuthenticated: !!user,
  };
};

// contexts/LoadingContext.jsx
import React, { createContext, useContext, useState } from 'react';
import Loader from '../components/Loader';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
      {isLoading && <Loader />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

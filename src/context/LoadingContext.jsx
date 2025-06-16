// contexts/LoadingContext.jsx
import React, { createContext, useContext, useState } from 'react';
import LoadingOverlay from '../components/LoadingOverlay';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading: setIsLoading }}>
      {children}
      {isLoading && <LoadingOverlay />}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);

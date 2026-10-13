import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';
import './styles/index.css';
import { CartProvider } from "../src/context/CartContext";
import ScrollToTop from "./components/ScrollToTop";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <AuthProvider>
        <CartProvider>
          <BrowserRouter>
                <ScrollToTop />
                <App />
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </LoadingProvider>
  </React.StrictMode>
);
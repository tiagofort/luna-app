import { Routes, Route, useLocation  } from 'react-router-dom';
import { useEffect, useState } from "react";
import Layout from './components/Layout';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Accessories from '../src/pages/Acessories';
import NotFound from '../src/pages/NotFound';
import ItemDetails from './pages/ItemDetails';
import Loader from './components/Loader';
import Cart from '../src/pages/Cart';

export default function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // tempo do loader (ajustável)

    return () => clearTimeout(timeout);
  }, [location.pathname]);
  return (
    <>
    {loading && <Loader />}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="cart" element={<Cart />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
    </>
  );
}

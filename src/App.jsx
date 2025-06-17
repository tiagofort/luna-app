import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from '../src/pages/Home';
import About from '../src/pages/About';
import Accessories from '../src/pages/Acessories';
import NotFound from '../src/pages/NotFound';
import ItemDetails from './pages/ItemDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="accessories" element={<Accessories />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

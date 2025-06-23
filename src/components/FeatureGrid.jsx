import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWhatsNew } from '../services/api';
import { formatCurrency } from '../services/utils';

const FeatureGrid = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await getWhatsNew();
        setItems(response);
      } catch (error) {
        console.error('Erro ao buscar imagens:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <span className="text-sm font-semibold uppercase text-mainColor tracking-wider">
          What's new?
        </span>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {items.map((item) => (
            <Link
              key={item._id}
              to={`/item/${item._id}`}
              className="bg-white shadow-md rounded-xl p-4 border flex flex-col items-center text-center hover:shadow-lg transition duration-300 hover:scale-105"
            >
              <div className="w-full aspect-[4/5] mb-3">
                <img
                  src={item.midia.url1}
                  alt={item.titulo}
                  className="w-full h-full object-cover rounded-md"
                />
              </div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-800 leading-tight">
                {item.titulo}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{item.pedra}</p>
              <p className="mt-1 text-sm font-semibold text-mainColor">
                {formatCurrency(item.preco)}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

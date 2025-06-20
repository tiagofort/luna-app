import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getWhatsNew } from '../services/api'
import { formatCurrency } from '../services/utils'

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
        }
      };
      fetchItems();
  }, []);

  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto">
        <span className="text-md font-semibold uppercase text-mainColor tracking-wider">
          What's new?
        </span>
        <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <Link
              key={item._id}
              to={`/item/${item._id}`}
              className="bg-white shadow-md rounded-2xl p-5 hover:shadow-lg transition duration-300 border flex flex-col items-center text-center hover:scale-105"
            >
              <img
                src={item.midia.url1}
                alt={item.titulo}
                className="w-[250px] h-[270px] object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{item.titulo}</h3>
              <p className="mt-1 text-sm text-gray-500">{item.pedra}</p>
              <p className="mt-1 text-sm font-semibold text-mainColor">{formatCurrency(item.preco)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;

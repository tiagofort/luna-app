import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../services/utils';
import { getItemById } from '../services/api';
import { useCart } from "../context/CartContext";
import WarningDialog from '../components/WarningDialog';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

const handleAddToCart = (item, quantity) => {
  addToCart({
    _id: item._id,
    name: item.titulo,
    price: parseFloat(item.preco),
    quantity,
  });
  setIsDialogOpen(true);
  setTimeout(() => setIsDialogOpen(false), 2500);

};

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await getItemById(id);
        setItem(response);
        setMainImage(response.midia?.url1); // ✅ usa response direto
      } catch (error) {
        console.error('Erro ao buscar imagens:', error.message);
      }
    };
    fetchItem();
  }, [id]); 

  if (!item) return <p className="text-center py-20">Loading...</p>;

  const imageList = [
    item.midia?.url1,
    item.midia?.url2,
    item.midia?.url3,
    item.midia?.url4,
  ].filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col items-center">
          <div className="w-full h-[500px] border rounded-lg overflow-hidden shadow-sm mb-4">
            <img
              src={mainImage}
              alt={item.titulo}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex space-x-3 overflow-x-auto">
            {imageList.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                onClick={() => setMainImage(img)}
                className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition ${
                  mainImage === img ? 'border-mainColor' : 'border-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

  
        <div className="flex flex-col space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-900">{item.titulo}</h2>
            {item.estoque && (
              <p className="text-sm text-gray-500 mt-1">({item.estoque} units left)</p>
            )}
            <p className="text-xl text-mainColor font-semibold mt-4">
              {formatCurrency(parseFloat(item.preco))}
            </p>

            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center border rounded px-2">
                <button
                  className="text-lg px-2 text-gray-600 hover:text-mainColor"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  −
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  className="text-lg px-2 text-gray-600 hover:text-mainColor"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>
              <button
                className="bg-mainColor text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
                onClick={() => handleAddToCart(item, quantity)}
              >
                Add to Cart
              </button>
            </div>

            <div className="mt-6 text-sm text-gray-700 space-y-2">
              {item.cod_prod && <p><strong>Product Code:</strong> {item.cod_prod}</p>}
              {item.tipo && <p><strong>Type:</strong> {item.tipo}</p>}
              {item.material && <p><strong>Material:</strong> {item.material}</p>}
              {item.pedra && <p><strong>Stone:</strong> {item.pedra}</p>}
              <p><strong>Weight:</strong> {item.peso || 'Not Informed'}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <p className="font-medium">Reviews (1)</p>
            <div className="flex items-center gap-1 text-blue-500">
              {[...Array(5)].map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        </div>

        {isDialogOpen && ( 
          <WarningDialog 
            title="Item added!"
            message={`${quantity}x ${item.titulo} was added successfully!`}
            onClose={() => setIsDialogOpen(false)}
          />
        )}
    </div>
  );
};

export default ItemDetails;

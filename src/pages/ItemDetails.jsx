import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatCurrency } from '../services/utils';
import { getItemById, getInventory } from '../services/api';
import { useCart } from "../context/CartContext";
import WarningDialog from '../components/WarningDialog';

const ItemDetails = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [stockError, setStockError] = useState('');

  const handleAddToCart = (item, quantity) => {
    if (quantity > inventory) {
      setStockError('You are trying to add more than we currently have in stock.');
      return;
    }

    setStockError('');
    addToCart({
      _id: item._id,
      name: item.titulo,
      price: parseFloat(item.desconto && item.desconto > 0
        ? (parseFloat(item.preco) * (1 - item.desconto / 100))
        : item.preco
      ),
      quantity,
    });

    setIsDialogOpen(true);
    setTimeout(() => setIsDialogOpen(false), 2500);
  };

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const [itemdetails, inventory] = await Promise.all([
          getItemById(id),
          getInventory(id),
        ]);
        setItem(itemdetails);
        setMainImage(itemdetails.midia?.url1);
        setInventory(inventory.estoque_atual);
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

  const calculateDiscountedPrice = () => {
    const price = parseFloat(item.preco);
    const discount = parseFloat(item.desconto || 0);

    if (discount > 0) {
      const discountedPrice = price * (1 - discount / 100);
      return formatCurrency(discountedPrice);
    }
    return formatCurrency(price);
  };


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

          {inventory !== null && (
            <p className="text-sm font-semibold text-gray-500 mt-1">({inventory} in stock)</p>
          )}

          <p className="text-xl font-semibold mt-4">
            {item.desconto > 0 ? (
              <>
                <span className="text-gray-500 line-through mr-2">
                  {formatCurrency(parseFloat(item.preco))}
                </span>
                <span className="text-mainColor">
                  {calculateDiscountedPrice()}
                </span>
              </>
            ) : (
              <span className="text-mainColor">
                {formatCurrency(parseFloat(item.preco))}
              </span>
            )}
          </p>

          {item.desconto > 0 && (
            <p className="text-sm text-green-600 font-semibold">
              Discount: {item.desconto}%
            </p>
          )}

          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded px-2">
                <button
                  className="text-lg px-2 text-gray-600 hover:text-mainColor"
                  onClick={() => {
                    setStockError('');
                    setQuantity(prev => Math.max(1, prev - 1));
                  }}
                >
                  −
                </button>
                <span className="px-3">{quantity}</span>
                <button
                  className="text-lg px-2 text-gray-600 hover:text-mainColor"
                  onClick={() => {
                    if (quantity < inventory) {
                      setQuantity(prev => prev + 1);
                      setStockError('');
                    } else {
                      setStockError('You have reached the available stock limit.');
                    }
                  }}
                >
                  +
                </button>
              </div>

              <button
                className="bg-mainColor text-white px-6 py-2 rounded hover:bg-opacity-90 transition"
                onClick={() => handleAddToCart(item, quantity)}
              >
                Add to cart
              </button>
            </div>

            {stockError && (
              <p className="text-sm text-red-500">{stockError}</p>
            )}
          </div>

          <div className="mt-6 text-sm text-gray-700 space-y-2">
            {item.cod_prod && <p><strong>Product Code:</strong> {item.cod_prod}</p>}
            {item.tipo && <p><strong>Type:</strong> {item.tipo}</p>}
            {item.material && <p><strong>Material:</strong> {item.material}</p>}
            {item.pedra && <p><strong>Stone:</strong> {item.pedra}</p>}
            <p><strong>Weight:</strong> {item.peso || 'Não informado'}</p>
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
          message={`${quantity}x ${item.titulo} was add to your cart`}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ItemDetails;

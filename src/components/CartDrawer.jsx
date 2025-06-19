import { useCart } from "../context/CartContext";
import { formatCurrency } from "../services/utils";
import { Link } from 'react-router-dom';
import { Trash2 } from "lucide-react"; // ícone moderno

const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      } rounded-l-xl overflow-hidden`}
    >
      <div className="flex justify-between items-center px-5 py-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">🛒 Seu Carrinho</h2>
        <button onClick={onClose} className="text-gray-500 text-xl hover:text-black transition">✕</button>
      </div>

      <div className="p-5 overflow-y-auto h-[calc(100%-170px)] space-y-4">
        {cart.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Seu carrinho está vazio.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-md p-4 shadow-sm hover:shadow-md transition">
              <Link
                to={`/item/${item._id}`}
                onClick={onClose}
                className="block"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatCurrency(Number(item?.price) || 0)} × {item.quantity}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // previne navegação
                      removeFromCart(index);
                    }}
                    className="text-red-500 hover:text-red-700 transition"
                    title="Remover item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      <div className="px-5 py-4 border-t bg-white">
        <p className="font-semibold text-gray-700 mb-3">
          Total: <span className="text-mainColor">{formatCurrency(total)}</span>
        </p>

        <Link to="/cart">
          <button className="w-full mb-2 bg-mainColor text-white py-2 rounded-md font-medium hover:bg-mainColor/90 transition">
            Ver Carrinho
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CartDrawer;

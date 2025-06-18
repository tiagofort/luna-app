
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../services/utils";
import { Link } from 'react-router-dom'
 

const CartDrawer = ({ open, onClose }) => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + price * quantity;
  }, 0);


  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Seu Carrinho</h2>
        <button onClick={onClose} className="text-gray-500">✕</button>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-160px)]">
        {cart.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="mb-4">
                <div className="flex justify-between">
                <span>{item.name}</span>
                <span>
                    {formatCurrency(Number(item?.price) || 0)} x {item.quantity}
                </span>
                </div>
                <button
                onClick={() => removeFromCart(index)}
                className="text-red-500 text-sm"
                >
                Remover
                </button>
            </div>
            ))
        )}
      </div>

      <div className="p-4 border-t">
        <p className="font-semibold mb-2">
          Total: {formatCurrency(total)}
        </p>
        <Link to="/cart">
            <button className="w-full mb-2 bg-[#b86935] text-white py-2 rounded">
                Go to Cart
            </button>
        </Link>
        <button className="w-full border border-[#b86935] text-[#b86935] py-2 rounded hover:bg-[#b86935]/10">
          Submit Request
        </button>
      </div>
    </div>
  );
};

export default CartDrawer;

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../services/utils"; // Sua função de formatação

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Seu Carrinho</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Produto</th>
                  <th className="p-3 text-left">Preço</th>
                  <th className="p-3 text-left">Quantidade</th>
                  <th className="p-3 text-left">Subtotal</th>
                  <th className="p-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr
                    key={`${item._id}-${index}`}
                    className="border-t border-gray-200"
                  >
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">
                      {formatCurrency(item.price)}
                    </td>
                    <td className="p-3">{item.quantity}</td>
                    <td className="p-3">
                      {formatCurrency(item.price * item.quantity)}
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:underline"
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex flex-col md:flex-row md:justify-between items-center">
            <button
              onClick={clearCart}
              className="mb-4 md:mb-0 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            >
              Limpar Carrinho
            </button>

            <div className="text-right">
              <p className="text-xl font-semibold">
                Total: {formatCurrency(total)}
              </p>
              <button
                onClick={() => alert("Pedido enviado!")}
                className="mt-2 w-full md:w-auto bg-[#b86935] text-white px-6 py-3 rounded hover:bg-[#9c5929]"
              >
                Submit Request
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

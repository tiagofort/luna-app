import { useState } from "react";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../services/utils";
import { useAuthContext } from "../context/AuthContext";
import { createRequest } from "../services/api";
import CenterWarningDialog from "../components/CenterWarningDialog";

const Cart = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogButton, setDialogButton] = useState("");
  const { user } = useAuthContext();
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const showDialog = (title, message, button) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogButton(button);
    setDialogVisible(true);
  };

  const handleRequest = async () =>{
    const items = cart.map(item => ({
      item: item._id,
      quantidade: item.quantity
    }));
    const requestData = {
      email_cliente: user.email,
      itens: items
    }
    try{
      await createRequest(requestData);
      showDialog("Request Sent!", "Your Request was sent. Our team will contact you from here! Thank you!", "Got it!");
      clearCart();
    }catch(error){
      console.log("Error to save: " + error);
      showDialog("Problem", "Something went wrong. Try again or contact our support team", "Got it!");
    } 
  }

return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-lg">Your cart is empty</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-md">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Item</th>
                  <th className="p-3 text-left">Price</th>
                  <th className="p-3 text-left">Quantity</th>
                  <th className="p-3 text-left">total</th>
                  <th className="p-3 text-left">Action</th>
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
              Clean Cart
            </button>

            <div className="text-right">
              <p className="text-xl font-semibold">
                Total: {formatCurrency(total)}
              </p>
              <button
                onClick={handleRequest}
                className="mt-2 w-full md:w-auto bg-[#b86935] text-white px-6 py-3 rounded hover:bg-[#9c5929]"
              >
                Submit Request
              </button>
            </div>
          </div>
        </>
      )}

      {dialogVisible && (
        <CenterWarningDialog
          title={dialogTitle}
          message={dialogMessage}
          onClose={() => {
            setDialogVisible(false);
              if (dialogTitle === "Success") navigate('/');
            }}
            buttonMessage={dialogButton}
        />
      )}
    </div>
  );
};

export default Cart;


import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  PackageCheck,
  LockKeyhole,
  Gem,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../services/utils";
import { useAuthContext } from "../context/AuthContext";
import { createRequest } from "../services/api";
import CenterWarningDialog from "../components/CenterWarningDialog";
import ConfirmDialog from "../components/ConfirmDialog";

const Cart = () => {
  const { user } = useAuthContext();
  const { cart, removeFromCart, clearCart } = useCart();

  const [dialogVisible, setDialogVisible] = useState(false);
  const [confirmDialogVisible, setConfirmDialogVisible] =
    useState(false);

  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogButton, setDialogButton] = useState("");
  const [loading, setLoading] = useState(false);

  const total = cart.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;

    return sum + price * quantity;
  }, 0);

  const totalItems = cart.reduce(
    (sum, item) => sum + (Number(item?.quantity) || 0),
    0
  );

  const showDialog = (title, message, button = "Got it!") => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogButton(button);
    setDialogVisible(true);
  };

  const handleSubmit = () => {
    if (!cart.length || loading) return;

    if (!user) {
      showDialog(
        "Login is required",
        "Please log in or create an account before submitting your request. You can use the account icon at the top of the page."
      );
      return;
    }

    setConfirmDialogVisible(true);
  };

  const confirmRequest = async () => {
    setConfirmDialogVisible(false);
    await handleRequest();
  };

  const handleRequest = async () => {
    if (loading || !cart.length) return;

    if (!user) {
      showDialog(
        "Login is required",
        "Please log in or create an account before submitting your request."
      );
      return;
    }

    const items = cart.map((item) => ({
      item: item._id,
      quantidade: Number(item.quantity) || 1,
    }));

    const requestData = {
      email_cliente: user.email,
      itens: items,
    };

    setLoading(true);

    try {
      await createRequest(requestData);

      clearCart();

      showDialog(
        "Request sent!",
        "Your request has been submitted successfully. Our team will contact you soon. Thank you for choosing Luna!",
        "Continue"
      );
    } catch (error) {
      console.error("Error submitting request:", error);

      showDialog(
        "Something went wrong",
        "We couldn't submit your request. Please try again or contact our support team.",
        "Try again"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#263b32]">

      {/* Page heading */}
      <section className="px-6 pb-12 pt-16 text-center sm:pt-20">
        <div className="mb-5 flex items-center justify-center gap-3">
          <span className="h-px w-9 bg-[#d8cbb7]" />

          <Sparkles
            size={17}
            strokeWidth={1.3}
            className="text-[#a28c6c]"
          />

          <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#9c8060]">
            Your Luna selection
          </span>

          <span className="h-px w-9 bg-[#d8cbb7]" />
        </div>

        <h1 className="font-serif text-5xl tracking-tight sm:text-6xl">
          Your <em className="text-[#a28c6c]">cart.</em>
        </h1>

        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#77776d]">
          A collection of beautiful pieces, chosen just for you.
        </p>
      </section>

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">

        {cart.length === 0 ? (
          /* Empty cart */
          <div className="mx-auto max-w-xl rounded-[2rem] border border-[#e7e0d5] bg-white px-8 py-16 text-center shadow-sm sm:py-20">
            <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#f0ebe2]">
              <ShoppingBag
                size={39}
                strokeWidth={1.2}
                className="text-[#a28c6c]"
              />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl">
              Your cart is empty
            </h2>

            <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#77776d]">
              Your next favourite piece might be waiting for you.
              Explore our collection and find something special.
            </p>

            <Link
              to="/"
              className="mt-9 inline-flex items-center justify-center gap-3 rounded-full bg-[#263b32] px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#3d5548]"
            >
              Explore collection
              <ArrowRight size={17} />
            </Link>
          </div>
        ) : (
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">

            {/* Cart products */}
            <div className="overflow-hidden rounded-[1.75rem] border border-[#e7e0d5] bg-white">

              <div className="flex items-center justify-between border-b border-[#eee8dd] px-6 py-6 sm:px-8">
                <div>
                  <h2 className="font-serif text-2xl">
                    Shopping bag
                  </h2>

                  <p className="mt-1 text-xs text-[#8b897f]">
                    {totalItems} {totalItems === 1 ? "item" : "items"} in your bag
                  </p>
                </div>

                <ShoppingBag
                  size={23}
                  strokeWidth={1.4}
                  className="text-[#a28c6c]"
                />
              </div>

              <div className="divide-y divide-[#eee8dd]">
                {cart.map((item, index) => {
                  const image =
                    item?.image ||
                    item?.imageUrl ||
                    item?.midia?.url1;

                  const price = Number(item?.price) || 0;
                  const quantity = Number(item?.quantity) || 0;

                  return (
                    <div
                      key={`${item._id}-${index}`}
                      className="flex gap-4 px-5 py-6 sm:gap-6 sm:px-8"
                    >
                      {/* Product image */}
                      <Link
                        to={`/item/${item._id}`}
                        className="flex h-28 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#f4f0e9] sm:h-36 sm:w-32"
                      >
                        {image ? (
                          <img
                            src={image}
                            alt={item.name || "Product"}
                            className="h-full w-full object-contain p-2 transition duration-500 hover:scale-105"
                          />
                        ) : (
                          <Gem
                            size={32}
                            strokeWidth={1.2}
                            className="text-[#b49b76]"
                          />
                        )}
                      </Link>

                      {/* Product details */}
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div>
                          <Link
                            to={`/item/${item._id}`}
                            className="font-serif text-lg leading-snug transition hover:text-[#9c8060] sm:text-xl"
                          >
                            {item.name}
                          </Link>

                          {item.pedra && (
                            <p className="mt-2 text-xs text-[#8b897f]">
                              Stone: {item.pedra}
                            </p>
                          )}

                          <p className="mt-3 text-sm text-[#77776d]">
                            {formatCurrency(price)} each
                          </p>
                        </div>

                        <div className="mt-5 flex flex-wrap items-end justify-between gap-3">
                          <div className="rounded-full border border-[#e1d9cb] bg-[#faf8f4] px-4 py-2 text-xs font-medium">
                            Qty: {quantity}
                          </div>

                          <div className="text-right">
                            <p className="font-semibold">
                              {formatCurrency(price * quantity)}
                            </p>

                            <button
                              type="button"
                              onClick={() => removeFromCart(index)}
                              disabled={loading}
                              className="mt-2 inline-flex items-center gap-1.5 text-xs text-[#a17b6b] transition hover:text-red-600 disabled:opacity-50"
                            >
                              <Trash2 size={14} />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Cart footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#eee8dd] bg-[#fdfcf9] px-6 py-5 sm:px-8">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] transition hover:text-[#9c8060]"
                >
                  <ArrowLeft size={16} />
                  Continue shopping
                </Link>

                <button
                  type="button"
                  onClick={clearCart}
                  disabled={loading}
                  className="inline-flex items-center gap-2 text-xs text-[#a17b6b] transition hover:text-red-600 disabled:opacity-50"
                >
                  <Trash2 size={15} />
                  Clear cart
                </button>
              </div>
            </div>

            {/* Order summary */}
            <aside className="rounded-[1.75rem] border border-[#e7e0d5] bg-white p-7 shadow-[0_12px_35px_rgba(38,59,50,0.04)] sm:p-8">
              <div className="mb-7 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ebe2]">
                  <PackageCheck
                    size={21}
                    strokeWidth={1.4}
                    className="text-[#8b7659]"
                  />
                </div>

                <h2 className="font-serif text-2xl">
                  Order summary
                </h2>
              </div>

              <div className="space-y-5">
                <div className="flex justify-between text-sm text-[#77776d]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-[#263b32]">
                    {formatCurrency(total)}
                  </span>
                </div>

                <div className="border-t border-[#eee8dd] pt-5">
                  <div className="flex items-end justify-between gap-3">
                    <span className="font-serif text-xl">
                      Estimated total
                    </span>

                    <span className="font-serif text-3xl">
                      {formatCurrency(total)}
                    </span>
                  </div>

                  <p className="mt-3 text-xs leading-5 text-[#8b897f]">
                    Product subtotal only. Any applicable delivery
                    charges will be confirmed by our team.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="mt-8 flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#3d5548] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  "Submitting request..."
                ) : (
                  <>
                    Submit request
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {!user && (
                <p className="mt-4 flex items-start gap-2 text-xs leading-5 text-[#8b897f]">
                  <LockKeyhole
                    size={15}
                    className="mt-0.5 flex-shrink-0"
                  />
                  Please sign in before submitting your request.
                </p>
              )}

              <div className="mt-8 border-t border-[#eee8dd] pt-6">
                <div className="flex items-start gap-3">
                  <ShieldCheck
                    size={20}
                    strokeWidth={1.4}
                    className="mt-0.5 flex-shrink-0 text-[#8b7659]"
                  />

                  <div>
                    <p className="text-sm font-medium">
                      A personal shopping experience
                    </p>

                    <p className="mt-2 text-xs leading-6 text-[#8b897f]">
                      After submitting your request, our team
                      will contact you to discuss the next steps.
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>

      {/* Feedback dialog */}
      {dialogVisible && (
        <CenterWarningDialog
          title={dialogTitle}
          message={dialogMessage}
          buttonMessage={dialogButton}
          onClose={() => setDialogVisible(false)}
        />
      )}

      {/* Request confirmation */}
      {confirmDialogVisible && (
        <ConfirmDialog
          title="Submit your request?"
          message="Our team will receive your selected items and contact you about the next steps."
          onConfirm={confirmRequest}
          onCancel={() => setConfirmDialogVisible(false)}
        />
      )}
    </div>
  );
};

export default Cart;

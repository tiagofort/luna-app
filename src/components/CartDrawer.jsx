
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../services/utils";

export default function CartDrawer({ open, onClose }) {
  const { cart, removeFromCart } = useCart();
console.log("CART ITEMS:", cart);
  const totalItems = cart.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0),
    0
  );

  const total = cart.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Number(item?.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[90] bg-[#151c17]/50 backdrop-blur-[3px] transition-opacity duration-300 ${
          open
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal={open}
        aria-label="Shopping cart"
        aria-hidden={!open}
        inert={!open}
        className={`fixed inset-y-0 right-0 z-[100] flex h-full w-full max-w-[440px] flex-col bg-[#faf8f4] shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-[#e7e0d5] px-6 pb-6 pt-7 sm:px-8">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#a28c6c]">
              Your selection
            </span>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close cart"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e7e0d5] text-[#263b32] transition hover:bg-[#eee8dd]"
            >
              <X size={19} strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-end justify-between gap-3">
            <h2 className="font-serif text-4xl tracking-tight text-[#263b32]">
              Your bag<span className="text-[#b49b76]">.</span>
            </h2>

            <span className="mb-1 text-xs text-[#827e71]">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>
        </div>

        {/* Cart content */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 sm:px-8">
          {cart.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center pb-16 text-center">
              <div className="mb-7 flex h-24 w-24 items-center justify-center rounded-full bg-[#eee8dd]">
                <ShoppingBag
                  size={36}
                  strokeWidth={1.2}
                  className="text-[#8b7659]"
                />
              </div>

              <h3 className="font-serif text-3xl text-[#263b32]">
                Your bag is empty
              </h3>

              <p className="mt-4 max-w-[260px] text-sm leading-7 text-[#827e71]">
                Something beautiful is waiting to be discovered.
              </p>

              <Link
                to="/accessories/all"
                onClick={onClose}
                className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#263b32] px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#3d5548]"
              >
                Explore collection
                <ArrowUpRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {cart.map((item, index) => {
                const price = Number(item?.price) || 0;
                const quantity = Number(item?.quantity) || 0;
                const image =
                  item?.midia?.url1 ||
                  item?.image ||
                  item?.imageUrl;

                return (
                  <div
                    key={`${item._id || "item"}-${index}`}
                    className="flex gap-4 border-b border-[#e7e0d5] pb-5"
                  >
                    <Link
                      to={`/item/${item._id}`}
                      onClick={onClose}
                      className="h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-[#eee8dd] sm:h-32 sm:w-28"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={item.name || "Product"}
                          className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center">
                          <ShoppingBag
                            size={25}
                            className="text-[#b49b76]"
                          />
                        </div>
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/item/${item._id}`}
                            onClick={onClose}
                            className="font-serif text-lg leading-snug text-[#263b32] transition hover:text-[#a28c6c]"
                          >
                            {item.name}
                          </Link>

                          <button
                            type="button"
                            onClick={() => removeFromCart(index)}
                            aria-label={`Remove ${item.name || "item"}`}
                            title="Remove item"
                            className="shrink-0 rounded-full p-2 text-[#9b9186] transition hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={17} strokeWidth={1.6} />
                          </button>
                        </div>

                        {item.pedra && (
                          <p className="mt-1 text-xs text-[#827e71]">
                            {item.pedra}
                          </p>
                        )}
                      </div>

                      <div className="flex items-end justify-between gap-2">
                        <span className="rounded-full border border-[#e7e0d5] px-3 py-1.5 text-xs text-[#68685f]">
                          Qty: {quantity}
                        </span>

                        <div className="text-right">
                          <p className="text-xs text-[#9b9186]">
                            {formatCurrency(price)} each
                          </p>
                          <p className="mt-1 text-sm font-semibold text-[#263b32]">
                            {formatCurrency(price * quantity)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Bottom summary */}
        {cart.length > 0 && (
          <div className="shrink-0 border-t border-[#e7e0d5] bg-[#faf8f4] px-6 pb-7 pt-6 sm:px-8">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-[#68685f]">
                Subtotal
              </span>

              <span className="font-serif text-2xl text-[#263b32]">
                {formatCurrency(total)}
              </span>
            </div>

            <p className="mb-6 text-xs leading-5 text-[#827e71]">
              Shipping and any applicable taxes are calculated at checkout.
            </p>

            <Link
              to="/cart"
              onClick={onClose}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#3d5548]"
            >
              View your bag
              <ArrowRight size={18} />
            </Link>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#68685f] underline underline-offset-4 transition hover:text-[#263b32]"
            >
              Continue shopping
            </button>

            <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#827e71]">
              <ShieldCheck size={15} />
              Shop with confidence
            </div>
          </div>
        )}
      </aside>
    </>
  );
}


import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Gem,
  Heart,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  AlertCircle,
  Loader2,
  Package,
} from "lucide-react";

import { formatCurrency } from "../services/utils";
import { getItemById, getInventory } from "../services/api";
import { useCart } from "../context/CartContext";
import WarningDialog from "../components/WarningDialog";

const ItemDetails = () => {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [inventory, setInventory] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [stockError, setStockError] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const { addToCart } = useCart();
  const dialogTimerRef = useRef(null);

  useEffect(() => {
    let active = true;

    const fetchItem = async () => {
      setLoading(true);
      setFetchError("");
      setItem(null);
      setInventory(null);
      setQuantity(1);
      setStockError("");
      setMainImage("");

      try {
        const [itemDetails, inventoryData] = await Promise.all([
          getItemById(id),
          getInventory(id),
        ]);

        if (!active) return;

        setItem(itemDetails);
        setMainImage(itemDetails?.midia?.url1 || "");

        const stock = Number(inventoryData?.estoque_atual);
        setInventory(
          Number.isFinite(stock) ? Math.max(0, stock) : 0
        );
      } catch (error) {
        if (!active) return;

        console.error("Error fetching item:", error);

        setFetchError(
          "We couldn't load this piece. Please try again."
        );
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchItem();

    return () => {
      active = false;
    };
  }, [id]);

  useEffect(() => {
    return () => {
      if (dialogTimerRef.current) {
        clearTimeout(dialogTimerRef.current);
      }
    };
  }, []);

  const handleAddToCart = () => {
    if (!item || inventory === null) return;

    if (inventory <= 0) {
      setStockError("This piece is currently out of stock.");
      return;
    }

    if (quantity > inventory) {
      setStockError(
        "You are trying to add more than we currently have in stock."
      );
      return;
    }

    setStockError("");

    const price = Number.parseFloat(item.preco) || 0;
    const rawDiscount = Number.parseFloat(item.desconto) || 0;
    const discount = Math.min(100, Math.max(0, rawDiscount));

    const finalPrice = price * (1 - discount / 100);

    addToCart({
      _id: item._id,
      name: item.titulo,
      price: finalPrice,
      quantity,
      image: item.midia?.url1 || null,
      pedra: item.pedra || null,
    });

    setIsDialogOpen(true);

    if (dialogTimerRef.current) {
      clearTimeout(dialogTimerRef.current);
    }

    dialogTimerRef.current = setTimeout(() => {
      setIsDialogOpen(false);
    }, 2500);
  };

  const decreaseQuantity = () => {
    setStockError("");
    setQuantity((previous) => Math.max(1, previous - 1));
  };

  const increaseQuantity = () => {
    if (inventory === null) return;

    if (quantity >= inventory) {
      setStockError("You have reached the available stock limit.");
      return;
    }

    setStockError("");
    setQuantity((previous) => previous + 1);
  };

  if (loading) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#faf8f4] px-6 text-center">
        <Loader2
          size={32}
          className="animate-spin text-[#a28c6c]"
          strokeWidth={1.5}
        />
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.2em] text-[#8b7659]">
          Discovering your piece...
        </p>
      </div>
    );
  }

  if (fetchError || !item) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#faf8f4] px-6 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0ebe2]">
          <Gem size={29} className="text-[#a28c6c]" />
        </div>

        <h2 className="font-serif text-3xl text-[#263b32]">
          This piece couldn't be found.
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-[#77776d]">
          {fetchError || "This item may no longer be available."}
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#263b32] px-7 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#3d5548]"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
      </div>
    );
  }

  const imageList = [
    item.midia?.url1,
    item.midia?.url2,
    item.midia?.url3,
    item.midia?.url4,
  ].filter(Boolean);

  const originalPrice = Number.parseFloat(item.preco) || 0;
  const rawDiscount = Number.parseFloat(item.desconto) || 0;
  const discount = Math.min(100, Math.max(0, rawDiscount));
  const finalPrice = originalPrice * (1 - discount / 100);

  const inStock = inventory !== null && inventory > 0;

  const specifications = [
    { label: "Product code", value: item.cod_prod },
    { label: "Type", value: item.tipo },
    { label: "Material", value: item.material },
    { label: "Stone", value: item.pedra },
    { label: "Weight", value: item.peso },
  ].filter(
    (detail) =>
      detail.value !== null &&
      detail.value !== undefined &&
      detail.value !== ""
  );

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#263b32]">
      {/* Breadcrumb */}
      <div className="border-b border-[#e9e1d5]">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs text-[#8b897f]"
          >
            <Link
              to="/"
              className="transition hover:text-[#263b32]"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="font-medium text-[#263b32]">
              {item.titulo}
            </span>
          </nav>
        </div>
      </div>

      {/* Main product */}
      <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8 lg:px-12 lg:pb-28 lg:pt-16">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-24">
          {/* Gallery */}
          <div className="lg:sticky lg:top-28">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#e9e1d5] bg-[#f0ebe2]">
              {discount > 0 && (
                <div className="absolute left-5 top-5 z-10 rounded-full bg-[#263b32] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                  {discount}% off
                </div>
              )}

              <div className="flex aspect-[4/5] items-center justify-center overflow-hidden">
                {mainImage ? (
                  <img
                    src={mainImage}
                    alt={item.titulo}
                    className="h-full w-full object-contain transition-transform duration-700 hover:scale-[1.06]"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-4 text-[#a28c6c]">
                    <Gem size={56} strokeWidth={1} />
                    <span className="text-xs uppercase tracking-[0.18em]">
                      Image unavailable
                    </span>
                  </div>
                )}
              </div>

              <div className="pointer-events-none absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/70 bg-[#faf8f4]/90 px-4 py-2 backdrop-blur-sm">
                <Sparkles
                  size={14}
                  className="text-[#a28c6c]"
                />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#263b32]">
                  Luna Crystals
                </span>
              </div>
            </div>

            {/* Thumbnails */}
            {imageList.length > 1 && (
              <div className="mt-5 grid grid-cols-4 gap-3 sm:gap-4">
                {imageList.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setMainImage(image)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={mainImage === image}
                    className={`aspect-square overflow-hidden rounded-2xl border-2 bg-[#f0ebe2] transition-all duration-300 ${
                      mainImage === image
                        ? "border-[#a28c6c] shadow-md"
                        : "border-transparent hover:border-[#d6bd91]"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${item.titulo} - view ${index + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </button>
                ))}
              </div>
            )}

            <p className="mt-5 text-center text-[10px] uppercase tracking-[0.17em] text-[#9b9487]">
              Thoughtfully selected, naturally beautiful
            </p>
          </div>

          {/* Product information */}
          <div className="flex flex-col">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-[#a28c6c]" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28c6c]">
                The Luna Collection
              </span>
            </div>

            <h1 className="font-serif text-4xl leading-[1.12] tracking-tight text-[#263b32] sm:text-5xl xl:text-[3.6rem]">
              {item.titulo}
            </h1>

            {item.pedra && (
              <p className="mt-4 flex items-center gap-2 text-sm text-[#8b897f]">
                <Gem size={16} className="text-[#a28c6c]" />
                {item.pedra}
              </p>
            )}

            {/* Price */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="font-serif text-3xl text-[#263b32] sm:text-4xl">
                {formatCurrency(finalPrice)}
              </span>

              {discount > 0 && (
                <>
                  <span className="text-lg text-[#a29b90] line-through">
                    {formatCurrency(originalPrice)}
                  </span>

                  <span className="rounded-full border border-[#d9c9ad] bg-[#f0ebe2] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8b7659]">
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Availability */}
            <div className="mt-7 flex items-center gap-3 border-y border-[#e7e0d5] py-5">
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  inStock ? "bg-[#6b8c72]" : "bg-[#c48a78]"
                }`}
              />

              <span className="text-xs font-medium uppercase tracking-[0.12em] text-[#263b32]">
                {inventory === null
                  ? "Availability unavailable"
                  : inStock
                    ? "In stock"
                    : "Out of stock"}
              </span>

              {inStock && (
                <span className="ml-auto text-xs text-[#8b897f]">
                  {inventory} available
                </span>
              )}
            </div>

            {/* Intro */}
            <p className="mt-7 text-sm leading-8 text-[#77776d]">
              Discover the natural beauty of this piece from
              our Luna collection. A thoughtful addition
              to your jewelry selection, inspired by the
              unique character of natural stones.
            </p>

            {/* Quantity */}
            <div className="mt-9">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#263b32]">
                Quantity
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex h-14 items-center overflow-hidden rounded-full border border-[#dcd2c3] bg-white">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={!inStock || quantity <= 1}
                    aria-label="Decrease quantity"
                    className="flex h-full w-12 items-center justify-center text-[#263b32] transition hover:bg-[#f0ebe2] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Minus size={17} />
                  </button>

                  <span className="min-w-10 text-center text-sm font-semibold tabular-nums">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={!inStock}
                    aria-label="Increase quantity"
                    className="flex h-full w-12 items-center justify-center text-[#263b32] transition hover:bg-[#f0ebe2] disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <Plus size={17} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="group flex h-14 min-w-[190px] flex-1 items-center justify-center gap-3 rounded-full bg-[#263b32] px-7 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#3d5548] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ShoppingBag size={18} strokeWidth={1.6} />
                  {inStock ? "Add to cart" : "Sold out"}
                  {inStock && (
                    <ArrowRight
                      size={17}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </div>

              {stockError && (
                <div
                  role="alert"
                  className="mt-4 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
                >
                  <AlertCircle
                    size={17}
                    className="mt-0.5 shrink-0 text-red-500"
                  />
                  <p className="text-xs leading-5 text-red-700">
                    {stockError}
                  </p>
                </div>
              )}
            </div>

            {/* Trust details */}
            <div className="mt-9 grid grid-cols-1 gap-4 border-t border-[#e7e0d5] pt-8 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0ebe2]">
                  <Gem
                    size={19}
                    strokeWidth={1.4}
                    className="text-[#8b7659]"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#263b32]">
                    Natural beauty
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8b897f]">
                    Inspired by nature's unique details
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f0ebe2]">
                  <ShieldCheck
                    size={19}
                    strokeWidth={1.4}
                    className="text-[#8b7659]"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#263b32]">
                    Selected with care
                  </p>
                  <p className="mt-1 text-xs leading-5 text-[#8b897f]">
                    Part of our curated collection
                  </p>
                </div>
              </div>
            </div>

            {/* Specifications */}
            {specifications.length > 0 && (
              <div className="mt-12 border-t border-[#e7e0d5] pt-9">
                <div className="mb-7 flex items-center gap-3">
                  <span className="h-px w-8 bg-[#a28c6c]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a28c6c]">
                    The finer details
                  </span>
                </div>

                <h2 className="font-serif text-3xl text-[#263b32]">
                  Product details
                </h2>

                <div className="mt-6 divide-y divide-[#e7e0d5]">
                  {specifications.map((detail) => (
                    <div
                      key={detail.label}
                      className="grid grid-cols-[110px_1fr] gap-4 py-4 sm:grid-cols-[140px_1fr]"
                    >
                      <span className="text-xs font-medium uppercase tracking-[0.08em] text-[#8b897f]">
                        {detail.label}
                      </span>

                      <span className="text-sm text-[#263b32]">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom editorial section */}
      <section className="border-t border-[#e7e0d5] bg-[#f0ebe2] px-5 py-16 text-center sm:px-8 lg:py-20">
        <div className="mx-auto max-w-2xl">
          <Sparkles
            size={23}
            strokeWidth={1.2}
            className="mx-auto mb-5 text-[#a28c6c]"
          />

          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#a28c6c]">
            Luna Crystals
          </p>

          <h2 className="mt-5 font-serif text-3xl leading-tight text-[#263b32] sm:text-4xl">
            A little piece of nature,
            <br />
            <em>made personal.</em>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-8 text-[#77776d]">
            Explore pieces inspired by the beauty and
            individuality of natural crystals.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-3 border-b border-[#a28c6c] pb-2 text-xs font-semibold uppercase tracking-[0.13em] text-[#263b32] transition hover:text-[#a28c6c]"
          >
            Continue exploring
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Added to cart feedback */}
      {isDialogOpen && (
        <WarningDialog
          title="Item added!"
          message={`${quantity}x ${item.titulo} was added to your cart.`}
          onClose={() => {
            setIsDialogOpen(false);

            if (dialogTimerRef.current) {
              clearTimeout(dialogTimerRef.current);
            }
          }}
        />
      )}
    </div>
  );
};

export default ItemDetails;

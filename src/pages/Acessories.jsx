import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, Gem, Search, SlidersHorizontal, X } from "lucide-react";
import { formatCurrency } from "../services/utils";

const ITEMS_PER_PAGE = 12;
const fields = [
  { key: "stone", label: "Stone", placeholder: "e.g. Amethyst", icon: Gem },
  { key: "type", label: "Type", placeholder: "e.g. Earrings", icon: SlidersHorizontal },
  { key: "material", label: "Material", placeholder: "e.g. Silver", icon: Search },
];

export default function Accessories() {
  const { param } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const stone = searchParams.get("stone") || "";
  const type = searchParams.get("type") || "";
  const material = searchParams.get("material") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "featured";
  const requestedPage = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10) || 1);
  const activeCount = [stone, type, material, maxPrice].filter(Boolean).length;

  const updateQuery = (key, value) => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      if (value === "" || value === "featured") next.delete(key);
      else next.set(key, String(value));
      if (key !== "page") next.delete("page");
      return next;
    });
  };

  useEffect(() => {
    const controller = new AbortController();
    async function load() {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/item/buscarPorParamentro/${encodeURIComponent(param || "all")}`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Request failed (${response.status})`);
        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Unexpected products response");
        setItems(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError("We couldn't load the collection. Please try again.");
          setItems([]);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }
    load();
    return () => controller.abort();
  }, [param]);

  const filtered = useMemo(() => {
    const contains = (value, query) => String(value || "").toLocaleLowerCase().includes(query.trim().toLocaleLowerCase());
    const result = items.filter((item) =>
      (!stone || contains(item.pedra, stone)) &&
      (!type || contains(item.tipo, type)) &&
      (!material || contains(item.material, material)) &&
      (!maxPrice || (Number.isFinite(Number(maxPrice)) && Number(item.preco) <= Number(maxPrice)))
    );
    if (sort === "price-asc") result.sort((a, b) => Number(a.preco) - Number(b.preco));
    if (sort === "price-desc") result.sort((a, b) => Number(b.preco) - Number(a.preco));
    if (sort === "name") result.sort((a, b) => String(a.titulo || "").localeCompare(String(b.titulo || "")));
    return result;
  }, [items, stone, type, material, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const page = Math.min(requestedPage, totalPages);
  const currentItems = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const clearFilters = () => {
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      ["stone", "type", "material", "maxPrice", "page"].forEach((key) => next.delete(key));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#263b32]">
      <div className="border-b border-[#e8e1d6] bg-[#f0ebe2] px-5 py-12 sm:py-20">
        <div className="mx-auto max-w-[1440px]">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[.3em] text-[#9b805d]">The Luna collection</p>
          <h1 className="font-serif text-5xl tracking-tight sm:text-7xl">Find your <em className="font-normal text-[#a28c6c]">something special.</em></h1>
          <p className="mt-5 max-w-xl text-sm leading-7 text-[#72766e]">Thoughtfully selected accessories inspired by the natural beauty of gemstones.</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-4 py-10 sm:px-8 lg:px-12">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-expanded={filtersOpen} className="inline-flex items-center gap-2 rounded-full border border-[#d9d0c1] px-5 py-3 text-xs font-semibold uppercase tracking-wider transition hover:bg-[#eee8dd]">
              <SlidersHorizontal size={16} /> Filters {activeCount > 0 && `(${activeCount})`}
            </button>
            <span className="text-xs text-[#817e74]">{loading ? "Loading…" : `${filtered.length} ${filtered.length === 1 ? "piece" : "pieces"}`}</span>
          </div>
          <label className="flex items-center gap-3 text-xs text-[#817e74]">
            Sort by
            <select value={sort} onChange={(e) => updateQuery("sort", e.target.value)} className="rounded-full border border-[#d9d0c1] bg-transparent px-4 py-3 text-[#263b32] outline-none focus:ring-2 focus:ring-[#a28c6c]">
              <option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option><option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        {filtersOpen && (
          <div className="mb-8 rounded-2xl border border-[#e6ded2] bg-white p-5 sm:p-7">
            <div className="mb-5 flex items-center justify-between"><h2 className="font-serif text-2xl">Refine your selection</h2><button type="button" onClick={() => setFiltersOpen(false)} aria-label="Close filters"><X size={20} /></button></div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {fields.map(({ key, label, placeholder, icon: Icon }) => (
                <label key={key} className="block"><span className="mb-2 block text-xs font-medium text-[#6d7068]">{label}</span><div className="relative"><Icon size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]" /><input type="text" value={{ stone, type, material }[key]} onChange={(e) => updateQuery(key, e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f4] py-3 pl-11 pr-3 text-sm outline-none focus:border-[#a28c6c]" /></div></label>
              ))}
              <label className="block"><span className="mb-2 block text-xs font-medium text-[#6d7068]">Maximum price (€)</span><input type="number" min="0" step="0.01" value={maxPrice} onChange={(e) => updateQuery("maxPrice", e.target.value)} placeholder="e.g. 25" className="w-full rounded-xl border border-[#e6ded2] bg-[#faf8f4] px-4 py-3 text-sm outline-none focus:border-[#a28c6c]" /></label>
            </div>
            {activeCount > 0 && <button type="button" onClick={clearFilters} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-[#8b7659] underline underline-offset-4"><X size={14} /> Clear filters</button>}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6" aria-label="Loading products">{Array.from({ length: 8 }, (_, index) => <div key={index} className="animate-pulse"><div className="aspect-[4/5] rounded-2xl bg-[#e9e2d7]" /><div className="mt-4 h-4 w-3/4 rounded bg-[#e9e2d7]" /><div className="mt-2 h-3 w-1/3 rounded bg-[#e9e2d7]" /></div>)}</div>
        ) : error ? (
          <div role="alert" className="py-20 text-center text-[#8b7659]">{error}</div>
        ) : currentItems.length === 0 ? (
          <div className="py-20 text-center"><Gem className="mx-auto mb-5 text-[#a28c6c]" size={34} /><h2 className="font-serif text-3xl">No pieces found</h2><p className="mt-3 text-sm text-[#817e74]">Try adjusting your filters.</p><button onClick={clearFilters} className="mt-6 rounded-full bg-[#263b32] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white">Clear filters</button></div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-9 sm:grid-cols-3 lg:grid-cols-4 sm:gap-x-6">
            {currentItems.map((item) => {
              const price = Number(item.preco) || 0;
              const discount = Number(item.desconto) || 0;
              const finalPrice = discount > 0 ? price * (1 - discount / 100) : price;
              return <Link to={`/item/${item._id}`} key={item._id} className="group block min-w-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#f0ebe2]">
                  {item.midia?.url1 ? <img src={item.midia.url1} alt={item.titulo || "Accessory"} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center text-[#b5a58f]"><Gem size={36} /></div>}
                  {discount > 0 && <span className="absolute left-3 top-3 rounded-full bg-[#263b32] px-3 py-1.5 text-[10px] font-semibold text-white">-{discount}%</span>}
                  <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#faf8f4] text-[#263b32] shadow-sm transition group-hover:bg-[#263b32] group-hover:text-white"><ArrowRight size={17} /></span>
                </div>
                <div className="mt-4"><p className="truncate text-[10px] uppercase tracking-[.15em] text-[#a28c6c]">{[item.tipo, item.pedra].filter(Boolean).join(" · ") || "Luna collection"}</p><h3 className="mt-2 line-clamp-2 font-serif text-base leading-snug sm:text-lg">{item.titulo}</h3><div className="mt-2 flex flex-wrap items-center gap-2 text-sm font-semibold"><span>{formatCurrency(finalPrice, "EUR", "en-IE")}</span>{discount > 0 && <span className="text-xs font-normal text-[#99958b] line-through">{formatCurrency(price, "EUR", "en-IE")}</span>}</div></div>
              </Link>;
            })}
          </div>
        )}

        {!loading && !error && totalPages > 1 && <nav aria-label="Product pages" className="mt-14 flex items-center justify-center gap-2">
          <button disabled={page === 1} onClick={() => updateQuery("page", page - 1)} aria-label="Previous page" className="rounded-full border border-[#d9d0c1] p-3 disabled:opacity-30"><ChevronLeft size={17} /></button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => <button key={number} onClick={() => updateQuery("page", number)} aria-current={page === number ? "page" : undefined} className={`h-10 min-w-10 rounded-full px-2 text-sm ${page === number ? "bg-[#263b32] text-white" : "border border-[#d9d0c1] hover:bg-[#eee8dd]"}`}>{number}</button>)}
          <button disabled={page === totalPages} onClick={() => updateQuery("page", page + 1)} aria-label="Next page" className="rounded-full border border-[#d9d0c1] p-3 disabled:opacity-30"><ChevronRight size={17} /></button>
        </nav>}
      </div>
    </div>
  );
}

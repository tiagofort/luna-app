import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { getWhatsNew } from '../services/api';
import { formatCurrency } from '../services/utils';

export default function FeatureGrid() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    let active = true;
    getWhatsNew().then(data => { if (active) setItems(Array.isArray(data) ? data : []); }).catch(() => { if (active) setError(true); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return <section className="mx-auto max-w-[1440px] px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
    <div className="mb-9 flex flex-wrap items-end justify-between gap-5"><div><p className="mb-3 text-[11px] uppercase tracking-[.28em] text-[#977b57]">Freshly discovered</p><h2 className="font-serif text-4xl tracking-tight text-[#2e342b] sm:text-5xl">New arrivals</h2><p className="mt-3 text-sm text-[#777568]">Beautiful finds, chosen for you.</p></div><Link to="/accessories/all" className="inline-flex items-center gap-2 border-b border-[#354a3c] pb-2 text-xs font-semibold uppercase tracking-[.15em] text-[#354a3c]">View all pieces <ArrowUpRight size={16}/></Link></div>
    {loading && <div className="grid grid-cols-2 gap-4 md:grid-cols-4">{Array.from({length:4},(_,i)=><div key={i} className="animate-pulse"><div className="aspect-[4/5] rounded-2xl bg-[#ded7ca]"/><div className="mt-4 h-4 w-2/3 rounded bg-[#ded7ca]"/></div>)}</div>}
    {!loading && error && <p className="py-12 text-center text-sm text-[#746e62]">Unable to load the collection right now.</p>}
    {!loading && !error && items.length === 0 && <p className="py-12 text-center text-sm text-[#746e62]">New pieces are coming soon.</p>}
    {!loading && !error && <div className="grid grid-cols-2 gap-x-4 gap-y-9 md:grid-cols-4 lg:gap-x-6">{items.slice(0,8).map(item=><Link key={item._id} to={`/item/${item._id}`} className="group block text-left"><div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#e7e0d5]"><img src={item.midia?.url1} alt={item.titulo || 'Accessory'} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"/><span className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#faf8f4]/90 text-[#263b32] opacity-0 transition-opacity group-hover:opacity-100"><ArrowUpRight size={18}/></span></div><p className="mt-4 text-[10px] uppercase tracking-[.17em] text-[#968369]">{item.pedra || 'Collection'}</p><h3 className="mt-1 line-clamp-2 font-serif text-lg text-[#2e342b] sm:text-xl">{item.titulo}</h3><p className="mt-2 text-sm font-semibold text-[#405343]">{formatCurrency(item.preco)}</p></Link>)}</div>}
  </section>;
}

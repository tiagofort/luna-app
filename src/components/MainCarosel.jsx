import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMainCarosel } from '../services/api';

export default function MainCarosel() {
  const [images, setImages] = useState([]);
  useEffect(() => { let active=true; getMainCarosel().then(data=>{if(active) setImages(Array.isArray(data)?data:[])}).catch(console.error); return ()=>{active=false}; }, []);
  if (!images.length) return <div className="rounded-2xl bg-[#f0ebe2] px-6 py-10 text-center text-sm text-[#817969]">Discover our curated collection below.</div>;
  return <div className="group relative overflow-hidden" aria-label="Featured accessories"><div className="flex w-max gap-4 motion-safe:animate-scroll-left group-hover:[animation-play-state:paused]">{[...images,...images].map((img,index)=><Link key={`${img._id || img.id_produto}-${index}`} to={`/item/${img.id_produto}`} className="block w-36 shrink-0 sm:w-48 lg:w-56"><div className="aspect-[4/5] overflow-hidden rounded-2xl bg-[#e8e2d9]"><img src={img.url} alt={`Featured accessory ${index % images.length + 1}`} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy"/></div></Link>)}</div></div>;
}


import Banner from "../components/MainBanner";
import MainCarosel from "../components/MainCarosel";
import FeatureGrid from "../components/FeatureGrid";
import Crystals from "../components/Crystals";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#faf8f4] text-[#282820]">
      <div className="bg-[#263b32] px-4 py-2 text-center text-[10px] font-medium uppercase tracking-[.22em] text-[#f8f3e9] sm:text-xs">
        Objects with meaning · Made to be treasured
      </div>

      <section className="mx-auto max-w-[1440px] px-4 pt-5 sm:px-8 lg:px-12">
        <div className="mb-5 flex items-center justify-between text-[10px] uppercase tracking-[.2em] text-[#827e71] sm:text-xs">
          <span>Curated with intention</span>
          <span>Natural beauty, everyday</span>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] bg-[#eee8dd] sm:rounded-[2rem]">
          <Banner />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-[11px] uppercase tracking-[.28em] text-[#8b7659]">
              The edit
            </p>
            <h2 className="font-serif text-3xl tracking-tight sm:text-5xl">
              Pieces to fall in love with
              <span className="text-[#a28c6c]">.</span>
            </h2>
          </div>

          <Sparkles
            className="mb-1 hidden text-[#a28c6c] sm:block"
            size={25}
          />
        </div>

        <MainCarosel />
      </section>

      <div className="bg-[#f0ebe2]">
        <FeatureGrid />
      </div>

      <section className="mx-auto max-w-[1440px] px-4 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mb-3 text-center text-[11px] uppercase tracking-[.3em] text-[#9c8060]">
          Find your energy
        </div>
        <Crystals />
      </section>
    </main>
  );
}

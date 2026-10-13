
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Gem, Sparkles, Moon } from "lucide-react";

import agate from "../assets/crystals/agate.webp";
import amazonite from "../assets/crystals/amazonite.webp";
import amethyst from "../assets/crystals/amethyst.webp";
import apatite from "../assets/crystals/apatite.webp";
import aquamarine from "../assets/crystals/aquamarine.webp";
import black_Tourmaline from "../assets/crystals/black_turmaline.webp";
import crystal_quartz from "../assets/crystals/crystal_quartz.webp";
import onyx from "../assets/crystals/onyx.webp";
import pink_quartz from "../assets/crystals/pink_quartz.webp";
import pyrite from "../assets/crystals/pyrite.webp";
import selenite from "../assets/crystals/selenite.webp";
import sodalite from "../assets/crystals/sodalite.webp";
import white_quartz from "../assets/crystals/white_quartz.webp";

const crystals = [
  { id: 1, name: "Agate", image: agate },
  { id: 2, name: "Amazonite", image: amazonite },
  { id: 3, name: "Amethyst", image: amethyst },
  { id: 4, name: "Apatite", image: apatite },
  { id: 5, name: "Aquamarine", image: aquamarine },
  { id: 6, name: "Black Tourmaline", image: black_Tourmaline },
  { id: 7, name: "Crystal Quartz", image: crystal_quartz },
  { id: 8, name: "Onyx", image: onyx },
  { id: 9, name: "Rose Quartz", image: pink_quartz },
  { id: 10, name: "Pyrite", image: pyrite },
  { id: 11, name: "Selenite", image: selenite },
  { id: 12, name: "Sodalite", image: sodalite },
  { id: 13, name: "White Quartz", image: white_quartz },
];

const CrystalCatalog = () => {
  const navigate = useNavigate();

  const handleCrystalClick = (crystal) => {
    navigate(`/stone/${encodeURIComponent(crystal.name)}`);
  };

  return (
    <section className="relative overflow-hidden bg-[#faf8f4] px-5 py-20 text-[#263b32] sm:px-8 sm:py-24">

      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full border border-[#e9e1d5]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[400px] w-[400px] rounded-full border border-[#e9e1d5]" />

      <div className="relative mx-auto max-w-7xl">

        {/* Section heading */}
        <div className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <div className="mb-6 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d8cbb7]" />

            <Moon
              size={17}
              strokeWidth={1.3}
              className="text-[#a28c6c]"
            />

            <span className="text-[11px] font-medium uppercase tracking-[0.25em] text-[#9c8060]">
              Discover their beauty
            </span>

            <span className="h-px w-10 bg-[#d8cbb7]" />
          </div>

          <h2 className="font-serif text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            Explore our{" "}
            <em className="text-[#a28c6c]">crystals.</em>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-[#77776d] sm:text-base">
            Every crystal has a story to tell.
            Discover the natural beauty, symbolism and
            unique character of each stone.
          </p>

          <div className="mt-7 flex items-center justify-center gap-3 text-[#a28c6c]">
            <span className="h-px w-12 bg-[#d8cbb7]" />
            <Sparkles size={18} strokeWidth={1.2} />
            <span className="h-px w-12 bg-[#d8cbb7]" />
          </div>
        </div>

        {/* Crystal collection */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-14 lg:gap-x-12">
          {crystals.map((crystal) => (
            <button
              key={crystal.id}
              type="button"
              onClick={() => handleCrystalClick(crystal)}
              aria-label={`Discover ${crystal.name}`}
              className="group flex w-[140px] flex-col items-center text-center outline-none sm:w-[170px] lg:w-[190px]"
            >
              {/* Circular image */}
              <div className="relative w-full max-w-[190px]">

                {/* Decorative outer ring */}
                <div className="absolute -inset-2 rounded-full border border-[#e2d6c5] transition-all duration-500 group-hover:-inset-3 group-hover:border-[#a28c6c]" />

                {/* Image container */}
                <div className="relative aspect-square overflow-hidden rounded-full bg-[#f0ebe2] shadow-[0_8px_25px_rgba(38,59,50,0.08)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_35px_rgba(38,59,50,0.15)] group-focus-visible:ring-4 group-focus-visible:ring-[#a28c6c]/40">

                  <img
                    src={crystal.image}
                    alt={crystal.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#263b32]/0 transition-all duration-500 group-hover:bg-[#263b32]/25">
                    <div className="flex h-11 w-11 translate-y-3 items-center justify-center rounded-full bg-white/95 text-[#263b32] opacity-0 shadow-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowUpRight
                        size={20}
                        strokeWidth={1.6}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Crystal name */}
              <div className="mt-7">
                <h3 className="font-serif text-lg leading-snug transition-colors duration-300 group-hover:text-[#9c8060] sm:text-xl">
                  {crystal.name}
                </h3>

                <div className="mt-2 flex items-center justify-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#a28c6c]">
                  <span>Discover stone</span>

                  <ArrowUpRight
                    size={13}
                    strokeWidth={1.5}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom editorial message */}
        <div className="mt-20 border-t border-[#e7e0d5] pt-12 text-center">
          <div className="mb-5 flex justify-center">
            <Gem
              size={27}
              strokeWidth={1.2}
              className="text-[#a28c6c]"
            />
          </div>

          <p className="font-serif text-xl italic text-[#8b7659] sm:text-2xl">
            Nature creates. We discover.
          </p>

          <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[#99958b]">
            Luna Crystals
          </p>
        </div>
      </div>
    </section>
  );
};

export default CrystalCatalog;

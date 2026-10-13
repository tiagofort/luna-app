
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#faf8f4] text-[#282820]">
      {/* Promotional section */}
      <section className="bg-[#263b32] px-6 py-16 text-center text-[#faf7ef] sm:py-24">
        <Sparkles className="mx-auto mb-5 text-[#d6bd91]" />

        <p className="text-[11px] uppercase tracking-[.3em] text-[#d6bd91]">
          More than an accessory
        </p>

        <h2 className="mx-auto mt-5 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">
          A little piece of nature, <em>just for you.</em>
        </h2>

        <p className="mx-auto mt-5 max-w-lg text-sm leading-7 text-[#d5ddd5]">
          Explore timeless pieces inspired by the beauty and
          individuality of natural stones.
        </p>

        <Link
          to="/accessories/all"
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#f5efe3] px-7 py-4 text-xs font-semibold uppercase tracking-[.15em] text-[#263b32] transition hover:bg-white"
        >
          Explore collection
          <ArrowUpRight size={17} />
        </Link>
      </section>

      {/* Store benefits */}
      <section className="mx-auto grid max-w-[1440px] gap-7 px-6 py-10 text-center text-xs text-[#55584e] sm:grid-cols-3 sm:px-10">
        <div className="flex items-center justify-center gap-3">
          <Sparkles size={18} />
          Thoughtfully curated
        </div>

        <div className="flex items-center justify-center gap-3">
          <ShieldCheck size={18} />
          Shop with confidence
        </div>

        <div className="flex items-center justify-center gap-3">
          <Truck size={18} />
          Delivery information at checkout
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-[#e8e2d8] px-6 py-6">
        <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 text-center text-xs text-[#827e71] sm:flex-row">
          <p>
            © {new Date().getFullYear()} Luna.
            All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-[#263b32]">
              Home
            </Link>
            <Link to="/accessories/all" className="hover:text-[#263b32]">
              Shop
            </Link>
            <Link to="/about" className="hover:text-[#263b32]">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

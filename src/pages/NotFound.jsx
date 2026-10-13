
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Home,
  Moon,
  Sparkles,
  Gem,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[75vh] items-center justify-center overflow-hidden bg-[#faf8f4] px-6 py-20 text-[#263b32]">

      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-[#e6ddce]" />
      <div className="pointer-events-none absolute -right-32 -bottom-32 h-96 w-96 rounded-full border border-[#e6ddce]" />

      <div className="pointer-events-none absolute right-[12%] top-[18%] text-[#d6bd91]/50">
        <Sparkles size={35} strokeWidth={1} />
      </div>

      <div className="pointer-events-none absolute bottom-[20%] left-[12%] text-[#d6bd91]/50">
        <Gem size={35} strokeWidth={1} />
      </div>

      <div className="relative mx-auto max-w-2xl text-center">

        {/* Brand detail */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-[#d8cbb7]" />

          <Moon
            size={18}
            strokeWidth={1.3}
            className="text-[#a28c6c]"
          />

          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#9c8060]">
            Luna Crystals
          </span>

          <span className="h-px w-10 bg-[#d8cbb7]" />
        </div>

        {/* 404 */}
        <div className="relative">
          <h1 className="font-serif text-[130px] leading-none tracking-[-0.08em] text-[#263b32] sm:text-[190px]">
            404
          </h1>

          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Sparkles
              size={32}
              strokeWidth={1.1}
              className="text-[#c7a978]"
            />
          </div>
        </div>

        {/* Message */}
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#a28c6c]">
          Page not found
        </p>

        <h2 className="mt-6 font-serif text-3xl leading-tight sm:text-5xl">
          Looks like you've wandered
          <br />
          <span className="italic text-[#a28c6c]">
            off the path.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-md text-sm leading-8 text-[#77776d] sm:text-base">
          Even the most beautiful journeys have unexpected
          turns. The page you're looking for may have moved
          or no longer exists.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/"
            className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-8 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#3d5548] sm:w-auto"
          >
            <Home size={17} strokeWidth={1.6} />
            Back to home
          </Link>

          <button
            type="button"
            onClick={() => window.history.back()}
            className="inline-flex w-full items-center justify-center gap-3 rounded-full border border-[#263b32] px-8 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#263b32] transition hover:bg-[#eee8dd] sm:w-auto"
          >
            <ArrowLeft size={17} strokeWidth={1.6} />
            Go back
          </button>
        </div>

        {/* Bottom decoration */}
        <div className="mt-16 flex items-center justify-center gap-3 text-[#a28c6c]">
          <span className="h-px w-12 bg-[#d8cbb7]" />
          <Gem size={17} strokeWidth={1.2} />
          <span className="h-px w-12 bg-[#d8cbb7]" />
        </div>

        <p className="mt-5 font-serif text-lg italic text-[#8b7659]">
          Find your way back to something beautiful.
        </p>
      </div>
    </main>
  );
}

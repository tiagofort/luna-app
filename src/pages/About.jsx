
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Gem,
  Heart,
  Sparkles,
  Leaf,
  Moon,
} from "lucide-react";

import stones from "../assets/stones.jpg";

const values = [
  {
    icon: Gem,
    title: "Natural beauty",
    description:
      "Inspired by the individuality, colours and timeless beauty of natural stones and crystals.",
  },
  {
    icon: Heart,
    title: "Meaningful pieces",
    description:
      "Jewellery that celebrates your personality, your style and the things that make you unique.",
  },
  {
    icon: Leaf,
    title: "Mindful living",
    description:
      "An invitation to slow down, reconnect with yourself and appreciate life's little moments.",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#faf8f4] text-[#263b32]">

      {/* Hero section */}
      <section className="relative overflow-hidden px-6 pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#e9dfcd]/40 blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-7 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#b49b76]" />
            <Moon size={15} className="text-[#a28c6c]" />
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#9c8060]">
              The story behind Luna
            </span>
            <span className="h-px w-10 bg-[#b49b76]" />
          </div>

          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight sm:text-7xl lg:text-8xl">
            Beauty with
            <br />
            <span className="italic text-[#a28c6c]">meaning.</span>
          </h1>

          <p className="mx-auto mt-8 max-w-xl text-sm leading-8 text-[#77776d] sm:text-base">
            If you believe in the beauty and energy of natural
            stones and crystals, you've found your place.
          </p>

          <div className="mt-10 flex items-center justify-center gap-2 text-[#a28c6c]">
            <span className="h-px w-12 bg-[#d8cbb7]" />
            <Sparkles size={19} strokeWidth={1.3} />
            <span className="h-px w-12 bg-[#d8cbb7]" />
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="mx-auto grid max-w-[1440px] items-center gap-12 px-6 pb-24 sm:px-10 lg:grid-cols-2 lg:gap-20 lg:pb-32">
        <div className="relative">
          <div className="absolute -bottom-5 -right-4 hidden h-full w-full rounded-[2rem] border border-[#d8cbb7] sm:block" />

          <div className="relative overflow-hidden rounded-[2rem] bg-[#eee8dd]">
            <img
              src={stones}
              alt="Natural stones and crystals at Luna"
              className="h-[420px] w-full object-cover sm:h-[580px]"
            />

            <div className="absolute bottom-5 left-5 rounded-full bg-[#faf8f4]/95 px-5 py-3 backdrop-blur-sm">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#263b32]">
                Inspired by nature
              </span>
            </div>
          </div>
        </div>

        <div className="lg:pl-4">
          <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9c8060]">
            Who we are
          </p>

          <h2 className="max-w-lg font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
            A connection between
            <span className="italic text-[#a28c6c]"> nature and you.</span>
          </h2>

          <div className="mt-8 space-y-6 text-sm leading-8 text-[#77776d] sm:text-base">
            <p>
              At <strong className="font-semibold text-[#263b32]">
                Luna Crystals
              </strong>, we believe that natural stones are more
              than beautiful creations of nature. They carry
              meaning, inspire connection and invite us to
              celebrate our individuality.
            </p>

            <p>
              Our aim is to help you connect with the energy of
              your chosen stones, bringing harmony and intention
              into everyday life while allowing your personal
              style to shine.
            </p>

            <p>
              Through our jewellery and accessories, we invite
              you to express your identity with elegance,
              discover the beauty of crystals and embrace the
              little details that make life special.
            </p>
          </div>

          <Link
            to="/accessories/all"
            className="mt-9 inline-flex items-center gap-3 border-b border-[#263b32] pb-2 text-xs font-semibold uppercase tracking-[0.15em] transition hover:gap-5"
          >
            Discover our collection
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>

      {/* Our philosophy */}
      <section className="bg-[#f0ebe2] px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto max-w-[1440px]">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#9c8060]">
              What inspires us
            </p>

            <h2 className="font-serif text-4xl sm:text-5xl">
              The Luna philosophy<span className="text-[#a28c6c]">.</span>
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#77776d]">
              A celebration of nature, individuality and
              meaningful everyday moments.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-[1.5rem] border border-[#e7e0d5] bg-[#faf8f4] px-8 py-12 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center rounded-full bg-[#eee8dd] transition-colors group-hover:bg-[#e4dacb]">
                  <Icon
                    size={27}
                    strokeWidth={1.3}
                    className="text-[#8b7659]"
                  />
                </div>

                <h3 className="font-serif text-2xl text-[#263b32]">
                  {title}
                </h3>

                <p className="mx-auto mt-4 max-w-xs text-sm leading-7 text-[#77776d]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="relative overflow-hidden bg-[#263b32] px-6 py-24 text-center text-[#faf7ef] sm:px-10 lg:py-32">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-3xl">
          <Sparkles
            size={27}
            strokeWidth={1.2}
            className="mx-auto mb-7 text-[#d6bd91]"
          />

          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-[#d6bd91]">
            Our purpose
          </p>

          <h2 className="font-serif text-4xl sm:text-6xl">
            Our mission<span className="text-[#d6bd91]">.</span>
          </h2>

          <p className="mt-9 text-base leading-9 text-[#e0e5dd] sm:text-lg">
            Our mission is to help you align your energy with
            the vibrations of beautiful natural stones,
            enhancing your well-being and enriching your
            everyday life.
          </p>

          <p className="mt-6 text-sm leading-8 text-[#cbd5cb] sm:text-base">
            Through unique and elegant jewellery, we aim to
            celebrate your beauty, inspire your inner strength
            and bring style, meaning and harmony to your journey.
          </p>

          <div className="mx-auto mt-10 h-px w-20 bg-[#b49b76]" />

          <p className="mt-8 font-serif text-2xl italic text-[#d6bd91] sm:text-3xl">
            Shine in your own way.
          </p>
        </div>
      </section>

      {/* Final invitation */}
      <section className="px-6 py-20 text-center sm:py-28">
        <Moon
          size={24}
          strokeWidth={1.3}
          className="mx-auto mb-6 text-[#a28c6c]"
        />

        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#9c8060]">
          Your journey starts here
        </p>

        <h2 className="mx-auto max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
          Find the piece that
          <span className="italic text-[#a28c6c]"> speaks to you.</span>
        </h2>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#77776d]">
          Begin your journey into the crystalline universe
          with Luna.
        </p>

        <Link
          to="/accessories/all"
          className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#263b32] px-8 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#3d5548]"
        >
          Explore collection
          <ArrowUpRight size={17} />
        </Link>
      </section>
    </div>
  );
}

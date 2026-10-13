
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Gem,
  Sparkles,
  Heart,
  Droplets,
  BookOpen,
  Moon,
  AlertCircle,
  Loader2,
} from "lucide-react";

import { getStones } from "../services/api";

const StoneDetail = () => {
  const { param } = useParams();

  const [stone, setStone] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchStone = async () => {
      setLoading(true);
      setError("");
      setStone(null);

      try {
        const data = await getStones(param);

        if (!active) return;

        setStone(data);
      } catch (err) {
        if (!active) return;

        console.error("Error fetching stone:", err);

        setError(
          "We couldn't load this crystal's information. Please try again."
        );
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    fetchStone();

    return () => {
      active = false;
    };
  }, [param]);

  const sections = stone
    ? [
        {
          title: stone.titulo1 || "About this stone",
          content: stone.sobre,
          icon: BookOpen,
          number: "01",
        },
        {
          title: stone.titulo2 || "Meaning & symbolism",
          content: stone.significado,
          icon: Heart,
          number: "02",
        },
        {
          title: stone.titulo3 || "Energy & properties",
          content: stone.efeitos,
          icon: Sparkles,
          number: "03",
        },
        {
          title: stone.titulo4 || "Care & cleansing",
          content: stone.limpeza,
          icon: Droplets,
          number: "04",
        },
      ].filter((section) => section.content)
    : [];

  if (loading) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#faf8f4] px-6 text-[#263b32]">
        <Loader2
          size={34}
          className="animate-spin text-[#a28c6c]"
        />

        <p className="mt-5 font-serif text-2xl">
          Discovering your crystal...
        </p>

        <p className="mt-2 text-sm text-[#8b897f]">
          Just a moment
        </p>
      </div>
    );
  }

  if (error || !stone) {
    return (
      <div className="flex min-h-[65vh] flex-col items-center justify-center bg-[#faf8f4] px-6 text-center text-[#263b32]">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#f0ebe2]">
          <AlertCircle
            size={34}
            strokeWidth={1.4}
            className="text-[#a28c6c]"
          />
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl">
          {error ? "Something went wrong" : "Crystal not found"}
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-7 text-[#77776d]">
          {error ||
            "We couldn't find the crystal you're looking for."}
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#263b32] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#3d5548]"
        >
          <ArrowLeft size={17} />
          Back to Luna
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#faf8f4] text-[#263b32]">

      {/* Hero */}
      <section className="relative overflow-hidden bg-[#263b32] px-6 pb-20 pt-16 text-center text-[#faf7ef] sm:pb-24 sm:pt-24">
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-40 -right-28 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative mx-auto max-w-4xl">
          <div className="mb-7 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#d6bd91]/60" />

            <Moon
              size={17}
              strokeWidth={1.3}
              className="text-[#d6bd91]"
            />

            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-[#d6bd91]">
              The crystal journal
            </span>

            <span className="h-px w-10 bg-[#d6bd91]/60" />
          </div>

          <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-full border border-[#d6bd91]/40 bg-white/5">
            <Gem
              size={38}
              strokeWidth={1.2}
              className="text-[#d6bd91]"
            />
          </div>

          <h1 className="break-words font-serif text-5xl tracking-tight sm:text-7xl">
            {stone.pedra}
          </h1>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-[#d5ddd5] sm:text-base">
            Explore the beauty, symbolism and traditions
            surrounding this remarkable natural stone.
          </p>

          <div className="mt-9 flex items-center justify-center gap-3 text-[#d6bd91]">
            <span className="h-px w-12 bg-[#d6bd91]/50" />
            <Sparkles size={19} strokeWidth={1.2} />
            <span className="h-px w-12 bg-[#d6bd91]/50" />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="relative mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <div className="-mt-9 overflow-hidden rounded-[2rem] border border-[#e7e0d5] bg-white shadow-[0_20px_60px_rgba(38,59,50,0.07)]">

          {/* Introduction */}
          <div className="border-b border-[#eee8dd] px-7 py-9 text-center sm:px-12 sm:py-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#9c8060]">
              Discover the stone
            </p>

            <h2 className="mt-4 font-serif text-3xl sm:text-4xl">
              The essence of{" "}
              <em className="text-[#a28c6c]">
                {stone.pedra}
              </em>
            </h2>
          </div>

          {/* Sections */}
          <div className="divide-y divide-[#eee8dd]">
            {sections.map(
              ({ title, content, icon: Icon, number }) => (
                <article
                  key={number}
                  className="grid gap-6 px-7 py-10 sm:px-12 sm:py-14 md:grid-cols-[85px_minmax(0,1fr)]"
                >
                  <div className="flex items-start gap-4 md:flex-col">
                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-[#f0ebe2]">
                      <Icon
                        size={25}
                        strokeWidth={1.4}
                        className="text-[#8b7659]"
                      />
                    </div>

                    <span className="pt-3 text-xs font-medium tracking-[0.2em] text-[#b5a58d] md:pt-0">
                      {number}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl leading-tight sm:text-3xl">
                      {title}
                    </h3>

                    <div className="mt-6 whitespace-pre-line break-words text-sm leading-8 text-[#77776d] sm:text-base sm:leading-9">
                      {content}
                    </div>
                  </div>
                </article>
              )
            )}
          </div>
        </div>

        {/* Footer navigation */}
        <div className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-[#e7e0d5] pt-9 sm:flex-row">
          <Link
            to="/"
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] transition hover:text-[#9c8060]"
          >
            <ArrowLeft size={17} />
            Back to Luna
          </Link>

          <div className="flex items-center gap-2 text-[#a28c6c]">
            <span className="h-px w-9 bg-[#d8cbb7]" />
            <Gem size={17} strokeWidth={1.2} />
            <span className="h-px w-9 bg-[#d8cbb7]" />
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] transition hover:text-[#9c8060]"
          >
            Explore Luna
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
};

export default StoneDetail;

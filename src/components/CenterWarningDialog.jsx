
import { useEffect, useId, useRef } from "react";
import {
  X,
  ArrowRight,
  Moon,
  Sparkles,
  Info,
} from "lucide-react";

export default function CenterWarningDialog({
  title,
  message,
  onClose,
  buttonMessage = "Got it!",
}) {
  const closeButtonRef = useRef(null);
  const titleId = useId();
  const messageId = useId();

  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopPropagation();
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#151c17]/65 px-4 py-8 backdrop-blur-[5px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={message ? messageId : undefined}
        className="relative my-auto w-full max-w-[440px] overflow-hidden rounded-[2rem] bg-[#faf8f4] shadow-[0_25px_80px_rgba(0,0,0,0.25)]"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-[#263b32] px-8 pb-9 pt-10 text-center text-[#faf7ef]">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full border border-white/10" />

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white"
          >
            <X size={18} />
          </button>

          <div className="relative">
            {/* Brand icon */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#d6bd91]/40 bg-white/5">
              <Moon
                size={27}
                strokeWidth={1.3}
                className="text-[#d6bd91]"
              />
            </div>

            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#d6bd91]">
              Luna Crystals
            </p>

            <h2 className="font-serif text-3xl tracking-tight sm:text-4xl">
              A little <em>note.</em>
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#d5ddd5]">
              Something worth your attention.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-7 pb-9 pt-9 text-center sm:px-10">
          {/* Information icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0ebe2]">
            <Info
              size={29}
              strokeWidth={1.4}
              className="text-[#8b7659]"
            />
          </div>

          {/* Dynamic title */}
          <h3
            id={titleId}
            className="font-serif text-2xl leading-snug text-[#263b32]"
          >
            {title}
          </h3>

          {/* Dynamic message */}
          {message && (
            <p
              id={messageId}
              className="mx-auto mt-4 max-w-sm whitespace-pre-line break-words text-sm leading-7 text-[#77776d]"
            >
              {message}
            </p>
          )}

          {/* Action */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="mt-9 flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#3d5548] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a28c6c] focus-visible:ring-offset-2"
          >
            {buttonMessage}
            <ArrowRight size={17} strokeWidth={1.8} />
          </button>

          {/* Decoration */}
          <div className="mt-8 flex items-center justify-center gap-3 text-[#a28c6c]">
            <span className="h-px w-10 bg-[#d8cbb7]" />
            <Sparkles size={16} strokeWidth={1.2} />
            <span className="h-px w-10 bg-[#d8cbb7]" />
          </div>
        </div>
      </div>
    </div>
  );
}

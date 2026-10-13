
import { useEffect, useId, useRef } from "react";
import {
  X,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Moon,
  Loader2,
} from "lucide-react";

export default function ConfirmDialog({
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Yes, confirm",
  cancelText = "Cancel",
  loading = false,
}) {
  const cancelButtonRef = useRef(null);
  const titleId = useId();
  const messageId = useId();

  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        event.preventDefault();
        onCancel?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onCancel, loading]);

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center overflow-y-auto bg-[#151c17]/60 px-4 py-8 backdrop-blur-[5px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onCancel?.();
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
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full border border-white/10" />

          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            aria-label="Close confirmation"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <X size={18} />
          </button>

          <div className="relative">
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
              One last <em>step.</em>
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#d5ddd5]">
              Please review your choice before continuing.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="px-7 pb-9 pt-9 text-center sm:px-10">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#f0ebe2]">
            <ShieldCheck
              size={29}
              strokeWidth={1.4}
              className="text-[#8b7659]"
            />
          </div>

          <h3
            id={titleId}
            className="font-serif text-2xl leading-snug text-[#263b32]"
          >
            {title}
          </h3>

          {message && (
            <p
              id={messageId}
              className="mx-auto mt-4 max-w-sm whitespace-pre-line break-words text-sm leading-7 text-[#77776d]"
            >
              {message}
            </p>
          )}

          {/* Action buttons */}
          <div className="mt-9 flex flex-col gap-3">
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#3d5548] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={17}
                    className="animate-spin"
                  />
                  Processing...
                </>
              ) : (
                <>
                  <Check size={17} strokeWidth={1.8} />
                  {confirmText}
                  <ArrowRight size={16} />
                </>
              )}
            </button>

            <button
              ref={cancelButtonRef}
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex w-full items-center justify-center rounded-full border border-[#d8cbb7] bg-transparent px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#263b32] transition hover:border-[#263b32] hover:bg-[#eee8dd] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {cancelText}
            </button>
          </div>

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

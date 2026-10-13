
import { useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Info,
  X,
  ArrowRight,
} from "lucide-react";

const Dialog = ({
  title,
  message,
  onClose,
  type = "info",
  buttonMessage = "Got it",
}) => {
  const variants = {
    success: {
      icon: CheckCircle2,
      background: "bg-[#eaf1e9]",
      color: "text-[#52735b]",
    },
    error: {
      icon: AlertCircle,
      background: "bg-[#f8eae6]",
      color: "text-[#a45e4e]",
    },
    info: {
      icon: Info,
      background: "bg-[#f0ebe2]",
      color: "text-[#a28c6c]",
    },
  };

  const variant = variants[type] || variants.info;
  const Icon = variant.icon;

  useEffect(() => {
    if (!onClose) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className="fixed right-4 top-4 z-[100] w-[calc(100%-2rem)] max-w-[390px] animate-[slideIn_0.3s_ease-out] sm:right-6 sm:top-6"
    >
      <div className="overflow-hidden rounded-2xl border border-[#e7e0d5] bg-white shadow-[0_15px_45px_rgba(38,59,50,0.14)]">
        <div className="flex items-start gap-4 p-5">
          {/* Status icon */}
          <div
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full ${variant.background}`}
          >
            <Icon
              size={22}
              strokeWidth={1.5}
              className={variant.color}
            />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h3 className="pr-4 font-serif text-xl leading-tight text-[#263b32]">
              {title}
            </h3>

            <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-[#77776d]">
              {message}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#8b7659] transition hover:text-[#263b32]"
            >
              {buttonMessage}
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close notification"
            className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-[#9c9a91] transition hover:bg-[#f0ebe2] hover:text-[#263b32]"
          >
            <X size={18} />
          </button>
        </div>

        {/* Decorative bottom line */}
        <div className="h-[3px] bg-gradient-to-r from-[#263b32] via-[#a28c6c] to-[#d6bd91]" />
      </div>
    </div>
  );
};

export default Dialog;


import { useEffect, useRef, useState } from "react";
import {
  X,
  Mail,
  ArrowRight,
  ArrowLeft,
  Moon,
  LockKeyhole,
  Loader2,
  AlertCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { ChangePasswordRequest } from "../services/api";

export default function ChangingPassword({ onClose, onSend }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, loading]);

  const handleSend = async (event) => {
    event.preventDefault();

    if (loading || sent) return;

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setError("Email address is required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(normalizedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await ChangePasswordRequest(normalizedEmail);

      setSent(true);

      if (onSend) {
        onSend(normalizedEmail);
      }
    } catch (err) {
      console.error("Password recovery error:", err);

      setError(
        err?.message ||
          "We couldn't send the recovery email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-center justify-center overflow-y-auto bg-[#151c17]/60 px-4 py-8 backdrop-blur-[5px]"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !loading
        ) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="luna-recovery-title"
        className="relative my-auto w-full max-w-[460px] overflow-hidden rounded-[2rem] bg-[#faf8f4] shadow-2xl"
      >
        {/* Header */}
        <div className="relative overflow-hidden bg-[#263b32] px-8 pb-10 pt-12 text-center text-[#faf7ef]">
          <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full border border-white/10" />

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close password recovery"
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
              Luna account recovery
            </p>

            <h2
              id="luna-recovery-title"
              className="font-serif text-4xl tracking-tight sm:text-5xl"
            >
              Find your <em>way back.</em>
            </h2>

            <p className="mx-auto mt-4 max-w-xs text-sm leading-6 text-[#d5ddd5]">
              Forgot your password? We're here to help
              you reconnect with Luna.
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-7 pb-9 pt-8 sm:px-10">
          {sent ? (
            <div role="status" className="py-4 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf1e9]">
                <ShieldCheck
                  size={36}
                  strokeWidth={1.3}
                  className="text-[#52735b]"
                />
              </div>

              <h3 className="font-serif text-3xl text-[#263b32]">
                Check your inbox
              </h3>

              <p className="mt-4 text-sm leading-7 text-[#77776d]">
                If an account exists for this email address,
                you'll receive instructions to reset your
                password.
              </p>

              <button
                type="button"
                onClick={onClose}
                className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-[#263b32] px-8 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#3d5548]"
              >
                Back to login
                <ArrowRight size={17} />
              </button>
            </div>
          ) : (
            <>
              {/* Introduction */}
              <div className="mb-7 flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#f0ebe2]">
                  <LockKeyhole
                    size={22}
                    strokeWidth={1.4}
                    className="text-[#8b7659]"
                  />
                </div>

                <div>
                  <h3 className="font-serif text-2xl text-[#263b32]">
                    Reset your password
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#77776d]">
                    Enter your registered email address
                    and we'll send you a recovery link.
                  </p>
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSend}
                noValidate
                className="space-y-6"
              >
                <div>
                  <label
                    htmlFor="recovery-email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#263b32]"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                    />

                    <input
                      ref={inputRef}
                      id="recovery-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      aria-invalid={Boolean(error)}
                      aria-describedby={
                        error ? "recovery-error" : undefined
                      }
                      className="w-full rounded-xl border border-[#e1d9cb] bg-white py-3.5 pl-12 pr-4 text-sm text-[#263b32] outline-none transition placeholder:text-[#aaa59b] focus:border-[#a28c6c] focus:ring-2 focus:ring-[#a28c6c]/15 disabled:opacity-60"
                    />
                  </div>

                  {error && (
                    <div
                      id="recovery-error"
                      role="alert"
                      className="mt-3 flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
                    >
                      <AlertCircle
                        size={17}
                        className="mt-0.5 flex-shrink-0 text-red-500"
                      />

                      <p className="text-xs leading-5 text-red-700">
                        {error}
                      </p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#3d5548] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send recovery link
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>

              {/* Back */}
              <div className="mt-7 border-t border-[#e7e0d5] pt-7 text-center">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#8b7659] transition hover:text-[#263b32] disabled:opacity-50"
                >
                  <ArrowLeft size={16} />
                  Back to login
                </button>
              </div>

              <div className="mt-7 flex items-center justify-center gap-2 text-[#a28c6c]">
                <span className="h-px w-8 bg-[#d8cbb7]" />
                <Sparkles size={15} strokeWidth={1.3} />
                <span className="h-px w-8 bg-[#d8cbb7]" />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

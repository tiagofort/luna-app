
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  Sparkles,
  Moon,
  Loader2,
} from "lucide-react";

import { executeLogin } from "../services/api";
import { useAuthContext } from "../context/AuthContext";
import CenterWarningDialog from "../components/CenterWarningDialog";
import ChangingPassword from "./ChangingPassword";

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogButton, setDialogButton] = useState("");

  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const closeButtonRef = useRef(null);

  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const showDialog = (title, message, button = "Got it!") => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogButton(button);
    setDialogVisible(true);
  };

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setShowPassword(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (
        event.key === "Escape" &&
        !dialogVisible &&
        !showEmailDialog &&
        !loading
      ) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    if (!dialogVisible && !showEmailDialog) {
      closeButtonRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, dialogVisible, showEmailDialog, loading]);

  
const handleLogin = async (event) => {
  event.preventDefault();

  if (loading) return;

  setLoading(true);

  try {
    const userData = await executeLogin(email, password);

    loginUser(userData);

    setEmail("");
    setPassword("");

    // Fecha o modal automaticamente após o login
    onClose();

  } catch (error) {
    showDialog(
      "Something went wrong",
      error?.message || "Unable to log in. Please try again.",
      "Try again"
    );
  } finally {
    setLoading(false);
  }
};


  const handleDialogClose = () => {
    const loginSucceeded = dialogTitle === "Welcome back!";

    setDialogVisible(false);

    if (loginSucceeded) {
      onClose();
    }
  };

  if (!open) return null;
  if (showEmailDialog) {
    return (
      <ChangingPassword
        onClose={() => setShowEmailDialog(false)}
        onSend={(recoveryEmail) => {
          setShowEmailDialog(false);

          showDialog(
            "Check your email",
            `We sent recovery instructions to ${recoveryEmail}`,
            "OK"
          );
        }}
      />
    );
  }
  return (
    <>
      {/* Modal overlay */}
      <div
        className="fixed inset-0 z-[110] flex items-center justify-center overflow-y-auto bg-[#151c17]/60 px-4 py-8 backdrop-blur-[5px]"
        onMouseDown={(event) => {
          if (
            event.target === event.currentTarget &&
            !dialogVisible &&
            !showEmailDialog &&
            !loading
          ) {
            onClose();
          }
        }}
      >
        {/* Modal container */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="luna-login-title"
          className="relative my-auto w-full max-w-[460px] overflow-hidden rounded-[2rem] bg-[#faf8f4] shadow-2xl"
        >
          {/* Decorative header */}
          <div className="relative overflow-hidden bg-[#263b32] px-8 pb-10 pt-12 text-center text-[#faf7ef]">
            <div className="pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full border border-white/10" />
            <div className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full border border-white/10" />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              disabled={loading}
              aria-label="Close login"
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
                Your Luna experience
              </p>

              <h2
                id="luna-login-title"
                className="font-serif text-4xl tracking-tight sm:text-5xl"
              >
                Welcome <em>back.</em>
              </h2>

              <p className="mt-4 text-sm leading-6 text-[#d5ddd5]">
                Sign in to continue your journey with Luna.
              </p>
            </div>
          </div>

          {/* Login form */}
          <div className="px-7 pb-9 pt-8 sm:px-10">
            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="luna-login-email"
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
                    id="luna-login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-[#e1d9cb] bg-white py-3.5 pl-12 pr-4 text-sm text-[#263b32] outline-none transition placeholder:text-[#aaa59b] focus:border-[#a28c6c] focus:ring-2 focus:ring-[#a28c6c]/15 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="luna-login-password"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-[#263b32]"
                >
                  Password
                </label>

                <div className="relative">
                  <LockKeyhole
                    size={18}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                  />

                  <input
                    id="luna-login-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="w-full rounded-xl border border-[#e1d9cb] bg-white py-3.5 pl-12 pr-12 text-sm text-[#263b32] outline-none transition placeholder:text-[#aaa59b] focus:border-[#a28c6c] focus:ring-2 focus:ring-[#a28c6c]/15 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={loading}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b897f] transition hover:text-[#263b32]"
                  >
                    {showPassword ? (
                      <EyeOff size={19} strokeWidth={1.5} />
                    ) : (
                      <Eye size={19} strokeWidth={1.5} />
                    )}
                  </button>
                </div>

                <div className="mt-3 text-right">
                  <button
                    type="button"
                    onClick={() => setShowEmailDialog(true)}
                    className="text-xs font-medium text-[#a28c6c] transition hover:text-[#263b32] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Login button */}
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#3d5548] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Register */}
            <div className="mt-7 border-t border-[#e7e0d5] pt-7 text-center">
              <p className="text-sm text-[#827e71]">
                New to Luna?
              </p>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  onClose();
                  navigate("/registeruser");
                }}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-[#263b32] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#263b32] transition hover:bg-[#eee8dd] disabled:opacity-50"
              >
                Create an account
                <ArrowRight size={16} />
              </button>
            </div>

            <div className="mt-7 flex items-center justify-center gap-2 text-[#a28c6c]">
              <span className="h-px w-8 bg-[#d8cbb7]" />
              <Sparkles size={15} strokeWidth={1.3} />
              <span className="h-px w-8 bg-[#d8cbb7]" />
            </div>
          </div>
        </div>
      </div>

      {/* Login feedback */}
      {dialogVisible && (
        <CenterWarningDialog
          title={dialogTitle}
          message={dialogMessage}
          buttonMessage={dialogButton}
          onClose={handleDialogClose}
        />
      )}

    </>
  );
};

export default LoginModal;

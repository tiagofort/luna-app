
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  ArrowRight,
  Moon,
  Sparkles,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";

const NewPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("key");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordsMatch =
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (loading || success) return;

    setError("");

    if (!token) {
      setError(
        "This password reset link is invalid or incomplete."
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Your password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/usuario/redefinir_senha`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            senha: newPassword,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response
          .json()
          .catch(() => ({}));

        throw new Error(
          errorData.message ||
            "Unable to reset your password. The link may have expired."
        );
      }

      setNewPassword("");
      setConfirmPassword("");

      setSuccess(
        "Your password has been updated successfully!"
      );
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!success) return;

    const timeout = setTimeout(() => {
      navigate("/", { replace: true });
    }, 2500);

    return () => clearTimeout(timeout);
  }, [success, navigate]);

  const inputClass =
    "w-full rounded-xl border border-[#e1d9cb] bg-white py-3.5 pl-12 pr-12 text-sm text-[#263b32] outline-none transition placeholder:text-[#aaa59b] focus:border-[#a28c6c] focus:ring-2 focus:ring-[#a28c6c]/15 disabled:opacity-60";

  return (
    <main className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-[#faf8f4] px-4 py-16 text-[#263b32] sm:px-6">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full border border-[#e6ddce]" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full border border-[#e6ddce]" />

      <div className="relative w-full max-w-[470px]">
        {/* Page heading */}
        <div className="mb-9 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#d8cbb7]" />

            <Moon
              size={17}
              strokeWidth={1.3}
              className="text-[#a28c6c]"
            />

            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#9c8060]">
              Luna account
            </span>

            <span className="h-px w-9 bg-[#d8cbb7]" />
          </div>

          <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
            A fresh <em className="text-[#a28c6c]">start.</em>
          </h1>

          <p className="mx-auto mt-5 max-w-sm text-sm leading-7 text-[#77776d]">
            Create a new password to securely access
            your Luna account.
          </p>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-[2rem] border border-[#e7e0d5] bg-white shadow-[0_18px_60px_rgba(38,59,50,0.06)]">
          {/* Card header */}
          <div className="border-b border-[#eee8dd] px-8 py-7">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f0ebe2]">
                <LockKeyhole
                  size={23}
                  strokeWidth={1.4}
                  className="text-[#8b7659]"
                />
              </div>

              <div>
                <h2 className="font-serif text-2xl">
                  Reset your password
                </h2>

                <p className="mt-1 text-xs text-[#8b897f]">
                  Choose a new password below
                </p>
              </div>
            </div>
          </div>

          <div className="px-7 py-9 sm:px-9">
            {!token ? (
              /* Invalid link */
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
                  <AlertCircle
                    size={29}
                    strokeWidth={1.4}
                    className="text-red-500"
                  />
                </div>

                <h3 className="font-serif text-2xl">
                  Invalid reset link
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#77776d]">
                  This password reset link is missing the
                  required information. Please request a
                  new link to continue.
                </p>

                <Link
                  to="/"
                  className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#263b32] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:bg-[#3d5548]"
                >
                  Back to home
                  <ArrowRight size={17} />
                </Link>
              </div>
            ) : success ? (
              /* Success */
              <div
                role="status"
                className="py-4 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#eaf1e9]">
                  <ShieldCheck
                    size={37}
                    strokeWidth={1.3}
                    className="text-[#52735b]"
                  />
                </div>

                <h3 className="font-serif text-3xl">
                  All done!
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#77776d]">
                  {success}
                </p>

                <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#8b897f]">
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                  Redirecting you to Luna...
                </div>
              </div>
            ) : (
              /* Password form */
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                {/* New password */}
                <div>
                  <label
                    htmlFor="new-password"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
                  >
                    New password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                    />

                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      minLength={8}
                      required
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b897f] transition hover:text-[#263b32]"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  <p className="mt-2 text-xs text-[#99958b]">
                    Use at least 8 characters.
                  </p>
                </div>

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirm-new-password"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
                  >
                    Confirm new password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      strokeWidth={1.5}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                    />

                    <input
                      id="confirm-new-password"
                      type={
                        showConfirmPassword
                          ? "text"
                          : "password"
                      }
                      autoComplete="new-password"
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setError("");
                      }}
                      disabled={loading}
                      required
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((prev) => !prev)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b897f] transition hover:text-[#263b32]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>

                  {confirmPassword.length > 0 && (
                    <p
                      className={`mt-2 flex items-center gap-1.5 text-xs ${
                        passwordsMatch
                          ? "text-green-700"
                          : "text-red-600"
                      }`}
                    >
                      {passwordsMatch ? (
                        <>
                          <Check size={14} />
                          Passwords match
                        </>
                      ) : (
                        <>
                          <AlertCircle size={14} />
                          Passwords do not match
                        </>
                      )}
                    </p>
                  )}
                </div>

                {/* Error message */}
                {error && (
                  <div
                    role="alert"
                    className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3"
                  >
                    <AlertCircle
                      size={18}
                      className="mt-0.5 flex-shrink-0 text-red-500"
                    />

                    <p className="text-sm leading-6 text-red-700">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.13em] text-white transition hover:bg-[#3d5548] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                      Updating password...
                    </>
                  ) : (
                    <>
                      Reset password
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>

                <div className="border-t border-[#eee8dd] pt-6 text-center">
                  <Link
                    to="/"
                    className="text-xs font-semibold uppercase tracking-[0.1em] text-[#8b7659] transition hover:text-[#263b32] hover:underline"
                  >
                    Back to Luna
                  </Link>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer decoration */}
        <div className="mt-9 flex items-center justify-center gap-3 text-[#a28c6c]">
          <span className="h-px w-10 bg-[#d8cbb7]" />
          <Sparkles size={18} strokeWidth={1.3} />
          <span className="h-px w-10 bg-[#d8cbb7]" />
        </div>

        <p className="mt-4 text-center font-serif text-lg italic text-[#8b7659]">
          Your journey continues here.
        </p>
      </div>
    </main>
  );
};

export default NewPassword;

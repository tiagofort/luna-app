
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Camera,
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  ArrowRight,
  Moon,
  Sparkles,
  Loader2,
  Check,
  X,
} from "lucide-react";

import { uploadImage, createUser } from "../services/api";
import CenterWarningDialog from "../components/CenterWarningDialog";

const inputClass =
  "w-full rounded-xl border border-[#e1d9cb] bg-white py-3.5 pl-12 pr-4 text-sm text-[#263b32] outline-none transition placeholder:text-[#aaa59b] focus:border-[#a28c6c] focus:ring-2 focus:ring-[#a28c6c]/15 disabled:opacity-60";

const RegisterUser = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogButton, setDialogButton] = useState("");

  const showDialog = (title, message, button = "OK") => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogButton(button);
    setDialogVisible(true);
  };

  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleFileChange = (event) => {
    const selected = event.target.files?.[0];

    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      showDialog(
        "Invalid file",
        "Please select a valid image file."
      );
      event.target.value = "";
      return;
    }

    if (selected.size > 5 * 1024 * 1024) {
      showDialog(
        "File too large",
        "Please choose an image smaller than 5 MB."
      );
      event.target.value = "";
      return;
    }

    setFile(selected);
  };

  const handleUser = async (event) => {
    event.preventDefault();

    if (loading) return;

    if (
      !name.trim() ||
      !surname.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !password ||
      !confirmPassword
    ) {
      showDialog(
        "Validation error",
        "All fields are required. Please complete the form."
      );
      return;
    }

    if (password !== confirmPassword) {
      showDialog(
        "Password mismatch",
        "Passwords do not match. Please try again."
      );
      return;
    }

    setLoading(true);

    try {
      const avatarUrl = file ? await uploadImage(file) : null;

      const userData = {
        nome: name.trim(),
        sobrenome: surname.trim(),
        email: email.trim(),
        phone: phone.trim(),
        senha: password,
        avatar: avatarUrl || "",
      };

      await createUser(userData);

      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setFile(null);

      showDialog(
        "Success",
        "Your account has been created! Please check your email and follow the instructions to complete your registration.",
        "Continue"
      );
    } catch (error) {
      console.error("Registration failed:", error);

      showDialog(
        "Registration failed",
        error?.message ||
          "We couldn't create your account. Please try again.",
        "Try again"
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  return (
    <div className="min-h-screen bg-[#faf8f4] px-4 py-12 text-[#263b32] sm:px-6 sm:py-20">
      <div className="mx-auto max-w-[650px]">

        {/* Page heading */}
        <div className="mb-10 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#d8cbb7]" />
            <Moon size={17} className="text-[#a28c6c]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#9c8060]">
              Join the Luna family
            </span>
            <span className="h-px w-9 bg-[#d8cbb7]" />
          </div>

          <h1 className="font-serif text-4xl tracking-tight sm:text-6xl">
            Create your <em className="text-[#a28c6c]">account.</em>
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#77776d]">
            A little more magic awaits. Join Luna and begin
            your journey into the world of crystals.
          </p>
        </div>

        {/* Registration card */}
        <div className="overflow-hidden rounded-[2rem] border border-[#e7e0d5] bg-white shadow-[0_18px_60px_rgba(38,59,50,0.06)]">
          <div className="border-b border-[#eee8dd] px-7 py-6 sm:px-10">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f0ebe2]">
                <UserRound
                  size={21}
                  strokeWidth={1.5}
                  className="text-[#8b7659]"
                />
              </div>

              <div>
                <h2 className="font-serif text-xl">
                  Your details
                </h2>
                <p className="mt-1 text-xs text-[#8b897f]">
                  Tell us a little about yourself
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleUser}
            className="space-y-6 px-7 py-8 sm:px-10 sm:py-10"
          >
            {/* Avatar */}
            <div className="flex flex-col items-center gap-4 border-b border-[#eee8dd] pb-8">
              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-[#e1d9cb] bg-[#f5f1e9]">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Profile preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <UserRound
                      size={37}
                      strokeWidth={1.2}
                      className="text-[#a28c6c]"
                    />
                  )}
                </div>

                <label
                  htmlFor="luna-avatar"
                  className="absolute -bottom-1 -right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 border-white bg-[#263b32] text-white shadow-md transition hover:bg-[#3d5548]"
                  aria-label="Upload profile photo"
                >
                  <Camera size={16} />
                </label>
              </div>

              <input
                id="luna-avatar"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={loading}
                className="sr-only"
              />

              <div className="text-center">
                <p className="text-sm font-medium">
                  Profile photo
                  <span className="ml-2 font-normal text-[#99958b]">
                    (optional)
                  </span>
                </p>
                <p className="mt-1 text-xs text-[#99958b]">
                  JPG, PNG or WebP · Max 5 MB
                </p>
              </div>

              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  disabled={loading}
                  className="inline-flex items-center gap-1 text-xs text-[#9c8060] hover:underline"
                >
                  <X size={13} />
                  Remove photo
                </button>
              )}
            </div>

            {/* Name / Surname */}
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="register-name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
                >
                  First name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                  />
                  <input
                    id="register-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder="First name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                    required
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="register-surname"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
                >
                  Last name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    strokeWidth={1.5}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                  />
                  <input
                    id="register-surname"
                    type="text"
                    autoComplete="family-name"
                    placeholder="Last name"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    disabled={loading}
                    required
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="register-email"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
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
                  id="register-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label
                htmlFor="register-phone"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
              >
                Phone number
              </label>

              <div className="relative">
                <Phone
                  size={18}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                />

                <input
                  id="register-phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+353 87 123 4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={loading}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="register-password"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
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
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b897f] hover:text-[#263b32]"
                >
                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="register-confirm-password"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.1em]"
              >
                Confirm password
              </label>

              <div className="relative">
                <LockKeyhole
                  size={18}
                  strokeWidth={1.5}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#a28c6c]"
                />

                <input
                  id="register-confirm-password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  required
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((prev) => !prev)}
                  aria-label={
                    showConfirm ? "Hide password" : "Show password"
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8b897f] hover:text-[#263b32]"
                >
                  {showConfirm ? (
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
                      <X size={14} />
                      Passwords do not match
                    </>
                  )}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-3 rounded-full bg-[#263b32] px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#3d5548] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <div className="border-t border-[#eee8dd] pt-7 text-center">
              <p className="text-sm text-[#77776d]">
                Already part of Luna?
              </p>

              <Link
                to="/"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#263b32] hover:underline"
              >
                Back to Luna
                <ArrowRight size={16} />
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-9 flex items-center justify-center gap-3 text-[#a28c6c]">
          <span className="h-px w-10 bg-[#d8cbb7]" />
          <Sparkles size={18} strokeWidth={1.3} />
          <span className="h-px w-10 bg-[#d8cbb7]" />
        </div>

        <p className="mt-4 text-center font-serif text-lg italic text-[#8b7659]">
          A little magic, just for you.
        </p>
      </div>

      {/* Feedback dialog */}
      {dialogVisible && (
        <CenterWarningDialog
          title={dialogTitle}
          message={dialogMessage}
          buttonMessage={dialogButton}
          onClose={() => {
            const success = dialogTitle === "Success";
            setDialogVisible(false);

            if (success) {
              navigate("/");
            }
          }}
        />
      )}
    </div>
  );
};

export default RegisterUser;

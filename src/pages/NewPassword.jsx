import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const NewPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("key");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/usuario/redefinir_senha`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ password: newPassword }),
        });

        if (!response.ok) {
            throw new Error("Something went wrong. Please try again.");
        }

        setSuccess("Password reset successfully.");
        setTimeout(() => navigate("/"), 2000);
    } catch (err) {
        setError(err.message);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto mt-20 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center text-mainColor">Reset your password</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-mainColor focus:border-mainColor"
          required
        />
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-mainColor focus:border-mainColor"
          required
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}

        <button
          type="submit"
          className="w-full bg-mainColor text-white py-2 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default NewPassword;

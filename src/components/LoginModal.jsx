import React, { useState } from "react";

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // lógica de login ou criação
            alert("Login ou criação de conta aqui.");
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-mainColor"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-mainColor"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-mainColor text-white py-2 rounded hover:bg-opacity-90"
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => alert("Criar conta lógica aqui")}
              className="flex-1 border border-mainColor text-mainColor py-2 rounded hover:bg-mainColor/10"
            >
              Criar Conta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

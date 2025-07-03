import { useState } from 'react';
import { ChangePasswordRequest } from '../services/api';

export default function ChangingPassword({ onClose, onSend }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

   const handleSend = async () => {
    if (!email) {
      setError('Email é obrigatório.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido.');
      return;
    }

    setError('');

    try {
      await ChangePasswordRequest(email); // 👈 aqui você chama a função
      if (onSend) onSend(email); // você ainda pode usar isso pra mostrar diálogo no LoginModal
    } catch (err) {
      setError(err.message || "Erro ao enviar o email.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-sm text-center">
        <h3 className="font-bold text-lg">Enter your email</h3>
        <input
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mt-4 px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-mainColor text-white rounded-xl hover:bg-green-700 transition"
          >
            Send
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { executeLogin } from '../services/api';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate  } from 'react-router-dom';
import { X } from 'lucide-react';

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 relative border border-gray-200">
        {/* Botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          👋 Welcome Back
          <p className="text-sm text-gray-500 mt-1">Do Your Login to continue</p>
        </h2>

        {/* Formulário */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const userData = await executeLogin(email, password);
              loginUser(userData);
              setEmail('');
              setPassword('');
              onClose();
            } catch (err) {
              console.log(err.message);
            }
          }}
          className="space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-mainColor focus:border-mainColor transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 bg-mainColor text-white font-medium py-2 rounded-md hover:bg-opacity-90 transition"
            >
              Connect
            </button>
              <button
                type="button"
                className="flex-1 border border-mainColor text-mainColor font-medium py-2 rounded-md hover:bg-mainColor/10 transition"
                onClick={() => {
                  onClose();       
                  navigate("/registeruser"); 
                }}
              >
                Create Account
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;

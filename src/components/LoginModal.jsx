import { useState, useEffect } from "react";
import { executeLogin } from '../services/api';
import { useAuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import CenterWarningDialog from '../components/CenterWarningDialog';
import ChangingPassword from "./ChangingPassword";
import { X } from 'lucide-react';

const LoginModal = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogButton, setDialogButton] = useState("");
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const { loginUser } = useAuthContext();
  const navigate = useNavigate();

  const showDialog = (title, message, button) => {
    setDialogTitle(title);
    setDialogMessage(message);
    setDialogButton(button);
    setDialogVisible(true);
  };

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

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          👋 Welcome
          <p className="text-sm text-gray-500 mt-1">Do Your Login to continue</p>
        </h2>

        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const userData = await executeLogin(email, password);
              loginUser(userData);
              setEmail('');
              setPassword('');
              showDialog("Welcome back!", "You are logged in!", "Got it!");
            } catch (error) {
              showDialog("Something Went Wrong", error.message, "Got it!");
              console.log(error.message);
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
            <p
              className="text-sm text-mainColor mt-2 cursor-pointer hover:underline text-right"
              onClick={() => setShowEmailDialog(true)}
            >
              Forgot Password?
            </p>
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

      {dialogVisible && (
        <CenterWarningDialog
          title={dialogTitle}
          message={dialogMessage}
          onClose={() => {
            setDialogVisible(false);
            if (dialogTitle === "Welcome back!") {
              onClose();
            }
          }}
          buttonMessage={dialogButton}
        />
      )}

      {showEmailDialog && (
        <ChangingPassword
          onClose={() => setShowEmailDialog(false)}
          onSend={(email) => {
            setShowEmailDialog(false);
            showDialog("Check Your Email", `We sent recovery instructions to ${email}`, "OK");
          }}
        />
      )}
    </div>
  );
};

export default LoginModal;

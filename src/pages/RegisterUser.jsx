import { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";
import { uploadImage, createUser } from "../services/api";
import { useNavigate } from 'react-router-dom';

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
    } else {
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return null; // opcional
    return await uploadImage(file);
  };

  const handleUser = async () => {
    try {
      // 1. Faz upload da imagem (se houver)
      // const url = await handleUpload();
      const url="";
      setAvatar(url);

      // 2. Monta o objeto com os dados do usuário, já com o avatar atualizado
      const userData = {
        nome: name,
        sobrenome: surname,
        email: email,
        phone: phone,
        senha: password,
        avatar: url || "",
      };

      // 3. Envia os dados para criar o usuário
      await createUser(userData);
      console.log("User successfully created");
      setName("");
      setSurname("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");
      setAvatar("");
      navigate('/')
    } catch (error) {
      // Erros do upload OU do cadastro
      console.error("Failed to register user or upload image:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-xl space-y-5">
      {/* Avatar Upload */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 border flex items-center justify-center text-gray-500">
          <Camera className="w-5 h-5" />
        </div>
        <input
          type="file"
          className="flex-1 border rounded-md px-3 py-2 text-sm file:hidden"
          placeholder="Avatar"
          onChange={handleFileChange}
        />
      </div>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Surname */}
      <input
        type="text"
        placeholder="Surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Phone */}
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-mainColor outline-none"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Confirm Password */}
      <div className="relative">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full border rounded-md px-4 py-2 pr-10 focus:ring-2 focus:ring-mainColor outline-none"
        />
        <button
          type="button"
          onClick={() => setShowConfirm(!showConfirm)}
          className="absolute right-3 top-2.5 text-gray-500"
        >
          {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-mainColor text-white rounded-md py-2 font-semibold hover:bg-opacity-90 transition disabled:opacity-40"
        onClick={handleUser}
      >
        CREATE
      </button>
    </div>
  );
};

export default RegisterUser;

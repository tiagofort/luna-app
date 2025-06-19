import { useState } from "react";
import { Eye, EyeOff, Camera } from "lucide-react";

const RegisterUser = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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
        />
      </div>

      {/* Name */}
      <input
        type="text"
        placeholder="Name"
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Surname */}
      <input
        type="text"
        placeholder="Surname"
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Email */}
      <input
        type="email"
        placeholder="Email"
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Phone */}
      <input
        type="tel"
        placeholder="Phone"
        className="w-full border rounded-md px-4 py-2 focus:ring-2 focus:ring-mainColor outline-none"
      />

      {/* Password */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
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
        disabled
      >
        CREATE
      </button>
    </div>
  );
}

export default RegisterUser;

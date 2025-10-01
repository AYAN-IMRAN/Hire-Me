import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      toast.success("🎉 Account created! Please login.");
      setName(""); setEmail(""); setPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("❌ Signup failed: " + (err.message || err));
    }
  };



  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0B0F19] px-4">
      <div className="w-full max-w-md bg-[#1A1F2E] p-6 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white text-center">Sign Up 🚀</h2>

        <form onSubmit={handleSignup} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;

import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      toast.success(`✅ Welcome back ${user.name || "User"}!`);

      setEmail(""); setPassword("");

      setTimeout(() => {
        const role = user?.prefs?.role;
        if (role === "company") navigate("/company-dashboard");
        else if (role === "seeker") navigate("/profile");
        else navigate("/onboarding");
      }, 1500);
    } catch (err) {
      console.error("Login error:", err);
      toast.error("❌ Invalid credentials or server error");
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0B0F19] px-4">
      <div className="w-full max-w-md bg-[#1A1F2E] p-6 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white text-center">Login 🔑</h2>

        <form onSubmit={handleLogin} className="mt-6 flex flex-col gap-4">
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-gray-400 text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-indigo-400 cursor-pointer hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;

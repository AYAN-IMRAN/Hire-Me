import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Auth() {
  const { register, login } = useAuth();
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("seeker");

  // Common fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Seeker fields
  const [fullName, setFullName] = useState("");
  const [expertise, setExpertise] = useState("");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await register({
        email,
        password,
        fullName,
        role,
        expertise,
        companyName,
        website,
      });

      toast.success("🎉 Account created successfully! Redirecting...");
      
      // Fields clear
      setEmail("");
      setPassword("");
      setFullName("");
      setExpertise("");
      setCompanyName("");
      setWebsite("");

      // Navigate after delay
      setTimeout(() => {
        if (role === "company") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      }, 2000);
    } catch (err) {
      toast.error("❌ Failed to register. Please try again.");
    }
  };

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);

      toast.success("✅ Logged in successfully! Redirecting...");

      // Fields clear
      setEmail("");
      setPassword("");

      // Navigate after delay
      setTimeout(() => {
        if (user?.prefs?.role === "company") {
          navigate("/dashboard");
        } else {
          navigate("/profile");
        }
      }, 2000);
    } catch (err) {
      toast.error("❌ Invalid email or password.");
    }
  };

  // Handle Form Submit
  const handleSubmit = (e) => {
    if (isLogin) {
      handleLogin(e);
    } else {
      handleRegister(e);
    }
  };

  return (
    <div className="bg-[#0B0F19] min-h-screen overflow-hidden flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl rounded-2xl shadow-lg bg-[#1A1F2E] p-6 sm:p-8 border border-gray-800 relative">
        
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            {isLogin
              ? "Login to continue your journey with HireMe"
              : "Join HireMe and unlock your career opportunities"}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          {!isLogin && (
            <>
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Register As
                </label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="seeker">🎯 Job Seeker</option>
                  <option value="company">🏢 Company</option>
                </select>
              </div>

              {/* Name / Company field */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {role === "company" ? "Company Name" : "Full Name"}
                </label>
                <input
                  type="text"
                  value={role === "company" ? companyName : fullName}
                  onChange={(e) =>
                    role === "company"
                      ? setCompanyName(e.target.value)
                      : setFullName(e.target.value)
                  }
                  placeholder={
                    role === "company"
                      ? "Enter your company name"
                      : "Enter your full name"
                  }
                  className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}

          {/* Email + Password */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Only for login */}
          {isLogin && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-700 bg-[#0B0F19] text-indigo-500 focus:ring-indigo-500"
                />
                Remember me
              </label>
            </div>
          )}

          {/* Seeker Extra */}
          {!isLogin && role === "seeker" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Expertise
              </label>
              <select
                value={expertise}
                onChange={(e) => setExpertise(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select expertise</option>
                <option>👨‍💻 Developer</option>
                <option>🎨 Designer</option>
                <option>📊 Data Analyst</option>
                <option>📱 Mobile Engineer</option>
                <option>🛠 Other</option>
              </select>
            </div>
          )}

          {/* Company Extra */}
          {!isLogin && role === "company" && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourcompany.com"
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-md hover:scale-[1.02] transition"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Switch */}
        <p className="text-gray-400 text-sm mt-6 text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:underline"
          >
            {isLogin ? "Register here" : "Login here"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;

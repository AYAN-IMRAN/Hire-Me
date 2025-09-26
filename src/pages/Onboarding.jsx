import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


function Onboarding() {
  const { updatePrefs, user } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState(user?.prefs?.role || "");
  const [expertise, setExpertise] = useState(user?.prefs?.expertise || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return toast.error("⚠️ Please choose a role.");
    setLoading(true);
    try {
      await updatePrefs({ role, expertise });
      toast.success("🎉 Profile setup complete!");
      setTimeout(() => {
        if (role === "company") navigate("/company-dashboard");
        else navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error("updatePrefs error:", err);
      toast.error("❌ Failed to save: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex h-screen w-full items-center justify-center bg-[#0B0F19] px-4">
      <div className="w-full max-w-md bg-[#1A1F2E] p-6 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          Complete Your Profile 📝
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Role */}
          <div>
            <label className="block text-gray-300 mb-1">Choose Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
              required
            >
              <option value="">-- Select --</option>
              <option value="seeker">Job Seeker</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Expertise */}
          <div>
            <label className="block text-gray-300 mb-1">
              Expertise / Industry
            </label>
            <input
              type="text"
              placeholder="e.g. Web Development, Marketing"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg cursor-pointer bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Saving..." : "Finish Setup"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Onboarding;

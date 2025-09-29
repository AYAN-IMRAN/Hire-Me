import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
 import { Permission, Role } from "appwrite";
import { tableDB } from "../services/appwrite";

function Onboarding() {
  const { updatePrefs, user } = useAuth();
  const navigate = useNavigate();

  const [role, setRole] = useState(user?.prefs?.role || "");
  const [expertise, setExpertise] = useState(user?.prefs?.expertise || "");

  // Seeker fields
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState("");
  const [resumeLink, setResumeLink] = useState("");

  // Company fields
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role) return toast.error("⚠️ Please choose a role.");
    setLoading(true);

    try {
      // 1. Save prefs in auth
      await updatePrefs({ role, expertise });

      // 2. Save profile in Appwrite DB
    

await tableDB.createRow({
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  tableId: import.meta.env.VITE_APPWRITE_PROFILE_TABLE_NAME, // profiles table
  rowId: ID.unique(),
  data: {
    userId: user.$id,
    role,
    name: user.name || "Unnamed",

    // seeker only
    bio: role === "seeker" ? bio : null,
    skills: role === "seeker" ? skills : null,
    resumeLink: role === "seeker" ? resumeLink : null,

    // company only
    companyName: role === "company" ? companyName : null,
    industry: role === "company" ? industry : null,
    description: role === "company" ? description : null,
  },
  permissions: [
    Permission.read(Role.user(user.$id)),
    Permission.update(Role.user(user.$id)),
    Permission.delete(Role.user(user.$id)),
  ],
});


      toast.success("🎉 Profile setup complete!");

      setTimeout(() => {
        if (role === "company") navigate("/company-dashboard");
        else navigate("/profile");
      }, 1500);
    } catch (err) {
      console.error("onboarding error:", err);
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

          {/* If seeker → extra fields */}
          {role === "seeker" && (
            <>
              <textarea
                placeholder="Your Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 h-24"
              />
              <input
                type="text"
                placeholder="Skills (comma separated)"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
              />
              <input
                type="url"
                placeholder="Resume Link"
                value={resumeLink}
                onChange={(e) => setResumeLink(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
              />
            </>
          )}

          {/* If company → extra fields */}
          {role === "company" && (
            <>
              <input
                type="text"
                placeholder="Company Name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
              />
              <input
                type="text"
                placeholder="Industry"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700"
              />
              <textarea
                placeholder="Company Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-[#0B0F19] text-white border border-gray-700 h-24"
              />
            </>
          )}

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

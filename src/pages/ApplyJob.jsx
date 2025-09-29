import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tableDB } from "../services/appwrite";
import { motion } from "framer-motion";
import Loader from "../components/ui/Loader";

function ApplyJob() {
  const { jobId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [resumeLink, setResumeLink] = useState("");
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resumeLink || !intro) return alert("Please fill all fields");

    setLoading(true);
    try {
      await tableDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_APPLICATIONS_TABLE_NAME,
        rowId: import.meta.ID.unique(),
        data: {
          jobId,
          seekerId: user.$id,
          resumeLink,
          intro,
          status: "pending",
        },
      });
      alert("✅ Application submitted!");
      navigate("/jobs");
    } catch (err) {
      console.error("❌ Application error:", err);
      alert("Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0F19] px-4 py-10">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-[#1A1F2E] p-8 rounded-2xl shadow-lg border border-gray-800 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-center text-white">🚀 Apply for Job</h2>

        <label className="flex flex-col gap-1 text-gray-300">
          Resume Link
          <input
            type="url"
            placeholder="Paste your resume link (Google Drive / Dropbox)"
            value={resumeLink}
            onChange={(e) => setResumeLink(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#242B3A] border border-gray-700 focus:border-indigo-500 outline-none text-white placeholder-gray-400"
            required
          />
        </label>

        <label className="flex flex-col gap-1 text-gray-300">
          Cover Letter / Intro
          <textarea
            placeholder="Write a brief intro about yourself"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className="w-full p-3 rounded-lg bg-[#242B3A] border border-gray-700 focus:border-indigo-500 outline-none text-white placeholder-gray-400"
            rows={5}
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 cursor-pointer rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 font-semibold text-white hover:opacity-90 transition"
        >
          {loading ? <Loader size={20} /> : "Submit Application"}
        </button>
      </motion.form>
    </div>
  );
}

export default ApplyJob;

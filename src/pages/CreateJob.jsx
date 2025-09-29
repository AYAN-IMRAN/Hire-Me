import React, { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { tableDB } from "../services/appwrite";
import { ID, Permission, Role } from "appwrite";

function CreateJob() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("✅ Submit chal gaya");

    if (!title || !shortDesc || !location || !category) {
      toast("Please fill required fields.");
      return;
    }

    if (!user) {
      toast("You must be logged in.");
      return;
    }

    setLoading(true);
    try {
      const res = await tableDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_JOBS_TABLE_NAME, 
        rowId: ID.unique(),
        data: {
          title,
          shortDesc,
          salary,
          location,
          category,
          status: "open",
          companyId: user.$id,
          companyName: user?.prefs?.companyName || user?.name || "",
        },
      });




      console.log("✅ Job Created:", res);
      toast("Job posted successfully ✅");

      // Reset form
      setTitle("");
      setShortDesc("");
      setSalary("");
      setLocation("");
      setCategory("");

      navigate("/company-dashboard");
    } catch (err) {
      console.error("❌ Create Job Error:", err);
      toast("Failed to post job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#0B0F19] text-white px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-[#1A1F2E] p-8 rounded-2xl shadow-lg space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-4">💼 Post a Job</h2>

        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#242B3A] border border-gray-700"
          required
        />

        <textarea
          placeholder="Short Description"
          value={shortDesc}
          onChange={(e) => setShortDesc(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#242B3A] border border-gray-700"
          rows={3}
          required
        />

        <input
          type="text"
          placeholder="Salary (optional)"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#242B3A] border border-gray-700"
        />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#242B3A] border border-gray-700"
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#242B3A] border border-gray-700"
          required
        >
          <option value="">Select Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Mobile">Mobile</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-500 cursor-pointer hover:bg-indigo-600 px-4 py-2 rounded-lg font-medium"
        >
          {loading ? "Posting..." : "🚀 Post Job"}
        </button>
      </form>
    </div>
  );
}

export default CreateJob;

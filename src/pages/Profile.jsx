import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Query } from "appwrite";
import { tableDB } from "../services/appwrite";
import { motion } from "framer-motion";
import { Bookmark, Briefcase, Save } from "lucide-react";
import Tag from "../components/Tag";
import Loader from "../components/ui/Loader";

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("applied");

  // Fetch profile
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        setLoading(true);
        const res = await tableDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_PROFILE_TABLE_NAME,
          queries: [Query.equal("userId", user.$id)],
        });

        if (res?.rows?.length > 0) {
          setProfile(res.rows[0]);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // Fetch seeker applications
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await tableDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_APPLICATIONS_TABLE_NAME,
          queries: [Query.equal("seekerId", user.$id)],
        });
        setApplications(res.rows || []);
      } catch (err) {
        console.error("Applications fetch error:", err);
      }
    })();
  }, [user]);

  const renderAppliedJobs = () => {
    if (applications.length === 0) {
      return (
        <p className="text-gray-400 text-center py-6 bg-[#181C29] rounded-xl border border-gray-700">
          ❌ No jobs applied yet
        </p>
      );
    }

    return applications.map((app, index) => (
      <motion.div
        key={app.$id}
        initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        className="p-4 bg-[#1A1F2E] rounded-xl border border-gray-800 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h3 className="text-lg font-semibold">{app.jobTitle || "Applied Job"}</h3>
          <p className="text-gray-400 text-sm">{app.companyName || "Unknown Company"}</p>
          {app.resumeLink && (
            <a
              href={app.resumeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 underline text-sm mt-1 block"
            >
              View Resume
            </a>
          )}
        </div>
        {app.status && <Tag label={app.status} />}
      </motion.div>
    ));
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Profile not found ❌
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel (unchanged) */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold">
            {profile.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h2 className="mt-3 text-xl font-bold text-center">{profile.name}</h2>
          <p className="text-gray-400 text-sm text-center">{user?.email}</p>

          {/* Details */}
          <div className="mt-6 space-y-4 w-full">
            <p>
              <span className="text-gray-400 text-sm">Role: </span>
              {profile.role}
            </p>

            {profile.role === "seeker" && (
              <>
                <p>
                  <span className="text-gray-400 text-sm">Bio: </span>
                  {profile.bio || "Not provided"}
                </p>
                <p>
                  <span className="text-gray-400 text-sm">Skills: </span>
                  {profile.skills || "Not provided"}
                </p>
                {profile.resumeLink && (
                  <a
                    href={profile.resumeLink}
                    target="_blank"
                    className="text-indigo-400 underline text-sm"
                  >
                    View Resume
                  </a>
                )}
              </>
            )}

            {profile.role === "company" && (
              <>
                <p>
                  <span className="text-gray-400 text-sm">Company: </span>
                  {profile.companyName}
                </p>
                <p>
                  <span className="text-gray-400 text-sm">Industry: </span>
                  {profile.industry}
                </p>
                <p>
                  <span className="text-gray-400 text-sm">About: </span>
                  {profile.description}
                </p>
              </>
            )}
          </div>
        </motion.div>

        {/* Right Panel*/}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-2 bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col"
        >
          {/* Tabs */}
          <div className="flex flex-wrap gap-6 border-b border-gray-700 pb-3 mb-6">
            <button
              onClick={() => setActiveTab("applied")}
              className={`flex items-center gap-2 pb-2 transition ${
                activeTab === "applied"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Briefcase size={18} /> Applied
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 pb-2 transition ${
                activeTab === "saved"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Save size={18} /> Saved
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`flex items-center gap-2 pb-2 transition ${
                activeTab === "bookmarks"
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              <Bookmark size={18} /> Bookmarks
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex flex-col gap-4">
            {activeTab === "applied" && renderAppliedJobs()}
            {activeTab === "saved" && (
              <p className="text-gray-400 text-center py-6 bg-[#181C29] rounded-xl border border-gray-700">
                💾 Saved jobs coming soon
              </p>
            )}
            {activeTab === "bookmarks" && (
              <p className="text-gray-400 text-center py-6 bg-[#181C29] rounded-xl border border-gray-700">
                🔖 Bookmarked jobs coming soon
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;

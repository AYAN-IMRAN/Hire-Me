import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, CheckCircle, XCircle, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { tableDB } from "../services/appwrite";
import { Query } from "appwrite";

function CompanyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch company profile
  useEffect(() => {
    if (!user) return;
    (async () => {
      try {
        const res = await tableDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_PROFILE_TABLE_NAME,
          queries: [Query.equal("userId", user.$id)],
        });
        if (res.rows.length > 0) {
          setCompany(res.rows[0]);
        }
      } catch (err) {
        console.error("Company fetch error:", err);
      }
    })();
  }, [user]);

  // Fetch applications for this company
  useEffect(() => {
    if (!company) return;
    (async () => {
      try {
        const res = await tableDB.listRows({
          databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
          tableId: import.meta.env.VITE_APPWRITE_APPLICATIONS_TABLE_NAME,
          queries: [Query.equal("companyId", company.userId)],
        });
        setApplications(res.rows || []);
      } catch (err) {
        console.error("Applications fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [company]);

  const handleAction = async (appId, status) => {
    try {
      await tableDB.updateRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_APPLICATIONS_TABLE_NAME,
        rowId: appId,
        data: { status },
      });
      setApplications((prev) =>
        prev.map((app) => (app.$id === appId ? { ...app, status } : app))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  if (!company || loading) {
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Loading company profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 md:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Panel: Company Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800 flex flex-col items-center"
        >
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 flex items-center justify-center text-2xl font-bold">
            {company.companyName?.charAt(0).toUpperCase() || "C"}
          </div>
          <h2 className="mt-3 text-xl font-bold text-center">{company.companyName}</h2>
          <p className="text-gray-400 text-sm text-center">{user?.email}</p>

          <div className="mt-6 space-y-4 w-full">
            <p className="text-gray-400 text-sm">Role</p>
            <p className="font-medium">{company.role}</p>

            <p className="text-gray-400 text-sm">Industry</p>
            <p className="font-medium">{company.industry}</p>

            <p className="text-gray-400 text-sm">About</p>
            <p className="font-medium">{company.description}</p>
          </div>
        </motion.div>

        {/* Right Panel: Applications + Post Job */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="lg:col-span-2 bg-[#1A1F2E] rounded-2xl p-6 shadow-lg border border-gray-800"
        >
          <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Briefcase size={20} /> Applications
            </h2>
            <button
              onClick={() => navigate("/create-job")}
              className="flex items-center gap-2 cursor-pointer bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium"
            >
              <Plus size={18} /> Post Job
            </button>
          </div>

          {/* Applications List */}
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {applications.length === 0 ? (
              <p className="text-gray-400">No applications yet.</p>
            ) : (
              applications.map((app, index) => (
                <motion.div
                  key={app.$id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="p-4 bg-[#242B3A] rounded-xl border border-gray-700 shadow-sm flex justify-between flex-col sm:flex-row gap-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{app.seekerName || "Applicant"}</h3>
                    <p className="text-gray-400 text-sm">Intro: {app.intro}</p>
                    {app.resumeLink && (
                      <a
                        href={app.resumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-400 text-sm underline mt-1 block"
                      >
                        View Resume
                      </a>
                    )}
                  </div>

                  {app.status === "pending" ? (
                    <div className="flex gap-2 self-start sm:self-center mt-2 sm:mt-0">
                      <button
                        onClick={() => handleAction(app.$id, "accepted")}
                        className="flex items-center gap-1 bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-sm"
                      >
                        <CheckCircle size={16} /> Accept
                      </button>
                      <button
                        onClick={() => handleAction(app.$id, "rejected")}
                        className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                      >
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  ) : (
                    <span
                      className={`px-3 py-1 rounded text-xs font-medium self-start sm:self-center mt-2 sm:mt-0 ${
                        app.status === "accepted"
                          ? "bg-green-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {app.status.toUpperCase()}
                    </span>
                  )}
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CompanyDashboard;

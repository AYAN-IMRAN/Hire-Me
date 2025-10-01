import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import Tag from "./Tag";
import { tableDB } from "../services/appwrite";
import { ID } from "appwrite";
import { toast } from "sonner";
import { Bookmark, BookmarkCheck } from "lucide-react";

function JobCard({ job, index }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isBookmarked, setIsBookmarked] = useState(false); 

  // Apply handler
  const handleApply = () => {
    if (!user) {
      navigate("/signup");
    } else if (user.prefs?.role === "seeker") {
      const jobId = job?.$id || job?.id || job?._id;
      if (!jobId) {
        console.error("❌ No jobId found in job object:", job);
        return toast.error("Job ID not found, cannot apply.");
      }
      navigate(`/apply-job/${jobId}`);
    } else {
      console.log("Only seekers can apply to jobs");
    }
  };

  // Bookmark handler
  const handleBookmark = async () => {
    if (!user) return navigate("/signup");

    try {
      await tableDB.createRow({
        databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
        tableId: import.meta.env.VITE_APPWRITE_BOOKMARKS_TABLE_NAME,
        rowId: ID.unique(),
        data: {
          jobId: job.$id,
          seekerId: user.$id,
          jobTitle: job.title,
          companyName: job.companyName,
        },
      });
      setIsBookmarked(true); 
      toast.success("✅ Job bookmarked!");
    } catch (err) {
      console.error("❌ Bookmark error:", err);
      toast.error("Failed to bookmark");
    }
  };



  return (
  <motion.div
  initial={{ opacity: 0,}}
  animate={{ opacity: 1,}}
  transition={{
    duration: 0.4,
    ease: "easeOut",
  }}
  className="p-6 bg-[#1A1F2E] rounded-xl border border-gray-800 shadow-md flex flex-col gap-4"
>
      {/* Job Title + Company + Bookmark */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-400 text-sm">{job.companyName}</p>
        </div>

        {user?.prefs?.role === "seeker" && (
          <motion.button
            onClick={handleBookmark}
            whileTap={{ scale: 0.8 }}
            animate={{ rotate: isBookmarked ? 360 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
            className="text-gray-400 cursor-pointer hover:text-indigo-400 transition"
          >
            {isBookmarked ? (
              <BookmarkCheck size={22} className="text-indigo-400" />
            ) : (
              <Bookmark size={22} />
            )}
          </motion.button>
        )}
      </div>

      {/* Short Description */}
      <p className="text-sm text-gray-300 line-clamp-3">{job.shortDesc}</p>

      {/* Tags Section */}
      <div className="flex flex-wrap gap-2 mt-2">
        <Tag label={`📍 ${job.location}`} color="gray" />
        <Tag label={`💰 ${job.salary || "Not disclosed"}`} color="violet" />
        <Tag label={`📂 ${job.category}`} color="indigo" />
        <Tag
          label={job.status === "open" ? "Open" : "Closed"}
          color={job.status === "open" ? "green" : "red"}
        />
      </div>

      {/* Apply Button */}
      <div className="mt-4">
        <Button className="cursor-pointer" onClick={handleApply}>
          Apply Now
        </Button>
      </div>
    </motion.div>
  );
}

export default JobCard;

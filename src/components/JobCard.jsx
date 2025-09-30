import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "./ui/Button";
import Tag from "./Tag";

function JobCard({ job, index }) {
  const { user } = useAuth();
  const navigate = useNavigate();

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


 
  const direction = index % 2 === 0 ? -40 : 40;

  return (
    <motion.div
      initial={{ opacity: 0, x: direction }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      className="p-6 bg-[#1A1F2E] rounded-xl border border-gray-800 shadow-md flex flex-col gap-4"
    >
      {/* Job Title + Company */}
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-400 text-sm">{job.companyName}</p>
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
        <Button className="cursor-pointer" onClick={handleApply}>Apply Now</Button>
      </div>
    </motion.div>
  );
}

export default JobCard;

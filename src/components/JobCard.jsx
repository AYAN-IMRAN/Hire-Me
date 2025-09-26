import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Tag from "./Tag";
import Button from "./ui/Button";

function JobCard({ job, index }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) {
      //  Redirect if not logged in
      navigate("/signup");
    } else {
      //  Apply job logic (API call etc.)
      console.log("Applied to:", job.title);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1, 
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.01,
        boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
      }}
      className="p-6 bg-[#1A1F2E] rounded-xl border border-gray-800 
                 shadow-md flex flex-col gap-4 cursor-pointer"
    >
      {/* Job Title + Company */}
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <p className="text-gray-400 text-sm">{job.company}</p>
      </div>

      {/* Short Description */}
      <p className="text-sm text-gray-300 line-clamp-3">{job.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {job.tags?.map((tag, idx) => (
          <Tag key={idx}>{tag}</Tag>
        ))}
      </div>

      {/* Apply Button */}
      <div className="mt-4">
        <Button onClick={handleApply}>Apply Now</Button>
      </div>
    </motion.div>
  );
}

export default JobCard;

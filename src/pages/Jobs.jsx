import React, { useState,useEffect } from "react";
import JobCard from "../components/JobCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function JobsSection() {
  const [search, setSearch] = useState("");
  const [job, setJob] = useState("")
  const [company, setCompany] = useState("");

  // Dummy job data
  // const jobs = [
  //   {
  //     id: 1,
  //     title: "Frontend Developer",
  //     company: "TechCorp",
  //     description: "Build modern UI with React, Tailwind, and TypeScript.",
  //     type: "Remote",
  //     status: "Full Time",
  //   },
  //   {
  //     id: 2,
  //     title: "Backend Engineer",
  //     company: "Cloudify",
  //     description: "Work on scalable APIs and microservices with Node.js.",
  //     type: "Onsite",
  //     status: "Contract",
  //   },
  //   {
  //     id: 3,
  //     title: "UI/UX Designer",
  //     company: "Creative Studio",
  //     description: "Design sleek and modern interfaces for web & mobile apps.",
  //     type: "Hybrid",
  //     status: "Internship",
  //   },
  //   {
  //     id: 4,
  //     title: "Data Scientist",
  //     company: "AI Labs",
  //     description: "Work with big data and ML models for real-time analytics.",
  //     type: "Remote",
  //     status: "Full Time",
  //   },
  // ];


   useEffect(() => {
      (async () => {
        try {
          const res = await tableDB.listRows({
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    tableId: import.meta.env.VITE_APPWRITE_JOBS_TABLE_NAME,
    queries: [
      Query.equal("jobId", user.$id) 
    ]
  });
  
  
          if (res && res.rows.length > 0) {
            setJob(res.rows[0]); 
          }
        } catch (err) {
          console.error("Jobs fetch error:", err);
        }
      })();
    }, []);


  // Filtered jobs
  // const filteredJobs = jobs.filter(
  //   (job) =>
  //     job.title.toLowerCase().includes(search.toLowerCase()) &&
  //     job.company.toLowerCase().includes(company.toLowerCase())
  // );

  return (
    <section className="min-h-screen bg-[#0B0F19] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            🚀 Browse Jobs
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Find your next opportunity from top companies worldwide.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[#1A1F2E] p-5 rounded-2xl shadow-md border border-gray-800 
                     flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-10"
        >
          {/* Job Title / Category */}
          <div className="flex-1 w-full relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search job title or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B0F19] 
                         border border-gray-700 focus:border-indigo-500 
                         outline-none text-sm md:text-base"
            />
          </div>

          {/* Company Filter */}
          <div className="flex-1 w-full relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search by company..."
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0B0F19] 
                         border border-gray-700 focus:border-indigo-500 
                         outline-none text-sm md:text-base"
            />
          </div>

          {/* Search Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-xl bg-gradient-to-r 
                       from-indigo-500 to-violet-500 font-semibold 
                       hover:opacity-90 transition text-sm md:text-base"
          >
            Search
          </motion.button>
        </motion.div>

        {/* Jobs Grid */}
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {job.length > 0 ? (
            job.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <p className="text-gray-400 col-span-full text-center">
              No jobs found 😢
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default JobsSection;

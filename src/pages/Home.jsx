import React from "react";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div className="bg-[#0B0F19] min-h-screen text-white">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-25 pb-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Find Your <span className="text-indigo-400">Dream Job</span> <br />
            or Hire Top Talent.
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg">
            HireMe connects job seekers with companies faster, smarter, and
            easier. Apply with a single click and manage your career
            effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/jobs"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 shadow hover:shadow-lg hover:scale-105 transition-transform"
            >
              Browse Jobs
            </a>
            <a
              href="/login"
              className="px-6 py-3 rounded-lg border border-indigo-400 text-indigo-400 hover:bg-indigo-500 hover:text-white transition"
            >
              Get Started
            </a>
          </div>
        </div>


        {/* Right Side Image */}
        <div className="relative hidden md:block">
          <img
            src="/images/hero-section.png"
            alt="Professional job illustration"
            className="rounded-2xl shadow-lg"
          />
          <div className="absolute -bottom-6 -right-6 bg-indigo-500/20 w-40 h-40 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Trusted Companies */}
      <section className="py-16 px-6 max-w-7xl mx-auto text-center">
        <h2 className="text-gray-400 mb-8">Trusted by Top Companies</h2>
        <div className="flex flex-wrap justify-center gap-10 opacity-80">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
            alt="netflix"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
            alt="microsoft"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Spotify_logo_with_text.svg"
            alt="spotify"
            className="h-8"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
            alt="google"
            className="h-8"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature Card */}
        {[
          {
            title: "Post Jobs Easily",
            desc: "Companies can post jobs in just a few clicks.",
            icon: "💼",
          },
          {
            title: "One-Click Apply",
            desc: "Job seekers can apply instantly with their profile.",
            icon: "⚡",
          },
          {
            title: "Save Jobs",
            desc: "Bookmark jobs and apply later anytime.",
            icon: "⭐",
          },
          {
            title: "Smart Dashboards",
            desc: "Track applications & job posts in real time.",
            icon: "📊",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-6 bg-[#1A1F2E] rounded-2xl shadow-lg hover:scale-105 hover:shadow-indigo-500/20 transition"
          >
            <div className="text-3xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className="text-gray-400">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 border-t border-white/10">
        © 2025 HireMe. All rights reserved.
      </footer>
    </div>
  );
}

export default Home;

import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  console.log("TOKEN FROM LANDING PAGE: " + token);

  const dashBoardNavigateHandler = () => {
    // if (token) navigate("/dashboard");
    // else navigate("/login");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] lg:px-14 sm:px-8 px-4 theme-section">
      {/* HERO */}
      <div className="lg:flex-row flex-col lg:py-6 pt-16 lg:gap-10 gap-10 flex justify-between items-center max-w-6xl mx-auto">
        {/* Left text */}
        <div className="flex-1">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center text-[11px] font-semibold tracking-wide uppercase bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full mb-3"
          >
            URL Shortner · Smart link management
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="theme-heading font-bold font-roboto md:text-5xl sm:text-4xl text-3xl md:leading-[55px] sm:leading-[45px] leading-10 lg:w-full md:w-[75%] w-full"
          >
            Make every link{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500">
              short, clean
            </span>{" "}
            and ready to share.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="theme-body-text text-sm md:text-base my-5 md:w-[80%] w-full leading-relaxed"
          >
            URL Shortner helps you turn long, messy URLs into simple, memorable
            links in seconds. Perfect for personal projects, portfolios,
            campaigns or anything you want to share with a clean, professional
            touch.
          </motion.p>

          <div className="flex flex-wrap items-center gap-3">
            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              onClick={dashBoardNavigateHandler}
              className="bg-custom-gradient w-40 text-white rounded-md py-2 text-sm shadow-md hover:shadow-lg hover:translate-y-[1px] transition-all"
            >
              Manage links
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              onClick={dashBoardNavigateHandler}
              className="border border-btnColor w-40 text-btnColor rounded-md py-2 text-sm bg-white/90 hover:bg-slate-50 transition-colors"
            >
              Create short link
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 text-xs theme-muted mt-1"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>No credit card, no signup required to start.</span>
            </motion.div>
          </div>

          {/* small stats row */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 grid sm:grid-cols-3 gap-4 text-xs sm:text-sm"
          >
            <div className="rounded-xl shadow-sm border px-4 py-3 theme-card">
              <p className="theme-heading font-semibold">Instant setup</p>
              <p className="theme-muted">
                Shorten your first link in seconds.
              </p>
            </div>
            <div className="rounded-xl shadow-sm border px-4 py-3 theme-card">
              <p className="theme-heading font-semibold">Clean dashboard</p>
              <p className="theme-muted">Designed for focus, not noise.</p>
            </div>
            <div className="rounded-xl shadow-sm border px-4 py-3 theme-card">
              <p className="theme-heading font-semibold">Built by devs</p>
              <p className="theme-muted">
                React + Spring Boot under the hood.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right illustration with rotating circle */}
        <div className="flex-1 flex justify-center w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative flex items-center justify-center"
          >
            {/* soft background glow */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-200/40 via-sky-200/40 to-emerald-200/40 blur-3xl opacity-70" />

            {/* rotating gradient ring */}
            <motion.div
              className="absolute h-[260px] w-[260px] sm:h-[320px] sm:w-[320px] rounded-full border-4 border-transparent bg-gradient-to-tr from-indigo-400 via-sky-400 to-emerald-400"
              style={{
                padding: "3px",
                backgroundClip: "padding-box",
              }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 18,
                ease: "linear",
              }}
            />

            {/* inner circle, using theme-card */}
            <div className="absolute h-[230px] w-[230px] sm:h-[290px] sm:w-[290px] rounded-full shadow-xl border theme-card" />

            {/* logo itself */}
            <motion.img
              src="/images/img2.png"
              alt="URL Shortner illustration"
              className="relative sm:w-[210px] w-[180px] object-contain"
              whileHover={{ scale: 1.05, rotate: -3 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            />
          </motion.div>
        </div>
      </div>

      {/* FEATURES / TRUST SECTION */}
      <div className="sm:pt-12 pt-8 max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="theme-heading font-roboto font-bold lg:w-[60%] md:w-[70%] sm:w-[80%] mx-auto text-3xl text-center"
        >
          Built for creators, students, and teams who care about clean links.
        </motion.p>

        <div className="pt-6 pb-8 grid lg:gap-7 gap-4 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 mt-4">
          <Card
            title="Simple URL Shortening"
            desc="Paste a long URL, get a short one. No confusing options, just a clean and focused flow for everyday use."
          />
          <Card
            title="Powerful Analytics"
            desc="Ready for future analytics: click tracking, geo insights, and referral data as you scale the project."
          />
          <Card
            title="Secure by design"
            desc="Backed by Spring Boot APIs and modern best practices, so redirects stay safe and predictable."
          />
          <Card
            title="Fast & deployment-ready"
            desc="Optimized React + Vite frontend that’s easy to deploy on Vercel, Netlify, or your favourite platform."
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

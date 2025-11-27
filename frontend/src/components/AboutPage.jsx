import React from "react";
import { motion } from "framer-motion";
import { FaLink, FaShareAlt, FaEdit, FaChartLine } from "react-icons/fa";

const featureCards = [
  {
    icon: <FaLink className="text-indigo-400 text-3xl mr-4 mt-1" />,
    title: "Instant URL Shortening",
    desc: "Turn long, messy links into clean, memorable short URLs in a single click. Paste, shorten, and share — it’s that simple.",
  },
  {
    icon: <FaShareAlt className="text-emerald-400 text-3xl mr-4 mt-1" />,
    title: "Smart Sharing",
    desc: "Share your links across social platforms, chats, and emails without clutter. Short links look professional and are easier to trust.",
  },
  {
    icon: <FaEdit className="text-purple-400 text-3xl mr-4 mt-1" />,
    title: "Custom Aliases",
    desc: "Make your links truly yours with custom aliases. Create branded, readable URLs that are easy to remember and easy to say.",
  },
  {
    icon: <FaChartLine className="text-rose-400 text-3xl mr-4 mt-1" />,
    title: "Analytics Ready",
    desc: "Track how your links perform with click stats and insights (ready for future upgrades). Built to grow with your needs.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 26 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.1 + i * 0.08,
      ease: "easeOut",
    },
  }),
};

const AboutPage = () => {
  return (
    <div className="lg:px-16 sm:px-8 px-5 min-h-[calc(100vh-64px)] pt-6 theme-section">
      <div className="w-full max-w-6xl mx-auto">
        {/* Top card with heading + mini features */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="backdrop-blur-sm rounded-2xl shadow-md border px-6 sm:px-10 py-8 sm:py-10 mb-8 relative overflow-hidden theme-card"
        >
          {/* soft gradient glow */}
          <div className="pointer-events-none absolute -top-12 -right-16 h-40 w-40 rounded-full bg-gradient-to-tr from-indigo-300/40 via-sky-300/40 to-emerald-300/40 blur-3xl" />

          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full mb-3"
          >
            About
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.12 }}
            className="sm:text-4xl text-3xl font-bold theme-heading mb-3"
          >
            About <span className="italic text-indigo-400">URL Shortner</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="theme-body-text text-sm sm:text-base leading-relaxed xl:w-[70%] lg:w-[75%] sm:w-[85%] w-full"
          >
            URL Shortner is a minimal, fast and focused tool for turning long
            links into clean, shareable URLs. Whether you&apos;re sharing
            personal links, project resources, or marketing campaigns, URL
            Shortner keeps everything simple, organized, and ready to share in
            seconds.
          </motion.p>

          {/* mini 3-pill row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="mt-6 grid sm:grid-cols-3 gap-4 text-xs sm:text-sm"
          >
            <div className="relative overflow-hidden group rounded-2xl border border-indigo-100 bg-indigo-50/70 px-4 py-3 shadow-sm">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-indigo-500/8 via-sky-500/8 to-emerald-500/8 transition-opacity duration-200" />
              <div className="relative">
                <p className="font-semibold text-slate-900 mb-0.5">
                  Built for speed
                </p>
                <p className="text-slate-600">
                  No clutter, no distractions. Just paste and shorten.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-2xl border border-emerald-100 bg-emerald-50/70 px-4 py-3 shadow-sm">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-emerald-500/8 via-teal-500/8 to-cyan-500/8 transition-opacity duration-200" />
              <div className="relative">
                <p className="font-semibold text-slate-900 mb-0.5">
                  Developer friendly
                </p>
                <p className="text-slate-600">
                  Clean React frontend &amp; Spring Boot backend.
                </p>
              </div>
            </div>

            <div className="relative overflow-hidden group rounded-2xl border border-rose-100 bg-rose-50/70 px-4 py-3 shadow-sm">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-r from-rose-500/8 via-orange-500/8 to-amber-500/8 transition-opacity duration-200" />
              <div className="relative">
                <p className="font-semibold text-slate-900 mb-0.5">
                  Scalable design
                </p>
                <p className="text-slate-600">
                  UI ready for more features like auth &amp; analytics.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom feature cards with stagger + hover */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {featureCards.map((item, index) => (
            <motion.div
              key={item.title}
              custom={index}
              variants={cardVariants}
              whileHover={{
                y: -3,
                boxShadow: "0 18px 35px rgba(15,23,42,0.18)",
              }}
              className="flex items-start rounded-2xl shadow-sm border px-5 py-4 cursor-default transition-transform theme-card"
            >
              {item.icon}
              <div>
                <h2 className="sm:text-xl text-lg font-semibold theme-heading mb-1">
                  {item.title}
                </h2>
                <p className="theme-body-text text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;

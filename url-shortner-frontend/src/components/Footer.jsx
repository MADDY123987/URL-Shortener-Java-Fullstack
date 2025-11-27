import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-12 bg-slate-950 text-slate-200 pt-6 pb-5 relative z-40">
      {/* thin gradient line on top */}
      <div className="absolute inset-x-0 -top-[2px] h-[2px] bg-custom-gradient" />

      <div className="max-w-6xl mx-auto px-6 lg:px-14">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Brand + text */}
          <div className="text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-1">
              URL{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400">
                Shortner
              </span>
            </h2>
            <p className="text-sm text-slate-400">
              Create clean, shareable links in seconds with a simple, focused tool.
            </p>
          </div>

          {/* Center text */}
          <p className="text-xs sm:text-sm text-slate-500 text-center">
            &copy; {year} URL Shortner · Built with React &amp; Spring Boot.
          </p>

          {/* Social icons */}
          <div className="flex justify-center lg:justify-end space-x-3">
            <a
              href="#"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900/80 hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaFacebook size={18} />
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900/80 hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaTwitter size={18} />
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900/80 hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900/80 hover:bg-slate-800 transition-colors shadow-sm"
            >
              <FaLinkedin size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className="flex flex-col gap-3 px-5 py-6 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-[2px] transition-all duration-200"
    >
      <h1 className="text-indigo-600 text-lg font-bold">{title}</h1>
      <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default Card;

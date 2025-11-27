import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-slate-50 px-6 text-center">
      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-rose-100 mb-4">
        <FaExclamationTriangle className="text-rose-500 text-3xl" />
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
        Something went wrong
      </h1>

      <p className="text-slate-600 mb-6 text-sm sm:text-base">
        {message || "An unexpected error occurred. Please try again."}
      </p>

      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 hover:shadow-md active:scale-95 transition-all"
      >
        Go back home
      </button>
    </div>
  );
};

export default ErrorPage;

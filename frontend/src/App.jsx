// src/App.jsx
import React from "react";
import "./App.css"; // ✅ global styles + theme (theme-page, theme-card, etc.)
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import Footer from "./components/Footer";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ShortenUrlPage from "./components/ShortenUrlPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import ErrorPage from "./components/ErrorPage";

import { useStoreContext } from "./contextApi/ContextApi";

const App = () => {
  const { token } = useStoreContext();

  return (
    <div className="min-h-screen flex flex-col theme-page">
      {/* global toast container for all toast.success / toast.error */}
      <Toaster position="bottom-center" />

      <NavBar />

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shorten" element={<ShortenUrlPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected dashboard */}
          <Route
            path="/dashboard"
            element={
              token ? <DashboardLayout /> : <Navigate to="/login" replace />
            }
          />

          {/* Generic error or 404 route */}
          <Route
            path="/error"
            element={<ErrorPage message="Something went wrong." />}
          />
          <Route path="*" element={<ErrorPage message="Page not found." />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;

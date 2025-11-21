import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import { ContextProvider } from "./contextApi/ContextApi";
import PrivateRoute from "./PrivateRoute";

import NavBar from "./components/NavBar";
import LandingPage from "./components/LandingPage"; // new
import AboutPage from "./components/AboutPage";     // new
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <Router>
          <NavBar />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Public but redirect if already logged in */}
            <Route
              path="/login"
              element={
                <PrivateRoute publicPage>
                  <LoginPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PrivateRoute publicPage>
                  <RegisterPage />
                </PrivateRoute>
              }
            />

            {/* Protected route */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <DashboardLayout />
                </PrivateRoute>
              }
            />

            {/* fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Toaster position="top-center" />
        </Router>
      </ContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;

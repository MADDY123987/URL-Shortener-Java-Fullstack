import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi";

/**
 * Usage:
 * <PrivateRoute>{/* protected stuff *\/}</PrivateRoute>
 * <PrivateRoute publicPage>{/* public page that should redirect if logged in *\/}</PrivateRoute>
 */
export default function PrivateRoute({ children, publicPage = false }) {
  const { token } = useStoreContext();

  if (publicPage) {
    // If already logged in, bounce public pages (e.g. /login) to dashboard
    return token ? <Navigate to="/dashboard" replace /> : children;
  }

  // For protected pages
  return !token ? <Navigate to="/login" replace /> : children;
}

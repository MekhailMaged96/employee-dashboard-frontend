import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Blocks unauthenticated users. Optionally restricts by role.
function ProtectedRoute({ roles }) {
  const { isAuthenticated, hasAnyRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles?.length && !hasAnyRole(roles)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;

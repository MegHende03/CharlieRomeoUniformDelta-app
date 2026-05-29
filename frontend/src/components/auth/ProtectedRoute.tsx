import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const storedAuth = localStorage.getItem("auth");

  if (!storedAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
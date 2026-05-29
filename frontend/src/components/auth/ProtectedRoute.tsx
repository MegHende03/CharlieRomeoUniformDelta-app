import { Navigate } from "react-router-dom";

//User cannot access the home page without logging in first. Starts the user on the log in page + wraps <HomePage /> in App.tsx.
//Does the user have 'auth' + JWT in local storage, if so -> send to home page.

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const storedAuth = localStorage.getItem("auth");

  if (!storedAuth) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
import { Navigate } from "react-router-dom";

//Public route -> anyone can access the log in page. Isnt restricted to those who only have a token.
//If token is found in local storage -> send to home page.
//wraps <LogIn /> in App.tsx

type PublicRouteProps = {
  children: React.ReactNode;
};

function PublicRoute({ children }: PublicRouteProps) {

  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;
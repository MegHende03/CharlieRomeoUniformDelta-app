import "./styles/App.css";
import HomePage from "./pages/HomePage.tsx";
import LogIn from "./pages/LogInPage/LogIn.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage/SignUp.tsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.tsx";
import PublicRoute from "./components/auth/PublicRoute.tsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<ProtectedRoute> <HomePage /> </ProtectedRoute>} />
           <Route path="/login" element={<PublicRoute> <LogIn /> </PublicRoute>} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

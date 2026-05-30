import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./context/AuthContext";
import "./styles/index.css";
import App from "./App.tsx";

//Main.tsx is encompassed in AuthProvider (Authorize if user is loged in or out. Handles login persistance) and only contains <App /> component.

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
);

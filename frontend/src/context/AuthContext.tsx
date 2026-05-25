import { createContext, useContext, useState } from "react";
import type { AuthResponse } from "../api/authApi";

type AuthContextType = {
  authUser: AuthResponse | null;
  loginUser: (authResponse: AuthResponse) => void;
  logoutUser: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<AuthResponse | null>(() => {
    const storedAuth = localStorage.getItem("auth");

    if (!storedAuth) {
      return null;
    }

    try {
      return JSON.parse(storedAuth) as AuthResponse;
    } catch {
      return null;
    }
  });

  const loginUser = (authResponse: AuthResponse) => {
    localStorage.setItem("auth", JSON.stringify(authResponse));
    setAuthUser(authResponse);
  };

  const logoutUser = () => {
    localStorage.removeItem("auth");
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

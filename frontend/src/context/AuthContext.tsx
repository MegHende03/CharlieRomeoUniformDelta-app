import { createContext, useContext, useState } from "react";
import type { AuthResponse } from "../api/authApi";

//object that takes an AuthResponse to authorize the user, loginUser to get the response set to the users local storage (signifiying they are loged in), 
//and logOut user, to set the users local Storage "auth" to null if logging out.
type AuthContextType = {
  authUser: AuthResponse | null;
  loginUser: (authResponse: AuthResponse) => void;
  logoutUser: () => void;
};

//React context object. A global variable for react components -> contains AuthContextType objects.
const AuthContext = createContext<AuthContextType | null>(null);

//Login persistance, if user is logged in and page refreshes, user remains logged in.
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

  //log user in by setting localStorage auth
  const loginUser = (authResponse: AuthResponse) => {
    localStorage.setItem("auth", JSON.stringify(authResponse));
    setAuthUser(authResponse);
  };

  //log user out by removing localStorage auth
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

//App.tsx must be wrapped in AuthProvider
//Returns authContext
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}

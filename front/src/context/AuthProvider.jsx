import React, { createContext, useContext, useState, useEffect } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around the app
export default function AuthProvider({ children }) {
  // Fetch initial user from localStorage
  const getInitialAuthUser = () => {
    try {
      const user = localStorage.getItem("Users");
      return user && user !== "undefined" ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Error parsing user from localStorage", error);
      return null;
    }
  };

  const [authUser, setAuthUser] = useState(getInitialAuthUser);

  // Sync authUser state with localStorage
  useEffect(() => {
    if (authUser) {
      localStorage.setItem("Users", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("Users");
    }
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

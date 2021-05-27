import React, { useContext, useState, useEffect } from "react";
import firebaseApp from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const auth = firebaseApp.auth();

  const [user, setUser] = useState(() => auth.currentUser);
  const [loading, setLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(true);

  const value = {
    user,
    darkMode,
    setDarkMode,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  if (loading) return "Loading...";

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

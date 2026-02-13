import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Helper to decode JWT
  const decodeToken = (jwtToken) => {
    try {
      const payload = JSON.parse(atob(jwtToken.split(".")[1]));
      return payload;
    } catch (err) {
      return null;
    }
  };

  // 🔹 Run once on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken) {
      setToken(storedToken);

      // If user exists in storage → use it
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        // 🔥 ensure role exists
        if (!parsedUser.role) {
          const decoded = decodeToken(storedToken);
          parsedUser.role = decoded?.role || "user";
        }

        setUser(parsedUser);
      } else {
        // fallback → build user from token
        const decoded = decodeToken(storedToken);
        if (decoded) {
          setUser({
            id: decoded.id,
            role: decoded.role,
          });
        }
      }
    }

    setLoading(false);
  }, []);

  const login = (token, user) => {
    // 🔥 Ensure role always stored
    const decoded = decodeToken(token);
    const finalUser = {
      ...user,
      role: user.role || decoded?.role || "user",
    };

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(finalUser));

    setToken(token);
    setUser(finalUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        isAuthenticated: !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

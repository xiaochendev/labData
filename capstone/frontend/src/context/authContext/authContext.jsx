import { useCookies } from "react-cookie";
import { createContext, useMemo, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookies, removeCookie] = useCookies();

  const connStr = "http://localhost:3000";

  async function signUp(formData) {
    try {
      let res = await axios.post(`${connStr}/auth/register`, formData);
      setCookies("token", res.data.token);  // Store token immediately
    } catch (error) {
      console.erroror("❌ Registration error:", error.response?.data || error.message);
      throw error; 
    }
  }

  async function login(formData) {
    try {
      let res = await axios.post(`${connStr}/auth/login`, formData);
      setCookies("token", res.data.token);
    } catch (error) {
      console.erroror("❌ Login error:", error.response?.data || error.message);
      throw error; 
    }
  }

  function logout() {
    ["token"].forEach((token) => removeCookie(token));
  }

  const value = useMemo(
    () => ({
      cookies,
      login,
      signUp,
      logout,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

import { useCookies } from "react-cookie";
import { createContext, useMemo, useContext, useEffect, useState } from "react";
import axios from "axios";


const AuthContext = createContext();  

export default function AuthProvider({ children }) {
  const [cookies, setCookies, removeCookie] = useCookies();
  const [user, setUser] = useState(null);   
  const connStr = "http://localhost:3000";

  // Fetch user using token from cookies
  async function fetchUser(tokenFromParam = null) {
      const token = tokenFromParam || cookies.token;
      if (!token) {
        // check if NO token, create guest token
        const guestRes = await axios.post(`${connStr}/auth/guest`);
        const guestToken = guestRes.data.token;
        setCookies('token', guestToken);
        setUser({...guestRes.data.user, isGuest: true});
        return;
      }

    try {
      // check if token exist, try fetch user info (registered user only)
      const res = await axios.get(`${connStr}/auth`, {
        headers: { "x-auth-token": token },
      });
      setUser({...res.data, isGuest:false});    // save user state - Registered user
      console.log("Fetched user:", res.data); 

    } catch (error) {
      if (error.response?.status === 401) {
        try {
          // const decoded = jwtDecode(token);
          // if(decoded.isGuest) {
          //   setUser({id:decoded.id, username: decoded.username, isGuest:true});
          //   return;
          // }

          // // Check if token is a guest token, try guest info
          const guestRes = await axios.get(`${connStr}/auth/guest/info`, {
            headers: {"x-auth-token": token},
          });
          setUser({...guestRes.data, isGuest:true});
          return;       // do not logout
        } catch (guestErr) {
          console.warn("❌ Guest token invalid too, logging out");
          console.error(guestErr.message);
        }

        logout(); // logout if BOTH failed
      } else {
        console.error("❌ Failed to fetch user:", error.message);
        logout();   // clear cookies if token is invalid
      }
    }
  }

  //  Called fetchUser() after login/signup to refresh user state
  async function signUp(formData) {
    console.log("Register payload:", formData);

    try { 
      let res = await axios.post(`${connStr}/auth/register`, formData);
      console.log("Register response:", res.data); 
      
      setCookies("token", res.data.token);  // Store token immediately
      await fetchUser(res.data.token); // Fetch user info after signup
    } catch (error) {
      // console.error("❌ Registration error:", error.response?.data || error.message);
      // throw error; 

      // log errors explicitly, print the array of error objects
      if (error.response?.data?.errors) {
          console.error("❌ Registration errors:", error.response.data.errors);
        } else {
          console.error("❌ Registration error:", error.response?.data || error.message);
        }
        throw error; 
      }
    }


  async function login(formData) {

    if (!formData.email || !formData.password) {
      console.error("❌ Invalid login data:", formData);
      throw new Error("Email and password are required");
    }

    try {
      console.log("Logging in with:", formData);

      let res = await axios.post(`${connStr}/auth/login`, formData);
      setCookies("token", res.data.token);
      await fetchUser(res.data.token);    // use token immediatly 
    } catch (error) {
      console.error("❌ Login error:", error.response?.data || error.message);
      throw error; 
    }
  }

  function logout() {
    ["token"].forEach((token) => removeCookie(token));
    setUser(null);
  }

  // Auto-fetch user when token changes
  useEffect(() => {
    if (cookies.token) {
      fetchUser();
    } else {
      setUser(null);
    }
  }, [cookies.token]); 

  const value = useMemo(
    () => ({
      user,
      cookies,
      login,
      signUp,
      logout,
    }),
    [user, cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

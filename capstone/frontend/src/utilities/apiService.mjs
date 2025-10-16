import axios from "axios";
import { Cookies } from "react-cookie";
const cookies = new Cookies();


let baseURL = "http://localhost:3000";

// getUser using token from cookies
async function getUser() {
  const token = cookies.get("token");

  if (!token) {
    throw new Error("No auth token found");
  }

  const res = await axios.get(`${baseURL}/auth`, {
      headers: {"x-auth-token": token}
    });

  return res.data;
}

async function startAsGuest() {
  let res = await axios.post(`${baseURL}/auth/guest`);
  // const { token, user } = res.data;
  // cookies.set('token', token, {path:'/'})   // Save for authMiddleware to validate
  return res.data     // return token and user
  // return user;      // return user
  // setCookies("token", res.data.token);  // ✅ Save the token
}


export default { getUser, startAsGuest };

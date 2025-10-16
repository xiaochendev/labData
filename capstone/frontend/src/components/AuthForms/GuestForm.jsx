import { useNavigate } from "react-router-dom";
import api from "../../utilities/apiService.mjs"; 
import { Cookies } from "react-cookie";
import style from './Forms.module.css';

const cookies = new Cookies();

export default function GuestForm() {
  const nav = useNavigate();

  async function handleGuestStart(e) {
    e.preventDefault();
    try {
      const res = await api.startAsGuest(); // POST /auth/guest
      cookies.set("token", res.token, { path: "/" });
      nav("/game"); // Go to protected route
    } catch (err) {
      console.error("Guest login failed:", err);
    }
  }

  return (
    <div className={style.forms}>
      <form onSubmit={handleGuestStart}>
        <button type="submit">Continue as Guest</button>
      </form>
    </div>
  );
}

import style from "./Nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext/authContext";

export default function Nav() {
  const { user, cookies, logout } = useAuth();
  const nav = useNavigate();

  function handleLogout() {
    logout();
    nav('/');
  }

  return (
    <nav className={style.nav}>
      <>
        <Link to={"/"}>
          <h3>Home</h3>
        </Link>

        <Link to={"/dashboard"}>
          <h3>dashboard</h3>
        </Link>
        <a>
          <h3 onClick={handleLogout}>Logout</h3>
        </a>
      </>
    </nav>
  );
}

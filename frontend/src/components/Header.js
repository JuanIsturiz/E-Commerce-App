import { FaSignInAlt, FaSignOutAlt, FaUserAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <header className="header">
      <div className="logo">
        <h3 className="logo-title">E-Commerce-App</h3>
      </div>
      <nav className="navbar">
        <ul className="navlist">
          {user ? (
            <li className="list-item" onClick={() => dispatch(logoutUser())}>
              <Link className="link" to="/">
                <FaSignOutAlt /> Log Out
              </Link>
            </li>
          ) : (
            <>
              <li className="list-item">
                <Link className="link" to="/login">
                  <FaUserAlt /> Log In
                </Link>
              </li>
              <li className="list-item">
                <Link className="link" to="/register">
                  <FaSignInAlt /> Sign In
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

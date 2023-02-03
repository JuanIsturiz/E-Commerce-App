import { useEffect } from "react";
import {
  FaClipboard,
  FaShoppingBag,
  FaShoppingCart,
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logoutUser } from "../features/auth/authSlice";
import { getCart, reset } from "../features/cart/cartSlice";
import "./Header.css";

const Header = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartId, items } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!user) return;
    if (pathname.includes("/checkout/cart/success")) return;
    dispatch(getCart(user.id));
  }, [dispatch, user, pathname]);
  const onLogout = () => {
    dispatch(logoutUser());
    dispatch(reset());
    navigate("/login");
  };
  return (
    <header className="header">
      <div className="logo">
        <h3 className="logo-title">E-Commerce-App</h3>
      </div>
      <nav className="navbar">
        <ul className="navlist">
          <li className="list-item">
            <Link className="link" to="/products">
              <FaShoppingBag /> Products
            </Link>
          </li>
          <li className="list-item">
            <Link className="link" to={user ? `/cart/${cartId}` : "/login"}>
              <FaShoppingCart
                style={{
                  fill: !!items.length ? "red" : "black",
                }}
              />{" "}
              Cart
            </Link>
          </li>
          <li className="list-item">
            <Link className="link" to={user ? `/orders/${user.id}` : "/login"}>
              <FaClipboard /> Orders
            </Link>
          </li>
          {user ? (
            <>
              <li className="list-item">
                <Link className="link" to={`/user/${user.id}`}>
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt="user pic"
                      style={{ width: "2rem", height: "2rem" }}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <FaUserAlt />
                  )}{" "}
                  {user.first} {user.last}
                </Link>
              </li>
              <li className="list-item" onClick={onLogout}>
                <Link className="link" to="/">
                  <FaSignOutAlt /> Log Out
                </Link>
              </li>
            </>
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

import {
  FaClipboard,
  FaShoppingBag,
  FaShoppingCart,
  FaUserAlt,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cartId, items } = useSelector((state) => state.cart);
  return (
    <div className="sidebar">
      <h3>
        Hi <span>{user && user.first}</span>!
      </h3>
      <div className="side-icons">
        <div className="side">
          <FaUserAlt />
        </div>
        <div className="side" onClick={() => navigate("/products")}>
          <FaShoppingBag />
        </div>
        <div
          className="side"
          id="cart"
          onClick={() => navigate(`/cart/${cartId}`)}
        >
          <FaShoppingCart />
          {!!items.length && <div>{items.length}</div>}
        </div>
        <div className="side">
          <FaClipboard />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

import { FaShoppingBag, FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./Sidebar.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="sidebar">
      <h3>
        Hi <span>{user.first}</span>!
      </h3>
      <div className="side-icons">
        <div className="side">
          <FaUserAlt />
        </div>
        <div className="side" id="cart">
          <FaShoppingCart />
          <div>1</div>
        </div>
        <div className="side">
          <FaShoppingBag />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

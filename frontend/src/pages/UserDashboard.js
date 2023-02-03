import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getItems } from "../features/cart/cartSlice";

const UserDashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { cartId } = useSelector((state) => state.cart);
  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (!cartId) {
      return;
    }
    dispatch(getItems(user.id));
  }, [user, cartId, navigate, dispatch]);

  return (
    <>
      <div className="main">
        <section className="heading">
          <h1>Dashboard</h1>
        </section>
        <section className="content"></section>
      </div>
    </>
  );
};

export default UserDashboard;

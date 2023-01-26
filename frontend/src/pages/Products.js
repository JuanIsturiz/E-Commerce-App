import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import { getItems } from "../features/cart/cartSlice";
import "./Products.css";

const Products = () => {
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
          <h1>Products</h1>
        </section>
        <section className="content">
          <ProductList />
        </section>
      </div>
    </>
  );
};

export default Products;

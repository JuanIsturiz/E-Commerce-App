import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCartProducts } from "../API/getCartProducts";
import { reset } from "../features/cart/cartSlice";
import { createOrder } from "../features/orders/ordersSlice";

const StripeSuccess = () => {
  const { cartId } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cartId || !user) return;
    getCartProducts(cartId).then((res) => {
      const { products } = res;
      const newProducts = products.map((p) => ({
        product_id: p.product_id,
        product_price: p.product_price,
        quantity: p.quantity,
      }));
      const total = newProducts.reduce(
        (acc, el) => acc + Number(el.product_price.substring(1) * el.quantity),
        0
      );
      dispatch(
        createOrder({ cartId, total, userId: user.id, products: newProducts })
      ).then((res) => {
        dispatch(reset());
      });
    });
  }, [cartId, dispatch, user, navigate]);
  return (
    <section className="content">
      <div className="success">
        <h2>
          Thank you for your purchase,{" "}
          <span style={{ textTransform: "capitalize" }}>{user.first}</span>!
        </h2>
        <button onClick={() => navigate(`/orders/${user.id}`)}>
          Click here to watch your orders
        </button>
      </div>
    </section>
  );
};

export default StripeSuccess;

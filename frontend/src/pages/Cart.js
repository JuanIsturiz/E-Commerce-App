import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCartProducts } from "../API/getCartProducts";
import CartItem from "../components/CartItem";
import Sidebar from "../components/Sidebar";
import "./Cart.css";
const Cart = () => {
  const [items, setItems] = useState([]);
  const { cartId } = useParams();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (cartId === "null") {
      return;
    }
    getCartProducts(cartId).then(({ products }) => {
      setItems(products);
    });
  }, [cartId]);
  return (
    <div className="cart-section">
      <div className="main">
        <section className="heading">
          <h1>Cart</h1>
        </section>
        <section className="content">
          {!items.length ? (
            <h4>
              Sorry{" "}
              <span style={{ textTransform: "capitalize" }}>{user.first}</span>,
              your cart is empty, please add some product first.
            </h4>
          ) : (
            <div className="item-list">
              {items.map((i) => (
                <CartItem key={i.product_id} item={i} />
              ))}
            </div>
          )}
        </section>
      </div>
      <Sidebar />
    </div>
  );
};

export default Cart;

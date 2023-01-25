import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCartProducts } from "../API/getCartProducts";
import CartItem from "../components/CartItem";
import Sidebar from "../components/Sidebar";
import { getItems } from "../features/cart/cartSlice";
import "./Cart.css";
const Cart = () => {
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const { cartId } = useParams();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    if (cartId === "null") {
      return;
    }
    dispatch(getItems(user.id));
    getCartProducts(cartId).then(({ products }) => {
      setItems(products);
    });
  }, [cartId, dispatch, user]);

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.product_id !== id));
  };

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
                <CartItem
                  key={i.product_id}
                  item={i}
                  cartId={Number(cartId)}
                  onDelete={deleteItem}
                />
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

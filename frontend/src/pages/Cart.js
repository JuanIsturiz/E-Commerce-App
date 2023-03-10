import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getCartProducts } from "../API/getCartProducts";
import { stripeCheckout } from "../API/Stripe";
import CartItem from "../components/CartItem";
import Spinner from "../components/Spinner";
import { getItems } from "../features/cart/cartSlice";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);

  const dispatch = useDispatch();
  const { cartId } = useParams();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (cartId === "null") {
      return;
    }
    setIsLoading(true);
    dispatch(getItems(user.id));
    getCartProducts(cartId).then(({ products }) => {
      setItems(products);
      setIsLoading(false);
    });
  }, [cartId, dispatch, user]);

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((i) => i.product_id !== id));
  };

  const onCheckout = () => {
    setIsLoadingStripe(true);
    stripeCheckout(cartId, items).then((res) => {
      setIsLoadingStripe(false);
    });
  };

  if (isLoading || isLoadingStripe) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main">
        <section className="heading">
          <h1>Cart</h1>
          <h2>Manage and see your cart information here</h2>
        </section>
        <section className="content">
          {!items.length ? (
            <h4 className="sorry">
              Sorry{" "}
              <span style={{ textTransform: "capitalize" }}>{user.first}</span>,
              your cart is empty, please add some product first.
            </h4>
          ) : (
            <div className="items-summary">
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
              <div className="summary">
                <h3>Order Summary</h3>
                <div>
                  <h5>
                    Items ({items.reduce((acc, el) => acc + el.quantity, 0)}):{" "}
                    <span style={{ float: "right" }}>
                      $
                      {items
                        .reduce(
                          (acc, el) =>
                            acc +
                            Number(el.product_price.substring(1) * el.quantity),
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </h5>
                  <hr />
                  <h4>
                    Total: $
                    {items
                      .reduce(
                        (acc, el) =>
                          acc +
                          Number(el.product_price.substring(1) * el.quantity),
                        0
                      )
                      .toFixed(2)}
                  </h4>
                  <button onClick={onCheckout}>Checkout and place order</button>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Cart;

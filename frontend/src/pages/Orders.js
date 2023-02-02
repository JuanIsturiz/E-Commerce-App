import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../components/OrderItem";
import { getUserOrders } from "../features/orders/ordersSlice";
import "./Orders.css";

const Orders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrders(user.id));
  }, [dispatch, user]);

  return (
    <>
      <div className="main">
        <section className="heading">
          <h1>Orders</h1>
        </section>
        <section className="content">
          {!orders.length ? (
            <h4 id="sorry">
              Sorry{" "}
              <span style={{ textTransform: "capitalize" }}>{user.first}</span>,
              you have no active orders.
            </h4>
          ) : (
            <div className="item-list">
              {orders.map((o) => (
                <OrderItem key={o.id} order={o} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Orders;

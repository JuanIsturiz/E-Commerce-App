import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/orders/ordersSlice";
import "./Orders.css";

//todo render orders
//todo add cancel order feature
//todo add oauth authentication feature
//todo make it responsive

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
                <div key={o.id}>{o.id}</div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default Orders;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../components/OrderItem";
import Spinner from "../components/Spinner";
import { getUserOrders } from "../features/orders/ordersSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading } = useSelector((state) => state.orders);

  useEffect(() => {
    dispatch(getUserOrders(user.id));
  }, [dispatch, user]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main">
        <section className="heading">
          <h1>Orders</h1>
          <h2>Manage and see your orders information here</h2>
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

import "./OrderItem.css";

import React from "react";
import { useDispatch } from "react-redux";
import { cancelOrder } from "../features/orders/ordersSlice";

const OrderItem = ({ order }) => {
  const dispatch = useDispatch();

  const { id, deliver_date, status, total, items } = order;
  const statusColor =
    status === "Success" ? "green" : status === "Pending" ? "orange" : "red";

  const onCancel = () => {
    if (status !== "Pending") return;
    dispatch(cancelOrder(id));
  };

  return (
    <div className="order-item">
      <div className="date-status">
        <h4>Arriving: {new Date(deliver_date).toDateString()}</h4>
        <div className="status">
          <h3>Status: {status}</h3>
          <div style={{ backgroundColor: statusColor }}></div>
        </div>
      </div>
      <h4>Total {total}</h4>
      <div className="products-info">
        <h4>Products</h4>
        <hr />
        <div>
          {items.map((i, idx) => {
            const {
              quantity,
              price,
              product: { name },
            } = i;
            return (
              <div key={idx}>
                <h4>{name}</h4>
                <h5>Quantity: {quantity}</h5>
                <h4>{price}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
      <button
        style={{
          cursor: status !== "Pending" ? "default" : "pointer",
          opacity: status !== "Pending" ? 0.9 : 1,
          backgroundColor:
            status !== "Pending" ? "rgb(125, 125, 125)" : "rgb(255, 150, 150)",
        }}
        onClick={onCancel}
      >
        Cancel Order
      </button>
    </div>
  );
};

export default OrderItem;

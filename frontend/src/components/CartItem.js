import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteItems } from "../features/cart/cartSlice";
import "./CartItem.css";

const CartItem = ({ item, cartId, onDelete }) => {
  const dispatch = useDispatch();

  const { product_id, product_name, quantity, product_description } = item;

  const onItemDelete = () => {
    dispatch(deleteItems({ cartId, productId: product_id }));
    onDelete(product_id);
  };

  return (
    <div className="cart-item">
      <div className="info">
        <h3>{product_name}</h3>
        <p>{product_description}</p>
        <h5>Quantity: {quantity}</h5>
      </div>
      <button id="cart-btn" onClick={onItemDelete}>
        Remove from cart <FaShoppingCart />
      </button>
    </div>
  );
};

export default CartItem;

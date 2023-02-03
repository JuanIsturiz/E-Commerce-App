import { FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteItems } from "../features/cart/cartSlice";

const CartItem = ({ item, cartId, onDelete }) => {
  const dispatch = useDispatch();

  const {
    product_id,
    product_name,
    product_price,
    quantity,
    product_description,
    product_image,
  } = item;

  const onItemDelete = () => {
    dispatch(deleteItems({ cartId, productId: product_id }));
    onDelete(product_id);
  };
  return (
    <div className="cart-item">
      <div className="text-button">
        <div className="info">
          <h3>{product_name}</h3>
          <p>{product_description}</p>
          <h5>Quantity: {quantity}</h5>
          <h5>Price: {product_price}</h5>
        </div>
        <button id="cart-btn" onClick={onItemDelete}>
          Remove from cart <FaShoppingCart />
        </button>
      </div>
      <div className="image">
        <img src={product_image} alt={product_name} />
      </div>
    </div>
  );
};

export default CartItem;

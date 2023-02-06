import { useState, useEffect } from "react";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaBox,
  FaShoppingCart,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItems, createCart } from "../features/cart/cartSlice";

const Product = ({ info }) => {
  const [quantity, setQuantity] = useState(1);
  const [inCart, setInCart] = useState(false);
  const { id, name, description, stock_qty, price, image } = info;
  const { user } = useSelector((state) => state.auth);
  const { cartId, items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (items.some((i) => i.product_id === Number(id))) {
      setInCart(true);
    } else {
      setInCart(false);
    }
  }, [items, id]);

  const onArrowClick = (e) => {
    if (inCart) {
      return;
    }
    setQuantity((prev) => {
      if (e.target.id === "up") {
        if (prev === stock_qty) return prev;
        return prev + 1;
      } else {
        if (prev === 1) return prev;
        return prev - 1;
      }
    });
  };

  const onCartClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (inCart || stock_qty === 0) return;
    if (cartId) {
      dispatch(addItems({ quantity, userId: user.id, productId: id, cartId }));
      return;
    } else {
      const cart = await dispatch(createCart(user.id));
      dispatch(
        addItems({
          quantity,
          userId: user.id,
          productId: id,
          cartId: cart.payload,
        })
      );
    }
    setQuantity(1);
  };
  return (
    <div className="product">
      <div>
        <h3>{name}</h3>
        <p>{description}</p>
        <p>
          Price: <span>{price}</span>
        </p>
        <p>
          Stock Quantity:{" "}
          <span>{!!stock_qty ? stock_qty : "Not Available"}</span>
        </p>
      </div>
      {image ? (
        <div className="image">
          <img src={image} alt={name} />
        </div>
      ) : (
        <div className="product-sample">
          <FaBox />
        </div>
      )}
      <div className="cart-info">
        {stock_qty !== 0 && !inCart && (
          <div className="quantity">
            <span>{quantity} </span>
            <div className="arrows">
              <button onClick={onArrowClick} id="up">
                <FaArrowAltCircleUp />
              </button>
              <button onClick={onArrowClick} id="down">
                <FaArrowAltCircleDown />
              </button>
            </div>
          </div>
        )}
        <div>
          <button
            onClick={onCartClick}
            id="cart-btn"
            style={{ opacity: inCart || stock_qty === 0 ? 0.7 : 1 }}
          >
            {!inCart ? "Add to cart" : "Item already in cart"}{" "}
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;

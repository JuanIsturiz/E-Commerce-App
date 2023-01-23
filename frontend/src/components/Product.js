import { FaShoppingCart } from "react-icons/fa";
import "./Product.css";

const Product = ({ info }) => {
  const { id, name, description, stock_qty, price } = info;
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
      <button>
        Add to cart <FaShoppingCart />
      </button>
    </div>
  );
};

export default Product;

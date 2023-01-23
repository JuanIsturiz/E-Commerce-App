import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, reset } from "../features/products/productsSlice";
import Product from "./Product";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (isSuccess || products.length) {
      return;
    }
    dispatch(getProducts());
    // dispatch(reset());
  }, [isSuccess, products, dispatch]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="products">
      {isError && <h3 style={{ color: "red" }}>{message}</h3>}
      <h3>Products</h3>
      <div className="product-list">
        {products.length &&
          products.map((p) => <Product key={p.id} info={p} />)}
      </div>
    </div>
  );
};

export default ProductList;

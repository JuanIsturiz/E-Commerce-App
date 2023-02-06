import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import Product from "./Product";
import Spinner from "./Spinner";

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
  }, [isSuccess, products, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="products">
      {isError && <h3 style={{ color: "red" }}>{message}</h3>}
      <div className="product-list">
        {products.length &&
          products.map((p) => <Product key={p.id} info={p} />)}
      </div>
    </div>
  );
};

export default ProductList;

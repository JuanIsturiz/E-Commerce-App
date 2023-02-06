import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/products/productsSlice";
import Product from "./Product";
import Spinner from "./Spinner";

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, isError, isSuccess, isLoading } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    if (isSuccess || products.length || isError) {
      return;
    }
    dispatch(getProducts());
  }, [isSuccess, products, dispatch, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {!products.length ? (
        <h4 className="sorry">
          Sorry there are no products available for you right now.
        </h4>
      ) : (
        <div className="products">
          <div className="product-list">
            {products.length &&
              products.map((p) => <Product key={p.id} info={p} />)}
          </div>
        </div>
      )}
    </>
  );
};

export default ProductList;

import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <>
      <div className="main">
        <section className="heading">
          <h1>Products</h1>
          <h2>All products listed below..</h2>
        </section>
        <section className="content">
          <ProductList />
        </section>
      </div>
    </>
  );
};

export default Products;

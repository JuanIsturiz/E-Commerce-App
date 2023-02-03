import ProductList from "../components/ProductList";

const Products = () => {
  return (
    <>
      <div className="main">
        <section className="heading">
          <h1>Products</h1>
        </section>
        <section className="content">
          <ProductList />
        </section>
      </div>
    </>
  );
};

export default Products;

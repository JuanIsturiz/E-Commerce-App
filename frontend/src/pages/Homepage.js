import ProductList from "../components/ProductList";
import "./Homepage.css";

const Homepage = () => {
  return (
    <>
      <section className="heading">
        <h1>Homepage</h1>
      </section>
      <section className="content">
        <ProductList />
      </section>
    </>
  );
};

export default Homepage;

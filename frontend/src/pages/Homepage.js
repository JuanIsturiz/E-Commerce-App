import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import "./Homepage.css";

const Homepage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/products");
    }
  }, [navigate, user]);

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

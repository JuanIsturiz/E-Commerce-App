import { useEffect } from "react";
import { FaShoppingBag, FaSignInAlt, FaUserAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
        <h2>Welcome to the E-Commerce!</h2>
      </section>
      <section className="content">
        <div className="homepage-container">
          <Link to={"/products"}>
            <div className="option">
              <div>
                <h3>Products</h3>
                <FaShoppingBag />
              </div>
            </div>
          </Link>
          <div className="option log">
            <Link to={"/login"}>
              <div>
                <h3>Log In</h3>
                <FaUserAlt />
              </div>
            </Link>
            <Link to={"/register"}>
              <div>
                <h3>Sign In</h3>
                <FaSignInAlt />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;

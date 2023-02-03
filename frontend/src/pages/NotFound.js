import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <section className="heading">
      <h1>404 Not Found</h1>
      <div className="return">
        <button
          id="return-btn"
          onClick={() => (user ? navigate("/products") : navigate("/"))}
        >
          Go To Homepage
        </button>
      </div>
    </section>
  );
};

export default NotFound;

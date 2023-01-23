import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductList from "../components/ProductList";
import Sidebar from "../components/Sidebar";
import "./UserDashboard.css";

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <div className="main">
        <section className="heading">
          <h1>Dashboard</h1>
        </section>
        <section className="content">
          <ProductList />
        </section>
      </div>
      <Sidebar />
    </div>
  );
};

export default UserDashboard;

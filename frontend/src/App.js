/////todo render orders
/////todo add cancel order feature
/////todo add oauth authentication feature
/////todo base64 img
//todo make it responsive
//todo refactor setupDatabase file

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Register from "./pages/Register";
import StripeSuccess from "./pages/StripeSuccess";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users/dashboard" element={<UserDashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart/:cartId" element={<Cart />} />
          <Route path="/orders/:userId" element={<Orders />} />
          <Route path="/checkout/cart/success" element={<StripeSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" exact={true} element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

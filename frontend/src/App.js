/////todo render orders
/////todo add cancel order feature
//todo add oauth authentication feature
//todo base64 img
//todo preguntar gab sobre id out of range y uuid solution
//todo make it responsive

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
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
          <Route index element={<Homepage />} />
          <Route path="/users/dashboard" element={<UserDashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart/:cartId" element={<Cart />} />
          <Route path="/orders/:userId" element={<Orders />} />
          <Route path="/checkout/cart/success" element={<StripeSuccess />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

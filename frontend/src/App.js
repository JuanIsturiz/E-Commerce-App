//todo add loading spinner to pages

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
          <Route path="/user/:userId" element={<UserDashboard />} />
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

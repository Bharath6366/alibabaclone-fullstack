import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import Profile from "./pages/Profile";
import Addresses from "./pages/Addresses";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/addresses" element={<Addresses />} />

        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/admin/dashboard/*"
          element={<AdminLayout />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
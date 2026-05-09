import { Routes, Route, Link } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaPlusCircle,
  FaBoxOpen,
  FaShoppingBag,
  FaUsers,
  FaSignOutAlt,
} from "react-icons/fa";

import Dashboard from "./Dashboard";

import AddProduct from "./AddProduct";
import Products from "./Products";
import ManageOrders from "./ManageOrders";
import Users from "./Users";

import "../styles/adminlayout.css";

function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="sidebar">
        <h2>Admin</h2>

        <Link to="/admin/dashboard">
          <FaHome /> Dashboard
        </Link>


        <Link to="/admin/dashboard/add-product">
          <FaPlusCircle /> Add Product
        </Link>

        <Link to="/admin/dashboard/products">
          <FaBoxOpen /> Products
        </Link>

        <Link to="/admin/dashboard/orders">
          <FaShoppingBag /> Manage Orders
        </Link>

        <Link to="/admin/dashboard/users">
          <FaUsers /> Users
        </Link>

        <Link to="/admin">
          <FaSignOutAlt /> Logout
        </Link>
      </aside>

      <main className="admin-content">
        <Routes>
          <Route
            index
            element={<Dashboard />}
          />

         

          <Route
            path="add-product"
            element={<AddProduct />}
          />

          <Route
            path="products"
            element={<Products />}
          />

          <Route
            path="orders"
            element={<ManageOrders />}
          />

          <Route
            path="users"
            element={<Users />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;
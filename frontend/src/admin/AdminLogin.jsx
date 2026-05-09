import { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaUserShield,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/adminlogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const res =
          await axios.post(
            "http://localhost:5000/api/admin/login",
            form
          );

        localStorage.setItem(
          "adminToken",
          res.data.token
        );

        localStorage.setItem(
          "admin",
          JSON.stringify(
            res.data.admin
          )
        );

        navigate(
          "/admin/dashboard"
        );
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            "Login failed"
        );
      }
    };

  return (
    <div className="admin-login-page">
      <div className="admin-login-box">
        <div className="admin-login-top">
          <div className="admin-badge">
            <FaUserShield />
          </div>

          <h1>Admin Login</h1>

          <p>
            Welcome back to Alibaba
            Dashboard
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={
            handleSubmit
          }
        >
          <div>
            <label>
              Email Address
            </label>

            <div className="input-box">
              <FaEnvelope />

              <input
                type="email"
                name="email"
                placeholder="Enter admin email"
                onChange={
                  handleChange
                }
                required
              />
            </div>
          </div>

          <div>
            <label>
              Password
            </label>

            <div className="input-box">
              <FaLock />

              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={
                  handleChange
                }
                required
              />
            </div>
          </div>

          <button
            className="admin-login-btn"
          >
            Login
          </button>
        </form>

        <div className="admin-login-footer">
          Secure Admin Access
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
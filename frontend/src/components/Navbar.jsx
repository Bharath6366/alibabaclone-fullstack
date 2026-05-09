import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaArrowRight,
  FaSearch,
  FaCamera,
  FaBox,
  FaMapMarkerAlt,
  FaUserCircle,
  FaSignOutAlt,
  FaChevronDown,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { BsShieldCheck, BsGrid3X3Gap } from "react-icons/bs";
import "../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [cartCount, setCartCount] =
    useState(0);

  const [user, setUser] =
    useState(null);

  const [open, setOpen] =
    useState(false);

  useEffect(() => {
    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const total = cart.reduce(
      (sum, item) =>
        sum + (item.quantity || 1),
      0
    );

    setCartCount(total);

    const savedUser =
      JSON.parse(
        localStorage.getItem("user")
      );

    if (savedUser)
      setUser(savedUser);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="top-banner">
        <div className="top-banner-content">
          <span className="banner-title">
            Build your store effortlessly
            with AI agents
          </span>

          <button>
            Free trial <FaArrowRight />
          </button>
        </div>
      </div>

      <header className="navbar">
        <div className="nav-top">
          <Link to="/" className="logo">
            Alibaba<span>.com</span>
          </Link>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search products..."
            />

            <button className="camera-btn">
              <FaCamera />
            </button>

            <button className="search-btn">
              <FaSearch />
              Search
            </button>
          </div>

          <div className="nav-right">
            <div className="deliver-box">
              <IoLocationSharp className="loc-icon" />
              <div>
                <small>Deliver to:</small>
                <p>India</p>
              </div>
            </div>

            <FaGlobe className="nav-icon" />

            <Link
              to="/cart"
              className="cart-link"
            >
              <FaShoppingCart className="nav-icon" />
              {cartCount > 0 && (
                <span className="cart-badge">
                  {cartCount}
                </span>
              )}
            </Link>

            {!user ? (
              <Link
                to="/login"
                className="signup-btn"
              >
                Create account
              </Link>
            ) : (
              <div className="user-menu">
                <button
                  className="user-btn"
                  onClick={() =>
                    setOpen(!open)
                  }
                >
                  <FaUser />
                  {user.name}
                  <FaChevronDown />
                </button>

                {open && (
                  <div className="dropdown-menu">
                    <Link to="/profile">
                      <FaUserCircle />
                      My Profile
                    </Link>

                    <Link to="/orders">
                      <FaBox />
                      My Orders
                    </Link>

                    <Link to="/addresses">
                      <FaMapMarkerAlt />
                      My Addresses
                    </Link>

                    <button
                      onClick={logout}
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="nav-bottom">
          <Link to="/">
            <FaBars /> All categories
          </Link>

          <Link>
            <MdVerified />
            Verified manufacturers
          </Link>

          <Link>
            <BsShieldCheck />
            Order protections
          </Link>

          <Link>
            <BsGrid3X3Gap />
            Buyer Central
          </Link>

          <Link>
            App & extension
          </Link>

          <Link>
            Sell on Alibaba.com
          </Link>
        </div>
      </header>
    </>
  );
}

export default Navbar;
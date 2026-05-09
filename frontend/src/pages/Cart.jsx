import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] =
    useState([]);

  useEffect(() => {
    const items =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    setCart(items);
  }, []);

  const removeItem = (id) => {
    const updated = cart.filter(
      (item) => item._id !== id
    );

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  };

  const total = cart.reduce(
    (sum, item) =>
      sum +
      Number(
        item.salePrice ||
          item.price
      ) *
        item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <div className="cart-page">
        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            Your cart is empty
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-left">
              {cart.map((item) => (
                <div
                  className="cart-item"
                  key={item._id}
                >
                  <img
                    src={item.images?.[0]}
                    alt=""
                  />

                  <div className="cart-info">
                    <h3>{item.name}</h3>

                    <p>
                      Qty:
                      {
                        item.quantity
                      }
                    </p>

                    <h4>
                      ₹
                      {item.salePrice ||
                        item.price}
                    </h4>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeItem(
                        item._id
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h2>Order Summary</h2>

              <h3>
                Total: ₹{total}
              </h3>

              <button
                onClick={() =>
                  navigate(
                    "/checkout"
                  )
                }
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default Cart;
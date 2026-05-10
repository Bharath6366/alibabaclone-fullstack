import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Checkout() {
  const navigate =
    useNavigate();

  const location =
    useLocation();

  const directBuy =
    location.state?.directBuy;

  const [cart, setCart] =
    useState([]);

  const [addresses, setAddresses] =
    useState([]);

  const [
    selectedAddress,
    setSelectedAddress,
  ] = useState(null);

  const [
    paymentMethod,
    setPaymentMethod,
  ] = useState("COD");

  useEffect(() => {
    if (directBuy) {
      setCart([
        directBuy,
      ]);
    } else {
      const savedCart =
        JSON.parse(
          localStorage.getItem(
            "cart"
          )
        ) || [];

      setCart(savedCart);
    }

    const savedAddresses =
      JSON.parse(
        localStorage.getItem(
          "addresses"
        )
      ) || [];

    setAddresses(
      savedAddresses
    );

    const defaultAddress =
      savedAddresses.find(
        (a) => a.default
      );

    if (defaultAddress) {
      setSelectedAddress(
        defaultAddress.id
      );
    }
  }, [directBuy]);

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

  const createOrder =
    async () => {
      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        ) || {};

      const address =
        addresses.find(
          (a) =>
            a.id ===
            selectedAddress
        );

      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/orders/create`,
          {
            userId:
              user?._id ||
              null,
            customerName:
              user?.name ||
              "Customer",
            email:
              user?.email ||
              null,
            items: cart,
            address,
            total,
            paymentMethod,
          }
        );

        if (!directBuy) {
          localStorage.removeItem(
            "cart"
          );
        }

        alert(
          "Order placed successfully"
        );

        navigate("/orders");
      } catch (err) {
        console.log(err);
        alert(
          "Order failed"
        );
      }
    };

  const placeOrder =
    async () => {
      if (
        !selectedAddress
      ) {
        alert(
          "Select address"
        );
        return;
      }

      if (
        paymentMethod ===
        "COD"
      ) {
        createOrder();
        return;
      }

      try {
        const res =
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
            {
              amount: total,
            }
          );

        const options = {
          key: "rzp_test_SjEFVx77XmJehH",
          amount:
            res.data.amount,
          currency: "INR",
          name: "Alibaba Clone",
          order_id:
            res.data.id,

          handler:
            async function () {
              createOrder();
            },

          theme: {
            color:
              "#ff6a00",
          },
        };

        const payment =
          new window.Razorpay(
            options
          );

        payment.open();
      } catch (err) {
        console.log(err);
        alert(
          "Payment failed"
        );
      }
    };

  return (
    <>
      <Navbar />

      <div className="checkout-page">
        <div className="checkout-left">
          <div className="checkout-box">
            <h2>
              Select Address
            </h2>

            {addresses.map(
              (a) => (
                <label
                  key={a.id}
                  className="address-option"
                >
                  <input
                    type="radio"
                    checked={
                      selectedAddress ===
                      a.id
                    }
                    onChange={() =>
                      setSelectedAddress(
                        a.id
                      )
                    }
                  />

                  <div>
                    <b>
                      {a.name}
                    </b>

                    <p>
                      {a.house},{" "}
                      {a.area},{" "}
                      {a.city}
                    </p>
                  </div>
                </label>
              )
            )}
          </div>

          <div className="checkout-box">
            <h2>
              Payment Method
            </h2>

            <label className="pay-option">
              <input
                type="radio"
                checked={
                  paymentMethod ===
                  "COD"
                }
                onChange={() =>
                  setPaymentMethod(
                    "COD"
                  )
                }
              />
              Cash on Delivery
            </label>

            <label className="pay-option">
              <input
                type="radio"
                checked={
                  paymentMethod ===
                  "Razorpay"
                }
                onChange={() =>
                  setPaymentMethod(
                    "Razorpay"
                  )
                }
              />
              Razorpay
            </label>
          </div>
        </div>

        <div className="checkout-right">
          <h2>
            Order Summary
          </h2>

          <h3>
            Items:{" "}
            {cart.length}
          </h3>

          <h1>
            ₹{total}
          </h1>

          <button
            onClick={
              placeOrder
            }
          >
            Place Order
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Checkout;
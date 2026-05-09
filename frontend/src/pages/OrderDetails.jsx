import { useParams } from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaBox,
  FaTruck,
  FaCheckCircle,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "../styles/home.css";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder =
    async () => {
      const res =
        await axios.get(
          "http://localhost:5000/api/orders/all"
        );

      const found =
        res.data.find(
          (o) =>
            o._id === id
        );

      setOrder(found);
    };

  if (!order)
    return (
      <div className="empty-cart">
        Loading...
      </div>
    );

  const address =
    order.address;

  return (
    <>
      <Navbar />

      <div className="order-details-page">
        <h1>Order Details</h1>

        <div className="order-detail-box">
          <img
            src={
              order.items?.[0]
                ?.images?.[0]
            }
            alt=""
          />

          <div className="detail-order-info">
            <h2>
              {
                order.items?.[0]
                  ?.name
              }
            </h2>

            <p>
              Quantity:
              {
                order.items?.[0]
                  ?.quantity
              }
            </p>

            <h3>
              ₹{order.total}
            </h3>

            <span
              className={`status ${order.status}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        <div className="tracking-box">
          <div className="track-step active">
            <FaBox />
            Ordered
          </div>

          <div
            className={`track-step ${
              order.status ===
                "Shipped" ||
              order.status ===
                "Out for Delivery" ||
              order.status ===
                "Delivered"
                ? "active"
                : ""
            }`}
          >
            <FaTruck />
            Shipped
          </div>

          <div
            className={`track-step ${
              order.status ===
              "Delivered"
                ? "active"
                : ""
            }`}
          >
            <FaCheckCircle />
            Delivered
          </div>
        </div>

        <div className="ship-box">
          <h2>
            <FaMapMarkerAlt />
            Shipping Address
          </h2>

          <p>{address?.name}</p>
          <p>
            {address?.house},{" "}
            {address?.area},{" "}
            {address?.city}
          </p>
          <p>{address?.phone}</p>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderDetails;
import {
  useEffect,
  useState,
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function Orders() {
  const [orders, setOrders] =
    useState([]);

  const [filter, setFilter] =
    useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);
const fetchOrders =
  async () => {
    try {
      const user =
        JSON.parse(
          localStorage.getItem(
            "user"
          )
        ) || {};

      const res =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/user?email=${user.email}`
        );

      setOrders(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  const filtered =
    filter === "All"
      ? orders
      : orders.filter(
          (o) =>
            o.status === filter
        );

  return (
    <>
      <Navbar />

      <div className="orders-page">
        <h1>My Orders</h1>

        <div className="order-filters">
          {[
            "All",
            "Pending",
            "Shipped",
            "Out for Delivery",
            "Delivered",
          ].map((item) => (
            <button
              key={item}
              className={
                filter === item
                  ? "active-filter"
                  : ""
              }
              onClick={() =>
                setFilter(item)
              }
            >
              {item}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-cart">
            No orders found yet
          </div>
        ) : (
          filtered.map((order) => (
            <div
              className="order-card"
              key={order._id}
            >
              <img
                src={
                  order.items?.[0]
                    ?.images?.[0]
                }
                alt=""
              />

              <div className="order-info">
                <small>
                  {
                    order.orderId
                  }
                </small>

                <h3>
                  {order.items
                    ?.length > 1
                    ? `${
                        order
                          .items[0]
                          .name
                      } + ${
                        order
                          .items
                          .length -
                        1
                      } more`
                    : order
                        .items?.[0]
                        ?.name}
                </h3>

                <p>
                  {
                    order.items
                      ?.length
                  }{" "}
                  item(s) •{" "}
                  {
                    order.paymentMethod
                  }
                </p>

                <p>
                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}
                </p>

                <h4>
                  ₹
                  {
                    order.total
                  }
                </h4>

                <span
                  className={`status ${order.status.replace(
                    /\s/g,
                    ""
                  )}`}
                >
                  {
                    order.status
                  }
                </span>
              </div>

              <Link
                to={`/orders/${order._id}`}
                className="view-order-btn"
              >
                Track Order
              </Link>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}

export default Orders;
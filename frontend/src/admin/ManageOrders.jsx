import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "../styles/manageorders.css";

function ManageOrders() {
  const [orders, setOrders] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders =
    async () => {
      const res =
        await axios.get(
          `${import.meta.env.VITE_API_URL}/api/orders/all`
        );

      setOrders(res.data);
    };

  const updateStatus =
    async (id, status) => {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/orders/update/${id}`,
          { status }
        );

        fetchOrders();
      } catch (err) {
        alert(
          err.response?.data
            ?.message ||
            "Status update failed"
        );
      }
    };

  const getNextStatus = (
    current
  ) => {
    const flow = {
      Pending:
        "Shipped",

      Shipped:
        "Out for Delivery",

      "Out for Delivery":
        "Delivered",

      Delivered:
        null,
    };

    return flow[current];
  };

  return (
    <div className="page-box">
      <h1 className="page-title">
        Manage Orders
      </h1>

      <div className="table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer ID</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => {
              const next =
                getNextStatus(
                  o.status
                );

              return (
                <tr key={o._id}>
                  <td>{o.orderId}</td>
                  <td>{o.customerId}</td>

                  <td>
                    {
                      o.items
                        ?.length
                    }{" "}
                    item
                    {o.items
                      ?.length >
                    1
                      ? "s"
                      : ""}
                  </td>

                  <td>
                    ₹{o.total}
                  </td>

                  <td>
                    {
                      o.paymentMethod
                    }
                  </td>

                  <td>
                    {next ? (
                      <select
                        value={
                          o.status
                        }
                        className={`status-select ${o.status.replace(
                          /\s/g,
                          ""
                        )}`}
                        onChange={(
                          e
                        ) =>
                          updateStatus(
                            o._id,
                            e.target
                              .value
                          )
                        }
                      >
                        <option
                          value={
                            o.status
                          }
                        >
                          {
                            o.status
                          }
                        </option>

                        <option
                          value={
                            next
                          }
                        >
                          {next}
                        </option>
                      </select>
                    ) : (
                      <button className="status-lock-btn">
                        Delivered ✓
                      </button>
                    )}
                  </td>

                  <td>
                    {new Date(
                      o.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>
                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelected(
                          o
                        )
                      }
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="modal-overlay"
          onClick={() =>
            setSelected(null)
          }
        >
          <div
            className="order-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="modal-top">
              <h2>
                Order Details
              </h2>

              <button
                className="close-btn"
                onClick={() =>
                  setSelected(
                    null
                  )
                }
              >
                ✕
              </button>
            </div>

            <div className="order-meta">
              <p>
                <b>Order ID:</b>{" "}
                {
                  selected.orderId
                }
              </p>

              <p>
                <b>Customer ID:</b>{" "}
                {
                  selected.customerId
                }
              </p>

              <p>
                <b>Customer:</b>{" "}
                {
                  selected.customerName
                }
              </p>

              <p>
                <b>Invoice:</b>{" "}
                {
                  selected.invoiceId
                }
              </p>

              <p>
                <b>Payment:</b>{" "}
                {
                  selected.paymentMethod
                }
              </p>

              <p>
                <b>Total:</b> ₹
                {
                  selected.total
                }
              </p>

              <p>
                <b>Status:</b>{" "}
                {
                  selected.status
                }
              </p>
            </div>

            <hr />

            <h3>
              Ordered Items
            </h3>

            <div className="modal-items">
              {selected.items?.map(
                (
                  item,
                  index
                ) => (
                  <div
                    key={index}
                    className="modal-item"
                  >
                    <img
                      src={
                        item
                          .images?.[0]
                      }
                      alt=""
                      className="modal-order-img"
                    />

                    <div>
                      <h4>
                        {
                          item.name
                        }
                      </h4>

                      <p>
                        Qty:{" "}
                        {
                          item.quantity
                        }
                      </p>

                      <p>
                        ₹
                        {item.salePrice ||
                          item.price}
                      </p>
                    </div>
                  </div>
                )
              )}
            </div>

            <hr />

            <h3>
              Delivery Address
            </h3>

            <div className="address-box">
              <p>
                {
                  selected.address
                    ?.name
                }
              </p>

              <p>
                {
                  selected.address
                    ?.house
                }
                ,{" "}
                {
                  selected.address
                    ?.area
                }
              </p>

              {selected.address
                ?.landmark && (
                <p>
                  Landmark:{" "}
                  {
                    selected
                      .address
                      .landmark
                  }
                </p>
              )}

              <p>
                {
                  selected.address
                    ?.city
                }
                ,{" "}
                {
                  selected.address
                    ?.state
                }{" "}
                -{" "}
                {
                  selected.address
                    ?.pincode
                }
              </p>

              <p>
                Phone:{" "}
                {
                  selected.address
                    ?.phone
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrders;
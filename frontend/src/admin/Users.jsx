import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import "../styles/users.css";

function Users() {
  const [users, setUsers] =
    useState([]);

  const [selected, setSelected] =
    useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers =
    async () => {
      try {
        const [
          usersRes,
          ordersRes,
        ] =
          await Promise.all([
            axios.get(
              "http://localhost:5000/api/auth/users"
            ),
            axios.get(
              "http://localhost:5000/api/orders/all"
            ),
          ]);

        const orders =
          ordersRes.data;

        const enriched =
          usersRes.data.map(
            (u) => {
              const userOrders =
                orders.filter(
                  (o) =>
                    o.email ===
                    u.email
                );

              const spent =
                userOrders.reduce(
                  (
                    sum,
                    o
                  ) =>
                    sum +
                    o.total,
                  0
                );

              return {
                ...u,
                totalOrders:
                  userOrders.length,
                totalSpent:
                  spent,
              };
            }
          );

        setUsers(enriched);
      } catch (err) {
        console.log(err);
      }
    };

  const deleteUser =
    async (id) => {
      const ok =
        window.confirm(
          "Delete this user?"
        );

      if (!ok) return;

      try {
        await axios.delete(
          `http://localhost:5000/api/auth/users/${id}`
        );

        fetchUsers();
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="users-page">
      <h1 className="users-title">
        Manage Users
      </h1>

      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  {
                    u.totalOrders
                  }
                </td>
                <td>
                  ₹
                  {
                    u.totalSpent
                  }
                </td>
                <td>
                  {new Date(
                    u.createdAt
                  ).toLocaleDateString()}
                </td>

                <td>
                  <div className="action-btns">
                    <button
                      className="view-btn"
                      onClick={() =>
                        setSelected(
                          u
                        )
                      }
                    >
                      View
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        deleteUser(
                          u._id
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
            className="user-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="modal-top">
              <h2>
                User Details
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

            <div className="user-meta">
              <p>
                <b>Name:</b>{" "}
                {
                  selected.name
                }
              </p>

              <p>
                <b>Email:</b>{" "}
                {
                  selected.email
                }
              </p>

              <p>
                <b>Total Orders:</b>{" "}
                {
                  selected.totalOrders
                }
              </p>

              <p>
                <b>Total Spent:</b> ₹
                {
                  selected.totalSpent
                }
              </p>

              <p>
                <b>Joined:</b>{" "}
                {new Date(
                  selected.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Users;
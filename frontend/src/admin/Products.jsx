import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import "../styles/products.css";

function Products() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  const fetchItems = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/products"
    );
    setItems(res.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const deleteItem = async (id) => {
    if (
      !window.confirm(
        "Delete permanently?"
      )
    )
      return;

    await axios.delete(
      `http://localhost:5000/api/products/${id}`
    );

    fetchItems();
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveEdit = async () => {
    await axios.put(
      `http://localhost:5000/api/products/${editing._id}`,
      form
    );

    setEditing(null);
    fetchItems();
  };

  const filtered = items.filter((item) => {
    const title =
      item.name ||
      item.bannerTitle ||
      item.carouselTitle ||
      "";

    const matchSearch = title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchType =
      filter === "all" ||
      item.contentType === filter;

    return matchSearch && matchType;
  });

  return (
    <>
      <div className="page-box">
        <div className="manage-head">
          <h1>Manage Content</h1>

          <div className="manage-controls">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(e.target.value)
              }
            >
              <option value="all">All</option>
              <option value="product">
                Products
              </option>
              <option value="banner">
                Banner
              </option>
              <option value="carousel">
                Carousel
              </option>
            </select>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.images?.[0]}
                    alt=""
                    className="product-thumb"
                  />
                </td>

                <td>
                  {item.name ||
                    item.bannerTitle ||
                    item.carouselTitle}
                </td>

                <td>
                  <span className="type-pill">
                    {item.contentType}
                  </span>
                </td>

                <td>
                  {item.category || "-"}
                </td>
                <td>
                  {item.price
                    ? `₹${item.price}`
                    : "-"}
                </td>
                <td>
                  {item.stock || "-"}
                </td>

                <td>
                  <div className="action-btns">
                    <button
                      className="icon-btn edit-btn"
                      onClick={() =>
                        startEdit(item)
                      }
                    >
                      <FaEdit />
                    </button>

                    <button
                      className="icon-btn delete-btn"
                      onClick={() =>
                        deleteItem(item._id)
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-top">
              <h2>Edit Content</h2>

              <button
                className="close-btn"
                onClick={() =>
                  setEditing(null)
                }
              >
                <FaTimes />
              </button>
            </div>

            <input
              name="name"
              value={form.name || ""}
              placeholder="Name"
              onChange={handleChange}
            />

            <input
              name="category"
              value={form.category || ""}
              placeholder="Category"
              onChange={handleChange}
            />

            <input
              name="brand"
              value={form.brand || ""}
              placeholder="Brand"
              onChange={handleChange}
            />

            <input
              name="price"
              value={form.price || ""}
              placeholder="Price"
              onChange={handleChange}
            />

            <input
              name="stock"
              value={form.stock || ""}
              placeholder="Stock"
              onChange={handleChange}
            />

            <button
              className="save-edit-btn"
              onClick={saveEdit}
            >
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import "../styles/products.css";

function Products() {
  const [items, setItems] =
    useState([]);
  const [search, setSearch] =
    useState("");
  const [filter, setFilter] =
    useState("all");
  const [editing, setEditing] =
    useState(null);
  const [form, setForm] =
    useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems =
    async () => {
      try {
        const res =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products`
          );

        setItems(
          Array.isArray(
            res.data
          )
            ? res.data
            : []
        );
      } catch (err) {
        console.log(err);
        setItems([]);
      }
    };

  const deleteItem =
    async (id) => {
      const ok =
        window.confirm(
          "Delete permanently?"
        );

      if (!ok) return;

      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        fetchItems();
      } catch (err) {
        console.log(err);
      }
    };

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const saveEdit =
    async () => {
      try {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editing._id}`,
          form
        );

        setEditing(null);
        fetchItems();
      } catch (err) {
        console.log(err);
      }
    };

  const filtered =
    items.filter((item) => {
      const title =
        item.name ||
        item.bannerTitle ||
        item.carouselTitle ||
        "";

      const matchSearch =
        title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchType =
        filter === "all" ||
        item.contentType ===
          filter;

      return (
        matchSearch &&
        matchType
      );
    });

  const products =
    filtered.filter(
      (i) =>
        i.contentType ===
        "product"
    );

  const banners =
    filtered.filter(
      (i) =>
        i.contentType ===
        "banner"
    );

  const carousels =
    filtered.filter(
      (i) =>
        i.contentType ===
        "carousel"
    );

  const renderSimpleTable = (
    data
  ) => (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Type</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>
              <img
                src={
                  item
                    .images?.[0]
                }
                alt=""
                className="product-thumb"
              />
            </td>

            <td>
              {item.bannerTitle ||
                item.carouselTitle}
            </td>

            <td>
              <span className="type-pill">
                {
                  item.contentType
                }
              </span>
            </td>

            <td>
              <div className="action-btns">
                <button
                  className="icon-btn edit-btn"
                  onClick={() =>
                    startEdit(
                      item
                    )
                  }
                >
                  <FaEdit />
                </button>

                <button
                  className="icon-btn delete-btn"
                  onClick={() =>
                    deleteItem(
                      item._id
                    )
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
  );

  const renderProductTable = (
    data
  ) => (
    <table className="admin-table">
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Category</th>
          <th>Brand</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item._id}>
            <td>
              <img
                src={
                  item
                    .images?.[0]
                }
                alt=""
                className="product-thumb"
              />
            </td>

            <td>
              {item.name}
            </td>

            <td>
              {
                item.category
              }
            </td>

            <td>
              {item.brand}
            </td>

            <td>
              ₹
              {item.price}
            </td>

            <td>
              {item.stock}
            </td>

            <td>
              <div className="action-btns">
                <button
                  className="icon-btn edit-btn"
                  onClick={() =>
                    startEdit(
                      item
                    )
                  }
                >
                  <FaEdit />
                </button>

                <button
                  className="icon-btn delete-btn"
                  onClick={() =>
                    deleteItem(
                      item._id
                    )
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
  );

  return (
    <>
      <div className="page-box">
        <div className="manage-head">
          <h1>
            Manage Content
          </h1>

          <div className="manage-controls">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
            >
              <option value="all">
                All
              </option>
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

        {(filter === "all" ||
          filter ===
            "product") &&
          products.length >
            0 && (
            <>
              <h2 className="section-title">
                Products
              </h2>
              {renderProductTable(
                products
              )}
            </>
          )}

        {(filter === "all" ||
          filter ===
            "banner") &&
          banners.length >
            0 && (
            <>
              <h2 className="section-title">
                Banners
              </h2>
              {renderSimpleTable(
                banners
              )}
            </>
          )}

        {(filter === "all" ||
          filter ===
            "carousel") &&
          carousels.length >
            0 && (
            <>
              <h2 className="section-title">
                Carousels
              </h2>
              {renderSimpleTable(
                carousels
              )}
            </>
          )}
      </div>

      {editing && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <div className="modal-top">
              <h2>
                Edit Content
              </h2>

              <button
                className="close-btn"
                onClick={() =>
                  setEditing(
                    null
                  )
                }
              >
                <FaTimes />
              </button>
            </div>

            <input
              name="name"
              value={
                form.name || ""
              }
              placeholder="Name"
              onChange={
                handleChange
              }
            />

            <input
              name="category"
              value={
                form.category ||
                ""
              }
              placeholder="Category"
              onChange={
                handleChange
              }
            />

            <input
              name="brand"
              value={
                form.brand || ""
              }
              placeholder="Brand"
              onChange={
                handleChange
              }
            />

            <input
              name="price"
              value={
                form.price || ""
              }
              placeholder="Price"
              onChange={
                handleChange
              }
            />

            <input
              name="stock"
              value={
                form.stock || ""
              }
              placeholder="Stock"
              onChange={
                handleChange
              }
            />

            <button
              className="save-edit-btn"
              onClick={
                saveEdit
              }
            >
              <FaSave />
              Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Products;
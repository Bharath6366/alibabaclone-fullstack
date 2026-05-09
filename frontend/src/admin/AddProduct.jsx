import { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";
import "../styles/addproduct.css";

function AddProduct() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    contentType: "product",
    name: "",
    category: "",
    brand: "",
    price: "",
    salePrice: "",
    stock: "",
    description: "",
    tags: "",
    bannerTitle: "",
    bannerSubtitle: "",
    carouselTitle: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = "";

      if (image) {
        imageUrl = await uploadImage(image);
      }

      const payload = {
        ...form,
        images: imageUrl ? [imageUrl] : [],
        tags: form.tags ? form.tags.split(",") : [],
      };

      await axios.post(
        "${import.meta.env.VITE_API_URL}/api/products/add",
        payload
      );

      alert("Saved successfully");

      setImage(null);

      setForm({
        contentType: "product",
        name: "",
        category: "",
        brand: "",
        price: "",
        salePrice: "",
        stock: "",
        description: "",
        tags: "",
        bannerTitle: "",
        bannerSubtitle: "",
        carouselTitle: "",
      });

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      alert("Failed to save");
    }
  };

  return (
    <div className="page-box">
      <h1>Add Content</h1>

      <form
        className="product-form"
        onSubmit={handleSubmit}
      >
        <select
          name="contentType"
          value={form.contentType}
          onChange={handleChange}
        >
          <option value="product">Product</option>
          <option value="banner">
            Banner Carousel
          </option>
          <option value="carousel">
            Product Carousel
          </option>
        </select>

        {form.contentType === "product" && (
          <>
            <input
              name="name"
              value={form.name}
              placeholder="Product name"
              onChange={handleChange}
              required
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
            >
              <option value="">
                Select category
              </option>
              <option>Electronics</option>
              <option>Fashion</option>
              <option>Furniture</option>
              <option>Machinery</option>
              <option>Office Supplies</option>
            </select>

            <input
              name="brand"
              value={form.brand}
              placeholder="Brand"
              onChange={handleChange}
            />

            <input
              name="price"
              value={form.price}
              placeholder="Price"
              onChange={handleChange}
            />

            <input
              name="salePrice"
              value={form.salePrice}
              placeholder="Discount price"
              onChange={handleChange}
            />

            <input
              name="stock"
              value={form.stock}
              placeholder="Stock quantity"
              onChange={handleChange}
            />

            <textarea
              name="description"
              rows="5"
              value={form.description}
              placeholder="Description"
              onChange={handleChange}
            />

            <input
              name="tags"
              value={form.tags}
              placeholder="Tags"
              onChange={handleChange}
            />
          </>
        )}

        {form.contentType === "banner" && (
          <>
            <input
              name="bannerTitle"
              value={form.bannerTitle}
              placeholder="Banner title"
              onChange={handleChange}
            />

            <input
              name="bannerSubtitle"
              value={form.bannerSubtitle}
              placeholder="Banner subtitle"
              onChange={handleChange}
            />

            <input
              name="tags"
              value={form.tags}
              placeholder="Button text / link"
              onChange={handleChange}
            />
          </>
        )}

        {form.contentType === "carousel" && (
          <>
            <input
              name="carouselTitle"
              value={form.carouselTitle}
              placeholder="Carousel title"
              onChange={handleChange}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
            >
              <option>
                Top Trending Products
              </option>
              <option>
                Newly Arrived Products
              </option>
            </select>

            <textarea
              name="description"
              rows="4"
              value={form.description}
              placeholder="Description"
              onChange={handleChange}
            />
          </>
        )}

        <label className="upload-box">
          <FaUpload />
          {image ? image.name : "Upload Image"}

          <input
            type="file"
            hidden
            onChange={(e) =>
              setImage(e.target.files[0])
            }
          />
        </label>

        <button
          className="save-btn"
          disabled={loading}
        >
          {loading
            ? "Uploading..."
            : "Save Content"}
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
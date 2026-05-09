import {
  useParams,
  useNavigate,
} from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate =
    useNavigate();

  const [product, setProduct] =
    useState(null);

  const [mainImage, setMainImage] =
    useState("");

  const [qty, setQty] =
    useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct =
    async () => {
      try {
        const res =
          await axios.get(
            "${import.meta.env.VITE_API_URL}/api/products"
          );

        const found =
          res.data.find(
            (p) =>
              p._id === id
          );

        setProduct(found);
        setMainImage(
          found?.images?.[0]
        );
      } catch (err) {
        console.log(err);
      }
    };

  /* ADD TO CART */
  const addToCart = () => {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!user) {
      alert(
        "Please login first"
      );
      navigate("/login");
      return;
    }

    const cart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || [];

    const existing =
      cart.find(
        (item) =>
          item._id ===
          product._id
      );

    if (existing) {
      existing.quantity += qty;
    } else {
      cart.push({
        ...product,
        quantity: qty,
      });
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert(
      "Added to cart"
    );
  };

  /* BUY NOW */
  const buyNow = () => {
    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        )
      );

    if (!user) {
      alert(
        "Please login first"
      );
      navigate("/login");
      return;
    }

    navigate(
      "/checkout",
      {
        state: {
          directBuy: {
            ...product,
            quantity: qty,
          },
        },
      }
    );
  };

  if (!product) return null;

  return (
    <>
      <Navbar />

      <div className="details-wrap">
        <div className="details-left">
          <div className="thumbs">
            {product.images?.map(
              (img) => (
                <img
                  key={img}
                  src={img}
                  onClick={() =>
                    setMainImage(
                      img
                    )
                  }
                  alt=""
                />
              )
            )}
          </div>

          <div className="main-preview">
            <img
              src={mainImage}
              alt=""
            />
          </div>
        </div>

        <div className="details-right">
          <h1>
            {product.name}
          </h1>

          <div className="detail-rating">
            <FaStar />
            <span>4.8</span>
            <small>
              (245 reviews)
            </small>
          </div>

          <h2>
            ₹
            {product.salePrice ||
              product.price}
          </h2>

          {product.salePrice && (
            <p className="strike">
              ₹
              {
                product.price
              }
            </p>
          )}

          <p className="stock">
            In Stock:{" "}
            {product.stock}
          </p>

          <div className="qty-box">
            <button
              onClick={() =>
                setQty(
                  Math.max(
                    1,
                    qty - 1
                  )
                )
              }
            >
              -
            </button>

            <span>{qty}</span>

            <button
              onClick={() =>
                setQty(
                  qty + 1
                )
              }
            >
              +
            </button>
          </div>

          <div className="detail-btns">
            <button
              className="cart-btn"
              onClick={
                addToCart
              }
            >
              Add To Cart
            </button>

            <button
              className="buy-btn"
              onClick={buyNow}
            >
              Buy Now
            </button>
          </div>

          <div className="desc-box">
            <h3>
              Description
            </h3>

            <p>
              {
                product.description
              }
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProductDetails;
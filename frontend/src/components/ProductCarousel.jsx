import { useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import ProductCard from "./ProductCard";
import "../styles/home.css";

function ProductCarousel({
  title,
  products = [],
}) {
  const sliderRef = useRef(null);

  const scroll = (dir) => {
    if (!sliderRef.current) return;

    sliderRef.current.scrollLeft +=
      dir === "left" ? -350 : 350;
  };

  if (!products.length) return null;

  return (
    <section className="carousel-section">
      <div className="carousel-top">
        <h2>{title}</h2>

        <div className="carousel-btns">
          <button
            onClick={() => scroll("left")}
          >
            <FaChevronLeft />
          </button>

          <button
            onClick={() =>
              scroll("right")
            }
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div
        ref={sliderRef}
        className="carousel-row"
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductCarousel;
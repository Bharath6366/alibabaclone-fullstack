import { useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import "../styles/home.css";

function HeroCarousel({ banners }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!banners.length) return;

    const timer = setInterval(() => {
      setCurrent(
        (prev) =>
          (prev + 1) % banners.length
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [banners]);

  if (!banners.length) return null;

  const banner = banners[current];

  return (
    <section className="hero">
      <img
        src={banner.images?.[0]}
        alt=""
        className="hero-img"
      />

      <div className="hero-overlay">
        <h1>
          {banner.bannerTitle ||
            "Welcome"}
        </h1>

        <p>
          {banner.bannerSubtitle ||
            "Discover products"}
        </p>

        <button>
          Explore Now
        </button>
      </div>

      <button
        className="hero-btn left"
        onClick={() =>
          setCurrent(
            current === 0
              ? banners.length - 1
              : current - 1
          )
        }
      >
        <FaChevronLeft />
      </button>

      <button
        className="hero-btn right"
        onClick={() =>
          setCurrent(
            (current + 1) %
              banners.length
          )
        }
      >
        <FaChevronRight />
      </button>
    </section>
  );
}

export default HeroCarousel;
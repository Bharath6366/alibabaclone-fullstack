import { useEffect, useState } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroCarousel from "../components/HeroCarousel";
import ProductCarousel from "../components/ProductCarousel";

import "../styles/home.css";

function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/products"
      );

      setItems(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const banners = items.filter(
    (item) =>
      item.contentType === "banner"
  );

  const products = items.filter(
    (item) =>
      item.contentType === "product"
  );

  const trending = products.slice(0, 8);
  const arrivals = products.slice(8, 16);

  return (
    <>
      <Navbar />

      <div className="home-wrap">
        <HeroCarousel banners={banners} />

        <ProductCarousel
          title="Top Trending Products"
          products={trending}
        />

        <ProductCarousel
          title="New Arrivals"
          products={arrivals}
        />
      </div>

      <Footer />
    </>
  );
}

export default Home;
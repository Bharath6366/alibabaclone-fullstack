import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "../styles/home.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div
      className="product-card-home"
      onClick={() =>
        navigate(
          `/product/${product._id}`
        )
      }
    >
      <img
        src={product.images?.[0]}
        alt={product.name}
      />

      <div className="product-info-home">
        <h3>{product.name}</h3>

        <p className="price-home">
          ₹
          {product.salePrice ||
            product.price}
        </p>

        {product.salePrice && (
          <span className="old-price">
            ₹{product.price}
          </span>
        )}

        <div className="rating-home">
          <FaStar />
          <span>4.8</span>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
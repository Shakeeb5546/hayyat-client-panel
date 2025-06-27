import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSlider.css";

const ProductSlider = ({ category, products }) => {
  const navigate = useNavigate();

  const handleViewProduct = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="category-section">
      <h2 className="category-title">{category}</h2>
      <div className="product-slider">
        {products.map((product) => {
          const firstImage = product.images?.[0];
          const prices = (product.sizes || [])
            .map((s) => s.discountedPrice || s.originalPrice)
            .filter((p) => p !== undefined && p !== null);
          const lowestPrice = prices.length > 0 ? Math.min(...prices) : "N/A";

          return (
            <div
              key={product._id}
              className="product-card"
              onClick={() => handleViewProduct(product._id)}
              style={{ cursor: "pointer" }}
            >
              {firstImage ? (
                <img
                  src={firstImage}
                  alt={product.name}
                  className="product-image"
                  style={{ pointerEvents: "none" }}
                />
              ) : (
                <div style={{ height: "250px", backgroundColor: "#eee" }}></div>
              )}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">
                  {lowestPrice !== "N/A" ? `PKR ${lowestPrice}` : "Price Not Available"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductSlider;

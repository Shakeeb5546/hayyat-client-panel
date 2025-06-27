// src/pages/AllProducts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductSlider from '../components/ProductSlider';

const AllProducts = () => {
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        const data = res.data;

        const grouped = data.reduce((acc, product) => {
          const category = product.category || 'Uncategorized';
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(product);
          return acc;
        }, {});

        setGroupedProducts(grouped);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {loading && <p>Loading products...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && Object.entries(groupedProducts).length === 0 && (
        <p>No products available.</p>
      )}

      {Object.entries(groupedProducts).map(([category, products]) => (
        <ProductSlider key={category} category={category} products={products} />
      ))}
    </div>
  );
};

export default AllProducts;

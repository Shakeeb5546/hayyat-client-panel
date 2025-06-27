// src/pages/ProductDetailPage.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ClientProductDetail from './ClientProductDetail'; // ✅ Import detail UI component

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        console.error('❌ No product ID found in URL');
        return;
      }

      const url = `http://localhost:5000/api/products/${id}`;
      console.log('🔍 Fetching product ID:', id);
      console.log('🌐 API URL:', url);

      try {
        const res = await axios.get(url);
        console.log('✅ Product fetched:', res.data);
        setProduct(res.data);
      } catch (err) {
        console.error('❌ Error fetching product:', err.response?.data || err.message);
        setError(true);
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        ❌ Failed to load product. Check console logs for more details.
      </div>
    );
  }

  return (
    <div>
      {product ? (
        <ClientProductDetail
          product={product}
          onBack={() => window.history.back()}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          ⏳ Loading product details...
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;

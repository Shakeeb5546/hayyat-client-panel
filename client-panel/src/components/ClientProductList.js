import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ClientProductList = () => {
  const [groupedProducts, setGroupedProducts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');

        // Group products by category
        const grouped = {};
        res.data.forEach(product => {
          if (!grouped[product.category]) {
            grouped[product.category] = [];
          }
          grouped[product.category].push(product);
        });

        setGroupedProducts(grouped);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🎬 Hayyat Collections</h2>
      {Object.entries(groupedProducts).map(([category, products]) => (
        <div key={category} style={styles.categoryBlock}>
          <h3 style={styles.categoryTitle}>{category}</h3>
          <div style={styles.scrollRow}>
            {products.map(product => (
              <div key={product._id} style={styles.card}>
                <img
                  src={`http://localhost:5000/${product.images?.[0]}`}
                  alt={product.name}
                  style={styles.image}
                />
                <h4 style={styles.name}>{product.name}</h4>
                <p style={styles.price}>Rs {product.price}</p>
                <Link to={`/product/${product._id}`} state={{ product }}>
                  <button style={styles.button}>View Details</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: {
    padding: 30,
    backgroundColor: '#f9f9f9',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333'
  },
  categoryBlock: {
    marginBottom: 40,
  },
  categoryTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#5C258D'
  },
  scrollRow: {
    display: 'flex',
    overflowX: 'auto',
    gap: 20,
    paddingBottom: 10,
  },
  card: {
    minWidth: 220,
    borderRadius: 10,
    backgroundColor: '#fff',
    padding: 15,
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    flexShrink: 0,
  },
  image: {
    width: '100%',
    height: 160,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    margin: '5px 0'
  },
  price: {
    fontSize: 14,
    color: '#888'
  },
  button: {
    marginTop: 10,
    padding: '8px 12px',
    backgroundColor: '#4389A2',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer'
  }
};

export default ClientProductList;

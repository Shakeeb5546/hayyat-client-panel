// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './HomePage.css';

const HomePage = () => {
  // Dummy product data (replace with actual data)
  const products = [
    { id: 1, name: 'Abaya 1', description: 'Elegant and modest', image: 'path-to-image' },
    { id: 2, name: 'Abaya 2', description: 'Stylish and comfortable', image: 'path-to-image' },
    { id: 3, name: 'Niqab 1', description: 'Classic niqab', image: 'path-to-image' }
  ];

  return (
    <div className="home-page">
      {/* 1. Navbar */}
      <header className="navbar">
        <h1>Hayat Collections</h1>
        <nav>
          <a href="#">Home</a>
          <a href="#">Shop</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      {/* 2. Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Elegant Modesty, Redefined</h2>
          <p>Discover our exclusive abaya & niqab collections</p>
          <button>Shop Now</button>
        </div>
      </section>

      {/* 3. Featured Products */}
      <section className="featured-products">
        <h3>Featured Products</h3>
        <div className="product-slider">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}  // Link to the product detail page
              className="product-card"
            >
              <h4>{product.name}</h4>
              <p>{product.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Niqab Products */}
      <section className="niqab-section">
        <h3>Niqab Collection</h3>
        <div className="product-grid">
          {products.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}  // Link to the product detail page
              className="product-card"
            >
              <h4>{product.name}</h4>
              <p>{product.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. About Us */}
      <section className="about-section">
        <h3>About Hayat Collections</h3>
        <p>
          At Hayat Collections, we believe in blending modesty with elegance. 
          Our garments are handcrafted with love, inspired by timeless traditions 
          and modern aesthetics.
        </p>
      </section>

      {/* 6. Footer */}
      <footer className="footer">
        <p>© 2025 Hayat Collections. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

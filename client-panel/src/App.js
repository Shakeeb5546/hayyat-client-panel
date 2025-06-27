// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './HomePage.css';

// Components
import HeroSection from './components/HeroSection';
import Footer from './components/Footer';
import ClientProductList from './components/ClientProductList';

// Pages
import ProductDetailPage from './pages/ProductDetailPage';
import ProfileForm from './pages/ProfileForm';
import CartPage from './pages/CartPage';

function HomePage() {
  return (
    <div className="App">
      {/* Navbar */}
      <header className="navbar">
        <h1>Hayat Collections</h1>
        <nav>
          <a href="#products">Products</a>
          <a href="#about">About</a>
        </nav>
      </header>

      {/* Hero Section */}
      <HeroSection />

      {/* Product Section */}
      <section id="products">
        <h2 className="section-heading">Our Collections</h2>
        <ClientProductList />
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h3>About Hayat Collections</h3>
        <p>
          Hayat Collections is dedicated to delivering timeless Islamic fashion that embraces elegance,
          modesty, and comfort. Our collections are curated for the modern woman seeking grace in every thread.
        </p>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/profile-form" element={<ProfileForm />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './HeroSection.css';

// Move images array OUTSIDE component to avoid React warning
const images = Array.from({ length: 10 }, (_, i) => `/hero/${i + 1}.jpg`);

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []); // ✅ No warning now

  return (
    <section className="hero-section">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`hero-img ${index === currentIndex ? 'active' : ''}`}
        />
      ))}

      <div className="hero-overlay">
        <div className="hero-text">
          <h2>Elegance Meets Modesty</h2>
          <p>Discover our premium collection of Abayas, Niqabs, and more.</p>
          
          {/* ✅ "Shop Now" scrolls to #featured */}
          <a href="#featured">
            <button>Shop Now</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

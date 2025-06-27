import React from 'react';
import './Footer.css'; // We’ll make this next

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Hayat Collections. All rights reserved.</p>
        
        <a
          href="http://localhost:3000/login"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-login-button"
        >
          Admin Login
        </a>
      </div>
    </footer>
  );
};

export default Footer;

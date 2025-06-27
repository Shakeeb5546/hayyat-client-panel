import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';

const ClientProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(location.state?.product || null);
  const [loading, setLoading] = useState(!product);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error('❌ Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (!product) fetchProduct();
  }, [id, product]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userEmail = user.email;

      console.log('✅ Logged in as:', userEmail);
      localStorage.setItem('userEmail', userEmail);

      // ✅ Check if user has filled profile
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userEmail}`);
        const userData = res.data;

        if (userData.hasFilledProfile) {
          // ✅ Add product to cart
          await axios.post('http://localhost:5000/api/users/cart/add', {
            email: userEmail,
            productId: product._id,
          });

          console.log('🛒 Product added to cart');
          navigate('/cart', { state: { email: userEmail } });
        } else {
          navigate('/profile-form', { state: { product, email: userEmail } });
        }
      } catch (err) {
        if (err.response?.status === 404) {
          // User not found, send to profile form
          navigate('/profile-form', { state: { product, email: userEmail } });
        } else {
          console.error('❌ Error checking user profile:', err);
          alert('Something went wrong while verifying your profile.');
        }
      }
    } catch (err) {
      console.error('❌ Google Sign-In Failed:', err);
      alert('Login failed. Please try again.');
    }
  };

  if (loading) return <div style={styles.loading}>Loading...</div>;
  if (!product) return <div style={styles.error}>❌ Product not available</div>;

  return (
    <div style={styles.container}>
      {/* Image Gallery */}
      <div style={styles.gallery}>
        {product.images?.map((img, index) => (
          <img
            key={index}
            src={`http://localhost:5000/${img}`}
            alt={`product-${index}`}
            style={styles.galleryImage}
          />
        ))}
      </div>

      {/* Product Info */}
      <div style={styles.infoBox}>
        <h1 style={styles.title}>{product.name}</h1>
        <p style={styles.price}>Rs {product.price}</p>

        <div style={styles.meta}>
          <span><strong>Category:</strong> {product.category}</span>
          <span><strong>Available Colors:</strong> {product.colors?.split(',').join(', ')}</span>
          <span><strong>In Stock:</strong> {product.quantity}</span>
        </div>

        <div style={styles.description}>
          <h3 style={styles.descHeading}>Description</h3>
          <p>{product.description}</p>
        </div>

        <button style={styles.orderBtn} onClick={handleGoogleLogin}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 20px',
    fontFamily: `'Segoe UI', sans-serif`,
    backgroundColor: '#fefefe',
    maxWidth: 1200,
    margin: '0 auto'
  },
  loading: {
    padding: 50,
    textAlign: 'center',
    fontSize: 20,
  },
  error: {
    padding: 50,
    textAlign: 'center',
    fontSize: 18,
    color: 'crimson',
  },
  gallery: {
    display: 'flex',
    gap: 20,
    overflowX: 'auto',
    marginBottom: 30
  },
  galleryImage: {
    height: 500,
    width: 'auto',
    objectFit: 'cover',
    borderRadius: 10,
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10
  },
  price: {
    fontSize: 24,
    color: '#e74c3c',
    marginBottom: 20
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    marginBottom: 25,
    fontSize: 15,
    color: '#444'
  },
  description: {
    marginBottom: 25
  },
  descHeading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8
  },
  orderBtn: {
    backgroundColor: '#5C258D',
    color: 'white',
    padding: '12px 25px',
    fontSize: 16,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  }
};

export default ClientProductDetail;

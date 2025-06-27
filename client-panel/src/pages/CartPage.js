import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CartPage = () => {
  const email = localStorage.getItem('userEmail');
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/cart/${email}`);
      setCart(res.data.cartProducts);
    } catch (err) {
      console.error('❌ Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/users/cart/remove', {
        email,
        productId,
      });
      // Refresh cart
      fetchCart();
    } catch (err) {
      console.error('❌ Deletion failed:', err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <div style={styles.loading}>Loading cart...</div>;
  if (!cart || cart.length === 0) return <div style={styles.empty}>🛒 Cart is empty</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Cart</h2>
      {cart.map((item) => (
        <div key={item._id} style={styles.card}>
          <img src={`http://localhost:5000/${item.images[0]}`} alt={item.name} style={styles.img} />
          <div>
            <h3>{item.name}</h3>
            <p>Rs {item.price}</p>
            <button onClick={() => handleDelete(item._id)} style={styles.removeBtn}>❌ Remove</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { padding: 30, fontFamily: 'Segoe UI' },
  title: { fontSize: 24, marginBottom: 20 },
  loading: { padding: 50 },
  empty: { padding: 50, fontSize: 18 },
  card: {
    display: 'flex',
    gap: 20,
    marginBottom: 20,
    padding: 20,
    border: '1px solid #eee',
    borderRadius: 10,
    backgroundColor: '#fafafa'
  },
  img: { height: 120, width: 120, objectFit: 'cover', borderRadius: 8 },
  removeBtn: {
    marginTop: 10,
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: 6,
    cursor: 'pointer'
  }
};

export default CartPage;

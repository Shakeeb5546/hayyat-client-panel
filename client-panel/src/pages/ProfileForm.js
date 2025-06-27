import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ProfileForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    address: '',
    phone1: '',
    phone2: '',
    message: '',
    paymentMethod: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/users/complete-profile', formData);

      // ✅ Save email in localStorage
      localStorage.setItem('profileEmail', formData.email);
      console.log('📦 Saved to localStorage:', localStorage.getItem('profileEmail'));

      alert('✅ Profile submitted successfully!');

      // ✅ Pass email in navigation state as fallback
      navigate('/cart', { state: { email: formData.email } });
    } catch (err) {
      console.error('❌ Profile submission failed:', err);
      alert('Submission failed. See console for details.');
    }
  };

  return (
    <form className="profile-form" onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.heading}>Complete Your Profile</h2>
      <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
      <input name="fullName" placeholder="Full Name" value={formData.fullName} onChange={handleChange} required style={styles.input} />
      <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} required style={styles.input} />
      <input name="phone1" placeholder="Primary Phone" value={formData.phone1} onChange={handleChange} required style={styles.input} />
      <input name="phone2" placeholder="Secondary Phone" value={formData.phone2} onChange={handleChange} style={styles.input} />
      <input name="message" placeholder="Message" value={formData.message} onChange={handleChange} style={styles.input} />
      <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required style={styles.input}>
        <option value="">Select Payment Method</option>
        <option value="easypaisa">Easypaisa</option>
        <option value="jazzcash">Jazzcash</option>
        <option value="cash">Cash on Delivery</option>
      </select>
      <button type="submit" style={styles.button}>Submit Profile</button>
    </form>
  );
}

const styles = {
  form: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#f4f4f4',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  input: {
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '12px',
    backgroundColor: '#5C258D',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default ProfileForm;

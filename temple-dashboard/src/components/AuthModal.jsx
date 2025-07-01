// src/components/AuthModal.jsx
import { useState, useEffect, useRef } from 'react';
import './AuthModal.css';


const AuthModal = ({ mode, onClose }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
    const modalRef = useRef(null);

   // Handle clicks outside the modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${mode} form submitted:`, formData);
    onClose();
  };

   const handleClose = (e) => {
    e.stopPropagation(); // Stop event bubbling
    onClose(); // Close the modal
  };

  return (
    <div className="modal-overlay">
      <div className="auth-modal" ref={modalRef}>
        <button 
          className="close-btn" 
          onClick={handleClose} // Use the new handler
          aria-label="Close modal"
        >
          ×
        </button>
        <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
        
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" className="submit-btn">
            {mode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </form>
        
        {mode === 'login' ? (
          <p className="auth-switch">
            Don't have an account? <span onClick={() => onClose('signup')}>Sign up</span>
          </p>
        ) : (
          <p className="auth-switch">
            Already have an account? <span onClick={() => onClose('login')}>Login</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
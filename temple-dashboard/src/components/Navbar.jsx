import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";
import { Link } from 'react-router-dom';
import AuthModal from './AuthModal';

const Navbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const [authMode, setAuthMode] = useState(null); // 'login' or 'signup'
  
  // login/signup
   const handleAuthClick = (mode) => {
    setAuthMode(mode);
  };

  const closeAuthModal = (switchToMode = null) => {
    if (switchToMode) {
      setAuthMode(switchToMode);
    } else {
      setAuthMode(null);
    }
  };


  // Famous temples data
  const famousTemples = [
    { id: 1, name: "Tirupati Balaji", location: "Andhra Pradesh" },
    { id: 2, name: "Kashi Vishwanath", location: "Varanasi, UP" },
    { id: 3, name: "Golden Temple", location: "Amritsar, Punjab" },
    { id: 4, name: "Jagannath Temple", location: "Puri, Odisha" },
    { id: 5, name: "Meenakshi Temple", location: "Madurai, TN" },
    { id: 6, name: "Somnath Temple", location: "Gujarat" },
    { id: 7, name: "Badrinath Temple", location: "Uttarakhand" },
    { id: 8, name: "Kedarnath Temple", location: "Uttarakhand" },
    { id: 9, name: "Rameshwaram Temple", location: "Tamil Nadu" },
    { id: 10, name: "Vaishno Devi", location: "Jammu" },
  ];

  useEffect(() => {
    // Close suggestions when clicking outside
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    filterSuggestions(query);
  };

  const filterSuggestions = (query) => {
    if (query.length === 0) {
      // Show famous temples when empty
      setSuggestions(famousTemples);
    } else {
      // Filter based on input
      const filtered = famousTemples.filter(temple =>
        temple.name.toLowerCase().includes(query.toLowerCase()) ||
        temple.location.toLowerCase().includes(query.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSearchFocus = () => {
    // Show famous temples when focused (before typing)
    setSuggestions(famousTemples);
    setShowSuggestions(true);
  };

   const handleSuggestionClick = (temple) => {
    setSearchQuery(temple.name);
    setShowSuggestions(false);
    navigate(`/temple/${temple.id}`); 
  };

  return (
    <>
    <nav className="divine-navbar">
      <div className="nav-brand">
        <span>Divine Darshan</span>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/live-darshan">Live Darshan</Link></li>
        <li><Link to="/pooja-booking">Pooja Booking</Link></li>
        <li><Link to="/festivals">Festivals</Link></li>
      </ul>

     <div className="nav-right">
      <div className="nav-search" ref={searchRef}>
        <input 
          type="text" 
          placeholder="Search temple..." 
          className="search-input"
          value={searchQuery}
          onChange={handleSearchChange}
          onFocus={handleSearchFocus}
        />
        <button className="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </button>
        
        {showSuggestions && (
          <div className="suggestions-dropdown">
            {suggestions.length > 0 ? (
              suggestions.map(temple => (
                <div 
                  key={temple.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(temple)}
                >
                  <div className="temple-name">{temple.name}</div>
                  <div className="temple-location">{temple.location}</div>
                </div>
              ))
            ) : (
              <div className="no-results">No temples found</div>
            )}
          </div>
        )}
      </div>
      <div className="auth-buttons">
          <button className="login-btn" onClick={() => handleAuthClick('login')}>
            Login
          </button>
          <button className="signup-btn" onClick={() => handleAuthClick('signup')}>
            Sign Up
          </button>
        </div>
      </div>
    </nav>
    {authMode && (
        <AuthModal mode={authMode} onClose={closeAuthModal} />
      )}
      </>
  );
};

export default Navbar;
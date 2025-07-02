import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content glass-card">
          <h1>Welcome to Divine Darshan</h1>
          <p>Your spiritual journey begins here</p>
          <div className="hero-glow"></div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="features">
        <h2>Explore Divine Features</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card glass-card" key={index}>
              <div className="icon-circle">
                <span className="icon">{feature.icon}</span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="card-glow"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="cta-content glass-card">
          <h2>Begin Your Spiritual Journey Today</h2>
          <button className="primary-btn">Explore Temples Nearby</button>
          <div className="cta-glow"></div>
        </div>
      </section>
    </div>
  );
};

// Feature data
const features = [
  { icon: '⏱️', title: 'Live Timings', description: 'Real-time temple opening hours and rituals schedule' },
  { icon: '📅', title: 'Next Rituals', description: 'Upcoming puja schedules and special events' },
  { icon: '👥', title: 'Crowd Info', description: 'Live crowd status to plan your visit better' },
  { icon: '🏛️', title: 'Temple History', description: 'Discover the rich heritage of sacred places' },
  { icon: '💰', title: 'Donations', description: 'Support temples with secure online donations' },
  { icon: '🕯️', title: 'Pooja Booking', description: 'Book special pujas and rituals in advance' },
];

export default Home;

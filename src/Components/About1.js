import React from 'react';
import './About.css';

const About = () => {
  return (
    <div>
      {/* Parallax Section 1 */}
      <div className="parallax-section parallax-1">
        <div className="content">
          <h2>Welcome to DailyIndianTimes 📰</h2>
          <p>
            Discover the latest and most relevant news across the globe. We bring you
            trending topics in politics, business, technology, sports, and entertainment,
            all curated for the modern reader.
          </p>
        </div>
      </div>

      {/* Regular Section */}
      <div className="normal-section">
        <div className="content">
          <h3>Our Vision</h3>
          <p>
            Stay informed. Stay ahead. Our goal is to keep you updated with the latest
            stories from all corners of the world, ensuring you have the best source of
            information in the palm of your hand.
          </p>
        </div>
      </div>

      {/* Parallax Section 2 */}
      <div className="parallax-section parallax-2">
        <div className="content">
          <h3>Our Mission</h3>
          <p>
            To provide high-quality and reliable news coverage, creating an informative
            platform for readers to explore different perspectives on the news and stay
            ahead of global trends.
          </p>
        </div>
      </div>

      {/* Regular Section */}
      <div className="normal-section">
        <div className="content">
          <h3>Why Choose Us?</h3>
          <p>
            We offer fast and accurate news updates, ensuring that our readers are always
            at the forefront of important developments.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="about-footer">
        <div className="container">
          <p className="footer-text">Developed by Pranav Mane</p>
        </div>
      </footer>
    </div>
  );
};

export default About;

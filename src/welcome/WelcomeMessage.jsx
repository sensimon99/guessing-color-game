// src/WelcomeMessage.js
import React, { useState, useEffect } from 'react';

const WelcomeMessage = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [isBlurred, setIsBlurred] = useState(true); // State for blur effect

  useEffect(() => {
    // Show the message and apply the blur effect on mount
    setShowMessage(true);

    // Hide the message and remove the blur after 10 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
      setIsBlurred(false);
    }, 10000); // 10 seconds

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Blur the page content */}
      <div style={{ filter: isBlurred ? 'blur(5px)' : 'none', transition: 'filter 0.3s ease' }}>
        {/* Page content goes here */}
        <div className="content">
          {/* Other components like header, body, etc. */}
        </div>
      </div>

      {/* Show the welcome message */}
      {showMessage && (
        <div style={styles.message}>
          Welcome to the website! 🎉
        </div>
      )}
    </div>
  );
};

const styles = {
  message: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '20px 40px',
    borderRadius: '5px',
    fontSize: '20px',
    zIndex: 1000,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
  }
};

export default WelcomeMessage;

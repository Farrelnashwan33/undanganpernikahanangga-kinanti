import React, { useState, useEffect } from 'react';
import { FaMusic, FaVolumeMute, FaArrowUp } from 'react-icons/fa';
import styles from './Floating.module.css';

const Floating = ({ isMusicPlaying, toggleMusic }) => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.floatingContainer}>
      <button 
        className={`${styles.floatingBtn} ${styles.musicBtn} ${isMusicPlaying ? styles.spin : ''}`}
        onClick={toggleMusic}
        title={isMusicPlaying ? "Matikan Musik" : "Putar Musik"}
      >
        {isMusicPlaying ? <FaMusic /> : <FaVolumeMute />}
      </button>

      <button 
        className={`${styles.floatingBtn} ${styles.scrollBtn} ${showScroll ? styles.show : ''}`}
        onClick={scrollTop}
        title="Kembali ke Atas"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default Floating;

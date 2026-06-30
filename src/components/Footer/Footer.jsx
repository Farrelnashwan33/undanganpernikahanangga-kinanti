import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p className={styles.text}>
          Made with <span className={styles.heart}>❤</span> by <a href="#" className={styles.link}>Intan Creative Media</a>
        </p>
        <p className={styles.copyright}>
          &copy; 2026 Intan Creative Media. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

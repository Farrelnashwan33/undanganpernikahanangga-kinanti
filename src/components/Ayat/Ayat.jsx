import React from 'react';
import { motion } from 'framer-motion';
import styles from './Ayat.module.css';

const Ayat = ({ data }) => {
  return (
    <section className={`section ${styles.ayatSection}`}>
      <div className="container">
        <motion.div 
          className={`glass ${styles.ayatCard}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className={styles.ornamentTop}></div>
          <h3 className={styles.surah}>{data.quran.surah}</h3>
          <p className={styles.arabic}>{data.quran.arabic}</p>
          <p className={styles.latin}>{data.quran.latin}</p>
          <div className={styles.divider}></div>
          <p className={styles.translation}>"{data.quran.translation}"</p>
          <div className={styles.ornamentBottom}></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Ayat;

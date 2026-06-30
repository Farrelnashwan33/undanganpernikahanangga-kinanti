import React from 'react';
import { motion } from 'framer-motion';
import styles from './Closing.module.css';

const Closing = ({ data }) => {
  return (
    <section className={`section ${styles.closingSection}`}>
      <div className={styles.overlay}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <p className={styles.message}>{data.closing.message}</p>
          <p className={styles.thankYou}>Terima Kasih</p>
          <h2 className={styles.coupleNames}>
            {data.couple.groom.nickname} & {data.couple.bride.nickname}
          </h2>
        </motion.div>
      </div>
    </section>
  );
};

export default Closing;

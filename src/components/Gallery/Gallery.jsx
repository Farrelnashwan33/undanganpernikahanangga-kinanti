import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import styles from './Gallery.module.css';

const Gallery = ({ data }) => {
  const [index, setIndex] = useState(-1);

  // Convert for Lightbox
  const slides = data.gallery.map(img => ({ src: img.src }));

  return (
    <section className={`section ${styles.gallerySection}`}>
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Our Gallery</h2>
          <p className={styles.sectionSubtitle}>Momen-momen indah yang tak terlupakan.</p>
        </motion.div>

        <div className={styles.masonryGrid}>
          {data.gallery.map((img, i) => (
            <motion.div 
              key={i} 
              className={styles.gridItem}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              onClick={() => setIndex(i)}
            >
              <img 
                src={img.src} 
                alt={`Gallery ${i+1}`} 
                className={styles.image}
                loading="lazy"
              />
              <div className={styles.imageOverlay}>
                <span className={styles.zoomIcon}>+</span>
              </div>
            </motion.div>
          ))}
        </div>

        <Lightbox
          index={index}
          open={index >= 0}
          close={() => setIndex(-1)}
          slides={slides}
        />
      </div>
    </section>
  );
};

export default Gallery;

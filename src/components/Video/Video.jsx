import React from 'react';
import { motion } from 'framer-motion';
import styles from './Video.module.css';

const Video = ({ data }) => {
  if (!data.video || !data.video.youtubeId) return null;

  return (
    <section className={`section ${styles.videoSection}`}>
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Prewedding Video</h2>
        </motion.div>

        <motion.div 
          className={styles.videoWrapper}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <iframe
            src={`https://www.youtube.com/embed/${data.video.youtubeId}`}
            title="Prewedding Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Video;

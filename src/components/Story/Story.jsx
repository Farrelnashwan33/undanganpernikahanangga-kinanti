import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import styles from './Story.module.css';

const Story = ({ data }) => {
  return (
    <section className={`section ${styles.storySection}`}>
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Love Story</h2>
          <p className={styles.sectionSubtitle}>Perjalanan cinta kami hingga akhirnya memutuskan untuk hidup bersama.</p>
        </motion.div>

        <div className={styles.timeline}>
          {data.loveStory.map((story, index) => (
            <motion.div 
              key={index} 
              className={styles.timelineItem}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className={styles.timelineIcon}>
                <FaHeart />
              </div>
              <div className={styles.timelineContent}>
                <span className={styles.date}>{story.date}</span>
                <h3 className={styles.title}>{story.title}</h3>
                <p className={styles.desc}>{story.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Story;

import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import styles from './Events.module.css';

const Events = ({ data }) => {
  return (
    <section className={`section ${styles.eventsSection}`}>
      <div className={styles.overlay}></div>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Wedding Events</h2>
          <p className={styles.sectionSubtitle}>Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.</p>
        </motion.div>

        <div className={styles.cardsContainer}>
          {data.events.map((event, index) => (
            <motion.div 
              key={index}
              className={`glass ${styles.eventCard}`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className={styles.cardHeader}>
                <h3 className={styles.eventTitle}>{event.title}</h3>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.infoRow}>
                  <FaCalendarAlt className={styles.icon} />
                  <span>{event.date}</span>
                </div>
                <div className={styles.infoRow}>
                  <FaClock className={styles.icon} />
                  <span>{event.time}</span>
                </div>
                <div className={styles.infoRow}>
                  <FaMapMarkerAlt className={styles.icon} />
                  <span>{event.address}</span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <a 
                  href={event.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`btn-premium ${styles.mapBtn}`}
                >
                  <FaMapMarkerAlt /> Lihat Lokasi
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;

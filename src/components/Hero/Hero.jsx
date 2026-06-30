import React, { useState, useEffect } from 'react';
import styles from './Hero.module.css';
import { motion } from 'framer-motion';

const Hero = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(data.hero.date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.hero.date]);

  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h1 className={styles.title}>
            {data.couple.groom.name.split(' ')[0]} 
            <span className={styles.heart}>❤</span> 
            {data.couple.bride.name.split(' ')[0]}
          </h1>
          <p className={styles.subtitle}>We Are Getting Married</p>
        </motion.div>

        <motion.div 
          className={styles.countdownContainer}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <div className={styles.timeBox}>
            <span className={styles.number}>{timeLeft.days}</span>
            <span className={styles.label}>Hari</span>
          </div>
          <div className={styles.timeBox}>
            <span className={styles.number}>{timeLeft.hours}</span>
            <span className={styles.label}>Jam</span>
          </div>
          <div className={styles.timeBox}>
            <span className={styles.number}>{timeLeft.minutes}</span>
            <span className={styles.label}>Menit</span>
          </div>
          <div className={styles.timeBox}>
            <span className={styles.number}>{timeLeft.seconds}</span>
            <span className={styles.label}>Detik</span>
          </div>
        </motion.div>
      </div>
      
      {/* Floating Flowers */}
      <div className={`${styles.flower} ${styles.f1} animate-float`}>🌸</div>
      <div className={`${styles.flower} ${styles.f2} animate-float`}>🍃</div>
      <div className={`${styles.flower} ${styles.f3} animate-float`}>🌸</div>
    </section>
  );
};

export default Hero;

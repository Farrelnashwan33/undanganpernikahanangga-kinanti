import React from 'react';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa';
import styles from './Profile.module.css';

const Profile = ({ data }) => {
  return (
    <section className={`section ${styles.profileSection}`}>
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Groom & Bride</h2>
          <p className={styles.sectionSubtitle}>Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan.</p>
        </motion.div>

        <div className={styles.coupleContainer}>
          {/* Groom */}
          <motion.div 
            className={styles.personCard}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className={styles.imageWrapper}>
              <img src={data.couple.groom.photo} alt={data.couple.groom.name} className={styles.photo} loading="lazy" />
              <div className={styles.imageFrame}></div>
            </div>
            <h3 className={styles.name}>{data.couple.groom.name}</h3>
            <p className={styles.parents}>
              Putra dari <br />
              <span className={styles.parentName}>{data.couple.groom.father} & {data.couple.groom.mother}</span>
            </p>
            <p className={styles.desc}>{data.couple.groom.description}</p>
            <a href={`https://instagram.com/${data.couple.groom.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.igBtn}>
              <FaInstagram /> {data.couple.groom.instagram}
            </a>
          </motion.div>

          {/* And icon */}
          <div className={styles.andSymbol}>&</div>

          {/* Bride */}
          <motion.div 
            className={styles.personCard}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className={styles.imageWrapper}>
              <img src={data.couple.bride.photo} alt={data.couple.bride.name} className={styles.photo} loading="lazy" />
              <div className={styles.imageFrame}></div>
            </div>
            <h3 className={styles.name}>{data.couple.bride.name}</h3>
            <p className={styles.parents}>
              Putri dari <br />
              <span className={styles.parentName}>{data.couple.bride.father} & {data.couple.bride.mother}</span>
            </p>
            <p className={styles.desc}>{data.couple.bride.description}</p>
            <a href={`https://instagram.com/${data.couple.bride.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className={styles.igBtn}>
              <FaInstagram /> {data.couple.bride.instagram}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Profile;

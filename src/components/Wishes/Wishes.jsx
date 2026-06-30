import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane, FaUserCircle } from 'react-icons/fa';
import styles from './Wishes.module.css';

// This is a placeholder for actual Firebase integration
// You would import from your firebase service here:
// import { addWish, getWishes } from '../../services/firebase';

const Wishes = () => {
  const [wishes, setWishes] = useState(() => {
    const saved = localStorage.getItem('weddingWishes');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: 1, name: 'Budi & Keluarga', message: 'Selamat menempuh hidup baru, semoga samawa!', status: 'Hadir', timestamp: new Date().toISOString() },
      { id: 2, name: 'Siti Aminah', message: 'Mohon maaf belum bisa hadir. Doa terbaik untuk kalian berdua.', status: 'Berhalangan', timestamp: new Date(Date.now() - 86400000).toISOString() }
    ];
  });
  const [formData, setFormData] = useState({ name: '', message: '', status: 'Hadir' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem('weddingWishes', JSON.stringify(wishes));
  }, [wishes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      const newWish = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString()
      };
      setWishes([newWish, ...wishes]);
      setFormData({ name: '', message: '', status: 'Hadir' });
      setIsSubmitting(false);
    }, 500);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit' });
  };

  return (
    <section className={`section ${styles.wishesSection}`}>
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className={styles.sectionTitle}>Ucapan & Doa</h2>
          <p className={styles.sectionSubtitle}>Berikan doa restu untuk kedua mempelai.</p>
        </motion.div>

        <div className={styles.wishesContainer}>
          <motion.div 
            className={styles.formContainer}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Nama</label>
                <input 
                  type="text" 
                  placeholder="Nama Lengkap" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Ucapan</label>
                <textarea 
                  placeholder="Berikan ucapan dan doa..." 
                  rows="4"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <div className={styles.formGroup}>
                <label>Konfirmasi Kehadiran</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                >
                  <option value="Hadir">Hadir</option>
                  <option value="Berhalangan">Berhalangan</option>
                </select>
              </div>
              <button type="submit" className={`btn-premium ${styles.submitBtn}`} disabled={isSubmitting}>
                {isSubmitting ? 'Mengirim...' : <><FaPaperPlane /> Kirim Ucapan</>}
              </button>
            </form>
          </motion.div>

          <motion.div 
            className={styles.listContainer}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className={styles.wishesList}>
              {wishes.map((wish) => (
                <div key={wish.id} className={styles.wishItem}>
                  <div className={styles.wishHeader}>
                    <FaUserCircle className={styles.avatar} />
                    <div className={styles.wishMeta}>
                      <h4>{wish.name}</h4>
                      <span className={styles.timestamp}>{formatDate(wish.timestamp)}</span>
                    </div>
                    <span className={`${styles.statusBadge} ${wish.status === 'Hadir' ? styles.statusHadir : styles.statusAbsen}`}>
                      {wish.status}
                    </span>
                  </div>
                  <p className={styles.wishMessage}>{wish.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Wishes;

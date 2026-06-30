import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCopy, FaCheck, FaGift } from 'react-icons/fa';
import styles from './Gifts.module.css';

const Gifts = ({ data }) => {
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <section className={`section ${styles.giftsSection}`}>
      <div className="container">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className={styles.iconWrapper}>
            <FaGift />
          </div>
          <h2 className={styles.sectionTitle}>Wedding Gift</h2>
          <p className={styles.sectionSubtitle}>Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, jika Anda ingin memberikan tanda kasih, kami menyediakan fitur di bawah ini.</p>
        </motion.div>

        <div className={styles.cardsContainer}>
          {data.gifts.banks.map((bank, index) => (
            <motion.div 
              key={index}
              className={`glass ${styles.giftCard}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className={styles.bankName}>{bank.name}</h3>
              <p className={styles.accountNumber}>{bank.account}</p>
              <p className={styles.accountHolder}>a.n {bank.holder}</p>
              
              <button 
                className={`btn-premium ${styles.copyBtn}`}
                onClick={() => copyToClipboard(bank.account, `bank-${index}`)}
              >
                {copied === `bank-${index}` ? <><FaCheck /> Disalin</> : <><FaCopy /> Salin No. Rek</>}
              </button>
            </motion.div>
          ))}

          {/* Kirim Kado (Address) */}
          <motion.div 
            className={`glass ${styles.giftCard} ${styles.addressCard}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className={styles.bankName}>Kirim Kado</h3>
            <p className={styles.addressText}>{data.gifts.address}</p>
            
            <button 
              className={`btn-outline ${styles.copyBtn}`}
              onClick={() => copyToClipboard(data.gifts.address, 'address')}
            >
              {copied === 'address' ? <><FaCheck /> Disalin</> : <><FaCopy /> Salin Alamat</>}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Gifts;

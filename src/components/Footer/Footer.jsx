import styles from './Footer.module.scss';
import React from 'react';

function Footer() {

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <h2 className={styles.logo}>Star Wars</h2>
        <p>© 2024 Star Wars Universe. All rights reserved.</p>
        <div className={styles.socials}>
          <a href="#" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
    </footer>
);
}

export default React.memo(Footer);

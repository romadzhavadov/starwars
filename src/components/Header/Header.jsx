import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import React from 'react';

function Header() {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo}>
        Star Wars
      </Link>
    </header>
  );
}

export default React.memo(Header);

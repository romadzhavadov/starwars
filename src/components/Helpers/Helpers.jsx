import styles from './Helpers.module.scss';
import { useSelector } from 'react-redux';


export function Loading() {
  const { isLoading } = useSelector((state) => state.hero);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <h2>Loading...</h2>
      </div>
    );
  }
}

export function Error() {
  const { error } = useSelector((state) => state.hero);

  if (error) {
    return (
      <div className={styles.errorOrNotFound}>
        <h2>Error:</h2>
        <p>{error}</p>
      </div>
    );
  }
}

export function NotFound() {
  const { data } = useSelector((state) => state.hero);
  
  if (!data) {
    return (
      <div className={styles.errorOrNotFound}>
        <h2>No hero found</h2>
        <p>We couldn&apos;t find the hero you&apos;re looking for. Please try again later or check the hero ID.</p>
      </div>
    );
  }
}




import styles from './SingleTGContainer.module.scss';

export default function SingleTGContainer({ children }) {
  return (
    <div className={styles.component}>
      {children}
    </div>
  );
}

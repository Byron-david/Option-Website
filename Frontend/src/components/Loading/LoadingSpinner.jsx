// components/LoadingSpinner.jsx
import styles from './LoadingSpinner.module.css'; // Create this CSS module

export default function LoadingSpinner({ size = 40, color = '#3b82f6' }) {
  return (
    <div className={styles.spinnerContainer}>
      <svg
        className={styles.spinner}
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ color }}
      >
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
        ></circle>
      </svg>
    </div>
  );
}
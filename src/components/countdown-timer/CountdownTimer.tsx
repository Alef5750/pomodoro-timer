import styles from "./countdown-timer.module.css";

interface propTypes {
  taskTitle: string;
  targetTime: number;
}

const CountdownTimer = ({ taskTitle, targetTime }: propTypes) => {
  return (
    <section className={styles.timerSection}>
      <div className={styles.timerHeading}>
        Time left for <em>{taskTitle}</em>
      </div>
    </section>
  );
};

export default CountdownTimer;

import styles from "./Timer.module.css";

const Timer = ({ taskTitle }: { taskTitle: string }) => {
  return (
    <section className={styles.timerSection}>
      <h1 className={styles.timerHeading}>Timer</h1>
      <h2 className={styles.taskTitle}>{taskTitle}</h2>
    </section>
  );
};

export default Timer;

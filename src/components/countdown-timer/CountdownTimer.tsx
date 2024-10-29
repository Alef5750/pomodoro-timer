import { useEffect, useRef, useState } from "react";
import styles from "./countdown-timer.module.css";

interface propTypes {
  taskTitle: string;
  targetTime: number;
}

const CountdownTimer = ({ taskTitle, targetTime }: propTypes) => {
  // Step 1: Initialize timeLeft state with the difference between targetTime and current time
  const [timeLeft, setTimeLeft] = useState<number>(targetTime - Date.now());

  // Step 2: Use useRef to store the interval ID, so it doesn’t change on re-renders
  const intervalRef = useRef<number | null>(null);

  // Step 3: Update timeLeft state every second
  useEffect(() => {
    // Function to calculate and set remaining time
    const updateTimer = () => {
      const newTimeLeft = targetTime - Date.now();
      setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
      // If time is up, clear the interval
      if (newTimeLeft <= 0 && intervalRef.current) {
        clearInterval(intervalRef.current);
        alert("It's over!!");
      }
    };
    intervalRef.current = setInterval(updateTimer, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [targetTime]);

  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const formattedSeconds = seconds.toString().padStart(2, "0");
  return (
    <section className={styles.timerSection}>
      <div className={styles.timerHeading}>
        Time left for <em>{taskTitle}</em>
      </div>
      <div>
        {minutes}:{formattedSeconds}
      </div>
    </section>
  );
};

export default CountdownTimer;

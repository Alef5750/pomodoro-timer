import { useRef, useState } from "react";
import styles from "./countdown-timer.module.css";

export type TimerStatus = "standby" | "counting" | "paused" | "finished";
interface propTypes {
  targetTime: number;
  status: TimerStatus;
  updateStatus: (newStatus: TimerStatus) => void;
}

const CountdownTimer = ({ targetTime, status, updateStatus }: propTypes) => {
  const [timeLeft, setTimeLeft] = useState<number>(targetTime * 60);

  const intervalRef = useRef<number | null>(null);

  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  let buttonText = "";
  if (status === "standby") buttonText = "Start";
  else if (status === "counting") buttonText = "Pause";
  else if (status === "paused") buttonText = "Resume";

  const callback = () => {
    setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0)); // Ensure it doesn't go negative
    updateStatus("counting");
    if (timeLeft <= 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };
  const startTimer = () => {
    intervalRef.current = setInterval(callback, 1000);
  };

  const handleClick = () => {
    if (buttonText === "Start") {
      startTimer();
    } else if (buttonText === "Pause" && intervalRef.current) {
      clearInterval(intervalRef.current);
      updateStatus("paused");
    } else if (buttonText === "Resume" && intervalRef.current) {
      startTimer();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
      <div className={styles.timerDisplay}>
        {minutes}:{seconds}
      </div>
    </div>
  );
};

export default CountdownTimer;

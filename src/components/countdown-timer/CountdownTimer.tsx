import { useRef, useState, useEffect } from "react";
import styles from "./countdown-timer.module.css";

export type TimerStatus = "standby" | "counting" | "paused" | "finished";
interface propTypes {
  targetTime: number;
  status: TimerStatus;
  updateStatus: (newStatus: TimerStatus) => void;
  updateTargetTime: (newTargetTime: number) => void;
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
  else if (status === "finished") buttonText = "Next";

  const startTimer = () => {
    updateStatus("counting");
    const callback = () => {
      setTimeLeft((prevTimeLeft) => {
        return prevTimeLeft <= 0 && intervalRef.current
          ? 0
          : Math.max(prevTimeLeft - 1, 0);
      });
    };
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

  useEffect(() => {
    if (timeLeft === 0 && intervalRef.current) {
      clearInterval(intervalRef.current);
      updateStatus("finished");
    }
  }, [timeLeft, updateStatus, status]);

  return (
    <div>
      <button onClick={handleClick}>{buttonText}</button>
      <div className={styles.timerDisplay}>
        {minutes}:{seconds}
      </div>
      <p>Status: {status}</p>
    </div>
  );
};

export default CountdownTimer;

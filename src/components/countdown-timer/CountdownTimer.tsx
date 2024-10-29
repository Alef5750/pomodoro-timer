import { useEffect, useRef, useState } from "react";
import styles from "./countdown-timer.module.css";

export type TimerStatus = "standby" | "counting" | "paused" | "finished";
interface propTypes {
  targetTime: number;
  status: TimerStatus;
}

const CountdownTimer = ({ targetTime, status }: propTypes) => {
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

  const handleClick = () => {
    if (buttonText === "Start") {
      const updateTimer = () => {
        setTimeLeft((prevTimeLeft) => Math.max(prevTimeLeft - 1, 0)); // Ensure it doesn't go negative
        if (timeLeft <= 0 && intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };

      intervalRef.current = setInterval(updateTimer, 1000);
    }
  };
  //   useEffect(() => {
  //     const updateTimer = () => {
  //       const newTimeLeft = targetTime - Date.now();
  //       setTimeLeft(newTimeLeft > 0 ? newTimeLeft : 0);
  //       if (newTimeLeft <= 0 && intervalRef.current) {
  //         clearInterval(intervalRef.current);
  //         console.log("It's over!!", targetTime / 60);
  //       }
  //     };
  //     intervalRef.current = setInterval(updateTimer, 1000);
  //     return () => {
  //       if (intervalRef.current) clearInterval(intervalRef.current);
  //     };
  //   }, [targetTime]);

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

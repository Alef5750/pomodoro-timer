import { useEffect, useRef, useState } from "react";
import styles from "./countdown-timer.module.css";

export type TimerStatus = "standby" | "counting" | "paused" | "finished";
interface propTypes {
  targetTime: number;
  status: TimerStatus;
}

const CountdownTimer = ({ targetTime, status }: propTypes) => {
  const [timeLeft, setTimeLeft] = useState<number>(targetTime - Date.now());

  const intervalRef = useRef<number | null>(null);
  const minutes = Math.floor((timeLeft / 1000 / 60) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");

  let buttonText = "";
  if (status === "standby") buttonText = "Start";
  else if (status === "counting") buttonText = "Pause";
  else if (status === "paused") buttonText = "Resume";
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
      <button>{buttonText}</button>
      <div className={styles.timerDisplay}>
        {formattedMinutes}:{formattedSeconds}
      </div>
    </div>
  );
};

export default CountdownTimer;

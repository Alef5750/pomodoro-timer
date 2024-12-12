import { useRef, useState, useEffect } from "react";
import styles from "./countdown-timer.module.css";
import { FaPlay, FaPause } from "react-icons/fa";
import { GrResume } from "react-icons/gr";

import Button from "./Button";

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

  let buttonContent:
    | string
    | React.ComponentType<React.SVGProps<SVGSVGElement>> = "";

  if (status === "standby") buttonContent = FaPlay;
  else if (status === "counting") buttonContent = FaPause;
  else if (status === "paused") buttonContent = GrResume;
  else if (status === "finished") buttonContent = "Next";

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
    if (buttonContent === FaPlay) {
      startTimer();
    } else if (buttonContent === FaPause && intervalRef.current) {
      clearInterval(intervalRef.current);
      updateStatus("paused");
    } else if (buttonContent === GrResume && intervalRef.current) {
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
    <div className={styles.container}>
      <div className={styles.timerDisplay}>
        <span className={styles.timeLeft}>
          {minutes}:{seconds}
        </span>
      </div>

      <Button
        Icon={typeof buttonContent !== "string" ? buttonContent : null}
        text={typeof buttonContent === "string" ? buttonContent : ""}
        handleClick={handleClick}
      />
    </div>
  );
};

export default CountdownTimer;

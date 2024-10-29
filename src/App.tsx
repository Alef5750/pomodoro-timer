import { useState } from "react";
import TaskList from "./components/task-list/TaskList";
import { ITask } from "./types/types";
import styles from "./App.module.css";
import CountdownTimer, {
  TimerStatus,
} from "./components/countdown-timer/CountdownTimer";

//TODO: change to 25 minute timer
// const initialTargetTime = Date.now() + 25 * 60 * 1000;
const initialTargetTime = Date.now() + 12 * 1000;

function App() {
  const [currentTask, setCurrentTask] = useState<ITask | undefined>(undefined);
  const [targetTime, setTargetTime] = useState<number>(initialTargetTime);
  const [timerStatus, setTimerStatus] = useState<TimerStatus>("standby");
  const selectTask = (task: ITask) => setCurrentTask(task);

  const titleText = currentTask
    ? `Focusing on ${currentTask.title.toUpperCase()}`
    : "Please choose a task to focus on";
  return (
    <div className={styles.container}>
      <section className={styles.timerSection}>
        <h1>{titleText}</h1>
        {currentTask ? (
          <CountdownTimer targetTime={targetTime} status={timerStatus} />
        ) : (
          ""
        )}
      </section>
      <TaskList selectTask={selectTask} />
    </div>
  );
}

export default App;

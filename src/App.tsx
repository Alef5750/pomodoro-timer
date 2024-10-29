import { useState } from "react";
import TaskList from "./components/task-list/TaskList";
import { ITask } from "./types/types";
import styles from "./App.module.css";
import CountdownTimer, {
  TimerStatus,
} from "./components/countdown-timer/CountdownTimer";

function App() {
  const [currentTask, setCurrentTask] = useState<ITask | undefined>(undefined);
  const [targetTime, setTargetTime] = useState<number>(0.1);
  const [status, setStatus] = useState<TimerStatus>("standby");
  const selectTask = (task: ITask) => setCurrentTask(task);

  const updateStatus = (newStatus: TimerStatus) => {
    setStatus(newStatus);
  };

  const titleText = currentTask
    ? `Focusing on ${currentTask.title.toUpperCase()}`
    : "Please choose a task to focus on";
  return (
    <div className={styles.container}>
      <section className={styles.timerSection}>
        <h1>{titleText}</h1>
        {currentTask ? (
          <CountdownTimer
            targetTime={targetTime}
            status={status}
            updateStatus={updateStatus}
          />
        ) : (
          ""
        )}
      </section>
      <TaskList selectTask={selectTask} />
    </div>
  );
}

export default App;

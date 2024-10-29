import { useState } from "react";
import TaskList from "./components/task-list/TaskList";
import { ITask } from "./types/types";
import styles from "./App.module.css";
import CountdownTimer from "./components/countdown-timer/CountdownTimer";

function App() {
  const [currentTask, setCurrentTask] = useState<ITask | undefined>(undefined);

  const selectTask = (task: ITask) => setCurrentTask(task);
  const targetTime = Date.now() + 10 * 1000;
  // const targetTime = Date.now() + 25 * 60 * 1000;
  console.log(targetTime);

  return (
    <div className={styles.container}>
      {currentTask && (
        <CountdownTimer
          taskTitle={currentTask?.title}
          targetTime={targetTime}
        />
      )}
      <TaskList selectTask={selectTask} />
    </div>
  );
}

export default App;

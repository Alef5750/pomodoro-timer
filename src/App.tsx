import { useState } from "react";
import TaskList from "./components/task-list/TaskList";
import { ITask } from "./types/types";
import { tasks } from "./data";
import styles from "./App.module.css";
import CountdownTimer from "./components/countdown-timer/CountdownTimer";

function App() {
  const [currentTask, setCurrentTask] = useState<ITask>(tasks[0]);

  const selectTask = (task: ITask) => setCurrentTask(task);

  return (
    <div className={styles.container}>
      <CountdownTimer taskTitle={currentTask.title} targetTime={25} />
      <TaskList selectTask={selectTask} />
    </div>
  );
}

export default App;

import { useState } from "react";
import Timer from "./components/timer/Timer";
import TaskList from "./components/tasks/task-list/TaskList";
import { ITask } from "./types/types";
import { tasks } from "./data";
import styles from "./App.module.css";

function App() {
  const [currentTask, setCurrentTask] = useState<ITask>(tasks[0]);

  const selectTask = (task: ITask) => setCurrentTask(task);

  return (
    <div className={styles.container}>
      <Timer taskTitle={currentTask.title} />
      <TaskList selectTask={selectTask} />
    </div>
  );
}

export default App;

import { useEffect, useState } from "react";
import { ITask } from "../../types/types";
import TaskItem from "../task-item/TaskItem";
import styles from "./task-list.module.css";
import axios from "axios";

const baseUrl = "https://66e9905787e417609449f8bc.mockapi.io/api/v1";

const TaskList = ({ selectTask }: { selectTask: (task: ITask) => void }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${baseUrl}/todos`);
      setTasks(response.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.taskListContainer}>
      <h1 className={styles.taskListHeading}>Tasks</h1>
      {tasks.map((t, idx) => (
        <div key={idx} className={styles.taskWrapper}>
          <button className={styles.focusButton} onClick={() => selectTask(t)}>
            Focus on me!
          </button>
          <TaskItem task={t} />
        </div>
      ))}
    </div>
  );
};

export default TaskList;

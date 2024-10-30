import { useEffect, useRef, useState } from "react";
import { ITask } from "../../types/types";
import TaskItem from "../task-item/TaskItem";
import styles from "./task-list.module.css";
import axios from "axios";

const baseUrl = "https://66e9905787e417609449f8bc.mockapi.io/api/v1";
const initialNewTask: ITask = {
  title: "",
  isComplete: false,
};
const TaskList = ({ selectTask }: { selectTask: (task: ITask) => void }) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const inputTaskRef = useRef<HTMLInputElement>(null);
  const fetchTasks = async () => {
    const response = await axios.get(`${baseUrl}/todos`);
    setTasks(response.data);
  };
  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`${baseUrl}/todos/${id}`);
    fetchTasks();
  };
  const handleCheck = async (isComplete: boolean, id: number | undefined) => {
    const response = await axios.put(`${baseUrl}/todos/${id}`, { isComplete });
    const success = response.status === 200;
    if (success) fetchTasks();
  };
  const handleSubmit = async () => {
    if (inputTaskRef.current) {
      const newTitle = inputTaskRef.current.value;
      const newTask = { ...initialNewTask, title: newTitle };
      console.log(newTask);
      const response = await axios.post(`${baseUrl}/todos`, newTask);
      const success = response.status === 200;
      if (success) fetchTasks();
    }
  };
  return (
    <div className={styles.taskListContainer}>
      <h1 className={styles.taskListHeading}>Tasks</h1>
      <input ref={inputTaskRef} type="text" placeholder="E.g: Go Shopping" />
      <button onClick={handleSubmit}>+</button>
      {tasks.map((t, idx) => (
        <div key={idx} className={styles.taskWrapper}>
          <button className={styles.focusButton} onClick={() => selectTask(t)}>
            Focus on me!
          </button>
          <TaskItem
            task={t}
            handleDelete={handleDelete}
            handleCheck={handleCheck}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskList;

import { ITask } from "../../types/types";
import styles from "./task-item.module.css";

const TaskItem = ({ task }: { task: ITask }) => {
  const updateTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.checked);
  };
  return (
    <div className={styles.taskItem}>
      <h2 className={styles.taskTitle}>{task.title.toUpperCase()}</h2>
      <p className={styles.taskBody}>{task.body}</p>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={task.isComplete}
          id="completed"
          className={styles.checkbox}
          onChange={updateTask}
        />
        <label htmlFor="completed" className={styles.checkboxLabel}>
          Completed
        </label>
      </div>
    </div>
  );
};

export default TaskItem;

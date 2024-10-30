import { ITask } from "../../types/types";
import styles from "./task-item.module.css";

interface ITaskItemProps {
  task: ITask;
  handleDelete: (id: number) => void;
  handleCheck: (isComplete: boolean, id: number | undefined) => void;
}
const TaskItem = ({ task, handleDelete, handleCheck }: ITaskItemProps) => {
  return (
    <div className={styles.taskItem}>
      <h2
        style={task.isComplete ? { textDecoration: "line-through" } : {}}
        className={styles.taskTitle}
      >
        {task.title.toUpperCase()}
      </h2>
      <button
        onClick={() => (task.id ? handleDelete(task.id) : "")}
        className={styles.deleteButton}
      >
        X
      </button>
      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          checked={task.isComplete}
          id="completed"
          className={styles.checkbox}
          onChange={(e) => handleCheck(e.target.checked, task.id)}
        />
        <label htmlFor="completed" className={styles.checkboxLabel}>
          Completed
        </label>
      </div>
    </div>
  );
};

export default TaskItem;

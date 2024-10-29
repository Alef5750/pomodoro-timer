import { tasks } from "../../../data";
import { ITask } from "../../../types/types";
import TaskItem from "../task-item/TaskItem";
import styles from "./task-list.module.css";

const TaskList = ({ selectTask }: { selectTask: (task: ITask) => void }) => {
  return (
    <div className={styles.taskListContainer}>
      <h1 className={styles.taskListHeading}>Tasks</h1>
      {tasks.map((t) => (
        <div className={styles.taskWrapper}>
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

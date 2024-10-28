import { ITask } from "../../types/types";

const TaskItem = ({ task }: { task: ITask }) => {
  return (
    <div style={{ border: "3px solid blue", margin: "5px", width: "600px" }}>
      <h2>{task.title}</h2>
      <p>{task.body}</p>
      <input type="checkbox" checked={task.isComplete} id="completed" />
      <label htmlFor="completed">Completed</label>
    </div>
  );
};

export default TaskItem;

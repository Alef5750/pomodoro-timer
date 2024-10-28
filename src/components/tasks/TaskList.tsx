import { tasks } from "../../data";
import TaskItem from "./TaskItem";

const TaskList = () => {
  return (
    <>
      <h1>Tasks</h1>
      {tasks.map((t) => (
        <TaskItem task={t} />
      ))}
    </>
  );
};

export default TaskList;

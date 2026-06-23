import { memo, useContext } from "react";
import { TasksContext } from "../../context/TasksContext";
import TodoItem from "../TodoItem/TodoItem";

const TodoList = (props) => {
  const { styles } = props

  const { tasks, filteredTasks } = useContext(TasksContext);

  const isHasTasks = tasks.length > 0;
  const isEmptyFilteredTasks = filteredTasks?.length === 0;

  if (!isHasTasks) {
    return <div className={styles.emptyMessage}>There are no tasks yet!</div>;
  }

  if (isHasTasks && isEmptyFilteredTasks) {
    return <div className={styles.emptyMessage}>Tasks not found!</div>;
  }

  return (
    <ul className={styles.list}>
      {(filteredTasks ?? tasks).map((task) => (
        <TodoItem
          className={styles.item}
          key={task.id}
          {...task} />
      ))}
    </ul>
  );
};

export default memo(TodoList);

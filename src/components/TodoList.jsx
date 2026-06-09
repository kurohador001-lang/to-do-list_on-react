import { memo } from "react";
import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const {
    tasks = [],
    filteredTasks,
    firstIncompleteTaskRef,
    firstIncompleteTaskId,
    onDeleteTaskClick,
    onToggleTaskCompleteChange,
  } = props;

  const isHasTasks = tasks.length > 0
  const isEmptyFilteredTasks = filteredTasks?.length === 0

  if (!isHasTasks) {
    return <div className="todo__empty-message">There are no tasks yet!</div>
  }

  if (isHasTasks && isEmptyFilteredTasks) {
    return <div className="todo__empty-message">Tasks not found!</div>
  }

  return (
    <ul className="todo__list">
      {(filteredTasks ?? tasks).map((task) => (
          <TodoItem
            key = {task.id}
            ref={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
            onDeleteTaskClick = {onDeleteTaskClick}
            onToggleTaskCompleteChange = {onToggleTaskCompleteChange}
            {...task}
          />
      ))}
    </ul>
  );
};

export default memo(TodoList);

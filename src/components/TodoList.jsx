import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const {
    tasks = [],
    filteredTasks,
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
      {(filteredTasks ?? tasks).map(({className, id, title, isDone}) => (
          <TodoItem
            key = {id}
            className = {className}
            id = {id}
            title = {title}
            isDone = {isDone}
            onDeleteTaskClick = {onDeleteTaskClick}
            onToggleTaskCompleteChange = {onToggleTaskCompleteChange}
          />
      ))}
    </ul>
  );
};

export default TodoList;

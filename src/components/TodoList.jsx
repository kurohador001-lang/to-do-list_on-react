import TodoItem from "./TodoItem";

const TodoList = (props) => {
  const isHasTasks = true;

  if (!isHasTasks) {
    return <div className="todo__empty-message"></div>;
  }

  const {
    tasks = []
  } = props;

  return (
    <ul className="todo__list">
      {tasks.map(({className, id, title, isDone}) => (
          <TodoItem
            key = {id}
            className = {className}
            id = {id}
            title = {title}
            isDone = {isDone}
          />
      ))}
    </ul>
  );
};

export default TodoList;

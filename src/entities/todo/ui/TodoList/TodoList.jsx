import { memo } from "react";
import { useContextSelector } from "use-context-selector";
import { TasksContext } from "@/widgets/Todo";
import { TodoItem } from "@/entities/todo";

const TodoList = (props) => {
  const {
    styles,
    firstIncompleteTaskRef,
  } = props;

  const select = (key) => (state) => state[key]

  const tasks = useContextSelector(TasksContext, select('tasks'))
  const filteredTasks = useContextSelector(TasksContext, select('filteredTasks'))
  const firstIncompleteTaskId = tasks.find(({ isDone }) => isDone === false)?.id

  const disappearingTaskId = useContextSelector(TasksContext, select('disappearingTaskId'))
  const appearingTaskId = useContextSelector(TasksContext, select('appearingTaskId'))

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
        {...task}
        itemRef={task.id === firstIncompleteTaskId ? firstIncompleteTaskRef : null}
        disappearingTaskId={task.id === disappearingTaskId ? disappearingTaskId : null}
        appearingTaskId={task.id === appearingTaskId ? appearingTaskId : null}
        />
      ))}
    </ul>
  );
};

export default memo(TodoList);
import { useState } from "react";
import { useContextSelector } from "use-context-selector";
import { TasksContext } from "@/widgets/Todo";
import Button from "@/shared/ui/Button";
import Field from "@/shared/ui/Field";


const AddTaskForm = (props) => {
  const { styles } = props

  const addTask = useContextSelector(TasksContext, (state) => state.addTask)
  const newTaskInputRef = useContextSelector(TasksContext, (state) => state.newTaskInputRef)

  const [taskTitle, setTaskTitle] = useState("");
  const clearTaskTitle = taskTitle.trim();
  const isEmptyTaskTitle = clearTaskTitle.length === 0;

  const [error, setError] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (!isEmptyTaskTitle) {
      addTask(
        clearTaskTitle,
        () => setTaskTitle("")
      );
    }
  };

  const onInput = (event) => {
    const { value } = event.target;
    const clearValue = value.trim();
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0;

    setTaskTitle(value);
    setError(hasOnlySpaces ? "The task cannot be empty!" : "");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <Field
        className={styles.field}
        id="new-task"
        label="Add New Task"
        value={taskTitle}
        error={error}
        onInput={onInput}
        ref={newTaskInputRef}
      />
      <Button type="submit" isDisabled={isEmptyTaskTitle}>
        Add
      </Button>
    </form>
  );
};

export default AddTaskForm;

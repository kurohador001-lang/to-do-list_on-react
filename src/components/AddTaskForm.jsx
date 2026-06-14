import { useContext, useState } from "react";
import Button from "./Button";
import Field from "./Field";
import { TasksContext } from "../context/TasksContext";

const AddTaskForm = () => {
  const {
    addTask,
    taskTitle,
    setTaskTitle,
    newTaskInputRef,
  } = useContext(TasksContext)

  const clearTaskTitle = taskTitle.trim()
  const isEmptyTaskTitle = clearTaskTitle.length === 0

  const [error, setError] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    if (!isEmptyTaskTitle) {
      addTask(clearTaskTitle)
    }
  }

  const onInput = (event) => {
    const {value} = event.target
    const clearValue = value.trim()
    const hasOnlySpaces = value.length > 0 && clearValue.length === 0

    setTaskTitle(value)
    setError(hasOnlySpaces ? 'The task cannot be empty!' : '')
  }

  return (
    <form className="todo__form" onSubmit = {onSubmit}>
        <Field
          className = "todo__field"
          id = "new-task"
          label = "Add New Task"
          value = {taskTitle}
          error={error}
          onInput = {onInput}
          ref={newTaskInputRef}
        />
        <Button
          type = "submit"
          isDisabled={isEmptyTaskTitle}
        >
          Add
        </Button>
      </form>
  )
}

export default AddTaskForm
import Button from "./Button";
import Field from "./Field";

const AddTaskForm = (props) => {
  const {
    addTask,
    taskTitle,
    setTaskTitle,
  } = props

  const onSubmit = (event) => {
    event.preventDefault()
    addTask()
  }

  return (
    <form className="todo__form" onSubmit = {onSubmit}>
        <Field
          className = "todo__field"
          id = "new-task"
          label = "Add New Task"
          value = {taskTitle}
          onInput = {(event) => setTaskTitle(event.target.value)}
        />
        <Button
          type = "submit"
        >
          Add
        </Button>
      </form>
  )
}

export default AddTaskForm
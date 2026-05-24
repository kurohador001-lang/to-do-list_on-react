import Button from "./Button";
import Field from "./Field";

const AddTaskForm = () => {
  return (
    <form className="todo__form">
        <Field
          className = "todo__field"
          id = "new-task"
          label = "New task title"
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
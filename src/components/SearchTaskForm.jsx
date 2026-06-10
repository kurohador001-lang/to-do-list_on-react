import { useContext } from "react"
import Field from "./Field"
import { TasksContext } from "../context/TasksContext"

const SearchTaskForm = () => {
  const {
    searchValue,
    setSearchValue,
  } = useContext(TasksContext)

    return (
      <form
        className="todo__form"
        onSubmit={(event) => event.preventDefault()}
      >
        <Field
          className="todo__field"
          label="Search task"
          id="search-task"
          type="search"
          value={searchValue}
          onInput={(event) => setSearchValue(event.target.value)}
        />
      </form>
  )
}

export default SearchTaskForm
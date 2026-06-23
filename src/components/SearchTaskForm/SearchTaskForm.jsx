import { useContext } from "react"
import Field from "../Field/Field"
import { TasksContext } from "../../context/TasksContext"

const SearchTaskForm = (props) => {
  const { styles } = props

  const {
    searchValue,
    setSearchValue,
  } = useContext(TasksContext)

    return (
      <form
        className={styles.form}
        onSubmit={(event) => event.preventDefault()}
      >
        <Field
          className={styles.field}
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
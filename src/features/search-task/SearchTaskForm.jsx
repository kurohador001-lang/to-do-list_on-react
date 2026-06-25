import { useContext } from "react"
import Field from "@/shared/ui/Field"
import { TasksContext } from "@/entities/todo"

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
import { useContextSelector } from "use-context-selector"
import { TasksContext } from "@/widgets/Todo"
import Field from "@/shared/ui/Field"


const SearchTaskForm = (props) => {
  const { styles } = props

  const searchValue = useContextSelector(TasksContext, (state) => state.searchValue)
  const setSearchValue = useContextSelector(TasksContext, (state) => state.setSearchValue)

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
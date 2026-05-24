import Field from "./Field"

const SearchTaskForm = () => {
  return (
    <Field 
      className = "todo__field"
      id = "search-task"
      label = "Search task"
      type = "search"
    />
  )
}

export default SearchTaskForm
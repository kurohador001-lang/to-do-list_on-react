import Field from "./Field"

const SearchTaskForm = (props) => {
  const {
    onSearchInput,
  } = props

  return (
    <Field 
      className = "todo__field"
      id = "search-task"
      label = "Search task"
      type = "search"
      onSearchInput = {onSearchInput}
    />
  )
}

export default SearchTaskForm
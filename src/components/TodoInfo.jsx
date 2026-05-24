const TodoInfo = (props) => {
  const {
    total,
    done,
  } = props

  const isHasTasks = total > 0

  return (
    <div className="todo__info">
      {isHasTasks && (
        <>
          <div className="todo__total-tasks">
            Done {done} from {total}
          </div>
          <button className="todo__delete-all-button" type="button">
            Delete all
          </button>
        </>
      )}
    </div>
  )
}

export default TodoInfo
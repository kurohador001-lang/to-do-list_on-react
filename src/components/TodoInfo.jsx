import { memo } from "react"

const TodoInfo = (props) => {
  const {
    total,
    done,
    onDeleteAllTasksClick,
  } = props

  const isHasTasks = total > 0

  return (
    <div className="todo__info">
      {isHasTasks && (
        <>
          <div className="todo__total-tasks">
            Done {done} from {total}
          </div>
          <button
            className="todo__delete-all-button"
            type="button"
            onClick={onDeleteAllTasksClick}
          >
            Delete all
          </button>
        </>
      )}
    </div>
  )
}

export default memo(TodoInfo)
import { memo, useContext, useMemo } from "react"
import { TasksContext } from "@/entities/todo"

const TodoInfo = (props) => {
  const { styles } = props

  const {
    tasks,
    deleteAllTasks,
  } = useContext(TasksContext)

  const total = tasks.length
  const done = useMemo(() => {
    return tasks.filter(({isDone}) => isDone).length
  }, [tasks])
  const isHasTasks = total > 0

  return (
    <div className={styles.info}>
      {isHasTasks && (
        <>
          <div className={styles.totalTasks}>
            Done {done} from {total}
          </div>
          <button
            className={styles.deleteAllButton}
            type="button"
            onClick={deleteAllTasks}
          >
            Delete all
          </button>
        </>
      )}
    </div>
  )
}

export default memo(TodoInfo)
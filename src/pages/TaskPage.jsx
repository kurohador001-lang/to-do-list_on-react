import { useEffect, useState } from "react"
import tasksAPI from "../api/tasksAPI"

const TaskPage = (props) => {
  const { params } = props
  const taskId = params.id

  const [task, setTask] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    tasksAPI.getById(taskId)
      .then((taskData) => {
        setTask(taskData)
        setHasError(false)
      })
      .catch(() => {
        setHasError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Loading ...</div>
  }

  if (hasError) {
    return <div>Task not found!</div>
  }

  return (
    <div>
      <h1>{task.title}</h1>
      <p>{task.isDone ? 'Task completed' : 'Task not completed'}</p>
    </div>
  )
}

export default TaskPage
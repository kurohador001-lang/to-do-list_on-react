import { createContext, useMemo } from "react"
import useTasks from "./useTasks"
import useIncompleteTaskScroll from "./useIncompleteTaskScroll"

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const {
    tasks,
    filteredTasks,
    newTaskInputRef,
    taskTitle,
    searchValue,
    disappearingTaskId,
    appearingTaskId,
    setSearchValue,
    setTaskTitle,
    addTask,
    toggleTaskComplete,
    deleteTask,
    deleteAllTasks,
  } = useTasks()

  const {
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  } = useIncompleteTaskScroll(tasks)

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    newTaskInputRef,
    taskTitle,
    searchValue,
    disappearingTaskId,
    appearingTaskId,
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
    setSearchValue,
    setTaskTitle,
    addTask,
    toggleTaskComplete,
    deleteTask,
    deleteAllTasks,
  }), [
    tasks,
    filteredTasks,
    newTaskInputRef,
    taskTitle,
    searchValue,
    disappearingTaskId,
    appearingTaskId,
    setSearchValue,
    setTaskTitle,
    addTask,
    toggleTaskComplete,
    deleteTask,
    deleteAllTasks,
    firstIncompleteTaskId,
    firstIncompleteTaskRef,
  ])
 

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}
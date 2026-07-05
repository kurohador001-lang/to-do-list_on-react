import { useMemo } from "react"
import { createContext } from "use-context-selector";
import useTasks from "./useTasks"

export const TasksContext = createContext(null)

export const TasksProvider = (props) => {
  const { children } = props

  const {
    tasks,
    filteredTasks,
    newTaskInputRef,
    searchValue,
    disappearingTaskId,
    appearingTaskId,
    setSearchValue,
    addTask,
    toggleTaskComplete,
    deleteTask,
    deleteAllTasks,
  } = useTasks()

  const value = useMemo(() => ({
    tasks,
    filteredTasks,
    newTaskInputRef,
    searchValue,
    disappearingTaskId,
    appearingTaskId,
    setSearchValue,
    addTask,
    toggleTaskComplete,
    deleteTask,
    deleteAllTasks,
  }), [
    tasks,
    filteredTasks,
    newTaskInputRef,
    searchValue,
    disappearingTaskId,
    appearingTaskId,
    setSearchValue,
    addTask,
    toggleTaskComplete,
    deleteTask,
    deleteAllTasks,
  ])


  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  )
}

import { createContext } from "react"
import useTasks from "../hooks/useTasks"
import useIncompleteTaskScroll from "../hooks/useIncompleteTaskScroll"

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const {
    tasks,
    filteredTasks,
    newTaskInputRef,
    taskTitle,
    searchValue,
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

 

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        newTaskInputRef,
        firstIncompleteTaskId,
        firstIncompleteTaskRef, 
        taskTitle,
        searchValue,
        setSearchValue,
        setTaskTitle,
        addTask,
        toggleTaskComplete,
        deleteTask,
        deleteAllTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  )
}
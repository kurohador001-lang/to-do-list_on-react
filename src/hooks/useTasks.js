import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import tasksAPI from "../api/tasksAPI"

const useTasks = () => {
 const [tasks, setTasks] = useState([])

  const [taskTitle, setTaskTitle] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const newTaskInputRef = useRef(null)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all tasks?')

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks)
        .then(() => setTasks([]))
    }
  }, [tasks])

  const deleteTask = useCallback((taskId) => {
    tasksAPI.delete(taskId)
      .then(() => {
        setTasks(
          tasks.filter((task) => task.id !== taskId)
        )
      })
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    tasksAPI.toggleComplete(taskId, isDone)
      .then(() => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return {...task, isDone}
            }

            return task
          })
        )
      })
  }, [tasks])

  const addTask = useCallback ((title) => {
    const newTask = {
      title,
      isDone: false,
    }

    tasksAPI.add(newTask)
      .then((addedTask) => {
        setTasks((prevTasks) => [...prevTasks, addedTask])
        setTaskTitle('')
        setSearchValue('')
        newTaskInputRef.current.focus()
      })
  }, [])

  useEffect(() => {
    newTaskInputRef.current.focus()

    tasksAPI.getAll()
      .then(setTasks)
  }, [])

  const filteredTasks = useMemo(() => {
    const clearSearchValue = searchValue.trim().toLowerCase()
    return  clearSearchValue.length > 0 
      ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchValue))
      : null
  }, [tasks, searchValue])

  return {
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
  }
}

export default useTasks
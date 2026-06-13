import { useState, useRef, useEffect, useMemo, useCallback } from "react"
import useLocalStorageTasks from "./useLocalStorageTasks"

const useTasks = () => {
  const {
    saveTasks,
    savedTasks,
  } = useLocalStorageTasks()

 const [tasks, setTasks] = useState(() => savedTasks ?? [
      {className: "todo__item", id: "task-1", title: "Task 1", isDone: false},
      {className: "todo__item", id: "task-2", title: "Task 2", isDone: true},
    ])

  const [taskTitle, setTaskTitle] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const newTaskInputRef = useRef(null)

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm('Are you sure you want to delete all tasks?')

    if(isConfirmed) {
      setTasks([])
    }
  }, [])

  const deleteTask = useCallback((taskId) => {
    setTasks(
      tasks.filter((task) => task.id !== taskId)
    )
  }, [tasks])

  const toggleTaskComplete = useCallback((taskId, isDone) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === taskId) {
          return {...task, isDone}
        }

        return task
      })
    )
  }, [tasks])

  const addTask = useCallback (() => {
    if (taskTitle.trim().length > 0) {
      const newTask = {
        id: crypto?.randomUUID() ?? Date.now().toString(),
        title: taskTitle,
        isDone: false,
      }

      setTasks((prevTasks) => [...prevTasks, newTask])
      setTaskTitle('')
      setSearchValue('')
      newTaskInputRef.current.focus()
    }
  }, [taskTitle])

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  useEffect(() => {
    newTaskInputRef.current.focus()
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
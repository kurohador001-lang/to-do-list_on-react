import { useState, useRef, useEffect, useMemo, useCallback, createContext } from "react"

export const TasksContext = createContext({})

export const TasksProvider = (props) => {
  const { children } = props

  const [tasks, setTasks] = useState(() => {
    const downloadedTasks = localStorage.getItem('tasks')

    if (downloadedTasks) {
      return JSON.parse(downloadedTasks)
    }

    return ([
      {className: "todo__item", id: "task-1", title: "Task 1", isDone: false},
      {className: "todo__item", id: "task-2", title: "Task 2", isDone: true},
    ])
  })

  const [taskTitle, setTaskTitle] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const newTaskInputRef = useRef(null)
  const firstIncompleteTaskRef = useRef(null)
  const firstIncompleteTaskId = tasks.find(({ isDone }) => isDone === false)?.id

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
    localStorage.setItem('tasks', JSON.stringify(tasks))
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

  return (
    <TasksContext.Provider
      value={{
        tasks,
        filteredTasks,
        firstIncompleteTaskId,
        firstIncompleteTaskRef,
        newTaskInputRef,
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
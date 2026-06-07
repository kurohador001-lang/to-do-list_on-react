import { useState, useEffect, useRef } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";
import Button from "./Button";

const Todo = () => {
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

const deleteAllTasks = () => {
  const isConfirmed = confirm('Are you sure you want to delete all tasks?')

  if(isConfirmed) {
    setTasks([])
  }
}

const deleteTask = (taskId) => {
  setTasks(
    tasks.filter((task) => task.id !== taskId)
  )
}

const toggleTaskComplete = (taskId, isDone) => {
  setTasks(
    tasks.map((task) => {
      if (task.id === taskId) {
        return {...task, isDone}
      }

      return task
    })
  )
}

const addTask = () => {
  if (taskTitle.trim().length > 0) {
    const newTask = {
      id: crypto?.randomUUID() ?? Date.now().toString(),
      title: taskTitle,
      isDone: false,
    }

    setTasks([...tasks, newTask])
    setTaskTitle('')
    newTaskInputRef.current.focus()
  }
}

useEffect(() => {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}, [tasks])

useEffect(() => {
  newTaskInputRef.current.focus()
}, [])

const clearSearchValue = searchValue.trim().toLowerCase()
const filteredTasks = clearSearchValue.length > 0 ? tasks.filter(({ title }) => title.toLowerCase().includes(clearSearchValue)) : null

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask={addTask}
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        newTaskInputRef={newTaskInputRef}
      />
      <SearchTaskForm
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <TodoInfo
        total={tasks.length}
        done={tasks.filter(({isDone}) => isDone).length}
        onDeleteAllTasksClick={deleteAllTasks}
      />
      <Button
        onClick={() => {
          firstIncompleteTaskRef.current?.scrollIntoView({ behaivor: 'smooth' })
        }}
      >
        Show first incomplete task
      </Button>
      <TodoList
        tasks={tasks}
        filteredTasks={filteredTasks}
        firstIncompleteTaskRef={firstIncompleteTaskRef}
        firstIncompleteTaskId={firstIncompleteTaskId}
        onDeleteTaskClick={deleteTask}
        onToggleTaskCompleteChange={toggleTaskComplete}
      />
    </div>
  )
}

export default Todo
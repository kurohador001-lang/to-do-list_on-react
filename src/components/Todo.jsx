import { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

const Todo = () => {
  const [tasks, setTasks] = useState([
    {className: "todo__item", id: "task-1", title: "Task 1", isDone: false},
    {className: "todo__item", id: "task-2", title: "Task 2", isDone: true},
  ])

  const [taskTitle, setTaskTitle] = useState('')

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

const filterTasks = (value) => {
  console.log(`You search ${value}?`)
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
  }
}

  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm
        addTask = {addTask}
        taskTitle = {taskTitle}
        setTaskTitle = {setTaskTitle}
      />
      <SearchTaskForm onSearchInput = {filterTasks} />
      <TodoInfo
        total = {tasks.length}
        done = {tasks.filter(({isDone}) => isDone).length}
        onDeleteAllTasksClick = {deleteAllTasks}
      />
      <TodoList
        tasks = {tasks}
        onDeleteTaskClick = {deleteTask}
        onToggleTaskCompleteChange = {toggleTaskComplete}
      />
    </div>
  )
}

export default Todo
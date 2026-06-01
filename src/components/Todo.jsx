import AddTaskForm from "./AddTaskForm";
import SearchTaskForm from "./SearchTaskForm";
import TodoInfo from "./TodoInfo";
import TodoList from "./TodoList";

let tasks = [
  {className: "todo__item", id: "task-1", title: "Task 1", isDone: false},
  {className: "todo__item", id: "task-2", title: "Task 2", isDone: true},
]

const deleteAllTasks = () => {
  console.log("You deleted all tasks")
}

const deleteTask = (taskId) => {
  console.log(`You deleted task with id: ${taskId}`)
}

const toggleTackComplete = (taskId, isDone) => {
  console.log(`Task with id ${taskId} is ${isDone ? 'completed' : 'not completed'}`)
}

const filterTasks = (value) => {
  console.log(`You search ${value}?`)
}

const addTask = () => {
  console.log("You're add the task")
}

const Todo = () => {
  return (
    <div className="todo">
      <h1 className="todo__title">To Do List</h1>
      <AddTaskForm addTask = {addTask} />
      <SearchTaskForm onSearchInput = {filterTasks} />
      <TodoInfo
        total = {tasks.length}
        done = {tasks.filter(({isDone}) => isDone).length}
        onDeleteAllTasksClick = {deleteAllTasks}
      />
      <TodoList
        tasks = {tasks}
        onDeleteTaskClick = {deleteTask}
        onToggleTaskCompleteChange = {toggleTackComplete}
      />
    </div>
  )
}

export default Todo
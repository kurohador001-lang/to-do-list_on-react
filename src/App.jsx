import Router from "./router"
import TasksPage from "./pages/TasksPage"
import TaskPage from "./pages/TaskPage"

const App = () => {
  const routes = {
    '/': TasksPage,
    '/tasks/:id': TaskPage,
    '*': () => <div>404 page not found</div>,
  }

  return (
    <Router 
      routes={routes}
    />
  )
}

export default App

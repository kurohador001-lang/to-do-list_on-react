import Todo, { TasksProvider } from "@/widgets/Todo"

const TasksPage = () => {
  return (
    <TasksProvider>
      <Todo />
    </TasksProvider>
  );
};

export default TasksPage;

import { useState, useRef, useEffect, useMemo, useCallback, useReducer } from "react";
import tasksAPI from "@/shared/api/tasks";

const useTasks = () => {
  const tasksReducer = (state, action) => {
    switch (action.type) {
      case 'ADD': {
        return [...state, action.task]
      }
      case 'SET_ALL': {
        return Array.isArray(action.tasks) ? action.tasks : state
      }
      case 'DELETE': {
        return state.filter((task) => {
          return task.id !== action.id
        })
      }
      case 'DELETE_ALL': {
        return []
      }
      case 'TOGGLE_COMPLETE': {
        const { id, isDone } = action

        return state.map((task) => {
           return task.id === id ? { ...task, isDone } : task
          })
      }
      default: {
        return state
      }
    }
  }

  const [tasks, dispatch] = useReducer(tasksReducer, []);

  const [taskTitle, setTaskTitle] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [disappearingTaskId, setDisappearingTaskId] = useState(null);
  const [appearingTaskId, setAppearingTaskId] = useState(null);

  const newTaskInputRef = useRef(null);

  const deleteAllTasks = useCallback(() => {
    const isConfirmed = confirm("Are you sure you want to delete all tasks?");

    if (isConfirmed) {
      tasksAPI.deleteAll(tasks)
      .then(() => dispatch({ type: "DELETE_ALL" }));
    }
  }, [tasks]);

  const deleteTask = useCallback(
    (taskId) => {
      tasksAPI.delete(taskId)
      .then(() => {
        setDisappearingTaskId(taskId);

        setTimeout(() => {
          dispatch({ type: "DELETE", id: taskId });
          setDisappearingTaskId(null);
        }, 400);
      });
    }, []);

  const toggleTaskComplete = useCallback((taskId, isDone) => {
      tasksAPI.toggleComplete(taskId, isDone)
      .then(() => dispatch({ type: "TOGGLE_COMPLETE", id: taskId, isDone: isDone }));
    }, []);

  const addTask = useCallback((title) => {
    const newTask = {
      title,
      isDone: false,
    };

    tasksAPI.add(newTask)
    .then((addedTask) => {
      dispatch({ type: "ADD", task: addedTask });
      setTaskTitle("");
      setSearchValue("");
      newTaskInputRef.current.focus();
      setAppearingTaskId(addedTask.id);
      setTimeout(() => {
        setAppearingTaskId(null);
      }, 400);
    });
  }, []);

  useEffect(() => {
    newTaskInputRef.current.focus();

    tasksAPI.getAll()
    .then((serverTasks) => dispatch({ type: "SET_ALL", tasks: serverTasks}));
  }, []);

  const filteredTasks = useMemo(() => {
    const clearSearchValue = searchValue.trim().toLowerCase();
    return clearSearchValue.length > 0
      ? tasks.filter(({ title }) =>
          title.toLowerCase().includes(clearSearchValue),
        )
      : null;
  }, [tasks, searchValue]);

  return {
    tasks,
    filteredTasks,
    newTaskInputRef,
    taskTitle,
    searchValue,
    disappearingTaskId,
    appearingTaskId,
    setSearchValue,
    setTaskTitle,
    addTask,
    toggleTaskComplete,
    deleteTask,
    deleteAllTasks,
  };
};

export default useTasks;

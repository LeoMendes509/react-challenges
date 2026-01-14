import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../../hooks/Final_Project/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

export const TaskContext = createContext({});

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("nexus_tasks_v1", []);

  // Estado para filtros e ordenação
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("createdAt");

  // --- ACTIONS ---

  const addTask = (taskData) => {
    const newTask = {
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      completed: false,
      ...taskData, // title, priority, dueDate
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  // Atualizar Tarefa
  const updateTask = (id, updatedFields) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleComplete,
        updateTask,
        filter,
        setFilter,
        sortBy,
        setSortBy,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

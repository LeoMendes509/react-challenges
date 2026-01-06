import { useState } from "react";
import TaskForm from "../../components/Challenges/Treinamento_Inicial/Desafio4/TaskForm";
import TaskListView from "../../components/Challenges/Treinamento_Inicial/Desafio4/TaskListView";
import "../../components/Challenges/Treinamento_Inicial/Desafio4/Desafio4.css";

export default function Desafio4() {
  const [tasks, setTasks] = useState([]);
  const [message, setMessage] = useState("");
  const [showList, setShowList] = useState(false);

  function addTask(title) {
    if (!title.trim()) return;
    const newTask = { id: Date.now(), title };
    setTasks((prev) => [...prev, newTask]);
    setMessage("✅ Tarefa cadastrada com sucesso!");
    setShowList(true);
  }

  function removeTask(id) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    setMessage("🗑️ Tarefa removida com sucesso!");
  }

  return (
    <div className="page">
      <h1>StateList</h1>
      <p>
        Menos bagunça, mais controle. Com <b>StateList</b>, suas tarefas ficam
        claras, organizadas e sempre ao seu alcance!
      </p>

      {message && <p className="message">{message}</p>}

      <TaskForm onSubmit={addTask} />

      <button
        className="toggle-btn"
        onClick={() => setShowList((prev) => !prev)}
      >
        {showList ? "Ocultar tarefas" : "Ver tarefas"}
      </button>

      {showList && <TaskListView tasks={tasks} removeTask={removeTask} />}
    </div>
  );
}

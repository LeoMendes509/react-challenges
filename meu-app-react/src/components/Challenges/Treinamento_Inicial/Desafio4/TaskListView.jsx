import TaskItem from "./TaskItem";

function TaskListView({ tasks, removeTask }) {
  if (tasks.length === 0) {
    return <p>Nenhuma tarefa cadastrada.</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} removeTask={removeTask} />
      ))}
    </ul>
  );
}

export default TaskListView;

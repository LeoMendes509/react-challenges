function TaskItem ({ task , removeTask }) {
    return (
        <li>
            {task.title}
            <button onClick={() => removeTask(task.id)}>❌</button>
        </li>
    )
}

export default TaskItem;
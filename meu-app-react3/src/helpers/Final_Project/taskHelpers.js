// Filtra o array de tarefas mantendo apenas o que o usuário escolheu ver (Ativas, Completas ou Todas)
export const filterTasks = (tasks, filter) => {
  switch (filter) {
    case "active":
      return tasks.filter((t) => !t.completed);
    case "completed":
      return tasks.filter((t) => t.completed);
    default:
      return tasks;
  }
};

// Cria uma cópia da lista e reorganiza a ordem baseada na prioridade (Alta>Baixa) ou datas
export const sortTasks = (tasks, sortBy) => {
  // Cria uma cópia para não estragar (mutar) o array original
  const sorted = [...tasks];

  switch (sortBy) {
    case "priority":
      const priorityMap = { high: 3, medium: 2, low: 1 };
      // Ordem decrescente: Maior valor (3) aparece primeiro
      return sorted.sort(
        (a, b) => priorityMap[b.priority] - priorityMap[a.priority]
      );

    case "dueDate":
      // Data menor (mais antiga) aparece primeiro. Se não tiver data, joga pro final (ano 9999).
      return sorted.sort(
        (a, b) =>
          new Date(a.dueDate || "9999-12-31") -
          new Date(b.dueDate || "9999-12-31")
      );

    case "createdAt":
    default:
      // Padrão: Tarefa mais recente aparece no topo
      return sorted.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  }
};

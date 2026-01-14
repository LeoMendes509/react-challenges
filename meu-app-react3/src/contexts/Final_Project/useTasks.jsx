import { useContext, useMemo } from "react";
import { TaskContext } from "./TaskContext";
// Importando os helpers (subindo 2 níveis)
import {
  filterTasks,
  sortTasks,
} from "../../helpers/Final_Project/taskHelpers";

export const useTasks = (searchQuery = "") => {
  // 1. Pega os dados do Contexto
  const context = useContext(TaskContext);

  // Segurança: Se esquecer o Provider, avisa
  if (!context)
    throw new Error("useTasks deve ser usado dentro de TaskProvider");

  const { tasks, filter, sortBy, ...actions } = context;

  // SEGURANÇA EXTRA: Garante que tasks seja sempre um array, mesmo se vier null
  const safeTasks = tasks || [];

  // 2. Processamento Inteligente (Busca + Filtro + Ordem)
  const processedTasks = useMemo(() => {
    let result = [...safeTasks];

    // A. Busca por Texto
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(
        (t) => t.title && t.title.toLowerCase().includes(lowerQuery)
      );
    }

    // B. Filtros (Ativas/Completas)
    result = filterTasks(result, filter);

    // C. Ordenação
    result = sortTasks(result, sortBy);

    return result;
  }, [safeTasks, filter, sortBy, searchQuery]);

  // 3. Cálculo de Estatísticas (Onde estava o erro)
  // Usamos 'safeTasks' para garantir que .filter sempre exista
  const stats = {
    total: safeTasks.length,
    active: safeTasks.filter((t) => !t.completed).length,
    completed: safeTasks.filter((t) => t.completed).length,
  };

  return {
    tasks: processedTasks, // Lista processada para exibir na tela
    allTasks: safeTasks, // Lista crua (se precisar)
    stats, // Números para o dashboard
    filter,
    sortBy,
    ...actions, // addTask, deleteTask, toggleComplete...
  };
};

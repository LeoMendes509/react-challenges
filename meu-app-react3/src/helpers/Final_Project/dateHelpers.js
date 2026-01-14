// Formata uma data bruta (ISO) para o padrão brasileiro legível (Ex: 10 de out. de 2023)
export const formatDate = (dateString) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

// Verifica se a tarefa está atrasada comparando a data de entrega com o dia de hoje (zerando as horas)
export const isOverdue = (dueDate) => {
  if (!dueDate) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Zera hora/minuto para comparar apenas o dia

  return new Date(dueDate) < today;
};

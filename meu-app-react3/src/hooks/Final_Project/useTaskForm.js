import { useState } from "react";

export const useTaskForm = (onSubmitCallback) => {
  // Estado Inicial (Comanda em branco)
  const initialValues = {
    title: "",
    description: "",
    priority: "low", // Começa com prioridade baixa
    dueDate: "", // Sem data definida
  };

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({}); // Lista de erros (ex: "Falta título")

  // Ocorre cada vez que o usuário digita uma letra
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Atualiza o valor
    setValues((prev) => ({ ...prev, [name]: value }));

    // Limpeza automática de erro: Se o usuário começou a corrigir, tira o vermelho.
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Função de Validação (O Fiscal)
  const validate = () => {
    const newErrors = {};

    // Título é obrigatório
    if (!values.title.trim()) {
      newErrors.title = "O título é obrigatório";
    }

    // Prioridade deve ser válida (segurança extra)
    if (!["low", "medium", "high"].includes(values.priority)) {
      newErrors.priority = "Prioridade inválida";
    }

    setErrors(newErrors);

    // Retorna TRUE se não tiver nenhum erro (Objeto vazio)
    return Object.keys(newErrors).length === 0;
  };

  // Enviar para a Cozinha (Submit)
  const handleSubmit = (e) => {
    e.preventDefault(); // Não recarrega a página

    // Só envia se passar na validação
    if (validate()) {
      onSubmitCallback(values); // Chama a função que salva no Contexto
      reset(); // Limpa o formulário
    }
  };

  // Começar do Zero
  const reset = () => {
    setValues(initialValues);
    setErrors({});
  };

  return { values, errors, handleChange, handleSubmit, reset, setValues };
};

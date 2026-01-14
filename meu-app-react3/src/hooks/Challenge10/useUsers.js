import { useState, useEffect } from "react";

// Mock Data (Simulando API)
const MOCK_DATA = [
  {
    id: 1,
    name: "joão silva",
    cpf: "12345678901",
    birthDate: "1990-05-15",
    salary: 5000,
  },
  {
    id: 2,
    name: "maria santos",
    cpf: "98765432100",
    birthDate: "1985-10-20",
    salary: 7500,
  },
  {
    id: 3,
    name: "pedro costa",
    cpf: "45678912300",
    birthDate: "1992-03-08",
    salary: 6000,
  },
];

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    // Simula o fetch (busca de dados)
    const timeout = setTimeout(() => {
      setUsers(MOCK_DATA);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout); // Cleanup
  }, []);

  // Lógica de Filtro
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  );

  // O Hook entrega tudo mastigado para o componente
  return {
    users: filteredUsers,
    loading,
    filter,
    setFilter,
  };
};

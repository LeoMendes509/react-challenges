import React, { useState } from "react";
import { UserContext } from "../contexts/UserContext";

// Dados Iniciais (O "Seed" do banco)
const INITIAL_USERS = [
  {
    id: 1,
    name: "Leonardo Admin",
    email: "admin@empresa.com",
    avatar: "https://i.pravatar.cc/150?img=11",
    role: "CEO",
    password: "123",
  },
  {
    id: 2,
    name: "Ana Designer",
    email: "ana@design.com",
    avatar: "https://i.pravatar.cc/150?img=5",
    role: "UX/UI",
    password: "123",
  },
  {
    id: 3,
    name: "Carlos Backend",
    email: "carlos@dev.com",
    avatar: "https://i.pravatar.cc/150?img=3",
    role: "Senior Dev",
    password: "123",
  },
  {
    id: 4,
    name: "Mariana Product",
    email: "mari@pm.com",
    avatar: "https://i.pravatar.cc/150?img=9",
    role: "Product Owner",
    password: "123",
  },
  {
    id: 5,
    name: "Roberto DevOps",
    email: "beto@infra.com",
    avatar: "https://i.pravatar.cc/150?img=60",
    role: "SysAdmin",
    password: "123",
  },
  {
    id: 6,
    name: "Julia Frontend",
    email: "ju@react.com",
    avatar: "https://i.pravatar.cc/150?img=44",
    role: "React Ninja",
    password: "123",
  },
  {
    id: 7,
    name: "Fernando QA",
    email: "nando@test.com",
    avatar: "https://i.pravatar.cc/150?img=13",
    role: "Tester",
    password: "123",
  },
  {
    id: 8,
    name: "Patricia Lead",
    email: "pati@tech.com",
    avatar: "https://i.pravatar.cc/150?img=20",
    role: "Tech Lead",
    password: "123",
  },
  {
    id: 9,
    name: "Lucas Estagiário",
    email: "lucas@coffee.com",
    avatar: "https://i.pravatar.cc/150?img=53",
    role: "Aprendiz",
    password: "123",
  },
  {
    id: 10,
    name: "Sofia Mobile",
    email: "sofi@app.com",
    avatar: "https://i.pravatar.cc/150?img=35",
    role: "Flutter Dev",
    password: "123",
  },
];

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // AGORA A LISTA É UM ESTADO (Permite edição)
  const [usersList, setUsersList] = useState(INITIAL_USERS);

  const login = (email, password) => {
    setLoading(true);
    setError(null);
    setTimeout(() => {
      // Busca na lista atualizada (usersList) e não na fixa
      const foundUser = usersList.find(
        (u) => u.email === email && u.password === password
      );
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError("Credenciais inválidas! Senha padrão: 123");
      }
      setLoading(false);
    }, 1000);
  };

  const logout = () => {
    setUser(null);
    setError(null);
  };

  // ATUALIZAÇÃO PROFUNDA (Sessão + Banco de Dados)
  const updateProfile = (newData) => {
    // 1. Atualiza o usuário logado na sessão
    const updatedUser = { ...user, ...newData };
    setUser(updatedUser);

    // 2. Atualiza o usuário dentro da lista geral (Cheat Sheet)
    setUsersList((prevList) =>
      prevList.map((u) => (u.id === user.id ? updatedUser : u))
    );
  };

  return (
    // Passamos 'usersList' como 'mockList' para manter compatibilidade
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        mockList: usersList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

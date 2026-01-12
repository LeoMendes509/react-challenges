import { useState, useEffect, useCallback } from "react";

// 10 DADOS MOCKADOS (Com estrutura de endereço aninhada)
const MOCK_DATA = [
  {
    id: 1,
    name: "Lucas Silva",
    cpf: "123.456.789-00",
    birthDate: "1995-05-15",
    phone: "(11) 99999-1111",
    address: {
      zipCode: "01310-100",
      street: "Av. Paulista",
      number: "1000",
      complement: "Sala 101",
      city: "São Paulo",
      state: "SP",
    },
    position: "Dev Frontend",
    department: "TI",
    salary: 8500,
    hireDate: "2022-03-01",
  },
  {
    id: 2,
    name: "Marina Costa",
    cpf: "222.333.444-55",
    birthDate: "1990-10-20",
    phone: "(21) 98888-2222",
    address: {
      zipCode: "22041-001",
      street: "Rua Copacabana",
      number: "50",
      complement: "Apt 20",
      city: "Rio de Janeiro",
      state: "RJ",
    },
    position: "Gerente de RH",
    department: "RH",
    salary: 12000,
    hireDate: "2020-01-15",
  },
  {
    id: 3,
    name: "Roberto Almeida",
    cpf: "333.444.555-66",
    birthDate: "1985-01-10",
    phone: "(31) 97777-3333",
    address: {
      zipCode: "30130-000",
      street: "Av. Afonso Pena",
      number: "1200",
      complement: "",
      city: "Belo Horizonte",
      state: "MG",
    },
    position: "Analista Financeiro",
    department: "Financeiro",
    salary: 6500,
    hireDate: "2019-05-10",
  },
  {
    id: 4,
    name: "Julia Pereira",
    cpf: "444.555.666-77",
    birthDate: "1998-07-05",
    phone: "(41) 96666-4444",
    address: {
      zipCode: "80020-000",
      street: "Rua XV de Novembro",
      number: "300",
      complement: "Casa",
      city: "Curitiba",
      state: "PR",
    },
    position: "Designer UI/UX",
    department: "TI",
    salary: 7000,
    hireDate: "2023-02-01",
  },
  {
    id: 5,
    name: "Carlos Oliveira",
    cpf: "555.666.777-88",
    birthDate: "1982-12-30",
    phone: "(51) 95555-5555",
    address: {
      zipCode: "90010-000",
      street: "Av. Ipiranga",
      number: "500",
      complement: "Bloco B",
      city: "Porto Alegre",
      state: "RS",
    },
    position: "DevOps Engineer",
    department: "TI",
    salary: 10500,
    hireDate: "2021-08-20",
  },
  {
    id: 6,
    name: "Amanda Souza",
    cpf: "666.777.888-99",
    birthDate: "1993-04-18",
    phone: "(71) 94444-6666",
    address: {
      zipCode: "40020-000",
      street: "Av. Sete de Setembro",
      number: "80",
      complement: "",
      city: "Salvador",
      state: "BA",
    },
    position: "Recrutadora",
    department: "RH",
    salary: 5000,
    hireDate: "2022-11-10",
  },
  {
    id: 7,
    name: "Ricardo Mendes",
    cpf: "777.888.999-00",
    birthDate: "1988-09-25",
    phone: "(81) 93333-7777",
    address: {
      zipCode: "50030-000",
      street: "Rua da Aurora",
      number: "200",
      complement: "Apt 501",
      city: "Recife",
      state: "PE",
    },
    position: "Gerente de Vendas",
    department: "Comercial",
    salary: 15000,
    hireDate: "2018-03-15",
  },
  {
    id: 8,
    name: "Patricia Lima",
    cpf: "888.999.000-11",
    birthDate: "1991-06-12",
    phone: "(85) 92222-8888",
    address: {
      zipCode: "60165-000",
      street: "Av. Beira Mar",
      number: "4000",
      complement: "",
      city: "Fortaleza",
      state: "CE",
    },
    position: "Diretora de Operações",
    department: "Diretoria",
    salary: 25000,
    hireDate: "2017-06-01",
  },
  {
    id: 9,
    name: "Fernando Torres",
    cpf: "999.000.111-22",
    birthDate: "1996-02-28",
    phone: "(61) 91111-9999",
    address: {
      zipCode: "70000-000",
      street: "Esplanada dos Ministérios",
      number: "1",
      complement: "",
      city: "Brasília",
      state: "DF",
    },
    position: "Tech Lead",
    department: "TI",
    salary: 18000,
    hireDate: "2020-11-05",
  },
  {
    id: 10,
    name: "Beatriz Santos",
    cpf: "000.111.222-33",
    birthDate: "1999-11-11",
    phone: "(19) 90000-0000",
    address: {
      zipCode: "13010-000",
      street: "Av. Francisco Glicério",
      number: "900",
      complement: "Sala 4",
      city: "Campinas",
      state: "SP",
    },
    position: "Assistente Administrativo",
    department: "Administrativo",
    salary: 3500,
    hireDate: "2023-06-15",
  },
];

export const useEmployeeSystem = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. LISTAR (Simula GET)
  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEmployees(MOCK_DATA);
    } catch {
      setError("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  // 2. ADICIONAR (Simula POST)
  const addEmployee = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const newEmployee = { ...data, id: Math.random() };
    setEmployees((prev) => [newEmployee, ...prev]); // Adiciona no topo
    setLoading(false);
  };

  // 3. EDITAR (Simula PUT)
  const editEmployee = async (id, data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === id ? { ...data, id } : emp))
    );
    setLoading(false);
  };

  // 4. EXCLUIR (Simula DELETE)
  const deleteEmployee = async (id) => {
    if (!window.confirm("Tem certeza que deseja remover este funcionário?"))
      return;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return {
    employees,
    loading,
    error,
    addEmployee,
    editEmployee,
    deleteEmployee,
  };
};

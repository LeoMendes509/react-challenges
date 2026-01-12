// 1. IMPORTS & CONFIGS --------------------------------------------------------
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Alert,
  Chip,
} from "@mui/material";
import {
  RiRefreshLine,
  RiUserSmileLine,
  RiPriceTag3Line,
} from "react-icons/ri";

// 2. SIMULAÇÃO DE API (Fake API) ----------------------------------------------
// Definimos o objeto fora do componente para manter a referência de memória estável.
// Isso evita que o objeto seja recriado a cada renderização do React, prevenindo bugs.
const api = {
  getUsers: () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            { id: 1, name: "Renata Mercadante", role: "DPO" },
            { id: 2, name: "Carolina Cataldo", role: "Privacidade" },
            { id: 3, name: "Leonardo Mendes", role: "Desenvolvimento" },
          ]),
        1000
      )
    ),

  getProducts: () =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve([
            { id: 101, name: "Consultoria LGPD", price: 1500 },
            { id: 102, name: "Selo de Privacidade", price: 500 },
            { id: 103, name: "Curso DPO", price: 1000 },
          ]),
        1000
      )
    ),

  // Simula um erro proposital para testarmos o tratamento de exceções
  getItemDetails: () =>
    new Promise((_, reject) =>
      setTimeout(() => {
        reject(new Error("Item não encontrado no banco de dados"));
      }, 1000)
    ),
};

// 3. CUSTOM HOOK: useFetch ----------------------------------------------------
// Este é o "Coração" do desafio. Ele encapsula a lógica repetitiva de:
// Loading -> Try Catch -> Sucesso/Erro -> Finally
// Permitindo que qualquer componente faça requisições de forma limpa.
const useFetch = (fetchFunction) => {
  // Estados locais que controlam o ciclo de vida da requisição
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useCallback: Memoriza a função 'execute'.
  // Sem isso, ela seria recriada a cada render, causando loops infinitos no useEffect.
  const execute = useCallback(async () => {
    setLoading(true); // 1. Liga o indicador de carregamento
    setError(null); // 2. Limpa erros de tentativas anteriores
    setData(null); // 3. Limpa dados antigos (opcional, melhora UX)

    try {
      const result = await fetchFunction(); // 4. Espera a Promessa (Await)
      setData(result); // 5. Sucesso! Armazena os dados
    } catch (err) {
      setError(err.message); // 6. Falha! Captura e armazena a mensagem de erro
    } finally {
      setLoading(false); // 7. Desliga o carregamento (sempre roda, sucesso ou erro)
    }
  }, [fetchFunction]); // Dependência: só recria se a função de busca mudar

  // useEffect: Dispara a busca automaticamente assim que o hook é montado
  useEffect(() => {
    execute();
  }, [execute]);

  // Retorna a "Caixa de Ferramentas" pronta para os componentes consumirem
  return { data, loading, error, refetch: execute };
};

// --- 4. COMPONENTES DE EXIBIÇÃO ----------------------------------------------

const UserList = () => {
  // Uso do Hook: Abstração total da lógica de estado
  const { data, loading, error, refetch } = useFetch(api.getUsers);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState msg={error} onRetry={refetch} />;

  return (
    <Box>
      <Typography variant="h6" sx={{ color: "#D4C9BE", mb: 2 }}>
        Usuários do Sistema
      </Typography>
      <List>
        {data?.map((u) => (
          <ListItem key={u.id} sx={styles.listItem}>
            <RiUserSmileLine
              size={20}
              color="#F1EFEC"
              style={{ marginRight: 10 }}
            />
            <ListItemText
              primary={u.name}
              secondary={u.role}
              primaryTypographyProps={{ style: { color: "#F1EFEC" } }}
              secondaryTypographyProps={{ style: { color: "#D4C9BE" } }}
            />
          </ListItem>
        ))}
      </List>
      <Button
        size="small"
        onClick={refetch}
        startIcon={<RiRefreshLine />}
        sx={styles.btnSmall}
      >
        Atualizar Lista
      </Button>
    </Box>
  );
};

const ProductList = () => {
  const { data, loading, error, refetch } = useFetch(api.getProducts);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState msg={error} onRetry={refetch} />;

  return (
    <Box>
      <Typography variant="h6" sx={{ color: "#D4C9BE", mb: 2 }}>
        Catálogo de Serviços
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {data?.map((p) => (
          <Paper key={p.id} sx={styles.cardItem}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <RiPriceTag3Line color="#D4C9BE" />
              <Typography sx={{ color: "#F1EFEC" }}>{p.name}</Typography>
            </Box>
            <Chip
              label={`R$ ${p.price}`}
              size="small"
              sx={{ bgcolor: "#D4C9BE", color: "#123458", fontWeight: "bold" }}
            />
          </Paper>
        ))}
      </Box>
      <Button
        size="small"
        onClick={refetch}
        startIcon={<RiRefreshLine />}
        sx={{ ...styles.btnSmall, mt: 2 }}
      >
        Atualizar Catálogo
      </Button>
    </Box>
  );
};

const DetailsView = () => {
  const { loading, error, refetch } = useFetch(api.getItemDetails);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState msg={error} onRetry={refetch} />;
  return (
    <Typography sx={{ color: "#F1EFEC" }}>
      Sucesso (Isso não deve aparecer)
    </Typography>
  );
};

// --- Helpers Visuais (Componentes Puros) ---
const LoadingState = () => (
  <Box sx={{ p: 3, textAlign: "center" }}>
    <CircularProgress size={30} sx={{ color: "#D4C9BE" }} />
    <Typography
      variant="caption"
      sx={{ color: "#D4C9BE", display: "block", mt: 1 }}
    >
      Carregando dados...
    </Typography>
  </Box>
);

const ErrorState = ({ msg, onRetry }) => (
  <Box sx={{ p: 2, textAlign: "center" }}>
    <Alert
      severity="error"
      sx={{
        mb: 2,
        bgcolor: "rgba(255, 99, 71, 0.1)",
        color: "#ff8a80",
        border: "1px solid rgba(255, 99, 71, 0.3)",
      }}
    >
      {msg}
    </Alert>
    <Button
      size="small"
      onClick={onRetry}
      sx={styles.btnSmall}
      variant="outlined"
    >
      Tentar Novamente
    </Button>
  </Box>
);

// --- 5. COMPONENTE PRINCIPAL (CONTAINER) -------------------------------------
const CustomHookDemo = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <Paper elevation={12} sx={styles.paper}>
      <Box sx={styles.header}>
        <Typography variant="h6" sx={{ color: "#F1EFEC", fontWeight: "bold" }}>
          Monitor de API (useFetch)
        </Typography>
      </Box>

      {/* Menu de Abas */}
      <Box sx={styles.tabContainer}>
        <Button
          onClick={() => setActiveTab("users")}
          sx={activeTab === "users" ? styles.tabActive : styles.tabInactive}
        >
          Usuários
        </Button>
        <Button
          onClick={() => setActiveTab("products")}
          sx={activeTab === "products" ? styles.tabActive : styles.tabInactive}
        >
          Produtos
        </Button>
        <Button
          onClick={() => setActiveTab("details")}
          sx={activeTab === "details" ? styles.tabActive : styles.tabInactive}
        >
          Teste de Erro
        </Button>
      </Box>

      <Box sx={styles.contentArea}>
        {activeTab === "users" && <UserList />}
        {activeTab === "products" && <ProductList />}
        {activeTab === "details" && <DetailsView />}
      </Box>
    </Paper>
  );
};

export default CustomHookDemo;

// --- 6. ESTILOS (Navy & Platinum) --------------------------------------------
const styles = {
  paper: {
    maxWidth: 600,
    width: "100%",
    bgcolor: "#123458",
    borderRadius: 4,
    overflow: "hidden",
    border: "1px solid #1c4b78",
  },
  header: {
    p: 3,
    borderBottom: "1px solid rgba(212, 201, 190, 0.1)",
    textAlign: "center",
  },
  tabContainer: {
    display: "flex",
    bgcolor: "rgba(0,0,0,0.2)",
  },
  tabActive: {
    flex: 1,
    color: "#123458",
    bgcolor: "#D4C9BE",
    borderRadius: 0,
    fontWeight: "bold",
    "&:hover": { bgcolor: "#F1EFEC" },
    transition: "all 0.3s",
  },
  tabInactive: {
    flex: 1,
    color: "#D4C9BE",
    borderRadius: 0,
    opacity: 0.6,
    transition: "all 0.3s",
  },
  contentArea: {
    p: 3,
    minHeight: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  listItem: {
    bgcolor: "rgba(255,255,255,0.05)",
    mb: 1,
    borderRadius: 1,
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "0.2s",
    "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
  },
  cardItem: {
    bgcolor: "rgba(255,255,255,0.05)",
    p: 1.5,
    borderRadius: 1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    border: "1px solid rgba(255,255,255,0.05)",
  },
  btnSmall: {
    color: "#D4C9BE",
    borderColor: "#D4C9BE",
    mt: 1,
    textTransform: "none",
    "&:hover": {
      color: "#F1EFEC",
      borderColor: "#F1EFEC",
      bgcolor: "rgba(255,255,255,0.05)",
    },
  },
};

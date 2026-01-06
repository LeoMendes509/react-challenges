import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";

// Componente Principal
const LoginForm = () => {
  // Aqui a gente cria dois "bancos de dados" pequenos.
  // 'email' guarda o texto atual.
  // 'setEmail' é a ferramenta que a gente usa pra mudar esse texto.
  // O ('') significa que começa vazio.

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // --- AS FUNÇÕES (O que acontece quando mexe na tela) ---

  // Essa função roda toda vez que o usuário aperta uma tecla no campo de email
  const handleEmailChange = (event) => {
    // Pega o que foi digitado e salva na nossa memória (state)
    setEmail(event.target.value);
  };

  // Mesmo processo só que para a senha
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Função roda quando clica no botão entrar
  const handleSubmit = (event) => {
    event.preventDefault(); //  Esse comando evita que a página "pisque" ou recarregue

    // Mostra no console do navegador o que foi salvo
    console.log("O usuário mandou isso : ", { email, password });

    // Limpa os campos depois de enviado
    setEmail("");
    setPassword("");
    alert("Login enviado ! Dá uma olhada no console (F12) .");
  };

  // --- O DESENHO NA TELA (JSX) ---
  return (
    // Paper é tipo um cartãozinho branco com sombra.
    <Paper
      elevation={6}
      sx={{
        padding: 4, // Espaçamento interno
        maxWidth: 400, // Largura máxima pra não ficar gigante
        width: "100%",
        backgroundColor: "#1e1e1e", // Cor de fundo cinza escuro
        color: "#fff", // Texto branco
      }}
    >
      {/* Título do cartão */}
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        sx={{ color: "#FF0B55", fontWeight: "bold" }}
      >
        Acesso Restrito
      </Typography>

      {/* O formulário começa aqui */}
      <form onSubmit={handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* CAMPO DE EMAIL */}
          <TextField
            label="E-mail"
            variant="outlined"
            fullWidth // Ocupa a largura toda
            type="email"
            // --- AQUI ESTÁ A MÁGICA DO CONTROLE ---
            // O input é obrigado a mostrar o que está na nossa memória 'email'.
            value={email}
            // Quando digitar, chama a função pra atualizar a memória.
            onChange={handleEmailChange}
            // Estilização (Não precisa decorar, é só pra ficar bonito no escuro)
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" }, // Borda normal
                "&:hover fieldset": { borderColor: "#FF0B55" }, // Borda quando passa o mouse
                "&.Mui-focused fieldset": { borderColor: "#FF0B55" }, // Borda quando clica
                color: "#fff", // Texto digitado branco
              },
              "& .MuiInputLabel-root": { color: "#ccc" }, // Cor do label "Email"
              "& .MuiInputLabel-root.Mui-focused": { color: "#FF0B55" }, // Cor do label focado
            }}
          />

          {/* CAMPO DE SENHA (igualzinho o de cima) */}
          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            type="password" // Esconde os caracteres com bolinhas
            value={password}
            onChange={handlePasswordChange}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#555" },
                "&:hover fieldset": { borderColor: "#FF0B55" },
                "&.Mui-focused fieldset": { borderColor: "#FF0B55" },
                color: "#fff",
              },
              "& .MuiInputLabel-root": { color: "#ccc" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#FF0B55" },
            }}
          />

          {/* BOTÃO DE ENTRAR */}
          <Button
            variant="contained"
            type="submit"
            size="large"
            // Se o email OU a senha estiverem vazios, o botão trava e fica cinza.
            disabled={email === "" || password === ""}
            sx={{
              marginTop: 2,
              backgroundColor: "#CF0F47", // Vermelho do seu tema
              "&:hover": { backgroundColor: "#A00835" }, // Vermelho mais escuro ao passar mouse
              "&:disabled": { backgroundColor: "#555" }, // Cinza quando travado
            }}
          >
            ENTRAR NO SISTEMA
          </Button>
        </Box>
      </form>

      {/* ÁREA DE TESTE (Pra gente ver funcionando) */}
      <Box
        sx={{
          marginTop: 3,
          padding: 2,
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 1,
        }}
      >
        <Typography variant="caption" display="block" sx={{ color: "#aaa" }}>
          O que o React está vendo agora:
        </Typography>
        {/* Mostra o valor da variável 'email' e 'password' em tempo real */}
        <Typography
          variant="body2"
          sx={{ fontFamily: "monospace", color: "#00ff00" }}
        >
          Email: {email || "..."}
        </Typography>
        <Typography
          variant="body2"
          sx={{ fontFamily: "monospace", color: "#00ff00" }}
        >
          Pass: {password ? "******" : "..."}
        </Typography>
      </Box>
    </Paper>
  );
};

export default LoginForm;

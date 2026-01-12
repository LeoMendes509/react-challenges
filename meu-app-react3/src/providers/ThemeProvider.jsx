import React, { useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const ThemeProvider = ({ children }) => {
  // Cria o estado do tema. Se já tiver salvo no navegador usa ele, senão começa dark.
  const [theme, setTheme] = useState(() => {
    const storageTheme = localStorage.getItem("app_theme");
    return storageTheme ? storageTheme : "dark";
  });

  // Função que o botão vai chamar pra inverter: se tá claro vira escuro e vice-versa.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Monitora o 'theme': toda vez que mudar, salva no navegador e mostra um log.
  useEffect(() => {
    // Salva no localStorage pra não perder se der F5.
    localStorage.setItem("app_theme", theme);

    // Só um log colorido pra gente ver funcionando no console (F12).
    console.group(`🎨 MUDANÇA DE TEMA`);
    console.log(`Novo estado: ${theme.toUpperCase()}`);
    console.groupEnd();
  }, [theme]);

  // Aqui a gente define as cores na mão pra não ter que ficar fazendo if/else nos componentes.
  const colors = {
    bg: theme === "light" ? "#F0F2F5" : "#0F172A",
    text: theme === "light" ? "#1E293B" : "#F1F5F9",
    cardBg: theme === "light" ? "#FFFFFF" : "#1E293B",
    border: theme === "light" ? "#CBD5E1" : "#334155",
    primary: "#3B82F6",
  };

  // Empacota tudo o que a gente quer mandar pros outros arquivos.
  const values = {
    theme,
    toggleTheme,
    colors,
  };

  // Envolve o app (children) com o Provider, assim todo mundo lá dentro consegue ler o 'values'.
  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

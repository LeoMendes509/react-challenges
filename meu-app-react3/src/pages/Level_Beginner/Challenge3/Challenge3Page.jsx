import React, { useState, useRef, useEffect } from "react";
import FocusView from "../../../components/Challenges/Level_Beginner/Challenge3/FocusView";

const Challenge3Page = () => {
  // useState: A memória do componente. Guarda o que o usuário digita.
  const [searchText, setSearchText] = useState("");

  // useRef: Cria "ganchos" para conectar com elementos reais da tela (Inputs).
  const searchInputRef = useRef(null);
  const emailInputRef = useRef(null);

  // useEffect: Roda apenas uma vez quando a tela abre (array vazio []).
  useEffect(() => {
    // Se o input de busca existir, coloca o cursor piscando nele.
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Função para limpar tudo e focar de volta
  const handleClearAndFocus = () => {
    setSearchText(""); // 1. Limpa a memória (o texto some)
    if (searchInputRef.current) {
      searchInputRef.current.focus(); // 2. Puxa o cursor de volta pro input
    }
  };

  // Função para pular para o campo de email
  const handleFocusEmail = () => {
    if (emailInputRef.current) {
      emailInputRef.current.focus(); // 1. Joga o cursor para o segundo input
    }
  };

  return (
    // Renderiza o visual e passa todas as funções e ganchos (refs) para ele
    <FocusView
      ref={{ searchRef: searchInputRef, emailRef: emailInputRef }}
      searchValue={searchText}
      onSearchChange={setSearchText}
      onClear={handleClearAndFocus}
      onFocusEmail={handleFocusEmail}
    />
  );
};

export default Challenge3Page;

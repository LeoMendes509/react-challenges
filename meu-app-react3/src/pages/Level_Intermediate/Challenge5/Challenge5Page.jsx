import React from "react";
import ThemeView from "../../../components/Challenges/Level_Intermediate/Challenge5/ThemeView";
import { useTheme } from "../../../hooks/Challenge5/useTheme";

const Challenge5Page = () => {
  // Chamamos o Hook que busca os dados lá no Provider
  const { theme, toggleTheme, colors } = useTheme();

  return <ThemeView theme={theme} toggleTheme={toggleTheme} colors={colors} />;
};

export default Challenge5Page;

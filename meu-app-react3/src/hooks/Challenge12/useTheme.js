import { useContext } from "react";
import { ThemeContext } from "../../contexts/Challenge12/ThemeContext";
export const useTheme = () => useContext(ThemeContext);

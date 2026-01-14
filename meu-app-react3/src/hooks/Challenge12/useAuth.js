import { useContext } from "react";
import { AuthContext } from "../../contexts/Challenge12/AuthContext";
export const useAuth = () => useContext(AuthContext);

import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Separate file for the hook — required for Vite Fast Refresh compatibility
// (a file cannot export both a hook and a component/provider)
export function useAuth() {
  return useContext(AuthContext);
}

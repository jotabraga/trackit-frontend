import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const ProgressContext = createContext();
export default ProgressContext;

export function ProgressProvider({ children }) {
 const [progress, setProgress] = useLocalStorage("progress", 0);

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
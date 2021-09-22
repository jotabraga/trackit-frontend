import { createContext, useState } from "react";

const ProgressContext = createContext();
export default ProgressContext;

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(JSON.parse(localStorage.getItem("progress")));

  return (
    <ProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}
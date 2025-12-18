"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProgramContextType {
  activeProgram: string;
  setActiveProgram: (id: string) => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export function ProgramProvider({ children }: { children: ReactNode }) {
  const [activeProgram, setActiveProgram] = useState("counter");

  return (
    <ProgramContext.Provider value={{ activeProgram, setActiveProgram }}>
      {children}
    </ProgramContext.Provider>
  );
}

export function useActiveProgram() {
  const context = useContext(ProgramContext);
  if (!context) {
    throw new Error("useActiveProgram must be used within ProgramProvider");
  }
  return context;
}

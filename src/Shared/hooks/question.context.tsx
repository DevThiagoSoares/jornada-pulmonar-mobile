import React, { ReactNode, createContext, useContext, useState } from 'react';

// Defina o tipo do estado inicial
type DataType = {
  question: any;
  setQuestion: (value: any) => void;
};

interface ContextProps {
  children: ReactNode;
}

// Crie o contexto
const DataContext = createContext<DataType>({} as DataType);

// Crie o provedor do contexto
export const DataQuestions = ({ children }: ContextProps) => {
  const [question, setQuestion] = useState<any>(null);

  return <DataContext.Provider value={{ question, setQuestion }}>{children}</DataContext.Provider>;
};

export function useQuestion() {
  return useContext(DataContext);
}

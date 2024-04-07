import React, { ReactNode, createContext, useContext, useState } from 'react';

// Defina o tipo do estado inicial
type DataType = {
  data: any;
  setData: (value: any) => void;
};

interface ContextProps {
  children: ReactNode;
}

// Crie o contexto
const DataContext = createContext<DataType>({} as DataType);

// Crie o provedor do contexto
export const DataProvider = ({ children }: ContextProps) => {
  const [data, setData] = useState<any>('');

  return <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>;
};

export function useData() {
  return useContext(DataContext);
}

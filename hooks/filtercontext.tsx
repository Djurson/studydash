"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type MyContextType = {
  filter: string;
  setFilter: (newValue: string) => void;
};

export const FilterContext = createContext<MyContextType | undefined>(undefined);

export const filterContextProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState("default value");

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
};

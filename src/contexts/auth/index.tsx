"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { InterfaceProvider } from "../interfaces/provider";
import { AuthContextType } from "./interfaces";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: InterfaceProvider) => {
  const [token, setToken] = useState("");
  const [company, setCompany] = useState(1);
  const [companies, setCompanies] = useState([
    { id: 1, name: "Projeto 1" },
    { id: 2, name: "Projeto 2" },
  ]);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");

    if (tokenLocal) {
      setToken(tokenLocal);
    }
  }, []);

  function changeCompany(value: number) {
    setCompany(value);
    setCompanies([
      { id: 1, name: "Projeto 1" },
      { id: 2, name: "Projeto 2" },
    ]);
  }

  function validateToken() {
    return token === "eth";
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        validateToken,
        company,
        companies,
        changeCompany,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Provider error");
  }
  return context;
};

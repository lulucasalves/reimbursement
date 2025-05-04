"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { InterfaceProvider } from "../interfaces/provider";
import { AuthContextType } from "./interfaces";
import { useRouter } from "next/navigation";
import api from "~/src/services/api";
import { companyStatus } from "~/src/utils/contants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: InterfaceProvider) => {
  const [token, setToken] = useState("");
  const [userData, setUserData] = useState({});
  const [company, setCompany] = useState("");
  const [currentAmbient, setCurrentAmbient] = useState<string>("");
  const [companies, setCompanies] = useState([]);
  const [moneyPrefix] = useState({
    thousandSeparator: ".",
    decimalSeparator: ",",
    prefix: "R$ ",
  });
  const router = useRouter();

  const validateToken = (tokenToValidate: string) => {
    return tokenToValidate.length > 10;
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const currentAmbient = localStorage.getItem("currentAmbient");
    const currentCompany = localStorage.getItem("currentCompany");

    if (currentCompany) {
      setCompany(currentCompany);
    }

    if (userData) {
      const parsedData = JSON.parse(userData);

      if (parsedData) {
        setUserData(parsedData);
        if (!currentAmbient) {
          localStorage.setItem(
            "currentAmbient",
            parsedData.ambients[0].id_ambient
          );
        } else {
          setCurrentAmbient(currentAmbient);
        }
      }
    }
  }, []);

  useEffect(() => {
    const tokenLocal = localStorage.getItem("token");

    if (tokenLocal) {
      const isValidToken = validateToken(tokenLocal);

      if (isValidToken) {
        setToken(tokenLocal);
      } else {
        localStorage.removeItem("token");
        router.push("auth");
      }
    } else {
      router.push("auth");
    }
  }, [router, validateToken]);

  useEffect(() => {
    (async () => {
      if (currentAmbient) await loadCompanies();
    })();
  }, [currentAmbient]);

  async function loadCompanies() {
    const response = await api.post("/company", {
      filters: {
        statusId: [companyStatus.activeId],
        ambientId: currentAmbient,
      },
    });

    const data = response.data;
    setCompanies(data);

    const companyFinded = data.find((val) => val.companyId === company);

    if (!companyFinded && data?.[0]?.companyId) {
      changeCompany(data[0].companyId);
    }
  }

  function changeCompany(value: string) {
    setCompany(value);
    localStorage.setItem("currentCompany", value);
  }

  function changeUserData(data) {
    setUserData(data);
    localStorage.setItem("userData", JSON.stringify(data));
  }

  function setAmbient(id: string) {
    localStorage.setItem("currentAmbient", id);
    setCompanies([]);
    setCurrentAmbient(id);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        validateToken,
        company,
        companies,
        changeCompany,
        moneyPrefix,
        userData,
        changeUserData,
        setAmbient,
        currentAmbient,
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

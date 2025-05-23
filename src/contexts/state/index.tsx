"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { InterfaceProvider } from "../interfaces/provider";
import { InterfaceMessageTranslation, StatusContextType } from "./interfaces";
import enTranslate from "~/src/locale/en.json";
import ptTranslate from "~/src/locale/pt.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptBR as corePtBR, enUS as coreEnUS } from "@mui/material/locale";
import {
  ptBR as dataGridPtBR,
  enUS as dataGridEnUS,
} from "@mui/x-data-grid/locales";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
const en: InterfaceMessageTranslation = enTranslate;
const pt: InterfaceMessageTranslation = ptTranslate;
import "dayjs/locale/pt-br";

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider = ({ children }: InterfaceProvider) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [menuMobile, setMenuMobile] = useState<boolean>(false);
  const [modal, setModal] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");
  const languageOptions = ["en", "pt"];

  useEffect(() => {
    const darkModeLocal = localStorage.getItem("darkMode");

    if (["true", "false"].includes(String(darkModeLocal))) {
      setDarkMode(darkModeLocal === "true");
    } else {
      const darkModeSystem = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(!!darkModeSystem);
      localStorage.setItem("darkMode", !!darkModeSystem ? "true" : "false");
    }

    const language = window.location.pathname.split("/")[1];

    if (language?.length === 2) {
      setCurrentLanguage(language);
      localStorage.setItem("language", language);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [darkMode]);

  function changeDarkMode(value: boolean) {
    localStorage.setItem("darkMode", !!value ? "true" : "false");

    setDarkMode(value);
  }

  function t(value: string) {
    const translate = currentLanguage === "en" ? en : pt;
    return translate[value] || value;
  }

  function changeLanguage(value: string) {
    const path = window.location.pathname.split("/");

    path[1] = value;

    window.location.pathname = path.join("/");
  }

  function formatDate(dateProp) {
    try {
      let date = new Date();
      if (dateProp) date = new Date(dateProp);

      if (isNaN(date.getTime())) {
        return dateProp;
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      if (currentLanguage === "pt") {
        return `${day}/${month}/${year}`;
      } else {
        return `${month}/${day}/${year}`;
      }
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateProp;
    }
  }

  const theme = createTheme(
    {
      colorSchemes: {
        dark: darkMode,
      },
      palette: {
        primary: {
          main: "#E33E7F",
        },
      },
    },
    currentLanguage === "pt" ? corePtBR : coreEnUS,
    currentLanguage === "pt" ? dataGridPtBR : dataGridEnUS
  );

  return (
    <StatusContext.Provider
      value={{
        darkMode,
        changeDarkMode,
        t,
        currentLanguage,
        changeLanguage,
        languageOptions,
        setMenuMobile,
        menuMobile,
        modal,
        setModal,
        formatDate,
      }}
    >
      <ThemeProvider theme={theme}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale={currentLanguage === "pt" ? "pt-br" : "en"}
          dateFormats={{
            normalDate: currentLanguage === "pt" ? "DD/MM/YYYY" : "MM/DD/YYYY",
          }}
        >
          {children}
        </LocalizationProvider>
      </ThemeProvider>
    </StatusContext.Provider>
  );
};

export const useStatus = (): StatusContextType => {
  const context = useContext(StatusContext);
  if (!context) {
    throw new Error("Provider error");
  }
  return context;
};

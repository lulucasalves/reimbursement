"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { InterfaceProvider } from "../interfaces/provider";
import { InterfaceMessageTranslation, StatusContextType } from "./interfaces";
import enTranslate from "~/src/messages/en.json";
import ptTranslate from "~/src/messages/pt.json";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const en: InterfaceMessageTranslation = enTranslate;
const pt: InterfaceMessageTranslation = ptTranslate;

const StatusContext = createContext<StatusContextType | undefined>(undefined);

export const StatusProvider = ({ children }: InterfaceProvider) => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [menuMobile, setMenuMobile] = useState<boolean>(false);
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

  const theme = createTheme({
    colorSchemes: {
      dark: darkMode,
    },
    palette: {
      primary: {
        main: "#E33E7F",
      },
    },
  });

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
        menuMobile
      }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
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

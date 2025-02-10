export interface StatusContextType {
  darkMode: boolean;
  changeDarkMode: (mode: boolean) => void;
  t: (value: string) => string;
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  languageOptions: string[],
  menuMobile: boolean,
  setMenuMobile: (value: boolean) => void
}

export interface InterfaceMessageTranslation {
  [key: string]: string;
}

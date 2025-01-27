export interface StatusContextType {
  darkMode: boolean;
  changeDarkMode: (mode: boolean) => void;
  t: (value: string) => string;
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  languageOptions: string[]
}

export interface InterfaceMessageTranslation {
  [key: string]: string;
}

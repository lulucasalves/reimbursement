export interface StatusContextType {
  darkMode: boolean;
  changeDarkMode: (mode: boolean) => void;
  t: (value: string) => string;
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  languageOptions: string[],
  menuMobile: boolean,
  setMenuMobile: (value: boolean) => void
  modal: string,
  setModal: (value: string) => void
  formatDate: (dateString: string, options?: Intl.DateTimeFormatOptions) => string; 
}

export interface InterfaceMessageTranslation {
  [key: string]: string;
}

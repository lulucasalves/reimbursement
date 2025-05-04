export interface AuthContextType {
  token: string;
  validateToken: (token: string) => boolean;
  company: string;
  companies: {
    companyId: number;
    name: string;
  }[];
  changeCompany: (value: string) => void;
  moneyPrefix: {
    thousandSeparator: string;
    decimalSeparator: string;
    prefix: string;
  };
  userData: any;
  changeUserData: (value: any) => void;
  setAmbient: (value: string) => void;
  currentAmbient: string;
}

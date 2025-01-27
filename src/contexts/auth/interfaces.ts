export interface AuthContextType {
  token: string;
  validateToken: () => boolean;
  company: number;
  companies: {
    id: number;
    name: string;
  }[];
  changeCompany: (value: number) => void;
}

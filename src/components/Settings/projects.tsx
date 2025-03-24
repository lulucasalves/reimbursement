import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { ContainerPreferences } from "./styles";
import { GoPlus } from "react-icons/go";
import { FiTrash2 } from "react-icons/fi";
import { useStatus } from "~/src/contexts/state";

interface Empresa {
  id: number;
  nome: string;
  createdAt: string;
  status: "ativo" | "inativo";
}

export default function ComponentCompanys() {
  const [empresas, setEmpresas] = useState<Empresa[]>([
    {
      id: 1,
      nome: "Empresa 1",
      createdAt: "2025-01-12 - 22:34:22",
      status: "ativo",
    },
  ]);
  const { t, formatDate } = useStatus();

  const handleAdd = () => {
    const novoId =
      empresas.length > 0 ? Math.max(...empresas.map((p) => p.id)) + 1 : 1;
    const dataAtual = new Date()
      .toLocaleString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$2-$1")
      .replace(",", " - ");

    setEmpresas([
      ...empresas,
      { id: novoId, nome: "", createdAt: dataAtual, status: "ativo" },
    ]);
  };

  const handleDelete = (id: number) => {
    setEmpresas(empresas.filter((empresa) => empresa.id !== id));
  };

  const handleEdit = (id: number, campo: keyof Empresa, valor: unknown) => {
    setEmpresas(
      empresas.map((empresa) =>
        empresa.id === id ? { ...empresa, [campo]: valor } : empresa
      )
    );
  };

  return (
    <ContainerPreferences>
      <Table sx={{ width: "100%" }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>{t("name")}</TableCell>
            <TableCell>{t("status")}</TableCell>
            <TableCell>{t("createdAt")}</TableCell>
            <TableCell align="right">
              <IconButton onClick={handleAdd}>
                <GoPlus color="var(--foreground)" />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {empresas.map((empresa) => (
            <TableRow key={empresa.id}>
              <TableCell>
                <TextField
                  fullWidth
                  variant="standard"
                  value={empresa.nome}
                  onChange={(e) =>
                    handleEdit(empresa.id, "nome", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  value={empresa.status}
                  onChange={(e) =>
                    handleEdit(empresa.id, "status", e.target.value)
                  }
                  variant="standard"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="ativo">Ativo</MenuItem>
                  <MenuItem value="inativo">Inativo</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{formatDate(empresa.createdAt)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(empresa.id)}>
                  <FiTrash2 fontSize={20} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ContainerPreferences>
  );
}

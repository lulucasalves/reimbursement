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

interface Projeto {
  id: number;
  nome: string;
  createdAt: string;
  status: "ativo" | "inativo";
}

export default function ComponentProjects() {
  const [projetos, setProjetos] = useState<Projeto[]>([
    {
      id: 1,
      nome: "Projeto 1",
      createdAt: "2025-01-12 - 22:34:22",
      status: "ativo",
    },
  ]);
  const { t, formatDate } = useStatus();

  const handleAdd = () => {
    const novoId =
      projetos.length > 0 ? Math.max(...projetos.map((p) => p.id)) + 1 : 1;
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

    setProjetos([
      ...projetos,
      { id: novoId, nome: "", createdAt: dataAtual, status: "ativo" },
    ]);
  };

  const handleDelete = (id: number) => {
    setProjetos(projetos.filter((projeto) => projeto.id !== id));
  };

  const handleEdit = (id: number, campo: keyof Projeto, valor: unknown) => {
    setProjetos(
      projetos.map((projeto) =>
        projeto.id === id ? { ...projeto, [campo]: valor } : projeto
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
          {projetos.map((projeto) => (
            <TableRow key={projeto.id}>
              <TableCell>
                <TextField
                  fullWidth
                  variant="standard"
                  value={projeto.nome}
                  onChange={(e) =>
                    handleEdit(projeto.id, "nome", e.target.value)
                  }
                />
              </TableCell>
              <TableCell>
                <Select
                  value={projeto.status}
                  onChange={(e) =>
                    handleEdit(projeto.id, "status", e.target.value)
                  }
                  variant="standard"
                  size="small"
                  fullWidth
                >
                  <MenuItem value="ativo">Ativo</MenuItem>
                  <MenuItem value="inativo">Inativo</MenuItem>
                </Select>
              </TableCell>
              <TableCell>{formatDate(projeto.createdAt)}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => handleDelete(projeto.id)}>
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

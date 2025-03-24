import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import ComponentTable from "../Table";

export function ComponentCompanys() {
  const { t } = useStatus();
  const options = {
    status: [
      { id: "Ativo", text: "Ativo" },
      { id: "Inativo", text: "Inativo" },
    ],
    currency: [
      { id: "R$", text: "R$" },
      { id: "$", text: "$" },
    ],
    monthFormat: [
      { id: "DD/MM/YYYY", text: "DD/MM/YYYY" },
      { id: "MM/DD/YYYY", text: "MM/DD/YYYY" },
    ],
  };

  const data = [
    {
      id: "4435345fdfsd",
      company: "Empresa 1",
      status: "Ativo",
      currency: "R$",
      monthFormat: "DD/MM/YYYY",
    },
  ];

  const columns = [
    {
      field: "id",
      headerName: t("id"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "company",
      headerName: t("company"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "status",
      headerName: t("status"),
      flex: 1,
      align: "left",
      minWidth: 150,
      headerAlign: "left",
      editable: true,
      renderEditCell: "select",
    },
    {
      field: "currency",
      headerName: t("currency"),
      flex: 1,
      align: "left",
      minWidth: 150,
      headerAlign: "left",
      editable: true,
      renderEditCell: "select",
    },
    {
      field: "monthFormat",
      headerName: t("month_format"),
      flex: 1,
      align: "left",
      minWidth: 150,
      headerAlign: "left",
      editable: true,
      renderEditCell: "select",
    },
  ];

  return (
    <Container>
      <h2 className="title">{t("companys")}</h2>
      <ComponentTable
        options={options}
        data={data}
        columns={columns}
        invisibleColumns={{ id: false }}
        defaultAdd={{ status: "Ativo" }}
      />
    </Container>
  );
}

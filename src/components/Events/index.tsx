import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import ComponentTable from "../Table";
import dayjs from "dayjs";

export function ComponentEvents() {
  const { t } = useStatus();
  const options = {
    status: [
      { id: "Ativo", text: "Ativo" },
      { id: "Inativo", text: "Inativo" },
    ],
  };
  const data = [
    {
      id: "4435345fdfsd",
      event: "Visita Avon",
      status: "Ativo",
      initDate: dayjs("2024-05-02"),
      endDate: dayjs("2024-05-02"),
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
      field: "event",
      headerName: t("event"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      required: true,
      unique: true,
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
      required: true,
    },
    {
      field: "initDate",
      headerName: t("init_date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "date",
      required: true,
    },
    {
      field: "endDate",
      headerName: t("end_date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "date",
      required: true,
    },
  ];

  return (
    <Container>
      <h2 className="title">{t("events")}</h2>
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

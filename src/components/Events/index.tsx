import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import ComponentTable from "../Table";
import dayjs from "dayjs";

export function ComponentEvents() {
  const { t } = useStatus();
  const options = {
    status: [
      { id: 1, text: "Ativo" },
      { id: 2, text: "Inativo" },
    ],
  };
  const data = [
    {
      id: "1",
      event: "Visita Avon",
      status: 1,
      refundsCreated: 32,
      refundsApproved: 24,
      refundsPending: 32,
      initDate: dayjs("2024-05-02"),
      endDate: dayjs("2024-05-02"),
    },
    {
      id: "2",
      event: "Confraternização de fim de ano",
      status: 2,
      refundsCreated: 144,
      refundsApproved: 122,
      refundsPending: 2,
    },
    {
      id: "3",
      event: "Aniversário da empresa",
      status: 2,
      refundsCreated: 300,
      refundsApproved: 283,
      refundsPending: 5,
    },
  ];

  const columns = [
    {
      field: "event",
      headerName: t("event"),
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
      field: "initDate",
      headerName: t("init_date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "date",
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
    },
  ];

  return (
    <Container>
      <h2 className="title">{t("events")}</h2>
      <ComponentTable options={options} data={data} columns={columns} />
    </Container>
  );
}

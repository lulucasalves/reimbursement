import { useStatus } from "~/src/contexts/state";
import { Container, NoEventContainer } from "./styles";
import ComponentTable from "../Table";
import { Button } from "@mui/material";
import { ComponentChipSelect } from "../Selects/Chip";
import { useRouter } from "next/navigation";

export function ComponentRefunds() {
  const { t } = useStatus();

  const data = [
    {
      id: "4435345fdfsd",
      employee: "Rogério Ceni",
      status: "Aprovado",
      total: "R$ 593,42"
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
      field: "employee",
      headerName: t("employee"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "status",
      headerName: t("status"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "total",
      headerName: t("total"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
  ];

  const events = [
    {
      value: 1,
      label: "Evento 1",
    },
    {
      value: 2,
      label: "Evento 2",
    },
  ];

  const router = useRouter();

  function goToEvent() {
    router.push("events");
  }

  return (
    <Container>
      <h2 className="title">{t("refunds")}</h2>
      {events.length ? (
        <>
          <ComponentChipSelect
            id="events"
            options={events}
            label="events"
            isMultiple={false}
            clearable={false}
          />
          <ComponentTable
            data={data}
            columns={columns}
            invisibleColumns={{ id: false }}
            actions={false}
          />
        </>
      ) : (
        <NoEventContainer>
          <h3>{t("not_searched_event")}</h3>
          <Button
            onClick={() => goToEvent()}
            variant="outlined"
            loadingPosition="start"
            color="inherit"
            loading={false}
            sx={{
              fontSize: "0.9rem",
            }}
          >
            {t("add_event")}
          </Button>
        </NoEventContainer>
      )}
    </Container>
  );
}

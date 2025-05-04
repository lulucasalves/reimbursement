import { useStatus } from "~/src/contexts/state";
import { FaArrowLeft } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { AlertColor, Button, Chip, TextField } from "@mui/material";
import { useState } from "react";
import ComponentTable from "../Table";
import dayjs from "dayjs";

export function ComponentRefund() {
  const { t, currentLanguage } = useStatus();

  const router = useRouter();
  const [event] = useState({
    name: "Evento 1",
    color: "warning",
    status: "Pendente",
    employee: {
      name: "Roberto Almeida Luxemburgo",
      email: "roberto.luxemburgo@company.com.br",
    },
    possibleActions: [
      // {
      //   value: "approve",
      //   needDetails: false,
      //   label: "Aprovar",
      // },
      {
        value: "cancel",
        needDetails: true,
        label: "Cancelar",
      },
      // {
      //   value: "repprove",
      //   needDetails: true,
      //   label: "Reprovar para correção",
      // },
      // {
      //   value: "definitive_repprove",
      //   needDetails: true,
      //   label: "Reprovar definitivamente",
      // },
    ],
  });

  function handleReturn() {
    router.push(`/${currentLanguage}/refunds`);
  }

  function handleAction(val) {
    console.log(val);
  }

  const data = [
    {
      id: "4435345fdfsd",
      date: dayjs("2024-05-02"),
      description: "Voo para Coritiba",
      value: 593.42,
      link: "google.drive.com/spajpsdfj",
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
      field: "date",
      headerName: t("date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "date",
      required: true,
    },
    {
      field: "description",
      headerName: t("description"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      required: true,
      unique: true,
    },
    {
      field: "value",
      headerName: t("value"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "money",
      required: true,
    },
    {
      field: "link",
      headerName: t("link_comprovant"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
  ];

  return (
    <div className="refund">
      <Button
        onClick={() => handleReturn()}
        variant="text"
        loadingPosition="start"
        color="inherit"
        loading={false}
        startIcon={<FaArrowLeft style={{ fontSize: "1.1rem" }} />}
        sx={{
          fontSize: "0.9rem",
        }}
      >
        {t("return")}
      </Button>
      <div className="actions-container">
        <div className="title-container">
          <h3>Evento 1</h3>
          <Chip
            label={event.status}
            color={event?.color as AlertColor}
            sx={{ fontSize: "13px", height: "28px", alignSelf: "center" }}
          />
        </div>
        <div className="buttons-container">
          {event?.possibleActions?.length &&
            event.possibleActions.map((val) => {
              return (
                <Button
                  key={val.value}
                  onClick={() => handleAction(val)}
                  variant="outlined"
                  loadingPosition="start"
                  color="primary"
                  loading={false}
                  sx={{
                    fontSize: "0.8rem",
                  }}
                >
                  {val.label}
                </Button>
              );
            })}
        </div>
      </div>
      <div className="refund-details">
        <TextField
          disabled
          label={t("employee")}
          sx={{
            width: "100%",
          }}
          value={event?.employee?.name || ""}
        />
        <TextField
          disabled
          label={t("email")}
          sx={{
            width: "100%",
          }}
          value={event?.employee?.email || ""}
        />
        <p>
          {t("total")}: <span>R$ 5.800,23</span>
        </p>
      </div>
      <ComponentTable
        data={data}
        columns={columns}
        invisibleColumns={{ id: false }}
      />
    </div>
  );
}

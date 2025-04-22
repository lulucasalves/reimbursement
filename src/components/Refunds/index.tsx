import { useStatus } from "~/src/contexts/state";
import { Container, NoEventContainer } from "./styles";
import ComponentTable from "../Table";
import { Box, Button, Divider, Modal } from "@mui/material";
import { ComponentChipSelect } from "../Selects/Chip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";

export function ComponentRefunds() {
  const { t } = useStatus();
  const [selectedEvent, setSelectedEvent] = useState<any>();
  const [manageUsersDialog, setManageUsersDialog] = useState<boolean>(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [fullscreen, setFullscreen] = useState(false);
  const [events] = useState([
    {
      value: 1,
      label: "Evento 1",
    },
    {
      value: 2,
      label: "Evento 2",
    },
  ]);
  const [employees] = useState([
    {
      value: 1,
      label: "reginaldo.valter@outlook.com",
    },
    {
      value: 2,
      label: "regina.caze@gmail.com",
    },
  ]);
  const [groups] = useState([
    {
      value: 1,
      label: "Recursos Humanos",
    },
    {
      value: 2,
      label: "Desenvolvedores",
    },
  ]);

  const isMobile = window.innerWidth < 768;

  const data = [
    {
      id: "4435345fdfsd",
      employee: "Rogério Ceni",
      status: "Aprovado",
      total: "R$ 593,42",
      lastUpdate: "21/04/2025 - 18:56",
      [t("visualize")]: null,
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
    {
      field: "lastUpdate",
      headerName: t("last_update"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: t("visualize"),
      headerName: t("actions"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "button",
      sortable: false,
      filterable: false,
      action: visualizeItem,
      warnText: t("save_new_row_to_edit_groups"),
    },
  ];

  const router = useRouter();

  function goToEvent() {
    router.push("events");
  }

  function visualizeItem(val) {
    router.push(`refund/${val.id}`);
  }

  function handleChangeEvent(_, val) {
    setSelectedEvent(val.label);
    localStorage.setItem("filterRefundEvent", val.label);
  }

  useEffect(() => {
    const refundEvent = localStorage.getItem("filterRefundEvent");

    if (refundEvent) {
      if (events.find((val) => val.label === refundEvent)) {
        setSelectedEvent(refundEvent);
      }
    }
  }, []);

  const Table = () => {
    return !selectedEvent ? (
      <NoEventContainer>
        <h3>{t("refund_select_event_filter")}</h3>
      </NoEventContainer>
    ) : (
      <ComponentTable
        data={data}
        columns={columns}
        invisibleColumns={{ id: false }}
        actions={false}
      />
    );
  };

  function onClose() {
    setManageUsersDialog(false);
  }

  function handleSelectEmployees(_, val) {
    console.log(val);
    setSelectedEmployees(val);
  }

  function handleSelectGroups(_, val) {
    setSelectedGroups(val);
  }

  function handleFullScreen() {
    setFullscreen(!fullscreen);
  }

  return (
    <Container>
      <Modal
        open={manageUsersDialog}
        onClose={onClose}
        aria-labelledby="employee-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "var(--background-light)",
            borderRadius: 2,
            width: "100%",
            maxWidth: fullscreen || isMobile ? "100%" : "50rem",
            minHeight: fullscreen ? "100%" : "20rem",
            maxHeight: fullscreen ? "100%" : "90vh",
            display: "flex",
            flexDirection: "column",
            margin: fullscreen ? "0" : "1rem",
            overflow: "auto",
          }}
        >
          <div className="title-close">
            <h2 className="title">
              {t("manage_users")} - {selectedEvent}
            </h2>
            <div className="icons-group">
              {!isMobile && (
                <button onClick={handleFullScreen}>
                  {fullscreen ? (
                    <BiExitFullscreen fontSize={20} />
                  ) : (
                    <BiFullscreen fontSize={20} />
                  )}
                </button>
              )}
              <button onClick={onClose}>
                <RiCloseLine fontSize={25} />
              </button>
            </div>
          </div>

          <Divider />

          <div className={`content-refund  ${fullscreen ? "fullscreen" : ""}`}>
            <ComponentChipSelect
              id="employees-refund"
              width="100%"
              options={employees}
              label="employees"
              limitTags={20}
              height="150px"
              onChange={handleSelectEmployees}
              value={selectedEmployees}
            />
            <ComponentChipSelect
              id="groups-refund"
              width="100%"
              options={groups}
              label="groups"
              limitTags={20}
              height="150px"
              onChange={handleSelectGroups}
              value={selectedGroups}
            />
            <div className="group-buttons-refund">
              <Button
                variant="outlined"
                onClick={onClose}
                loadingPosition="start"
                color="primary"
                loading={false}
              >
                {t("return")}
              </Button>
              <Button
                variant="contained"
                loadingPosition="start"
                color="primary"
                loading={false}
              >
                {t("save_item")}
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
      <h2 className="title">{t("refunds")}</h2>
      {events.length ? (
        <>
          <div className="filter-container">
            <ComponentChipSelect
              id="event"
              options={events}
              label="event"
              isMultiple={false}
              clearable={false}
              onChange={handleChangeEvent}
              value={selectedEvent}
            />
            <Button
              onClick={() => setManageUsersDialog(true)}
              variant="contained"
              loadingPosition="start"
              color="primary"
              loading={false}
              sx={{
                fontSize: "0.8rem",
              }}
            >
              {t("manage_users")}
            </Button>
          </div>
          <Table />
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

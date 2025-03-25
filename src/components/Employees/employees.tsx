import { useStatus } from "~/src/contexts/state";
import { Content, GroupButtons, TitleClose } from "./styles";
import ComponentTable from "../Table";
import { useState } from "react";
import { Box, Button, Divider, Modal } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";
import { ComponentChipSelect } from "../Selects/Chip";

export function ComponentEmployeesTab() {
  const { t } = useStatus();
  const [openDialog, setOpenDialog] = useState(false);
  const [employee, setEmployee] = useState({ employee: "" });

  const options = {};

  const groups = [
    { value: 1, label: "Admin" },
    { value: 2, label: "Aprovador" },
  ];

  const data = [
    {
      id: "4435345fdfsd",
      employee: "Antônio Fagundes",
      email: "antonio.fagundes@la.tech",
      phone: "12 5888-5589",
      document: "848.486.484-23",
      verification: "Verificado",
      verificationColor: "success",
      [t("edit_groups")]: null,
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
      editable: true,
      required: true,
      unique: true,
    },
    {
      field: "email",
      headerName: t("email"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      required: true,
      unique: true,
    },
    {
      field: "phone",
      headerName: t("phone"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "document",
      headerName: t("document"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      required: true,
      unique: true,
    },
    {
      field: "verification",
      headerName: t("verification"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      color: "verificationColor",
      renderEditCell: "chip",
    },
    {
      field: t("edit_groups"),
      headerName: t("groups"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "button",
      sortable: false,
      filterable: false,
      action: editGroupToggle,
      warnText: t("save_new_row_to_edit_groups"),
    },
  ];

  function editGroupToggle(row) {
    setEmployee(row);
    setOpenDialog(true);
  }

  function onClose() {
    setOpenDialog(false);
  }

  return (
    <>
      <ComponentTable
        options={options}
        data={data}
        columns={columns}
        invisibleColumns={{ id: false }}
        defaultAdd={{ verification: "pendent", verificationColor: "warning" }}
      />
      <Modal
        open={openDialog}
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
            maxWidth: "50rem",
            maxHeight: "90vh",
            display: "flex",
            flexDirection: "column",
            margin: "1rem",
            overflow: "auto",
          }}
        >
          <TitleClose>
            <h2 className="title">
              {t("groups")} - {employee?.employee}
            </h2>
            <div className="icons-group">
              <button onClick={onClose}>
                <RiCloseLine fontSize={25} />
              </button>
            </div>
          </TitleClose>

          <Divider />

          <Content>
            <ComponentChipSelect
              id="groups"
              width="100%"
              options={groups}
              label="groups"
              limitTags={2}
            />
            <GroupButtons>
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
            </GroupButtons>
          </Content>
        </Box>
      </Modal>
    </>
  );
}

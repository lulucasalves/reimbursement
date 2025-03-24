import { useStatus } from "~/src/contexts/state";
import { Content, GroupButtons, TitleClose } from "./styles";
import ComponentTable from "../Table";
import { useState } from "react";
import { Box, Button, Divider, Modal } from "@mui/material";
import { RiCloseLine } from "react-icons/ri";
import { ComponentChipSelect } from "../Selects/Chip";

export function ComponentGroupsTab() {
  const { t } = useStatus();
  const [openDialog, setOpenDialog] = useState(false);
  const [group, setGroup] = useState({ group: "" });

  const options = {};

  const permissions = [
    { value: 1, label: "Aprovar" },
    { value: 2, label: "Ler" },
    { value: 3, label: "Editar" },
  ];

  const data = [
    {
      id: "4435345fdfsd",
      group: "Administrador",
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
      field: "group",
      headerName: t("group"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: t("edit_permissions"),
      headerName: t("permissions"),
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: "button",
      sortable: false,
      filterable: false,
      action: editGroupToggle,
      warnText: t("save_new_row_to_edit_permissions"),
    },
  ];

  function editGroupToggle(row) {
    setGroup(row);
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
        aria-labelledby="permissions-modal"
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
              {t("permissions")} - {group?.group}
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
              id="permissions"
              width="100%"
              options={permissions}
              label="permissions"
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

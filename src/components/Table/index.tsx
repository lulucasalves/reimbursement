import { useState, useEffect, useCallback } from "react";
import {
  DataGrid,
  GridColDef,
  GridRenderEditCellParams,
  useGridApiRef,
  GridCellModesModel,
  GridState,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Button, MenuItem, Select } from "@mui/material";
import { useStatus } from "~/src/contexts/state";
import { ButtonGroup, Container } from "./styles";
import { BiPlus, BiTrash } from "react-icons/bi";
import { DatePicker } from "@mui/x-date-pickers";

export default function ComponentTable() {
  const { t } = useStatus();
  const apiRef = useGridApiRef();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [rows, setRows] = useState([
    {
      id: 1,
      event: "Visita Avon",
      status: "Ativo",
      refundsCreated: 32,
      refundsApproved: 24,
      refundsPending: 32,
    },
    {
      id: 2,
      event: "Confraternização de fim de ano",
      status: "Inativo",
      refundsCreated: 144,
      refundsApproved: 122,
      refundsPending: 2,
    },
    {
      id: 3,
      event: "Aniversário da empresa",
      status: "Inativo",
      refundsCreated: 300,
      refundsApproved: 283,
      refundsPending: 5,
    },
  ]);

  const statusOptions = ["Ativo", "Inativo"];

  function StatusEditCell(props: GridRenderEditCellParams) {
    const { id, field, value } = props;

    const handleChange = (event: any) => {
      const newValue = event.target.value;
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
      <Select
        value={value}
        onChange={handleChange}
        fullWidth
        variant="standard"
      >
        {statusOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    );
  }

  function DateEditCell(props: GridRenderEditCellParams) {
    const { id, field, value } = props;

    const handleChange = (newValue: unknown) => {
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    return (
      <DatePicker
        sx={{
          margin: "0 20px",
        }}
        value={value || null}
        onChange={handleChange}
        slotProps={{ textField: { variant: "standard", fullWidth: true } }}
      />
    );
  }

  const columns: GridColDef[] = [
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
      renderEditCell: StatusEditCell,
    },
    {
      field: "initDate  ",
      headerName: t("init_date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: DateEditCell,
    },
    {
      field: "endDate",
      headerName: t("end_date"),
      flex: 1,
      minWidth: 200,
      align: "left",
      headerAlign: "left",
      editable: true,
      renderEditCell: DateEditCell,
    },
  ];

  // Criar um estado para definir todas as células como editáveis
  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

  // Ativa o modo de edição para todas as células ao montar o componente
  useEffect(() => {
    const initialCellModes: any = {};
    rows.forEach((row) => {
      columns.forEach((col) => {
        initialCellModes[row.id] = {
          ...initialCellModes[row.id],
          [col.field]: col.editable ? { mode: "edit" } : { mode: "view" },
        };
      });
    });
    setCellModesModel(initialCellModes);
  }, [rows]);

  const addItem = useCallback(() => {
    setRows([
      ...rows,
      {
        id: rows.length + 10,
        event: "",
        status: "Ativo",
        refundsPending: 0,
        refundsCreated: 0,
        refundsApproved: 0,
      },
    ]);
  }, [rows]);

  function onChange(newState: GridState) {
    console.log(newState.editRows);

    // setRows(newState.editRows as any);
  }

  return (
    <Container>
      <ButtonGroup>
        <Button
          onClick={() => addItem()}
          variant="outlined"
          loadingPosition="start"
          fullWidth
          loading={false}
          startIcon={<BiPlus />}
          sx={{
            fontSize: "0.8rem",
          }}
        >
          {t("add_item")}
        </Button>
        {selectedRows.length > 0 && (
          <Button
            onClick={() => {}}
            variant="outlined"
            loadingPosition="start"
            fullWidth
            color="error"
            loading={false}
            startIcon={<BiTrash />}
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {t("remove_items")}
          </Button>
        )}
      </ButtonGroup>
      <Paper
        sx={{ height: "calc(100vh - 240px)", width: "100%", overflowX: "auto" }}
      >
        <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 100 } },
          }}
          pageSizeOptions={[15, 50, 100, 1000]}
          checkboxSelection
          onRowSelectionModelChange={(selectionModel) => {
            setSelectedRows(selectionModel as number[]);
          }}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            "& .css-1b619uk-MuiInputBase-root-MuiInput-root-MuiSelect-root, .css-1qwk5lv-MuiInputBase-root-MuiInput-root-MuiSelect-root":
              {
                fontSize: "0.88rem",
              },
            ".css-1q6x537-MuiInputBase-root-MuiInput-root::before, & .css-1b619uk-MuiInputBase-root-MuiInput-root-MuiSelect-root:hover::before, .css-1b619uk-MuiInputBase-root-MuiInput-root-MuiSelect-root::before,.css-1qwk5lv-MuiInputBase-root-MuiInput-root-MuiSelect-root:hover:not(.Mui-disabled, .Mui-error):before, .css-1qwk5lv-MuiInputBase-root-MuiInput-root-MuiSelect-root::before":
              {
                borderBottom: "none",
              },
            "& .MuiDataGrid-cell.MuiDataGrid-cell--editing": {
              boxShadow: "none",
            },
            "& .MuiDataGrid-cell--editing": {
              bgcolor: "transparent !important",
            },
          }}
          density="compact"
          cellModesModel={cellModesModel}
          onStateChange={onChange}
        />
      </Paper>
    </Container>
  );
}

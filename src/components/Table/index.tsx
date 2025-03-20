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
import { Alert, AlertColor, Button, MenuItem, Select } from "@mui/material";
import { useStatus } from "~/src/contexts/state";
import { ButtonGroup, Container, GroupButtonsSave } from "./styles";
import { BiPlus, BiSave, BiTrash } from "react-icons/bi";
import { DatePicker } from "@mui/x-date-pickers";
import { generateHash } from "../../utils";

export default function ComponentTable({
  data,
  options,
  columns: columnsBrute,
}) {
  const cellRenderer = {
    select: StatusEditCell,
    date: DateEditCell,
  };

  const columns = columnsBrute.map((val) => ({
    ...val,
    renderEditCell: cellRenderer[val.renderEditCell],
  }));

  const { t } = useStatus();
  const apiRef = useGridApiRef();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [alertComponent, setAlertComponent] = useState({
    show: false,
    message: "",
    severity: "success" as AlertColor,
  });

  const [rows, setRows] = useState(data);
  const [editRows, setEditRows] = useState([]);

  useEffect(() => {
    setRows(data);
  }, [data]);

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
        {options[field].map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.text}
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

  const [cellModesModel, setCellModesModel] = useState<GridCellModesModel>({});

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
        id: generateHash(),
        event: "",
        status: 1,
        refundsPending: 0,
        refundsCreated: 0,
        refundsApproved: 0,
      },
    ]);
  }, [rows]);

  function onChange(newState: GridState) {
    setEditRows(newState.editRows as any);
  }

  function removeItems() {
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
  }

  function saveChanges() {
    if (editRows[1]) {
      const keys = Object.keys(editRows[1]);

      console.log(keys);
    } else {
      setAlertComponent({
        show: true,
        message: t("not_items_to_edit"),
        severity: "warning",
      });
    }
  }

  return (
    <Container>
      <GroupButtonsSave>
        <ButtonGroup>
          <Button
            onClick={() => addItem()}
            variant="outlined"
            loadingPosition="start"
            color="inherit"
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
              onClick={() => removeItems()}
              variant="outlined"
              loadingPosition="start"
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
        <Button
          onClick={() => saveChanges()}
          variant="contained"
          loadingPosition="start"
          loading={false}
          startIcon={<BiSave />}
          sx={{
            fontSize: "0.8rem",
          }}
        >
          {t("save_item")}
        </Button>
      </GroupButtonsSave>
      {alertComponent.show && (
        <Alert
          sx={{ marginBottom: 2 }}
          onClose={() => setAlertComponent({ ...alertComponent, show: false })}
          severity={alertComponent.severity}
        >
          {alertComponent.message}
        </Alert>
      )}
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
            setSelectedRows(selectionModel as string[]);
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

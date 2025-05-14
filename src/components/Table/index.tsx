import { useState, useEffect, useCallback } from "react";
import { NumericFormat } from "react-number-format";
import { BiDuplicate, BiPlus, BiSave, BiTrash } from "react-icons/bi";

import {
  DataGrid,
  GridRenderEditCellParams,
  useGridApiRef,
  GridCellModesModel,
  GridEditingState,
  GridFilterModel,
} from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
  Alert,
  AlertColor,
  Button,
  Chip,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import { useStatus } from "~/src/contexts/state";
import { useAuth } from "~/src/contexts/auth";

import { ComponentTableChangesDialog } from "./changesDialog";
import { ButtonGroup, Container, GroupButtonsSave } from "./styles";

import { formatDatePayload, generateHash } from "../../utils";

export default function ComponentTable({
  data,
  options = {},
  columns: columnsBrute,
  invisibleColumns = {},
  defaultAdd = {},
  loading = false,
  actions = true,
  confirmChanges = async (
    val: any
  ): Promise<{ message: string; success: boolean }> => {
    return { message: val, success: true };
  },
}) {
  const personalizedStyle = {
    minHeight: "150px",
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
  };

  const cellRenderer = {
    select: StatusEditCell,
    date: DateEditCell,
    chip: ChipCell,
    button: ButtonCell,
    money: MoneyCell,
  };

  const columns = columnsBrute.map((val) => ({
    ...val,
    renderEditCell: cellRenderer[val.renderEditCell],
  }));

  const { t, formatDate } = useStatus();
  const { moneyPrefix } = useAuth();
  const apiRef = useGridApiRef();
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [alertComponent, setAlertComponent] = useState({
    show: false,
    message: "",
    severity: "success" as AlertColor,
  });
  const [rows, setRows] = useState(data);
  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
  });
  const [sortModel, setSortModel] = useState([]);
  const [tableChangesDialog, setTableChangesDialog] = useState(false);
  const [changes, setChanges] = useState<any>({});
  const [removedRows, setRemovedRows] = useState<string[]>([]);
  const [gridKey, setGridKey] = useState(0);

  function closeChangesDialog() {
    setTableChangesDialog(false);
  }

  useEffect(() => {
    setRows(data);
    setGridKey((prev) => prev + 1);
  }, [data]);

  function MoneyCell(props: GridRenderEditCellParams) {
    const { id, field, value } = props;

    const handleValueChange = (values: any) => {
      const { floatValue } = values;
      if (floatValue !== undefined) {
        apiRef.current.setEditCellValue({ id, field, value: floatValue });
      }
    };

    return (
      <NumericFormat
        value={value}
        onValueChange={handleValueChange}
        thousandSeparator={moneyPrefix.thousandSeparator}
        decimalSeparator={moneyPrefix.decimalSeparator}
        prefix={moneyPrefix.prefix}
        decimalScale={2}
        customInput={TextField}
        fullWidth
        sx={{
          height: "100%",
          padding: 0,
          "& .MuiInputBase-root": {
            height: "100%",
            padding: 0,
            alignItems: "center",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            padding: 0,
            borderRadius: 0,
          },
          "& .MuiInputBase-input": {
            fontSize: "14px",
          },
        }}
      />
    );
  }

  function StatusEditCell(props: GridRenderEditCellParams) {
    const { id, field, value } = props;

    const handleChange = (event: any) => {
      const newValue = event.target.value;
      apiRef.current.setEditCellValue({ id, field, value: newValue });
    };

    const availableOptions = options[field]?.map((option) => option.id) || [];
    const validValue = availableOptions.includes(value) ? value : "";

    return (
      <Select
        value={validValue}
        onChange={handleChange}
        fullWidth
        variant="standard"
      >
        {options[field]?.map((option) => (
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

  function ChipCell(props: GridRenderEditCellParams) {
    const { field, value, row } = props;

    return (
      <Chip
        label={t(value)}
        color={row[columns.find((val) => val.field === field).color]}
        sx={{ fontSize: "13px", height: "28px", alignSelf: "center" }}
      />
    );
  }

  function ButtonCell(props: GridRenderEditCellParams) {
    const { field, row } = props;

    const item = apiRef.current.state.editRows[row.id];
    Object.keys(item).forEach((key) => {
      row[key] = item[key]?.value || null;
    });

    return (
      <Button
        onClick={() => {
          if (row.id.includes("new_")) {
            setAlertComponent({
              show: true,
              message: columns.find((val) => val.field === field).warnText,
              severity: "warning",
            });
          } else {
            return columns.find((val) => val.field === field).action(row);
          }
        }}
        variant="contained"
        loadingPosition="start"
        color="primary"
        loading={false}
        sx={{ fontSize: "12px", height: "28px", alignSelf: "center" }}
      >
        {field}
      </Button>
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
    setRows((prev) => [
      ...prev,
      {
        id: generateHash(),
        ...defaultAdd,
      },
    ]);
  }, [defaultAdd]);

  function compareChanges(list: any[], editRows: GridEditingState) {
    const transformedList = Object.keys(editRows).map((id) => {
      const item = editRows[id];
      const transformedItem = { id };
      Object.keys(item).forEach((key) => {
        transformedItem[key] = item[key]?.value || null;
      });
      return transformedItem;
    });

    const newItems: any[] = [];
    const editedItems: any[] = [];

    const map = new Map(transformedList.map((item) => [item.id, item]));
    const listMap = new Map(list.map((item) => [item.id, item]));

    for (const [id, item] of map.entries()) {
      if (!listMap.has(id)) {
        newItems.push(item);
      } else {
        const listItem = listMap.get(id);
        const differences = shallowNotEqual(item, listItem);

        if (differences) {
          editedItems.push(differences);
        }
      }
    }

    return {
      newItems: newItems.filter((val) => !removedRows.includes(val.id)),
      editedItems: editedItems.filter((val) => !removedRows.includes(val.id)),
      removedItems: removedRows.filter((val) => !val.includes("new_")),
      allChangedData: transformedList,
    };
  }

  function shallowNotEqual(obj1: any, obj2: any) {
    let editedItems = { id: obj1.id };

    for (const key in obj1) {
      const isDateFormat =
        columns.find((val) => val.field === key).renderEditCell ===
        cellRenderer.date;

      if (isDateFormat) {
        const date1 = obj1[key] ? formatDate(obj1[key]) : null;
        const date2 = obj2[key] ? formatDate(obj2[key]) : null;

        if (date1 !== date2) {
          editedItems = { ...editedItems, [key]: formatDatePayload(obj1[key]) };
        }
      } else if (obj1[key] !== obj2[key]) {
        editedItems = { ...editedItems, [key]: obj1[key] };
      }
    }

    if (Object.keys(editedItems).length > 1) return editedItems;

    return false;
  }

  function removeItems() {
    setRows(rows.filter((row) => !selectedRows.includes(row.id)));
    setRemovedRows((prev) => [...prev, ...selectedRows]);
    setSelectedRows([]);
  }

  function duplicateItems(id) {
    const item = apiRef.current.state.editRows[id];
    const row = {};
    Object.keys(item).forEach((key) => {
      row[key] = item[key]?.value || null;
    });

    setRows((prev) => [
      ...prev,
      {
        ...row,
        id: generateHash(),
        ...defaultAdd,
      },
    ]);
  }

  function saveChanges() {
    const result = compareChanges(data, apiRef.current.state.editRows);

    if (
      !result.editedItems.length &&
      !result.removedItems.length &&
      !result.newItems.length
    ) {
      setAlertComponent({
        show: true,
        message: t("not_items_to_edit"),
        severity: "warning",
      });
    } else {
      const isValid = dataValidation(result.allChangedData, result);

      if (isValid) {
        setChanges(result);
        setTableChangesDialog(true);
      }
    }
  }

  useEffect(() => {
    const secondPath = window.location.pathname
      .split("/")
      .slice(2, 100)
      .join("-");

    const savedFilterModel = localStorage.getItem(`table_filter_${secondPath}`);
    if (savedFilterModel) {
      setFilterModel(JSON.parse(savedFilterModel));
    }

    const savedSortModel = localStorage.getItem(`table_sort_${secondPath}`);
    if (savedSortModel) {
      setSortModel(JSON.parse(savedSortModel));
    }
  }, []);

  function handleFilterModelChange(newFilterModel: GridFilterModel) {
    const secondPath = window.location.pathname
      .split("/")
      .slice(2, 100)
      .join("-");

    setFilterModel(newFilterModel);
    localStorage.setItem(
      `table_filter_${secondPath}`,
      JSON.stringify(newFilterModel)
    );
  }

  function handleSortModelChange(newSortModel) {
    const secondPath = window.location.pathname
      .split("/")
      .slice(2, 100)
      .join("-");

    setSortModel(newSortModel);
    localStorage.setItem(
      `table_sort_${secondPath}`,
      JSON.stringify(newSortModel)
    );
  }

  function dataValidation(editedData, editedDataDetails) {
    const idsToSearch = [
      ...editedDataDetails.newItems.map((val) => val.id),
      ...editedDataDetails.editedItems.map((val) => val.id),
    ];
    const requiredColumns = columns.filter((val) => val.required);

    for (const id of idsToSearch) {
      const values = editedData.find((val) => val.id === id);
      for (const column of requiredColumns) {
        if (!values[column.field]) {
          setAlertComponent({
            show: true,
            message: `${column.headerName} - ${t("required_column")}`,
            severity: "error",
          });
          return false;
        }

        if (column.unique) {
          const searchedValueColumn = editedData.filter(
            (val) => val[column.field] === values[column.field]
          );

          if (searchedValueColumn.length > 1) {
            setAlertComponent({
              show: true,
              message: `${column.headerName} ("${values[column.field]}") - ${t(
                "unique_column"
              )}`,
              severity: "error",
            });
            return false;
          }
        }
      }
    }

    return true;
  }

  async function confirmChangesCallBack() {
    const result = await confirmChanges({
      create: changes.newItems,
      edit: changes.editedItems,
      delete: changes.removedItems,
    });

    closeChangesDialog();

    if (!result.success) {
      setAlertComponent({
        show: true,
        message: result.message || t("save_error"),
        severity: "error" as AlertColor,
      });
    } else {
      setAlertComponent({
        show: true,
        message: t("successfully_saved"),
        severity: "success" as AlertColor,
      });
    }
  }

  return (
    <Container>
      <ComponentTableChangesDialog
        isOpen={tableChangesDialog}
        onClose={closeChangesDialog}
        currentData={data}
        editedItems={changes}
        columns={columns}
        options={options}
        confirmChanges={confirmChangesCallBack}
        loading={loading}
      />
      {actions && !loading && (
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
            {selectedRows.length === 1 && (
              <Button
                onClick={() => duplicateItems(selectedRows[0])}
                variant="outlined"
                loadingPosition="start"
                color="inherit"
                loading={false}
                startIcon={<BiDuplicate />}
                sx={{
                  fontSize: "0.8rem",
                }}
              >
                {t("duplicate_items")}
              </Button>
            )}
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
      )}
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
        sx={{
          height: "calc(100vh - 240px)",
          width: "100%",
          overflowX: "auto",
        }}
      >
        <DataGrid
          key={gridKey}
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: { paginationModel: { page: 0, pageSize: 100 } },
            columns: { columnVisibilityModel: invisibleColumns },
          }}
          filterModel={filterModel}
          sortModel={sortModel}
          pageSizeOptions={[15, 50, 100, 1000]}
          checkboxSelection
          onRowSelectionModelChange={(selectionModel) => {
            setSelectedRows(selectionModel as string[]);
          }}
          disableRowSelectionOnClick
          sx={personalizedStyle}
          density="compact"
          cellModesModel={cellModesModel}
          onFilterModelChange={handleFilterModelChange}
          onSortModelChange={handleSortModelChange}
          getRowClassName={(params) => {
            return String(params.id).includes("new_") ? "new_row" : "";
          }}
          loading={loading}
        />
      </Paper>
    </Container>
  );
}

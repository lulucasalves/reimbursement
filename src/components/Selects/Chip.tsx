import { Autocomplete, TextField, Box } from "@mui/material";
import { useStatus } from "~/src/contexts/state";
import { ChipSelectProps } from "./interfaces";

export function ComponentChipSelect({
  id,
  options,
  label,
  limitTags = 2,
  defaultValue = [],
  width = "300px",
  getOptionLabel,
  onChange,
  isMultiple = true,
  clearable = true,
}: ChipSelectProps) {
  const { t } = useStatus();

  return (
    <Box sx={{ width }}>
      <Autocomplete
        multiple={isMultiple}
        limitTags={limitTags}
        disableClearable={!clearable}
        id={id}
        options={options as { label?: string }[]}
        defaultValue={defaultValue as { label?: string }[]}
        onChange={onChange}
        getOptionLabel={
          getOptionLabel ||
          ((option: { label?: string }) => option.label || option.toString())
        }
        size="small"
        renderInput={(params) => (
          <TextField {...params} label={t(label) || label} />
        )}
      />
    </Box>
  );
}

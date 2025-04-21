import { Autocomplete, TextField, Box } from "@mui/material";
import { useStatus } from "~/src/contexts/state";
import { ChipSelectProps } from "./interfaces";

export function ComponentChipSelect({
  id,
  options,
  label,
  limitTags = 2,
  value = [],
  width = "300px",
  height = "",
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
        value={value as { label?: string }[]}
        onChange={onChange}
        getOptionLabel={
          getOptionLabel ||
          ((option: { label?: string }) => option.label || option.toString())
        }
        size="small"
        renderInput={(params) => (
          <TextField
            {...params}
            label={t(label) || label}
            sx={
              height
                ? {
                    minHeight: height,
                    "& .MuiInputBase-root": {
                      minHeight: height,
                    },
                  }
                : null
            }
          />
        )}
      />
    </Box>
  );
}

import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStatus } from "~/src/contexts/state";
import { InterfaceLanguageToggle } from "./interfaces";

export default function ComponentLanguageToggle({
  hasLabel = true,
}: InterfaceLanguageToggle) {
  const { currentLanguage, changeLanguage, languageOptions, t } = useStatus();

  const itemTranslate = {
    pt: "Português",
    en: "English",
  };

  const handleChange = (event: SelectChangeEvent) => {
    changeLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      {hasLabel && (
        <InputLabel id="demo-simple-select-helper-label">
          {t("language")}
        </InputLabel>
      )}
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={currentLanguage}
        label={hasLabel ? t("language") : ""}
        onChange={handleChange}
        sx={{ fontSize: "1rem" }}
      >
        {languageOptions.map((item) => (
          <MenuItem key={item} value={item}>
            {itemTranslate[item as keyof typeof itemTranslate]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

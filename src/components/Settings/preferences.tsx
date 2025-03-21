import { useStatus } from "~/src/contexts/state";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ContainerPreferences, ItemsGroup } from "./styles";
import ComponentLanguageToggle from "../LanguageToggle";

export default function ComponentPreferences() {
  const { t, darkMode, changeDarkMode } = useStatus();

  const handleChange = (event: SelectChangeEvent) => {
    changeDarkMode(!!event.target.value);
  };

  return (
    <ContainerPreferences>
      <ItemsGroup>
        <h2>{t("language")}: </h2>
        <ComponentLanguageToggle hasLabel={false} />
      </ItemsGroup>
      <ItemsGroup>
        <h2>{t("theme")}: </h2>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={darkMode ? "1" : "0"}
            onChange={handleChange}
            sx={{ fontSize: "1rem" }}
          >
            <MenuItem value={1}>{t("dark")}</MenuItem>
            <MenuItem value={0}>{t("light")}</MenuItem>
          </Select>
        </FormControl>
      </ItemsGroup>
    </ContainerPreferences>
  );
}

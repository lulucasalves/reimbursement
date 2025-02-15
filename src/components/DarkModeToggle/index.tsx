import { Toggle } from "./styles";
import { useStatus } from "~/src/contexts/state";
import { InterfaceToggle } from "./interfaces";

export function ComponentDarkModeToggle({ size }: InterfaceToggle) {
  const { darkMode, changeDarkMode } = useStatus();

  function toggleButton() {
    changeDarkMode(!darkMode);
  }

  return (
    <Toggle
      type="checkbox"
      onChange={toggleButton}
      value={darkMode ? 1 : 0}
      size={size}
    />
  );
}

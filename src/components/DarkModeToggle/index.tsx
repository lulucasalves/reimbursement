import { Toggle } from "./styles";
import { useStatus } from "~/src/contexts/state";

export function ComponentDarkModeToggle() {
  const { darkMode, changeDarkMode } = useStatus();

  function toggleButton() {
    changeDarkMode(!darkMode);
  }

  return (
    <Toggle type="checkbox" onChange={toggleButton} value={darkMode ? 1 : 0} />
  );
}

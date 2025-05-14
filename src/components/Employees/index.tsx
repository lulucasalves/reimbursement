import { useState } from "react";
import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import { ComponentEmployeesTab } from "./employees";
import { ComponentGroupsTab } from "./groups";
import { Tabs, Tab, Box } from "@mui/material";

export function ComponentEmployees() {
  const { t } = useStatus();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Container>
      <h2 className="title">{t("employees")}</h2>
      <Tabs
        value={tabIndex}
        onChange={handleChange}
        aria-label="employees tabs"
      >
        <Tab label={t("employees")} />
        <Tab label={t("groups")} />
      </Tabs>
      <Box>
        {tabIndex === 0 && <ComponentEmployeesTab />}
        {tabIndex === 1 && <ComponentGroupsTab />}
      </Box>
    </Container>
  );
}

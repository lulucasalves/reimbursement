import { useStatus } from "~/src/contexts/state";
import { Container } from "./styles";
import ComponentTable from "../Table";

export function ComponentEvents() {
  const { t } = useStatus();

  return (
    <Container>
      <h2 className="title">{t("events")}</h2>
      <ComponentTable />
    </Container>
  );
}

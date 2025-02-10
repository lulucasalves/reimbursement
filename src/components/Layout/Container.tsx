import { useStatus } from "~/src/contexts/state";
import { ComponentLayoutMenu } from "./Menu";
import { ComponentLayoutSideMenu } from "./SideMenu";
import { Container } from "./styles";
import { InterfaceLayoutContainer } from "./interfaces";

export function ComponentLayoutContainer({
  children,
}: InterfaceLayoutContainer) {
  const { menuMobile } = useStatus();

  return (
    <Container>
      <ComponentLayoutMenu />
      <div className="content-menu">
        <ComponentLayoutSideMenu menuMobile={menuMobile} />
        <div className="content">{children}</div>
      </div>
    </Container>
  );
}

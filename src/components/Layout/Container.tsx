import { useStatus } from "~/src/contexts/state";
import { ComponentLayoutMenu } from "./Menu";
import { ComponentLayoutSideMenu } from "./SideMenu";
import { Container } from "./styles";
import { InterfaceLayoutContainer } from "./interfaces";
import { Box } from "@mui/material";

export function ComponentLayoutContainer({
  children,
  showMenuSide=true
}: InterfaceLayoutContainer) {
  const { menuMobile } = useStatus();

  return (
    <Container>
      <ComponentLayoutMenu />
      <Box sx={{ display: "flex" }}>
       {showMenuSide || menuMobile ? <ComponentLayoutSideMenu menuMobile={menuMobile} />:null}

        <Box
          sx={{
            flexGrow: 1,
            overflowY: "scroll",
            padding: 2,
            marginTop: "87px",
            maxHeight: "calc(100vh - 87px)",
          }}
        >
          {children}
        </Box>
      </Box>
    </Container>
  );
}

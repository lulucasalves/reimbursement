import { useState, MouseEvent } from "react";
import { ContainerMenu, ContainerImage } from "./styles";
import { ComponentLogo } from "./Logo";
import { useAuth } from "~/src/contexts/auth";
import {
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Menu,
  Divider,
} from "@mui/material";
import { IconLogout, IconNotification, IconSettings } from "../Icon";
import Image from "next/image";
import { useStatus } from "~/src/contexts/state";
import { useRouter } from "next/navigation";
import { ComponentHamburgerMenu } from "./HamburgerMenu";

export function ComponentLayoutMenu() {
  const { company, companies, changeCompany } = useAuth();
  const { t } = useStatus();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function changeCompanyToggle(e: SelectChangeEvent) {
    changeCompany(parseInt(e.target.value));
  }

  function handleOpenMenu(event: MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleCloseMenu() {
    setAnchorEl(null);
  }

  function goToConfigPage() {
    router.push("configurations");
  }

  function logout() {
    localStorage.removeItem("token");
    router.push("auth");
  }

  return (
    <ContainerMenu>
      <div className="group-items">
        <div className="item4">
          <ComponentHamburgerMenu />
        </div>
        <div className="item1">
          <ComponentLogo />
        </div>
        <div className="item2">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small-label"
              value={String(company)}
              onChange={changeCompanyToggle}
              sx={{ fontSize: "1rem" }}
            >
              {companies.map(({ id, name }) => (
                <MenuItem key={id} value={id}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="group-items">
        <div className="group-icons">
          <div className="item3">
            <IconButton size="large">
              <IconNotification height={22} />
            </IconButton>
          </div>
        </div>
        <IconButton onClick={handleOpenMenu}>
          <ContainerImage>
            <Image
              alt="user"
              src="/lucas.jpeg"
              loading="lazy"
              width={50}
              height={50}
            />
          </ContainerImage>
        </IconButton>

        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <MenuItem onClick={goToConfigPage} sx={{ gap: "8px" }}>
            <IconSettings height={20} />
            {t("settings")}
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout} sx={{ gap: "8px", color: "var(--error)" }}>
            <IconLogout height={20} color="var(--error)" />
            {t("logout")}
          </MenuItem>
        </Menu>
      </div>
    </ContainerMenu>
  );
}

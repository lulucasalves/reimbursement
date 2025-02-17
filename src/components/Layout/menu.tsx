import { useState, MouseEvent, Suspense } from "react";
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
import Image from "next/image";
import { useStatus } from "~/src/contexts/state";
import { useRouter } from "next/navigation";
import { ComponentHamburgerMenu } from "./HamburgerMenu";
import dynamic from "next/dynamic";
import { AiOutlineSetting } from "react-icons/ai";
import { TbDoorEnter } from "react-icons/tb";

const SettingsModal = dynamic(() => import("../Settings"), {
  loading: () => null,
  ssr: false,
});

export function ComponentLayoutMenu() {
  const { company, companies, changeCompany } = useAuth();
  const { t } = useStatus();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openSettings, setOpenSettings] = useState(false);

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
    setOpenSettings(true);
  }

  function handleCloseSettings() {
    setOpenSettings(false);
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
        {/* <div className="group-icons">
          <div className="item3">
            <IconButton size="large">
              {!notificationsNum ? (
                <MdNotificationsNone fontSize={24} />
              ) : (
                <MdNotifications fontSize={24} />
              )}
            </IconButton>
          </div>
        </div> */}
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
            <AiOutlineSetting fontSize={20} />
            {t("settings")}
          </MenuItem>
          <Divider />
          <MenuItem onClick={logout} sx={{ gap: "8px", color: "var(--error)" }}>
            <TbDoorEnter fontSize={20} color="var(--error)" />
            {t("logout")}
          </MenuItem>
        </Menu>
      </div>

      <Suspense fallback={null}>
        {openSettings && (
          <SettingsModal isOpen={openSettings} onClose={handleCloseSettings} />
        )}
      </Suspense>
    </ContainerMenu>
  );
}

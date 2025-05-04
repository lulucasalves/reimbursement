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
import { TbArrowsExchange, TbDoorEnter } from "react-icons/tb";

const SettingsModal = dynamic(() => import("../Settings"), {
  loading: () => null,
  ssr: false,
});

export function ComponentLayoutMenu() {
  const { company, companies, changeCompany, userData } = useAuth();
  const { t, currentLanguage } = useStatus();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [openSettings, setOpenSettings] = useState(false);

  function changeCompanyToggle(e: SelectChangeEvent) {
    changeCompany(e.target.value);
    location.reload();
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

  function goToAmbients() {
    router.push(`/${currentLanguage}/ambients`);
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
              id="demo-select-small"
              value={companies.length ? String(company) : ""}
              onChange={changeCompanyToggle}
              displayEmpty
              sx={{ fontSize: "1rem" }}
              disabled={!companies.length}
            >
              {!companies.length && (
                <MenuItem value="" disabled>
                  {t("loading")}...
                </MenuItem>
              )}
              {companies.map(({ companyId, name }) => (
                <MenuItem key={companyId} value={companyId}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <div className="group-items">
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
          {userData?.ambients?.length > 1 && (
            <MenuItem onClick={goToAmbients} sx={{ gap: "8px" }}>
              <TbArrowsExchange fontSize={20} />
              {t("ambients")}
            </MenuItem>
          )}
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

import { useStatus } from "~/src/contexts/state";
import {
  Modal,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import { IComponentSettings } from "./interfaces";
import { Content, ContentContainer, TitleClose } from "./styles";
import { useState } from "react";
import { RiCloseLine, RiUserSettingsFill } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { MdOutlinePerson, MdPerson } from "react-icons/md";
import { BiExitFullscreen, BiFullscreen } from "react-icons/bi";
import ComponentPreferences from "./preferences";
import ComponentProfile from "./profile";

export default function ComponentSettings({
  isOpen,
  onClose,
}: IComponentSettings) {
  const { t } = useStatus();
  const [currentMenu, setCurrentMenu] = useState("preferences");
  const [fullscreen, setFullscreen] = useState(false);
  const isMobile = window.innerWidth < 768;

  const menuItems = [
    {
      text: t("preferences"),
      icon: <RiUserSettingsLine fontSize={22} />,
      iconFill: <RiUserSettingsFill fontSize={22} />,
      path: "preferences",
      component: <ComponentPreferences />,
    },
    {
      text: t("profile"),
      icon: <MdOutlinePerson fontSize={22} />,
      iconFill: <MdPerson fontSize={22} />,
      path: "profile",
      component: <ComponentProfile />,
    },
  ];

  function setFullScreen() {
    setFullscreen(!fullscreen);
  }

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="settings-modal"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          bgcolor: "var(--background-light)",
          borderRadius: 2,
          width: "100%",
          maxWidth: fullscreen || isMobile ? "100%" : "50rem",
          minHeight: fullscreen ? "100%" : "20rem",
          maxHeight: fullscreen ? "100%" : "90vh",
          display: "flex",
          flexDirection: "column",
          margin: fullscreen ? "0" : "1rem",
          overflow: "auto",
        }}
      >
        <TitleClose>
          <h2 className="title">{t("settings")}</h2>
          <div className="icons-group">
            {!isMobile && (
              <button onClick={setFullScreen}>
                {fullscreen ? (
                  <BiExitFullscreen fontSize={20} />
                ) : (
                  <BiFullscreen fontSize={20} />
                )}
              </button>
            )}
            <button onClick={onClose}>
              <RiCloseLine fontSize={25} />
            </button>
          </div>
        </TitleClose>

        <Divider />

        <ContentContainer fullscreen={fullscreen ? "1" : "0"}>
          <List
            sx={{ borderRight: "1px solid var(--gray2)", minHeight: "100%" }}
          >
            {menuItems.map(({ text, icon, iconFill, path }) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  selected={currentMenu === path}
                  onClick={() => setCurrentMenu(path)}
                >
                  <ListItemIcon>
                    {currentMenu === path ? iconFill : icon}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Content>
            {menuItems.find((item) => item.path === currentMenu)?.component}
          </Content>
        </ContentContainer>
      </Box>
    </Modal>
  );
}

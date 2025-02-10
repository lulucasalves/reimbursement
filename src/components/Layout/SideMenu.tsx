"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { ContainerSideMenu } from "./styles";
import {
  IconBackard,
  IconForward,
  IconDashboard,
  IconEmployees,
} from "../Icon";
import { useStatus } from "~/src/contexts/state";
import { InterfaceSideMenu } from "./interfaces";

export function ComponentLayoutSideMenu({ menuMobile }: InterfaceSideMenu) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useStatus();

  const menuItems = [
    {
      text: t("dashboard"),
      icon: <IconDashboard height={22} />,
      iconFill: <IconDashboard height={22} fill />,
      path: "dashboard",
    },
    {
      text: t("employees"),
      icon: <IconEmployees height={22} />,
      iconFill: <IconEmployees height={22} fill />,
      path: "employees",
    },
  ];

  return (
    <ContainerSideMenu
      type={
        !menuMobile && window.innerWidth < 800
          ? "hide"
          : expanded
          ? "expanded"
          : ""
      }
    >
      <IconButton
        className="iconExpanded"
        onClick={() => setExpanded(!expanded)}
        sx={{ margin: "8px" }}
      >
        {expanded ? <IconBackard height={18} /> : <IconForward height={18} />}
      </IconButton>

      <List>
        {menuItems.map(({ text, icon, iconFill, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              selected={pathname.includes(path)}
              onClick={() => router.push(path)}
            >
              <ListItemIcon>
                {pathname.includes(path) ? iconFill : icon}
              </ListItemIcon>
              {expanded && <ListItemText primary={text} />}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </ContainerSideMenu>
  );
}

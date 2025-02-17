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
import { useStatus } from "~/src/contexts/state";
import { InterfaceSideMenu } from "./interfaces";
import {
  FaAnglesLeft,
  FaAnglesRight,
  FaCalendar,
  FaRegCalendar,
} from "react-icons/fa6";
import { BsBarChartLine, BsBarChartLineFill } from "react-icons/bs";
import { MdOutlinePeopleOutline, MdPeople } from "react-icons/md";
import { PiMoneyWavyBold, PiMoneyWavyFill } from "react-icons/pi";

export function ComponentLayoutSideMenu({ menuMobile }: InterfaceSideMenu) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useStatus();

  const menuItems = [
    {
      text: t("dashboard"),
      icon: <BsBarChartLine fontSize={22} />,
      iconFill: <BsBarChartLineFill fontSize={22} />,
      path: "dashboard",
    },
    {
      text: t("events"),
      icon: <FaRegCalendar fontSize={21} />,
      iconFill: <FaCalendar fontSize={21} />,
      path: "events",
    },
    {
      text: t("reimbursements"),
      icon: <PiMoneyWavyBold fontSize={23} />,
      iconFill: <PiMoneyWavyFill fontSize={23} />,
      path: "reimbursements",
    },
    {
      text: t("employees"),
      icon: <MdOutlinePeopleOutline fontSize={23} />,
      iconFill: <MdPeople fontSize={23} />,
      path: "employees",
    },
  ];

  return (
    <ContainerSideMenu
      type={
        !menuMobile && window.innerWidth < 768
          ? "hide"
          : expanded
          ? "expanded"
          : ""
      }
    >
      <IconButton
        className="iconExpanded"
        onClick={() => setExpanded(!expanded)}
        sx={{ margin: "8px", marginTop: "80px" }}
      >
        {expanded ? (
          <FaAnglesLeft fontSize={18} />
        ) : (
          <FaAnglesRight fontSize={18} />
        )}
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

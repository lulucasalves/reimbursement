"use client";

import { useEffect, useState } from "react";
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
import { FaRegBuilding, FaBuilding } from "react-icons/fa";

export function ComponentLayoutSideMenu({ menuMobile }: InterfaceSideMenu) {
  const [expanded, setExpanded] = useState<boolean | undefined>(undefined);
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useStatus();
  const { setMenuMobile } = useStatus();

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
      text: t("refunds"),
      icon: <PiMoneyWavyBold fontSize={23} />,
      iconFill: <PiMoneyWavyFill fontSize={23} />,
      path: "refunds",
    },
    {
      text: t("employees"),
      icon: <MdOutlinePeopleOutline fontSize={23} />,
      iconFill: <MdPeople fontSize={23} />,
      path: "employees",
    },
    {
      text: t("companys"),
      icon: <FaRegBuilding fontSize={22} />,
      iconFill: <FaBuilding fontSize={22} />,
      path: "companys",
    },
  ];

  function changeStateExpanded() {
    localStorage.setItem("menu_expanded", !expanded ? "1" : "0");
    setExpanded(!expanded);
  }

  useEffect(() => {
    const searchLocalStorage = localStorage.getItem("menu_expanded");

    if (searchLocalStorage === "1" || searchLocalStorage === "0") {
      setExpanded(searchLocalStorage === "1");
    } else {
      setExpanded(true);
    }
  }, []);

  if (expanded === undefined) {
    return null;
  }

  const containerMenuSideType = () => {
    if (!menuMobile && window.innerWidth < 768) return "hide";
    else if (expanded) return "expanded";

    return "";
  };

  function goTo(path: string) {
    router.push(path);

    if (window.innerWidth < 768) {
      setMenuMobile(false);
    }
  }

  return (
    <ContainerSideMenu type={containerMenuSideType()}>
      <IconButton
        className="iconExpanded"
        onClick={changeStateExpanded}
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
              onClick={() => goTo(path)}
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

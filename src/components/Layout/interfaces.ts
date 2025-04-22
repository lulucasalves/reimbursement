import { ReactNode } from "react";

export interface InterfaceContainerSideMenu {
  type: string;
}

export interface InterfaceSideMenu {
  menuMobile: boolean;
}

export interface InterfaceLayoutContainer {
  children: ReactNode;
  showMenuSide?: boolean;
}

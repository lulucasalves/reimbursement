import { useStatus } from "~/src/contexts/state";
import { HamburgerMenu } from "./styles";
import { MouseEvent } from "react";

export function ComponentHamburgerMenu() {
  const { setMenuMobile, menuMobile } = useStatus();

  const handleClick = (e: MouseEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setMenuMobile(!menuMobile);
  };

  return (
    <HamburgerMenu onClick={handleClick} htmlFor="check">
      <input type="checkbox" id="check" checked={menuMobile} readOnly />
      <span></span>
      <span></span>
      <span></span>
    </HamburgerMenu>
  );
}

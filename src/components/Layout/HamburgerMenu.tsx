import { useStatus } from "~/src/contexts/state";
import { HamburgerMenu } from "./styles";

export function ComponentHamburgerMenu() {
  const { setMenuMobile, menuMobile } = useStatus();

  const handleClick = (e: any) => {
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

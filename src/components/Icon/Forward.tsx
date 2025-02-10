import { InterfaceIcon } from "./interfaces";

export function IconForward({ height, color }: InterfaceIcon) {
  const currentColor = color ?? "var(--foreground)";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      stroke={currentColor}
      fill={currentColor}
      width={height}
      height={height}
    >
      <path d="M200,28a12,12,0,0,0-12,12v62l-113.45-71A20,20,0,0,0,44,47.88V208.12A20,20,0,0,0,74.55,225L188,154v62a12,12,0,0,0,24,0V40A12,12,0,0,0,200,28ZM68,200.73V55.27L184.3,128Z"></path>{" "}
    </svg>
  );
}

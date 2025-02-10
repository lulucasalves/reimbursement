import { InterfaceIcon } from "./interfaces";

export function IconBackard({ height, color }: InterfaceIcon) {
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
      <path d="M201.75,30.52a20,20,0,0,0-20.3.53L68,102V40a12,12,0,0,0-24,0V216a12,12,0,0,0,24,0V154l113.45,71A20,20,0,0,0,212,208.12V47.88A19.86,19.86,0,0,0,201.75,30.52ZM188,200.73,71.7,128,188,55.27Z"></path>
    </svg>
  );
}

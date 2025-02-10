import { InterfaceIcon } from "./interfaces";

export function IconDashboard({ height, color, fill }: InterfaceIcon) {
  const currentColor = color ?? "var(--foreground)";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      stroke={currentColor}
      fill={currentColor}
      width={height}
      height={height}
    >
      {!fill ? (
        <>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M32 32v432a16 16 0 0 0 16 16h432"
          ></path>
          <rect
            width="80"
            height="192"
            x="96"
            y="224"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="20"
            ry="20"
          ></rect>
          <rect
            width="80"
            height="240"
            x="240"
            y="176"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="20"
            ry="20"
          ></rect>
          <rect
            width="80"
            height="304"
            x="383.64"
            y="112"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            rx="20"
            ry="20"
          ></rect>
        </>
      ) : (
        <>
          <path d="M480 496H48a32 32 0 0 1-32-32V32a16 16 0 0 1 32 0v432h432a16 16 0 0 1 0 32z"></path>
          <path d="M156 432h-40a36 36 0 0 1-36-36V244a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v152a36 36 0 0 1-36 36zm144 0h-40a36 36 0 0 1-36-36V196a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v200a36 36 0 0 1-36 36zm143.64 0h-40a36 36 0 0 1-36-36V132a36 36 0 0 1 36-36h40a36 36 0 0 1 36 36v264a36 36 0 0 1-36 36z"></path>
        </>
      )}
    </svg>
  );
}

import { InterfaceIcon } from "./interfaces";

export function IconEmployees({ height, color, fill }: InterfaceIcon) {
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
            d="M402 168c-2.93 40.67-33.1 72-66 72s-63.12-31.32-66-72c-3-42.31 26.37-72 66-72s69 30.46 66 72z"
          ></path>
          <path
            fill="none"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M336 304c-65.17 0-127.84 32.37-143.54 95.41-2.08 8.34 3.15 16.59 11.72 16.59h263.65c8.57 0 13.77-8.25 11.72-16.59C463.85 335.36 401.18 304 336 304z"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M200 185.94c-2.34 32.48-26.72 58.06-53 58.06s-50.7-25.57-53-58.06C91.61 152.15 115.34 128 147 128s55.39 24.77 53 57.94z"
          ></path>
          <path
            fill="none"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M206 306c-18.05-8.27-37.93-11.45-59-11.45-52 0-102.1 25.85-114.65 76.2-1.65 6.66 2.53 13.25 9.37 13.25H154"
          ></path>
        </>
      ) : (
        <>
          <circle cx="152" cy="184" r="72"></circle>
          <path d="M234 296c-28.16-14.3-59.24-20-82-20-44.58 0-136 27.34-136 82v42h150v-16.07c0-19 8-38.05 22-53.93 11.17-12.68 26.81-24.45 46-34z"></path>
          <path d="M340 288c-52.07 0-156 32.16-156 96v48h312v-48c0-63.84-103.93-96-156-96z"></path>
          <circle cx="340" cy="168" r="88"></circle>
        </>
      )}
    </svg>
  );
}

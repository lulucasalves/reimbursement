import Image from "next/image";

export function ComponentLogo() {
  return (
    <Image
      src="/google.webp"
      alt="logo"
      loading="lazy"
      height={100}
      width={100}
    />
  );
}

"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import "~/src/components/styles.scss";
import { StatusProvider } from "~/src/contexts/state";
import { useEffect, useState } from "react";
import { AuthProvider } from "~/src/contexts/auth";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <StatusProvider>
        <AuthProvider>
          <body className={`${roboto.variable} antialiased`}>
            {loading ? <></> : children}
          </body>
        </AuthProvider>
      </StatusProvider>
    </html>
  );
}

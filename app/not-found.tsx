"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "~/src/contexts/auth";
import { useStatus } from "~/src/contexts/state";

export default function NotFoundPage() {
  const { currentLanguage } = useStatus();
  const { validateToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (validateToken(localStorage.getItem("token") || "")) {
      router.push(`/${currentLanguage}/dashboard`);
    } else {
      if (!location.pathname.includes("auth"))
        router.push(`/${currentLanguage}/auth`);
    }
  }, [currentLanguage, router, validateToken]);
  return <p>Not found</p>;
}

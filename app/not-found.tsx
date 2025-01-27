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
    if (validateToken()) {
      router.push(`/${currentLanguage}/dashboard`);
    } else router.push(`/${currentLanguage}/auth`);
  }, []);
  return <p>hi</p>;
}

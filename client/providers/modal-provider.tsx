"use client";

import { useEffect, useState } from "react";

import { CookieModal } from "@/components/modals/cookie-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CookieModal />
    </>
  );
}
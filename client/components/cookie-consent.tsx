"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { useCookieModal } from "@/hooks/use-cookie-modal"
import { Icons } from "./icons"

export function CookieConsent() {
    const cookieModal = useCookieModal();

    return (
        <Button 
            variant="ghost" size="sm" className="h-8 w-8 px-0"
            onClick={cookieModal.onOpen}
        >
            <Icons.cookie className="w-6 h-6" />
        </Button>
    );
};
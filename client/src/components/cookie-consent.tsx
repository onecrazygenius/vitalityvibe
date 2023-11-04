import { Button } from "@/components/ui/button"
import { useCookieModal } from "@/hooks/use-cookie-modal"
import { Icons } from "@/components/icons"

export function CookieConsent() {
    const cookieModal = useCookieModal();
    return (
        <Button 
            variant="ghost" size="icon"
            onClick={cookieModal.onOpen}
        >
            <Icons.cookie className="h-[1.2rem] w-[1.2rem] transition-all" />
        </Button>
    );
};
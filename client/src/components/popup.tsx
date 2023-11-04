import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogHeader, 
    DialogTitle, 
    DialogDescription 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

type PopupProps = {
    title: string
    description: string
    button: string
    open: boolean
    setOpen: (open: boolean) => void
    children: React.ReactNode
}

export function Popup(props: PopupProps) {

    const { 
        title, 
        description, 
        button, 
        open, 
        setOpen, 
        children 
    } = props

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                {button}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                    {title}
                </DialogTitle>
                <DialogDescription>
                    {description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid items-center gap-4">
                   {children}
                </div>
              </div>
            </DialogContent>
        </Dialog>
    )
}
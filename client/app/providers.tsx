'use client'

import { ThemeProvider } from '@/providers/theme-provider'
import { ToastProvider } from '@/providers/toast-provider'

export function Providers({ 
    children,
}: { 
    children: React.ReactNode,
}) {
    return (
        <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
        >
            <ToastProvider />
            {children}
        </ThemeProvider>
    )
}
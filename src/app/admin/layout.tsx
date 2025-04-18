"use client";

import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";

// Simple admin layout component
export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // Client-side check for proper navigation
    // This is just a simple check, not real security - the real security would be handled on the server
    const [isNavigatedDirectly, setIsNavigatedDirectly] = useState(false);

    useEffect(() => {
        // Check if this is a direct navigation (no referrer)
        // This is just for demonstration, not a real security mechanism
        if (document.referrer === "") {
            setIsNavigatedDirectly(true);
        }
    }, []);

    return (
        <div className="min-h-screen bg-slate-50/30 dark:bg-slate-950/30">
            <Toaster />

            {/* Admin content */}
            <main className="min-h-screen">
                {/* Optional message for direct navigation */}
                {isNavigatedDirectly && (
                    <div className="w-full bg-blue-500/10 p-2 text-sm text-center text-blue-700 dark:text-blue-400">
                        Welcome to the admin dashboard. This area is only accessible via direct URL.
                    </div>
                )}
                {children}
            </main>
        </div>
    );
} 
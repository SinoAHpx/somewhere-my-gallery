"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRedirect() {
    const router = useRouter();

    useEffect(() => {
        router.push("/admin/dashboard");
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="p-4 text-center">
                <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                <p>Redirecting to admin dashboard...</p>
            </div>
        </div>
    );
} 
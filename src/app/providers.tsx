"use client";

import { NextUIProvider } from "@nextui-org/react";

interface Props {
    children: React.ReactNode;
}

export default function Providers({ children }: Props) {
    return (
        <NextUIProvider>
            <div className="flex flex-col min-h-[100vh]">{children}</div>
        </NextUIProvider>
    );
}